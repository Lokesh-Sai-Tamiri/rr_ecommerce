/**
 * @fileoverview Hook for fetching and managing user orders from database
 */

import { useState, useEffect, useCallback } from "react";
import { useUser } from "@clerk/nextjs";
import { getPortalApiUrl, API_ENDPOINTS } from "../utils/apiConfig";

interface UseUserOrdersProps {
  autoFetch?: boolean;
  status?: string;
  sessionId?: string;
}

interface TransformedOrder {
  id: string;
  quotationNo: string;
  title: string;
  studyType: string;
  amount: number;
  numberOfSamples: number;
  createdOn: string;
  validTill: string;
  status: "valid" | "expired" | "cart" | "pending";
  sampleDescription?: string;
  sampleForm?: string;
  sampleSolvent?: string;
  application?: string;
  therapeuticAreas?: string;
  typeOfMicroorganism?: string;
  microorganism?: string;
  pdfUrl: string;
  image: string;
  // Additional fields from orders
  category?: string;
  selectedGuidelines?: string[];
  sampleFormGuidelines?: string[];
  sampleSolventGuidelines?: string[];
  applicationGuidelines?: string[];
  selectedTherapeuticAreas?: string[];
  selectedMicroorganismType?: string;
  selectedMicroorganism?: string[];
  selectedStudies?: string[];
  customSampleForm?: string;
  customSampleSolvent?: string;
  createdAt?: string;
  updatedAt?: string;
  sessionId?: string;
  cartStatus?: string;
  // Customer fields from API
  customer_name?: string;
  customer_email?: string;
  customer_phone?: string;
  customer_company?: string;
  // Order-specific fields
  order_no?: string;
  user_id?: string;
  order_status?: string;
  // Order status tracking
  orderStatus?: {
    id: string;
    orderId: string;
    configNo?: string;
    orderNo?: string;
    protocolRequest?: string | null;
    protocolAcceptance?: string | null;
    orderBooked?: string | null;
    documentVerification?: any;
    orderApproved?: string | null;
    procurementProtocolRequest?: string | null;
    procurementProtocolAcceptance?: string | null;
    technicalProjectInitiated?: string | null;
    technicalInProgress?: string | null;
    technicalInReview?: string | null;
    technicalFinanceApproval?: string | null;
    technicalDraftReport?: string | null;
    deliveryFinalReport?: string | null;
    delivered?: string | null;
    createdAt?: string;
    updatedAt?: string;
  };
  config_no?: string;
}

