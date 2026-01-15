/**
 * @fileoverview Orders Content Component - Based on Quotations with UI updates
 */

"use client";

import React from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Chip,
  IconButton,
  Tooltip,
  Tabs,
  Tab,
  Divider,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress,
} from "@mui/material";
import {
  IconDownload,
  IconRefresh,
  IconShoppingCart,
  IconFileText,
  IconCalendar,
  IconClock,
  IconTrash,
  IconEye,
  IconCreditCard,
  IconFlask,
  IconMicroscope,
  IconShield,
  IconCheck,
  IconAlertTriangle,
  IconPackage,
  IconFolder,
  IconX,
} from "@tabler/icons-react";
import { useState } from "react";
// import { getQuotationCustomerDetails } from "../../../utils/cartStorage";
import DeleteConfirmationModal from "../../../components/common/DeleteConfirmationModal";
import QuotationOrderSummary from "../../my-quotations/components/QuotationOrderSummary";
import { useUser } from "@clerk/nextjs";
import NothingFound from "../../../../public/assets/images/landing/pricing/nothing found.png";
import { getGuidelineData as getToxicityGuidelineData } from "../../pricing/toxicity-study/data/guidelineData";
import { getGuidelineData as getInvitroGuidelineData } from "../../pricing/invitro-study/data/guidelineData";
import { getPortalApiUrl, API_ENDPOINTS } from "../../../utils/apiConfig";

interface BaseItem {
  id: string;
  quotationNo: string;
  orderNo?: string; // Order number from orders table
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
  cartStatus?: string;
  sessionId?: string;
  selectedGuidelines?: string[];
  category?: string;
  selectedStudies?: string[];
  selectedTherapeuticAreas?: string[];
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

interface OrdersContentProps {
  quotations: BaseItem[];
  cartItems?: BaseItem[];
  subTab: string;
  onSubTabChange: (event: React.SyntheticEvent, newValue: string) => void;
  loading?: boolean;
  error?: string | null;
  onRefresh?: () => void;
  isRealData?: boolean;
  cartLoading?: boolean;
  cartError?: string | null;
  onCartRefresh?: () => void;
}

const THEME_COLORS = {
  primary: "#115293",
  secondary: "#115293",
  white: "#ffffff",
  success: "#22c55e",
  warning: "#f59e0b",
  error: "#ef4444",
  background: "rgba(255, 255, 255, 0.95)",
  border: "rgba(17, 82, 147, 0.1)",
  cardBackground: "rgba(17, 82, 147, 0.1)",
};

const SUPPORTED_FILE_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/jpeg",
  "image/png",
];

const SUPPORTED_EXTENSIONS = ["pdf", "docx", "jpeg", "jpg", "png"];

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  url?: string;
  key?: string;
  mimeType?: string;
  localUrl?: string;
}

