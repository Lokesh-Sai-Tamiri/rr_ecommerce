/**
 * @fileoverview Hook for fetching and managing user cart items from database
 */

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { getStoredCartItems, CartItem } from "../utils/cartStorage";

interface UseUserCartItemsProps {
  autoFetch?: boolean;
  status?: string;
  sessionId?: string;
}

interface TransformedCartItem {
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
  // Additional fields from cart
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
}

export function useUserCartItems({
  autoFetch = true,
  status = undefined,
  sessionId,
}: UseUserCartItemsProps = {}) {
  const { user } = useUser();
  const [cartItems, setCartItems] = useState<TransformedCartItem[]>([]);
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

  const isValidDate = (dateStr: string): boolean => {
    if (!dateStr) return false;

    try {
      let createdDate;

      // Handle different date formats
      if (dateStr.includes("/")) {
        // Handle DD/MM/YYYY format (from en-GB locale)
        const parts = dateStr.split("/");
        if (parts.length === 3) {
          const [first, second, year] = parts;

          // Determine if it's DD/MM/YYYY or MM/DD/YYYY
          // If first part is > 12, it's DD/MM/YYYY
          // If second part is > 12, it's MM/DD/YYYY
          // If both <= 12, assume DD/MM/YYYY (European format)
          let day, month;

          if (parseInt(first) > 12) {
            // DD/MM/YYYY format
            day = parseInt(first);
            month = parseInt(second);
          } else if (parseInt(second) > 12) {
            // MM/DD/YYYY format
            month = parseInt(first);
            day = parseInt(second);
          } else {
            // Both <= 12, default to DD/MM/YYYY
            day = parseInt(first);
            month = parseInt(second);
          }

          createdDate = new Date(parseInt(year), month - 1, day);
        } else {
          createdDate = new Date(dateStr);
        }
      } else {
        createdDate = new Date(dateStr);
      }

      // Check if date is valid
      if (isNaN(createdDate.getTime())) {
        return false;
      }

      // For cart items, consider them expired if they're 30+ days old
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const isValid = createdDate >= thirtyDaysAgo;

      return isValid;
    } catch (error) {
      return false;
    }
  };

  const transformCartItemData = (cartItem: any): TransformedCartItem => {
    // Handle both snake_case (from database) and camelCase (from frontend)
    const data = {
      id: cartItem.id,
      configNo: cartItem.config_no || cartItem.configNo,
      studyType: cartItem.study_type || cartItem.studyType,
      category: cartItem.category,
      sampleForm: cartItem.sample_form || cartItem.sampleForm,
      sampleSolvent: cartItem.sample_solvent || cartItem.sampleSolvent,
      application: cartItem.application,
      numSamples: cartItem.num_samples || cartItem.numSamples,
      price: cartItem.price || 0,
      finalPrice: cartItem.final_price || cartItem.finalPrice || null,
      createdOn: cartItem.created_on || cartItem.createdOn,
      validTill: cartItem.valid_till || cartItem.validTill,
      description: cartItem.description,
      selectedGuidelines: cartItem.selectedGuidelines || [],
      sampleFormGuidelines: cartItem.sampleFormGuidelines || [],
      sampleSolventGuidelines: cartItem.sampleSolventGuidelines || [],
      applicationGuidelines: cartItem.applicationGuidelines || [],
      selectedTherapeuticAreas: cartItem.selectedTherapeuticAreas || [],
      selectedMicroorganismType:
        cartItem.selected_microorganism_type ||
        cartItem.selectedMicroorganismType,
      selectedMicroorganism: cartItem.selectedMicroorganism || [],
      customMicroorganism:
        cartItem.custom_microorganism || cartItem.customMicroorganism,
      selectedStudies: cartItem.selectedStudies || [],
      customSampleForm:
        cartItem.custom_sample_form || cartItem.customSampleForm,
      customSampleSolvent:
        cartItem.custom_sample_solvent || cartItem.customSampleSolvent,
      sessionId: cartItem.session_id || cartItem.sessionId,
      cartStatus: cartItem.status || "pending",
      status: cartItem.status || "pending", // Add explicit status mapping
      createdAt: cartItem.created_at || cartItem.createdAt,
      updatedAt: cartItem.updated_at || cartItem.updatedAt,
      // Customer fields from API - handle both snake_case (from database) and camelCase (from frontend)
      customer_name: cartItem.customer_name || cartItem.customerName,
      customer_email: cartItem.customer_email || cartItem.customerEmail,
      customer_phone: cartItem.customer_phone || cartItem.customerPhone,
      customer_company: cartItem.customer_company || cartItem.customerCompany,
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

      // Handle slash-separated dates - simplified logic for consistency
      if (dateStr.includes("/")) {
        const parts = dateStr.split("/");
        if (parts.length === 3) {
          const [first, second, year] = parts.map((p) => parseInt(p));
          let day, month;

          // Simple rule: if first part > 12, it's DD/MM/YYYY
          // Otherwise, assume it's MM/DD/YYYY and convert to DD/MM/YYYY
          if (first > 12) {
            // Already in DD/MM/YYYY format
            day = first;
            month = second;
          } else {
            // Assume MM/DD/YYYY format and convert to DD/MM/YYYY
            month = first;
            day = second;
          }

          // Validate the result
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
          // Assume DD/MM/YYYY when using slashes in our display layer
          d = new Date(year, second - 1, first);
        } else {
          d = new Date(dateStr);
        }
        if (isNaN(d.getTime())) return false;
        const today = new Date();
        today.setHours(23, 59, 59, 999); // Set to end of today
        d.setHours(23, 59, 59, 999); // Set to end of valid till date
        return d < today; // Only expired if valid till date is completely past
      } catch {
        return false;
      }
    };

    // Calculate amount with intelligent pricing based on actual data
    const getStudyAmount = (
      studyType: string,
      price: number | null | undefined,
      finalPrice: number | null | undefined,
      cartData: any
    ): number => {
      console.log("getStudyAmount called with:", {
        studyType,
        selectedGuidelines: cartData.selectedGuidelines,
        numSamples: cartData.numSamples,
        price,
        finalPrice,
      });

      // Always prefer final_price when it's available and > 0, otherwise use price
      const effectivePrice =
        finalPrice != null && Number(finalPrice) > 0 ? finalPrice : price;

      // Always prefer the database price when it's available and > 0
      if (effectivePrice != null && Number(effectivePrice) > 0) {
        const numericPrice =
          typeof effectivePrice === "string"
            ? parseFloat(effectivePrice)
            : Number(effectivePrice);
        const numSamples = cartData.numSamples || 1;

        // For Microbiology & Virology Study, the API price already includes num_samples
        let totalBasePrice: number;
        if (studyType === "Microbiology & Virology Study") {
          // API price already includes samples, use as-is
          totalBasePrice = numericPrice;
          console.log(
            `Using ${finalPrice != null && Number(finalPrice) > 0 ? "final_price" : "price"} (Microbiology - API includes samples):`,
            {
              unitPrice: numericPrice,
              numSamples: numSamples,
              totalBasePrice: totalBasePrice,
              note: "No multiplication - API price already includes samples",
            }
          );
        } else {
          // For other studies, multiply by number of samples
          totalBasePrice = numericPrice * numSamples;
          console.log(
            `Using ${finalPrice != null && Number(finalPrice) > 0 ? "final_price" : "price"} (Standard - multiply by samples):`,
            {
              unitPrice: numericPrice,
              numSamples: numSamples,
              totalBasePrice: totalBasePrice,
            }
          );
        }
        return totalBasePrice;
      }

      // For Invitro Study, calculate detailed pricing based on guidelines or therapeutic areas
      if (studyType === "Invitro Study") {
        const numSamples = cartData.numSamples || 1;
        let totalAmount = 0;

        // Check if we have selectedGuidelines (actual study names) or therapeutic areas
        const hasGuidelines =
          cartData.selectedGuidelines && cartData.selectedGuidelines.length > 0;
        const hasTherapeuticAreas =
          cartData.selectedTherapeuticAreas &&
          cartData.selectedTherapeuticAreas.length > 0;

        console.log("🧪 Calculating Invitro Study pricing");
        console.log("Guidelines:", cartData.selectedGuidelines);
        console.log("Therapeutic Areas:", cartData.selectedTherapeuticAreas);

        if (hasGuidelines) {
          // Use actual study names for pricing
          cartData.selectedGuidelines.forEach((guideline: string) => {
            let guidelinePrice = 0;

            // Specific pricing for Invitro guidelines based on PDF values and guideline data
            if (
              guideline
                .toLowerCase()
                .includes("abts radical scavenging assay") ||
              guideline.toLowerCase().includes("abts")
            ) {
              guidelinePrice = 4000; // ₹4,000 as per PDF
            } else if (
              guideline
                .toLowerCase()
                .includes("hydroxyl radical scavenging assay") ||
              guideline.toLowerCase().includes("hydroxyl")
            ) {
              guidelinePrice = 3500; // ₹3,500 as per PDF
            } else if (
              guideline
                .toLowerCase()
                .includes("dpph radical scavenging assay") ||
              guideline.toLowerCase().includes("dpph")
            ) {
              guidelinePrice = 3500; // ₹3,500
            } else if (
              guideline
                .toLowerCase()
                .includes(
                  "glucose uptake assay by non-radio labelled assay in l6 cell line"
                ) ||
              guideline
                .toLowerCase()
                .includes(
                  "in vitro glucose uptake assay by non-radio labelled assay in l6 cell line"
                )
            ) {
              guidelinePrice = 28000; // ₹28,000 as per guideline data
            } else if (
              guideline
                .toLowerCase()
                .includes("glucose uptake in isolated rat hemi diaphragm") ||
              guideline
                .toLowerCase()
                .includes(
                  "in vitro glucose uptake in isolated rat hemi diaphragm"
                )
            ) {
              guidelinePrice = 28000; // ₹28,000 as per guideline data
            } else if (
              guideline
                .toLowerCase()
                .includes("alpha- amylase inhibitory activity") ||
              guideline
                .toLowerCase()
                .includes("alpha-amylase inhibitory activity")
            ) {
              guidelinePrice = 10000; // ₹10,000 as per guideline data
            } else if (
              guideline.toLowerCase().includes("alpha- glucosidase activity") ||
              guideline.toLowerCase().includes("alpha-glucosidase activity")
            ) {
              guidelinePrice = 12000; // ₹12,000 as per guideline data
            } else if (
              guideline.toLowerCase().includes("glucose uptake") &&
              guideline.toLowerCase().includes("anti-diabetic")
            ) {
              guidelinePrice = 28000; // ₹28,000 for anti-diabetic glucose uptake studies
            } else if (guideline.toLowerCase().includes("cell proliferative")) {
              guidelinePrice = 4500; // ₹4,500
            } else if (
              guideline.toLowerCase().includes("anti-stress") ||
              guideline.toLowerCase().includes("determination of anti-stress")
            ) {
              guidelinePrice = 4000; // ₹4,000
            } else if (guideline.toLowerCase().includes("cytotoxicity")) {
              guidelinePrice = 4200; // ₹4,200
            } else if (guideline.toLowerCase().includes("antioxidant")) {
              guidelinePrice = 3800; // ₹3,800
            } else if (guideline.toLowerCase().includes("antimicrobial")) {
              guidelinePrice = 3600; // ₹3,600
            } else if (
              guideline.toLowerCase().includes("anti-diabetic") ||
              guideline.toLowerCase().includes("antidiabetic")
            ) {
              guidelinePrice = 28000; // ₹28,000 for general anti-diabetic studies
            } else {
              // Default pricing for other Invitro guidelines
              guidelinePrice = 25000; // ₹25,000 default
            }

            totalAmount += guidelinePrice * numSamples;
            console.log(
              `💰 Guideline: ${guideline} = ₹${guidelinePrice} x ${numSamples} samples = ₹${guidelinePrice * numSamples}`
            );
          });
        } else if (hasTherapeuticAreas) {
          // Map therapeutic areas to their primary studies and use pricing
          cartData.selectedTherapeuticAreas.forEach(
            (therapeuticArea: string) => {
              let areaPrice = 0;

              // Map therapeutic areas to their primary study prices
              if (
                therapeuticArea.toLowerCase().includes("anti-diabetic") ||
                therapeuticArea.toLowerCase().includes("antidiabetic")
              ) {
                areaPrice = 28000; // Primary study: "In vitro Glucose Uptake assay by non-radio labelled assay in L6 cell line"
              } else if (
                therapeuticArea.toLowerCase().includes("anti-oxidant") ||
                therapeuticArea.toLowerCase().includes("antioxidant")
              ) {
                areaPrice = 4000; // Primary study: ABTS or similar antioxidant assays
              } else if (
                therapeuticArea.toLowerCase().includes("anti-stress") ||
                therapeuticArea.toLowerCase().includes("antistress")
              ) {
                areaPrice = 4000; // Anti-stress studies
              } else if (
                therapeuticArea.toLowerCase().includes("bone health")
              ) {
                areaPrice = 25000; // Bone health studies
              } else if (
                therapeuticArea.toLowerCase().includes("cardio") ||
                therapeuticArea.toLowerCase().includes("cardiovascular")
              ) {
                areaPrice = 25000; // Cardio protective studies
              } else if (
                therapeuticArea.toLowerCase().includes("hepato") ||
                therapeuticArea.toLowerCase().includes("liver")
              ) {
                areaPrice = 25000; // Hepatoprotective studies
              } else if (
                therapeuticArea.toLowerCase().includes("weight") ||
                therapeuticArea.toLowerCase().includes("obesity")
              ) {
                areaPrice = 25000; // Weight management studies
              } else {
                // Default pricing for other therapeutic areas
                areaPrice = 25000;
              }

              totalAmount += areaPrice * numSamples;
              console.log(
                `💰 Therapeutic Area: ${therapeuticArea} = ₹${areaPrice} x ${numSamples} samples = ₹${areaPrice * numSamples}`
              );
            }
          );
        }

        console.log("Total Invitro Study calculated amount:", totalAmount);
        return totalAmount;
      }

      // For Toxicity Study, always recalculate from guidelines to ensure accurate pricing
      if (
        studyType === "Toxicity Study" &&
        cartData.selectedGuidelines &&
        cartData.selectedGuidelines.length > 0
      ) {
        const numSamples = cartData.numSamples || 1;
        let totalAmount = 0;

        console.log(
          "🧪 Recalculating Toxicity Study pricing for guidelines:",
          cartData.selectedGuidelines
        );

        // Detailed pricing for Toxicity Study guidelines
        cartData.selectedGuidelines.forEach((guideline: string) => {
          let guidelinePrice = 0;

          switch (guideline) {
            case "OECD 423": // Acute Oral Toxicity
              guidelinePrice = 60000;
              break;
            case "OECD 408": // Repeated Dose 90-Day Oral Toxicity
              guidelinePrice = 1300000;
              break;
            case "OECD 421": // Reproduction/Developmental Toxicity Screening
              guidelinePrice = 1350000;
              break;
            case "OECD 422": // Combined Repeated Dose Toxicity Study
              guidelinePrice = 1400000;
              break;
            case "OECD 414": // Prenatal Developmental Toxicity Study
              guidelinePrice = 1200000;
              break;
            case "OECD 416": // Two-Generation Reproduction Toxicity Study
              guidelinePrice = 1500000;
              break;
            case "OECD 407": // Repeated Dose 28-day Oral Toxicity Study
              guidelinePrice = 800000;
              break;
            case "OECD 420": // Acute Oral Toxicity - Fixed Dose Procedure
              guidelinePrice = 65000;
              break;
            case "OECD 425": // Acute Oral Toxicity - Up-and-Down Procedure
              guidelinePrice = 70000;
              break;
            case "OECD 471": // Bacterial Reverse Mutation Test
              guidelinePrice = 90000;
              break;
            case "OECD 490": // In Vitro Mammalian Cell Gene Mutation Test
              guidelinePrice = 650000;
              break;
            default:
              // Default pricing for other guidelines
              guidelinePrice = 400000;
              break;
          }

          console.log(
            `Guideline ${guideline}: ₹${guidelinePrice} × ${numSamples} samples = ₹${guidelinePrice * numSamples}`
          );
          totalAmount += guidelinePrice * numSamples;
        });

        console.log("Total Toxicity Study amount:", totalAmount);
        return totalAmount;
      }

      // If we have a valid price from database for other study types, use it
      if (effectivePrice && effectivePrice > 0) {
        console.log(
          `Using database ${finalPrice != null && Number(finalPrice) > 0 ? "final_price" : "price"}:`,
          effectivePrice
        );
        return typeof effectivePrice === "string"
          ? parseFloat(effectivePrice)
          : effectivePrice;
      }

      // Try to calculate from guidelines if available (for other study types)
      if (
        cartData.selectedGuidelines &&
        cartData.selectedGuidelines.length > 0
      ) {
        // For different study types, estimate based on average guideline prices
        const numGuidelines = cartData.selectedGuidelines.length;
        const numSamples = cartData.numSamples || 1;

        switch (studyType) {
          case "Invitro Study":
            // Invitro studies average ₹25,000 per guideline (updated to handle various study types)
            return numGuidelines * 25000 * numSamples;
          case "Microbiology & Virology Study":
            // Microbiology studies average ₹7,500 per guideline
            const microorganismCount = Array.isArray(
              cartData.selectedMicroorganism
            )
              ? cartData.selectedMicroorganism.length
              : 1;
            return numGuidelines * 7500 * microorganismCount * numSamples;
          default:
            return numGuidelines * 25000 * numSamples;
        }
      }

      // Fallback: category-based estimates for studies without guidelines
      switch (studyType) {
        case "Invitro Study":
          return 25000; // Average Invitro study price
        case "Toxicity Study":
          return 400000; // Average Toxicity study price
        case "Microbiology & Virology Study":
          return 7500; // Average Microbiology study price
        default:
          return 0;
      }
    };

    // Calculate Grand Total (subtotal + 18% GST) instead of just subtotal
    const calculateGrandTotal = (subtotal: number): number => {
      const gst = subtotal * 0.18; // 18% GST
      return subtotal + gst;
    };

    // Generate quotation number - extract base number before dash
    const generateQuotationNumber = (
      configNo: string,
      itemId: string
    ): string => {
      console.log(
        "🔍 generateQuotationNumber - configNo:",
        configNo,
        "itemId:",
        itemId
      );

      if (configNo && configNo.startsWith("RR")) {
        // Extract base number before dash (e.g., "RR100169-2" -> "RR100169")
        if (configNo.includes("-")) {
          const baseNumber = configNo.split("-")[0];
          console.log("🔍 Base number extracted:", baseNumber);
          return baseNumber;
        }
        // If no dash, return as is
        console.log("🔍 No dash found, returning configNo as is:", configNo);
        return configNo;
      }
      // Fallback: use last 6 chars of item ID as numbers
      const idNumbers = itemId.replace(/\D/g, "");
      const last6 = idNumbers.slice(-6).padStart(6, "0");
      const fallback = `RR${last6}`;
      console.log("🔍 Fallback quotation number:", fallback);
      return fallback;
    };

    const subtotalAmount = getStudyAmount(
      data.studyType,
      data.price,
      data.finalPrice,
      data
    );
    const grandTotalAmount = calculateGrandTotal(subtotalAmount);

    return {
      id: data.id,
      quotationNo: generateQuotationNumber(data.configNo, data.id),
      title: data.studyType,
      studyType: data.studyType,
      amount: Math.round(subtotalAmount), // This is the final amount including GST from API
      numberOfSamples: data.numSamples,
      createdOn: convertToDisplayFormat(data.createdOn),
      validTill: convertToDisplayFormat(data.validTill),
      status:
        data.status === "pending"
          ? "pending"
          : data.status === "valid"
            ? "valid"
            : data.status === "expired"
              ? "expired"
              : isExpiredByValidTill(data.validTill)
                ? "expired"
                : data.status || "pending",
      sampleDescription: data.description,
      sampleForm: data.sampleForm,
      sampleSolvent: data.sampleSolvent,
      application: data.application,
      therapeuticAreas: data.selectedTherapeuticAreas?.join(", "),
      typeOfMicroorganism: data.selectedMicroorganismType,
      microorganism: data.selectedMicroorganism?.join(", "),
      pdfUrl: "", // Cart items don't have PDFs yet
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
      cartStatus: data.cartStatus,

      // Customer fields from API
      customer_name: data.customer_name,
      customer_email: data.customer_email,
      customer_phone: data.customer_phone,
      customer_company: data.customer_company,
    };
  };

  const fetchCartItems = async () => {
    if (!user?.id) {
      setError(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // If a specific status is provided, fetch just that; otherwise fetch all three
      const statusesToFetch = status
        ? [status]
        : ["pending", "valid", "expired"];

      const results: any[] = [];
      for (const s of statusesToFetch) {
        const response = await getStoredCartItems(
          user.id,
          sessionId,
          s as string
        );
        results.push(
          ...response.map((item: any) => ({
            ...item,
            status: item.status || s,
          }))
        );
      }

      // Deduplicate by id
      const uniqueById = new Map<string, any>();
      results.forEach((r: any) => uniqueById.set(r.id, r));

      const transformedItems = Array.from(uniqueById.values()).map(
        transformCartItemData
      );

      setCartItems(transformedItems);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch cart items"
      );
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  const refreshCartItems = () => {
    fetchCartItems();
  };

  const getActiveCartItems = (): TransformedCartItem[] => {
    return cartItems.filter((item) => item.cartStatus === "pending");
  };

  const getRequestedCartItems = (): TransformedCartItem[] => {
    return cartItems.filter((item) => item.status === "pending");
  };

  const getConvertedCartItems = (): TransformedCartItem[] => {
    return cartItems.filter((item) => item.status === "valid");
  };

  const getValidCartItems = (): TransformedCartItem[] => {
    return cartItems.filter((item) => item.status === "valid");
  };

  const getExpiredCartItems = (): TransformedCartItem[] => {
    return cartItems.filter((item) => item.status === "expired");
  };

  const getCartItemById = (id: string): TransformedCartItem | undefined => {
    return cartItems.find((item) => item.id === id);
  };

  const getCartItemByQuotationNo = (
    quotationNo: string
  ): TransformedCartItem | undefined => {
    return cartItems.find((item) => item.quotationNo === quotationNo);
  };

  // Auto-fetch on mount and when user changes
  useEffect(() => {
    if (autoFetch && user?.id) {
      fetchCartItems();
    }
  }, [user?.id, autoFetch, status, sessionId]);

  return {
    cartItems,
    activeCartItems: getActiveCartItems(),
    requestedCartItems: getRequestedCartItems(),
    convertedCartItems: getConvertedCartItems(),
    validCartItems: getValidCartItems(),
    expiredCartItems: getExpiredCartItems(),
    loading,
    error,
    fetchCartItems,
    refreshCartItems,
    getCartItemById,
    getCartItemByQuotationNo,
  };
}
