"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../../../contexts/CartContext";
import useConfig from "hooks/useConfig";
import { useUser } from "@clerk/nextjs";
import { storeCartItems } from "../../../utils/cartStorage";
import {
  Box,
  Typography,
  Button,
  Card,
  IconButton,
  Chip,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import DeleteConfirmationModal from "../../../components/common/DeleteConfirmationModal";
import {
  Save as SaveIcon,
  ShoppingCart as ShoppingCartIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  ChevronRight as ChevronRightIcon,
} from "@mui/icons-material";

// Project imports
import AppBar from "ui-component/extended/AppBar";
import FooterSection from "views/pages/landing/FooterSection";
import OrderSummaryModal from "../invitro-study/components/OrderSummaryModal";
import InvitroGuidelineDetailModal from "../invitro-study/components/GuidelineDetailModal";
import ToxicityGuidelineDetailModal from "../toxicity-study/components/GuidelineDetailModal";
import CustomerDetailsModal from "../invitro-study/components/CustomerDetailsModal";
import QuotationGenerationModal from "../invitro-study/components/QuotationGenerationModal";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`cart-tabpanel-${index}`}
      aria-labelledby={`cart-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function CartPage() {
  const router = useRouter();
  const { i18n } = useConfig();
  const { user } = useUser();
  const {
    cartItems,
    savedItems,
    loading,
    removeFromCart,
    updateCartItems,
    saveForLater,
    addToOrder,
    removeFromSaved,
    onGenerateQuotation,
    onViewFullDetails,
    onEditItem,
    clearCart,
  } = useCart();

  // Helper function to display microorganisms with custom text handling
  const getDisplayMicroorganism = (item: any) => {
    // Check both possible property names
    const microorganism = item.selectedMicroorganism || item.microorganism;
    const customMicroorganism = item.customMicroorganism;

    if (Array.isArray(microorganism)) {
      let microorganismList = [...microorganism];

      // If "Any other" is selected and has custom text, replace it with the custom text
      if (microorganismList.includes("Any other") && customMicroorganism) {
        microorganismList = microorganismList.map((m) =>
          m === "Any other" ? customMicroorganism : m
        );
      }

      return microorganismList.join(", ");
    }

    return microorganism || "Not specified";
  };

  const [tabValue, setTabValue] = useState(0);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const [currentCartItem, setCurrentCartItem] = useState<any>(null);
  const [isCheckoutMode, setIsCheckoutMode] = useState(false);
  const [showGuidelineDetails, setShowGuidelineDetails] = useState(false);
  const [selectedGuideline, setSelectedGuideline] = useState<string | null>(
    null
  );
  const [selectedTherapeuticArea, setSelectedTherapeuticArea] = useState<
    string | null
  >(null);
  const [currentStudyType, setCurrentStudyType] = useState<string | null>(null);
  const [showCustomerDetails, setShowCustomerDetails] = useState(false);
  const [showQuotation, setShowQuotation] = useState(false);
  const [quotationCartItems, setQuotationCartItems] = useState<any[]>([]);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerCompany, setCustomerCompany] = useState("");
  const [customerCountry, setCustomerCountry] = useState("");
  const [showProceedModal, setShowProceedModal] = useState(
    cartItems.length > 0
  );

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleBack = () => {
    router.back();
  };

  const handleDeleteClick = (id: string) => {
    setItemToDelete(id);
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (itemToDelete) {
      // Check if item is in cart or saved items
      const isInCart = cartItems.some((item) => item.id === itemToDelete);
      const isInSaved = savedItems.some((item) => item.id === itemToDelete);

      if (isInCart) {
        removeFromCart(itemToDelete);
      } else if (isInSaved) {
        removeFromSaved(itemToDelete);
      }

      setItemToDelete(null);
    }
    setDeleteConfirmOpen(false);
  };

  const handleCancelDelete = () => {
    setItemToDelete(null);
    setDeleteConfirmOpen(false);
  };

  const handleUpdateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    // Update the cart item with new numSamples
    const updatedItems = cartItems.map((item) =>
      item.id === itemId ? { ...item, numSamples: newQuantity } : item
    );
    updateCartItems(updatedItems);
  };

  const handleViewDetails = (item: any) => {
    setCurrentCartItem(item);
    setIsCheckoutMode(false);
    setShowOrderSummary(true);
  };

  const handleEditItem = (item: any) => {
    if (item.studyType === "Toxicity Study") {
      // Navigate to toxicity study page with cart item data
      const productType = item.category || "Pharmaceuticals";
      const productTypeHash = productType
        .toLowerCase()
        .replace(/\s*\/\s*/g, "") // Remove "/"
        .replace(/\s+/g, "") // Remove spaces
        .replace(/[^a-z0-9]/g, ""); // Remove any other special characters
      const cartItemData = encodeURIComponent(JSON.stringify(item));
      const url = `/pricing/toxicity-study?cartItem=${cartItemData}#${productTypeHash}`;
      console.log("🔄 Navigating to edit URL:", url);
      console.log("🔄 Cart item data:", item);
      router.push(url);
    } else if (item.studyType === "Invitro Study") {
      // Navigate to invitro study page with cart item data
      const productType = item.category || "nutraceuticals";

      // Map the saved category value to the correct hash
      let productTypeHash;
      switch (productType) {
        case "nutraceuticals":
          productTypeHash = "nutraceuticals";
          break;
        case "cosmeceuticals":
          productTypeHash = "cosmeceuticals";
          break;
        case "pharmaceuticals":
          productTypeHash = "pharmaceuticals";
          break;
        case "herbalAyush":
          productTypeHash = "herbalayushproducts";
          break;
        default:
          productTypeHash = "nutraceuticals";
      }

      const cartItemData = encodeURIComponent(JSON.stringify(item));
      const url = `/pricing/invitro-study?cartItem=${cartItemData}#${productTypeHash}`;
      console.log("🔄 Navigating to invitro study edit URL:", url);
      console.log("🔄 Cart item data:", item);
      router.push(url);
    } else if (item.studyType === "Microbiology & Virology Study") {
      // Navigate to microbiology-virology study page with cart item data
      const productType = item.category || "Nutraceuticals";

      // Map the saved category value to the correct hash
      let productTypeHash;
      switch (productType) {
        case "Nutraceuticals":
          productTypeHash = "nutraceuticals";
          break;
        case "Cosmeceuticals":
          productTypeHash = "cosmeceuticals";
          break;
        case "Pharmaceuticals":
          productTypeHash = "pharmaceuticals";
          break;
        case "Herbal/Ayush":
          productTypeHash = "herbalayush";
          break;
        default:
          productTypeHash = "nutraceuticals";
      }

      const cartItemData = encodeURIComponent(JSON.stringify(item));
      const url = `/pricing/microbiology-virology?cartItem=${cartItemData}#${productTypeHash}`;
      console.log(
        "🔄 Navigating to microbiology-virology study edit URL:",
        url
      );
      console.log("🔄 Cart item data:", item);
      router.push(url);
    } else {
      // For other study types, show order summary modal
      setCurrentCartItem(item);
      setIsCheckoutMode(false);
      setShowOrderSummary(true);
    }
  };

  const handleSaveForLater = (item: any) => {
    // Move item from cart to saved items using global state
    saveForLater(item.id);
  };

  const handleCloseOrderSummary = () => {
    setShowOrderSummary(false);
    setCurrentCartItem(null);
  };

  const handleNextStep = () => {
    // Handle next step logic
    console.log("Next step clicked");
  };

  const handleCheckout = () => {
    console.log("Proceeding to checkout...");
  };

  const handleGuidelineClick = (
    guideline: string,
    category: string,
    therapeuticArea?: string,
    studyType?: string
  ) => {
    setSelectedGuideline(guideline);
    setSelectedTherapeuticArea(therapeuticArea || category);
    setCurrentStudyType(studyType || "");
    setShowGuidelineDetails(true);
  };

  const handleProceedConfirm = () => {
    setShowProceedModal(false);
    setShowCustomerDetails(true);
  };

  const handleCustomerDetailsNext = async () => {
    console.log(
      "🔄 handleCustomerDetailsNext called - proceeding to quotation modal"
    );
    console.log("🔄 Cart items:", cartItems);

    // Store current cart items for quotation (don't clear yet - wait for successful quotation)
    setQuotationCartItems([...cartItems]);

    console.log("🔄 Opening quotation modal");
    setShowCustomerDetails(false);

    // Add a small delay to ensure state is updated before opening modal
    setTimeout(() => {
      setShowQuotation(true);
    }, 100);
  };

  const handleCustomerDetailsClose = () => {
    setShowCustomerDetails(false);
    setShowProceedModal(true); // Show notification modal again
  };

  const handleGenerateQuotation = () => {
    if (onGenerateQuotation) {
      onGenerateQuotation(cartItems[0]); // Pass first cart item as parameter
    }
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.numSamples, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.numSamples,
    0
  );

  // Function to get the appropriate image based on study type
  const getStudyTypeImage = (studyType: string) => {
    switch (studyType) {
      case "Toxicity Study":
        return "/assets/images/landing/pricing/cart-toxicity.png";
      case "Microbiology & Virology Study":
      case "microbiology-virology":
        return "/assets/images/landing/pricing/cart-microorganism.png";
      case "Invitro Study":
      default:
        return "/assets/images/landing/pricing/cart-invitro.png";
    }
  };

  // Show proceed modal when cart has items
  useEffect(() => {
    console.log("🔄 Cart items changed:", cartItems);
    console.log("🔄 Cart items length:", cartItems.length);
    if (cartItems.length > 0) {
      setShowProceedModal(true);
    } else {
      setShowProceedModal(false);
    }
  }, [cartItems.length]);

  // Debug: Log cart items changes
  useEffect(() => {
    console.log("🔄 Cart items state updated:", cartItems);
  }, [cartItems]);

  // Redirect to home page when Korean language is selected
  useEffect(() => {
    if (i18n === "ko") {
      router.push("/");
    }
  }, [i18n, router]);

  // Don't render cart page content when Korean language is selected
  if (i18n === "ko") {
    return null;
  }

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundImage: 'url("/assets/images/home-bg.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
        },
      }}
    >
      {/* Header */}
      <AppBar
        sx={{
          background: "transparent",
          position: "relative",
          zIndex: 2,
          flexShrink: 0,
        }}
      />

      {/* Main Cart Container */}
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flex: 1,
          overflow: "auto",
          py: { xs: 2, sm: 3, md: 4 },
          px: { xs: 1, sm: 2, md: 2 },
          width: "100%",
          maxWidth: "1200px",
          mx: "auto",
          // Hide scrollbar for webkit browsers
          "&::-webkit-scrollbar": {
            width: "0px",
            background: "transparent",
          },
          // Hide scrollbar for Firefox
          scrollbarWidth: "none",
          // Hide scrollbar for IE and Edge
          msOverflowStyle: "none",
        }}
      >
        {/* Back Button and Title */}
        {/* <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: { xs: 1, sm: 2 }, 
          mb: { xs: 1, sm: 2 },
          width: '100%',
          justifyContent: { xs: 'flex-start', sm: 'center' }
        }}>
          <IconButton 
            onClick={handleBack} 
            sx={{ 
              color: '#115293',
              '&:hover': { backgroundColor: 'rgba(25, 118, 210, 0.1)' }
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h5" sx={{ 
            fontWeight: 'bold', 
            color: '#115293',
            fontSize: { xs: '1.3rem', sm: '1.5rem', md: '1.7rem' }
          }}>
            Your Cart
          </Typography>
        </Box> */}

        {/* Tabs - Centered above the card */}
        <Box
          sx={{
            mb: { xs: 2, sm: 3 },
            width: "100%",
            display: "flex",
            justifyContent: "center",
            gap: "10.83px",
          }}
        >
          <Chip
            label="Your Cart"
            onClick={() => setTabValue(0)}
            clickable
            sx={{
              width: "160px",
              height: "38px",
              backgroundColor: tabValue === 0 ? "#115293" : "transparent",
              color: tabValue === 0 ? "white" : "#115293",
              fontWeight: "bold",
              fontSize: "12px",
              borderRadius: "43.33px",
              border: tabValue === 0 ? "none" : "1px solid #115293",
              paddingTop: "8px",
              paddingRight: "20px",
              paddingBottom: "8px",
              paddingLeft: "20px",
              opacity: 1,
              "&:hover": {
                backgroundColor:
                  tabValue === 0 ? "#0d3d6b" : "rgba(17, 82, 147, 0.1)",
              },
              "& .MuiChip-label": {
                padding: 0,
                paddingTop: "8px",
                paddingRight: "20px",
                paddingBottom: "8px",
                paddingLeft: "20px",
              },
            }}
          />
          <Chip
            label="Saved Items"
            onClick={() => setTabValue(1)}
            clickable
            sx={{
              width: "160px",
              height: "38px",
              backgroundColor: tabValue === 1 ? "#115293" : "transparent",
              color: tabValue === 1 ? "white" : "#115293",
              fontWeight: "bold",
              fontSize: "12px",
              borderRadius: "43.33px",
              border: tabValue === 1 ? "none" : "1px solid #115293",
              paddingTop: "8px",
              paddingRight: "20px",
              paddingBottom: "8px",
              paddingLeft: "20px",
              opacity: 1,
              "&:hover": {
                backgroundColor:
                  tabValue === 1 ? "#0d3d6b" : "rgba(17, 82, 147, 0.1)",
              },
              "& .MuiChip-label": {
                padding: 0,
                paddingTop: "8px",
                paddingRight: "20px",
                paddingBottom: "8px",
                paddingLeft: "20px",
              },
            }}
          />
        </Box>

        {/* Cart Content */}
        {tabValue === 0 ? (
          loading ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                py: { xs: 8, sm: 10, md: 12 },
                px: { xs: 2, sm: 4 },
                width: "100%",
                minHeight: "400px",
              }}
            >
              <CircularProgress
                sx={{
                  color: "#115293",
                  mb: 3,
                }}
                size={60}
              />
              <Typography
                variant="h6"
                sx={{
                  color: "#115293",
                  fontSize: { xs: "1rem", sm: "1.2rem" },
                  fontWeight: 500,
                }}
              >
                Loading your cart...
              </Typography>
            </Box>
          ) : !loading && cartItems.length === 0 ? (
            <Box
              sx={{
                textAlign: "center",
                py: { xs: 4, sm: 6, md: 8 },
                px: { xs: 2, sm: 4 },
                width: "100%",
                maxWidth: "500px",
              }}
            >
              <ShoppingCartIcon
                sx={{
                  fontSize: { xs: 60, sm: 80 },
                  color: "#115293",
                  mb: 2,
                  opacity: 0.7,
                }}
              />
              <Typography
                variant="h5"
                sx={{
                  color: "#115293",
                  mb: 2,
                  fontSize: { xs: "1.3rem", sm: "1.5rem" },
                  fontWeight: "bold",
                }}
              >
                Your cart is empty
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "#115293",
                  mb: 3,
                  fontSize: { xs: "0.9rem", sm: "1rem" },
                  opacity: 0.7,
                }}
              >
                Add some studies to get started
              </Typography>
              {/* <Button
                  variant="contained"
                  onClick={() => router.push('/pricing/invitro-study')}
                  sx={{
                    backgroundColor: '#115293',
                    '&:hover': { backgroundColor: '#0d3d6b' },
                    fontSize: { xs: '0.9rem', sm: '1rem' },
                    px: { xs: 3, sm: 4 },
                    py: { xs: 1, sm: 1.5 }
                  }}
                >
                  Browse Studies
                </Button> */}
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: { xs: 2, sm: 3 },
                p: { xs: 1, sm: 2 },
                width: "100%",
                maxWidth: "1000px",
              }}
            >
              {cartItems.map((item, index) => {
                // Calculate dynamic height based on number of guidelines
                const guidelineCount = item.selectedGuidelines
                  ? item.selectedGuidelines.length
                  : 0;
                const guidelinesRows = Math.ceil(guidelineCount / 4); // 4 items per row
                const baseHeight = 280; // Reduced minimum height
                const additionalHeight =
                  guidelinesRows > 1 ? (guidelinesRows - 1) * 40 : 0; // Reduced 40px per additional row
                const buttonAreaHeight = 50; // Reduced space for buttons
                const dynamicHeight = Math.max(
                  baseHeight,
                  baseHeight + additionalHeight + buttonAreaHeight
                );

                return (
                  <Card
                    key={item.id}
                    sx={{
                      width: "100%",
                      minHeight: `${dynamicHeight}px`,
                      // backgroundImage: 'url("/assets/images/home-bg.png")',
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                      backgroundColor: "#AED2F6",
                      borderRadius: { xs: 2, sm: 3 },
                      boxShadow: "0 12px 40px rgba(0, 0, 0, 0.25)",
                      border: "1px solid rgba(0, 0, 0, 0.1)",
                      opacity: 1,
                      transform: "rotate(0deg)",
                    }}
                  >
                    <Box
                      sx={{
                        p: { xs: 1, sm: 1.5 },
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        overflow: "hidden",
                      }}
                    >
                      {/* Top Line - Icon, Chip, and Quantity */}
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          mb: { xs: 1, sm: 1.5 },
                          flexWrap: { xs: "wrap", sm: "nowrap" },
                          gap: { xs: 1, sm: 0 },
                        }}
                      >
                        {/* Left - Icon and Chip */}
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            flex: { xs: "1 1 100%", sm: "0 0 auto" },
                            minWidth: 0,
                          }}
                        >
                          {/* Thumbnail */}
                          <Box
                            sx={{
                              width: 60,
                              height: 60,
                              backgroundColor: "#e3f2fd",
                              borderRadius: "2.49px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              border: "2px solid #115293",
                              position: "relative",
                              overflow: "hidden",
                            }}
                          >
                            <Box
                              component="img"
                              src={getStudyTypeImage(
                                item.studyType || "Invitro Study"
                              )}
                              alt={`${item.studyType || "Invitro Study"} icon`}
                              sx={{
                                width: 60,
                                height: 60,
                                objectFit: "contain",
                                borderRadius: "2.49px",
                                opacity: 1,
                              }}
                            />
                          </Box>

                          {/* Product Type Chip */}
                          <Chip
                            label={item.studyType || "Invitro Study"}
                            sx={{
                              background:
                                "linear-gradient(90.17deg, rgba(25, 118, 210, 0.15) 0%, rgba(25, 118, 210, 0.15) 100%)",
                              color: "#115293",
                              fontWeight: "bold",
                              fontSize: { xs: "9px", sm: "11px" },
                              px: { xs: 1, sm: 1.5 },
                              py: 0.5,
                              width:
                                item.studyType ===
                                  "Microbiology & Virology Study" ||
                                item.studyType === "microbiology-virology"
                                  ? 220
                                  : 158,
                              height: 32,
                              opacity: 1,
                              borderRadius: "4px",
                              border: "1px solid",
                              borderColor: "primary.dark",
                            }}
                          />
                        </Box>

                        {/* Right - Quantity Control (Same Row) */}
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            flex: { xs: "1 1 100%", sm: "0 0 auto" },
                            minWidth: 0,
                          }}
                        >
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: "bold",
                              fontSize: { xs: "12px", sm: "14px" },
                            }}
                          >
                            No of Samples
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                              backgroundColor: "#115293",
                              borderRadius: 2,
                              p: 1,
                              width: "fit-content",
                            }}
                          >
                            <IconButton
                              size="small"
                              disabled={item.numSamples <= 1}
                              onClick={() =>
                                handleUpdateQuantity(
                                  item.id,
                                  item.numSamples - 1
                                )
                              }
                              sx={{
                                color: "white",
                                backgroundColor: "#115293 !important",
                                width: { xs: 24, sm: 28 },
                                height: { xs: 24, sm: 28 },
                                borderRadius: 0,
                                boxShadow: "none !important",
                                "&:hover": {
                                  backgroundColor:
                                    item.numSamples <= 1
                                      ? "#115293 !important"
                                      : "#0d3d6b !important",
                                  color: "white",
                                },
                                "&.Mui-disabled": {
                                  color: "rgba(255, 255, 255, 0.3)",
                                  backgroundColor: "#115293 !important",
                                },
                                "&.MuiIconButton-root": {
                                  borderRadius: 0,
                                  backgroundColor: "#115293 !important",
                                },
                                "&::before": {
                                  display: "none",
                                },
                                "&::after": {
                                  display: "none",
                                },
                              }}
                            >
                              <RemoveIcon fontSize="small" />
                            </IconButton>
                            <Typography
                              variant="h6"
                              sx={{
                                minWidth: { xs: 20, sm: 25 },
                                textAlign: "center",
                                color: "white",
                                fontWeight: "bold",
                                fontSize: { xs: "14px", sm: "16px" },
                              }}
                            >
                              {item.numSamples}
                            </Typography>
                            <IconButton
                              size="small"
                              onClick={() =>
                                handleUpdateQuantity(
                                  item.id,
                                  item.numSamples + 1
                                )
                              }
                              sx={{
                                color: "white",
                                backgroundColor: "#115293 !important",
                                width: { xs: 24, sm: 28 },
                                height: { xs: 24, sm: 28 },
                                borderRadius: 0,
                                boxShadow: "none !important",
                                "&:hover": {
                                  backgroundColor: "#0d3d6b !important",
                                  color: "white",
                                },
                                "&.MuiIconButton-root": {
                                  borderRadius: 0,
                                  backgroundColor: "#115293 !important",
                                },
                                "&::before": {
                                  display: "none",
                                },
                                "&::after": {
                                  display: "none",
                                },
                              }}
                            >
                              <AddIcon fontSize="small" />
                            </IconButton>
                          </Box>
                        </Box>
                      </Box>

                      {/* Bottom Border Line */}
                      <Box
                        sx={{
                          borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
                          mb: 1.5,
                        }}
                      />

                      {/* Main Content Area */}
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 1.5,
                        }}
                      >
                        {/* Details Section */}
                        <Box>
                          {/* Description */}
                          <Typography
                            variant="body2"
                            sx={{
                              color: "#115293",
                              lineHeight: 1.6,
                              fontSize: { xs: "12px", sm: "14px" },
                              mb: 0.5,
                            }}
                          >
                            <strong>Sample Description:</strong>{" "}
                            <span
                              style={{ color: "#115293", fontWeight: "normal" }}
                            >
                              {typeof item.description === "string"
                                ? item.description
                                : "Order Summary"}
                            </span>
                          </Typography>

                          {/* Product Type */}
                          <Typography
                            variant="body2"
                            sx={{
                              color: "#115293",
                              lineHeight: 1.6,
                              fontSize: { xs: "12px", sm: "14px" },
                              //  mb: 2
                            }}
                          >
                            <strong>• Product Type:</strong>{" "}
                            <span
                              style={{ color: "#115293", fontWeight: "normal" }}
                            >
                              {item.category || "Not specified"}
                            </span>
                          </Typography>

                          {/* Key Details */}
                          <Box
                            sx={{
                              display: "flex",
                              gap: { xs: 2, sm: 4 },
                              mb: 1,
                              flexDirection: { xs: "column", sm: "row" },
                            }}
                          >
                            <Box>
                              <Typography
                                variant="body2"
                                sx={{
                                  mb: 0.5,
                                  fontSize: { xs: "12px", sm: "14px" },
                                }}
                              >
                                <strong>• Sample Form:</strong>{" "}
                                {item.sampleForm === "Others" &&
                                item.customSampleForm
                                  ? `Others (${item.customSampleForm})`
                                  : item.sampleForm || "Suspensions"}
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{
                                  mb: 0.5,
                                  fontSize: { xs: "12px", sm: "14px" },
                                }}
                              >
                                <strong>• Sample Solvent:</strong>{" "}
                                {item.sampleSolvent === "Others" &&
                                item.sampleSolvent
                                  ? `Others (${item.sampleSolvent})`
                                  : item.sampleSolvent || "Acetone"}
                              </Typography>
                            </Box>
                            <Box>
                              {item.studyType === "Toxicity Study" ? (
                                // For Toxicity Study: Show Application
                                <Typography
                                  variant="body2"
                                  sx={{
                                    mb: 0.5,
                                    fontSize: { xs: "12px", sm: "14px" },
                                  }}
                                >
                                  <strong>• Application:</strong>{" "}
                                  {item.application || "Oral"}
                                </Typography>
                              ) : item.studyType ===
                                  "Microbiology & Virology Study" ||
                                item.studyType === "microbiology-virology" ? (
                                // For Microbiology Study: Show Microorganism Type and Microorganism
                                <>
                                  <Typography
                                    variant="body2"
                                    sx={{
                                      mb: 0.5,
                                      fontSize: { xs: "12px", sm: "14px" },
                                    }}
                                  >
                                    <strong>• Type of Micro-organism:</strong>{" "}
                                    {(item as any).microorganismType ||
                                      (item as any).selectedMicroorganismType ||
                                      "Not specified"}
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    sx={{
                                      mb: 0.5,
                                      fontSize: { xs: "12px", sm: "14px" },
                                    }}
                                  >
                                    <strong>• Micro-organism:</strong>{" "}
                                    {getDisplayMicroorganism(item)}
                                  </Typography>
                                </>
                              ) : (
                                // For Invitro Study: Show Therapeutic Areas
                                <Typography
                                  variant="body2"
                                  sx={{
                                    mb: 0.5,
                                    fontSize: { xs: "12px", sm: "14px" },
                                  }}
                                >
                                  <strong>• Therapeutic Areas:</strong>{" "}
                                  {(item as any).selectedTherapeuticAreas
                                    ? (
                                        item as any
                                      ).selectedTherapeuticAreas.join(", ")
                                    : "Not specified"}
                                </Typography>
                              )}
                            </Box>
                          </Box>

                          {/* Guidelines */}
                          {((item.selectedGuidelines &&
                            item.selectedGuidelines.length > 0) ||
                            ((item.studyType ===
                              "Microbiology & Virology Study" ||
                              item.studyType === "microbiology-virology") &&
                              (item as any).selectedStudies &&
                              (item as any).selectedStudies.length > 0)) && (
                            <Box>
                              <Typography
                                variant="body2"
                                sx={{
                                  fontWeight: "bold",
                                  mb: 1,
                                  fontSize: { xs: "12px", sm: "14px" },
                                  color: "#115293",
                                }}
                              >
                                Guidelines:
                              </Typography>
                              <Box
                                sx={{
                                  display: "flex",
                                  flexWrap: "wrap",
                                  gap: "10px",
                                }}
                              >
                                {[
                                  ...new Set(
                                    item.studyType ===
                                      "Microbiology & Virology Study" ||
                                    item.studyType === "microbiology-virology"
                                      ? (item as any).selectedStudies
                                      : item.selectedGuidelines
                                  ),
                                ].map((guideline, guidelineIndex) => (
                                  <Tooltip
                                    key={guidelineIndex}
                                    title={guideline}
                                    arrow
                                    placement="top"
                                  >
                                    <Box
                                      sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        backgroundColor: "transparent",
                                        borderRadius: "4px",
                                        border: "1.5px solid #115293",
                                        cursor: "pointer",
                                        width: 148,
                                        height: 28,
                                        opacity: 1,
                                        paddingRight: "8px",
                                        paddingLeft: "8px",
                                        "&:hover": {
                                          backgroundColor:
                                            "rgba(17, 82, 147, 0.1)",
                                          borderColor: "#0d3d6b",
                                        },
                                      }}
                                      onClick={() =>
                                        handleGuidelineClick(
                                          guideline,
                                          item.category,
                                          (item as any)
                                            .selectedTherapeuticAreas?.[0],
                                          item.studyType
                                        )
                                      }
                                    >
                                      <Typography
                                        variant="body2"
                                        sx={{
                                          flex: 1,
                                          fontSize: { xs: "10px", sm: "12px" },
                                          color: "#115293",
                                          overflow: "hidden",
                                          textOverflow: "ellipsis",
                                          whiteSpace: "nowrap",
                                          fontWeight: 500,
                                        }}
                                      >
                                        {guideline}
                                      </Typography>
                                      <ChevronRightIcon
                                        sx={{
                                          fontSize: { xs: 12, sm: 14 },
                                          color: "#115293",
                                        }}
                                      />
                                    </Box>
                                  </Tooltip>
                                ))}
                              </Box>
                            </Box>
                          )}
                        </Box>

                        {/* Action Buttons - Bottom Row */}
                        <Box
                          sx={{
                            display: "flex",
                            gap: { xs: "4px", sm: "8px" },
                            justifyContent: {
                              xs: "space-between",
                              sm: "flex-end",
                            },
                            mt: 2,
                            pb: 1,
                            flexWrap: { xs: "nowrap", sm: "wrap" },
                            width: "100%",
                          }}
                        >
                          <Button
                            variant="contained"
                            size="small"
                            onClick={() => handleSaveForLater(item)}
                            sx={{
                              background:
                                "linear-gradient(105.34deg, #115293 0%, #1976D2 50%, #115293 100%)",
                              color: "white",
                              textTransform: "none",
                              fontSize: { xs: "9px", sm: "13px" },
                              width: { xs: "calc(33.33% - 2px)", sm: 136 },
                              minWidth: { xs: "auto", sm: 136 },
                              height: 40,
                              borderRadius: "8px",
                              borderWidth: "2px",
                              opacity: 1,
                              paddingTop: "10px",
                              paddingRight: { xs: "8px", sm: "16px" },
                              paddingBottom: "10px",
                              paddingLeft: { xs: "8px", sm: "16px" },
                              "&:hover": {
                                background:
                                  "linear-gradient(105.34deg, #0d3d6b 0%, #1565c0 50%, #0d3d6b 100%)",
                              },
                            }}
                          >
                            {/* Use shorter text on mobile */}
                            <Box
                              component="span"
                              sx={{ display: { xs: "none", sm: "inline" } }}
                            >
                              Save for Later
                            </Box>
                            <Box
                              component="span"
                              sx={{ display: { xs: "inline", sm: "none" } }}
                            >
                              Save
                            </Box>
                          </Button>
                          {(item.studyType === "Toxicity Study" ||
                            item.studyType === "Invitro Study" ||
                            item.studyType ===
                              "Microbiology & Virology Study") && (
                            <Button
                              variant="outlined"
                              size="small"
                              onClick={() => handleEditItem(item)}
                              sx={{
                                borderColor: "#115293",
                                color: "#115293",
                                textTransform: "none",
                                fontSize: { xs: "9px", sm: "13px" },
                                width: { xs: "calc(33.33% - 2px)", sm: 136 },
                                minWidth: { xs: "auto", sm: 136 },
                                height: 40,
                                borderRadius: "8px",
                                borderWidth: "2px",
                                opacity: 1,
                                paddingTop: "10px",
                                paddingRight: { xs: "8px", sm: "16px" },
                                paddingBottom: "10px",
                                paddingLeft: { xs: "8px", sm: "16px" },
                                "&:hover": {
                                  borderColor: "#0d3d6b",
                                  backgroundColor: "rgba(25, 118, 210, 0.1)",
                                },
                              }}
                            >
                              Edit
                            </Button>
                          )}
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={() => handleDeleteClick(item.id)}
                            sx={{
                              borderColor: "#115293",
                              color: "#115293",
                              textTransform: "none",
                              fontSize: { xs: "9px", sm: "13px" },
                              width: { xs: "calc(33.33% - 2px)", sm: 136 },
                              minWidth: { xs: "auto", sm: 136 },
                              height: 40,
                              borderRadius: "8px",
                              borderWidth: "2px",
                              opacity: 1,
                              paddingTop: "10px",
                              paddingRight: { xs: "8px", sm: "16px" },
                              paddingBottom: "10px",
                              paddingLeft: { xs: "8px", sm: "16px" },
                              "&:hover": {
                                borderColor: "#0d3d6b",
                                backgroundColor: "rgba(25, 118, 210, 0.1)",
                              },
                            }}
                          >
                            Delete
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  </Card>
                );
              })}
            </Box>
          )
        ) : /* Saved Items Tab */
        loading ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              py: { xs: 8, sm: 10, md: 12 },
              px: { xs: 2, sm: 4 },
              width: "100%",
              minHeight: "400px",
            }}
          >
            <CircularProgress
              sx={{
                color: "#115293",
                mb: 3,
              }}
              size={60}
            />
            <Typography
              variant="h6"
              sx={{
                color: "#115293",
                fontSize: { xs: "1rem", sm: "1.2rem" },
                fontWeight: 500,
              }}
            >
              Loading saved items...
            </Typography>
          </Box>
        ) : !loading && savedItems.length === 0 ? (
          <Box
            sx={{
              textAlign: "center",
              py: { xs: 6, sm: 8 },
              px: { xs: 2, sm: 4 },
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <SaveIcon
              sx={{
                fontSize: { xs: 60, sm: 80 },
                color: "#115293",
                mb: 2,
                opacity: 0.7,
              }}
            />
            <Typography
              variant="h5"
              sx={{
                color: "#115293",
                mb: 2,
                fontSize: { xs: "1.3rem", sm: "1.5rem" },
                fontWeight: "bold",
              }}
            >
              No saved items
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#115293",
                opacity: 0.7,
                fontSize: { xs: "0.9rem", sm: "1rem" },
              }}
            >
              Items you save for later will appear here
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: { xs: 2, sm: 3 },
              p: { xs: 1, sm: 2 },
              width: "100%",
              maxWidth: "1000px",
            }}
          >
            {savedItems.map((item, index) => {
              // Calculate dynamic height based on number of guidelines
              const guidelineCount = item.selectedGuidelines
                ? item.selectedGuidelines.length
                : 0;
              const guidelinesRows = Math.ceil(guidelineCount / 4); // 4 items per row
              const baseHeight = 280; // Reduced minimum height
              const additionalHeight =
                guidelinesRows > 1 ? (guidelinesRows - 1) * 40 : 0; // Reduced 40px per additional row
              const buttonAreaHeight = 50; // Reduced space for buttons
              const dynamicHeight = Math.max(
                baseHeight,
                baseHeight + additionalHeight + buttonAreaHeight
              );

              return (
                <Card
                  key={item.id}
                  sx={{
                    width: "100%",
                    minHeight: `${dynamicHeight}px`,
                    backgroundImage: 'url("/assets/images/home-bg.png")',
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundColor: "transparent",
                    borderRadius: { xs: 2, sm: 3 },
                    boxShadow: "0 12px 40px rgba(0, 0, 0, 0.25)",
                    border: "1px solid rgba(0, 0, 0, 0.1)",
                    opacity: 1,
                    transform: "rotate(0deg)",
                  }}
                >
                  <Box
                    sx={{
                      p: { xs: 1, sm: 1.5 },
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      overflow: "hidden",
                    }}
                  >
                    {/* Top Line - Icon, Chip, and Quantity */}
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: { xs: 1, sm: 1.5 },
                        flexWrap: { xs: "wrap", sm: "nowrap" },
                        gap: { xs: 1, sm: 0 },
                      }}
                    >
                      {/* Left - Icon and Chip */}
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          flex: { xs: "1 1 100%", sm: "0 0 auto" },
                          minWidth: 0,
                        }}
                      >
                        {/* Thumbnail */}
                        <Box
                          sx={{
                            width: 60,
                            height: 60,
                            backgroundColor: "#e3f2fd",
                            borderRadius: "2.49px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            border: "2px solid #115293",
                            position: "relative",
                            overflow: "hidden",
                          }}
                        >
                          <Box
                            component="img"
                            src={getStudyTypeImage(
                              item.studyType || "Invitro Study"
                            )}
                            alt={`${item.studyType || "Invitro Study"} icon`}
                            sx={{
                              width: 60,
                              height: 60,
                              objectFit: "contain",
                              borderRadius: "2.49px",
                              opacity: 1,
                            }}
                          />
                        </Box>

                        {/* Product Type Chip */}
                        <Chip
                          label={item.studyType || "Invitro Study"}
                          sx={{
                            background:
                              "linear-gradient(106.17deg, rgba(25, 118, 210, 0.15) 0%, rgba(25, 118, 210, 0.15) 100%)",
                            color: "#115293",
                            fontWeight: "bold",
                            fontSize: { xs: "9px", sm: "11px" },
                            px: { xs: 1, sm: 1.5 },
                            py: 0.5,
                            width:
                              item.studyType ===
                                "Microbiology & Virology Study" ||
                              item.studyType === "microbiology-virology"
                                ? 220
                                : 158,
                            height: 32,
                            opacity: 1,
                            borderRadius: "4px",
                            border: "1px solid",
                            borderColor: "primary.dark",
                          }}
                        />
                      </Box>

                      {/* Right - Quantity Control (Same Row) */}
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          flex: { xs: "1 1 100%", sm: "0 0 auto" },
                          minWidth: 0,
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: "bold",
                            fontSize: { xs: "12px", sm: "14px" },
                          }}
                        >
                          No of Samples
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            backgroundColor: "#115293",
                            borderRadius: 2,
                            p: 1,
                            width: "fit-content",
                          }}
                        >
                          <IconButton
                            size="small"
                            onClick={() =>
                              handleUpdateQuantity(item.id, item.numSamples - 1)
                            }
                            sx={{
                              color: "white",
                              backgroundColor: "#115293 !important",
                              width: { xs: 24, sm: 28 },
                              height: { xs: 24, sm: 28 },
                              borderRadius: 0,
                              boxShadow: "none !important",
                              "&:hover": {
                                backgroundColor: "#0d3d6b !important",
                                color: "white",
                              },
                              "&.MuiIconButton-root": {
                                borderRadius: 0,
                                backgroundColor: "#115293 !important",
                              },
                              "&::before": {
                                display: "none",
                              },
                              "&::after": {
                                display: "none",
                              },
                            }}
                          >
                            <RemoveIcon fontSize="small" />
                          </IconButton>
                          <Typography
                            variant="h6"
                            sx={{
                              minWidth: { xs: 20, sm: 25 },
                              textAlign: "center",
                              color: "white",
                              fontWeight: "bold",
                              fontSize: { xs: "14px", sm: "16px" },
                            }}
                          >
                            {item.numSamples}
                          </Typography>
                          <IconButton
                            size="small"
                            onClick={() =>
                              handleUpdateQuantity(item.id, item.numSamples + 1)
                            }
                            sx={{
                              color: "white",
                              backgroundColor: "#115293 !important",
                              width: { xs: 24, sm: 28 },
                              height: { xs: 24, sm: 28 },
                              borderRadius: 0,
                              boxShadow: "none !important",
                              "&:hover": {
                                backgroundColor: "#0d3d6b !important",
                                color: "white",
                              },
                              "&.MuiIconButton-root": {
                                borderRadius: 0,
                                backgroundColor: "#115293 !important",
                              },
                              "&::before": {
                                display: "none",
                              },
                              "&::after": {
                                display: "none",
                              },
                            }}
                          >
                            <AddIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </Box>
                    </Box>

                    {/* Bottom Border Line */}
                    <Box
                      sx={{
                        borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
                        mb: 1.5,
                      }}
                    />

                    {/* Main Content Area */}
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 1.5,
                      }}
                    >
                      {/* Details Section */}
                      <Box>
                        {/* Description */}
                        <Typography
                          variant="body2"
                          sx={{
                            color: "#115293",
                            lineHeight: 1.6,
                            fontSize: { xs: "12px", sm: "14px" },
                            mb: 0.5,
                          }}
                        >
                          <strong> Sample Description:</strong>{" "}
                          <span
                            style={{ color: "#115293", fontWeight: "normal" }}
                          >
                            {typeof item.description === "string"
                              ? item.description
                              : "Order Summary"}
                          </span>
                        </Typography>

                        {/* Product Type */}
                        <Typography
                          variant="body2"
                          sx={{
                            color: "#115293",
                            lineHeight: 1.6,
                            fontSize: { xs: "12px", sm: "14px" },
                            //  mb: 2
                          }}
                        >
                          <strong>• Product Type:</strong>{" "}
                          <span
                            style={{ color: "#115293", fontWeight: "normal" }}
                          >
                            {item.category || "Not specified"}
                          </span>
                        </Typography>

                        {/* Key Details */}
                        <Box
                          sx={{
                            display: "flex",
                            gap: { xs: 2, sm: 4 },
                            mb: 1,
                            flexDirection: { xs: "column", sm: "row" },
                          }}
                        >
                          <Box>
                            <Typography
                              variant="body2"
                              sx={{
                                mb: 0.5,
                                fontSize: { xs: "12px", sm: "14px" },
                              }}
                            >
                              <strong>• Sample Form:</strong>{" "}
                              {item.sampleForm === "Others" &&
                              item.customSampleForm
                                ? `Others (${item.customSampleForm})`
                                : item.sampleForm || "Suspensions"}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{
                                mb: 0.5,
                                fontSize: { xs: "12px", sm: "14px" },
                              }}
                            >
                              <strong>• Sample Solvent:</strong>{" "}
                              {item.sampleSolvent === "Others" &&
                              item.sampleSolvent
                                ? `Others (${item.sampleSolvent})`
                                : item.sampleSolvent || "Acetone"}
                            </Typography>
                          </Box>
                          <Box>
                            {item.studyType === "Toxicity Study" ? (
                              // For Toxicity Study: Show Application
                              <Typography
                                variant="body2"
                                sx={{
                                  mb: 0.5,
                                  fontSize: { xs: "12px", sm: "14px" },
                                }}
                              >
                                <strong>• Application:</strong>{" "}
                                {item.application || "Oral"}
                              </Typography>
                            ) : item.studyType ===
                                "Microbiology & Virology Study" ||
                              item.studyType === "microbiology-virology" ? (
                              // For Microbiology Study: Show Microorganism Type and Microorganism
                              <>
                                <Typography
                                  variant="body2"
                                  sx={{
                                    mb: 0.5,
                                    fontSize: { xs: "12px", sm: "14px" },
                                  }}
                                >
                                  <strong>• Type of Micro-organism:</strong>{" "}
                                  {(item as any).microorganismType ||
                                    (item as any).selectedMicroorganismType ||
                                    "Not specified"}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  sx={{
                                    mb: 0.5,
                                    fontSize: { xs: "12px", sm: "14px" },
                                  }}
                                >
                                  <strong>• Micro-organism:</strong>{" "}
                                  {getDisplayMicroorganism(item)}
                                </Typography>
                              </>
                            ) : (
                              // For Invitro Study: Show Therapeutic Areas
                              <Typography
                                variant="body2"
                                sx={{
                                  mb: 0.5,
                                  fontSize: { xs: "12px", sm: "14px" },
                                }}
                              >
                                <strong>• Therapeutic Areas:</strong>{" "}
                                {(item as any).selectedTherapeuticAreas
                                  ? (item as any).selectedTherapeuticAreas.join(
                                      ", "
                                    )
                                  : "Not specified"}
                              </Typography>
                            )}
                          </Box>
                        </Box>

                        {/* Guidelines */}
                        {((item.selectedGuidelines &&
                          item.selectedGuidelines.length > 0) ||
                          ((item.studyType ===
                            "Microbiology & Virology Study" ||
                            item.studyType === "microbiology-virology") &&
                            (item as any).selectedStudies &&
                            (item as any).selectedStudies.length > 0)) && (
                          <Box>
                            <Typography
                              variant="body2"
                              sx={{
                                fontWeight: "bold",
                                mb: 1,
                                fontSize: { xs: "12px", sm: "14px" },
                                color: "#115293",
                              }}
                            >
                              Guidelines:
                            </Typography>
                            <Box
                              sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: "10px",
                              }}
                            >
                              {[
                                ...new Set(
                                  item.studyType ===
                                    "Microbiology & Virology Study" ||
                                  item.studyType === "microbiology-virology"
                                    ? (item as any).selectedStudies
                                    : item.selectedGuidelines
                                ),
                              ].map((guideline, guidelineIndex) => (
                                <Tooltip
                                  key={guidelineIndex}
                                  title={guideline}
                                  arrow
                                  placement="top"
                                >
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      backgroundColor: "transparent",
                                      borderRadius: "4px",
                                      border: "1.5px solid #115293",
                                      cursor: "pointer",
                                      width: 148,
                                      height: 28,
                                      opacity: 1,
                                      paddingRight: "8px",
                                      paddingLeft: "8px",
                                      "&:hover": {
                                        backgroundColor:
                                          "rgba(17, 82, 147, 0.1)",
                                        borderColor: "#0d3d6b",
                                      },
                                    }}
                                    onClick={() =>
                                      handleGuidelineClick(
                                        guideline,
                                        item.category,
                                        (item as any)
                                          .selectedTherapeuticAreas?.[0],
                                        item.studyType
                                      )
                                    }
                                  >
                                    <Typography
                                      variant="body2"
                                      sx={{
                                        flex: 1,
                                        fontSize: { xs: "10px", sm: "12px" },
                                        color: "#115293",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap",
                                        fontWeight: 500,
                                      }}
                                    >
                                      {guideline}
                                    </Typography>
                                    <ChevronRightIcon
                                      sx={{
                                        fontSize: { xs: 12, sm: 14 },
                                        color: "#115293",
                                      }}
                                    />
                                  </Box>
                                </Tooltip>
                              ))}
                            </Box>
                          </Box>
                        )}
                      </Box>

                      {/* Action Buttons - Bottom Row */}
                      <Box
                        sx={{
                          display: "flex",
                          gap: { xs: "4px", sm: "8px" },
                          justifyContent: {
                            xs: "space-between",
                            sm: "flex-end",
                          },
                          mt: 2,
                          pb: 1,
                          flexWrap: { xs: "nowrap", sm: "wrap" },
                          width: "100%",
                        }}
                      >
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => addToOrder(item.id)}
                          sx={{
                            background:
                              "linear-gradient(105.34deg, #115293 0%, #1976D2 50%, #115293 100%)",
                            color: "white",
                            textTransform: "none",
                            fontSize: { xs: "9px", sm: "13px" },
                            width: { xs: "calc(50% - 2px)", sm: 136 },
                            minWidth: { xs: "auto", sm: 136 },
                            height: 40,
                            borderRadius: "8px",
                            borderWidth: "2px",
                            opacity: 1,
                            paddingTop: "10px",
                            paddingRight: { xs: "8px", sm: "16px" },
                            paddingBottom: "10px",
                            paddingLeft: { xs: "8px", sm: "16px" },
                            "&:hover": {
                              background:
                                "linear-gradient(105.34deg, #0d3d6b 0%, #1565c0 50%, #0d3d6b 100%)",
                            },
                          }}
                        >
                          {/* Use shorter text on mobile */}
                          <Box
                            component="span"
                            sx={{ display: { xs: "none", sm: "inline" } }}
                          >
                            Add to Cart
                          </Box>
                          <Box
                            component="span"
                            sx={{ display: { xs: "inline", sm: "none" } }}
                          >
                            Add
                          </Box>
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => handleDeleteClick(item.id)}
                          sx={{
                            borderColor: "#115293",
                            color: "#115293",
                            textTransform: "none",
                            fontSize: { xs: "9px", sm: "13px" },
                            width: { xs: "calc(50% - 2px)", sm: 136 },
                            minWidth: { xs: "auto", sm: 136 },
                            height: 40,
                            borderRadius: "8px",
                            borderWidth: "2px",
                            opacity: 1,
                            paddingTop: "10px",
                            paddingRight: { xs: "8px", sm: "16px" },
                            paddingBottom: "10px",
                            paddingLeft: { xs: "8px", sm: "16px" },
                            "&:hover": {
                              borderColor: "#0d3d6b",
                              backgroundColor: "rgba(25, 118, 210, 0.1)",
                            },
                          }}
                        >
                          Delete
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </Card>
              );
            })}
          </Box>
        )}
      </Box>

      {/* Footer */}
      <Box sx={{ flexShrink: 0, position: "relative", zIndex: 1 }}>
        <FooterSection />
      </Box>

      {/* Order Summary Modal */}
      {currentCartItem && (
        <OrderSummaryModal
          isOpen={showOrderSummary}
          onClose={handleCloseOrderSummary}
          onNext={handleNextStep}
          onGenerateQuotation={handleGenerateQuotation}
          category={currentCartItem.category || "Invitro Study"}
          sampleForm={currentCartItem.sampleForm || "Tablets"}
          sampleSolvent={
            currentCartItem.sampleSolvent || "Buffered Aqueous Solutions"
          }
          application="Invitro Study"
          numSamples={currentCartItem.numSamples || 1}
          selectedGuidelines={currentCartItem.selectedGuidelines || []}
          sampleFormGuidelines={currentCartItem.sampleFormGuidelines || []}
          sampleSolventGuidelines={
            currentCartItem.sampleSolventGuidelines || []
          }
          selectedTherapeuticAreas={
            currentCartItem.selectedTherapeuticAreas || []
          }
          expandedOrderAccordion={false}
          onNumSamplesChange={() => {}}
          onOrderAccordionChange={() => () => {}}
          onRemoveGuideline={() => {}}
          isCheckoutMode={isCheckoutMode}
          cartItems={cartItems}
          onEditOrder={() => {}}
        />
      )}

      {/* Guideline Detail Modal */}
      {currentStudyType === "Invitro Study" ? (
        <InvitroGuidelineDetailModal
          isOpen={showGuidelineDetails}
          onClose={() => setShowGuidelineDetails(false)}
          selectedGuideline={selectedGuideline || ""}
          selectedProductType={
            cartItems.find((item) =>
              item.selectedGuidelines?.includes(selectedGuideline || "")
            )?.category || ""
          }
          selectedTherapeuticArea={selectedTherapeuticArea || ""}
        />
      ) : (
        <ToxicityGuidelineDetailModal
          isOpen={showGuidelineDetails}
          onClose={() => setShowGuidelineDetails(false)}
          selectedGuideline={selectedGuideline || ""}
          category={selectedTherapeuticArea || ""}
        />
      )}

      {/* Customer Details Modal */}
      <CustomerDetailsModal
        isOpen={showCustomerDetails}
        onClose={handleCustomerDetailsClose}
        onBack={handleCustomerDetailsClose}
        onGenerateQuotation={handleCustomerDetailsNext}
        customerName={customerName}
        customerEmail={customerEmail}
        customerPhone={customerPhone}
        customerCompany={customerCompany}
        customerCountry={customerCountry}
        onCustomerNameChange={setCustomerName}
        onCustomerEmailChange={setCustomerEmail}
        onCustomerPhoneChange={setCustomerPhone}
        onCustomerCompanyChange={setCustomerCompany}
        onCustomerCountryChange={setCustomerCountry}
      />

      {/* Quotation Generation Modal */}
      <QuotationGenerationModal
        isOpen={showQuotation}
        onClose={() => {
          setShowQuotation(false);
          // Clear the quotation cart items when modal is closed
          setQuotationCartItems([]);
        }}
        category="Multiple Categories"
        sampleForm="Multiple Forms"
        sampleSolvent="Multiple Solvents"
        application="Invitro Study"
        numSamples={quotationCartItems.reduce(
          (sum, item) => sum + item.numSamples,
          0
        )}
        selectedGuidelines={quotationCartItems.flatMap(
          (item) => item.selectedGuidelines || []
        )}
        sampleFormGuidelines={quotationCartItems.flatMap(
          (item) => item.sampleFormGuidelines || []
        )}
        sampleSolventGuidelines={quotationCartItems.flatMap(
          (item) => item.sampleSolventGuidelines || []
        )}
        cartItems={quotationCartItems}
        isCheckoutMode={true}
        customerName={customerName}
        customerEmail={customerEmail}
        customerPhone={customerPhone}
        customerCompany={customerCompany}
        customSampleForm=""
        customSampleSolvent=""
        customApplication=""
      />

      {/* Proceed to Order Notification Modal */}
      {showProceedModal && (
        <Box
          sx={{
            position: "fixed",
            bottom: { xs: 10, sm: 20 },
            right: { xs: 10, sm: 20 },
            left: { xs: 10, sm: "auto" },
            zIndex: 1500,
            background: "transparent",
            borderRadius: "12px",
            padding: { xs: "12px", sm: "16px" },
            boxShadow: "0 12px 40px rgba(0, 0, 0, 0.2)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(25, 118, 210, 0.1)",
            minWidth: { xs: "280px", sm: "300px" },
            maxWidth: { xs: "calc(100vw - 20px)", sm: "400px" },
            animation: "slideInFromRight 0.3s ease-out",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: "8px",
                background: "#115293",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mr: 2,
                "&:hover": {
                  backgroundColor: "#3770A9",
                },
              }}
            >
              <ShoppingCartIcon sx={{ color: "white", fontSize: "1.2rem" }} />
            </Box>
            <Typography variant="body1" sx={{ fontWeight: 600, color: "#333" }}>
              {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              size="medium"
              onClick={handleProceedConfirm}
              sx={{
                py: 1,
                px: 6,
                minWidth: "180px",
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
              Proceed
            </Button>
          </Box>
        </Box>
      )}

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationModal
        isOpen={deleteConfirmOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Confirm Delete"
        message="Are you sure you want to remove this item from your cart? This action cannot be undone."
        confirmButtonText="Delete"
        cancelButtonText="Cancel"
      />
    </Box>
  );
}