export default function OrdersContent({
  quotations,
  cartItems = [],
  subTab,
  onSubTabChange,
  loading = false,
  error = null,
  onRefresh,
  isRealData = false,
  cartLoading = false,
  cartError = null,
  onCartRefresh,
}: OrdersContentProps) {
  const { user } = useUser();

  const [downloadingItems, setDownloadingItems] = useState<Set<string>>(
    new Set()
  );
  const [deletingItems, setDeletingItems] = useState<Set<string>>(new Set());
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<BaseItem | null>(null);
  const [groupToDelete, setGroupToDelete] = useState<BaseItem[] | null>(null);
  const [viewDetailsOpen, setViewDetailsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<BaseItem | null>(null);
  const [isInlineStatusView, setIsInlineStatusView] = useState(false);
  const [viewStatusOpen, setViewStatusOpen] = useState(false);
  const [uploadingByItem, setUploadingByItem] = useState<
    Record<string, boolean>
  >({});
  const [uploadedFiles, setUploadedFiles] = useState<
    Record<string, UploadedFile[]>
  >({});
  const [uploadProgress, setUploadProgress] = useState<
    Record<
      string,
      Record<
        string,
        {
          name: string;
          progress: number;
        }
      >
    >
  >({});
  const [uploadStatusMessage, setUploadStatusMessage] = useState<
    Record<string, { type: "success" | "error"; message: string }>
  >({});
  const [dragActiveItem, setDragActiveItem] = useState<string | null>(null);
  const [currentStage, setCurrentStage] = useState<
    "order" | "procurement" | "technical" | "delivery"
  >("order");

  // Calculate total price for a group of studies
  const calculateGroupTotal = (items: BaseItem[]) => {
    const grandTotal = items.reduce((total, item) => {
      return total + parseFloat(item.amount.toString() || "0");
    }, 0);

    const subtotal = grandTotal / 1.18;
    const gst = grandTotal - subtotal;

    return {
      subtotal,
      gst,
      grandTotal,
    };
  };

  // Generate combined PDF for all studies in a group
  const handleGroupDownload = async (items: BaseItem[], groupKey: string) => {
    setDownloadingItems((prev) => new Set(prev).add(`group-${groupKey}`));

    try {
      // Get customer details from the first item (customer details are now stored in quotations)
      const customerRecord: any | null = items[0]
        ? {
            customerName: (items[0] as any).customer_name,
            customerEmail: (items[0] as any).customer_email,
            customerPhone: (items[0] as any).customer_phone,
            customerCompany: (items[0] as any).customer_company,
          }
        : null;

      if (customerRecord) {
        console.log("📋 Customer record found:", customerRecord);
      } else {
        console.log("⚠️ No customer record found in items, using user data");
      }

      console.log("👤 User data available:", {
        fullName: user?.fullName,
        firstName: user?.firstName,
        company: user?.publicMetadata?.company,
        email: user?.emailAddresses?.[0]?.emailAddress,
        phone:
          user?.phoneNumbers?.[0]?.phoneNumber || user?.publicMetadata?.phone,
      });

      // Calculate totals
      const { subtotal, gst, grandTotal } = calculateGroupTotal(items);

      // Helper function to get individual guideline prices (same logic as individual download)
      const getIndividualGuidelinePrices = (item: BaseItem) => {
        const baseAmountForCalculation = Math.round(item.amount / 1.18);

        // For Microbiology & Virology Study, use selectedStudies
        if (item.studyType === "Microbiology & Virology Study") {
          if (item.selectedStudies && item.selectedStudies.length > 0) {
            const pricePerStudy = Math.round(
              baseAmountForCalculation / item.selectedStudies.length
            );
            return item.selectedStudies.map((study) => ({
              name: study,
              qty: item.numberOfSamples,
              unitPrice: pricePerStudy, // Base amount per study
            }));
          } else {
            // Default fallback for Microbiology
            const microbiologyTests = ["Zone of Inhibition (ZOI)"];
            return microbiologyTests.map((test) => ({
              name: test,
              qty: item.numberOfSamples,
              unitPrice: baseAmountForCalculation, // Base amount
            }));
          }
        }

        // For other study types, use selectedGuidelines
        if (!item.selectedGuidelines || item.selectedGuidelines.length === 0) {
          return [
            {
              name: item.studyType,
              qty: item.numberOfSamples,
              unitPrice:
                Math.round(baseAmountForCalculation / item.numberOfSamples) ||
                0,
            },
          ];
        }

        const pricePerGuideline = Math.round(
          baseAmountForCalculation / item.selectedGuidelines.length
        );
        const unitPricePerGuideline = Math.round(
          pricePerGuideline / item.numberOfSamples
        );

        return item.selectedGuidelines.map((guideline) => ({
          name: guideline,
          qty: item.numberOfSamples,
          unitPrice: unitPricePerGuideline, // Base amount per guideline
        }));
      };

      // Create products array in the same format as individual downloads
      const products = items.map((item) => {
        const guidelines = getIndividualGuidelinePrices(item);

        return {
          title: item.studyType,
          details: [
            `Sample Description: ${item.sampleDescription || "Description not available"}`,
            `Product Type: ${item.category || item.studyType}`,
            `Sample Form: ${item.sampleForm || "N/A"}`,
            `Sample Solvent: ${item.sampleSolvent || "N/A"}`,
            // Conditional details based on study type
            ...(item.studyType === "Microbiology & Virology Study"
              ? [
                  ...(item.typeOfMicroorganism
                    ? [`Type of Micro-organism: ${item.typeOfMicroorganism}`]
                    : []),
                  ...(item.microorganism
                    ? [`Micro-organism: ${item.microorganism}`]
                    : []),
                ]
              : item.studyType === "Invitro Study"
                ? [
                    ...(item.therapeuticAreas
                      ? [`Therapeutic Areas: ${item.therapeuticAreas}`]
                      : []),
                  ]
                : [
                    ...(item.application
                      ? [`Application: ${item.application}`]
                      : []),
                  ]),
          ],
          guidelines: guidelines,
        };
      });

      // Create quotation data structure matching individual download format
      const quotationData = {
        quotation: {
          number: items[0]?.quotationNo || groupKey, // Use actual quotation number from first item
          createdDate: formatDate(
            items[0]?.createdOn || new Date().toISOString()
          ),
          expiryDate: formatDate(
            items[0]?.validTill ||
              new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
          ),
        },
        customer: {
          name:
            customerRecord?.customerName ||
            user?.fullName ||
            (user?.firstName && user?.lastName
              ? `${user?.firstName} ${user?.lastName}`
              : user?.firstName) ||
            user?.emailAddresses?.[0]?.emailAddress?.split("@")[0] ||
            "Customer Name",
          company:
            customerRecord?.customerCompany ||
            (user?.publicMetadata?.company as string) ||
            "Company Name",
          email:
            customerRecord?.customerEmail ||
            user?.emailAddresses?.[0]?.emailAddress ||
            "customer@email.com",
          phone:
            customerRecord?.customerPhone ||
            user?.phoneNumbers?.[0]?.phoneNumber ||
            (user?.publicMetadata?.phone as string) ||
            "0000000000",
        },
        products: products,
        documents: [],
        terms: [
          "This quotation is valid for 30 days from the date of issue unless otherwise stated.",
          "Prices are subject to change if the quotation has expired or if project scope is revised.",
        ],
        summary: {
          subTotal: Math.round(
            products.reduce((total, product) => {
              return (
                total +
                product.guidelines.reduce((guidelineTotal, guideline) => {
                  return guidelineTotal + guideline.unitPrice * guideline.qty;
                }, 0)
              );
            }, 0)
          ), // Sum of all guideline unit prices * quantities (base amounts)
          gstPercent: 18,
          gstAmount: Math.round(gst),
          grandTotal: Math.round(grandTotal),
        },
      };

      console.log("📄 Final customer data for PDF:", quotationData.customer);
      console.log(
        "🚀 Combined quotation data (correct format):",
        quotationData
      );

      // Call the quotation API to generate PDF (same as individual downloads)
      const response = await fetch(getPortalApiUrl(API_ENDPOINTS.quotations.pdf), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(quotationData),
      });

      if (!response.ok) {
        let errorMessage = "Failed to generate combined PDF";
        try {
          const errorData = await response.json();
          console.error("API Error Details:", errorData);
          errorMessage = errorData.details || errorData.error || errorMessage;
          if (errorData.hint) {
            console.error("Hint:", errorData.hint);
          }
        } catch {
          const errorText = await response.text();
          console.error("API Error (text):", errorText);
        }
        throw new Error(errorMessage);
      }

      // Download the generated PDF
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      // Use the quotation number for filename instead of groupKey
      const quotationNumber = items[0]?.quotationNo || "RR000000";
      a.download = `${quotationNumber}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating combined PDF:", error);
      alert("Failed to generate combined PDF. Please try again.");
    } finally {
      setDownloadingItems((prev) => {
        const next = new Set(prev);
        next.delete(`group-${groupKey}`);
        return next;
      });
    }
  };

  const handleGroupDelete = (items: BaseItem[], groupKey: string) => {
    setGroupToDelete(items);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!groupToDelete || groupToDelete.length === 0) {
      setDeleteConfirmOpen(false);
      setGroupToDelete(null);
      return;
    }

    // Set deleting state for all items in the group
    groupToDelete.forEach((item) => {
      setDeletingItems((prev) => new Set(prev).add(item.id));
    });

    setDeleteConfirmOpen(false);

    try {
      // Delete all orders in the group
      const deletePromises = groupToDelete.map(async (item) => {
        const response = await fetch(getPortalApiUrl(API_ENDPOINTS.orders.store), {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            itemId: item.id,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({
            error: "Failed to delete order",
          }));
          throw new Error(errorData.error || "Failed to delete order");
        }

        return response.json();
      });

      await Promise.all(deletePromises);

      // Refresh orders after successful deletion
      if (onRefresh) {
        onRefresh();
      }

      console.log("Orders deleted successfully");
    } catch (error: any) {
      console.error("Error deleting orders:", error);
      alert(
        error.message || "Failed to delete order(s). Please try again."
      );
    } finally {
      // Remove deleting state for all items
      groupToDelete.forEach((item) => {
        setDeletingItems((prev) => {
          const newSet = new Set(prev);
          newSet.delete(item.id);
          return newSet;
        });
      });
      setGroupToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteConfirmOpen(false);
    setGroupToDelete(null);
  };

  const handleViewDetailsClick = (item: BaseItem) => {
    setSelectedItem(item);
    setViewDetailsOpen(true);
  };

  const getCurrentStageFromOrderStatus = (
    item: BaseItem
  ): "order" | "procurement" | "technical" | "delivery" => {
    const os = item.orderStatus;
    if (!os) return "order";

    // Determine current stage based on what's completed
    if (os.delivered) return "delivery";
    if (os.technicalDraftReport) return "delivery";
    if (os.procurementProtocolAcceptance) return "technical";
    if (os.orderApproved) return "procurement";

    return "order";
  };

  const handleViewStatusClick = (item: BaseItem) => {
    setSelectedItem(item);
    setCurrentStage("order"); // Always start at order stage, don't auto-advance
    setIsInlineStatusView(true);
    // Note: For any status API calls, use item.config_no or item.orderStatus?.configNo
    // instead of order_no, as each config can be delivered separately
  };

  const parseDateString = (dateString: string | null | undefined) => {
    if (!dateString) return null;

    // Try native parsing first
    const parsed = new Date(dateString);
    if (!isNaN(parsed.getTime())) {
      return parsed;
    }

    // Handle DD/MM/YYYY format
    if (dateString.includes("/")) {
      const parts = dateString.split("/");
      if (parts.length === 3) {
        const [day, month, year] = parts.map((p) => parseInt(p, 10));
        if (
          !isNaN(day) &&
          !isNaN(month) &&
          !isNaN(year) &&
          day >= 1 &&
          day <= 31 &&
          month >= 1 &&
          month <= 12
        ) {
          return new Date(year, month - 1, day);
        }
      }
    }

    return null;
  };

  const formatDate = (dateString: string | null | undefined) => {
    const date = parseDateString(dateString);
    if (!date) return dateString || "";

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatDateAndTime = (dateString: string | null | undefined) => {
    if (!dateString) return "";

    // Try to parse as ISO date string first (includes time)
    const isoDate = new Date(dateString);
    if (!isNaN(isoDate.getTime())) {
      return isoDate.toLocaleString("en-IN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    }

    // Fallback to parseDateString for other formats
    const date = parseDateString(dateString);
    if (!date) return dateString || "";

    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const getOrdinalSuffix = (day: number) => {
    if (day >= 11 && day <= 13) {
      return "th";
    }
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  const formatExpectedDate = (dateString: string | null | undefined) => {
    const date = parseDateString(dateString);
    if (!date) return dateString || "--";

    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();

    return `${day}${getOrdinalSuffix(day)} ${month} ${year}`;
  };

  const acceptedFileInput = SUPPORTED_EXTENSIONS.map((ext) => `.${ext}`).join(
    ","
  );

  const formatFileSize = (bytes: number) => {
    if (!bytes && bytes !== 0) return "--";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const isFileSupported = (file: File) => {
    if (SUPPORTED_FILE_TYPES.includes(file.type)) return true;
    const extension = file.name.split(".").pop()?.toLowerCase();
    return extension ? SUPPORTED_EXTENSIONS.includes(extension) : false;
  };

  const updateUploadProgress = (
    itemId: string,
    uploadKey: string,
    fileName: string,
    progress: number
  ) => {
    setUploadProgress((prev) => ({
      ...prev,
      [itemId]: {
        ...(prev[itemId] || {}),
        [uploadKey]: { name: fileName, progress },
      },
    }));
  };

  const clearUploadProgress = (itemId: string, uploadKey: string) => {
    setUploadProgress((prev) => {
      if (!prev[itemId]) return prev;
      const { [uploadKey]: _, ...rest } = prev[itemId];
      const next = { ...prev };
      if (Object.keys(rest).length === 0) {
        delete next[itemId];
      } else {
        next[itemId] = rest;
      }
      return next;
    });
  };

  const clearUploadMessage = (itemId: string) => {
    setUploadStatusMessage((prev) => {
      if (!prev[itemId]) return prev;
      const next = { ...prev };
      delete next[itemId];
      return next;
    });
  };

  const setUploadMessage = (
    itemId: string,
    type: "success" | "error",
    message: string
  ) => {
    setUploadStatusMessage((prev) => ({
      ...prev,
      [itemId]: { type, message },
    }));

    window.setTimeout(() => clearUploadMessage(itemId), 5000);
  };

  const uploadFileWithProgress = (
    file: File,
    itemId: string,
    uploadKey: string
  ): Promise<any> => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", getPortalApiUrl(API_ENDPOINTS.upload));
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const progress = Math.round((event.loaded / event.total) * 100);
          updateUploadProgress(itemId, uploadKey, file.name, progress);
        }
      };
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            resolve(JSON.parse(xhr.responseText));
          } catch (error) {
            resolve({});
          }
        } else {
          reject(new Error(`Upload failed with status ${xhr.status}`));
        }
      };
      xhr.onerror = () => reject(new Error("Upload failed"));
      const formData = new FormData();
      formData.append("file", file, file.name);
      xhr.send(formData);
    });
  };

  const handleFilesUpload = async (
    fileInput: FileList | File[],
    itemId: string
  ) => {
    const files = Array.from(fileInput || []);
    if (!files.length || !itemId) return;

    const validFiles = files.filter(isFileSupported);
    const rejectedCount = files.length - validFiles.length;

    if (rejectedCount > 0) {
      setUploadMessage(
        itemId,
        "error",
        `${rejectedCount} file(s) were skipped. Supported formats: PDF, DOCX, JPEG, PNG.`
      );
    }

    if (!validFiles.length) return;

    setUploadingByItem((prev) => ({ ...prev, [itemId]: true }));

    const uploadedBatch: UploadedFile[] = [];

    for (const file of validFiles) {
      const uploadKey = `${itemId}-${file.name}-${Date.now()}-${Math.random()
        .toString(36)
        .slice(2, 7)}`;

      try {
        updateUploadProgress(itemId, uploadKey, file.name, 0);
        const response = await uploadFileWithProgress(file, itemId, uploadKey);
        const payload = response?.data || response;
        uploadedBatch.push({
          id: uploadKey,
          name: payload?.originalName || file.name,
          size: payload?.size || file.size,
          url: payload?.objectUrl || payload?.url,
          key: payload?.key,
          mimeType: payload?.mimeType || file.type,
          localUrl: payload?.objectUrl ? undefined : URL.createObjectURL(file),
        });
        setUploadMessage(
          itemId,
          "success",
          `${uploadedBatch.length} file${
            uploadedBatch.length > 1 ? "s" : ""
          } uploaded successfully.`
        );
      } catch (error) {
        console.error("Upload failed", error);
        setUploadMessage(
          itemId,
          "error",
          `Failed to upload ${file.name}. Please try again.`
        );
      } finally {
        clearUploadProgress(itemId, uploadKey);
      }
    }

    if (uploadedBatch.length) {
      setUploadedFiles((prev) => ({
        ...prev,
        [itemId]: [...(prev[itemId] || []), ...uploadedBatch],
      }));
    }

    setUploadingByItem((prev) => ({ ...prev, [itemId]: false }));
  };

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    itemId: string
  ) => {
    if (!event.target.files) return;
    handleFilesUpload(event.target.files, itemId);
    event.target.value = "";
  };

  const handleDropFiles = (
    event: React.DragEvent<HTMLDivElement>,
    itemId: string
  ) => {
    event.preventDefault();
    setDragActiveItem(null);
    if (event.dataTransfer?.files) {
      handleFilesUpload(event.dataTransfer.files, itemId);
    }
  };

  const handleFileRemove = (itemId: string, fileId: string) => {
    setUploadedFiles((prev) => {
      const files = prev[itemId];
      if (!files) return prev;
      const fileToRemove = files.find((file) => file.id === fileId);
      if (fileToRemove?.localUrl) {
        URL.revokeObjectURL(fileToRemove.localUrl);
      }
      const updated = files.filter((file) => file.id !== fileId);
      const next = { ...prev };
      if (updated.length) {
        next[itemId] = updated;
      } else {
        delete next[itemId];
      }
      return next;
    });
  };

  const handlePreviewFile = (file: UploadedFile) => {
    const previewUrl = file.url || file.localUrl;
    if (previewUrl) {
      window.open(previewUrl, "_blank", "noopener,noreferrer");
    } else {
      alert("Preview is not available for this file.");
    }
  };

  // Parent already passes the filtered list for the selected subTab.
  // Just return it to render cards.
  const getCurrentData = (): BaseItem[] => {
    return cartItems || [];
  };

  const currentData = getCurrentData();
  const currentLoading = cartLoading;
  const currentError = cartError;
  const currentRefresh = onCartRefresh;

  // Map tab names for display
  const getTabDisplayName = () => {
    switch (subTab) {
      case "pending":
        return "Pending";
      case "delivered":
        return "Delivered";
      case "cancelled":
        return "Cancelled";
      default:
        return "Pending";
    }
  };

  // Get order status badge
  const getOrderStatusBadge = () => {
    switch (subTab) {
      case "pending":
        return {
          label: "Order",
          color: THEME_COLORS.primary,
          bgColor: THEME_COLORS.primary,
        };
      case "delivered":
        return {
          label: "Delivery",
          color: THEME_COLORS.primary,
          bgColor: "#e3f2fd",
        };
      case "cancelled":
        return { label: "Cancelled", color: "#ef4444", bgColor: "#fee2e2" };
      default:
        return {
          label: "Pending",
          color: THEME_COLORS.primary,
          bgColor: THEME_COLORS.primary,
        };
    }
  };

  if (currentLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "400px",
        }}
      >
        <CircularProgress size={60} sx={{ color: THEME_COLORS.primary }} />
      </Box>
    );
  }

  if (currentError) {
    return (
      <Alert
        severity="error"
        action={
          currentRefresh && (
            <Button color="inherit" size="small" onClick={currentRefresh}>
              Retry
            </Button>
          )
        }
        sx={{ mb: 2 }}
      >
        {currentError}
      </Alert>
    );
  }

  // Inline Order Status view (replaces card list)
  if (isInlineStatusView && selectedItem) {
    return (
      <Box sx={{ p: 3, pt: 0 }}>
        <Box sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton
            onClick={() => setIsInlineStatusView(false)}
            sx={{
              color: THEME_COLORS.primary,
              "&:hover": { backgroundColor: "rgba(17, 82, 147, 0.1)" },
            }}
          >
            <Typography sx={{ fontSize: "1.2rem" }}>←</Typography>
          </IconButton>
          <Typography
            variant="h4"
            sx={{ fontWeight: 700, color: THEME_COLORS.primary }}
          >
            Order Status
          </Typography>
        </Box>

        {/* Main Card - Order Number onwards */}
        <Box
          sx={{
            p: 0,
            borderRadius: "20px",
            bgcolor: "rgba(17,82,147,0.06)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            border: "1px solid rgba(17,82,147,0.12)",
          }}
        >
          {/* Order Number and Expected Delivery at the top */}
          <Box
            sx={{
              display: "flex",
              gap: 6,
              flexWrap: "wrap",
              p: 2.5,
              borderBottom: "1px solid rgba(17,82,147,0.12)",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: "8px",
                  bgcolor: "rgba(182, 209, 248, 0.4)",
                  border: "1px solid rgba(17,82,147,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <IconFileText size={28} color={THEME_COLORS.primary} />
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 0 }}>
                <Typography
                  sx={{
                    fontWeight: 600,
                    color: THEME_COLORS.primary,
                    fontSize: "0.875rem",
                  }}
                >
                  Order Number
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 700,
                    color: THEME_COLORS.primary,
                    fontSize: "1.125rem",
                  }}
                >
                  #
                  {selectedItem.config_no ||
                    selectedItem.orderStatus?.configNo ||
                    selectedItem.orderNo ||
                    selectedItem.quotationNo}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: "8px",
                  bgcolor: "rgba(182, 209, 248, 0.4)",
                  border: "1px solid rgba(17,82,147,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src="/delivery_svgrepo.com.svg"
                  alt="Expected Delivery"
                  width={28}
                  height={28}
                />
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 0 }}>
                <Typography
                  sx={{
                    fontWeight: 600,
                    color: THEME_COLORS.primary,
                    fontSize: "0.875rem",
                  }}
                >
                  Expected Delivery
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 700,
                    color: THEME_COLORS.primary,
                    fontSize: "1.125rem",
                  }}
                >
                  {formatExpectedDate(selectedItem.validTill)}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Stepper */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              px: 3,
              py: 2.5,
              gap: 1.5,
            }}
          >
            {(() => {
              // Determine which stage is current based on orderStatus
              const os = selectedItem.orderStatus;
              let stageBasedCurrentStage = 0;

              // Check which stage is the current one based on completion
              if (os?.orderApproved) {
                stageBasedCurrentStage = 1; // Move to Procurement
              } else if (os?.procurementProtocolAcceptance) {
                stageBasedCurrentStage = 2; // Move to Technical
              } else if (os?.technicalDraftReport) {
                stageBasedCurrentStage = 3; // Move to Delivery
              } else if (os?.delivered) {
                stageBasedCurrentStage = 3; // Delivery is last
              }

              return [
                {
                  label: "Order",
                  completed: !!os?.orderApproved,
                  icon: <IconPackage size={20} />,
                },
                {
                  label: "Procurement",
                  completed: !!os?.procurementProtocolAcceptance,
                  icon: (
                    <img
                      src="/boxes_svgrepo.com.svg"
                      alt="Procurement"
                      width={20}
                      height={20}
                    />
                  ),
                },
                {
                  label: "Technical",
                  completed: !!os?.technicalDraftReport,
                  icon: (
                    <img
                      src="/technicalicon.svg"
                      alt="Technical"
                      width={20}
                      height={20}
                    />
                  ),
                },
                {
                  label: "Delivery",
                  completed: !!os?.delivered,
                  icon: (
                    <img
                      src="/delivery_svgrepo.com.svg"
                      alt="Delivery"
                      width={20}
                      height={20}
                    />
                  ),
                },
              ].map((item, index) => {
                const isCompleted = item.completed;
                const isCurrent =
                  index === stageBasedCurrentStage && !isCompleted;
                const isFuture = index > stageBasedCurrentStage && !isCompleted;

                return (
                  <React.Fragment key={item.label}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        flex: 1,
                      }}
                    >
                      <Box
                        sx={{
                          width: isCompleted || isCurrent ? 24 : "auto",
                          height: isCompleted || isCurrent ? 24 : "auto",
                          borderRadius: isCompleted || isCurrent ? "50%" : 0,
                          background:
                            isCompleted || isCurrent
                              ? THEME_COLORS.primary
                              : "transparent",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          position: "relative",
                          "&::before": {
                            content: '""',
                            position: "absolute",
                            width: "32px",
                            height: "32px",
                            borderRadius: isCompleted || isCurrent ? "50%" : 0,
                            border: `2px solid ${isCompleted || isCurrent ? "rgba(25, 118, 210, 0.3)" : "transparent"}`,
                            top: "-4px",
                            left: "-4px",
                          },
                        }}
                      >
                        {isCompleted ? (
                          <Typography
                            sx={{
                              color: "white",
                              fontSize: "12px",
                              fontWeight: "bold",
                            }}
                          >
                            ✓
                          </Typography>
                        ) : isCurrent ? (
                          <Box
                            sx={{
                              width: 8,
                              height: 8,
                              borderRadius: "50%",
                              background: "white",
                            }}
                          />
                        ) : (
                          <Box
                            sx={{
                              color: THEME_COLORS.primary,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            {item.icon}
                          </Box>
                        )}
                      </Box>
                      <Typography
                        variant="body2"
                        sx={{
                          mt: 0.5,
                          fontWeight: 600,
                          color:
                            isCompleted || isCurrent
                              ? THEME_COLORS.primary
                              : "rgba(17, 82, 147, 0.6)",
                          fontSize: "0.75rem",
                          textAlign: "center",
                        }}
                      >
                        {item.label}
                      </Typography>
                    </Box>
                    {index < 3 && (
                      <Box
                        sx={{
                          flex: 1,
                          height: 2,
                          background: isCompleted
                            ? THEME_COLORS.primary
                            : "rgba(17, 82, 147, 0.3)",
                          borderRadius: 1,
                        }}
                      />
                    )}
                  </React.Fragment>
                );
              });
            })()}
          </Box>

          {/* Timeline Card - Starting from Protocol Request - Nested inside Main Card */}
          <Box
            sx={{
              mt: 1,
              mx: 2.5,
              mb: 2.5,
              borderRadius: "20px",
              bgcolor: "#BBDAFA",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              border: "1px solid rgba(17,82,147,0.12)",

              overflow: "hidden",
            }}
          >
            {/* Timeline Section */}
            <Box
              sx={{
                bgcolor: "transparent",
                borderRadius: "20px",
              }}
            >
              {/* Timeline Header */}
              <Box
                sx={{
                  px: 3,
                  py: 2.5,
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  borderBottom: "1px solid rgba(17,82,147,0.12)",
                }}
              >
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {currentStage === "order" ? (
                    <IconPackage size={30} color={THEME_COLORS.primary} />
                  ) : currentStage === "procurement" ? (
                    <img
                      src="/boxes_svgrepo.com.svg"
                      alt="Procurement"
                      width={20}
                      height={20}
                    />
                  ) : currentStage === "technical" ? (
                    <img
                      src="/technicalicon.svg"
                      alt="Technical"
                      width={20}
                      height={20}
                    />
                  ) : (
                    <img
                      src="/delivery_svgrepo.com.svg"
                      alt="Delivery"
                      width={20}
                      height={20}
                    />
                  )}
                </Box>
                <Typography
                  sx={{
                    color: THEME_COLORS.primary,
                    fontWeight: 700,
                    fontSize: "1.05rem",
                  }}
                >
                  {currentStage === "order"
                    ? "Order"
                    : currentStage === "procurement"
                      ? "Procurement"
                      : currentStage === "technical"
                        ? "Technical"
                        : "Delivery"}
                </Typography>
              </Box>
              {/* Timeline Content with single vertical line */}
              <Box
                sx={{
                  position: "relative",
                  px: 3,
                  py: 2,
                }}
              >
                {currentStage === "order" ? (
                  <>
                    {(() => {
                      const orderTimelineItems = [
                        {
                          title: "Protocol Request",
                          date: selectedItem.orderStatus?.protocolRequest,
                          key: "protocolRequest",
                        },
                        {
                          title: "Protocol Acceptance",
                          date: selectedItem.orderStatus?.protocolAcceptance,
                          key: "protocolAcceptance",
                        },
                        {
                          title: "Order Booked",
                          date: selectedItem.orderStatus?.orderBooked,
                          key: "orderBooked",
                        },
                        {
                          title: "Document Verification",
                          date: selectedItem.orderStatus?.documentVerification
                            ? typeof selectedItem.orderStatus
                                .documentVerification === "object" &&
                              selectedItem.orderStatus.documentVerification
                                .datetime
                              ? selectedItem.orderStatus.documentVerification
                                  .datetime
                              : selectedItem.orderStatus.documentVerification
                            : null,
                          upload: true,
                          key: "documentVerification",
                        },
                        {
                          title: "Order Approved",
                          date: selectedItem.orderStatus?.orderApproved,
                          key: "orderApproved",
                        },
                      ];

                      const totalItems = orderTimelineItems.length;

                      return orderTimelineItems.map((row, i, arr) => {
                        const isCompleted =
                          row.date !== null && row.date !== undefined;
                        // Determine if previous step is completed (for first item, assume yes/start)
                        const isPreviousCompleted =
                          i === 0
                            ? true
                            : arr[i - 1].date !== null &&
                              arr[i - 1].date !== undefined;
                        const isCurrent = !isCompleted && isPreviousCompleted;

                        // Line colors
                        const topLineColor = isPreviousCompleted
                          ? THEME_COLORS.primary
                          : "rgba(17, 82, 147, 0.3)";
                        const bottomLineColor = isCompleted
                          ? THEME_COLORS.primary
                          : "rgba(17, 82, 147, 0.3)";

                        return (
                          <Box
                            key={row.key}
                            sx={{
                              display: "flex",
                              alignItems: "stretch",
                              gap: 2,
                              position: "relative",
                              zIndex: 1,
                            }}
                          >
                            {/* Left Column with Lines and Circle */}
                            <Box
                              sx={{
                                width: 44,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                flexShrink: 0,
                                position: "relative",
                              }}
                            >
                              {/* Top Line */}
                              {i > 0 && (
                                <Box
                                  sx={{
                                    position: "absolute",
                                    top: 0,
                                    left: "50%",
                                    height: "16px", // Matches py: 2 (16px) top padding
                                    width: "2px",
                                    bgcolor: topLineColor,
                                    transform: "translateX(-50%)",
                                    zIndex: 0,
                                  }}
                                />
                              )}

                              {/* Bottom Line */}
                              {i < totalItems - 1 && (
                                <Box
                                  sx={{
                                    position: "absolute",
                                    top: "38px", // 16px (padding) + 22px (circle)
                                    bottom: 0,
                                    left: "50%",
                                    width: "2px",
                                    bgcolor: bottomLineColor,
                                    transform: "translateX(-50%)",
                                    zIndex: 0,
                                  }}
                                />
                              )}

                              {/* Circle Container - needs to match py: 2 of content */}
                              <Box
                                sx={{ mt: 2, position: "relative", zIndex: 2 }}
                              >
                                {isCompleted ? (
                                  <Box
                                    sx={{
                                      width: 22,
                                      height: 22,
                                      borderRadius: "50%",
                                      bgcolor: THEME_COLORS.primary,
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      color: "white",
                                      fontSize: "12px",
                                      fontWeight: 700,
                                    }}
                                  >
                                    ✓
                                  </Box>
                                ) : isCurrent ? (
                                  <Box
                                    sx={{
                                      width: 22,
                                      height: 22,
                                      borderRadius: "50%",
                                      border: `2px solid ${THEME_COLORS.primary}`,
                                      bgcolor: "#BBDAFA",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <Box
                                      sx={{
                                        width: 10,
                                        height: 10,
                                        borderRadius: "50%",
                                        bgcolor: THEME_COLORS.primary,
                                      }}
                                    />
                                  </Box>
                                ) : (
                                  <Box
                                    sx={{
                                      width: 22,
                                      height: 22,
                                      borderRadius: "50%",
                                      border: `2px solid ${THEME_COLORS.primary}`,
                                      bgcolor: "#BBDAFA",
                                    }}
                                  />
                                )}
                              </Box>
                            </Box>
                            <Box sx={{ flex: 1, py: 2 }}>
                              <Typography
                                sx={{
                                  fontWeight: 700,
                                  color:
                                    isCompleted || isCurrent
                                      ? THEME_COLORS.primary
                                      : "rgba(17, 82, 147, 0.6)",
                                }}
                              >
                                {row.title}
                              </Typography>
                              {row.date && (
                                <Typography
                                  variant="caption"
                                  sx={{ color: "rgba(17, 82, 147, 0.6)" }}
                                >
                                  {formatDateAndTime(row.date)}
                                </Typography>
                              )}
                              {row.upload && (
                                <Typography
                                  variant="caption"
                                  sx={{
                                    color: "rgba(17, 82, 147, 0.75)",
                                    display: "block",
                                    mt: 0.5,
                                  }}
                                >
                                  Upload the signed protocol or necessary
                                  supporting documents to proceed.
                                </Typography>
                              )}
                              {row.upload && selectedItem && (
                                <>
                                  <Box
                                    sx={{
                                      mt: 2,
                                      p: { xs: 2.5, md: 3 },
                                      border: `2px ${
                                        dragActiveItem === selectedItem.id
                                          ? "solid"
                                          : "dashed"
                                      } ${THEME_COLORS.primary}`,
                                      borderRadius: "20px",
                                      bgcolor:
                                        dragActiveItem === selectedItem.id
                                          ? "rgba(17,82,147,0.12)"
                                          : "#BBDAFA",
                                      maxWidth: 760,
                                      transition:
                                        "border-color 0.2s ease, background-color 0.2s ease",
                                    }}
                                    onDragEnter={(event) => {
                                      event.preventDefault();
                                      setDragActiveItem(selectedItem.id);
                                    }}
                                    onDragOver={(event) => {
                                      event.preventDefault();
                                      setDragActiveItem(selectedItem.id);
                                    }}
                                    onDragLeave={(event) => {
                                      const nextTarget =
                                        event.relatedTarget as Node | null;
                                      if (
                                        nextTarget &&
                                        event.currentTarget.contains(nextTarget)
                                      ) {
                                        return;
                                      }
                                      setDragActiveItem(null);
                                    }}
                                    onDrop={(event) =>
                                      handleDropFiles(event, selectedItem.id)
                                    }
                                  >
                                    <Box
                                      sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        gap: 1.5,
                                        textAlign: "center",
                                      }}
                                    >
                                      <Box
                                        sx={{
                                          width: 20,
                                          height: 20,
                                          borderRadius: "16px",
                                          // background:
                                          //   "linear-gradient(135deg, #c6dbff 100%)",
                                          // border: `1px. solid rgba(17,82,147,0.2)`,
                                          display: "flex",
                                          alignItems: "center",
                                          justifyContent: "center",
                                        }}
                                      >
                                        <IconFolder
                                          size={36}
                                          color={THEME_COLORS.primary}
                                        />
                                      </Box>
                                      <Typography
                                        variant="body1"
                                        sx={{
                                          color: THEME_COLORS.primary,
                                          fontWeight: 700,
                                        }}
                                      >
                                        Drag your file(s) to start uploading
                                      </Typography>
                                      <Typography
                                        variant="caption"
                                        sx={{ color: "rgba(17,82,147,0.75)" }}
                                      >
                                        Supported formats: PDF, DOCX, JPEG, PNG
                                      </Typography>
                                      <Box
                                        sx={{
                                          width: "100%",
                                          display: "flex",
                                          alignItems: "center",
                                          gap: 1.5,
                                          mt: 0.5,
                                        }}
                                      >
                                        <Box
                                          sx={{
                                            flex: 1,
                                            height: 1,
                                            bgcolor: "rgba(17,82,147,0.2)",
                                          }}
                                        />
                                        <Typography
                                          variant="caption"
                                          sx={{ color: "rgba(17,82,147,0.8)" }}
                                        >
                                          OR
                                        </Typography>
                                        <Box
                                          sx={{
                                            flex: 1,
                                            height: 1,
                                            bgcolor: "rgba(17,82,147,0.2)",
                                            borderRadius: "1009px",
                                          }}
                                        />
                                      </Box>
                                      <Button
                                        variant="outlined"
                                        component="label"
                                        sx={{
                                          textTransform: "none",
                                          borderRadius: "1009px",
                                          borderColor: THEME_COLORS.primary,
                                          color: THEME_COLORS.primary,
                                          px: 4,
                                          fontWeight: 600,
                                          backgroundColor:
                                            "rgba(17,82,147,0.1)",
                                          "&:hover": {
                                            borderColor: "#0d4078",
                                            backgroundColor:
                                              "rgba(17,82,147,0.18)",
                                          },
                                        }}
                                        disabled={
                                          !!uploadingByItem[selectedItem.id]
                                        }
                                      >
                                        {uploadingByItem[selectedItem.id]
                                          ? "Uploading…"
                                          : "Browse files"}
                                        <input
                                          hidden
                                          type="file"
                                          multiple
                                          accept={acceptedFileInput}
                                          onChange={(event) =>
                                            handleFileInputChange(
                                              event,
                                              selectedItem.id
                                            )
                                          }
                                        />
                                      </Button>
                                    </Box>

                                    {uploadStatusMessage[selectedItem.id] && (
                                      <Alert
                                        severity={
                                          uploadStatusMessage[selectedItem.id]
                                            .type
                                        }
                                        sx={{
                                          mt: 2,
                                          backgroundColor:
                                            "rgba(17,82,147,0.15)",
                                          color: THEME_COLORS.primary,
                                          border: `1px solid rgba(17,82,147,0.25)`,
                                          "& .MuiAlert-icon": {
                                            color: THEME_COLORS.primary,
                                          },
                                        }}
                                      >
                                        {
                                          uploadStatusMessage[selectedItem.id]
                                            .message
                                        }
                                      </Alert>
                                    )}

                                    {uploadProgress[selectedItem.id] && (
                                      <Box sx={{ mt: 2 }}>
                                        {Object.entries(
                                          uploadProgress[selectedItem.id]
                                        ).map(([key, data]) => (
                                          <Box key={key} sx={{ mb: 1.5 }}>
                                            <Box
                                              sx={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                                mb: 0.5,
                                              }}
                                            >
                                              <Typography
                                                variant="body2"
                                                sx={{
                                                  color: THEME_COLORS.primary,
                                                }}
                                              >
                                                {data.name}
                                              </Typography>
                                              <Typography
                                                variant="caption"
                                                sx={{
                                                  color: THEME_COLORS.primary,
                                                }}
                                              >
                                                {data.progress}%
                                              </Typography>
                                            </Box>
                                            <LinearProgress
                                              variant="determinate"
                                              value={data.progress}
                                              sx={{
                                                height: 6,
                                                borderRadius: 3,
                                                backgroundColor:
                                                  "rgba(17,82,147,0.15)",
                                                "& .MuiLinearProgress-bar": {
                                                  backgroundColor:
                                                    THEME_COLORS.primary,
                                                },
                                              }}
                                            />
                                          </Box>
                                        ))}
                                      </Box>
                                    )}
                                  </Box>

                                  {uploadedFiles[selectedItem.id] &&
                                    uploadedFiles[selectedItem.id].length >
                                      0 && (
                                      <Box
                                        sx={{
                                          mt: 3,
                                          display: "flex",
                                          gap: 2,
                                          flexDirection: "column",
                                          maxWidth: 760,
                                        }}
                                      >
                                        {uploadedFiles[selectedItem.id].map(
                                          (file) => (
                                            <Box
                                              key={file.id}
                                              sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 2,
                                                p: 1.5,
                                                borderRadius: "18px",
                                                backgroundColor:
                                                  "rgba(17,82,147,0.12)",
                                                border: `1px solid rgba(17,82,147,0.25)`,
                                              }}
                                            >
                                              <Box
                                                sx={{
                                                  width: 56,
                                                  height: 56,
                                                  borderRadius: "12px",
                                                  background:
                                                    "linear-gradient(135deg, #d4e4ff 0%, #a8c8ff 70%)",
                                                  display: "flex",
                                                  alignItems: "center",
                                                  justifyContent: "center",
                                                  fontWeight: 700,
                                                  color: THEME_COLORS.primary,
                                                  border:
                                                    "1px solid rgba(17,82,147,0.3)",
                                                  textTransform: "uppercase",
                                                  fontSize: "0.75rem",
                                                }}
                                              >
                                                {(
                                                  file.name.split(".").pop() ||
                                                  "file"
                                                ).slice(0, 3)}
                                              </Box>
                                              <Box sx={{ flex: 1 }}>
                                                <Typography
                                                  variant="body2"
                                                  sx={{
                                                    color: THEME_COLORS.primary,
                                                    fontWeight: 700,
                                                  }}
                                                >
                                                  {file.name}
                                                </Typography>
                                                <Typography
                                                  variant="caption"
                                                  sx={{
                                                    color:
                                                      "rgba(17,82,147,0.75)",
                                                  }}
                                                >
                                                  {formatFileSize(file.size)}
                                                </Typography>
                                              </Box>
                                              <Box
                                                sx={{ display: "flex", gap: 1 }}
                                              >
                                                {(file.url ||
                                                  file.localUrl) && (
                                                  <Tooltip title="View file">
                                                    <IconButton
                                                      size="small"
                                                      onClick={() =>
                                                        handlePreviewFile(file)
                                                      }
                                                      sx={{
                                                        width: 36,
                                                        height: 36,
                                                        borderRadius: "50%",
                                                        border: `1px solid rgba(17,82,147,0.3)`,
                                                        backgroundColor:
                                                          "rgba(17,82,147,0.08)",
                                                      }}
                                                    >
                                                      <IconEye
                                                        size={18}
                                                        color={
                                                          THEME_COLORS.primary
                                                        }
                                                      />
                                                    </IconButton>
                                                  </Tooltip>
                                                )}
                                                <Tooltip title="Delete file">
                                                  <IconButton
                                                    size="small"
                                                    onClick={() =>
                                                      handleFileRemove(
                                                        selectedItem.id,
                                                        file.id
                                                      )
                                                    }
                                                    sx={{
                                                      width: 36,
                                                      height: 36,
                                                      borderRadius: "50%",
                                                      border: `1px solid rgba(17,82,147,0.3)`,
                                                      backgroundColor:
                                                        "rgba(17,82,147,0.08)",
                                                    }}
                                                  >
                                                    <IconX
                                                      size={18}
                                                      color={
                                                        THEME_COLORS.primary
                                                      }
                                                    />
                                                  </IconButton>
                                                </Tooltip>
                                              </Box>
                                            </Box>
                                          )
                                        )}
                                      </Box>
                                    )}
                                </>
                              )}
                            </Box>
                          </Box>
                        );
                      });
                    })()}

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: 2,
                        mt: 3,
                        mb: 2,
                        px: 3,
                      }}
                    >
                      {/* <Button
                    variant="outlined"
                    onClick={() => setIsInlineStatusView(false)}
                    sx={{
                      minWidth: 100,
                      textTransform: "none",
                      borderColor: THEME_COLORS.primary,
                      color: THEME_COLORS.primary,
                      "&:hover": {
                        borderColor: "#0d4078",
                        backgroundColor: "rgba(17, 82, 147, 0.04)",
                      },
                    }}
                  >
                    Back
                  </Button> */}
                      <Button
                        variant="contained"
                        onClick={() => setCurrentStage("procurement")}
                        disabled={!selectedItem.orderStatus?.orderApproved}
                        sx={{
                          minWidth: 100,
                          textTransform: "none",
                          backgroundColor: THEME_COLORS.primary,
                          color: "white",
                          "&:hover": { backgroundColor: "#0d4078" },
                          "&:disabled": {
                            backgroundColor: "rgba(17, 82, 147, 0.3)",
                            color: "rgba(255, 255, 255, 0.6)",
                          },
                        }}
                      >
                        Next
                      </Button>
                    </Box>
                  </>
                ) : currentStage === "procurement" ? (
                  <>
                    {(() => {
                      const procurementTimelineItems = [
                        {
                          title: "Protocol Request",
                          date: selectedItem.orderStatus
                            ?.procurementProtocolRequest,
                          key: "procurementProtocolRequest",
                        },
                        {
                          title: "Protocol Acceptance",
                          date: selectedItem.orderStatus
                            ?.procurementProtocolAcceptance,
                          key: "procurementProtocolAcceptance",
                        },
                      ];

                      const totalItems = procurementTimelineItems.length;

                      return procurementTimelineItems.map((row, i, arr) => {
                        const isCompleted =
                          row.date !== null && row.date !== undefined;
                        // Determine if previous step is completed (for first item, assume yes/start)
                        const isPreviousCompleted =
                          i === 0
                            ? true
                            : arr[i - 1].date !== null &&
                              arr[i - 1].date !== undefined;
                        const isCurrent = !isCompleted && isPreviousCompleted;

                        // Line colors
                        const topLineColor = isPreviousCompleted
                          ? THEME_COLORS.primary
                          : "rgba(17, 82, 147, 0.3)";
                        const bottomLineColor = isCompleted
                          ? THEME_COLORS.primary
                          : "rgba(17, 82, 147, 0.3)";

                        return (
                          <Box
                            key={row.key}
                            sx={{
                              display: "flex",
                              alignItems: "stretch",
                              gap: 2,
                              position: "relative",
                              zIndex: 1,
                            }}
                          >
                            {/* Left Column with Lines and Circle */}
                            <Box
                              sx={{
                                width: 44,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                flexShrink: 0,
                                position: "relative",
                              }}
                            >
                              {/* Top Line */}
                              {i > 0 && (
                                <Box
                                  sx={{
                                    position: "absolute",
                                    top: 0,
                                    left: "50%",
                                    height: "16px", // Matches py: 2 (16px) top padding
                                    width: "2px",
                                    bgcolor: topLineColor,
                                    transform: "translateX(-50%)",
                                    zIndex: 0,
                                  }}
                                />
                              )}

                              {/* Bottom Line */}
                              {i < totalItems - 1 && (
                                <Box
                                  sx={{
                                    position: "absolute",
                                    top: "38px", // 16px (padding) + 22px (circle)
                                    bottom: 0,
                                    left: "50%",
                                    width: "2px",
                                    bgcolor: bottomLineColor,
                                    transform: "translateX(-50%)",
                                    zIndex: 0,
                                  }}
                                />
                              )}

                              {/* Circle Container - needs to match py: 2 of content */}
                              <Box
                                sx={{ mt: 2, position: "relative", zIndex: 2 }}
                              >
                                {isCompleted ? (
                                  <Box
                                    sx={{
                                      width: 22,
                                      height: 22,
                                      borderRadius: "50%",
                                      bgcolor: THEME_COLORS.primary,
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      color: "white",
                                      fontSize: "12px",
                                      fontWeight: 700,
                                    }}
                                  >
                                    ✓
                                  </Box>
                                ) : isCurrent ? (
                                  <Box
                                    sx={{
                                      width: 22,
                                      height: 22,
                                      borderRadius: "50%",
                                      border: `2px solid ${THEME_COLORS.primary}`,
                                      bgcolor: "#BBDAFA",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <Box
                                      sx={{
                                        width: 10,
                                        height: 10,
                                        borderRadius: "50%",
                                        bgcolor: THEME_COLORS.primary,
                                      }}
                                    />
                                  </Box>
                                ) : (
                                  <Box
                                    sx={{
                                      width: 22,
                                      height: 22,
                                      borderRadius: "50%",
                                      border: `2px solid ${THEME_COLORS.primary}`,
                                      bgcolor: "#BBDAFA",
                                    }}
                                  />
                                )}
                              </Box>
                            </Box>
                            <Box sx={{ flex: 1, py: 2 }}>
                              <Typography
                                sx={{
                                  fontWeight: 700,
                                  color:
                                    isCompleted || isCurrent
                                      ? THEME_COLORS.primary
                                      : "rgba(17, 82, 147, 0.6)",
                                }}
                              >
                                {row.title}
                              </Typography>
                              {row.date && (
                                <Typography
                                  variant="caption"
                                  sx={{ color: "rgba(17, 82, 147, 0.6)" }}
                                >
                                  {formatDateAndTime(row.date)}
                                </Typography>
                              )}
                            </Box>
                          </Box>
                        );
                      });
                    })()}
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: 2,
                        mt: 3,
                        mb: 2,
                      }}
                    >
                      <Button
                        variant="outlined"
                        onClick={() => setCurrentStage("order")}
                        sx={{
                          textTransform: "none",
                          borderColor: THEME_COLORS.primary,
                          color: THEME_COLORS.primary,
                          "&:hover": {
                            borderColor: "#0d4078",
                            backgroundColor: "rgba(17, 82, 147, 0.04)",
                          },
                        }}
                      >
                        Back
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => setCurrentStage("technical")}
                        disabled={
                          !selectedItem.orderStatus
                            ?.procurementProtocolAcceptance
                        }
                        sx={{
                          textTransform: "none",
                          backgroundColor: THEME_COLORS.primary,
                          color: "white",
                          "&:hover": { backgroundColor: "#0d4078" },
                          "&:disabled": {
                            backgroundColor: "rgba(17, 82, 147, 0.3)",
                            color: "rgba(255, 255, 255, 0.6)",
                          },
                        }}
                      >
                        Next
                      </Button>
                    </Box>
                  </>
                ) : currentStage === "technical" ? (
                  <>
                    {(() => {
                      const technicalTimelineItems = [
                        {
                          title: "Project Initiated",
                          date: selectedItem.orderStatus
                            ?.technicalProjectInitiated,
                          key: "technicalProjectInitiated",
                        },
                        {
                          title: "Inprogress",
                          date: selectedItem.orderStatus?.technicalInProgress,
                          key: "technicalInProgress",
                        },
                        {
                          title: "In Review",
                          date: selectedItem.orderStatus?.technicalInReview,
                          key: "technicalInReview",
                        },
                        {
                          title: "Finance Approval",
                          date: selectedItem.orderStatus
                            ?.technicalFinanceApproval,
                          key: "technicalFinanceApproval",
                        },
                        {
                          title: "Draft Report",
                          date: selectedItem.orderStatus?.technicalDraftReport,
                          key: "technicalDraftReport",
                        },
                      ];

                      const totalItems = technicalTimelineItems.length;

                      return technicalTimelineItems.map((row, i, arr) => {
                        const isCompleted =
                          row.date !== null && row.date !== undefined;
                        // Determine if previous step is completed (for first item, assume yes/start)
                        const isPreviousCompleted =
                          i === 0
                            ? true
                            : arr[i - 1].date !== null &&
                              arr[i - 1].date !== undefined;
                        const isCurrent = !isCompleted && isPreviousCompleted;

                        // Line colors
                        const topLineColor = isPreviousCompleted
                          ? THEME_COLORS.primary
                          : "rgba(17, 82, 147, 0.3)";
                        const bottomLineColor = isCompleted
                          ? THEME_COLORS.primary
                          : "rgba(17, 82, 147, 0.3)";

                        return (
                          <Box
                            key={row.key}
                            sx={{
                              display: "flex",
                              alignItems: "stretch",
                              gap: 2,
                              position: "relative",
                              zIndex: 1,
                            }}
                          >
                            {/* Left Column with Lines and Circle */}
                            <Box
                              sx={{
                                width: 44,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                flexShrink: 0,
                                position: "relative",
                              }}
                            >
                              {/* Top Line */}
                              {i > 0 && (
                                <Box
                                  sx={{
                                    position: "absolute",
                                    top: 0,
                                    left: "50%",
                                    height: "16px", // Matches py: 2 (16px) top padding
                                    width: "2px",
                                    bgcolor: topLineColor,
                                    transform: "translateX(-50%)",
                                    zIndex: 0,
                                  }}
                                />
                              )}

                              {/* Bottom Line */}
                              {i < totalItems - 1 && (
                                <Box
                                  sx={{
                                    position: "absolute",
                                    top: "38px", // 16px (padding) + 22px (circle)
                                    bottom: 0,
                                    left: "50%",
                                    width: "2px",
                                    bgcolor: bottomLineColor,
                                    transform: "translateX(-50%)",
                                    zIndex: 0,
                                  }}
                                />
                              )}

                              {/* Circle Container - needs to match py: 2 of content */}
                              <Box
                                sx={{ mt: 2, position: "relative", zIndex: 2 }}
                              >
                                {isCompleted ? (
                                  <Box
                                    sx={{
                                      width: 22,
                                      height: 22,
                                      borderRadius: "50%",
                                      bgcolor: THEME_COLORS.primary,
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      color: "white",
                                      fontSize: "12px",
                                      fontWeight: 700,
                                    }}
                                  >
                                    ✓
                                  </Box>
                                ) : isCurrent ? (
                                  <Box
                                    sx={{
                                      width: 22,
                                      height: 22,
                                      borderRadius: "50%",
                                      border: `2px solid ${THEME_COLORS.primary}`,
                                      bgcolor: "#BBDAFA",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <Box
                                      sx={{
                                        width: 10,
                                        height: 10,
                                        borderRadius: "50%",
                                        bgcolor: THEME_COLORS.primary,
                                      }}
                                    />
                                  </Box>
                                ) : (
                                  <Box
                                    sx={{
                                      width: 22,
                                      height: 22,
                                      borderRadius: "50%",
                                      border: `2px solid ${THEME_COLORS.primary}`,
                                      bgcolor: "#BBDAFA",
                                    }}
                                  />
                                )}
                              </Box>
                            </Box>
                            <Box sx={{ flex: 1, py: 2 }}>
                              <Typography
                                sx={{
                                  fontWeight: 700,
                                  color:
                                    isCompleted || isCurrent
                                      ? THEME_COLORS.primary
                                      : "rgba(17, 82, 147, 0.6)",
                                }}
                              >
                                {row.title}
                              </Typography>
                              {row.date && (
                                <Typography
                                  variant="caption"
                                  sx={{ color: "rgba(17, 82, 147, 0.6)" }}
                                >
                                  {formatDateAndTime(row.date)}
                                </Typography>
                              )}
                            </Box>
                          </Box>
                        );
                      });
                    })()}
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: 2,
                        mt: 3,
                        mb: 2,
                      }}
                    >
                      <Button
                        variant="outlined"
                        onClick={() => setCurrentStage("procurement")}
                        sx={{
                          textTransform: "none",
                          borderColor: THEME_COLORS.primary,
                          color: THEME_COLORS.primary,
                          "&:hover": {
                            borderColor: "#0d4078",
                            backgroundColor: "rgba(17, 82, 147, 0.04)",
                          },
                        }}
                      >
                        Back
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => setCurrentStage("delivery")}
                        disabled={
                          !selectedItem.orderStatus?.technicalDraftReport
                        }
                        sx={{
                          textTransform: "none",
                          backgroundColor: THEME_COLORS.primary,
                          color: "white",
                          "&:hover": { backgroundColor: "#0d4078" },
                          "&:disabled": {
                            backgroundColor: "rgba(17, 82, 147, 0.3)",
                            color: "rgba(255, 255, 255, 0.6)",
                          },
                        }}
                      >
                        Next
                      </Button>
                    </Box>
                  </>
                ) : (
                  <>
                    {(() => {
                      const deliveryTimelineItems = [
                        {
                          title: "Final Report",
                          date: selectedItem.orderStatus?.deliveryFinalReport,
                          key: "deliveryFinalReport",
                        },
                        {
                          title: "Delivered",
                          date: selectedItem.orderStatus?.delivered,
                          key: "delivered",
                        },
                      ];

                      const totalItems = deliveryTimelineItems.length;

                      return deliveryTimelineItems.map((row, i, arr) => {
                        const isCompleted =
                          row.date !== null && row.date !== undefined;
                        // Determine if previous step is completed (for first item, assume yes/start)
                        const isPreviousCompleted =
                          i === 0
                            ? true
                            : arr[i - 1].date !== null &&
                              arr[i - 1].date !== undefined;
                        const isCurrent = !isCompleted && isPreviousCompleted;

                        // Line colors
                        const topLineColor = isPreviousCompleted
                          ? THEME_COLORS.primary
                          : "rgba(17, 82, 147, 0.3)";
                        const bottomLineColor = isCompleted
                          ? THEME_COLORS.primary
                          : "rgba(17, 82, 147, 0.3)";

                        return (
                          <Box
                            key={row.key}
                            sx={{
                              display: "flex",
                              alignItems: "stretch",
                              gap: 2,
                              position: "relative",
                              zIndex: 1,
                            }}
                          >
                            {/* Left Column with Lines and Circle */}
                            <Box
                              sx={{
                                width: 44,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                flexShrink: 0,
                                position: "relative",
                              }}
                            >
                              {/* Top Line */}
                              {i > 0 && (
                                <Box
                                  sx={{
                                    position: "absolute",
                                    top: 0,
                                    left: "50%",
                                    height: "16px", // Matches py: 2 (16px) top padding
                                    width: "2px",
                                    bgcolor: topLineColor,
                                    transform: "translateX(-50%)",
                                    zIndex: 0,
                                  }}
                                />
                              )}

                              {/* Bottom Line */}
                              {i < totalItems - 1 && (
                                <Box
                                  sx={{
                                    position: "absolute",
                                    top: "38px", // 16px (padding) + 22px (circle)
                                    bottom: 0,
                                    left: "50%",
                                    width: "2px",
                                    bgcolor: bottomLineColor,
                                    transform: "translateX(-50%)",
                                    zIndex: 0,
                                  }}
                                />
                              )}

                              {/* Circle Container - needs to match py: 2 of content */}
                              <Box
                                sx={{ mt: 2, position: "relative", zIndex: 2 }}
                              >
                                {isCompleted ? (
                                  <Box
                                    sx={{
                                      width: 22,
                                      height: 22,
                                      borderRadius: "50%",
                                      bgcolor: THEME_COLORS.primary,
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      color: "white",
                                      fontSize: "12px",
                                      fontWeight: 700,
                                    }}
                                  >
                                    ✓
                                  </Box>
                                ) : isCurrent ? (
                                  <Box
                                    sx={{
                                      width: 22,
                                      height: 22,
                                      borderRadius: "50%",
                                      border: `2px solid ${THEME_COLORS.primary}`,
                                      bgcolor: "#BBDAFA",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <Box
                                      sx={{
                                        width: 10,
                                        height: 10,
                                        borderRadius: "50%",
                                        bgcolor: THEME_COLORS.primary,
                                      }}
                                    />
                                  </Box>
                                ) : (
                                  <Box
                                    sx={{
                                      width: 22,
                                      height: 22,
                                      borderRadius: "50%",
                                      border: `2px solid ${THEME_COLORS.primary}`,
                                      bgcolor: "#BBDAFA",
                                    }}
                                  />
                                )}
                              </Box>
                            </Box>
                            <Box sx={{ flex: 1, py: 2 }}>
                              <Typography
                                sx={{
                                  fontWeight: 700,
                                  color:
                                    isCompleted || isCurrent
                                      ? THEME_COLORS.primary
                                      : "rgba(17, 82, 147, 0.6)",
                                }}
                              >
                                {row.title}
                              </Typography>
                              {row.date && (
                                <Typography
                                  variant="caption"
                                  sx={{ color: "rgba(17, 82, 147, 0.6)" }}
                                >
                                  {formatDateAndTime(row.date)}
                                </Typography>
                              )}
                            </Box>
                          </Box>
                        );
                      });
                    })()}
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: 2,
                        mt: 3,
                        mb: 2,
                      }}
                    >
                      <Button
                        variant="outlined"
                        onClick={() => setCurrentStage("technical")}
                        sx={{
                          textTransform: "none",
                          borderColor: THEME_COLORS.primary,
                          color: THEME_COLORS.primary,
                          "&:hover": {
                            borderColor: "#0d4078",
                            backgroundColor: "rgba(17, 82, 147, 0.04)",
                          },
                        }}
                      >
                        Back
                      </Button>
                    </Box>
                  </>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box>
      {/* Orders Content - Using Cart Items as Data Source */}

      {/* Header with Tabs - Updated to show Order Status tabs */}
      <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
        <Tabs
          value={subTab}
          onChange={onSubTabChange}
          sx={{
            "& .MuiTab-root": {
              textTransform: "none",
              fontWeight: 700,
              fontSize: "0.75rem",
              width: "169px",
              height: "24px",
              borderRadius: "43.33px",
              border: "1px solid #9CA3AF",
              backgroundColor: "#B6D1F8",
              color: THEME_COLORS.primary,
              padding: "2px 16px",
              margin: "0 5.415px",
              "&.Mui-selected": {
                backgroundColor: THEME_COLORS.secondary,
                color: "white !important",
                border: "1px solid " + THEME_COLORS.secondary,
                "&:hover": {
                  backgroundColor: THEME_COLORS.secondary,
                },
              },
              "&:hover:not(.Mui-selected)": {
                backgroundColor: "rgba(25, 118, 210, 0.1)",
              },
            },
            "& .MuiTabs-indicator": {
              display: "none",
            },
            "& .MuiTabs-flexContainer": {
              borderBottom: "none",
            },
          }}
        >
          <Tab label="Pending" value="pending" />
          <Tab label="Delivered" value="delivered" />
          <Tab label="Cancelled" value="cancelled" />
        </Tabs>
      </Box>

      {/* Content */}
      <Box sx={{ p: 3 }}>
        {currentData.length === 0 ? (
          <Box
            sx={{
              textAlign: "center",
              py: 8,
              color: "text.secondary",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                mb: 3,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img
                src={NothingFound.src}
                alt="Nothing to show here"
                style={{
                  width: "300px",
                  height: "200px",
                  objectFit: "contain",
                }}
              />
            </Box>
            <Typography
              variant="h6"
              sx={{
                mt: 1,
                color: THEME_COLORS.primary,
                fontWeight: 700,
              }}
            >
              Nothing to show here !
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              width: "100%",
            }}
          >
            {Object.entries(
              currentData.reduce(
                (groups, item) => {
                  const groupKey =
                    item.sessionId || item.quotationNo || item.createdOn;
                  if (!groups[groupKey]) {
                    groups[groupKey] = [];
                  }
                  groups[groupKey].push(item);
                  return groups;
                },
                {} as Record<string, BaseItem[]>
              )
            ).map(([groupKey, items]) => {
              const { subtotal, gst, grandTotal } = calculateGroupTotal(items);
              const statusBadge = getOrderStatusBadge();

              return (
                <React.Fragment key={`order-group-${groupKey}`}>
                  <Card
                    elevation={0}
                    sx={{
                      width: "100%",
                      minHeight: "auto",
                      borderRadius: "8px",
                      background: "rgba(17, 82, 147, 0.082)",
                      padding: "14px",
                      gap: "10px",
                      boxShadow:
                        "0px 1px 10px 0px rgba(0, 0, 0, 0.12), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 2px 4px -1px rgba(0, 0, 0, 0.20)",
                      transition: "all 0.2s ease-in-out",
                      display: "flex",
                      flexDirection: "column",
                      "&:hover": {
                        boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.15)",
                        transform: "translateY(-2px)",
                      },
                    }}
                  >
                    <CardContent
                      sx={{
                        p: 0,
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                        gap: "16px",
                      }}
                    >
                      {/* Order Header Section */}
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          mb: 1,
                          flexWrap: "wrap",
                          gap: 2,
                          pb: 2,
                          borderBottom: `0.4px solid ${THEME_COLORS.primary}40`, // adds 25% opacity
                        }}
                      >
                        {/* Columns container: labels on top, values below (Figma style) */}
                        <Box sx={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                          {/* Order Status */}
                          <Box
                            sx={{
                              minWidth: 160,
                              display: "flex",
                              flexDirection: "column",
                              gap: 0.5,
                            }}
                          >
                            <Typography
                              variant="body2"
                              sx={{
                                color: THEME_COLORS.primary,
                                fontSize: "0.875rem",
                                fontWeight: 600,
                              }}
                            >
                              Order Status
                            </Typography>
                            <Chip
                              icon={<IconCheck size={16} />}
                              label={statusBadge.label}
                              size="small"
                              sx={{
                                width: "fit-content",
                                backgroundColor: statusBadge.color,
                                color: "white",
                                fontWeight: 600,
                                "& .MuiChip-icon": { color: "white" },
                              }}
                            />
                          </Box>

                          {/* Ordered Number */}
                          <Box
                            sx={{
                              minWidth: 180,
                              display: "flex",
                              flexDirection: "column",
                              gap: 0.5,
                            }}
                          >
                            <Typography
                              variant="body2"
                              sx={{
                                color: THEME_COLORS.primary,
                                fontSize: "0.875rem",
                                fontWeight: 600,
                              }}
                            >
                              Ordered Number
                            </Typography>
                            <Typography
                              sx={{ color: "#115293", fontWeight: 700 }}
                            >
                              #{items[0].quotationNo}
                            </Typography>
                          </Box>

                          {/* Ordered Date */}
                          <Box
                            sx={{
                              minWidth: 180,
                              display: "flex",
                              flexDirection: "column",
                              gap: 0.5,
                            }}
                          >
                            <Typography
                              variant="body2"
                              sx={{
                                color: THEME_COLORS.primary,
                                fontSize: "0.875rem",
                                fontWeight: 600,
                              }}
                            >
                              Ordered Date
                            </Typography>
                            <Typography
                              sx={{ color: "#115293", fontWeight: 700 }}
                            >
                              {formatDate(items[0].createdOn)}
                            </Typography>
                          </Box>

                          {/* Total Amount */}
                          <Box
                            sx={{
                              minWidth: 160,
                              display: "flex",
                              flexDirection: "column",
                              gap: 0.5,
                            }}
                          >
                            <Typography
                              variant="body2"
                              sx={{
                                color: THEME_COLORS.primary,
                                fontSize: "0.875rem",
                                fontWeight: 600,
                              }}
                            >
                              Total Amount
                            </Typography>
                            <Typography
                              sx={{ color: "#115293", fontWeight: 700 }}
                            >
                              ₹
                              {Math.round(
                                calculateGroupTotal(items).grandTotal
                              ).toLocaleString("en-IN")}
                            </Typography>
                          </Box>
                        </Box>

                        {/* Far Right - Actions (Download / Cancel) */}
                        <Box
                          sx={{ display: "flex", gap: 1, ml: "auto", mt: 1 }}
                        >
                          <Button
                            variant="contained"
                            onClick={() => handleGroupDownload(items, groupKey)}
                            disabled={
                              downloadingItems.has(`group-${groupKey}`) ||
                              subTab === "cancelled"
                            }
                            sx={{
                              width: "140px",
                              height: "36px",
                              background:
                                "linear-gradient(105.34deg, #115293 0%, #1976D2 50%, #115293 100%)",
                              color: "white",
                              textTransform: "none",
                              fontWeight: 700,
                              borderRadius: "8px",
                              "&:hover": {
                                background:
                                  "linear-gradient(105.34deg, #0d3d6b 0%, #1565c0 50%, #0d3d6b 100%)",
                              },
                              "&:disabled": { opacity: 0.6, color: "white" },
                            }}
                          >
                            {downloadingItems.has(`group-${groupKey}`)
                              ? "Downloading..."
                              : "Download"}
                          </Button>
                          <Button
                            variant="outlined"
                            onClick={() => handleGroupDelete(items, groupKey)}
                            disabled={subTab !== "pending"}
                            sx={{
                              width: "120px",
                              height: "36px",
                              borderColor: "#9CA3AF",
                              color: "#115293",
                              textTransform: "none",
                              fontWeight: 700,
                              borderRadius: "8px",
                              "&:hover": {
                                borderColor: "#0d4078",
                                backgroundColor: "rgba(17, 82, 147, 0.04)",
                              },
                              "&:disabled": { opacity: 0.6 },
                            }}
                          >
                            Cancel
                          </Button>
                        </Box>
                      </Box>

                      {/* Full data card starting from Order Number (Figma style) */}
                      <Box
                        sx={{
                          mt: 2,
                          borderRadius: 2,
                          // border: `1px solid ${THEME_COLORS.primary}`,
                          // background: 'rgba(17,82,147,0.08)',
                          p: 2.5,
                          // boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                        }}
                      >
                        {/* Display Order Items */}
                        {items.map((item, index) => (
                          <Box
                            key={`item-${index}`}
                            sx={{ width: "100%", mb: 3 }}
                          >
                            {/* Study Type Badge and Image with Expected on (top-right) */}
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                gap: 2,
                                mb: 2,
                              }}
                            >
                              <Avatar
                                src={item.image}
                                sx={{
                                  width: 60,
                                  height: 60,
                                  borderRadius: "8px",
                                }}
                              />
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "flex-start",
                                  gap: 0.5,
                                }}
                              >
                                <Box
                                  sx={{
                                    width: "fit-content",
                                    minWidth: "200px",
                                    height: "auto",
                                    background:
                                      "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, #B0D2F6 25%, #9BC4F2 70%, #87B7EE 100%)",
                                    border: `1px solid #1976d2`,
                                    borderRadius: "6px",
                                    padding: { xs: "6px 12px", sm: "4px 8px" },
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    boxShadow:
                                      "0px 2px 4px rgba(25, 118, 210, 0.2)",
                                    overflow: "visible",
                                  }}
                                >
                                  <Typography
                                    variant="body2"
                                    sx={{
                                      color: THEME_COLORS.secondary,
                                      fontWeight: 600,
                                      fontSize: "0.75rem",
                                      textAlign: "center",
                                      lineHeight: 1.2,
                                    }}
                                  >
                                    • {item.studyType}
                                  </Typography>
                                </Box>
                                {(item.config_no ||
                                  item.orderStatus?.configNo) && (
                                  <Typography
                                    variant="body2"
                                    sx={{
                                      color: "#115293",
                                      fontWeight: 600,
                                      fontSize: "0.875rem",
                                      ml: 1,
                                    }}
                                  >
                                    #
                                    {item.config_no ||
                                      item.orderStatus?.configNo}
                                  </Typography>
                                )}
                              </Box>
                              <Typography
                                variant="body2"
                                sx={{
                                  ml: "auto",
                                  color: "#115293",
                                  fontWeight: 600,
                                }}
                              >
                                Expected on{" "}
                                <span
                                  style={{ color: "#115293", fontWeight: 700 }}
                                >
                                  {formatExpectedDate(item.validTill)}
                                </span>
                              </Typography>
                            </Box>

                            {/* Main Content Layout */}
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "flex-start",
                                mb: 2,
                              }}
                            >
                              {/* Left Side - Sample Details */}
                              <Box sx={{ flex: 1, pr: 2 }}>
                                {/* Sample Description */}
                                {item.sampleDescription && (
                                  <Typography
                                    variant="body2"
                                    sx={{
                                      color: "#115293",
                                      mb: 2,
                                      lineHeight: 1.4,
                                    }}
                                  >
                                    <strong>Sample Description:</strong>{" "}
                                    {item.sampleDescription}
                                  </Typography>
                                )}

                                {/* Product Details */}
                                <Box sx={{ mb: 1 }}>
                                  <Typography
                                    variant="body2"
                                    sx={{ color: "#115293", mb: 0.5 }}
                                  >
                                    • <strong>No of Samples:</strong>{" "}
                                    {item.numberOfSamples}
                                  </Typography>
                                  {item.category && (
                                    <Typography
                                      variant="body2"
                                      sx={{ color: "#115293", mb: 0.5 }}
                                    >
                                      • <strong>Product Type:</strong>{" "}
                                      {item.category}
                                    </Typography>
                                  )}
                                  {/* Expected Date - removed from body to avoid duplication with header */}
                                </Box>
                              </Box>

                              {/* Right Side - Action Buttons */}
                              <Box sx={{ display: "flex", gap: 1 }}>
                                <Button
                                  variant="text"
                                  onClick={() => handleViewStatusClick(item)}
                                  sx={{
                                    color: "#115293",
                                    textTransform: "none",
                                    fontSize: "0.875rem",
                                    fontWeight: 600,
                                    "&:hover": {
                                      backgroundColor: "transparent",
                                      textDecoration: "underline",
                                    },
                                  }}
                                >
                                  View Status
                                </Button>
                                <Box
                                  sx={{
                                    mt: 1,
                                    width: "1px",
                                    height: "30px",
                                    backgroundColor: "#115293",
                                    opacity: 0.3,
                                  }}
                                />
                                <Button
                                  variant="text"
                                  onClick={() => handleViewDetailsClick(item)}
                                  sx={{
                                    color: "#115293",
                                    textTransform: "none",
                                    fontSize: "0.875rem",
                                    fontWeight: 600,
                                    "&:hover": {
                                      backgroundColor: "transparent",
                                      textDecoration: "underline",
                                    },
                                  }}
                                >
                                  View Details
                                </Button>
                              </Box>
                            </Box>

                            {/* Border line between studies */}
                            {index < items.length - 1 && (
                              <Box
                                sx={{
                                  borderBottom: `0.4px solid ${THEME_COLORS.primary}40`, // adds 25% opacity

                                  mt: 2,
                                  mb: 3,
                                }}
                              />
                            )}
                          </Box>
                        ))}
                      </Box>
                    </CardContent>
                  </Card>
                </React.Fragment>
              );
            })}
          </Box>
        )}
      </Box>

      {/* Order Summary Modal */}
      <QuotationOrderSummary
        open={viewDetailsOpen}
        onClose={() => setViewDetailsOpen(false)}
        item={selectedItem}
        onPayClick={(item) => {
          console.log("Pay clicked for:", item.quotationNo);
          setViewDetailsOpen(false);
        }}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={deleteConfirmOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Confirm Cancel"
        message="Are you sure you want to cancel this order?"
      />

      {/* Order Status Drawer-like Panel - removed (using inline view instead) */}
      {false && viewStatusOpen && selectedItem && (
        <>
          <Box
            sx={{
              position: "fixed",
              top: 2,
              right: 0,
              bottom: 0,
              width: { xs: "100%", sm: "100%", md: "828px" },
              height: "100vh",
              maxWidth: { xs: "100vw", sm: "100vw", md: "828px" },
              zIndex: 1400,
              backgroundImage: "url(/assets/images/home-bg.png)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              borderTopLeftRadius: { xs: 0, md: "8px" },
              borderBottomLeftRadius: { xs: 0, md: "8px" },
              boxShadow: { xs: "none", md: "-8px 0 32px rgba(0, 0, 0, 0.15)" },
              animation: "slideInFromRight 0.4s ease-out",
              overflow: "auto",
              opacity: 1,
            }}
          >
            {/* Header */}
            <Box
              sx={{
                p: { xs: 2, md: 3 },
                borderBottom: "1px solid rgba(25, 118, 210, 0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  color: THEME_COLORS.primary,
                  fontSize: { xs: "1.3rem", sm: "1.5rem", md: "1.7rem" },
                }}
              >
                Order Status
              </Typography>
              <IconButton
                onClick={() => setViewStatusOpen(false)}
                sx={{ p: 1 }}
              >
                <Typography
                  variant="h4"
                  sx={{ color: "#666", fontSize: "1.3rem" }}
                >
                  ×
                </Typography>
              </IconButton>
            </Box>

            {/* Info Row and Stepper */}
            <Box sx={{ p: { xs: 2, md: 3 } }}>
              <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap", mb: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Chip
                    label={`Order Number`}
                    size="small"
                    sx={{
                      bgcolor: "#e3f2fd",
                      color: THEME_COLORS.primary,
                      fontWeight: 600,
                    }}
                  />
                  <Typography
                    sx={{ fontWeight: 700, color: THEME_COLORS.primary }}
                  >
                    #
                    {selectedItem.orderNo ||
                      selectedItem.orderStatus?.orderId ||
                      selectedItem.quotationNo}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Chip
                    label={`Expected Delivery`}
                    size="small"
                    sx={{
                      bgcolor: "#e3f2fd",
                      color: THEME_COLORS.primary,
                      fontWeight: 600,
                    }}
                  />
                  <Typography
                    sx={{ fontWeight: 700, color: THEME_COLORS.primary }}
                  >
                    {formatExpectedDate(selectedItem.validTill)}
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{ display: "flex", alignItems: "center", mb: 3, gap: 1.5 }}
              >
                {(() => {
                  // Determine which stage is current based on orderStatus
                  const os = selectedItem.orderStatus;
                  let currentActiveStage = 0;

                  // Check which stage is the current one based on completion
                  if (os?.orderApproved) {
                    currentActiveStage = 1; // Move to Procurement
                  } else if (os?.procurementProtocolAcceptance) {
                    currentActiveStage = 2; // Move to Technical
                  } else if (os?.technicalDraftReport) {
                    currentActiveStage = 3; // Move to Delivery
                  } else if (os?.delivered) {
                    currentActiveStage = 3; // Delivery is last
                  }

                  return [
                    {
                      label: "Order",
                      completed: !!os?.orderApproved,
                      icon: <IconPackage size={20} />,
                    },
                    {
                      label: "Procurement",
                      completed: !!os?.procurementProtocolAcceptance,
                      icon: (
                        <img
                          src="/boxes_svgrepo.com.svg"
                          alt="Procurement"
                          width={20}
                          height={20}
                        />
                      ),
                    },
                    {
                      label: "Technical",
                      completed: !!os?.technicalDraftReport,
                      icon: (
                        <img
                          src="/technicalicon.svg"
                          alt="Technical"
                          width={20}
                          height={20}
                        />
                      ),
                    },
                    {
                      label: "Delivery",
                      completed: !!os?.delivered,
                      icon: (
                        <img
                          src="/delivery_svgrepo.com.svg"
                          alt="Delivery"
                          width={20}
                          height={20}
                        />
                      ),
                    },
                  ].map((item, index) => {
                    const isCompleted = item.completed;
                    const isCurrent =
                      index === currentActiveStage && !isCompleted;
                    const isFuture = index > currentActiveStage && !isCompleted;

                    return (
                      <React.Fragment key={item.label}>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            flex: 1,
                          }}
                        >
                          <Box
                            sx={{
                              width: isCompleted || isCurrent ? 24 : "auto",
                              height: isCompleted || isCurrent ? 24 : "auto",
                              borderRadius:
                                isCompleted || isCurrent ? "50%" : 0,
                              background:
                                isCompleted || isCurrent
                                  ? THEME_COLORS.primary
                                  : "transparent",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              position: "relative",
                              "&::before": {
                                content: '""',
                                position: "absolute",
                                width: "32px",
                                height: "32px",
                                borderRadius:
                                  isCompleted || isCurrent ? "50%" : 0,
                                border: `2px solid ${isCompleted || isCurrent ? "rgba(25, 118, 210, 0.3)" : "transparent"}`,
                                top: "-4px",
                                left: "-4px",
                              },
                            }}
                          >
                            {isCompleted ? (
                              <Typography
                                sx={{
                                  color: "white",
                                  fontSize: "12px",
                                  fontWeight: "bold",
                                }}
                              >
                                ✓
                              </Typography>
                            ) : isCurrent ? (
                              <Box
                                sx={{
                                  width: 8,
                                  height: 8,
                                  borderRadius: "50%",
                                  background: "white",
                                }}
                              />
                            ) : (
                              <Box
                                sx={{
                                  color: THEME_COLORS.primary,
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                {item.icon}
                              </Box>
                            )}
                          </Box>
                          <Typography
                            variant="body2"
                            sx={{
                              mt: 0.5,
                              fontWeight: 600,
                              color:
                                isCompleted || isCurrent
                                  ? THEME_COLORS.primary
                                  : "rgba(17, 82, 147, 0.6)",
                              fontSize: "0.75rem",
                              textAlign: "center",
                            }}
                          >
                            {item.label}
                          </Typography>
                        </Box>
                        {index < 3 && (
                          <Box
                            sx={{
                              flex: 1,
                              height: 2,
                              background: isCompleted
                                ? THEME_COLORS.primary
                                : "rgba(17,82,147,0.3)",
                              borderRadius: 1,
                            }}
                          />
                        )}
                      </React.Fragment>
                    );
                  });
                })()}
              </Box>

              {/* Timeline */}
              <Box
                sx={{
                  p: 0,
                  borderRadius: 2,
                  bgcolor: "rgba(17,82,147,0.06)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                  border: "1px solid rgba(17,82,147,0.12)",
                }}
              >
                <Box
                  sx={{
                    px: 3,
                    py: 2.5,
                    borderBottom: "1px solid rgba(17,82,147,0.12)",
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                  }}
                >
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: "8px",
                      bgcolor: "#fff",
                      border: "1px solid rgba(17,82,147,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      sx={{ color: THEME_COLORS.primary, fontWeight: 700 }}
                    >
                      📦
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      color: THEME_COLORS.primary,
                      fontWeight: 700,
                      fontSize: "1.05rem",
                    }}
                  >
                    Order
                  </Typography>
                </Box>

                <Box sx={{ position: "relative", px: 3, py: 2 }}>
                  <Box
                    sx={{
                      position: "absolute",
                      left: 44,
                      top: 16,
                      bottom: 16,
                      borderLeft: "2px dashed rgba(17,82,147,0.35)",
                    }}
                  />

                  {[
                    {
                      title: "Protocol Request",
                      date: selectedItem.orderStatus?.protocolRequest,
                      key: "protocolRequest",
                    },
                    {
                      title: "Protocol Acceptance",
                      date: selectedItem.orderStatus?.protocolAcceptance,
                      key: "protocolAcceptance",
                    },
                    {
                      title: "Order Booked",
                      date: selectedItem.orderStatus?.orderBooked,
                      key: "orderBooked",
                    },
                    {
                      title: "Document Verification",
                      date: selectedItem.orderStatus?.documentVerification
                        ? typeof selectedItem.orderStatus
                            .documentVerification === "object" &&
                          selectedItem.orderStatus.documentVerification.datetime
                          ? selectedItem.orderStatus.documentVerification
                              .datetime
                          : selectedItem.orderStatus.documentVerification
                        : null,
                      upload: true,
                      key: "documentVerification",
                    },
                    {
                      title: "Order Approved",
                      date: selectedItem.orderStatus?.orderApproved,
                      key: "orderApproved",
                    },
                  ].map((row, i, arr) => {
                    const hasDate = row.date !== null && row.date !== undefined;
                    const completedCount = arr.filter(
                      (r, idx) =>
                        idx <= i && r.date !== null && r.date !== undefined
                    ).length;
                    const isCompleted =
                      row.date !== null && row.date !== undefined;
                    const isCurrent =
                      i > 0 &&
                      !isCompleted &&
                      arr[i - 1].date !== null &&
                      arr[i - 1].date !== undefined;
                    const isFuture = !isCompleted && !isCurrent;

                    return (
                      <Box
                        key={row.title}
                        sx={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 2,
                          py: 2,
                        }}
                      >
                        <Box
                          sx={{
                            width: 44,
                            display: "flex",
                            justifyContent: "center",
                            pt: i > 1 ? 0.5 : 0,
                          }}
                        >
                          {isCompleted ? (
                            <Box
                              sx={{
                                width: 18,
                                height: 18,
                                borderRadius: "50%",
                                bgcolor: THEME_COLORS.primary,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "#fff",
                                fontSize: "11px",
                                fontWeight: 700,
                              }}
                            >
                              ✓
                            </Box>
                          ) : isCurrent ? (
                            <Box
                              sx={{
                                width: 18,
                                height: 18,
                                borderRadius: "50%",
                                border: `2px solid ${THEME_COLORS.primary}`,
                                bgcolor: "rgba(182, 209, 248, 0.4)",
                              }}
                            />
                          ) : (
                            <Box
                              sx={{
                                width: 10,
                                height: 10,
                                borderRadius: "50%",
                                bgcolor: "rgba(17,82,147,0.35)",
                              }}
                            />
                          )}
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <Typography
                            sx={{
                              fontWeight: 700,
                              color:
                                isCompleted || isCurrent
                                  ? THEME_COLORS.primary
                                  : "rgba(17, 82, 147, 0.6)",
                            }}
                          >
                            {row.title}
                          </Typography>
                          {row.date && (
                            <Typography
                              variant="caption"
                              sx={{ color: "rgba(17, 82, 147, 0.6)" }}
                            >
                              {formatDateAndTime(row.date)}
                            </Typography>
                          )}
                          {row.upload && (
                            <Box
                              sx={{
                                mt: 2,
                                p: 3,
                                border: `2px dashed ${THEME_COLORS.primary}`,
                                borderRadius: "20px",
                                bgcolor: "#BBDAFA",
                                maxWidth: 760,
                              }}
                            >
                              <Typography
                                variant="body2"
                                sx={{
                                  mb: 1,
                                  color: THEME_COLORS.primary,
                                  fontWeight: 700,
                                }}
                              >
                                Drag your file(s) to start uploading
                              </Typography>
                              <Button
                                variant="contained"
                                component="label"
                                sx={{
                                  textTransform: "none",
                                  backgroundColor: THEME_COLORS.primary,
                                  color: "white",
                                  "&:hover": { backgroundColor: "#0d4078" },
                                }}
                                disabled={!!uploadingByItem[selectedItem.id]}
                              >
                                {uploadingByItem[selectedItem.id]
                                  ? "Uploading…"
                                  : "Browse files"}
                                <input
                                  hidden
                                  type="file"
                                  multiple
                                  onChange={async (e) => {
                                    const fileList = e.target.files;
                                    if (!fileList || !selectedItem) return;
                                    setUploadingByItem((prev) => ({
                                      ...prev,
                                      [selectedItem.id]: true,
                                    }));
                                    try {
                                      const uploaded: UploadedFile[] = [];
                                      for (const file of Array.from(fileList)) {
                                        const form = new FormData();
                                        form.append("file", file, file.name);
                                        const res = await fetch(getPortalApiUrl(API_ENDPOINTS.upload), {
                                          method: "POST",
                                          body: form,
                                        });
                                        if (!res.ok) {
                                          const text = await res.text();
                                          console.error("Upload failed:", text);
                                          throw new Error("Upload failed");
                                        }
                                        const json = await res.json();
                                        const data = json?.data || {};
                                        uploaded.push({
                                          id: `${selectedItem.id}-${file.name}-${Date.now()}`,
                                          name: data.originalName || file.name,
                                          size: data.size || file.size,
                                          url: data.objectUrl,
                                          key: data.key,
                                          mimeType: data.mimeType || file.type,
                                        });
                                      }
                                      setUploadedFiles((prev) => ({
                                        ...prev,
                                        [selectedItem.id]: [
                                          ...(prev[selectedItem.id] || []),
                                          ...uploaded,
                                        ],
                                      }));
                                    } catch (err) {
                                      alert(
                                        "Failed to upload file(s). Please try again."
                                      );
                                    } finally {
                                      setUploadingByItem((prev) => ({
                                        ...prev,
                                        [selectedItem.id]: false,
                                      }));
                                    }
                                  }}
                                />
                              </Button>
                              {uploadedFiles[selectedItem.id] &&
                                uploadedFiles[selectedItem.id].length > 0 && (
                                  <Box sx={{ mt: 2 }}>
                                    {uploadedFiles[selectedItem.id].map(
                                      (f, idx) => (
                                        <Box
                                          key={`${f.name}-${idx}`}
                                          sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            mb: 1,
                                          }}
                                        >
                                          <Typography
                                            variant="body2"
                                            sx={{
                                              color: THEME_COLORS.primary,
                                              fontWeight: 700,
                                            }}
                                          >
                                            {f.name}
                                          </Typography>
                                          <Typography
                                            variant="caption"
                                            sx={{ color: THEME_COLORS.primary }}
                                          >
                                            {Math.round(f.size / 1024)}KB
                                          </Typography>
                                        </Box>
                                      )
                                    )}
                                  </Box>
                                )}
                            </Box>
                          )}
                        </Box>
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            </Box>
          </Box>
          {/* Backdrop */}
          <Box
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 1200,
            }}
            onClick={() => setViewStatusOpen(false)}
          />
        </>
      )}
    </Box>
  );
}
