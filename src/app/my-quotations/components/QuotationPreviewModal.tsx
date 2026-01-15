/**
 * @fileoverview Quotation Preview Modal Component - Shows quotation in PDF format
 */

"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useScrollLock } from "../../../hooks/useScrollLock";
import {
  Box,
  Typography,
  Paper,
  IconButton,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useTheme } from "@mui/material/styles";
import { useUser } from "@clerk/nextjs";
import { getGuidelineData as getToxicityGuidelineData } from "../../pricing/toxicity-study/data/guidelineData";
import { getGuidelineData as getInvitroGuidelineData } from "../../pricing/invitro-study/data/guidelineData";

interface QuotationPreviewModalProps {
  open: boolean;
  onClose: () => void;
  item: any; // Item data
}

export default function QuotationPreviewModal({
  open,
  onClose,
  item,
}: QuotationPreviewModalProps) {
  const theme = useTheme();
  const { user } = useUser();
  const [mounted, setMounted] = useState(false);

  // Set mounted to true on client side
  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll when modal is open
  useScrollLock(open);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  const calculatePricing = () => {
    // item.amount is the base amount (excluding GST), add GST to get grand total
    // This matches the admin panel calculation: baseAmount * 1.18 = grandTotal
    const baseAmount = item.amount;
    const gstAmount = Math.round(baseAmount * 0.18);
    const grandTotal = Math.round(baseAmount * 1.18);

    return { baseAmount, gstAmount, grandTotal };
  };

  const { baseAmount, gstAmount, grandTotal } = calculatePricing();

  // Guard after all hooks are declared to keep hook order stable
  if (!open || !mounted || !item) return null;

  // Get individual guidelines/studies for display
  // IMPORTANT: Always use baseAmount (item.amount) to calculate prices, not original guideline prices
  // This ensures the displayed prices match the actual quotation amount
  const getIndividualItems = () => {
    // For Microbiology & Virology Study, use selectedStudies
    if (
      item.studyType === "Microbiology & Virology Study" &&
      item.selectedStudies?.length > 0
    ) {
      // Divide baseAmount equally among all studies
      const pricePerStudy = Math.round(
        baseAmount / item.selectedStudies.length
      );
      // Unit price per sample = price per study / number of samples
      const unitPricePerSample = Math.round(
        pricePerStudy / item.numberOfSamples
      );

      return item.selectedStudies.map((study: string) => ({
        name: study,
        qty: item.numberOfSamples,
        unitPrice: unitPricePerSample,
        totalPrice: pricePerStudy,
      }));
    }

    // For other studies, use selectedGuidelines
    if (item.selectedGuidelines?.length > 0) {
      // Always divide baseAmount equally among guidelines
      // This ensures prices match the actual quotation amount
      const pricePerGuideline = Math.round(
        baseAmount / item.selectedGuidelines.length
      );
      const unitPricePerGuideline = Math.round(
        pricePerGuideline / item.numberOfSamples
      );

      return item.selectedGuidelines.map((guideline: string) => ({
        name: guideline,
        qty: item.numberOfSamples,
        unitPrice: unitPricePerGuideline,
        totalPrice: pricePerGuideline,
      }));
    }

    // Fallback to study type
    return [
      {
        name: item.studyType,
        qty: item.numberOfSamples,
        unitPrice: Math.round(baseAmount / item.numberOfSamples),
        totalPrice: baseAmount,
      },
    ];
  };

  const individualItems = getIndividualItems();

  const formatDate = (dateString: string) => {
    if (!dateString) return "Invalid Date";
    
    // Handle different date formats
    let date: Date;
    
    // Check if it's already in DD/MM/YYYY format
    if (dateString.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
      const [day, month, year] = dateString.split('/');
      date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    } 
    // Check if it's in ISO format (YYYY-MM-DD or YYYY-MM-DDTHH:mm:ss.sssZ)
    else if (dateString.match(/^\d{4}-\d{2}-\d{2}/)) {
      date = new Date(dateString);
    }
    // Try parsing as-is
    else {
      date = new Date(dateString);
    }
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }
    
    return date.toLocaleDateString("en-GB");
  };

  const modalContent = (
    <>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: { xs: "100%", sm: "100%", md: "700px" },
          height: "100vh",
          maxWidth: { xs: "100vw", sm: "100vw", md: "700px" },
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
              Quotation
            </Typography>
          </Box>
        </Box>

        {/* Content Area - Scrollable */}
        <Box sx={{ flex: 1, overflow: "auto" }}>
          {/* Quotation Content */}
          <Box sx={{ p: { xs: 2, md: 3 } }}>
            <Paper
              sx={{
                p: { xs: 2, md: 3 },
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(10px)",
                borderRadius: "12px",
                boxShadow: theme.shadows[3],
                border: "1px solid rgba(25, 118, 210, 0.1)",
                mb: 3,
              }}
            >
              {/* Header Section - Logo and Quotation Details */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 3,
                  backgroundColor: "white",
                  color: "black",
                  fontFamily: "Arial, sans-serif",
                }}
              >
                {/* Left Side - Company Logo and Info */}
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    {/* Logo Image */}
                    <Box sx={{ mr: 2, position: "relative" }}>
                      <img
                        src="/assets/images/logo.png"
                        alt="RADIANT RESEARCH Logo"
                        style={{
                          width: 120,
                          height: 80,
                          objectFit: "contain",
                        }}
                        onError={(e) => {
                          // Fallback to styled text if image fails to load
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
                    Quotation #{item.quotationNo}
                  </Typography>
                  <Typography sx={{ fontSize: "10px", color: "#666", mb: 0.5 }}>
                    Created Date: {formatDate(item.createdOn || item.createdAt || item.created_on)}
                  </Typography>
                  <Typography sx={{ fontSize: "10px", color: "#666", mb: 2 }}>
                    Expiry Date: {formatDate(item.validTill || item.valid_till)}
                  </Typography>
                </Box>
              </Box>

              {/* Company Info and Customer Info */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 3,
                  flexDirection: { xs: "column", sm: "row" },
                  gap: { xs: 2, sm: 0 },
                }}
              >
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, mb: 1, fontSize: "1rem" }}
                  >
                    From:
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontSize: "0.8rem", lineHeight: 1.4 }}
                  >
                    Radiant Research Services Pvt Ltd
                    <br />
                    Plot No.99/A, 8th Main Road, IIIrd Phase,
                    <br />
                    Peenya Industrial Area, Bengaluru, Karnataka, India 560058
                    <br />
                    info@radiantresearch.in
                    <br />
                    +91 80505 16699
                    <br />
                    GSTIN: 29AAECR5347Q2ZJ
                  </Typography>
                </Box>
                <Box sx={{ flex: 1, textAlign: { xs: "left", sm: "right" } }}>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, mb: 1, fontSize: "1rem" }}
                  >
                    To:
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontSize: "0.8rem", lineHeight: 1.4 }}
                  >
                    {(item.customer_name || (item as any).customerName) ||
                      user?.fullName ||
                      (user?.firstName && user?.lastName
                        ? `${user?.firstName} ${user?.lastName}`
                        : user?.firstName) ||
                      user?.emailAddresses?.[0]?.emailAddress?.split("@")[0] ||
                      "Customer Name"}
                    <br />
                    {(item.customer_company || (item as any).customerCompany) ||
                      (user?.publicMetadata?.company as string) ||
                      ""}
                    <br />
                    {(item.customer_email || (item as any).customerEmail) ||
                      user?.emailAddresses?.[0]?.emailAddress ||
                      "customer@email.com"}
                    <br />
                    {(item.customer_phone || (item as any).customerPhone) ||
                      user?.phoneNumbers?.[0]?.phoneNumber ||
                      (user?.publicMetadata?.phone as string) ||
                      "0000000000"}
                  </Typography>
                </Box>
              </Box>

              {/* Items Table */}
              <Box
                sx={{
                  mb: 3,
                  overflowX: "auto",
                  overflowY: "auto",
                  maxHeight: "400px",
                  "&::-webkit-scrollbar": {
                    width: "8px",
                    height: "8px",
                  },
                  "&::-webkit-scrollbar-track": {
                    backgroundColor: "#f1f1f1",
                    borderRadius: "4px",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: "4px",
                    "&:hover": {
                      backgroundColor: theme.palette.primary.dark,
                    },
                  },
                }}
              >
                <Table
                  sx={{
                    border: "1px solid #ddd",
                    tableLayout: "fixed",
                    minWidth: "600px",
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
                          fontSize: "10px",
                          fontWeight: "bold",
                          padding: "8px",
                          border: "1px solid #ddd",
                          whiteSpace: "nowrap",
                        }}
                      >
                        S.No
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: "9px",
                          fontWeight: "bold",
                          padding: "8px",
                          border: "1px solid #ddd",
                        }}
                      >
                        Product Description
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: "9px",
                          fontWeight: "bold",
                          padding: "8px",
                          border: "1px solid #ddd",
                        }}
                      >
                        Guidelines
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: "9px",
                          fontWeight: "bold",
                          padding: "8px",
                          border: "1px solid #ddd",
                          textAlign: "center",
                        }}
                      >
                        Quantity
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: "9px",
                          fontWeight: "bold",
                          padding: "8px",
                          border: "1px solid #ddd",
                          textAlign: "center",
                        }}
                      >
                        Unit Price
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: "9px",
                          fontWeight: "bold",
                          padding: "8px",
                          border: "1px solid #ddd",
                          textAlign: "center",
                        }}
                      >
                        Total Price
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {individualItems.map((guideline, index) => (
                      <TableRow key={index}>
                        {index === 0 && (
                          <>
                            <TableCell
                              rowSpan={individualItems.length}
                              sx={{
                                fontSize: "10px",
                                padding: "8px",
                                border: "1px solid #ddd",
                                verticalAlign: "top",
                              }}
                            >
                              1
                            </TableCell>
                            <TableCell
                              rowSpan={individualItems.length}
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
                                  {item.studyType}
                                </Typography>
                                <Typography
                                  sx={{
                                    fontSize: "9px",
                                    mb: 0.2,
                                  }}
                                >
                                  <span style={{ fontWeight: "bold" }}>
                                    Sample Description:
                                  </span>{" "}
                                  <span
                                    style={{
                                      color: theme.palette.primary.main,
                                    }}
                                  >
                                    {item.sampleDescription ||
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
                                  <span style={{ fontWeight: "bold" }}>
                                    Product Type:
                                  </span>{" "}
                                  {item.category}
                                </Typography>
                                <Typography
                                  sx={{
                                    fontSize: "9px",
                                    mb: 0.2,
                                  }}
                                >
                                  •{" "}
                                  <span style={{ fontWeight: "bold" }}>
                                    Sample Form:
                                  </span>{" "}
                                  {item.sampleForm}
                                </Typography>
                                <Typography
                                  sx={{
                                    fontSize: "9px",
                                    mb: 0.2,
                                  }}
                                >
                                  •{" "}
                                  <span style={{ fontWeight: "bold" }}>
                                    Sample Solvent:
                                  </span>{" "}
                                  {item.sampleSolvent}
                                </Typography>

                                {/* Conditional fields based on study type */}
                                {item.studyType ===
                                "Microbiology & Virology Study" ? (
                                  <>
                                    {/* Type of Micro-organism for Microbiology Study */}
                                    {item.typeOfMicroorganism && (
                                      <Typography
                                        sx={{
                                          fontSize: "9px",
                                          mb: 0.2,
                                        }}
                                      >
                                        •{" "}
                                        <span style={{ fontWeight: "bold" }}>
                                          Type of Micro-organism:
                                        </span>{" "}
                                        {item.typeOfMicroorganism}
                                      </Typography>
                                    )}

                                    {/* Micro-organism for Microbiology Study */}
                                    {item.microorganism && (
                                      <Typography
                                        sx={{
                                          fontSize: "9px",
                                          mb: 0.2,
                                        }}
                                      >
                                        •{" "}
                                        <span style={{ fontWeight: "bold" }}>
                                          Micro-organism:
                                        </span>{" "}
                                        {item.microorganism}
                                      </Typography>
                                    )}
                                  </>
                                ) : item.studyType === "Invitro Study" ? (
                                  <>
                                    {/* Therapeutic Areas for Invitro Study */}
                                    {item.therapeuticAreas && (
                                      <Typography
                                        sx={{
                                          fontSize: "9px",
                                          mb: 0.2,
                                        }}
                                      >
                                        •{" "}
                                        <span style={{ fontWeight: "bold" }}>
                                          Therapeutic Areas:
                                        </span>{" "}
                                        {item.therapeuticAreas}
                                      </Typography>
                                    )}
                                  </>
                                ) : (
                                  <>
                                    {/* Application for other studies (like Toxicity Study) */}
                                    {item.application && (
                                      <Typography
                                        sx={{
                                          fontSize: "9px",
                                          mb: 0.2,
                                        }}
                                      >
                                        •{" "}
                                        <span style={{ fontWeight: "bold" }}>
                                          Application:
                                        </span>{" "}
                                        {item.application}
                                      </Typography>
                                    )}
                                  </>
                                )}
                              </Box>
                            </TableCell>
                          </>
                        )}
                        <TableCell
                          sx={{
                            fontSize: "10px",
                            padding: "8px",
                            border: "1px solid #ddd",
                          }}
                        >
                          {guideline.name}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontSize: "10px",
                            padding: "8px",
                            border: "1px solid #ddd",
                            textAlign: "center",
                          }}
                        >
                          {guideline.qty}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontSize: "10px",
                            padding: "8px",
                            border: "1px solid #ddd",
                            textAlign: "right",
                          }}
                        >
                          {formatCurrency(guideline.unitPrice)}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontSize: "10px",
                            padding: "8px",
                            border: "1px solid #ddd",
                            textAlign: "right",
                          }}
                        >
                          {formatCurrency(guideline.totalPrice)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>

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
                    Sub total (excl. Tax): {formatCurrency(baseAmount)}
                  </Typography>
                  <Typography
                    sx={{ fontSize: "10px", color: "#333", mb: 0.5 }}
                  >
                    GST: 18% {formatCurrency(gstAmount)}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "10px",
                      fontWeight: "bold",
                      color: "#333",
                    }}
                  >
                    Grand Total: {formatCurrency(grandTotal)}
                  </Typography>
                </Box>
              </Box>

              {/* Terms and Conditions */}
              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, mb: 2, fontSize: "1rem" }}
                >
                  Terms and Conditions:
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    lineHeight: 1.6,
                    fontSize: "0.8rem",
                  }}
                >
                  1) This quotation is valid for 30 days from the date of issue
                  unless otherwise stated.
                  <br />
                  2) Samples will be stored only for 30 days after the report
                  delivery.
                  <br />
                  3) The scope of this project includes only testing mentioned
                  above and during analysis, if additional services are needed,
                  then those will be charged extra.
                  <br />
                  4) The identity and composition of the test item is the
                  responsibility of the sponsor. No analysis will be performed
                  at Radiant Research Services Pvt Ltd to confirm it.
                </Typography>
              </Box>

              <Box sx={{ textAlign: "center", mt: 2 }}>
                <Typography
                  variant="caption"
                  sx={{ color: "text.secondary", fontSize: "0.75rem" }}
                >
                  Please use {item.quotationNo} as a further reference number
                </Typography>
              </Box>
            </Paper>
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
          zIndex: 99998,
        }}
        onClick={onClose}
      />
    </>
  );

  return createPortal(modalContent, document.body);
}
