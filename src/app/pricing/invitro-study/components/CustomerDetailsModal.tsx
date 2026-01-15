import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { useScrollLock } from "../../../../hooks/useScrollLock";
import { useOTP } from "../../../../hooks/useOTP";
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useTheme } from "@mui/material/styles";
import OTPPopup from "../../../../components/AccountPopup/OTPPopup";
import { useCustomerModal } from "../../../../contexts/CustomerModalContext";
import { AccountPopup } from "../../../../components/AccountPopup";
import {
  QUOTATION_CONFIG,
  getQuotationMode,
  getVisibleSteps,
  getStep2ButtonText,
} from "../../../../constants/quotationConfig";
import RequestSuccessModal from "../../../../components/common/RequestSuccessModal";
import { useUser } from "@clerk/nextjs";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../../../../store/slices/snackbar";
import { storeCartItems } from "../../../../utils/cartStorage";
import { useCart } from "../../../../contexts/CartContext";

interface CustomerDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
  onGenerateQuotation: () => void;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerCompany: string;
  customerCountry: string;
  onCustomerNameChange: (value: string) => void;
  onCustomerEmailChange: (value: string) => void;
  onCustomerPhoneChange: (value: string) => void;
  onCustomerCompanyChange: (value: string) => void;
  onCustomerCountryChange: (value: string) => void;
}

// List of countries
const COUNTRIES = [
  "Afghanistan", "Albania", "Algeria", "Argentina", "Australia", "Austria", "Bangladesh",
  "Belgium", "Brazil", "Bulgaria", "Canada", "Chile", "China", "Colombia", "Croatia",
  "Czech Republic", "Denmark", "Egypt", "Finland", "France", "Germany", "Greece", "Hungary",
  "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Japan",
  "Kenya", "Malaysia", "Mexico", "Netherlands", "New Zealand", "Nigeria", "Norway",
  "Pakistan", "Philippines", "Poland", "Portugal", "Romania", "Russia", "Saudi Arabia",
  "Singapore", "South Africa", "South Korea", "Spain", "Sweden", "Switzerland", "Thailand",
  "Turkey", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Vietnam"
];

