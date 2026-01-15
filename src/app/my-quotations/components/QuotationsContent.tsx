/**
 * @fileoverview Quotations Content Component - Enhanced with Cart Items
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
} from "@tabler/icons-react";
import { useState } from "react";
import DeleteConfirmationModal from "../../../components/common/DeleteConfirmationModal";
import QuotationOrderSummary from "./QuotationOrderSummary";
import PaymentSuccessModal from "./PaymentSuccessModal";
import { useUser } from "@clerk/nextjs";
import NothingFound from "../../../../public/assets/images/landing/pricing/nothing found.png";
import { getGuidelineData as getToxicityGuidelineData } from "../../pricing/toxicity-study/data/guidelineData";
import { getGuidelineData as getInvitroGuidelineData } from "../../pricing/invitro-study/data/guidelineData";
import { initiateRazorpayPayment } from "../../../utils/razorpay";
import { getPortalApiUrl, API_ENDPOINTS } from "../../../utils/apiConfig";

interface BaseItem {
  id: string;
  quotationNo: string;
  title: string;
  studyType: string;
  amount: number;
  numberOfSamples: number;
  createdOn: string;
  updatedAt?: string;
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
  // Customer fields from API
  customer_name?: string;
  customer_email?: string;
  customer_phone?: string;
  customer_company?: string;
}

interface QuotationsContentProps {
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
  cardBorder: "rgba(17, 82, 147, 0.3)",
};

export default function QuotationsContent({
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
}: QuotationsContentProps) {
  // Get current user from Clerk
  const { user } = useUser();

  // Remove the dataSource state - we'll use cart items as the primary data source
  // const [dataSource, setDataSource] = useState("quotations");
  const [downloadingItems, setDownloadingItems] = useState<Set<string>>(
    new Set()
  );
  const [deletingItems, setDeletingItems] = useState<Set<string>>(new Set());
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<BaseItem | null>(null);
  const [groupToDelete, setGroupToDelete] = useState<BaseItem[] | null>(null);
  const [viewDetailsOpen, setViewDetailsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<BaseItem | null>(null);
  const [processingPayment, setProcessingPayment] = useState<Set<string>>(
    new Set()
  );
  const [paymentSuccessOpen, setPaymentSuccessOpen] = useState(false);
  const [convertedOrderNo, setConvertedOrderNo] = useState<string | null>(null);
  const [lastQuotationNo, setLastQuotationNo] = useState<string | null>(null);

  // Calculate total price for a group of studies
  const calculateGroupTotal = (items: BaseItem[]) => {
    // item.amount is the base amount (excluding GST), sum them up
    const subtotal = items.reduce((total, item) => {
      return total + parseFloat(item.amount.toString() || "0");
    }, 0);

    // Add GST to get grand total, matching the admin panel calculation
    const gst = Math.round(subtotal * 0.18);
    const grandTotal = Math.round(subtotal * 1.18);

    return {
      subtotal,
      gst,
      grandTotal,
    };
  };

  // Generate combined PDF for all studies in a group - Using same API as individual downloads
  const handleGroupDownload = async (items: BaseItem[], groupKey: string) => {
    setDownloadingItems((prev) => new Set([...prev, `group-${groupKey}`]));

    try {
      // Get customer details from the first item (customer details are now stored in quotations)
      // Handle both snake_case (from database) and camelCase (from frontend)
      const customerRecord: any | null = items[0]
        ? {
            customerName: items[0].customer_name || (items[0] as any).customerName,
            customerEmail: items[0].customer_email || (items[0] as any).customerEmail,
            customerPhone: items[0].customer_phone || (items[0] as any).customerPhone,
            customerCompany: items[0].customer_company || (items[0] as any).customerCompany,
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
        // item.amount is the base amount (excluding GST)
        const baseAmountForCalculation = item.amount;

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

      console.log("� Final customer data for PDF:", quotationData.customer);
      console.log(
        "�🚀 Combined quotation data (correct format):",
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
        const errorText = await response.text();
        console.error("API Error:", errorText);
        throw new Error("Failed to generate combined PDF");
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
        const newSet = new Set(prev);
        newSet.delete(`group-${groupKey}`);
        return newSet;
      });
    }
  };

  const getStudyIcon = (studyType: string) => {
    switch (studyType) {
      case "Toxicity Study":
        return <IconShield size={24} />;
      case "Invitro Study":
        return <IconMicroscope size={24} />;
      case "Microbiology & Virology Study":
        return <IconFlask size={24} />;
      default:
        return <IconFlask size={24} />;
    }
  };

  const getStudyImage = (studyType: string) => {
    switch (studyType) {
      case "Toxicity Study":
        return "/assets/images/landing/pricing/cart-toxicity.png";
      case "Invitro Study":
        return "/assets/images/landing/pricing/Invitro Study.jpg";
      case "Microbiology & Virology Study":
        return "/assets/images/landing/pricing/cart-microorganism.png";
      default:
        return "/assets/images/landing/pricing/cart-toxicity.png";
    }
  };

  const getStudyColor = (studyType: string) => {
    switch (studyType) {
      case "Toxicity Study":
        return "#e11d48";
      case "Invitro Study":
        return "#0891b2";
      case "Microbiology & Virology Study":
        return "#7c3aed";
      default:
        return THEME_COLORS.secondary;
    }
  };

  const handleDeleteClick = (item: BaseItem) => {
    setItemToDelete(item);
    setDeleteConfirmOpen(true);
  };

  const handleViewDetailsClick = (item: BaseItem) => {
    setSelectedItem(item);
    setViewDetailsOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!itemToDelete) return;

    // Check if we're deleting a group or single item
    if (groupToDelete && groupToDelete.length > 0) {
      // Handle group deletion
      const groupKey = itemToDelete.quotationNo; // Get the group key
      setDeletingItems((prev) => new Set(prev).add(`group-${groupKey}`)); // Add group to deleting state

      for (const item of groupToDelete) {
        setDeletingItems((prev) => new Set(prev).add(item.id));
      }
      setDeleteConfirmOpen(false);

      try {
        // Delete all items in the group using quotation_no
        // Since all items in a group share the same quotation_no, we only need to delete once
        // Get quotationNo from the first item in the group (most reliable source)
        const quotationNo =
          groupToDelete[0]?.quotationNo?.replace(/^#/, "") ||
          itemToDelete.quotationNo?.replace(/^#/, "") ||
          itemToDelete.quotationNo;

        if (!quotationNo) {
          throw new Error("Quotation number not found");
        }

        const response = await fetch(getPortalApiUrl(API_ENDPOINTS.quotations.store), {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            quotation_no: quotationNo,
          }),
        });

        if (response.ok) {
          // Customer data is now stored in quotations, so it's automatically deleted with the quotation
          // Refresh cart items after successful deletion
          if (onCartRefresh) {
            onCartRefresh();
          }
          console.log("Group deleted successfully");
        } else {
          const errorData = await response
            .json()
            .catch(() => ({ error: "Failed to delete quotation" }));
          console.error("Failed to delete quotation:", quotationNo, errorData);
          alert(
            errorData.error ||
              `Failed to delete quotation ${quotationNo}. Please try again.`
          );
        }
      } catch (error) {
        console.error("Error deleting group:", error);
      } finally {
        // Remove group and all items from deleting state
        setDeletingItems((prev) => {
          const newSet = new Set(prev);
          newSet.delete(`group-${groupKey}`); // Remove group deleting state
          groupToDelete.forEach((item) => newSet.delete(item.id));
          return newSet;
        });
        setItemToDelete(null);
        setGroupToDelete(null);
      }
    } else {
      // Handle single item deletion (existing logic)
      setDeletingItems((prev) => new Set(prev).add(itemToDelete.id));
      setDeleteConfirmOpen(false);

      try {
        // Remove # prefix if present
        const quotationNo =
          itemToDelete.quotationNo?.replace(/^#/, "") ||
          itemToDelete.quotationNo;
        const response = await fetch(getPortalApiUrl(API_ENDPOINTS.quotations.store), {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            quotation_no: quotationNo,
          }),
        });

        if (response.ok) {
          // Customer data is now stored in quotations, so it's automatically deleted with the quotation
          // Refresh quotations after successful deletion
          if (onCartRefresh) {
            onCartRefresh();
          }
          // Show success message (optional)
          console.log("Item deleted successfully");
        } else {
          const errorData = await response
            .json()
            .catch(() => ({ error: "Failed to delete quotation" }));
          console.error("Failed to delete item:", errorData);
          alert(
            errorData.error || "Failed to delete quotation. Please try again."
          );
        }
      } catch (error) {
        console.error("Error deleting item:", error);
      } finally {
        setDeletingItems((prev) => {
          const newSet = new Set(prev);
          newSet.delete(itemToDelete.id);
          return newSet;
        });
        setItemToDelete(null);
      }
    }
  };

  const handleDeleteCancel = () => {
    setDeleteConfirmOpen(false);
    setItemToDelete(null);
    setGroupToDelete(null);
  };

  const handleGroupDelete = (items: BaseItem[], groupKey: string) => {
    const totalAmount = Math.round(
      items.reduce((total, item) => total + item.amount, 0) * 1.18
    );
    const itemCount = items.length;

    // Get the actual quotationNo from the first item (remove # prefix if present)
    const actualQuotationNo =
      items[0]?.quotationNo?.replace(/^#/, "") ||
      items[0]?.quotationNo ||
      groupKey;

    // Set up confirmation for group deletion
    setItemToDelete({
      ...items[0], // Use first item as reference
      quotationNo: actualQuotationNo, // Use actual quotation number, not groupKey
      amount: totalAmount, // Show total amount
      studyType: `${itemCount} studies in this group`,
    });

    // Store all items to delete
    setGroupToDelete(items);
    setDeleteConfirmOpen(true);
  };

  const handlePayment = async (items: BaseItem[], groupKey: string) => {
    try {
      // Get quotation number (remove # if present)
      const quotationNo =
        items[0]?.quotationNo?.replace(/^#/, "") || groupKey.replace(/^#/, "");

      if (!quotationNo) {
        alert("Quotation number not found");
        return;
      }

      // Calculate total amount
      const { grandTotal } = calculateGroupTotal(items);

      if (grandTotal <= 0) {
        alert("Invalid payment amount");
        return;
      }

      // Mark as processing
      setProcessingPayment((prev) => new Set([...prev, `group-${groupKey}`]));

      // Create Razorpay order using portal API
      const orderResponse = await fetch(getPortalApiUrl(API_ENDPOINTS.payment.createOrder), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: grandTotal,
          currency: "INR",
          receipt: `receipt_${quotationNo}_${Date.now()}`,
        }),
      });

      if (!orderResponse.ok) {
        const errorData = await orderResponse.json().catch(() => ({}));
        throw new Error(
          errorData.error || `HTTP error! status: ${orderResponse.status}`
        );
      }

      const orderData = await orderResponse.json();

      if (!orderData.success || !orderData.order) {
        throw new Error("Failed to create Razorpay order");
      }

      const razorpayOrderId = orderData.order.id;
      const razorpayKeyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;

      if (!razorpayKeyId) {
        throw new Error("Razorpay key ID not configured");
      }

      // Get customer details - handle both snake_case (from database) and camelCase (from frontend)
      const customerRecord = items[0]
        ? {
            customerName: items[0].customer_name || (items[0] as any).customerName,
            customerEmail: items[0].customer_email || (items[0] as any).customerEmail,
            customerPhone: items[0].customer_phone || (items[0] as any).customerPhone,
          }
        : null;

      // Initiate Razorpay payment
      await initiateRazorpayPayment({
        key: razorpayKeyId,
        amount: orderData.order.amount, // Amount in paise
        currency: "INR",
        name: "Radiant Research",
        description: `Payment for Quotation ${quotationNo}`,
        order_id: razorpayOrderId,
        prefill: {
          name:
            customerRecord?.customerName ||
            user?.fullName ||
            user?.firstName ||
            "",
          email:
            customerRecord?.customerEmail ||
            user?.emailAddresses?.[0]?.emailAddress ||
            "",
          contact:
            customerRecord?.customerPhone ||
            user?.phoneNumbers?.[0]?.phoneNumber ||
            "",
        },
        handler: async (response: any) => {
          try {
            // Payment successful, convert quotation to order
            const convertResponse = await fetch(getPortalApiUrl(API_ENDPOINTS.orders.convert), {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                quotation_no: quotationNo,
              }),
            });

            if (!convertResponse.ok) {
              const errorData = await convertResponse.json().catch(() => ({}));
              throw new Error(
                errorData.error ||
                  `HTTP error! status: ${convertResponse.status}`
              );
            }

            const convertData = await convertResponse.json();

            if (convertData.success) {
              // Store the converted order number for display
              const orderNo = convertData.data?.convertedOrderNo || null;
              setConvertedOrderNo(orderNo);
              setLastQuotationNo(quotationNo);
              // Refresh the quotations list
              if (onRefresh) {
                onRefresh();
              }
              if (onCartRefresh) {
                onCartRefresh();
              }
              // Show success modal
              setPaymentSuccessOpen(true);
            } else {
              throw new Error(
                convertData.error || "Failed to convert quotation to order"
              );
            }
          } catch (error: any) {
            console.error("Error converting quotation to order:", error);
            alert(
              `Payment successful, but failed to convert quotation to order: ${
                error.message || "Unknown error"
              }`
            );
          } finally {
            // Remove from processing set
            setProcessingPayment((prev) => {
              const newSet = new Set(prev);
              newSet.delete(`group-${groupKey}`);
              return newSet;
            });
          }
        },
        modal: {
          ondismiss: () => {
            // Remove from processing set when modal is closed
            setProcessingPayment((prev) => {
              const newSet = new Set(prev);
              newSet.delete(`group-${groupKey}`);
              return newSet;
            });
          },
        },
      });
    } catch (error: any) {
      console.error("Payment error:", error);
      const errorMessage = error.message || error.toString() || "Unknown error";
      alert(`Payment failed: ${errorMessage}`);
      // Remove from processing set
      setProcessingPayment((prev) => {
        const newSet = new Set(prev);
        newSet.delete(`group-${groupKey}`);
        return newSet;
      });
    }
  };

  const handleDownloadPDF = async (item: BaseItem) => {
    if (item.pdfUrl) {
      // If PDF already exists, download it directly
      window.open(item.pdfUrl, "_blank");
      return;
    }

    // Add item to downloading set
    setDownloadingItems((prev) => new Set(prev).add(item.id));

    try {
      // Generate PDF for cart item using the quotation API
      // For now, use simple equal division until we fix the guideline data lookup
      // This matches the expected behavior from your images
      console.log("ðŸ” BEFORE PROCESSING - Item data:", {
        selectedGuidelines: item.selectedGuidelines,
        selectedStudies: item.selectedStudies,
        studyType: item.studyType,
        amount: item.amount,
        numberOfSamples: item.numberOfSamples,
      });
      // item.amount is the base amount (excluding GST) for proper guideline pricing
      const baseAmountForCalculation = item.amount;

      console.log("Base amount calculation:", {
        originalAmount: item.amount,
        baseAmountForCalculation,
        reasoning:
          "item.amount is the base amount (excluding GST), matching admin panel",
      });

      const getIndividualGuidelinePrices = () => {
        console.log("ðŸ” Processing guidelines for:", item.studyType);
        console.log(
          "ðŸ“‹ Available selectedGuidelines:",
          item.selectedGuidelines
        );
        console.log("ðŸ“‹ Available selectedStudies:", item.selectedStudies);

        // For Microbiology & Virology Study, use selectedStudies instead of selectedGuidelines
        if (item.studyType === "Microbiology & Virology Study") {
          console.log("ðŸ§ª Processing Microbiology & Virology Study");

          if (item.selectedStudies && item.selectedStudies.length > 0) {
            console.log(
              "âœ… Using actual selectedStudies:",
              item.selectedStudies
            );
            // For Microbiology, the API already includes num_samples in the total price
            // So we don't need to multiply by numberOfSamples again
            const pricePerStudy = Math.round(
              baseAmountForCalculation / item.selectedStudies.length
            );

            return item.selectedStudies.map((study) => ({
              name: study,
              qty: item.numberOfSamples,
              unitPrice: pricePerStudy, // This is the total price per study, not per sample
            }));
          } else {
            console.log(
              "âš ï¸ No selectedStudies found, using default Microbiology tests"
            );
            const microbiologyTests = [
              "Minimum Bactericidal Concentration (MBC)",
              "Zone of Inhibition (ZOI)",
              "Time Kill Assay (TKA)",
            ];
            const pricePerTest = Math.round(
              baseAmountForCalculation / microbiologyTests.length
            );

            return microbiologyTests.map((test) => ({
              name: test,
              qty: item.numberOfSamples,
              unitPrice: pricePerTest, // This is the total price per test, not per sample
            }));
          }
        }

        // For other study types, use the existing logic
        if (!item.selectedGuidelines || item.selectedGuidelines.length === 0) {
          console.log(
            "âš ï¸ No selectedGuidelines found, using single study type entry"
          );
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

        // Check if this is just the study type itself (not individual guidelines)
        // OR if we have Microbiology/In-vitro study types that need special handling
        if (
          (item.selectedGuidelines.length === 1 &&
            (item.selectedGuidelines[0] === item.studyType ||
              item.selectedGuidelines[0] === "Microbiology & Virology Study" ||
              item.selectedGuidelines[0] === "In-vitro Study")) ||
          item.studyType === "Microbiology & Virology Study" ||
          item.studyType === "In-vitro Study"
        ) {
          console.log(
            "âš ï¸ Creating individual tests for study type:",
            item.studyType
          );

          // For Microbiology & Virology, create mock individual tests
          if (item.studyType === "Microbiology & Virology Study") {
            console.log("ðŸ§ª Creating individual Microbiology tests");
            const microbiologyTests = [
              "Minimum Bactericidal Concentration (MBC)",
              "Zone of Inhibition (ZOI)",
              "Time Kill Assay (TKA)",
            ];
            // For Microbiology, the price already includes num_samples, so don't divide by numberOfSamples
            const pricePerTest = Math.round(
              baseAmountForCalculation / microbiologyTests.length
            );

            return microbiologyTests.map((test) => ({
              name: test,
              qty: item.numberOfSamples,
              unitPrice: pricePerTest, // This is the total price per test, not per sample
            }));
          }

          // For In-vitro Study, create mock individual tests
          if (item.studyType === "In-vitro Study") {
            console.log("ðŸ”¬ Creating individual In-vitro tests");
            const invitroTests = [
              "Antioxidant Activity Assay",
              "Anti-inflammatory Activity",
              "Cytotoxicity Assessment",
            ];
            const pricePerTest = Math.round(item.amount / invitroTests.length);
            const unitPricePerTest = Math.round(
              pricePerTest / item.numberOfSamples
            );

            return invitroTests.map((test) => ({
              name: test,
              qty: item.numberOfSamples,
              unitPrice: unitPricePerTest,
            }));
          }

          // Fallback to study type
          return [
            {
              name: item.studyType,
              qty: item.numberOfSamples,
              unitPrice: Math.round(item.amount / item.numberOfSamples) || 0,
            },
          ];
        }

        // Prefer original saved prices from guideline datasets
        const useToxicity =
          typeof item.studyType === "string" &&
          item.studyType.toLowerCase().includes("toxicity");

        // Helper to resolve Invitro price by therapeutic area or global match
        const resolveInvitroPrice = (guideline: string): number | null => {
          // Try using each selected therapeutic area if available
          if (Array.isArray(item.selectedTherapeuticAreas)) {
            for (const area of item.selectedTherapeuticAreas) {
              const data = getInvitroGuidelineData(area, guideline);
              if (data && typeof data.price === "number") return data.price;
            }
          }
          // Fallback: global search by study name across all datasets
          try {
            const {
              nutraceuticalsData,
              cosmeceuticalsData,
              pharmaceuticalsData,
              herbalAyushData,
            } = require("../../pricing/invitro-study/data/guidelineData");
            const all = [
              ...nutraceuticalsData,
              ...cosmeceuticalsData,
              ...pharmaceuticalsData,
              ...herbalAyushData,
            ];
            const match = all.find((g: any) => g.studyName === guideline);
            return match ? match.price : null;
          } catch (e) {
            return null;
          }
        };

        const guidelinesWithOriginalPrices = item.selectedGuidelines
          .map((guideline) => {
            try {
              const data = useToxicity
                ? getToxicityGuidelineData(item.category || "", guideline)
                : null;
              const priceFromInvitro = !useToxicity
                ? resolveInvitroPrice(guideline)
                : null;
              const priceToUse = data?.price ?? priceFromInvitro ?? null;
              if (priceToUse && priceToUse > 0) {
                return {
                  name: guideline,
                  qty: item.numberOfSamples,
                  // price stored is per test; unit price per line item equals price (per sample),
                  // multiply by qty for total later
                  unitPrice: Math.round(priceToUse),
                };
              }
            } catch (e) {
              // ignore and fallback below
            }
            return null;
          })
          .filter(Boolean) as {
          name: string;
          qty: number;
          unitPrice: number;
        }[];

        if (
          guidelinesWithOriginalPrices.length === item.selectedGuidelines.length
        ) {
          return guidelinesWithOriginalPrices;
        }

        // Fallback to equal split only if dataset lookup fails
        const pricePerGuideline = Math.round(
          baseAmountForCalculation / item.selectedGuidelines.length
        );
        const unitPricePerGuideline = Math.round(
          pricePerGuideline / item.numberOfSamples
        );

        return item.selectedGuidelines.map((guideline) => ({
          name: guideline,
          qty: item.numberOfSamples,
          unitPrice: unitPricePerGuideline,
        }));
      };

      // Check if item.amount includes GST or not
      // If the calculated total from individual guidelines equals item.amount,
      // then item.amount already includes GST and we need to extract the base amount
      const guidelines = getIndividualGuidelinePrices();
      const calculatedSubTotal = guidelines.reduce(
        (sum, g) => sum + g.unitPrice * g.qty,
        0
      );

      // If calculatedSubTotal equals item.amount, it means item.amount already includes GST
      // So we need to calculate the base amount (without GST)
      // item.amount is always the base amount (excluding GST)
      // Add GST to get grand total, matching the admin panel calculation
      // Admin panel: baseAmount * 1.18 = grandTotal
      const baseAmount = item.amount;
      const gstAmount = Math.round(baseAmount * 0.18);
      const grandTotal = Math.round(baseAmount * 1.18);

      console.log("Calculating GST from base amount (matching admin panel):", {
        originalAmount: item.amount,
        calculatedSubTotal,
        baseAmount,
        gstAmount,
        grandTotal,
      });

      console.log("ðŸ‘¤ User data for customer details:", {
        user: user,
        fullName: user?.fullName,
        firstName: user?.firstName,
        email: user?.emailAddresses?.[0]?.emailAddress,
        phone: user?.phoneNumbers?.[0]?.phoneNumber,
        publicMetadata: user?.publicMetadata,
      });

      console.log("ðŸ‘¤ User data for customer details:", {
        user: user,
        fullName: user?.fullName,
        firstName: user?.firstName,
        email: user?.emailAddresses?.[0]?.emailAddress,
        phone: user?.phoneNumbers?.[0]?.phoneNumber,
        publicMetadata: user?.publicMetadata,
      });

      // Get customer details from item (customer details are now stored in quotations)
      // Handle both snake_case (from database) and camelCase (from frontend)
      const customerRecord: any | null = item
        ? {
            customerName: item.customer_name || (item as any).customerName,
            customerEmail: item.customer_email || (item as any).customerEmail,
            customerPhone: item.customer_phone || (item as any).customerPhone,
            customerCompany: item.customer_company || (item as any).customerCompany,
          }
        : null;

      const quotationData = {
        quotation: {
          number: item.quotationNo,
          createdDate: formatDate(item.createdOn),
          expiryDate: formatDate(item.validTill),
        },
        customer: {
          name:
            customerRecord?.customerName ||
            user?.fullName ||
            user?.firstName ||
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
        products: [
          {
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
          },
        ],
        documents: [],
        terms: [
          "This quotation is valid for 30 days from the date of issue unless otherwise stated.",
          "Prices are subject to change if the quotation has expired or if project scope is revised.",
        ],
        summary: {
          subTotal: baseAmount,
          gstPercent: 18,
          gstAmount: gstAmount,
          grandTotal: grandTotal,
        },
      };

      // Call the quotation API to generate PDF
      const response = await fetch(getPortalApiUrl(API_ENDPOINTS.quotations.pdf), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(quotationData),
      });

      if (!response.ok) {
        let errorMessage = "Failed to generate PDF";
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
      a.download = `${item.quotationNo}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      // Remove item from downloading set
      setDownloadingItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(item.id);
        return newSet;
      });
    }
  };

  const handleDeleteItem = async (item: BaseItem) => {
    // Confirm deletion
    const confirmDelete = window.confirm(
      `Are you sure you want to delete quotation ${item.quotationNo}?`
    );

    if (!confirmDelete) return;

    // Add item to deleting set
    setDeletingItems((prev) => new Set(prev).add(item.id));

    try {
      // Get the current user ID
      const currentUserId = user?.id;

      if (!currentUserId) {
        throw new Error("User not authenticated");
      }

      // Remove # prefix if present from quotation_no
      const quotationNo =
        item.quotationNo?.replace(/^#/, "") || item.quotationNo;

      if (!quotationNo) {
        throw new Error("Quotation number not found");
      }

      // Delete quotation from database using quotation_no
      const response = await fetch(getPortalApiUrl(API_ENDPOINTS.quotations.store), {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quotation_no: quotationNo }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete item");
      }

      // Refresh the cart items list to reflect the deletion
      if (onCartRefresh) {
        onCartRefresh();
      }

      // Show success message
      alert("Quotation deleted successfully!");
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Failed to delete quotation. Please try again.");
    } finally {
      // Remove item from deleting set
      setDeletingItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(item.id);
        return newSet;
      });
    }
  };

  const handleGenerateQuotation = (item: BaseItem) => {
    // Navigate to pricing page to create a proper quotation
    console.log("Generate quotation for cart item:", item.id);
    alert("Generating quotation... (Feature coming soon)");
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    try {
      let date;

      // Handle different date formats
      if (dateString.includes("/")) {
        // Handle DD/MM/YYYY format (from en-GB locale)
        const parts = dateString.split("/");
        if (parts.length === 3) {
          const [day, month, year] = parts;
          date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
        } else {
          date = new Date(dateString);
        }
      } else {
        // Handle ISO format (YYYY-MM-DD) or other formats
        date = new Date(dateString);
      }

      // Check if date is valid
      if (isNaN(date.getTime())) {
        return dateString;
      }

      return date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    } catch (error) {
      return dateString;
    }
  };

  // (Status is now provided by the data hook; no local derivation needed)

  // Get current data based on selected tab - data is already pre-filtered by parent
  const getCurrentData = (): BaseItem[] => {
    // Data is now pre-filtered by the parent component based on subTab
    return cartItems;
  };

  const currentData = getCurrentData();
  // Use cart loading and error states since we're primarily showing cart data
  const currentLoading = cartLoading;
  const currentError = cartError;
  const currentRefresh = onCartRefresh;

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

  return (
    <Box>
      {/* Quotations Content - Using Cart Items as Data Source */}

      {/* Header with Tabs - Centered */}
      <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
        <Tabs
          value={subTab}
          onChange={onSubTabChange}
          sx={{
            "& .MuiTab-root": {
              textTransform: "none",
              fontWeight: 700,
              fontSize: "0.75rem",
              width: "140px", // Reduced width to accommodate 3 tabs
              height: "24px", // Reduced height from 28px to 24px
              borderRadius: "43.33px",
              border: "1px solid #9CA3AF",
              backgroundColor: "#B6D1F8",
              color: THEME_COLORS.primary,
              padding: "2px 12px", // Reduced padding for 3 tabs
              margin: "0 4px", // Reduced margin for 3 tabs
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
          <Tab label="Requested" value="requested" />
          <Tab label="Valid" value="valid" />
          <Tab label="Expired" value="expired" />
        </Tabs>
      </Box>

      {/* Header with refresh button for real data */}
      {/* {isRealData && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
            px: 3,
          }}
        >
          <Typography variant="h6" sx={{ color: THEME_COLORS.secondary }}>
            My Quotations
          </Typography>
          <IconButton
            onClick={currentRefresh}
            disabled={currentLoading}
            sx={{
              color: THEME_COLORS.secondary,
              "&:hover": { backgroundColor: "rgba(17, 82, 147, 0.04)" },
            }}
          >
            <IconRefresh size={20} />
          </IconButton>
        </Box>
      )} */}

      {/* Error State */}
      {currentError && (
        <Box sx={{ p: 3 }}>
          <Alert
            severity="error"
            action={
              <Button size="small" onClick={currentRefresh}>
                Retry
              </Button>
            }
            sx={{ mb: 2 }}
          >
            {currentError}
          </Alert>
        </Box>
      )}

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
              gap: "16px", // Gap between full-width cards
              width: "100%",
            }}
          >
            {/* Group items by sessionId (cart generation) and display each group in a separate card */}
            {Object.entries(
              currentData.reduce(
                (groups, item) => {
                  // Group by sessionId if available, otherwise by quotationNo,
                  // or by createdOn date as fallback
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

              return (
                <React.Fragment key={`quotation-group-${groupKey}`}>
                  <Card
                    key={`quotation-${groupKey}`}
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
                        // gap: "16px",
                      }}
                    >
                      {/* Left-aligned Header Layout */}
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "flex-start",
                          alignItems: "flex-start",
                          mb: 2,
                          pb: 1,
                          borderBottom: "1px solid #e0e0e0",
                          padding: "8px 16px",
                          borderRadius: "4px",
                          gap: 4,
                        }}
                      >
                        {/* Quotation Status - Left aligned with chip below */}
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            minWidth: "140px",
                          }}
                        >
                          <Typography
                            variant="body2"
                            sx={{
                              color: THEME_COLORS.primary,
                              fontFamily: "Open Sans",
                              fontWeight: 600,
                              fontSize: "16px",
                              lineHeight: "16px",
                              letterSpacing: "0px",
                              mb: 1.5,
                            }}
                          >
                            Quotation Status
                          </Typography>
                          <Chip
                            label={
                              items[0].status === "pending"
                                ? "Requested"
                                : items[0].status === "valid"
                                  ? "Valid"
                                  : "Expired"
                            }
                            size="small"
                            sx={{
                              backgroundColor:
                                items[0].status === "pending"
                                  ? "#115293"
                                  : items[0].status === "valid"
                                    ? "#115293"
                                    : "#115293",
                              color: "white",
                              fontWeight: 600,
                              fontSize: "0.7rem",
                              height: "24px",
                              minWidth: "80px",
                              paddingX: "12px",
                              borderRadius: 1, // Remove border radius for square shape
                            }}
                          />
                        </Box>

                        {/* Quotation No - Left aligned */}
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            minWidth: "120px",
                          }}
                        >
                          <Typography
                            variant="body2"
                            sx={{
                              color: THEME_COLORS.primary,
                              fontFamily: "Open Sans",
                              fontWeight: 600,
                              fontSize: "16px",
                              lineHeight: "16px",
                              letterSpacing: "0px",
                              mb: 1.5,
                            }}
                          >
                            Quotation No
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: "#115293",
                              fontWeight: 600,
                              fontSize: "0.85rem",
                            }}
                          >
                            #{items[0].quotationNo}
                          </Typography>
                        </Box>

                        {/* Date Headers - Dynamic based on tab */}
                        <Box
                          sx={{
                            display: "flex",
                            gap: subTab === "valid" ? 5 : 3, // Larger gap for Valid tab with multiple headers
                            alignItems: "flex-start",
                          }}
                        >
                          {/* Requested On - For all tabs */}
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              minWidth: "100px",
                            }}
                          >
                            <Typography
                              variant="body2"
                              sx={{
                                color: THEME_COLORS.primary,
                                fontFamily: "Open Sans",
                                fontWeight: 600,
                                fontSize: "16px",
                                lineHeight: "16px",
                                letterSpacing: "0px",
                                mb: 1.5,
                              }}
                            >
                              Requested On
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{
                                color: "#115293",
                                fontWeight: 600,
                                fontSize: "0.85rem",
                              }}
                            >
                              {formatDate(items[0].createdOn)}
                            </Typography>
                          </Box>

                          {/* Generated On - Only for Valid tab */}
                          {subTab === "valid" && items[0].updatedAt && (
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                minWidth: "100px",
                              }}
                            >
                              <Typography
                                variant="body2"
                                sx={{
                                  color: THEME_COLORS.primary,
                                  fontFamily: "Open Sans",
                                  fontWeight: 600,
                                  fontSize: "16px",
                                  lineHeight: "16px",
                                  letterSpacing: "0px",
                                  mb: 1.5,
                                }}
                              >
                                Generated On
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{
                                  color: "#115293",
                                  fontWeight: 600,
                                  fontSize: "0.85rem",
                                }}
                              >
                                {formatDate(items[0].updatedAt)}
                              </Typography>
                            </Box>
                          )}

                          {/* Valid Till - Only for Valid tab */}
                          {subTab === "valid" && items[0].validTill && (
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                minWidth: "100px",
                              }}
                            >
                              <Typography
                                variant="body2"
                                sx={{
                                  color: THEME_COLORS.primary,
                                  fontFamily: "Open Sans",
                                  fontWeight: 600,
                                  fontSize: "16px",
                                  lineHeight: "16px",
                                  letterSpacing: "0px",
                                  mb: 1.5,
                                }}
                              >
                                Valid Till
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{
                                  color: "#115293",
                                  fontWeight: 600,
                                  fontSize: "0.85rem",
                                }}
                              >
                                {formatDate(items[0].validTill)}
                              </Typography>
                            </Box>
                          )}
                        </Box>
                      </Box>

                      {/* Display all items without individual headers */}
                      {items.map((item, index) => (
                        <Box
                          key={`item-${index}`}
                          sx={{ width: "100%", mb: 3 }}
                        >
                          {/* Study Type Badge and Image */}
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
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
                                width: "fit-content", // Let content determine width
                                minWidth: "200px", // Ensure enough space for quotation numbers
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
                                overflow: "visible", // Allow content to overflow
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
                                {/* Commented out - not needed to show
                            {item.sampleForm && (
                              <Typography variant="body2" sx={{ color: "#115293", mb: 0.5 }}>
                                • <strong>Sample Form:</strong> {item.sampleForm}
                              </Typography>
                            )}
                            {item.sampleSolvent && (
                              <Typography variant="body2" sx={{ color: "#115293", mb: 0.5 }}>
                                • <strong>Sample Solvent:</strong> {item.sampleSolvent}
                              </Typography>
                            )}
                            {item.application && (
                              <Typography variant="body2" sx={{ color: "#115293", mb: 0.5 }}>
                                • <strong>Application:</strong> {item.application}
                              </Typography>
                            )}
                            {item.microorganism && (
                              <Typography variant="body2" sx={{ color: "#115293", mb: 0.5 }}>
                                • <strong>Micro-organism:</strong> {item.microorganism}
                              </Typography>
                            )}
                            */}
                              </Box>
                            </Box>

                            {/* Right Side - View Details Button */}
                            <Box sx={{ flexShrink: 0 }}>
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

                          {/* Border line between studies (except for last item) */}
                          {index < items.length - 1 && (
                            <Box
                              sx={{
                                borderBottom: "1px solid #e0e0e0",
                                mt: 2,
                                mb: 3,
                              }}
                            />
                          )}
                        </Box>
                      ))}

                      {/* Bottom Action Buttons for the entire group */}
                      <Box
                        sx={{
                          display: "flex",
                          gap: 2,
                          justifyContent: "flex-end",
                          mt: 1,
                        }}
                      >
                        <Button
                          variant="outlined"
                          onClick={() => {
                            // Handle download all for this group using combined PDF
                            handleGroupDownload(items, groupKey);
                          }}
                          disabled={
                            downloadingItems.has(`group-${groupKey}`) ||
                            subTab === "requested" // Disabled for requested tab
                          }
                          sx={{
                            width: "140px",
                            height: "48px",
                            borderColor: "#115293",
                            color: "#115293",
                            paddingTop: "12px",
                            paddingRight: "16px",
                            paddingBottom: "12px",
                            paddingLeft: "16px",
                            borderRadius: "8px",
                            fontSize: "0.875rem",
                            textTransform: "none",
                            opacity: subTab === "requested" ? 0.85 : 1,
                            "&:hover": {
                              borderColor: "#0d4078",
                              backgroundColor: "rgba(17, 82, 147, 0.04)",
                            },
                            "&:disabled": {
                              opacity: 0.85,
                            },
                          }}
                        >
                          {downloadingItems.has(`group-${groupKey}`)
                            ? "Downloading..."
                            : "Download"}
                        </Button>

                        <Button
                          variant="outlined"
                          onClick={() => {
                            // Handle delete entire group with confirmation
                            handleGroupDelete(items, groupKey);
                          }}
                          disabled={deletingItems.has(`group-${groupKey}`)} // Disabled while deleting
                          sx={{
                            width: "120px",
                            height: "48px",
                            borderColor: "#115293",
                            color: "#115293",
                            paddingTop: "12px",
                            paddingRight: "16px",
                            paddingBottom: "12px",
                            paddingLeft: "16px",
                            borderRadius: "8px",
                            fontSize: "0.875rem",
                            textTransform: "none",
                            "&:hover": {
                              borderColor: "#0d4078",
                              backgroundColor: "rgba(17, 82, 147, 0.04)",
                            },
                            "&:disabled": {
                              opacity: 0.85,
                            },
                          }}
                        >
                          {deletingItems.has(`group-${groupKey}`)
                            ? "Deleting..."
                            : "Delete"}
                        </Button>

                        <Button
                          variant="outlined"
                          onClick={() => {
                            // Handle pay for this group
                            handlePayment(items, groupKey);
                          }}
                          disabled={
                            subTab === "requested" || // Disabled for requested tab
                            subTab === "valid" || // Disabled for valid tab
                            subTab === "expired" || // Disabled for expired tab
                            processingPayment.has(`group-${groupKey}`) // Disabled while processing
                          }
                          sx={{
                            width: "120px",
                            height: "48px",
                            borderColor: "#115293",
                            color: "#115293",
                            paddingTop: "12px",
                            paddingRight: "16px",
                            paddingBottom: "12px",
                            paddingLeft: "16px",
                            borderRadius: "8px",
                            fontSize: "0.875rem",
                            textTransform: "none",
                            opacity: 0.85,
                            "&:hover": {
                              borderColor: "#0d4078",
                              backgroundColor: "rgba(17, 82, 147, 0.04)",
                            },
                            "&:disabled": {
                              opacity: 0.85,
                            },
                          }}
                        >
                          {processingPayment.has(`group-${groupKey}`)
                            ? "Processing..."
                            : "Pay"}
                        </Button>
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
        subTab={subTab}
        onPayClick={(item) => {
          // Handle payment from modal
          const quotationNo = item.quotationNo?.replace(/^#/, "");
          if (quotationNo) {
            // Create a single-item array for the payment handler
            handlePayment([item], quotationNo);
          }
          setViewDetailsOpen(false);
        }}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={deleteConfirmOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Confirm Delete"
        message="Are you sure you want to delete this quotation?"
      />

      {/* Payment Success Modal */}
      <PaymentSuccessModal
        open={paymentSuccessOpen}
        onClose={() => {
          setPaymentSuccessOpen(false);
          setConvertedOrderNo(null);
          setLastQuotationNo(null);
        }}
        orderNo={convertedOrderNo || undefined}
        quotationNo={lastQuotationNo || undefined}
      />
    </Box>
  );
}