export function useUserOrders({
  autoFetch = true,
  status = undefined,
  sessionId,
}: UseUserOrdersProps = {}) {
  const { user } = useUser();
  const [orders, setOrders] = useState<TransformedOrder[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getStudyImage = (studyType: string): string => {
    const type = studyType.toLowerCase();
    if (type.includes("toxicity")) {
      return "/assets/images/landing/pricing/cart-toxicity.png";
    } else if (type.includes("invitro") || type.includes("in vitro")) {
      return "/assets/images/landing/pricing/cart-invitro.png";
    } else if (type.includes("microbiology") || type.includes("virology")) {
      return "/assets/images/landing/pricing/cart-microorganism.png";
    }
    return "/assets/images/landing/pricing/cart-invitro.png"; // Default
  };

  const transformOrderData = (order: any): TransformedOrder => {
    // Handle both snake_case (from database) and camelCase (from frontend)
    const data = {
      id: order.id,
      orderNo: order.orderNo || order.order_no,
      configNo: order.configNo || order.config_no,
      studyType: order.studyType || order.study_type,
      category: order.category,
      sampleForm: order.sampleForm || order.sample_form,
      sampleSolvent: order.sampleSolvent || order.sample_solvent,
      application: order.application,
      numSamples: order.numSamples || order.num_samples,
      price: order.price || 0,
      createdOn: order.createdOn || order.created_at,
      validTill: order.validTill || order.valid_till,
      description: order.description,
      selectedGuidelines: order.selectedGuidelines || [],
      sampleFormGuidelines: order.sampleFormGuidelines || [],
      sampleSolventGuidelines: order.sampleSolventGuidelines || [],
      applicationGuidelines: order.applicationGuidelines || [],
      selectedTherapeuticAreas: order.selectedTherapeuticAreas || [],
      selectedMicroorganismType:
        order.selected_microorganism_type || order.selectedMicroorganismType,
      selectedMicroorganism: order.selectedMicroorganism || [],
      customMicroorganism:
        order.custom_microorganism || order.customMicroorganism,
      selectedStudies: order.selectedStudies || [],
      customSampleForm: order.custom_sample_form || order.customSampleForm,
      customSampleSolvent:
        order.custom_sample_solvent || order.customSampleSolvent,
      sessionId: order.sessionId || order.session_id,
      orderStatusString: order.status || "in_progress", // Use status field from database
      status: order.status || "in_progress", // Use status field from database
      createdAt: order.createdAt || order.created_at,
      updatedAt: order.updatedAt || order.updated_at,
      // Customer fields from API
      customer_name: order.customerName,
      customer_email: order.customerEmail,
      customer_phone: order.customerPhone,
      customer_company: order.customerCompany,
      orderTrackingStatus: order.orderStatus, // Full tracking object
    };

    // Convert dates to DD/MM/YYYY format for display consistency
    const convertToDisplayFormat = (dateStr: string) => {
      if (!dateStr) return dateStr;

      // Handle MySQL DATE format (YYYY-MM-DD)
      if (dateStr.match(/^\d{4}-\d{2}-\d{2}$/)) {
        const [year, month, day] = dateStr.split("-");
        return `${day}/${month}/${year}`;
      }

      // Handle date with time (ISO format)
      if (dateStr.includes("T") || dateStr.match(/^\d{4}-\d{2}-\d{2}/)) {
        const date = new Date(dateStr);
        if (!isNaN(date.getTime())) {
          const day = String(date.getDate()).padStart(2, "0");
          const month = String(date.getMonth() + 1).padStart(2, "0");
          const year = date.getFullYear();
          return `${day}/${month}/${year}`;
        }
      }

      // Handle slash-separated dates
      if (dateStr.includes("/")) {
        const parts = dateStr.split("/");
        if (parts.length === 3) {
          const [first, second, year] = parts.map((p) => parseInt(p));
          let day, month;

          if (first > 12) {
            day = first;
            month = second;
          } else {
            month = first;
            day = second;
          }

          if (day >= 1 && day <= 31 && month >= 1 && month <= 12) {
            const dayStr = String(day).padStart(2, "0");
            const monthStr = String(month).padStart(2, "0");
            return `${dayStr}/${monthStr}/${year}`;
          }
        }
      }

      return dateStr;
    };

    // Determine if validTill is in the past (expired)
    const isExpiredByValidTill = (dateStr: string | undefined): boolean => {
      if (!dateStr) return false;
      try {
        let d: Date;
        if (dateStr.includes("T") || dateStr.match(/^\d{4}-\d{2}-\d{2}/)) {
          d = new Date(dateStr);
        } else if (dateStr.includes("/")) {
          const [first, second, year] = dateStr
            .split("/")
            .map((p: string) => parseInt(p));
          d = new Date(year, second - 1, first);
        } else {
          d = new Date(dateStr);
        }
        if (isNaN(d.getTime())) return false;
        const today = new Date();
        today.setHours(23, 59, 59, 999);
        d.setHours(23, 59, 59, 999);
        return d < today;
      } catch {
        return false;
      }
    };

    // Calculate amount with intelligent pricing
    const getStudyAmount = (
      studyType: string,
      price: number | null | undefined,
      orderData: any
    ): number => {
      // Always prefer the database price when it's available and > 0
      // Note: DB price is already GST-inclusive for orders, so we need to return it directly
      if (price != null && Number(price) > 0) {
        const numericPrice =
          typeof price === "string" ? parseFloat(price) : Number(price);
        return numericPrice;
      }

      // Try to calculate from guidelines if available
      if (
        orderData.selectedGuidelines &&
        orderData.selectedGuidelines.length > 0
      ) {
        const numGuidelines = orderData.selectedGuidelines.length;
        const numSamples = orderData.numSamples || 1;

        switch (studyType) {
          case "Invitro Study":
            return numGuidelines * 25000 * numSamples;
          case "Microbiology & Virology Study":
            const microorganismCount = Array.isArray(
              orderData.selectedMicroorganism
            )
              ? orderData.selectedMicroorganism.length
              : 1;
            return numGuidelines * 7500 * microorganismCount * numSamples;
          default:
            return numGuidelines * 25000 * numSamples;
        }
      }

      // Fallback: category-based estimates
      switch (studyType) {
        case "Invitro Study":
          return 25000;
        case "Toxicity Study":
          return 400000;
        case "Microbiology & Virology Study":
          return 7500;
        default:
          return 0;
      }
    };

    // Calculate Grand Total (subtotal + 18% GST)
    // Note: Only adds GST for calculated prices, not for DB prices which are already GST-inclusive
    const calculateGrandTotal = (
      subtotal: number,
      fromDb: boolean = false
    ): number => {
      if (fromDb) {
        // Price from database already includes GST, return as-is
        return subtotal;
      }
      // For calculated prices, add GST
      const gst = subtotal * 0.18;
      return subtotal + gst;
    };

    // Generate order/quotation number
    const generateOrderNumber = (orderNo: string, itemId: string): string => {
      // If orderNo exists and starts with RR, use it (clean up dashed suffixes)
      if (orderNo && orderNo.startsWith("RR")) {
        if (orderNo.includes("-")) {
          const baseNumber = orderNo.split("-")[0];
          return baseNumber;
        }
        return orderNo;
      }
      // If orderNo exists but doesn't start with RR, use it as-is
      if (orderNo) {
        return orderNo;
      }
      // Fallback: use last 6 chars of item ID as numbers
      const idNumbers = itemId.replace(/\D/g, "");
      const last6 = idNumbers.slice(-6).padStart(6, "0");
      return `RR${last6}`;
    };

    const subtotalAmount = getStudyAmount(data.studyType, data.price, data);
    // Check if we used the DB price (which is already GST-inclusive)
    const fromDb = data.price != null && Number(data.price) > 0;
    const grandTotalAmount = calculateGrandTotal(subtotalAmount, fromDb);

    return {
      id: data.id,
      quotationNo: generateOrderNumber(data.orderNo, data.id),
      order_no: data.orderNo,
      title: data.studyType,
      studyType: data.studyType,
      amount: Math.round(grandTotalAmount),
      numberOfSamples: data.numSamples,
      createdOn: convertToDisplayFormat(data.createdOn),
      validTill: convertToDisplayFormat(data.validTill),
      status:
        data.orderStatusString === "in_progress"
          ? "pending"
          : data.orderStatusString === "delivered"
            ? "valid"
            : isExpiredByValidTill(data.validTill)
              ? "expired"
              : "pending",
      sampleDescription: data.description,
      sampleForm: data.sampleForm,
      sampleSolvent: data.sampleSolvent,
      application: data.application,
      therapeuticAreas: data.selectedTherapeuticAreas?.join(", "),
      typeOfMicroorganism: data.selectedMicroorganismType,
      microorganism: data.selectedMicroorganism?.join(", "),
      pdfUrl: "", // Orders don't have PDFs yet
      image: getStudyImage(data.studyType),

      // Additional fields
      category: data.category,
      selectedGuidelines: data.selectedGuidelines,
      sampleFormGuidelines: data.sampleFormGuidelines,
      sampleSolventGuidelines: data.sampleSolventGuidelines,
      applicationGuidelines: data.applicationGuidelines,
      selectedTherapeuticAreas: data.selectedTherapeuticAreas,
      selectedMicroorganismType: data.selectedMicroorganismType,
      selectedMicroorganism: data.selectedMicroorganism,
      selectedStudies: data.selectedStudies,
      customSampleForm: data.customSampleForm,
      customSampleSolvent: data.customSampleSolvent,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      sessionId: data.sessionId,
      cartStatus: data.orderStatusString,
      order_status: data.orderStatusString,

      // Customer fields from API
      customer_name: data.customer_name,
      customer_email: data.customer_email,
      customer_phone: data.customer_phone,
      customer_company: data.customer_company,

      // User ID
      user_id: order.user_id,

      // Order status tracking
      orderStatus: data.orderTrackingStatus,
      // Include config_no for status API calls
      config_no: data.configNo || order.config_no,
    };
  };

  const fetchOrders = useCallback(async () => {
    if (!user?.id) {
      setError(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Build query params
      const params = new URLSearchParams({
        userId: user.id,
      });

      if (status) {
        params.append("status", status);
      }

      if (sessionId) {
        params.append("sessionId", sessionId);
      }

      // Fetch orders from API
      const response = await fetch(`${getPortalApiUrl(API_ENDPOINTS.orders.store)}?${params.toString()}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch orders: ${response.statusText}`);
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || "Failed to fetch orders");
      }

      const transformedOrders = (result.data || []).map(transformOrderData);
      setOrders(transformedOrders);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch orders");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }, [user?.id, status, sessionId]);

  const refreshOrders = () => {
    fetchOrders();
  };

  const getPendingOrders = (): TransformedOrder[] => {
    return orders.filter((item) => item.status === "pending");
  };

  const getDeliveredOrders = (): TransformedOrder[] => {
    return orders.filter((item) => item.status === "valid");
  };

  const getCancelledOrders = (): TransformedOrder[] => {
    return orders.filter((item) => item.status === "expired");
  };

  const getOrderById = (id: string): TransformedOrder | undefined => {
    return orders.find((item) => item.id === id);
  };

  const getOrderByOrderNo = (orderNo: string): TransformedOrder | undefined => {
    return orders.find((item) => item.order_no === orderNo);
  };

  // Auto-fetch on mount and when user changes
  useEffect(() => {
    if (autoFetch && user?.id) {
      fetchOrders();
    }
  }, [autoFetch, fetchOrders]);

  return {
    allOrders: orders,
    pendingOrders: getPendingOrders(),
    deliveredOrders: getDeliveredOrders(),
    cancelledOrders: getCancelledOrders(),
    loading,
    error,
    fetchOrders,
    refreshOrders,
    getOrderById,
    getOrderByOrderNo,
  };
}
