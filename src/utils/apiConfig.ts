/**
 * API Configuration for Portal API
 * This module provides utilities for making API calls to the centralized portal API
 */

// Get the portal API base URL from environment variables
const getPortalApiBaseUrl = (): string => {
  const apiUrl = process.env.NEXT_PUBLIC_PORTAL_API_URL;

  if (apiUrl) {
    // Remove trailing slash if present
    return apiUrl.replace(/\/$/, "");
  }

  // Default to localhost:3001 in development
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3300";
  }

  // In production, throw error if not configured
  console.warn("NEXT_PUBLIC_PORTAL_API_URL is not configured");
  return "";
};

export const PORTAL_API_BASE_URL = getPortalApiBaseUrl();

/**
 * Get full URL for a portal API endpoint
 * @param endpoint - The API endpoint path (e.g., '/quotations/store')
 * @returns Full URL for the portal API endpoint
 */
export const getPortalApiUrl = (endpoint: string): string => {
  // Remove leading slash if present to avoid double slashes
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint.slice(1) : endpoint;
  return PORTAL_API_BASE_URL
    ? `${PORTAL_API_BASE_URL}/${cleanEndpoint}`
    : `/${cleanEndpoint}`;
};

/**
 * API endpoint mappings from old Next.js routes to new portal API routes
 * Note: All endpoints are prefixed with /api/v1/ to match the NestJS API
 */
export const API_ENDPOINTS = {
  // Quotations
  quotations: {
    pdf: "/api/v1/quotations/pdf",
    store: "/api/v1/quotations/store",
    admin: "/api/v1/quotations/admin",
    email: "/api/v1/quotations/email",
    validate: "/api/v1/quotations/validate",
    base: "/api/v1/quotations",
  },
  // Orders
  orders: {
    store: "/api/v1/orders/store",
    convert: "/api/v1/orders/convert",
    base: "/api/v1/orders",
  },
  // Order Status
  orderStatus: {
    base: "/api/v1/order-status",
    byConfig: (configNo: string) => `/api/v1/order-status/config/${configNo}`,
  },
  // Cart
  cart: {
    base: "/api/v1/cart",
    clear: "/api/v1/cart/clear",
  },
  // Other endpoints
  contact: "/api/v1/contact",
  careers: "/api/v1/careers",
  otp: "/api/v1/otp",
  upload: "/api/v1/upload",
  news: "/api/v1/news",
  payment: {
    createOrder: "/api/v1/payment/create-order",
  },
} as const;

/**
 * Helper function to make GET requests to portal API
 */
export const portalApiGet = async <T = any>(
  endpoint: string,
  params?: Record<string, string>
): Promise<T> => {
  const url = new URL(getPortalApiUrl(endpoint));

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, value);
      }
    });
  }

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ error: "Request failed" }));
    throw new Error(error.error || error.message || "Request failed");
  }

  return response.json();
};

/**
 * Helper function to make POST requests to portal API
 */
export const portalApiPost = async <T = any>(
  endpoint: string,
  data?: any,
  options?: { isFormData?: boolean }
): Promise<T> => {
  const headers: Record<string, string> = {};

  if (!options?.isFormData) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(getPortalApiUrl(endpoint), {
    method: "POST",
    headers,
    body: options?.isFormData ? data : JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ error: "Request failed" }));
    throw new Error(error.error || error.message || "Request failed");
  }

  return response.json();
};

/**
 * Helper function to make PATCH requests to portal API
 */
export const portalApiPatch = async <T = any>(
  endpoint: string,
  data?: any
): Promise<T> => {
  const response = await fetch(getPortalApiUrl(endpoint), {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ error: "Request failed" }));
    throw new Error(error.error || error.message || "Request failed");
  }

  return response.json();
};

/**
 * Helper function to make DELETE requests to portal API
 */
export const portalApiDelete = async <T = any>(
  endpoint: string,
  data?: any
): Promise<T> => {
  const url = getPortalApiUrl(endpoint);
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: data ? JSON.stringify(data) : undefined,
  });

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ error: "Request failed" }));
    throw new Error(error.error || error.message || "Request failed");
  }

  // Handle empty responses (204 No Content)
  if (response.status === 204 || response.headers.get('content-length') === '0') {
    return {} as T;
  }

  return response.json();
};

/**
 * Helper function to fetch PDF from portal API
 * Returns the response blob for PDF downloads
 */
export const portalApiFetchPdf = async (
  endpoint: string,
  data: any
): Promise<Blob> => {
  const response = await fetch(getPortalApiUrl(endpoint), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    let errorMessage = "Failed to generate PDF";
    try {
      const errorData = await response.json();
      errorMessage = errorData.error || errorData.message || errorMessage;
    } catch {
      // Ignore JSON parse error
    }
    throw new Error(errorMessage);
  }

  return response.blob();
};
