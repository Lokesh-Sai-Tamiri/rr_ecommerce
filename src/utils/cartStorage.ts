/**
 * @fileoverview Utility functions for cart storage operations
 * Handles storing cart items to database before quotation generation
 */

import { getPortalApiUrl, API_ENDPOINTS } from './apiConfig';

// Simple UUID generator function
function generateUUID(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export interface CartItem {
  id: string;
  configNo?: string;
  studyType: string;
  category?: string;
  sampleForm?: string;
  sampleSolvent?: string;
  application?: string;
  numSamples: number;
  selectedGuidelines?: string[];
  sampleFormGuidelines?: string[];
  sampleSolventGuidelines?: string[];
  applicationGuidelines?: string[];
  selectedTherapeuticAreas?: string[];
  selectedMicroorganismType?: string;
  selectedMicroorganism?: string[];
  customMicroorganism?: string;
  selectedStudies?: string[];
  customSampleForm?: string;
  customSampleSolvent?: string;
  price?: number;
  createdOn?: string;
  validTill?: string;
  description?: string;
  microorganismType?: string;
  microorganism?: string[];
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  customerCompany?: string;
  customerCountry?: string;
}

export interface StoreCartResponse {
  success: boolean;
  message: string;
  data: {
    insertedItems: Array<{
      id: string;
      configNo?: string;
      studyType: string;
    }>;
    totalItems: number;
    successCount: number;
    errorCount: number;
    errors?: Array<{
      itemId: string;
      error: string;
    }>;
  };
}

/**
 * Stores cart items in the database before generating quotation
 * @param cartItems - Array of cart items to store
 * @param userId - User ID from Clerk authentication
 * @param sessionId - Optional session ID for tracking
 * @returns Promise<StoreCartResponse>
 */
export async function storeCartItems(
  cartItems: CartItem[],
  userId: string,
  sessionId?: string,
  customerDetails?: {
    customerName?: string;
    customerEmail?: string;
    customerPhone?: string;
    customerCompany?: string;
    customerCountry?: string;
  }
): Promise<StoreCartResponse> {
  try {
    console.log("🔄 Storing cart items in database...");
    console.log("📊 Cart items to store:", cartItems);

    // Generate session ID if not provided
    const currentSessionId = sessionId || generateUUID();

    // Format cart items with required fields
    const formattedCartItems = cartItems.map((item) => ({
      ...item,
      // Ensure required dates are present - use ISO format for consistency
      createdOn: item.createdOn || new Date().toISOString().split("T")[0], // YYYY-MM-DD format
      validTill:
        item.validTill ||
        new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0], // YYYY-MM-DD format
      // Ensure price is set
      price: item.price || 0,
      // Generate config number if not present
      configNo:
        item.configNo || `RR${Date.now()}${Math.floor(Math.random() * 1000)}`,
    }));

    const response = await fetch(getPortalApiUrl(API_ENDPOINTS.quotations.store), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cartItems: formattedCartItems,
        userId,
        sessionId: currentSessionId,
        customerDetails,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error || `Failed to store cart items: ${response.status}`
      );
    }

    const result: StoreCartResponse = await response.json();
    console.log("✅ Cart items stored successfully:", result);

    return result;
  } catch (error) {
    throw error;
  }
}

/**
 * Retrieves stored cart items from database
 * @param userId - User ID from Clerk authentication
 * @param sessionId - Optional session ID for filtering
 * @param status - Status filter (default: 'active')
 * @returns Promise<CartItem[]>
 */
export async function getStoredCartItems(
  userId: string,
  sessionId?: string,
  status: string = "pending"
): Promise<CartItem[]> {
  try {
    const params = new URLSearchParams({
      userId,
      status,
    });

    if (sessionId) {
      params.append("sessionId", sessionId);
    }

    const response = await fetch(`${getPortalApiUrl(API_ENDPOINTS.quotations.store)}?${params.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error || `Failed to retrieve cart items: ${response.status}`
      );
    }

    const result = await response.json();
    return result.data || [];
  } catch (error) {
    throw error;
  }
}
