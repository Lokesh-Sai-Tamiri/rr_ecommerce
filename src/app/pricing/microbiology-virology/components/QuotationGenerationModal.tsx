import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../../../../store/slices/snackbar";
import { useScrollLock } from "../../../../hooks/useScrollLock";
import { useUser } from "@clerk/nextjs";
import { storeCartItems } from "../../../../utils/cartStorage";
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
import EmailIcon from "@mui/icons-material/Email";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import { SaveOutlined } from "@mui/icons-material";
import { getStudyData } from "../data/guidelineData";
import { AccountPopup } from "../../../../components/AccountPopup";
import {
  QUOTATION_CONFIG,
  getQuotationMode,
  getVisibleSteps,
  getButtonText,
} from "../../../../constants/quotationConfig";
import RequestSuccessModal from "../../../../components/common/RequestSuccessModal";

interface QuotationGenerationModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: string;
  sampleForm: string;
  sampleSolvent: string;
  selectedMicroorganismType: string;
  selectedMicroorganism: string[];
  numSamples: number;
  selectedStudies: string[];
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerCompany: string;
  customSampleForm: string;
  customSampleSolvent: string;
  customMicroorganism: string;
  cartItems?: any[];
  isCheckoutMode?: boolean;
}

export default function QuotationGenerationModal({
  isOpen,
  onClose,
  category,
  sampleForm,
  sampleSolvent,
  selectedMicroorganismType,
  selectedMicroorganism,
  numSamples,
  selectedStudies,
  customerName,
  customerEmail,
  customerPhone,
  customerCompany,
  customSampleForm,
  customSampleSolvent,
  customMicroorganism,
  cartItems = [],
  isCheckoutMode = false,
}: QuotationGenerationModalProps) {
  console.log("🔥 MICROBIOLOGY QuotationGenerationModal - Props received:", {
    isOpen,
    cartItems,
    isCheckoutMode,
    category,
    sampleForm,
    sampleSolvent,
  });

  const theme = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useUser();

  // Lock body scroll when modal is open
  useScrollLock(isOpen);
  const [mounted, setMounted] = useState(false);

  // Initialize quotation number as empty, will be set in useEffect
  const [quotationNumber, setQuotationNumber] = useState<string>("");

  // Set quotation number when cartItems are available or modal opens
  useEffect(() => {
    if (isOpen && quotationNumber === "") {
      console.log(
        "🔥 MICROBIOLOGY QuotationGenerationModal - Setting quotation number in useEffect..."
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
            "🔥 MICROBIOLOGY Using existing configNo from cartItems (cleaned):",
            existingConfigNo
          );
          setQuotationNumber(existingConfigNo);
          return;
        }
      }

      const newQuotationNumber = `RR${String(Math.floor(Math.random() * 1000000)).padStart(6, "0")}`;
      console.log(
        "🔥 MICROBIOLOGY Generated new quotation number:",
        newQuotationNumber
      );
      setQuotationNumber(newQuotationNumber);
    }
  }, [isOpen, cartItems, quotationNumber]);
  const [isEmailOpened, setIsEmailOpened] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [accountPopupOpen, setAccountPopupOpen] = useState(false);
  const [requestSuccessOpen, setRequestSuccessOpen] = useState(false);

  // Get quotation mode from config
  const quotationMode = getQuotationMode();
  const visibleSteps = getVisibleSteps();
  const buttonText = getButtonText();

  // FORCE 2 STEPS - Hardcoded override for testing
  const FORCE_TWO_STEPS = true;
  const hardcodedSteps = [
    { id: 1, title: "Order Summary", completed: true },
    { id: 2, title: "Customer Details", completed: true },
  ];

  const actualSteps = FORCE_TWO_STEPS ? hardcodedSteps : visibleSteps;

  // Debug logging
  console.log("🔧 MICROBIOLOGY CONFIG DEBUG:", {
    GENERATE_QUOTATION_MODAL: QUOTATION_CONFIG.GENERATE_QUOTATION_MODAL,
    quotationMode,
    visibleStepsCount: visibleSteps.length,
    actualStepsCount: actualSteps.length,
    visibleSteps: visibleSteps.map((s) => s.title),
    actualSteps: actualSteps.map((s) => s.title),
    buttonText,
  });

  // Date formatting helper
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const today = new Date();
  const expiryDate = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days from today

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isOpen || !mounted) return null;

  const getDisplaySampleForm = () => {
    if (sampleForm === "Others" && customSampleForm) {
      return `${sampleForm} (${customSampleForm})`;
    }
    return sampleForm;
  };

  const getDisplaySampleSolvent = () => {
    if (sampleSolvent === "Others" && customSampleSolvent) {
      return `${sampleSolvent} (${customSampleSolvent})`;
    }
    return sampleSolvent;
  };

  const getDisplayMicroorganism = () => {
    if (Array.isArray(selectedMicroorganism)) {
      let microorganismList = [...selectedMicroorganism];

      // If "Any other" is selected and has custom text, replace it with the custom text
      if (microorganismList.includes("Any other") && customMicroorganism) {
        microorganismList = microorganismList.map((m) =>
          m === "Any other" ? customMicroorganism : m
        );
      }

      const count = microorganismList.length;
      const displayList = microorganismList.join(", ");
      return `${displayList} (${count} microorganism${count !== 1 ? "s" : ""})`;
    }
    return selectedMicroorganism || "";
  };

  const calculateTotalPrice = () => {
    let total = 0;
    if (selectedStudies && Array.isArray(selectedStudies)) {
      selectedStudies.forEach((studyName) => {
        const studyData = getStudyData(category, studyName);
        if (studyData) {
          // For microbiology studies, multiply by number of microorganisms
          const microorganismCount = Array.isArray(selectedMicroorganism)
            ? selectedMicroorganism.length
            : 1;
          total += studyData.price * microorganismCount * numSamples;
        }
      });
    }
    return total;
  };

  const calculateTotalDuration = () => {
    if (selectedStudies.length === 0) return 0;
    const durations = selectedStudies.map((studyName) => {
      const studyData = getStudyData(category, studyName);
      return studyData ? studyData.duration : 0;
    });
    return Math.max(...durations);
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    // Set font
    doc.setFont("helvetica");

    // Header Section - Company Logo and Details
    // Create logo placeholder (blue gradient rectangle with text)
    doc.setFillColor(25, 118, 210);
    doc.rect(20, 20, 80, 50, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("RADIANT", 25, 35);
    doc.text("RESEARCH PVT. LTD.", 25, 45);

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

    // Quotation details - Right side
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(`Quotation #${quotationNumber}`, 140, 35);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Created Date: ${formatDate(today)}`, 140, 45);
    doc.text(`Expiry Date: ${formatDate(expiryDate)}`, 140, 52);

    // Customer details
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("From:", 140, 65);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(customerName || "John Show", 140, 75);
    doc.text(customerCompany || "Info tech Solutions", 140, 82);
    doc.text(customerEmail || "John@email.com", 140, 89);
    doc.text(customerPhone || "+91 80505 16699", 140, 96);

    // Start table position
    let yPosition = 120;

    // Table header with background
    doc.setFillColor(245, 245, 245);
    doc.rect(20, yPosition - 14, 180, 14, "F");
    doc.setTextColor(51, 51, 51);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("S.No", 25, yPosition - 4);
    doc.text("Product Description", 45, yPosition - 4);
    doc.text("Study Name", 115, yPosition - 4);
    doc.text("Duration", 135, yPosition - 4);
    doc.text("Qty", 150, yPosition - 4);

    // Unit Price column with smaller font
    doc.setFontSize(8);
    doc.text("Unit", 160, yPosition - 12);
    doc.text("Price", 160, yPosition - 4);

    // Total Price column with smaller font
    doc.text("Total", 180, yPosition - 12);
    doc.text("Price", 180, yPosition - 4);

    // Reset font size for content
    doc.setFontSize(10);

    // Table content with proper borders
    selectedStudies.forEach((studyName, index) => {
      const studyData = getStudyData(category, studyName);
      const price = studyData?.price || 0;
      const duration = studyData?.duration || 0;
      // For microbiology studies, multiply by number of microorganisms
      const microorganismCount = Array.isArray(selectedMicroorganism)
        ? selectedMicroorganism.length
        : 1;
      const totalPrice = price * microorganismCount * numSamples;

      const isFirstStudy = index === 0;
      const sampleDetailsBullets = `• Sample Form: ${getDisplaySampleForm()}\n• Sample Solvent: ${getDisplaySampleSolvent()}\n• Type of Micro-organism: ${selectedMicroorganismType}\n• Micro-organism: ${getDisplayMicroorganism()}`;
      const fullDescription = `Microbiology & Virology Study\n\n• Sample Description: Description not available\n• Product Type: ${category}\n${sampleDetailsBullets}`;
      const lines = doc.splitTextToSize(fullDescription, 70);
      const rowHeight = isFirstStudy ? Math.max(lines.length * 4, 12) : 12;

      // Alternate row colors
      if (index % 2 === 0) {
        doc.setFillColor(255, 255, 255);
      } else {
        doc.setFillColor(249, 249, 249);
      }
      doc.rect(20, yPosition, 180, rowHeight, "F");

      // Border for each cell
      doc.setDrawColor(221, 221, 221);
      doc.rect(20, yPosition, 180, rowHeight, "S");

      // Vertical borders for columns
      doc.line(40, yPosition, 40, yPosition + rowHeight); // S.NO border
      doc.line(110, yPosition, 110, yPosition + rowHeight); // Product Description border
      doc.line(130, yPosition, 130, yPosition + rowHeight); // Study Name border
      doc.line(145, yPosition, 145, yPosition + rowHeight); // Duration border
      doc.line(155, yPosition, 155, yPosition + rowHeight); // Quantity border
      doc.line(175, yPosition, 175, yPosition + rowHeight); // Unit Price border

      doc.setTextColor(51, 51, 51);
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");

      // S.NO
      doc.text(String(index + 1), 25, yPosition + 8);

      // Product Description - only show in first row
      if (isFirstStudy) {
        doc.text(lines, 45, yPosition + 8);
      }

      // Study Name
      doc.text(studyName, 115, yPosition + 8);

      // Duration
      doc.text(String(duration), 135, yPosition + 8);

      // Quantity (number of microorganisms)
      doc.text(String(microorganismCount), 150, yPosition + 8);

      // Unit Price
      doc.text(`₹${price.toLocaleString("en-IN")}`, 160, yPosition + 8);

      // Total Price
      doc.text(`₹${totalPrice.toLocaleString("en-IN")}`, 180, yPosition + 8);

      yPosition += rowHeight;
    });

    // Summary Section
    yPosition += 20;

    // Summary of Charges (right side)
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("Summary of Charges:", 140, yPosition);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(
      `Sub total (excl. Tax): ₹${calculateTotalPrice().toLocaleString("en-IN")}`,
      140,
      yPosition + 8
    );
    doc.text(
      `GST (18%): ₹${(calculateTotalPrice() * 0.18).toLocaleString("en-IN")}`,
      140,
      yPosition + 14
    );
    doc.text(
      `Grand Total: ₹${(calculateTotalPrice() * 1.18).toLocaleString("en-IN")}`,
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
      "• This quotation is valid for 30 days from the date of issue unless otherwise stated.",
      20,
      yPosition
    );

    yPosition += 6;
    doc.text(
      "• Prices are subject to change if the quotation has expired or if project scope is revised.",
      20,
      yPosition
    );

    doc.save(`Quotation-${quotationNumber}.pdf`);
  };

  const handleContactUs = () => {
    router.push("/contact-us");
  };

  const handleSaveQuotation = async () => {
    if (!user?.id) {
      dispatch(
        openSnackbar({
          open: true,
          message: "Please log in to save quotation",
          variant: "default",
          severity: "error",
          close: true,
        })
      );
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
      const cartItemsToStore = [
        {
          id: `quotation-${Date.now()}`,
          studyType: "Microbiology & Virology Study",
          category: category,
          sampleForm: sampleForm,
          sampleSolvent: sampleSolvent,
          application: "Microbiology & Virology Study",
          numSamples: numSamples,
          selectedGuidelines: selectedStudies,
          sampleFormGuidelines: [],
          sampleSolventGuidelines: [],
          applicationGuidelines: [],
          selectedTherapeuticAreas: [],
          selectedMicroorganismType: selectedMicroorganismType,
          selectedMicroorganism: selectedMicroorganism,
          selectedStudies: selectedStudies,
          price: 0, // Will be calculated by the API
          customerName: customerName,
          customerEmail: customerEmail,
          customerPhone: customerPhone,
          customerCompany: customerCompany,
          customSampleForm: customSampleForm,
          customSampleSolvent: customSampleSolvent,
          customMicroorganism: customMicroorganism,
          configNo: quotationNumber,
          createdAt: new Date().toISOString(),
          quotationNumber: quotationNumber,
        },
      ];

      console.log("💾 Storing quotation data...", cartItemsToStore);
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

  const handleEmailMe = () => {
    const subject = "Microbiology & Virology Study Quotation";
    const body = `
Dear ${customerName},

Thank you for your interest in our Microbiology & Virology Study services.

Study Details:
- Category: ${category}
- Sample Form: ${getDisplaySampleForm()}
- Sample Solvent: ${getDisplaySampleSolvent()}
- Type of Micro-organism: ${selectedMicroorganismType}
- Micro-organism: ${getDisplayMicroorganism()}
- Number of Samples: ${numSamples}

Selected Studies:
${selectedStudies.map((study, index) => `${index + 1}. ${study}`).join("\n")}

Total Duration: ${calculateTotalDuration()} days
Total Price: ₹${calculateTotalPrice()}

Please find the detailed quotation attached.

Best regards,
RR Ecommerce Team
    `;

    const mailtoLink = `mailto:${customerEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink);

    // Set state to indicate email client was opened
    setIsEmailOpened(true);
  };

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
              <span style={{ fontSize: "0.8rem", color: "red" }}>
                ({actualSteps.length} steps)
              </span>
            </Typography>
          </Box>
          <IconButton onClick={onClose} sx={{ p: 1 }}>
            <Typography variant="h4" sx={{ color: "#666", fontSize: "1.3rem" }}>
              ×
            </Typography>
          </IconButton>
        </Box>

        {/* Progress Steps */}
        <Box sx={{ p: { xs: 2, md: 3 }, pb: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 3, gap: 1.5 }}>
            {actualSteps.map((step, index) => (
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
                {index < actualSteps.length - 1 && (
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

        {/* Content */}
        <Box sx={{ p: { xs: 2, md: 3 }, pt: 0 }}>
          {/* Customer Details */}
          <Paper
            sx={{
              p: 3,
              mb: 3,
              backgroundColor: `${theme.palette.text.primary}15 !important`,
              borderRadius: "16px",
              boxShadow: theme.shadows[4],
            }}
          >
            <Typography
              variant="h4"
              sx={{
                color: theme.palette.primary.main,
                fontWeight: 600,
                fontSize: { xs: "1.1rem", sm: "1.2rem", md: "1.3rem" },
                mb: 2,
              }}
            >
              Customer Information
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Typography
                variant="body2"
                sx={{ color: theme.palette.primary.main }}
              >
                <strong>Name:</strong> {customerName}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: theme.palette.primary.main }}
              >
                <strong>Email:</strong> {customerEmail}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: theme.palette.primary.main }}
              >
                <strong>Phone:</strong> {customerPhone}
              </Typography>
              {customerCompany && (
                <Typography
                  variant="body2"
                  sx={{ color: theme.palette.primary.main }}
                >
                  <strong>Company:</strong> {customerCompany}
                </Typography>
              )}
            </Box>
          </Paper>

          {/* Study Details */}
          <Paper
            sx={{
              p: 3,
              mb: 3,
              backgroundColor: `${theme.palette.text.primary}15 !important`,
              borderRadius: "16px",
              boxShadow: theme.shadows[4],
            }}
          >
            <Typography
              variant="h4"
              sx={{
                color: theme.palette.primary.main,
                fontWeight: 600,
                fontSize: { xs: "1.1rem", sm: "1.2rem", md: "1.3rem" },
                mb: 2,
              }}
            >
              Study Details
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Typography
                variant="body2"
                sx={{ color: theme.palette.primary.main }}
              >
                <strong>Category:</strong> {category}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: theme.palette.primary.main }}
              >
                <strong>Sample Form:</strong> {getDisplaySampleForm()}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: theme.palette.primary.main }}
              >
                <strong>Sample Solvent:</strong> {getDisplaySampleSolvent()}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: theme.palette.primary.main }}
              >
                <strong>Type of Micro-organism:</strong>{" "}
                {selectedMicroorganismType}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: theme.palette.primary.main }}
              >
                <strong>Micro-organism:</strong> {getDisplayMicroorganism()}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: theme.palette.primary.main }}
              >
                <strong>Number of Samples:</strong> {numSamples}
              </Typography>
            </Box>
          </Paper>

          {/* Studies Table */}
          <Paper
            sx={{
              p: 3,
              mb: 3,
              backgroundColor: `${theme.palette.text.primary}15 !important`,
              borderRadius: "16px",
              boxShadow: theme.shadows[4],
            }}
          >
            <Typography
              variant="h4"
              sx={{
                color: theme.palette.primary.main,
                fontWeight: 600,
                fontSize: { xs: "1.1rem", sm: "1.2rem", md: "1.3rem" },
                mb: 2,
              }}
            >
              Selected Studies
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        color: theme.palette.primary.main,
                      }}
                    >
                      Study Name
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        color: theme.palette.primary.main,
                      }}
                    >
                      Duration (days)
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        color: theme.palette.primary.main,
                      }}
                    >
                      Qty
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        color: theme.palette.primary.main,
                      }}
                    >
                      Unit Price
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        color: theme.palette.primary.main,
                      }}
                    >
                      Total Price
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* Study Rows with Product Description */}
                  {selectedStudies.map((studyName, index) => {
                    const studyData = getStudyData(category, studyName);
                    const isFirstStudy = index === 0;
                    return (
                      <TableRow
                        key={index}
                        sx={{
                          backgroundColor:
                            index % 2 === 0 ? "white" : "#f9f9f9",
                        }}
                      >
                        <TableCell
                          sx={{
                            fontSize: "10px",
                            padding: "8px",
                            border: "1px solid #ddd",
                          }}
                        >
                          {isFirstStudy ? (
                            <Box>
                              <Typography
                                sx={{
                                  fontSize: "9px",
                                  mb: 1,
                                  fontWeight: "bold",
                                }}
                              >
                                Microbiology & Virology Study
                              </Typography>
                              <Typography sx={{ fontSize: "9px", mb: 0.2 }}>
                                <span style={{ fontWeight: "bold" }}>
                                  Sample Description:
                                </span>{" "}
                                <span
                                  style={{ color: theme.palette.primary.main }}
                                >
                                  Description not available
                                </span>
                              </Typography>
                              <Typography sx={{ fontSize: "9px", mb: 0.2 }}>
                                •{" "}
                                <span style={{ fontWeight: "bold" }}>
                                  Product Type:
                                </span>{" "}
                                {category}
                              </Typography>
                              <Typography sx={{ fontSize: "9px", mb: 0.2 }}>
                                •{" "}
                                <span style={{ fontWeight: "bold" }}>
                                  Sample Form:
                                </span>{" "}
                                {getDisplaySampleForm()}
                              </Typography>
                              <Typography sx={{ fontSize: "9px", mb: 0.2 }}>
                                •{" "}
                                <span style={{ fontWeight: "bold" }}>
                                  Sample Solvent:
                                </span>{" "}
                                {getDisplaySampleSolvent()}
                              </Typography>
                              <Typography sx={{ fontSize: "9px", mb: 0.2 }}>
                                •{" "}
                                <span style={{ fontWeight: "bold" }}>
                                  Type of Micro-organism:
                                </span>{" "}
                                {selectedMicroorganismType}
                              </Typography>
                              <Typography sx={{ fontSize: "9px" }}>
                                •{" "}
                                <span style={{ fontWeight: "bold" }}>
                                  Micro-organism:
                                </span>{" "}
                                {getDisplayMicroorganism()}
                              </Typography>
                            </Box>
                          ) : null}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontSize: "10px",
                            padding: "8px",
                            border: "1px solid #ddd",
                            color: theme.palette.primary.main,
                          }}
                        >
                          {studyName}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontSize: "10px",
                            padding: "8px",
                            border: "1px solid #ddd",
                            color: theme.palette.primary.main,
                          }}
                        >
                          {studyData?.duration || 0}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontSize: "10px",
                            padding: "8px",
                            border: "1px solid #ddd",
                            color: theme.palette.primary.main,
                            textAlign: "center",
                          }}
                        >
                          {Array.isArray(selectedMicroorganism)
                            ? selectedMicroorganism.length
                            : 1}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontSize: "10px",
                            padding: "8px",
                            border: "1px solid #ddd",
                            color: theme.palette.primary.main,
                            textAlign: "right",
                          }}
                        >
                          ₹{studyData?.price || 0}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontSize: "10px",
                            padding: "8px",
                            border: "1px solid #ddd",
                            color: theme.palette.primary.main,
                            textAlign: "right",
                          }}
                        >
                          ₹
                          {(studyData?.price || 0) *
                            (Array.isArray(selectedMicroorganism)
                              ? selectedMicroorganism.length
                              : 1) *
                            numSamples}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  <TableRow sx={{ backgroundColor: "#f0f0f0" }}>
                    <TableCell
                      colSpan={4}
                      sx={{
                        fontWeight: 600,
                        color: theme.palette.primary.main,
                        textAlign: "right",
                      }}
                    >
                      Total Duration: {calculateTotalDuration()} days
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        color: theme.palette.primary.main,
                        textAlign: "right",
                      }}
                    >
                      ₹{calculateTotalPrice()}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>

        {/* Action Buttons */}
        <Box
          sx={{
            p: { xs: 2, md: 3 },
            pt: 0,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Button
            variant="outlined"
            size="medium"
            onClick={handleContactUs}
            sx={{
              py: 1,
              px: 3,
              borderColor: theme.palette.primary.main,
              color: theme.palette.primary.main,
              borderRadius: "8px",
              "&:hover": {
                borderColor: theme.palette.primary.dark,
                backgroundColor: "rgba(25, 118, 210, 0.04)",
              },
            }}
          >
            Contact Us
          </Button>

          {/* Email Me Button - Commented out */}
          {/* <Button
            variant="outlined"
            size="medium"
            startIcon={<EmailIcon sx={{ fontSize: '1rem' }} />}
            onClick={handleEmailMe}
            disabled={isEmailOpened}
            sx={{
              py: 1,
              px: 3,
              borderColor: theme.palette.primary.main,
              color: theme.palette.primary.main,
              borderRadius: '8px',
              '&:hover': {
                borderColor: theme.palette.primary.dark,
                backgroundColor: 'rgba(25, 118, 210, 0.04)'
              },
              '&:disabled': {
                borderColor: 'rgba(25, 118, 210, 0.3)',
                color: 'rgba(25, 118, 210, 0.7)',
                backgroundColor: 'transparent'
              }
            }}
          >
            {isEmailOpened ? 'Email Sent' : 'Email Me'}
          </Button> */}

          <Button
            variant="outlined"
            size="medium"
            onClick={
              user?.id
                ? handleSaveQuotation
                : () => {
                    setAccountPopupOpen(true);
                  }
            }
            disabled={user?.id ? isSaving || isSaved : false}
            sx={{
              py: 1,
              px: 3,
              borderColor: theme.palette.primary.main,
              color: theme.palette.primary.main,
              borderRadius: "8px",
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
              ? "Save Quotation"
              : isSaving
                ? "Saving..."
                : isSaved
                  ? "Saved"
                  : "Save Quotation"}
          </Button>

          <Button
            variant="contained"
            size="medium"
            onClick={handleDownloadPDF}
            sx={{
              py: 1,
              px: 3,
              background:
                "linear-gradient(105.34deg, #115293 0%, #1976D2 50%, #115293 100%)",
              color: "white",
              textTransform: "none",
              borderRadius: "8px",
              "&:hover": {
                background:
                  "linear-gradient(105.34deg, #0d3d6b 0%, #1565c0 50%, #0d3d6b 100%)",
              },
            }}
          >
            Download
          </Button>
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
          backdropFilter: "none",
          zIndex: 99998,
          animation: "fadeIn 0.3s ease-out",
          transition: "all 0.3s ease",
        }}
      />

      {/* Account Popup for Login/Signup */}
      {accountPopupOpen &&
        createPortal(
          <AccountPopup
            open={accountPopupOpen}
            onClose={() => setAccountPopupOpen(false)}
            customZIndex={9999999}
          />,
          document.body
        )}
    </>
  );

  return createPortal(modalContent, document.body);
}
