# S3 File Upload API Usage Example

## Endpoint

`POST /api/upload-to-s3`

## Request

- Method: POST
- Content-Type: multipart/form-data
- Body: File uploaded with key "file"

## Environment Variables Required

```env
AWS_ACCESS_KEY_ID=your_aws_access_key_id
AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
AWS_REGION=us-east-1
S3_BUCKET_NAME=your-s3-bucket-name
```

## JavaScript/TypeScript Example

### Using Fetch API

```javascript
const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch("/api/upload-to-s3", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    if (result.success) {
      console.log("File uploaded successfully:", result.data);
      console.log("Object URL:", result.data.objectUrl);
      return result.data;
    } else {
      console.error("Upload failed:", result.error);
    }
  } catch (error) {
    console.error("Upload error:", error);
  }
};
```

### Using with React

```tsx
import React, { useState } from "react";

const FileUploadComponent = () => {
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload-to-s3", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setUploadResult(result.data);
      } else {
        console.error("Upload failed:", result.error);
      }
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} disabled={uploading} />
      {uploading && <p>Uploading...</p>}
      {uploadResult && (
        <div>
          <p>Upload successful!</p>
          <p>
            File URL:{" "}
            <a
              href={uploadResult.objectUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {uploadResult.objectUrl}
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export default FileUploadComponent;
```

## Response Format

### Success Response (200)

```json
{
  "success": true,
  "message": "File uploaded successfully",
  "data": {
    "fileName": "1640995200000-example.jpg",
    "originalName": "example.jpg",
    "size": 1024567,
    "mimeType": "image/jpeg",
    "objectUrl": "https://your-bucket-name.s3.us-east-1.amazonaws.com/1640995200000-example.jpg",
    "s3Details": {
      "bucket": "your-bucket-name",
      "key": "1640995200000-example.jpg",
      "region": "us-east-1",
      "etag": "\"d41d8cd98f00b204e9800998ecf8427e\""
    }
  }
}
```

### Error Responses

```json
// Method not allowed (405)
{
  "error": "Method not allowed"
}

// No file provided (400)
{
  "error": "No file provided"
}

// Invalid file type (400)
{
  "error": "Invalid file type"
}

// File too large (400)
{
  "error": "File size too large (max 10MB)"
}

// S3 configuration error (500)
{
  "error": "S3 configuration is incomplete. Please check environment variables."
}

// General upload error (500)
{
  "error": "Failed to upload file",
  "details": "Error details here"
}
```

## Supported File Types

- Images: jpeg, png, gif, webp
- Documents: pdf, txt, doc, docx

## File Size Limit

- Maximum file size: 10MB

## S3 Bucket Configuration

Make sure your S3 bucket has the following permissions:

1. Public read access (if you want files to be publicly accessible)
2. Proper CORS configuration for web uploads
3. IAM user with PutObject permissions
