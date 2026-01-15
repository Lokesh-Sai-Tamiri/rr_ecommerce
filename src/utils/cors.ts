import { NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";

/**
 * CORS headers configuration
 */
export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS, PATCH",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, X-Requested-With",
  "Access-Control-Max-Age": "86400", // 24 hours
};

/**
 * Helper function to add CORS headers to NextResponse (App Router)
 */
export function withCors(response: NextResponse): NextResponse {
  Object.entries(corsHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  return response;
}

/**
 * Helper function to create a CORS-enabled JSON response (App Router)
 */
export function corsJsonResponse(
  data: any,
  status: number = 200
): NextResponse {
  const response = NextResponse.json(data, { status });
  return withCors(response);
}

/**
 * Helper function to create a CORS-enabled response (App Router)
 */
export function corsResponse(
  body: BodyInit | null,
  init?: ResponseInit
): NextResponse {
  const response = new NextResponse(body, init);
  return withCors(response);
}

/**
 * Handle OPTIONS request for preflight (App Router)
 */
export function handleOptions(): NextResponse {
  return corsResponse(null, { status: 204 });
}

/**
 * Add CORS headers to Pages Router API response
 */
export function setCorsHeaders(res: NextApiResponse): void {
  Object.entries(corsHeaders).forEach(([key, value]) => {
    res.setHeader(key, value);
  });
}

/**
 * Handle OPTIONS request for Pages Router
 */
export function handleOptionsPages(
  req: NextApiRequest,
  res: NextApiResponse
): void {
  setCorsHeaders(res);
  res.status(204).end();
}
