import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../../../../store/slices/snackbar";
import { useScrollLock } from "../../../../hooks/useScrollLock";
import {
  Box,
  Typography,
  Paper,
  IconButton,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import jsPDF from "jspdf";
import Image from "next/image";
import EmailIcon from "@mui/icons-material/Email";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import { getGuidelineData as getInvitroGuidelineData } from "../data/guidelineData";
import { getGuidelineData as getToxicityGuidelineData } from "../../toxicity-study/data/guidelineData";
import { getStudyData as getMicrobiologyStudyData } from "../../microbiology-virology/data/guidelineData";
import { DraftsOutlined, SaveOutlined } from "@mui/icons-material";
import { useUser } from "@clerk/nextjs";
import { storeCartItems } from "../../../../utils/cartStorage";
import { AccountPopup } from "../../../../components/AccountPopup";
import {
  QUOTATION_CONFIG,
  getQuotationMode,
  getVisibleSteps,
  getButtonText,
} from "../../../../constants/quotationConfig";
import RequestSuccessModal from "../../../../components/common/RequestSuccessModal";
import { getPortalApiUrl, API_ENDPOINTS, portalApiPost } from "../../../../utils/apiConfig";
import { useCart } from "../../../../contexts/CartContext";

interface QuotationGenerationModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: string;
  sampleForm: string;
  sampleSolvent: string;
  application: string;
  numSamples: number;
  selectedGuidelines: string[];
  sampleFormGuidelines?: string[];
  sampleSolventGuidelines?: string[];
  selectedTherapeuticAreas?: string[];
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerCompany: string;
  customSampleForm: string;
  customSampleSolvent: string;
  customApplication: string;
  isCheckoutMode?: boolean;
  cartItems?: any[];
}