export default function CustomerDetailsModal({
  isOpen,
  onClose,
  onBack,
  onGenerateQuotation,
  customerName,
  customerEmail,
  customerPhone,
  customerCompany,
  customerCountry,
  onCustomerNameChange,
  onCustomerEmailChange,
  onCustomerPhoneChange,
  onCustomerCompanyChange,
  onCustomerCountryChange,
}: CustomerDetailsModalProps) {
  const theme = useTheme();
  const router = useRouter();
  const { setCustomerModalOpen } = useCustomerModal();
  const { user } = useUser();
  const dispatch = useDispatch();
  const { cartItems, clearCart } = useCart();

  // Get quotation mode from config
  const quotationMode = getQuotationMode();
  const visibleSteps = getVisibleSteps();
  const buttonText = getStep2ButtonText(); // Use step 2 specific button text

  // Force 2 steps if config is false
  const finalSteps = QUOTATION_CONFIG.GENERATE_QUOTATION_MODAL
    ? visibleSteps
    : [
        { id: 1, title: "Order Summary", completed: true },
        { id: 2, title: "Customer Details", completed: true },
      ];

  // Debug logging
  console.log("🔧 CUSTOMER DETAILS MODAL CONFIG DEBUG:", {
    GENERATE_QUOTATION_MODAL: QUOTATION_CONFIG.GENERATE_QUOTATION_MODAL,
    quotationMode,
    finalStepsCount: finalSteps.length,
    finalSteps: finalSteps.map((s) => s.title),
    buttonText,
  });

  const [mounted, setMounted] = useState(false);
  const [isSendingOTP, setIsSendingOTP] = useState(false);
  const [isSavingRequest, setIsSavingRequest] = useState(false);
  const [otpError, setOtpError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState({
    name: false,
    email: false,
    phone: false,
    company: false,
    country: false,
  });
  const [requestSuccessModalOpen, setRequestSuccessModalOpen] = useState(false);
  const [savedQuotationNumber, setSavedQuotationNumber] = useState<string>("");
  const [savedConfigNumber, setSavedConfigNumber] = useState<string>("");
  const [accountPopupOpen, setAccountPopupOpen] = useState(false);

  // OTP functionality
  const {
    otpCode,
    isOtpVerified,
    showOTPModal,
    otpMessage,
    otpMessageType,
    handleSendOTP,
    handleOTPVerify: originalHandleOTPVerify,
    handleOTPClose,
    handleEmailEdit,
  } = useOTP();

  const handleOTPVerify = async (otpInput: string) => {
    try {
      await originalHandleOTPVerify(otpInput);
      // OTP verified successfully - popup will close automatically
      // Customer details modal stays open
    } catch (error) {
      throw error;
    }
  };

  // Handle OTP sending with loading and error states
  const handleSendOTPWithLoading = async () => {
    setIsSendingOTP(true);
    setOtpError(null);

    try {
      await handleSendOTP(customerEmail, validateFields, customerName);
      // If successful, the OTP modal will be shown and email sent
    } catch (error) {
      setOtpError(
        error instanceof Error
          ? error.message
          : "Failed to send OTP. Please try again."
      );
      // Close OTP modal if there was an error
      if (showOTPModal) {
        handleOTPClose();
      }
    } finally {
      setIsSendingOTP(false);
    }
  };

  // Set mounted to true on client side
  useEffect(() => {
    setMounted(true);
  }, []);

  // Update context when modal opens/closes
  useEffect(() => {
    setCustomerModalOpen(isOpen);
  }, [isOpen, setCustomerModalOpen]);

  // Lock body scroll when modal is open
  useScrollLock(isOpen);

  // Email validation helper
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validation function
  const validateFields = () => {
    const errors = {
      name: !customerName.trim(),
      email: !customerEmail.trim() || !isValidEmail(customerEmail),
      phone: !customerPhone.trim(),
      company: false, // Company is not required
      country: !customerCountry.trim(), // Country is required
    };
    setValidationErrors(errors);
    return !Object.values(errors).some((error) => error);
  };

  // Handle generate quotation with validation
  const handleGenerateQuotation = () => {
    if (validateFields()) {
      onGenerateQuotation();
    }
  };

  // Handle request quotation (save cart items and show success modal)
  const handleRequestQuotation = async () => {
    if (!validateFields()) {
      return;
    }

    if (!user?.id) {
      setAccountPopupOpen(true);
      return;
    }

    // Set loading state
    setIsSavingRequest(true);

    try {
      console.log("🔧 Saving quotation request with customer details:", {
        customerName,
        customerEmail,
        customerPhone,
        customerCompany,
        customerCountry,
        quotationMode,
      });

      // Generate quotation number (similar to QuotationGenerationModal)
      const baseQuotationNumber = `RR${Date.now().toString().slice(-6)}`;

      // Save base numbers for success modal
      setSavedQuotationNumber(baseQuotationNumber);
      setSavedConfigNumber(baseQuotationNumber);

      // Use actual cart items if available, otherwise create basic structure
      const cartItemsToStore =
        cartItems.length > 0
          ? cartItems.map((item, index) => ({
              ...item,
              customerName: customerName,
              customerEmail: customerEmail,
              customerPhone: customerPhone,
              customerCompany: customerCompany,
              customerCountry: customerCountry,
              createdAt: new Date().toISOString(),
              quotationNumber:
                cartItems.length > 1
                  ? `${baseQuotationNumber}-${index + 1}`
                  : baseQuotationNumber, // Add suffix for multiple studies
              configNo:
                cartItems.length > 1
                  ? `${baseQuotationNumber}-${index + 1}`
                  : baseQuotationNumber, // Config number also gets suffix
            }))
          : [
              {
                id: `quotation-${Date.now()}`,
                studyType: "In-Vitro Studies",
                category: "In-Vitro Studies",
                sampleForm: "Customer Details Form",
                sampleSolvent: "",
                application: "Quotation Request",
                numSamples: 1,
                selectedGuidelines: [],
                sampleFormGuidelines: [],
                sampleSolventGuidelines: [],
                applicationGuidelines: [],
                selectedTherapeuticAreas: [],
                price: 0,
                customerName: customerName,
                customerEmail: customerEmail,
                customerPhone: customerPhone,
                customerCompany: customerCompany,
                customerCountry: customerCountry,
                customSampleForm: "",
                customSampleSolvent: "",
                createdAt: new Date().toISOString(),
                quotationNumber: baseQuotationNumber,
                configNo: baseQuotationNumber,
              },
            ];

      console.log("💾 Storing quotation request data...", cartItemsToStore);

      // Use exact same storage logic as QuotationGenerationModal
      const storeResult = await storeCartItems(
        cartItemsToStore,
        user.id,
        undefined,
        {
          customerName,
          customerEmail,
          customerPhone,
          customerCompany,
          customerCountry,
        }
      );
      console.log("✅ Quotation request saved successfully:", storeResult);

      if (storeResult.data.errorCount > 0) {
        console.warn("⚠️ Some items failed to store:", storeResult.data.errors);

        // Reset loading state
        setIsSavingRequest(false);

        dispatch(
          openSnackbar({
            open: true,
            message: "Request saved with some warnings",
            variant: "default",
            severity: "warning",
            close: true,
          })
        );
      } else {
        // Reset loading state
        setIsSavingRequest(false);

        // For success modal, always show base number only (no suffix)
        // The saved numbers are already set correctly above with baseQuotationNumber

        // Show success modal instead of snackbar
        setRequestSuccessModalOpen(true);
        // Don't close this modal immediately - let success modal handle it
      }
    } catch (error) {
      console.error("❌ Error saving quotation request:", error);

      // Reset loading state
      setIsSavingRequest(false);

      dispatch(
        openSnackbar({
          open: true,
          message: "Failed to save request. Please try again.",
          variant: "default",
          severity: "error",
          close: true,
        })
      );
    }
  };

  // Main action handler - switches between request and generate based on config
  const handleMainAction = () => {
    if (quotationMode === "request") {
      handleRequestQuotation();
    } else {
      handleGenerateQuotation();
    }
  };

  // Handle navigation to My Quotations
  const handleMyQuotationsClick = () => {
    // Clear cart
    clearCart();

    // Close success modal
    setRequestSuccessModalOpen(false);

    // Close parent modal
    onClose();

    // Navigate to my quotations using Next.js router (no page reload)
    router.push(QUOTATION_CONFIG.MY_QUOTATIONS_PATH);
  };

  // Clear validation errors when fields change
  const handleNameChange = (value: string) => {
    onCustomerNameChange(value);
    if (validationErrors.name && value.trim()) {
      setValidationErrors((prev) => ({ ...prev, name: false }));
    }
  };

  const handleEmailChange = (value: string) => {
    onCustomerEmailChange(value);
    if (validationErrors.email && value.trim() && isValidEmail(value)) {
      setValidationErrors((prev) => ({ ...prev, email: false }));
    }
  };

  const handlePhoneChange = (value: string) => {
    onCustomerPhoneChange(value);
    if (validationErrors.phone && value.trim()) {
      setValidationErrors((prev) => ({ ...prev, phone: false }));
    }
  };

  const handleCompanyChange = (value: string) => {
    onCustomerCompanyChange(value);
    if (validationErrors.company && value.trim()) {
      setValidationErrors((prev) => ({ ...prev, company: false }));
    }
  };

  const handleCountryChange = (value: string) => {
    onCustomerCountryChange(value);
    if (validationErrors.country && value.trim()) {
      setValidationErrors((prev) => ({ ...prev, country: false }));
    }
  };

  if (!isOpen || !mounted) return null;

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
          zIndex: 1000,
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
            p: 3,
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
              color: theme.palette.primary.main,
              fontSize: { xs: "1.3rem", sm: "1.5rem", md: "1.7rem" },
            }}
          >
            Customer Details
          </Typography>
          <IconButton onClick={onClose} sx={{ p: 1 }}>
            <Typography variant="h4" sx={{ color: "#666", fontSize: "1.3rem" }}>
              ×
            </Typography>
          </IconButton>
        </Box>

        {/* Content Area - Scrollable */}
        <Box sx={{ flex: 1, overflow: "auto" }}>
          {/* Progress Steps */}
          <Box sx={{ p: 3, pb: 2 }}>
            {/* Dynamic Progress Steps */}
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
                        background: step.completed
                          ? theme.palette.primary.main
                          : "#e0e0e0",
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

          {/* Customer Details Form */}
          <Box sx={{ p: 3, pt: 0 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: { xs: 2, md: 3 },
                mb: 3,
              }}
            >
              {/* Left Column */}
              <Box sx={{ flex: 1 }}>
                <TextField
                  label={
                    <span>
                      Name <span style={{ color: "red" }}>*</span>
                    </span>
                  }
                  value={customerName}
                  onChange={(e) => handleNameChange(e.target.value)}
                  fullWidth
                  variant="outlined"
                  error={validationErrors.name}
                  helperText={validationErrors.name ? "Name is required" : ""}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "transparent",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                      borderRadius: "8px",
                      "& fieldset": {
                        borderColor: validationErrors.name
                          ? "#f44336"
                          : "#1976d2",
                        borderWidth: "1px",
                      },
                      "&:hover fieldset": {
                        borderColor: validationErrors.name
                          ? "#f44336"
                          : "#1976d2",
                        borderWidth: "1px",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: validationErrors.name
                          ? "#f44336"
                          : "#1976d2",
                        borderWidth: "2px",
                      },
                    },
                    "& .MuiInputBase-input": {
                      backgroundColor: "transparent",
                      color: theme.palette.primary.main,
                      // Prevent autofill background
                      "&:-webkit-autofill": {
                        WebkitBoxShadow: `0 0 0 1000px transparent inset !important`,
                        WebkitTextFillColor: `${theme.palette.primary.main} !important`,
                        transition: "background-color 5000s ease-in-out 0s",
                      },
                      "&:-webkit-autofill:hover": {
                        WebkitBoxShadow: `0 0 0 1000px transparent inset !important`,
                      },
                      "&:-webkit-autofill:focus": {
                        WebkitBoxShadow: `0 0 0 1000px transparent inset !important`,
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: validationErrors.name
                        ? "#f44336"
                        : theme.palette.primary.main,
                      "&.Mui-focused": {
                        color: validationErrors.name
                          ? "#f44336"
                          : theme.palette.primary.main,
                      },
                    },
                    "& .MuiFormHelperText-root": {
                      color: "#f44336",
                      fontSize: "0.75rem",
                      marginTop: "4px",
                    },
                  }}
                />
              </Box>
              {/* Right Column */}
              <Box sx={{ flex: 1 }}>
                <TextField
                  label={
                    <span>
                      Contact Number <span style={{ color: "red" }}>*</span>
                    </span>
                  }
                  value={customerPhone}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  fullWidth
                  variant="outlined"
                  error={validationErrors.phone}
                  helperText={
                    validationErrors.phone ? "Contact number is required" : ""
                  }
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "transparent",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                      borderRadius: "8px",
                      "& fieldset": {
                        borderColor: validationErrors.phone
                          ? "#f44336"
                          : "#1976d2",
                        borderWidth: "1px",
                      },
                      "&:hover fieldset": {
                        borderColor: validationErrors.phone
                          ? "#f44336"
                          : "#1976d2",
                        borderWidth: "1px",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: validationErrors.phone
                          ? "#f44336"
                          : "#1976d2",
                        borderWidth: "2px",
                      },
                    },
                    "& .MuiInputBase-input": {
                      backgroundColor: "transparent",
                      color: theme.palette.primary.main,
                      // Prevent autofill background
                      "&:-webkit-autofill": {
                        WebkitBoxShadow: `0 0 0 1000px transparent inset !important`,
                        WebkitTextFillColor: `${theme.palette.primary.main} !important`,
                        transition: "background-color 5000s ease-in-out 0s",
                      },
                      "&:-webkit-autofill:hover": {
                        WebkitBoxShadow: `0 0 0 1000px transparent inset !important`,
                      },
                      "&:-webkit-autofill:focus": {
                        WebkitBoxShadow: `0 0 0 1000px transparent inset !important`,
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: validationErrors.phone
                        ? "#f44336"
                        : theme.palette.primary.main,
                      "&.Mui-focused": {
                        color: validationErrors.phone
                          ? "#f44336"
                          : theme.palette.primary.main,
                      },
                    },
                    "& .MuiFormHelperText-root": {
                      color: "#f44336",
                      fontSize: "0.75rem",
                      marginTop: "4px",
                    },
                  }}
                />
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: { xs: 2, md: 3 },
                mb: 4,
              }}
            >
              {/* Left Column */}
              <Box sx={{ flex: 1 }}>
                <TextField
                  label={
                    <span>
                      Email <span style={{ color: "red" }}>*</span>
                    </span>
                  }
                  value={customerEmail}
                  onChange={(e) => handleEmailChange(e.target.value)}
                  type="email"
                  fullWidth
                  variant="outlined"
                  error={validationErrors.email}
                  helperText={
                    validationErrors.email
                      ? customerEmail.trim() && !isValidEmail(customerEmail)
                        ? "Please enter a valid email address"
                        : "Email is required"
                      : ""
                  }
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "transparent",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                      borderRadius: "8px",
                      "& fieldset": {
                        borderColor: validationErrors.email
                          ? "#f44336"
                          : "#1976d2",
                        borderWidth: "1px",
                      },
                      "&:hover fieldset": {
                        borderColor: validationErrors.email
                          ? "#f44336"
                          : "#1976d2",
                        borderWidth: "1px",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: validationErrors.email
                          ? "#f44336"
                          : "#1976d2",
                        borderWidth: "2px",
                      },
                    },
                    "& .MuiInputBase-input": {
                      backgroundColor: "transparent",
                      color: theme.palette.primary.main,
                      // Prevent autofill background
                      "&:-webkit-autofill": {
                        WebkitBoxShadow: `0 0 0 1000px transparent inset !important`,
                        WebkitTextFillColor: `${theme.palette.primary.main} !important`,
                        transition: "background-color 5000s ease-in-out 0s",
                      },
                      "&:-webkit-autofill:hover": {
                        WebkitBoxShadow: `0 0 0 1000px transparent inset !important`,
                      },
                      "&:-webkit-autofill:focus": {
                        WebkitBoxShadow: `0 0 0 1000px transparent inset !important`,
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: validationErrors.email
                        ? "#f44336"
                        : theme.palette.primary.main,
                      "&.Mui-focused": {
                        color: validationErrors.email
                          ? "#f44336"
                          : theme.palette.primary.main,
                      },
                    },
                    "& .MuiFormHelperText-root": {
                      color: "#f44336",
                      fontSize: "0.75rem",
                      marginTop: "4px",
                    },
                  }}
                />
              </Box>
              {/* Right Column */}
              <Box sx={{ flex: 1 }}>
                <TextField
                  label="Company name"
                  value={customerCompany}
                  onChange={(e) => handleCompanyChange(e.target.value)}
                  fullWidth
                  variant="outlined"
                  error={validationErrors.company}
                  helperText={
                    validationErrors.company ? "Company name is required" : ""
                  }
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "transparent",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                      borderRadius: "8px",
                      "& fieldset": {
                        borderColor: validationErrors.company
                          ? "#f44336"
                          : "#1976d2",
                        borderWidth: "1px",
                      },
                      "&:hover fieldset": {
                        borderColor: validationErrors.company
                          ? "#f44336"
                          : "#1976d2",
                        borderWidth: "1px",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: validationErrors.company
                          ? "#f44336"
                          : "#1976d2",
                        borderWidth: "2px",
                      },
                    },
                    "& .MuiInputBase-input": {
                      backgroundColor: "transparent",
                      color: theme.palette.primary.main,
                      // Prevent autofill background
                      "&:-webkit-autofill": {
                        WebkitBoxShadow: `0 0 0 1000px transparent inset !important`,
                        WebkitTextFillColor: `${theme.palette.primary.main} !important`,
                        transition: "background-color 5000s ease-in-out 0s",
                      },
                      "&:-webkit-autofill:hover": {
                        WebkitBoxShadow: `0 0 0 1000px transparent inset !important`,
                      },
                      "&:-webkit-autofill:focus": {
                        WebkitBoxShadow: `0 0 0 1000px transparent inset !important`,
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: validationErrors.company
                        ? "#f44336"
                        : theme.palette.primary.main,
                      "&.Mui-focused": {
                        color: validationErrors.company
                          ? "#f44336"
                          : theme.palette.primary.main,
                      },
                    },
                    "& .MuiFormHelperText-root": {
                      color: "#f44336",
                      fontSize: "0.75rem",
                      marginTop: "4px",
                    },
                  }}
                />
              </Box>
            </Box>

            {/* Country Field */}
            <Box sx={{ mb: 4 }}>
              <FormControl
                fullWidth
                variant="outlined"
                error={validationErrors.country}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "transparent",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    borderRadius: "8px",
                    "& fieldset": {
                      borderColor: validationErrors.country
                        ? "#f44336"
                        : "#1976d2",
                      borderWidth: "1px",
                    },
                    "&:hover fieldset": {
                      borderColor: validationErrors.country
                        ? "#f44336"
                        : "#1976d2",
                      borderWidth: "1px",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: validationErrors.country
                        ? "#f44336"
                        : "#1976d2",
                      borderWidth: "2px",
                    },
                  },
                  "& .MuiInputBase-input": {
                    backgroundColor: "transparent",
                    color: theme.palette.primary.main,
                  },
                  "& .MuiInputLabel-root": {
                    color: validationErrors.country
                      ? "#f44336"
                      : theme.palette.primary.main,
                    "&.Mui-focused": {
                      color: validationErrors.country
                        ? "#f44336"
                        : theme.palette.primary.main,
                    },
                  },
                  "& .MuiFormHelperText-root": {
                    color: "#f44336",
                    fontSize: "0.75rem",
                    marginTop: "4px",
                  },
                }}
              >
                <InputLabel>
                  <span>
                    Country <span style={{ color: "red" }}>*</span>
                  </span>
                </InputLabel>
                <Select
                  value={customerCountry}
                  onChange={(e) => handleCountryChange(e.target.value)}
                  label={
                    <span>
                      Country <span style={{ color: "red" }}>*</span>
                    </span>
                  }
                >
                  <MenuItem value="">
                    <em>Select a country</em>
                  </MenuItem>
                  {COUNTRIES.map((country) => (
                    <MenuItem key={country} value={country}>
                      {country}
                    </MenuItem>
                  ))}
                </Select>
                {validationErrors.country && (
                  <Typography
                    variant="caption"
                    sx={{
                      color: "#f44336",
                      fontSize: "0.75rem",
                      marginTop: "4px",
                      marginLeft: "14px",
                    }}
                  >
                    Country is required
                  </Typography>
                )}
              </FormControl>
            </Box>
          </Box>
        </Box>

        {/* Error Message */}
        {otpError && (
          <Box
            sx={{
              p: { xs: 2, md: 3 },
              backgroundColor: "#ffebee",
              borderTop: "1px solid #f44336",
              borderBottom: "1px solid #f44336",
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: "#d32f2f",
                textAlign: "center",
                fontWeight: 500,
              }}
            >
              {otpError}
            </Typography>
          </Box>
        )}

        {/* Action Buttons - Fixed at Bottom */}
        <Box
          sx={{
            p: { xs: 2, md: 3 },
            borderTop: "1px solid rgba(25, 118, 210, 0.1)",
            backgroundColor: "transparent",
            display: "flex",
            flexDirection: "row",
            gap: { xs: 2, sm: 2 },
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Button
            variant="outlined"
            size="small"
            onClick={onBack}
            sx={{
              borderColor: theme.palette.primary.main,
              color: theme.palette.primary.main,
              backgroundColor: "transparent",
              fontWeight: 600,
              py: { xs: 0.75, md: 1 },
              px: { xs: 2, md: 3 },
              fontSize: { xs: "0.8rem", md: "0.9rem" },
              borderRadius: "8px",
              minWidth: { xs: "auto", sm: "100px" },
              flex: { xs: 1, sm: "none" },
              "&:hover": {
                borderColor: theme.palette.primary.dark,
                backgroundColor: "rgba(25, 118, 210, 0.04)",
              },
            }}
          >
            Back
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={
              isOtpVerified ? handleMainAction : handleSendOTPWithLoading
            }
            disabled={isSendingOTP || isSavingRequest}
            endIcon={
              <ArrowForwardIcon
                sx={{ fontSize: { xs: "0.9rem", md: "1rem" } }}
              />
            }
            sx={{
              py: { xs: 0.75, md: 1 },
              px: { xs: 2, md: 3 },
              background:
                "linear-gradient(105.34deg, #115293 0%, #1976D2 50%, #115293 100%)",
              color: "white",
              textTransform: "none",
              border: "none",
              borderRadius: "8px",
              fontSize: { xs: "0.8rem", md: "0.9rem" },
              minWidth: { xs: "auto", sm: "160px" },
              flex: { xs: 1, sm: "none" },
              "&:hover": {
                background:
                  "linear-gradient(105.34deg, #0d3d6b 0%, #1565c0 50%, #0d3d6b 100%)",
                color: "white",
              },
              "&:disabled": {
                background:
                  "linear-gradient(105.34deg, #115293 0%, #1976D2 50%, #115293 100%)",
                opacity: 0.7,
                color: "white !important",
              },
            }}
          >
            {isSendingOTP
              ? "Sending..."
              : isSavingRequest
                ? "Saving..."
                : isOtpVerified
                  ? buttonText
                  : "Send OTP"}
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
          zIndex: 99,
          animation: "fadeIn 0.3s ease-out",
        }}
      />

      {/* OTP Modal */}
      <OTPPopup
        open={showOTPModal}
        onClose={handleOTPClose}
        email={customerEmail}
        onEmailEdit={handleEmailEdit}
        onVerify={handleOTPVerify}
        otpMessage={otpMessage}
        otpMessageType={otpMessageType}
      />

      {/* Request Success Modal */}
      <RequestSuccessModal
        open={requestSuccessModalOpen}
        quotationNumber={savedQuotationNumber}
        configNumber={savedConfigNumber}
        onClose={() => {
          // Clear cart
          clearCart();

          // Close success modal
          setRequestSuccessModalOpen(false);

          // Close parent modal
          onClose();
        }}
        onNavigateToQuotations={handleMyQuotationsClick}
      />

      {/* Account Popup for Login/Signup */}
      {accountPopupOpen && (
        <AccountPopup
          open={accountPopupOpen}
          onClose={() => setAccountPopupOpen(false)}
          customZIndex={9999999}
        />
      )}
    </>
  );

  return createPortal(modalContent, document.body);
}
