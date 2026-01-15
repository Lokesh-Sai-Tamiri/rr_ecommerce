// pages/api/upload-to-s3.ts
import { NextApiRequest, NextApiResponse } from "next";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import multer from "multer";
import { S3_CONFIG } from "../../config";
import { setCorsHeaders, handleOptionsPages } from "../../utils/cors";

// Configure multer for handling file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Allow common file types - you can customize this
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
      "application/pdf",
      "text/plain",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});

// Initialize S3 client
const s3Client = new S3Client({
  region: S3_CONFIG.region,
  credentials: {
    accessKeyId: S3_CONFIG.accessKeyId,
    secretAccessKey: S3_CONFIG.secretAccessKey,
  },
});

// Disable Next.js body parsing to handle multipart/form-data
export const config = {
  api: {
    bodyParser: false,
  },
};

// Helper function to run multer middleware
function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: any) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    handleOptionsPages(req, res);
    return;
  }

  // Set CORS headers for all responses
  setCorsHeaders(res);

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Validate S3 configuration
    if (
      !S3_CONFIG.accessKeyId ||
      !S3_CONFIG.secretAccessKey ||
      !S3_CONFIG.bucketName
    ) {
      return res.status(500).json({
        error:
          "S3 configuration is incomplete. Please check environment variables.",
      });
    }

    // Run multer middleware
    await runMiddleware(req, res, upload.single("file"));

    const file = (req as any).file;

    if (!file) {
      return res
        .status(400)
        .json({ error: "No file provided or invalid file type" });
    }

    // Generate unique filename
    const timestamp = Date.now();
    const fileName = `${timestamp}-${file.originalname}`;

    // Prepare S3 upload parameters
    const uploadParams = {
      Bucket: S3_CONFIG.bucketName,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
      // Note: ACL removed as many S3 buckets have ACLs disabled for security
      // You can configure bucket policy for public access if needed
    };

    // Upload to S3
    const command = new PutObjectCommand(uploadParams);
    const result = await s3Client.send(command);

    // Generate the public URL
    const objectUrl = `https://${S3_CONFIG.bucketName}.s3.${S3_CONFIG.region}.amazonaws.com/${fileName}`;

    // Return success response with file details
    return res.status(200).json({
      success: true,
      message: "File uploaded successfully",
      data: {
        fileName: fileName,
        originalName: file.originalname,
        size: file.size,
        mimeType: file.mimetype,
        objectUrl: objectUrl,
        s3Details: {
          bucket: S3_CONFIG.bucketName,
          key: fileName,
          region: S3_CONFIG.region,
          etag: result.ETag,
        },
      },
    });
  } catch (error: any) {
    console.error("S3 upload error:", error);

    if (error.message === "Invalid file type") {
      return res.status(400).json({ error: "Invalid file type" });
    }

    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({ error: "File size too large (max 10MB)" });
    }

    return res.status(500).json({
      error: "Failed to upload file",
      details: error.message,
    });
  }
}