export default function QuotationGenerationModal({
  isOpen,
  onClose,
  category,
  sampleForm,
  sampleSolvent,
  application,
  numSamples,
  selectedGuidelines,
  sampleFormGuidelines = [],
  sampleSolventGuidelines = [],
  selectedTherapeuticAreas = [],
  customerName,
  customerEmail,
  customerPhone,
  customerCompany,
  customSampleForm,
  customSampleSolvent,
  customApplication,
  isCheckoutMode = false,
  cartItems = [],
}: QuotationGenerationModalProps) {
  console.log("🔥 INVITRO QuotationGenerationModal - Props received:", {
    isOpen,
    cartItems,
    isCheckoutMode,
    category,
    sampleForm,
    sampleSolvent,
    application,
  });

  const theme = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useUser();
  const { clearCart } = useCart();
  const [isGenerating, setIsGenerating] = useState(true);

  // Use existing configNo from cartItems if available, otherwise generate new one
  const [quotationNumber] = useState(() => {
    console.log(
      "🔥 INVITRO QuotationGenerationModal - Determining quotation number..."
    );
    console.log("🔥 cartItems:", cartItems);
    console.log("🔥 cartItems length:", cartItems?.length);

    if (cartItems && cartItems.length > 0) {
      console.log("🔥 First cart item:", cartItems[0]);
      console.log("🔥 First cart item configNo:", cartItems[0].configNo);

      if (cartItems[0].configNo) {
        // Remove # prefix if it exists
        const existingConfigNo = cartItems[0].configNo.replace("#", "");
        console.log(
          "� INVITRO Using existing configNo from cartItems (cleaned):",
          existingConfigNo
        );
        return existingConfigNo;
      }
    }

    const newQuotationNumber = `RR${String(Math.floor(Math.random() * 1000000)).padStart(6, "0")}`;
    console.log(
      "� INVITRO Generated new quotation number:",
      newQuotationNumber
    );
    return newQuotationNumber;
  });

  // Use cartItems configNo if available, otherwise use generated number
  const actualQuotationNumber =
    cartItems && cartItems.length > 0 && cartItems[0].configNo
      ? cartItems[0].configNo.replace("#", "")
      : quotationNumber;

  console.log(
    "🔥 INVITRO Final quotation number being used:",
    actualQuotationNumber
  );

  const [mounted, setMounted] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isEmailSending, setIsEmailSending] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [accountPopupOpen, setAccountPopupOpen] = useState(false);
  const [requestSuccessOpen, setRequestSuccessOpen] = useState(false);

  // Get quotation mode from config
  const quotationMode = getQuotationMode();
  const visibleSteps = getVisibleSteps();
  const buttonText = getButtonText();

  // EMERGENCY FIX: Force 2 steps if config is false
  const finalSteps = QUOTATION_CONFIG.GENERATE_QUOTATION_MODAL
    ? visibleSteps
    : [
        { id: 1, title: "Order Summary", completed: true },
        { id: 2, title: "Customer Details", completed: true },
      ];

  // Debug logging
  console.log("🔧 INVITRO CONFIG DEBUG:", {
    GENERATE_QUOTATION_MODAL: QUOTATION_CONFIG.GENERATE_QUOTATION_MODAL,
    quotationMode,
    visibleStepsCount: visibleSteps.length,
    finalStepsCount: finalSteps.length,
    buttonText,
    visibleSteps: visibleSteps.map((s) => s.title),
    finalSteps: finalSteps.map((s) => s.title),
    timestamp: new Date().toISOString(),
  });

  // Set mounted to true on client side
  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll when modal is open
  useScrollLock(isOpen);

  // Get today's date and expiry date (30 days from today)
  const today = new Date();
  const expiryDate = new Date(today);
  expiryDate.setDate(today.getDate() + 30);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  useEffect(() => {
    if (isOpen) {
      console.log("Modal opened, isGenerating set to true");
      // Simulate PDF generation
      const timer = setTimeout(() => {
        console.log("Timer completed, setting isGenerating to false");
        setIsGenerating(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Helper function to format category display
  const formatCategoryDisplay = (category: string, studyType?: string) => {
    if (studyType === "Toxicity Study") {
      return "Toxicity Study";
    } else if (
      studyType === "Microbiology & Virology Study" ||
      studyType === "microbiology-virology"
    ) {
      return "Microbiology & Virology Study";
    } else if (studyType === "Invitro Study") {
      return "Invitro Study";
    }
    return category;
  };

  // Helper function to get guideline data based on study type
  const getCorrectGuidelineData = (
    studyType: string,
    category: string,
    guideline: string,
    cartItem?: any
  ) => {
    if (studyType === "Toxicity Study") {
      return getToxicityGuidelineData(category, guideline);
    } else if (
      studyType === "Microbiology & Virology Study" ||
      studyType === "microbiology-virology"
    ) {
      // For Microbiology Study, use the getStudyData function
      const data = getMicrobiologyStudyData(category, guideline);
      if (data) {
        return {
          category: data.category,
          description: data.studyName,
          price: data.price,
          duration: data.duration,
          discount: 0, // Microbiology studies don't have discount field
        };
      }
      return null;
    } else {
      // For Invitro Study, we need to search through all therapeutic areas
      // because the guideline might be a study name from any therapeutic area
      const allData = [
        ...require("../data/guidelineData").nutraceuticalsData,
        ...require("../data/guidelineData").cosmeceuticalsData,
        ...require("../data/guidelineData").pharmaceuticalsData,
        ...require("../data/guidelineData").herbalAyushData,
      ];

      // Find the data that matches the guideline (study name)
      const data = allData.find((item) => item.studyName === guideline);

      if (data) {
        return {
          category: data.therapeuticArea,
          description: data.studyName,
          price: data.price,
          duration: data.duration,
          discount: data.discount,
        };
      }

      return null;
    }
  };

  // Calculate totals
  const calculateTotals = () => {
    let totalAmount = 0;

    if (isCheckoutMode && cartItems.length > 0) {
      // Calculate totals for checkout mode (multiple cart items)
      cartItems.forEach((cartItem) => {
        // Handle different study types
        let guidelinesToProcess: string[] = [];

        if (
          cartItem.studyType === "Microbiology & Virology Study" ||
          cartItem.studyType === "microbiology-virology"
        ) {
          // For microbiology studies, use selectedStudies
          guidelinesToProcess = cartItem.selectedStudies || [];
        } else {
          // For other studies, use selectedGuidelines
          guidelinesToProcess = cartItem.selectedGuidelines || [];
        }

        if (Array.isArray(guidelinesToProcess)) {
          guidelinesToProcess.forEach((guideline: string) => {
            const guidelineData = getCorrectGuidelineData(
              cartItem.studyType || "Invitro Study",
              cartItem.category,
              guideline,
              cartItem
            );
            const price = guidelineData?.price || 0;
            const quantity = cartItem.numSamples || 1;

            // For microbiology studies, multiply by number of microorganisms and applications
            let itemTotal;
            if (
              cartItem.studyType === "Microbiology & Virology Study" ||
              cartItem.studyType === "microbiology-virology"
            ) {
              const microorganismCount = Array.isArray(
                cartItem.selectedMicroorganism
              )
                ? cartItem.selectedMicroorganism.length
                : 1;
              const applicationCount = Array.isArray(
                cartItem.selectedApplications
              )
                ? cartItem.selectedApplications.length
                : 1;
              itemTotal =
                price * microorganismCount * quantity * applicationCount;
              console.log("🔍 Microbiology pricing debug:", {
                studyType: cartItem.studyType,
                microorganismCount,
                applicationCount,
                price,
                quantity,
                itemTotal,
                selectedMicroorganism: cartItem.selectedMicroorganism,
                selectedApplications: cartItem.selectedApplications,
              });
            } else {
              itemTotal = price * quantity;
            }

            totalAmount += itemTotal;
          });
        }
      });
    } else {
      // Calculate totals for single item mode
      selectedGuidelines.forEach((guideline) => {
        const guidelineData = getCorrectGuidelineData(
          "Invitro Study",
          category,
          guideline
        );
        const price = guidelineData?.price || 0;
        const quantity = numSamples || 1;
        const itemTotal = price * quantity;
        totalAmount += itemTotal;
      });
    }

    const gst = totalAmount * 0.18;
    const grandTotal = totalAmount + gst;

    return { totalAmount, gst, grandTotal };
  };

  const { totalAmount, gst, grandTotal } = calculateTotals();

  const generatePDF = () => {
    console.log("PDF Generation Started - Headers should be on separate lines");
    const doc = new jsPDF();

    // Set font
    doc.setFont("helvetica");

    // Header Section - Company Logo and Details
    doc.setFillColor(25, 118, 210);
    doc.rect(20, 20, 80, 50, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("RADIANT RESEARCH", 25, 35);
    doc.text("SERVICES PVT LTD", 25, 45);

    // Company details
    doc.setTextColor(51, 51, 51);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Plot No:99/A, 8th Main Road, IIIrd Phase,", 20, 85);
    doc.text(
      "Peenya Industrial Area, Bengaluru, Karnataka, India 560058",
      20,
      92
    );
    doc.text("info@radiantresearch.in", 20, 99);
    doc.text("+91 80505 16699", 20, 106);
    doc.text("GSTIN: 29AAECR5347Q2ZJ", 20, 113);

    // Quotation details - Right side
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(`Quotation #${actualQuotationNumber}`, 140, 35);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Created Date: ${formatDate(today)}`, 140, 45);
    doc.text(`Expiry Date: ${formatDate(expiryDate)}`, 140, 52);

    // From details (left side)
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("From:", 20, 58);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Radiant Research Services Pvt Ltd", 20, 68);
    doc.text("Plot No:99/A, 8th Main Road, IIIrd Phase,", 20, 75);
    doc.text(
      "Peenya Industrial Area, Bengaluru, Karnataka, India 560058",
      20,
      82
    );
    doc.text("info@radiantresearch.in", 20, 89);
    doc.text("+91 80505 16699", 20, 96);
    doc.text("GSTIN: 29AAECR5347Q2ZJ", 20, 103);

    // Customer details (right side)
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("To:", 140, 58);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(customerName || "John Show", 140, 68);
    doc.text(customerCompany || "Info tech Solutions", 140, 75);
    doc.text(customerEmail || "John@email.com", 140, 82);
    doc.text(customerPhone || "+91 80505 16699", 140, 89);

    // Start table position
    let yPosition = 110;

    // Table header with background
    doc.setFillColor(245, 245, 245);
    doc.rect(20, yPosition - 14, 170, 14, "F");
    doc.setTextColor(51, 51, 51);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("S.No", 25, yPosition - 4);
    doc.text("Product Description", 45, yPosition - 4);
    doc.text("Guidelines", 115, yPosition - 4);
    doc.text("Quantity", 135, yPosition - 4);

    // Unit Price column with smaller font
    doc.setFontSize(8);
    console.log("Generating Unit Price header with line breaks");
    doc.text("Unit", 155, yPosition - 12);
    doc.text("Price", 155, yPosition - 4);

    // Total Price column with smaller font
    console.log("Generating Total Price header with line breaks");
    doc.text("Total", 175, yPosition - 12);
    doc.text("Price", 175, yPosition - 4);

    // Reset font size for content
    doc.setFontSize(10);

    // Table content
    if (isCheckoutMode && cartItems.length > 0) {
      // Handle multiple cart items
      let rowIndex = 0;
      cartItems.forEach((cartItem, cartIndex) => {
        let guidelinesToProcess: string[] = [];
        if (
          cartItem.studyType === "Microbiology & Virology Study" ||
          cartItem.studyType === "microbiology-virology"
        ) {
          guidelinesToProcess = cartItem.selectedStudies || [];
        } else {
          guidelinesToProcess = cartItem.selectedGuidelines || [];
        }

        if (Array.isArray(guidelinesToProcess)) {
          const guidelineCount = guidelinesToProcess.length;

          // Calculate total height for this product (all guidelines)
          let totalHeight = 0;
          const descriptions = [];

          guidelinesToProcess.forEach(
            (guideline: string, guidelineIndex: number) => {
              const guidelineData = getCorrectGuidelineData(
                cartItem.studyType || "Invitro Study",
                cartItem.category,
                guideline,
                cartItem
              );
              const price = guidelineData?.price || 0;
              const quantity = cartItem.numSamples || 1;

              // For microbiology studies, multiply by number of microorganisms and applications
              let totalPrice;
              let displayQuantity = quantity;
              if (
                cartItem.studyType === "Microbiology & Virology Study" ||
                cartItem.studyType === "microbiology-virology"
              ) {
                const microorganismCount = Array.isArray(
                  cartItem.selectedMicroorganism
                )
                  ? cartItem.selectedMicroorganism.length
                  : 1;
                const applicationCount = Array.isArray(
                  cartItem.selectedApplications
                )
                  ? cartItem.selectedApplications.length
                  : 1;
                totalPrice =
                  price * microorganismCount * quantity * applicationCount;
                displayQuantity =
                  quantity * microorganismCount * applicationCount; // Show total quantity calculation
                console.log("🔍 PDF Microbiology pricing debug:", {
                  studyType: cartItem.studyType,
                  microorganismCount,
                  applicationCount,
                  displayQuantity,
                  price,
                  quantity,
                  totalPrice,
                  selectedMicroorganism: cartItem.selectedMicroorganism,
                  selectedApplications: cartItem.selectedApplications,
                });
              } else {
                totalPrice = price * quantity;
              }

              const isFirstGuideline = guidelineIndex === 0;

              if (isFirstGuideline) {
                let description = `${formatCategoryDisplay(cartItem.category, cartItem.studyType)}\n\n• Sample Description: ${cartItem.sampleDescription || cartItem.description || "Description not available"}\n• Product Type: ${cartItem.category}\n• Sample Form: ${cartItem.sampleForm}\n• Sample Solvent: ${cartItem.sampleSolvent}`;

                // Handle different study types
                if (cartItem.studyType === "Toxicity Study") {
                  // For toxicity studies, show application
                  if (cartItem.application) {
                    description += `\nApplication: ${cartItem.application}`;
                  }
                } else if (
                  cartItem.studyType === "Microbiology & Virology Study" ||
                  cartItem.studyType === "microbiology-virology"
                ) {
                  // For microbiology studies, show microorganism type and microorganism
                  if (
                    cartItem.microorganismType ||
                    cartItem.selectedMicroorganismType
                  ) {
                    description += `\nType of Micro-organism: ${cartItem.microorganismType || cartItem.selectedMicroorganismType}`;
                  }
                  if (
                    cartItem.microorganism ||
                    cartItem.selectedMicroorganism
                  ) {
                    const microorganism =
                      cartItem.microorganism || cartItem.selectedMicroorganism;
                    const microorganismText = Array.isArray(microorganism)
                      ? microorganism.join(", ")
                      : microorganism;
                    description += `\nMicro-organism: ${microorganismText}`;
                  }
                } else if (
                  cartItem.selectedTherapeuticAreas &&
                  cartItem.selectedTherapeuticAreas.length > 0
                ) {
                  // For invitro studies, show therapeutic areas
                  description += `\nTherapeutic Areas: ${cartItem.selectedTherapeuticAreas.join(", ")}`;
                }

                const lines = doc.splitTextToSize(description, 70);
                const descriptionHeight = Math.max(lines.length * 4, 12);
                descriptions.push({
                  lines,
                  height: descriptionHeight,
                  guideline,
                  price,
                  quantity: displayQuantity,
                  totalPrice,
                });
                console.log("🔍 PDF Description added:", {
                  guideline,
                  price,
                  quantity: displayQuantity,
                  totalPrice,
                });
                totalHeight += descriptionHeight;
              } else {
                descriptions.push({
                  lines: null,
                  height: 12,
                  guideline,
                  price,
                  quantity: displayQuantity,
                  totalPrice,
                });
                console.log("🔍 PDF Description added (subsequent):", {
                  guideline,
                  price,
                  quantity: displayQuantity,
                  totalPrice,
                });
                totalHeight += 12;
              }
            }
          );

          // Draw the merged cells for this product
          let currentY = yPosition;

          descriptions.forEach((desc, index) => {
            const isFirstRow = index === 0;
            const rowHeight = desc.height;

            // Alternate row colors
            if (rowIndex % 2 === 0) {
              doc.setFillColor(255, 255, 255);
            } else {
              doc.setFillColor(249, 249, 249);
            }

            if (isFirstRow) {
              // First row: draw full width with merged cells
              doc.rect(20, currentY, 170, totalHeight, "F");
              doc.setDrawColor(221, 221, 221);
              doc.rect(20, currentY, 170, totalHeight, "S");

              // Vertical borders for merged cells
              doc.line(40, currentY, 40, currentY + totalHeight); // S.NO border
              doc.line(110, currentY, 110, currentY + totalHeight); // Product Description border
              doc.line(130, currentY, 130, currentY + rowHeight); // Guidelines border
              doc.line(150, currentY, 150, currentY + rowHeight); // Quantity border
              doc.line(170, currentY, 170, currentY + rowHeight); // Unit Price border

              doc.setTextColor(51, 51, 51);
              doc.setFontSize(9);
              doc.setFont("helvetica", "normal");

              // S.NO (merged)
              doc.text(String(rowIndex + 1), 25, currentY + 8);

              // Product Description (merged)
              if (desc.lines) {
                doc.text(desc.lines, 45, currentY + 8);
              }

              // Guidelines
              doc.text(desc.guideline, 115, currentY + 8);

              // Quantity
              console.log("🔍 PDF Drawing quantity:", {
                guideline: desc.guideline,
                quantity: desc.quantity,
              });
              console.log("🔍 PDF Drawing quantity (single):", {
                guideline: desc.guideline,
                quantity: desc.quantity,
              });
              doc.text(String(desc.quantity), 135, currentY + 8);

              // Unit Price
              doc.text(
                `₹${desc.price.toLocaleString("en-IN")}`,
                155,
                currentY + 8
              );

              // Total Price
              doc.text(
                `₹${desc.totalPrice.toLocaleString("en-IN")}`,
                175,
                currentY + 8
              );
            } else {
              // Subsequent rows: only draw individual cells
              doc.rect(20, currentY, 170, rowHeight, "F");
              doc.setDrawColor(221, 221, 221);
              doc.rect(20, currentY, 170, rowHeight, "S");

              // Vertical borders (skip S.NO and Product Description borders as they're already drawn)
              doc.line(110, currentY, 110, currentY + rowHeight); // Product Description border
              doc.line(130, currentY, 130, currentY + rowHeight); // Guidelines border
              doc.line(150, currentY, 150, currentY + rowHeight); // Quantity border
              doc.line(170, currentY, 170, currentY + rowHeight); // Unit Price border

              doc.setTextColor(51, 51, 51);
              doc.setFontSize(9);
              doc.setFont("helvetica", "normal");

              // Guidelines
              doc.text(desc.guideline, 115, currentY + 8);

              // Quantity
              console.log("🔍 PDF Drawing quantity:", {
                guideline: desc.guideline,
                quantity: desc.quantity,
              });
              console.log("🔍 PDF Drawing quantity (single):", {
                guideline: desc.guideline,
                quantity: desc.quantity,
              });
              doc.text(String(desc.quantity), 135, currentY + 8);

              // Unit Price
              doc.text(
                `₹${desc.price.toLocaleString("en-IN")}`,
                155,
                currentY + 8
              );

              // Total Price
              doc.text(
                `₹${desc.totalPrice.toLocaleString("en-IN")}`,
                175,
                currentY + 8
              );
            }

            currentY += rowHeight;
          });

          yPosition = currentY;
          rowIndex++;
        }
      });
    } else {
      // Handle single item
      const guidelineCount = selectedGuidelines.length;

      // Calculate total height for all guidelines
      let totalHeight = 0;
      const descriptions = [];

      selectedGuidelines.forEach((guideline, index) => {
        const guidelineData = getCorrectGuidelineData(
          "Invitro Study",
          category,
          guideline
        );
        const price = guidelineData?.price || 0;
        const quantity = numSamples || 1;
        const totalPrice = price * quantity;

        const isFirstGuideline = index === 0;
        const finalSampleForm =
          sampleForm === "Others" ? customSampleForm : sampleForm;
        const finalSampleSolvent =
          sampleSolvent === "Others" ? customSampleSolvent : sampleSolvent;

        if (isFirstGuideline) {
          let description = `${formatCategoryDisplay(category, "Invitro Study")}\n\n• Sample Description: Description not available\n• Product Type: ${category}\n• Sample Form: ${finalSampleForm}\n• Sample Solvent: ${finalSampleSolvent}`;
          if (selectedTherapeuticAreas.length > 0) {
            description += `\nTherapeutic Areas: ${selectedTherapeuticAreas.join(", ")}`;
          }

          const lines = doc.splitTextToSize(description, 70);
          const descriptionHeight = Math.max(lines.length * 4, 12);
          descriptions.push({
            lines,
            height: descriptionHeight,
            guideline,
            price,
            quantity,
            totalPrice,
          });
          totalHeight += descriptionHeight;
        } else {
          descriptions.push({
            lines: null,
            height: 12,
            guideline,
            price,
            quantity,
            totalPrice,
          });
          totalHeight += 12;
        }
      });

      // Draw the merged cells for single item
      let currentY = yPosition;

      descriptions.forEach((desc, index) => {
        const isFirstRow = index === 0;
        const rowHeight = desc.height;

        // Alternate row colors
        if (index % 2 === 0) {
          doc.setFillColor(255, 255, 255);
        } else {
          doc.setFillColor(249, 249, 249);
        }

        if (isFirstRow) {
          // First row: draw full width with merged cells
          doc.rect(20, currentY, 170, totalHeight, "F");
          doc.setDrawColor(221, 221, 221);
          doc.rect(20, currentY, 170, totalHeight, "S");

          // Vertical borders for merged cells
          doc.line(40, currentY, 40, currentY + totalHeight); // S.NO border
          doc.line(110, currentY, 110, currentY + totalHeight); // Product Description border
          doc.line(130, currentY, 130, currentY + rowHeight); // Guidelines border
          doc.line(150, currentY, 150, currentY + rowHeight); // Quantity border
          doc.line(170, currentY, 170, currentY + rowHeight); // Unit Price border

          doc.setTextColor(51, 51, 51);
          doc.setFontSize(9);
          doc.setFont("helvetica", "normal");

          // S.NO (merged)
          doc.text(String(index + 1), 25, currentY + 8);

          // Product Description (merged)
          if (desc.lines) {
            doc.text(desc.lines, 45, currentY + 8);
          }

          // Guidelines
          doc.text(desc.guideline, 115, currentY + 8);

          // Quantity
          console.log("🔍 PDF Drawing quantity (single):", {
            guideline: desc.guideline,
            quantity: desc.quantity,
          });
          doc.text(String(desc.quantity), 135, currentY + 8);

          // Unit Price
          doc.text(`₹${desc.price.toLocaleString("en-IN")}`, 155, currentY + 8);

          // Total Price
          doc.text(
            `₹${desc.totalPrice.toLocaleString("en-IN")}`,
            175,
            currentY + 8
          );
        } else {
          // Subsequent rows: only draw individual cells
          doc.rect(20, currentY, 170, rowHeight, "F");
          doc.setDrawColor(221, 221, 221);
          doc.rect(20, currentY, 170, rowHeight, "S");

          // Vertical borders (skip S.NO and Product Description borders as they're already drawn)
          doc.line(110, currentY, 110, currentY + rowHeight); // Product Description border
          doc.line(130, currentY, 130, currentY + rowHeight); // Guidelines border
          doc.line(150, currentY, 150, currentY + rowHeight); // Quantity border
          doc.line(170, currentY, 170, currentY + rowHeight); // Unit Price border

          doc.setTextColor(51, 51, 51);
          doc.setFontSize(9);
          doc.setFont("helvetica", "normal");

          // Guidelines
          doc.text(desc.guideline, 115, currentY + 8);

          // Quantity
          console.log("🔍 PDF Drawing quantity (single):", {
            guideline: desc.guideline,
            quantity: desc.quantity,
          });
          doc.text(String(desc.quantity), 135, currentY + 8);

          // Unit Price
          doc.text(`₹${desc.price.toLocaleString("en-IN")}`, 155, currentY + 8);

          // Total Price
          doc.text(
            `₹${desc.totalPrice.toLocaleString("en-IN")}`,
            175,
            currentY + 8
          );
        }

        currentY += rowHeight;
      });

      yPosition = currentY;
    }

    // Summary Section
    yPosition += 20;

    // Summary of Charges (right side)
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("Summary of Charges:", 140, yPosition);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(
      `Sub total (excl. Tax): ₹${totalAmount.toLocaleString("en-IN")}`,
      140,
      yPosition + 8
    );

    doc.text(`GST: 18% ₹${gst.toLocaleString("en-IN")}`, 140, yPosition + 14);

    doc.setFont("helvetica", "bold");
    doc.text(
      `Grand Total: ₹${grandTotal.toLocaleString("en-IN")}`,
      140,
      yPosition + 20
    );

    // Terms and Conditions (below Summary of Charges)
    yPosition += 40;
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("Terms and Conditions:", 20, yPosition);

    yPosition += 8;
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(
      "1) This quotation is valid for 30 days from the date of issue unless otherwise stated.",
      20,
      yPosition
    );

    yPosition += 6;
    doc.text(
      "2) Samples will be stored only for 30 days after the report delivery.",
      20,
      yPosition
    );

    yPosition += 6;
    doc.text(
      "3) The scope of this project includes only testing mentioned above and during analysis, if additional services are needed, then those will be charged extra",
      20,
      yPosition
    );

    yPosition += 6;
    doc.text(
      "4) The identity and composition of the test item is the responsibility of the sponsor. No analysis will be performed at Radiant Research Services Pvt Ltd to confirm it.",
      20,
      yPosition
    );

    // Footer
    yPosition += 20;
    doc.setDrawColor(221, 221, 221);
    doc.line(20, yPosition, 190, yPosition);

    yPosition += 8;
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(
      `Please use ${actualQuotationNumber} as a further reference number`,
      20,
      yPosition
    );

    yPosition += 6;
    doc.text(
      "For any questions please contact us at info@radiantresearch.in",
      20,
      yPosition
    );

    // Save the PDF
    doc.save(`Quotation-${actualQuotationNumber}.pdf`);
  };

  const prepareQuotationData = () => {
    const products = [];

    if (isCheckoutMode && cartItems.length > 0) {
      cartItems.forEach((cartItem) => {
        const guidelines = [];
        let guidelinesToProcess = [];
        if (
          cartItem.studyType === "Microbiology & Virology Study" ||
          cartItem.studyType === "microbiology-virology"
        ) {
          guidelinesToProcess = cartItem.selectedStudies || [];
        } else {
          guidelinesToProcess = cartItem.selectedGuidelines || [];
        }

        guidelinesToProcess.forEach((guideline) => {
          const guidelineData = getCorrectGuidelineData(
            cartItem.studyType || "Invitro Study",
            cartItem.category,
            guideline,
            cartItem
          );
          const price = guidelineData?.price || 0;
          let qty = cartItem.numSamples || 1;
          if (
            cartItem.studyType === "Microbiology & Virology Study" ||
            cartItem.studyType === "microbiology-virology"
          ) {
            const microorganismCount = Array.isArray(
              cartItem.selectedMicroorganism
            )
              ? cartItem.selectedMicroorganism.length
              : 1;
            const applicationCount = Array.isArray(
              cartItem.selectedApplications
            )
              ? cartItem.selectedApplications.length
              : 1;
            qty = qty * microorganismCount * applicationCount;
          }
          guidelines.push({ name: guideline, qty, unitPrice: price });
        });

        const details = [
          `Sample Description: ${cartItem.sampleDescription || cartItem.description || "Description not available"}`,
          `Product Type: ${cartItem.category}`,
          `Sample Form: ${cartItem.sampleForm}`,
          `Sample Solvent: ${cartItem.sampleSolvent}`,
        ];

        if (cartItem.studyType === "Toxicity Study") {
          if (cartItem.application)
            details.push(`Application: ${cartItem.application}`);
        } else if (
          cartItem.studyType === "Microbiology & Virology Study" ||
          cartItem.studyType === "microbiology-virology"
        ) {
          if (
            cartItem.microorganismType ||
            cartItem.selectedMicroorganismType
          ) {
            details.push(
              `Type of Micro-organism: ${cartItem.microorganismType || cartItem.selectedMicroorganismType}`
            );
          }
          if (cartItem.microorganism || cartItem.selectedMicroorganism) {
            const microorganism =
              cartItem.microorganism || cartItem.selectedMicroorganism;
            const microorganismText = Array.isArray(microorganism)
              ? microorganism.join(", ")
              : microorganism;
            details.push(`Micro-organism: ${microorganismText}`);
          }
        } else if (
          cartItem.selectedTherapeuticAreas &&
          cartItem.selectedTherapeuticAreas.length > 0
        ) {
          details.push(
            `Therapeutic Areas: ${cartItem.selectedTherapeuticAreas.join(", ")}`
          );
        }

        products.push({
          title: cartItem.studyType || "Study",
          details,
          guidelines,
        });
      });
    } else {
      // For single item
      const guidelines = selectedGuidelines.map((guideline) => {
        const guidelineData = getCorrectGuidelineData(
          "Invitro Study",
          category,
          guideline
        );
        const price = guidelineData?.price || 0;
        return { name: guideline, qty: numSamples || 1, unitPrice: price };
      });

      const details = [
        `Sample Description: Description not available`,
        `Product Type: ${category}`,
        `Sample Form: ${sampleForm === "Others" ? customSampleForm : sampleForm}`,
        `Sample Solvent: ${sampleSolvent === "Others" ? customSampleSolvent : sampleSolvent}`,
      ];

      if (selectedTherapeuticAreas.length > 0) {
        details.push(
          `Therapeutic Areas: ${selectedTherapeuticAreas.join(", ")}`
        );
      }

      products.push({
        title: "Invitro Study",
        details,
        guidelines,
      });
    }

    // Calculate summary
    let subTotal = 0;
    products.forEach((product) => {
      product.guidelines.forEach((g) => {
        subTotal += g.qty * g.unitPrice;
      });
    });
    const gstPercent = 18;
    const gstAmount = subTotal * 0.18;
    const grandTotal = subTotal + gstAmount;

    return {
      quotation: {
        number: actualQuotationNumber,
        createdDate: formatDate(today),
        expiryDate: formatDate(expiryDate),
      },
      customer: {
        name: customerName || "Customer Name",
        company: customerCompany || "Company Name",
        email: customerEmail || "customer@email.com",
        phone: customerPhone || "0000000000",
      },
      products,
      terms: [
        "This quotation is valid for 30 days from the date of issue unless otherwise stated.",
        "Prices are subject to change if the quotation has expired or if project scope is revised.",
      ],
      summary: {
        subTotal,
        gstPercent,
        gstAmount,
        grandTotal,
      },
    };
  };

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    const data = prepareQuotationData();
    try {
      const response = await fetch(getPortalApiUrl(API_ENDPOINTS.quotations.pdf), {
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
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Quotation-${data.quotation.number}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading PDF:", error);
      // Fallback to old method
      generatePDF();
    } finally {
      setIsDownloading(false);
    }
  };

  const handleContactUs = () => {
    router.push("/contact-us");
  };

  const handleSaveQuotation = async () => {
    if (!user?.id) {
      setAccountPopupOpen(true);
      return;
    }

    setIsSaving(true);

    try {
      // Show loading notification
      dispatch(
        openSnackbar({
          open: true,
          message: "Saving quotation...",
          variant: "default",
          severity: "info",
          close: false,
        })
      );

      // Prepare cart items for storage
      const cartItemsToStore = isCheckoutMode
        ? cartItems.map((item, index) => ({
            ...item,
            quotationNumber:
              cartItems.length > 1
                ? `${actualQuotationNumber}-${index + 1}`
                : actualQuotationNumber, // Sequential numbering for multiple studies
            configNo:
              cartItems.length > 1
                ? `${actualQuotationNumber}-${index + 1}`
                : actualQuotationNumber, // Sequential numbering for configNo too
            customerName: customerName,
            customerEmail: customerEmail,
            customerPhone: customerPhone,
            customerCompany: customerCompany,
            customSampleForm: customSampleForm,
            customSampleSolvent: customSampleSolvent,
            createdAt: new Date().toISOString(),
          }))
        : [
            {
              id: `quotation-${Date.now()}`,
              studyType: "In-Vitro Studies", // Fixed to use correct study type
              category: category,
              sampleForm: sampleForm,
              sampleSolvent: sampleSolvent,
              application: application,
              numSamples: numSamples,
              selectedGuidelines: selectedGuidelines,
              sampleFormGuidelines: sampleFormGuidelines,
              sampleSolventGuidelines: sampleSolventGuidelines,
              applicationGuidelines: [],
              selectedTherapeuticAreas: selectedTherapeuticAreas,
              price: 0, // Will be calculated by the API
              customerName: customerName,
              customerEmail: customerEmail,
              customerPhone: customerPhone,
              customerCompany: customerCompany,
              customSampleForm: customSampleForm,
              customSampleSolvent: customSampleSolvent,
              createdAt: new Date().toISOString(),
              quotationNumber: actualQuotationNumber,
              configNo: actualQuotationNumber,
            },
          ];

      console.log("� INVITRO SAVE QUOTATION - About to store cart items:");
      console.log("🔥 quotationNumber being used:", actualQuotationNumber);
      console.log("🔥 cartItemsToStore:", cartItemsToStore);
      console.log("�💾 Storing quotation data...", cartItemsToStore);
      console.log("�💾 Storing quotation data...", cartItemsToStore);
      const storeResult = await storeCartItems(
        cartItemsToStore,
        user.id,
        undefined,
        {
          customerName,
          customerEmail,
          customerPhone,
          customerCompany,
        }
      );
      console.log("✅ Quotation saved successfully:", storeResult);

      if (storeResult.data.errorCount > 0) {
        console.warn("⚠️ Some items failed to store:", storeResult.data.errors);
        dispatch(
          openSnackbar({
            open: true,
            message: "Quotation saved with some warnings",
            variant: "default",
            severity: "warning",
            close: true,
          })
        );
      } else {
        // Clear cart after successful quotation save
        try {
          if (user?.id) {
            // Clear cart from database
            await portalApiPost(API_ENDPOINTS.cart.clear, {
              userId: user.id,
              itemIds: cartItemsToStore.map(item => item.id),
            });
            // Also clear cart context
            clearCart();
            console.log('✅ Cart cleared after successful quotation save');
          }
        } catch (error) {
          console.error('⚠️ Error clearing cart after quotation save:', error);
          // Still show success even if cart clearing fails
        }

        setIsSaved(true);
        dispatch(
          openSnackbar({
            open: true,
            message: "Quotation saved successfully!",
            variant: "default",
            severity: "success",
            close: true,
          })
        );
      }
    } catch (error) {
      console.error("❌ Error saving quotation:", error);
      dispatch(
        openSnackbar({
          open: true,
          message: "Failed to save quotation. Please try again.",
          variant: "default",
          severity: "error",
          close: true,
        })
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleEmailMe = async () => {
    try {
      // Set loading state
      setIsEmailSending(true);

      // Show loading notification
      dispatch(
        openSnackbar({
          open: true,
          message: "Sending quotation email...",
          variant: "default",
          severity: "info",
          close: false,
        })
      );

      // Prepare quotation data
      const quotationData = prepareQuotationData();

      console.log("🔥 EMAIL DEBUG - Customer info:");
      console.log("🔥 customerName:", customerName);
      console.log("🔥 customerEmail:", customerEmail);
      console.log("🔥 actualQuotationNumber:", actualQuotationNumber);
      console.log("🔥 quotationData:", quotationData);

      // Send email with PDF attachment
      const response = await fetch(getPortalApiUrl(API_ENDPOINTS.quotations.email), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quotationNumber: actualQuotationNumber,
          customerName: customerName || "Valued Customer",
          customerEmail: customerEmail || "info@radiantresearch.in",
          quotationData,
          includeAttachment: true,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setIsEmailSending(false);
        setIsEmailSent(true);

        dispatch(
          openSnackbar({
            open: true,
            message: "Quotation email sent successfully!",
            variant: "alert",
            alert: {
              color: "success",
              variant: "filled",
            },
            severity: "success",
            close: true,
          })
        );

        // Optional: Show additional info about attachment
        if (result.attachmentIncluded) {
          setTimeout(() => {
            dispatch(
              openSnackbar({
                open: true,
                message: "PDF quotation has been attached to the email.",
                variant: "alert",
                alert: {
                  color: "info",
                  variant: "filled",
                },
                severity: "info",
                close: true,
              })
            );
          }, 2000);
        }
      } else {
        throw new Error(result.error || "Failed to send email");
      }
    } catch (error) {
      console.error("Error sending quotation email:", error);

      dispatch(
        openSnackbar({
          open: true,
          message:
            "Failed to send quotation email. Please try again or contact us directly.",
          variant: "alert",
          alert: {
            color: "error",
            variant: "filled",
          },
          severity: "error",
          close: true,
        })
      );

      // Fallback to mailto as before
      const subject = `Quotation ${actualQuotationNumber} - Radiant Research`;
      const body = `Dear ${customerName || "Customer"},

Please find our quotation ${actualQuotationNumber} for your review.

Quotation Details:
- Category: ${category}
- Sample Form: ${sampleForm}
- Sample Solvent: ${sampleSolvent}
- Application: ${application || "N/A"}
- Number of Samples: ${numSamples}
- Total Guidelines: ${selectedGuidelines.length}

If you have any questions or need further assistance, please don't hesitate to contact us.

Best regards,
Radiant Research Team
+91 80505 16699
info@radiantresearch.in`;

      const mailtoLink = `mailto:${customerEmail || "info@radiantresearch.in"}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.open(mailtoLink);
    } finally {
      // Always clear loading state
      setIsEmailSending(false);
    }
  };

  const handleRequestQuotation = async () => {
    if (!user?.id) {
      setAccountPopupOpen(true);
      return;
    }

    setIsSaving(true);

    try {
      // Show loading notification (same as save quotation)
      dispatch(
        openSnackbar({
          open: true,
          message: "Saving quotation...",
          variant: "default",
          severity: "info",
          close: false,
        })
      );

      // Prepare cart items for storage (EXACT SAME as handleSaveQuotation)
      const cartItemsToStore = isCheckoutMode
        ? cartItems.map((item, index) => ({
            ...item,
            quotationNumber:
              cartItems.length > 1
                ? `${actualQuotationNumber}-${index + 1}`
                : actualQuotationNumber, // Sequential numbering for multiple studies
            configNo:
              cartItems.length > 1
                ? `${actualQuotationNumber}-${index + 1}`
                : actualQuotationNumber, // Sequential numbering for configNo too
            customerName: customerName,
            customerEmail: customerEmail,
            customerPhone: customerPhone,
            customerCompany: customerCompany,
            customSampleForm: customSampleForm,
            customSampleSolvent: customSampleSolvent,
            createdAt: new Date().toISOString(),
          }))
        : [
            {
              id: `quotation-${Date.now()}`,
              studyType: "In-Vitro Studies", // Fixed to use correct study type
              category: category,
              sampleForm: sampleForm,
              sampleSolvent: sampleSolvent,
              application: application,
              numSamples: numSamples,
              selectedGuidelines: selectedGuidelines,
              sampleFormGuidelines: sampleFormGuidelines,
              sampleSolventGuidelines: sampleSolventGuidelines,
              applicationGuidelines: [],
              selectedTherapeuticAreas: selectedTherapeuticAreas,
              price: 0, // Will be calculated by the API
              customerName: customerName,
              customerEmail: customerEmail,
              customerPhone: customerPhone,
              customerCompany: customerCompany,
              customSampleForm: customSampleForm,
              customSampleSolvent: customSampleSolvent,
              createdAt: new Date().toISOString(),
              quotationNumber: actualQuotationNumber,
              configNo: actualQuotationNumber,
            },
          ];

      // EXACT SAME LOGS as handleSaveQuotation
      console.log("� INVITRO SAVE QUOTATION - About to store cart items:");
      console.log("🔥 quotationNumber being used:", actualQuotationNumber);
      console.log("🔥 cartItemsToStore:", cartItemsToStore);
      console.log("💾 Storing quotation data...", cartItemsToStore);
      console.log("💾 Storing quotation data...", cartItemsToStore);

      // EXACT SAME API CALL as handleSaveQuotation - calls /api/quotation/store
      const storeResult = await storeCartItems(
        cartItemsToStore,
        user.id,
        undefined,
        {
          customerName,
          customerEmail,
          customerPhone,
          customerCompany,
        }
      );
      console.log("✅ Quotation saved successfully:", storeResult);

      if (storeResult.data.errorCount > 0) {
        console.warn("⚠️ Some items failed to store:", storeResult.data.errors);
        dispatch(
          openSnackbar({
            open: true,
            message: "Quotation saved with some warnings",
            variant: "default",
            severity: "warning",
            close: true,
          })
        );
      } else {
        // Clear cart after successful quotation generation
        try {
          if (user?.id) {
            // Clear cart from database
            await portalApiPost(API_ENDPOINTS.cart.clear, {
              userId: user.id,
              itemIds: cartItemsToStore.map(item => item.id),
            });
            // Also clear cart context
            clearCart();
            console.log('✅ Cart cleared after successful quotation generation');
          }
        } catch (error) {
          console.error('⚠️ Error clearing cart after quotation:', error);
          // Still show success even if cart clearing fails
        }

        // Show success popup instead of snackbar (only difference)
        setRequestSuccessOpen(true);

        // Don't auto-close modal - let user close it manually via success modal
        // setTimeout(() => {
        //   onClose();
        // }, 500);
      }
    } catch (error) {
      console.error("❌ Error saving quotation:", error);
      dispatch(
        openSnackbar({
          open: true,
          message: "Failed to save quotation. Please try again.",
          variant: "default",
          severity: "error",
          close: true,
        })
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleMainAction = () => {
    if (quotationMode === "generate") {
      handleSaveQuotation();
    } else {
      handleRequestQuotation();
    }
  };

  const handleMyQuotationsClick = () => {
    router.push(QUOTATION_CONFIG.MY_QUOTATIONS_PATH);
  };

  const handleAccountPopupClose = () => {
    setAccountPopupOpen(false);
    // If user just logged in and we're in request mode, trigger the request
    if (user?.id && quotationMode === "request") {
      handleRequestQuotation();
    }
  };

  if (!isOpen || !mounted || !actualQuotationNumber) return null;

  const modalContent = (
    <>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: { xs: "100%", sm: "100%", md: "628px" },
          height: "100vh",
          maxWidth: { xs: "100vw", sm: "100vw", md: "628px" },
          zIndex: "99999 !important",
          backgroundImage: "url(/assets/images/home-bg.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          borderTopLeftRadius: { xs: 0, md: "8px" },
          borderBottomLeftRadius: { xs: 0, md: "8px" },
          boxShadow: { xs: "none", md: "-8px 0 32px rgba(0, 0, 0, 0.15)" },
          animation: "slideInFromRight 0.4s ease-out",
          overflow: "hidden",
          opacity: 1,
          display: "flex",
          flexDirection: "column",
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
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton
              onClick={onClose}
              sx={{ p: 1, color: theme.palette.primary.main }}
            >
              <ArrowBackIcon sx={{ fontSize: "1.5rem" }} />
            </IconButton>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                color: theme.palette.primary.main,
                fontSize: { xs: "1.3rem", sm: "1.5rem", md: "1.7rem" },
              }}
            >
              {quotationMode === "generate"
                ? "Generate Quotation"
                : "Request Quotation"}
            </Typography>
          </Box>
          <IconButton onClick={onClose} sx={{ p: 1 }}>
            <Typography variant="h4" sx={{ color: "#666", fontSize: "1.3rem" }}>
              ×
            </Typography>
          </IconButton>
        </Box>

        {/* Content Area - Scrollable */}
        <Box sx={{ flex: 1, overflow: "auto" }}>
          {/* Progress Steps */}
          <Box sx={{ p: { xs: 2, md: 3 }, pb: 2 }}>
            <Box
              sx={{ display: "flex", alignItems: "center", mb: 3, gap: 1.5 }}
            >
              {finalSteps.map((step, index) => (
                <React.Fragment key={step.id}>
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
                        width: 24,
                        height: 24,
                        borderRadius: "50%",
                        background: theme.palette.primary.main,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                        "&::before": {
                          content: '""',
                          position: "absolute",
                          width: "32px",
                          height: "32px",
                          borderRadius: "50%",
                          border: `2px solid rgba(25, 118, 210, 0.3)`,
                          top: "-4px",
                          left: "-4px",
                        },
                      }}
                    >
                      {step.completed ? (
                        <Typography
                          sx={{
                            color: "white",
                            fontSize: "12px",
                            fontWeight: "bold",
                          }}
                        >
                          ✓
                        </Typography>
                      ) : (
                        <Box
                          sx={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            background: "white",
                          }}
                        />
                      )}
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{
                        mt: 0.5,
                        fontWeight: 600,
                        color: theme.palette.primary.main,
                        fontSize: "0.75rem",
                        textAlign: "center",
                      }}
                    >
                      {step.title}
                    </Typography>
                  </Box>
                  {index < finalSteps.length - 1 && (
                    <Box
                      sx={{
                        flex: 1,
                        height: 2,
                        background:
                          index === 0
                            ? theme.palette.primary.main
                            : "rgba(25, 118, 210, 0.3)",
                        borderRadius: 1,
                      }}
                    />
                  )}
                </React.Fragment>
              ))}
            </Box>
          </Box>

          {/* PDF Viewer Card - Only show in generate mode */}
          {quotationMode === "generate" && (
            <Box sx={{ p: 3, pt: 0 }}>
              <Paper
                sx={{
                  backgroundColor: "white",
                  borderRadius: "12px",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                  overflow: "hidden",
                }}
              >
                {/* PDF Toolbar */}
                {/* <Box sx={{ 
                backgroundColor: '#f5f5f5',
                p: 2,
                borderBottom: '1px solid #e0e0e0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: '#333', fontSize: '0.9rem' }}>
                    Quotation #{actualQuotationNumber}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#666', fontSize: '0.8rem' }}>
                    Created: {formatDate(today)}
                  </Typography>
                </Box>
              </Box> */}

                {/* PDF Content */}
                <Box
                  sx={{
                    p: 3,
                    minHeight: "600px",
                    backgroundColor: "white",
                    fontFamily: "Arial, sans-serif",
                  }}
                >
                  {isGenerating ? (
                    <Box sx={{ textAlign: "center" }}>
                      <Box
                        sx={{
                          width: 80,
                          height: 80,
                          borderRadius: "50%",
                          backgroundColor: theme.palette.primary.main,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          mx: "auto",
                          mb: 2,
                          animation: "pulse 2s infinite",
                        }}
                      >
                        <Typography sx={{ color: "white", fontSize: "2rem" }}>
                          📄
                        </Typography>
                      </Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          color: theme.palette.primary.main,
                          mb: 1,
                          fontSize: "1.2rem",
                        }}
                      >
                        Generating Quotation...
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "#666", mb: 2, fontSize: "0.9rem" }}
                      >
                        Your quotation is being prepared. This may take a few
                        moments.
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 1,
                        }}
                      >
                        <Box
                          sx={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            backgroundColor: theme.palette.primary.main,
                            animation: "bounce 1.4s infinite ease-in-out both",
                          }}
                        />
                        <Box
                          sx={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            backgroundColor: theme.palette.primary.main,
                            animation: "bounce 1.4s infinite ease-in-out both",
                            animationDelay: "-0.16s",
                          }}
                        />
                        <Box
                          sx={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            backgroundColor: theme.palette.primary.main,
                            animation: "bounce 1.4s infinite ease-in-out both",
                            animationDelay: "-0.32s",
                          }}
                        />
                      </Box>
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        backgroundColor: "white",
                        color: "black",
                        fontFamily: "Arial, sans-serif",
                        fontSize: "12px",
                        lineHeight: 1.4,
                      }}
                    >
                      {/* Header Section */}
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          mb: 0,
                        }}
                      >
                        {/* Left Side - Company Info */}
                        <Box sx={{ flex: 1 }}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              mb: 2,
                            }}
                          >
                            {/* Logo Image */}
                            <Box sx={{ mr: 2, position: "relative" }}>
                              <Image
                                src="/assets/images/logo.png"
                                alt="RADIANT RESEARCH Logo"
                                width={120}
                                height={80}
                                style={{ objectFit: "contain" }}
                                onError={(e) => {
                                  // Fallback to text if image fails to load
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = "none";
                                  const parent = target.parentElement;
                                  if (parent) {
                                    parent.innerHTML = `
                                    <div style="
                                      display: flex;
                                      align-items: center;
                                      justify-content: center;
                                      width: 80px;
                                      height: 50px;
                                      background: linear-gradient(135deg, #1976d2, #42a5f5);
                                      border-radius: 8px;
                                      color: white;
                                      font-weight: bold;
                                      font-size: 14px;
                                      text-align: center;
                                      line-height: 1.2;
                                    ">
                                      RADIANT RESEARCH<br/>SERVICES PVT LTD
                                    </div>
                                  `;
                                  }
                                }}
                              />
                            </Box>
                          </Box>
                        </Box>

                        {/* Right Side - Quotation Details */}
                        <Box sx={{ flex: 1, textAlign: "right" }}>
                          <Typography
                            sx={{
                              fontSize: "16px",
                              fontWeight: "bold",
                              color: "#333",
                              mb: 1,
                            }}
                          >
                            Quotation #{actualQuotationNumber}
                          </Typography>
                          <Typography
                            sx={{ fontSize: "10px", color: "#666", mb: 0.5 }}
                          >
                            Created Date: {formatDate(today)}
                          </Typography>
                          <Typography
                            sx={{ fontSize: "10px", color: "#666", mb: 2 }}
                          >
                            Expiry Date: {formatDate(expiryDate)}
                          </Typography>
                        </Box>
                      </Box>

                      {/* From and To Section - Same Line */}
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          mb: 4,
                        }}
                      >
                        {/* Left Side - From */}
                        <Box sx={{ flex: 1 }}>
                          <Typography
                            sx={{
                              fontSize: "12px",
                              fontWeight: "bold",
                              color: "#333",
                              mb: 1,
                            }}
                          >
                            From:
                          </Typography>
                          <Typography
                            sx={{ fontSize: "10px", color: "#333", mb: 0.5 }}
                          >
                            Radiant Research Services Pvt Ltd
                          </Typography>
                          <Typography
                            sx={{ fontSize: "10px", color: "#333", mb: 0.5 }}
                          >
                            Plot No:99/A, 8th Main Road, IIIrd Phase,
                          </Typography>
                          <Typography
                            sx={{ fontSize: "10px", color: "#333", mb: 0.5 }}
                          >
                            Peenya Industrial Area, Bengaluru, Karnataka, India
                            560058
                          </Typography>
                          <Typography
                            sx={{ fontSize: "10px", color: "#333", mb: 0.5 }}
                          >
                            info@radiantresearch.in
                          </Typography>
                          <Typography
                            sx={{ fontSize: "10px", color: "#333", mb: 0.5 }}
                          >
                            +91 80505 16699
                          </Typography>
                          <Typography sx={{ fontSize: "10px", color: "#333" }}>
                            GSTIN: 29AAECR5347Q2ZJ
                          </Typography>
                        </Box>

                        {/* Right Side - To */}
                        <Box sx={{ flex: 1, textAlign: "right" }}>
                          <Typography
                            sx={{
                              fontSize: "12px",
                              fontWeight: "bold",
                              color: "#333",
                              mb: 1,
                            }}
                          >
                            To:
                          </Typography>
                          <Typography
                            sx={{ fontSize: "10px", color: "#333", mb: 0.5 }}
                          >
                            {customerName || "John Show"}
                          </Typography>
                          <Typography
                            sx={{ fontSize: "10px", color: "#333", mb: 0.5 }}
                          >
                            {customerCompany || "Info tech Solutions"}
                          </Typography>
                          <Typography
                            sx={{ fontSize: "10px", color: "#333", mb: 0.5 }}
                          >
                            {customerEmail || "John@email.com"}
                          </Typography>
                          <Typography sx={{ fontSize: "10px", color: "#333" }}>
                            {customerPhone || "+91 80505 16699"}
                          </Typography>
                        </Box>
                      </Box>

                      {/* Product Table */}
                      <TableContainer
                        sx={{
                          mb: 3,
                          overflowX: "auto",
                          "&::-webkit-scrollbar": {
                            height: "6px",
                          },
                          "&::-webkit-scrollbar-track": {
                            backgroundColor: "#f1f1f1",
                            borderRadius: "3px",
                          },
                          "&::-webkit-scrollbar-thumb": {
                            backgroundColor: "#115293",
                            borderRadius: "3px",
                          },
                        }}
                      >
                        <Table
                          sx={{
                            border: "1px solid #ddd",
                            tableLayout: {
                              xs: "auto",
                              sm: "auto",
                              md: "fixed",
                              lg: "fixed",
                            },
                            minWidth: {
                              xs: "600px",
                              sm: "700px",
                              md: "auto",
                              lg: "auto",
                            },
                          }}
                        >
                          <colgroup>
                            <col style={{ width: "8%" }} />
                            <col style={{ width: "35%" }} />
                            <col style={{ width: "20%" }} />
                            <col style={{ width: "12%" }} />
                            <col style={{ width: "12%" }} />
                            <col style={{ width: "13%" }} />
                          </colgroup>
                          <TableHead>
                            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                              <TableCell
                                sx={{
                                  fontSize: {
                                    xs: "9px",
                                    sm: "10px",
                                    md: "10px",
                                    lg: "10px",
                                  },
                                  fontWeight: "bold",
                                  padding: {
                                    xs: "6px",
                                    sm: "8px",
                                    md: "8px",
                                    lg: "8px",
                                  },
                                  border: "1px solid #ddd",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                S.No
                              </TableCell>
                              <TableCell
                                sx={{
                                  fontSize: {
                                    xs: "8px",
                                    sm: "9px",
                                    md: "9px",
                                    lg: "9px",
                                  },
                                  fontWeight: "bold",
                                  padding: {
                                    xs: "6px",
                                    sm: "8px",
                                    md: "8px",
                                    lg: "8px",
                                  },
                                  border: "1px solid #ddd",
                                }}
                              >
                                Product Description
                              </TableCell>
                              <TableCell
                                sx={{
                                  fontSize: {
                                    xs: "8px",
                                    sm: "9px",
                                    md: "9px",
                                    lg: "9px",
                                  },
                                  fontWeight: "bold",
                                  padding: {
                                    xs: "6px",
                                    sm: "8px",
                                    md: "8px",
                                    lg: "8px",
                                  },
                                  border: "1px solid #ddd",
                                }}
                              >
                                Guidelines
                              </TableCell>
                              <TableCell
                                sx={{
                                  fontSize: {
                                    xs: "8px",
                                    sm: "9px",
                                    md: "9px",
                                    lg: "9px",
                                  },
                                  fontWeight: "bold",
                                  padding: {
                                    xs: "6px",
                                    sm: "8px",
                                    md: "8px",
                                    lg: "8px",
                                  },
                                  border: "1px solid #ddd",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                Qty
                              </TableCell>
                              <TableCell
                                sx={{
                                  fontSize: {
                                    xs: "9px",
                                    sm: "10px",
                                    md: "10px",
                                    lg: "10px",
                                  },
                                  fontWeight: "bold",
                                  padding: {
                                    xs: "6px",
                                    sm: "8px",
                                    md: "8px",
                                    lg: "8px",
                                  },
                                  border: "1px solid #ddd",
                                  whiteSpace: "nowrap",
                                  textAlign: "center",
                                }}
                              >
                                <Box sx={{ lineHeight: 1.2 }}>
                                  <Box>Unit</Box>
                                  <Box>Price</Box>
                                </Box>
                              </TableCell>
                              <TableCell
                                sx={{
                                  fontSize: {
                                    xs: "9px",
                                    sm: "10px",
                                    md: "10px",
                                    lg: "10px",
                                  },
                                  fontWeight: "bold",
                                  padding: {
                                    xs: "6px",
                                    sm: "8px",
                                    md: "8px",
                                    lg: "8px",
                                  },
                                  border: "1px solid #ddd",
                                  whiteSpace: "nowrap",
                                  textAlign: "center",
                                }}
                              >
                                <Box sx={{ lineHeight: 1.2 }}>
                                  <Box>Total</Box>
                                  <Box>Price</Box>
                                </Box>
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {isCheckoutMode && cartItems.length > 0
                              ? // Handle multiple cart items in checkout mode
                                (() => {
                                  let rowIndex = 0;
                                  const allRows = [];

                                  cartItems.forEach((cartItem, cartIndex) => {
                                    let guidelinesToProcess: string[] = [];
                                    if (
                                      cartItem.studyType ===
                                        "Microbiology & Virology Study" ||
                                      cartItem.studyType ===
                                        "microbiology-virology"
                                    ) {
                                      guidelinesToProcess =
                                        cartItem.selectedStudies || [];
                                    } else {
                                      guidelinesToProcess =
                                        cartItem.selectedGuidelines || [];
                                    }

                                    const guidelineCount =
                                      guidelinesToProcess.length;

                                    guidelinesToProcess.forEach(
                                      (
                                        guideline: string,
                                        guidelineIndex: number
                                      ) => {
                                        const guidelineData =
                                          getCorrectGuidelineData(
                                            cartItem.studyType ||
                                              "Invitro Study",
                                            cartItem.category,
                                            guideline,
                                            cartItem
                                          );
                                        const price = guidelineData?.price || 0;
                                        const quantity =
                                          cartItem.numSamples || 1;

                                        // For microbiology studies, multiply by number of microorganisms and applications
                                        let displayQuantity = quantity;
                                        let totalPrice;
                                        if (
                                          cartItem.studyType ===
                                            "Microbiology & Virology Study" ||
                                          cartItem.studyType ===
                                            "microbiology-virology"
                                        ) {
                                          const microorganismCount =
                                            Array.isArray(
                                              cartItem.selectedMicroorganism
                                            )
                                              ? cartItem.selectedMicroorganism
                                                  .length
                                              : 1;
                                          const applicationCount =
                                            Array.isArray(
                                              cartItem.selectedApplications
                                            )
                                              ? cartItem.selectedApplications
                                                  .length
                                              : 1;
                                          totalPrice =
                                            price *
                                            microorganismCount *
                                            quantity *
                                            applicationCount;
                                          displayQuantity =
                                            quantity *
                                            microorganismCount *
                                            applicationCount; // Show total quantity calculation
                                        } else {
                                          totalPrice = price * quantity;
                                        }

                                        const isFirstGuideline =
                                          guidelineIndex === 0;

                                        if (isFirstGuideline) {
                                          // First row with rowspan for S.NO and Product Description
                                          allRows.push(
                                            <TableRow
                                              key={`${cartIndex}-${guidelineIndex}`}
                                              sx={{
                                                backgroundColor:
                                                  rowIndex % 2 === 0
                                                    ? "white"
                                                    : "#f9f9f9",
                                              }}
                                            >
                                              <TableCell
                                                rowSpan={guidelineCount}
                                                sx={{
                                                  fontSize: "10px",
                                                  padding: "8px",
                                                  border: "1px solid #ddd",
                                                  verticalAlign: "top",
                                                }}
                                              >
                                                {rowIndex + 1}
                                              </TableCell>
                                              <TableCell
                                                rowSpan={guidelineCount}
                                                sx={{
                                                  fontSize: "10px",
                                                  padding: "8px",
                                                  border: "1px solid #ddd",
                                                  verticalAlign: "top",
                                                }}
                                              >
                                                <Box>
                                                  <Typography
                                                    sx={{
                                                      fontSize: "9px",
                                                      mb: 1,
                                                      fontWeight: "bold",
                                                    }}
                                                  >
                                                    {formatCategoryDisplay(
                                                      cartItem.category,
                                                      cartItem.studyType
                                                    )}
                                                  </Typography>
                                                  <Typography
                                                    sx={{
                                                      fontSize: "9px",
                                                      mb: 0.2,
                                                    }}
                                                  >
                                                    <span
                                                      style={{
                                                        fontWeight: "bold",
                                                      }}
                                                    >
                                                      Sample Description:
                                                    </span>{" "}
                                                    <span
                                                      style={{
                                                        color:
                                                          theme.palette.primary
                                                            .main,
                                                      }}
                                                    >
                                                      {cartItem.sampleDescription ||
                                                        cartItem.description ||
                                                        "Description not available"}
                                                    </span>
                                                  </Typography>
                                                  <Typography
                                                    sx={{
                                                      fontSize: "9px",
                                                      mb: 0.2,
                                                    }}
                                                  >
                                                    •{" "}
                                                    <span
                                                      style={{
                                                        fontWeight: "bold",
                                                      }}
                                                    >
                                                      Product Type:
                                                    </span>{" "}
                                                    {cartItem.category}
                                                  </Typography>
                                                  <Typography
                                                    sx={{
                                                      fontSize: "9px",
                                                      mb: 0.2,
                                                    }}
                                                  >
                                                    •{" "}
                                                    <span
                                                      style={{
                                                        fontWeight: "bold",
                                                      }}
                                                    >
                                                      Sample Form:
                                                    </span>{" "}
                                                    {cartItem.sampleForm}
                                                  </Typography>
                                                  <Typography
                                                    sx={{
                                                      fontSize: "9px",
                                                      mb: 0.2,
                                                    }}
                                                  >
                                                    •{" "}
                                                    <span
                                                      style={{
                                                        fontWeight: "bold",
                                                      }}
                                                    >
                                                      Sample Solvent:
                                                    </span>{" "}
                                                    {cartItem.sampleSolvent}
                                                  </Typography>
                                                  {/* Handle different study types */}
                                                  {cartItem.studyType ===
                                                  "Toxicity Study" ? (
                                                    // For toxicity studies, show application
                                                    cartItem.application && (
                                                      <Typography
                                                        sx={{
                                                          fontSize: "9px",
                                                          mb: 0.2,
                                                        }}
                                                      >
                                                        •{" "}
                                                        <span
                                                          style={{
                                                            fontWeight: "bold",
                                                          }}
                                                        >
                                                          Application:
                                                        </span>{" "}
                                                        {cartItem.application}
                                                      </Typography>
                                                    )
                                                  ) : cartItem.studyType ===
                                                      "Microbiology & Virology Study" ||
                                                    cartItem.studyType ===
                                                      "microbiology-virology" ? (
                                                    <>
                                                      {(cartItem.microorganismType ||
                                                        cartItem.selectedMicroorganismType) && (
                                                        <Typography
                                                          sx={{
                                                            fontSize: "9px",
                                                            mb: 0.2,
                                                          }}
                                                        >
                                                          •{" "}
                                                          <span
                                                            style={{
                                                              fontWeight:
                                                                "bold",
                                                            }}
                                                          >
                                                            Type of
                                                            Micro-organism:
                                                          </span>{" "}
                                                          {cartItem.microorganismType ||
                                                            cartItem.selectedMicroorganismType}
                                                        </Typography>
                                                      )}
                                                      {(cartItem.microorganism ||
                                                        cartItem.selectedMicroorganism) && (
                                                        <Typography
                                                          sx={{
                                                            fontSize: "9px",
                                                            mb: 0.2,
                                                          }}
                                                        >
                                                          •{" "}
                                                          <span
                                                            style={{
                                                              fontWeight:
                                                                "bold",
                                                            }}
                                                          >
                                                            Micro-organism:
                                                          </span>{" "}
                                                          {Array.isArray(
                                                            cartItem.microorganism ||
                                                              cartItem.selectedMicroorganism
                                                          )
                                                            ? (
                                                                cartItem.microorganism ||
                                                                cartItem.selectedMicroorganism
                                                              ).join(", ")
                                                            : cartItem.microorganism ||
                                                              cartItem.selectedMicroorganism}
                                                        </Typography>
                                                      )}
                                                    </>
                                                  ) : (
                                                    cartItem.selectedTherapeuticAreas &&
                                                    cartItem
                                                      .selectedTherapeuticAreas
                                                      .length > 0 && (
                                                      <Typography
                                                        sx={{
                                                          fontSize: "9px",
                                                          mb: 0.2,
                                                        }}
                                                      >
                                                        •{" "}
                                                        <span
                                                          style={{
                                                            fontWeight: "bold",
                                                          }}
                                                        >
                                                          Therapeutic Areas:
                                                        </span>{" "}
                                                        {cartItem.selectedTherapeuticAreas.join(
                                                          ", "
                                                        )}
                                                      </Typography>
                                                    )
                                                  )}
                                                </Box>
                                              </TableCell>
                                              <TableCell
                                                sx={{
                                                  fontSize: "10px",
                                                  padding: "8px",
                                                  border: "1px solid #ddd",
                                                }}
                                              >
                                                {guideline}
                                              </TableCell>
                                              <TableCell
                                                sx={{
                                                  fontSize: "10px",
                                                  padding: "8px",
                                                  border: "1px solid #ddd",
                                                }}
                                              >
                                                {displayQuantity}
                                              </TableCell>
                                              <TableCell
                                                sx={{
                                                  fontSize: "10px",
                                                  padding: "8px",
                                                  border: "1px solid #ddd",
                                                  textAlign: "right",
                                                }}
                                              >
                                                ₹{price.toLocaleString("en-IN")}
                                              </TableCell>
                                              <TableCell
                                                sx={{
                                                  fontSize: "10px",
                                                  padding: "8px",
                                                  border: "1px solid #ddd",
                                                  textAlign: "right",
                                                }}
                                              >
                                                ₹
                                                {totalPrice.toLocaleString(
                                                  "en-IN"
                                                )}
                                              </TableCell>
                                            </TableRow>
                                          );
                                        } else {
                                          // Subsequent rows without S.NO and Product Description
                                          allRows.push(
                                            <TableRow
                                              key={`${cartIndex}-${guidelineIndex}`}
                                              sx={{
                                                backgroundColor:
                                                  rowIndex % 2 === 0
                                                    ? "white"
                                                    : "#f9f9f9",
                                              }}
                                            >
                                              <TableCell
                                                sx={{
                                                  fontSize: "10px",
                                                  padding: "8px",
                                                  border: "1px solid #ddd",
                                                }}
                                              >
                                                {guideline}
                                              </TableCell>
                                              <TableCell
                                                sx={{
                                                  fontSize: "10px",
                                                  padding: "8px",
                                                  border: "1px solid #ddd",
                                                }}
                                              >
                                                {displayQuantity}
                                              </TableCell>
                                              <TableCell
                                                sx={{
                                                  fontSize: "10px",
                                                  padding: "8px",
                                                  border: "1px solid #ddd",
                                                  textAlign: "right",
                                                }}
                                              >
                                                ₹{price.toLocaleString("en-IN")}
                                              </TableCell>
                                              <TableCell
                                                sx={{
                                                  fontSize: "10px",
                                                  padding: "8px",
                                                  border: "1px solid #ddd",
                                                  textAlign: "right",
                                                }}
                                              >
                                                ₹
                                                {totalPrice.toLocaleString(
                                                  "en-IN"
                                                )}
                                              </TableCell>
                                            </TableRow>
                                          );
                                        }
                                      }
                                    );
                                    rowIndex++;
                                  });

                                  return allRows;
                                })()
                              : // Handle single item (original logic)
                                (() => {
                                  const guidelineCount = (
                                    selectedGuidelines || []
                                  ).length;
                                  const allRows = [];

                                  (selectedGuidelines || []).forEach(
                                    (guideline, index) => {
                                      const guidelineData =
                                        getCorrectGuidelineData(
                                          "Invitro Study",
                                          category,
                                          guideline
                                        );
                                      const price = guidelineData?.price || 0;
                                      const quantity = numSamples || 1;
                                      const totalPrice = price * quantity;

                                      const isFirstGuideline = index === 0;

                                      if (isFirstGuideline) {
                                        // First row with rowspan for S.NO and Product Description
                                        allRows.push(
                                          <TableRow
                                            key={index}
                                            sx={{
                                              backgroundColor:
                                                index % 2 === 0
                                                  ? "white"
                                                  : "#f9f9f9",
                                            }}
                                          >
                                            <TableCell
                                              rowSpan={guidelineCount}
                                              sx={{
                                                fontSize: "10px",
                                                padding: "8px",
                                                border: "1px solid #ddd",
                                                verticalAlign: "top",
                                              }}
                                            >
                                              {index + 1}
                                            </TableCell>
                                            <TableCell
                                              rowSpan={guidelineCount}
                                              sx={{
                                                fontSize: "10px",
                                                padding: "8px",
                                                border: "1px solid #ddd",
                                                verticalAlign: "top",
                                              }}
                                            >
                                              <Box>
                                                <Typography
                                                  sx={{
                                                    fontSize: "9px",
                                                    mb: 1,
                                                    fontWeight: "bold",
                                                  }}
                                                >
                                                  {formatCategoryDisplay(
                                                    category,
                                                    "Invitro Study"
                                                  )}
                                                </Typography>
                                                <Typography
                                                  sx={{
                                                    fontSize: "9px",
                                                    mb: 0.2,
                                                  }}
                                                >
                                                  <span
                                                    style={{
                                                      fontWeight: "bold",
                                                    }}
                                                  >
                                                    Sample Description:
                                                  </span>{" "}
                                                  <span
                                                    style={{
                                                      color:
                                                        theme.palette.primary
                                                          .main,
                                                    }}
                                                  >
                                                    Description not available
                                                  </span>
                                                </Typography>
                                                <Typography
                                                  sx={{
                                                    fontSize: "9px",
                                                    mb: 0.2,
                                                  }}
                                                >
                                                  •{" "}
                                                  <span
                                                    style={{
                                                      fontWeight: "bold",
                                                    }}
                                                  >
                                                    Product Type:
                                                  </span>{" "}
                                                  {category}
                                                </Typography>
                                                <Typography
                                                  sx={{
                                                    fontSize: "9px",
                                                    mb: 0.2,
                                                  }}
                                                >
                                                  •{" "}
                                                  <span
                                                    style={{
                                                      fontWeight: "bold",
                                                    }}
                                                  >
                                                    Sample Form:
                                                  </span>{" "}
                                                  {sampleForm === "Others"
                                                    ? customSampleForm
                                                    : sampleForm}
                                                </Typography>
                                                <Typography
                                                  sx={{
                                                    fontSize: "9px",
                                                    mb: 0.2,
                                                  }}
                                                >
                                                  •{" "}
                                                  <span
                                                    style={{
                                                      fontWeight: "bold",
                                                    }}
                                                  >
                                                    Sample Solvent:
                                                  </span>{" "}
                                                  {sampleSolvent === "Others"
                                                    ? customSampleSolvent
                                                    : sampleSolvent}
                                                </Typography>
                                                {selectedTherapeuticAreas.length >
                                                  0 && (
                                                  <Typography
                                                    sx={{
                                                      fontSize: "9px",
                                                      mb: 0.2,
                                                    }}
                                                  >
                                                    •{" "}
                                                    <span
                                                      style={{
                                                        fontWeight: "bold",
                                                      }}
                                                    >
                                                      Therapeutic Areas:
                                                    </span>{" "}
                                                    {selectedTherapeuticAreas.join(
                                                      ", "
                                                    )}
                                                  </Typography>
                                                )}
                                              </Box>
                                            </TableCell>
                                            <TableCell
                                              sx={{
                                                fontSize: "10px",
                                                padding: "8px",
                                                border: "1px solid #ddd",
                                              }}
                                            >
                                              {guideline}
                                            </TableCell>
                                            <TableCell
                                              sx={{
                                                fontSize: "10px",
                                                padding: "8px",
                                                border: "1px solid #ddd",
                                              }}
                                            >
                                              {quantity}
                                            </TableCell>
                                            <TableCell
                                              sx={{
                                                fontSize: "10px",
                                                padding: "8px",
                                                border: "1px solid #ddd",
                                                textAlign: "right",
                                              }}
                                            >
                                              ₹{price.toLocaleString("en-IN")}
                                            </TableCell>
                                            <TableCell
                                              sx={{
                                                fontSize: "10px",
                                                padding: "8px",
                                                border: "1px solid #ddd",
                                                textAlign: "right",
                                              }}
                                            >
                                              ₹
                                              {totalPrice.toLocaleString(
                                                "en-IN"
                                              )}
                                            </TableCell>
                                          </TableRow>
                                        );
                                      } else {
                                        // Subsequent rows without S.NO and Product Description
                                        allRows.push(
                                          <TableRow
                                            key={index}
                                            sx={{
                                              backgroundColor:
                                                index % 2 === 0
                                                  ? "white"
                                                  : "#f9f9f9",
                                            }}
                                          >
                                            <TableCell
                                              sx={{
                                                fontSize: "10px",
                                                padding: "8px",
                                                border: "1px solid #ddd",
                                              }}
                                            >
                                              {guideline}
                                            </TableCell>
                                            <TableCell
                                              sx={{
                                                fontSize: "10px",
                                                padding: "8px",
                                                border: "1px solid #ddd",
                                              }}
                                            >
                                              {quantity}
                                            </TableCell>
                                            <TableCell
                                              sx={{
                                                fontSize: "10px",
                                                padding: "8px",
                                                border: "1px solid #ddd",
                                                textAlign: "right",
                                              }}
                                            >
                                              ₹{price.toLocaleString("en-IN")}
                                            </TableCell>
                                            <TableCell
                                              sx={{
                                                fontSize: "10px",
                                                padding: "8px",
                                                border: "1px solid #ddd",
                                                textAlign: "right",
                                              }}
                                            >
                                              ₹
                                              {totalPrice.toLocaleString(
                                                "en-IN"
                                              )}
                                            </TableCell>
                                          </TableRow>
                                        );
                                      }
                                    }
                                  );

                                  return allRows;
                                })()}
                          </TableBody>
                        </Table>
                      </TableContainer>

                      {/* Summary Section */}
                      {/* Summary of Charges */}
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "flex-end",
                          mb: 3,
                        }}
                      >
                        <Box sx={{ textAlign: "right" }}>
                          <Typography
                            sx={{
                              fontSize: "12px",
                              fontWeight: "bold",
                              color: "#333",
                              mb: 1,
                            }}
                          >
                            Summary of Charges:
                          </Typography>
                          <Typography
                            sx={{ fontSize: "10px", color: "#333", mb: 0.5 }}
                          >
                            Sub total (excl. Tax): ₹
                            {totalAmount.toLocaleString("en-IN")}
                          </Typography>
                          <Typography
                            sx={{ fontSize: "10px", color: "#333", mb: 0.5 }}
                          >
                            GST: 18% ₹{gst.toLocaleString("en-IN")}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "10px",
                              fontWeight: "bold",
                              color: "#333",
                            }}
                          >
                            Grand Total: ₹{grandTotal.toLocaleString("en-IN")}
                          </Typography>
                        </Box>
                      </Box>

                      {/* Terms and Conditions */}
                      <Box sx={{ mb: 4 }}>
                        <Typography
                          sx={{
                            fontSize: "12px",
                            fontWeight: "bold",
                            color: "#333",
                            mb: 1,
                          }}
                        >
                          Terms and Conditions:
                        </Typography>
                        <Typography
                          sx={{ fontSize: "10px", color: "#333", mb: 0.5 }}
                        >
                          1) This quotation is valid for 30 days from the date
                          of issue unless otherwise stated.
                        </Typography>
                        <Typography
                          sx={{ fontSize: "10px", color: "#333", mb: 0.5 }}
                        >
                          2) Samples will be stored only for 30 days after the
                          report delivery.
                        </Typography>
                        <Typography
                          sx={{ fontSize: "10px", color: "#333", mb: 0.5 }}
                        >
                          3) The scope of this project includes only testing
                          mentioned above and during analysis, if additional
                          services are needed, then those will be charged extra
                        </Typography>
                        <Typography sx={{ fontSize: "10px", color: "#333" }}>
                          4) The identity and composition of the test item is
                          the responsibility of the sponsor. No analysis will be
                          performed at Radiant Research Services Pvt Ltd to
                          confirm it.
                        </Typography>
                      </Box>

                      {/* Footer */}
                      <Box
                        sx={{
                          textAlign: "center",
                          borderTop: "1px solid #ddd",
                          pt: 2,
                        }}
                      >
                        <Typography
                          sx={{ fontSize: "10px", color: "#333", mb: 0.5 }}
                        >
                          Please use {quotationNumber} as a further reference
                          number
                        </Typography>
                        <Typography sx={{ fontSize: "10px", color: "#333" }}>
                          For any questions please contact us at
                          info@radiantresearch.in
                        </Typography>
                      </Box>
                    </Box>
                  )}
                </Box>
              </Paper>
            </Box>
          )}
        </Box>

        {/* Action Buttons - Fixed at Bottom */}
        <Box
          sx={{
            p: { xs: 2, md: 3 },
            borderTop: "1px solid rgba(25, 118, 210, 0.1)",
            backgroundColor: "transparent",
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: { xs: 2, sm: 2 },
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          {/* All buttons right-aligned */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: { xs: 1, sm: 2 },
              width: { xs: "100%", sm: "auto" },
              justifyContent: "flex-end",
            }}
          >
            <Button
              variant="outlined"
              size="small"
              onClick={handleContactUs}
              sx={{
                borderColor: theme.palette.primary.main,
                color: theme.palette.primary.main,
                backgroundColor: "transparent",
                fontWeight: 600,
                py: { xs: 0.75, md: 1 },
                px: { xs: 2, md: 3 },
                fontSize: { xs: "0.8rem", md: "0.9rem" },
                borderRadius: "8px",
                minWidth: { xs: "auto", sm: "120px" },
                flex: { xs: 1, sm: "none" },
                "&:hover": {
                  borderColor: theme.palette.primary.dark,
                  backgroundColor: "rgba(25, 118, 210, 0.04)",
                },
              }}
            >
              Contact Us
            </Button>
            {/* Download PDF Button - Commented out */}
            {/* <Button
              variant="outlined"
              size="small"
              onClick={handleDownloadPDF}
              disabled={isDownloading}
              sx={{
                borderColor: theme.palette.primary.main,
                color: theme.palette.primary.main,
                backgroundColor: "transparent",
                fontWeight: 600,
                py: { xs: 0.75, md: 1 },
                px: { xs: 2, md: 3 },
                fontSize: { xs: "0.8rem", md: "0.9rem" },
                borderRadius: "8px",
                minWidth: { xs: "auto", sm: "120px" },
                flex: { xs: 1, sm: "none" },
                "&:hover": {
                  borderColor: theme.palette.primary.dark,
                  backgroundColor: "rgba(25, 118, 210, 0.04)",
                },
              }}
            >
              {isDownloading ? "Downloading..." : "Download"}
            </Button> */}
            <Button
              variant="outlined"
              size="small"
              onClick={handleMainAction}
              disabled={user?.id ? isSaving || isSaved : false}
              sx={{
                py: { xs: 0.75, md: 1 },
                px: { xs: 2, md: 3 },
                borderColor: theme.palette.primary.main,
                color: theme.palette.primary.main,
                borderRadius: "8px",
                fontSize: { xs: "0.8rem", md: "0.9rem" },
                minWidth: { xs: "auto", sm: "140px" },
                flex: { xs: 1, sm: "none" },
                "&:hover": {
                  borderColor: theme.palette.primary.dark,
                  backgroundColor: "rgba(25, 118, 210, 0.04)",
                },
                "&:disabled": {
                  borderColor: "rgba(25, 118, 210, 0.3)",
                  color: "rgba(25, 118, 210, 0.7)",
                  backgroundColor: "transparent",
                },
              }}
            >
              {!user?.id
                ? getButtonText()
                : isSaving
                  ? "Saving..."
                  : isSaved
                    ? "Saved"
                    : getButtonText()}
            </Button>
            <Button
              variant="contained"
              size="small"
              onClick={handleEmailMe}
              disabled={isEmailSending || isEmailSent}
              endIcon={<DraftsOutlined sx={{ fontSize: "1.1rem" }} />}
              sx={{
                py: { xs: 0.75, md: 1 },
                px: { xs: 2, md: 3 },
                background:
                  "linear-gradient(105.34deg, #115293 0%, #1976D2 50%, #115293 100%)",
                color: "white",
                textTransform: "none",
                borderRadius: "8px",
                fontSize: { xs: "0.8rem", md: "0.9rem" },
                minWidth: { xs: "auto", sm: "140px" },
                width: { xs: "100%", sm: "auto" },
                "&:hover": {
                  background:
                    "linear-gradient(105.34deg, #0d3d6b 0%, #1565c0 50%, #0d3d6b 100%)",
                },
                "&:disabled": {
                  background: "rgba(25, 118, 210, 0.3)",
                  color: "rgba(255, 255, 255, 0.7)",
                },
              }}
            >
              {isEmailSending
                ? "Sending..."
                : isEmailSent
                  ? "Email Sent"
                  : "Email Me"}
            </Button>
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
          zIndex: "99998 !important",
          animation: "fadeIn 0.3s ease-out",
        }}
      />

      {/* Account Popup for Login/Signup */}
      {accountPopupOpen &&
        createPortal(
          <AccountPopup
            open={accountPopupOpen}
            onClose={handleAccountPopupClose}
            customZIndex={9999999}
          />,
          document.body
        )}

      {/* Request Success Modal */}
      <RequestSuccessModal
        open={requestSuccessOpen}
        onClose={() => setRequestSuccessOpen(false)}
        onNavigateToQuotations={handleMyQuotationsClick}
      />
    </>
  );

  return createPortal(modalContent, document.body);
}
