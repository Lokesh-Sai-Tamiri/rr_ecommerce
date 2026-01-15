/**
 * @fileoverview My Orders page - Temporarily mirrors My Quotations UI
 */

"use client";

import { Box, Paper, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";

import AppBar from "ui-component/extended/AppBar";
import FooterSection from "views/pages/landing/FooterSection";
import { useScreenDetection } from "views/pages/landing/utils/utils";

// Use Orders-specific content component
import QuotationsSidebar from "../my-quotations/components/QuotationsSidebar";
import OrdersContent from "./components/OrdersContent";

// Data hooks
import { useUserOrders } from "../../hooks/useUserOrders";

export default function MyOrdersPage() {
  const [selectedTab, setSelectedTab] = useState("my-orders");
  const [ordersSubTab, setOrdersSubTab] = useState("pending");
  const screen = useScreenDetection();
  const { user } = useUser();
  const searchParams = useSearchParams();

  // Allow deep link to profile-settings from query string (consistent behavior)
  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam === "profile-settings") {
      setSelectedTab("profile-settings");
    }
  }, [searchParams]);

  // Fetch orders using the new hook
  const {
    pendingOrders,
    deliveredOrders,
    cancelledOrders,
    allOrders,
    loading,
    error,
    refreshOrders,
  } = useUserOrders({ autoFetch: true });

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue);
  };

  const handleSubTabChange = (
    event: React.SyntheticEvent,
    newValue: string
  ) => {
    setOrdersSubTab(newValue);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
        backgroundImage: "url(/assets/images/home-bg.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment:
          screen.isMobile || screen.isTablet ? "scroll" : "fixed",
      }}
    >
      {/* Fixed Header */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1100,
          backdropFilter: "blur(10px)",
        }}
      >
        <AppBar
          sx={{
            background: "transparent",
            boxShadow: "none",
            position: "static",
          }}
          disableSticky={true}
        />
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          pt: "80px",
          pb: "120px",
          px: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <Box sx={{ py: 4, width: "100%" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: { xs: 2, md: 3 },
              height: "100%",
            }}
          >
            {/* Sidebar - Hidden on mobile, shown on desktop */}
            <Box
              sx={{
                width: { xs: 0, md: 300 },
                flexShrink: 0,
                display: { xs: "none", md: "block" },
              }}
            >
              <QuotationsSidebar
                selectedTab={selectedTab}
                onTabChange={handleTabChange}
              />
            </Box>

            {/* Content Area */}
            <Box
              sx={{ flex: 1, minWidth: 0, width: { xs: "100%", md: "auto" } }}
            >
              {selectedTab === "my-orders" && (
                <OrdersContent
                  quotations={[]}
                  cartItems={
                    ordersSubTab === "pending"
                      ? pendingOrders
                      : ordersSubTab === "delivered"
                        ? deliveredOrders
                        : cancelledOrders
                  }
                  subTab={ordersSubTab}
                  onSubTabChange={handleSubTabChange}
                  loading={loading}
                  error={error}
                  onRefresh={refreshOrders}
                  cartLoading={loading}
                  cartError={error}
                  onCartRefresh={refreshOrders}
                  isRealData={!!user?.id}
                />
              )}

              {selectedTab === "profile-settings" && (
                <Paper
                  elevation={1}
                  sx={{
                    borderRadius: 2,
                    overflow: "hidden",
                    backgroundColor: "white",
                    border: "1px solid #e2e8f0",
                    p: 4,
                    textAlign: "center",
                  }}
                >
                  <Typography variant="h6" color="text.secondary">
                    Profile settings will appear here.
                  </Typography>
                </Paper>
              )}
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Fixed Footer */}
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1100,
          backdropFilter: "blur(10px)",
        }}
      >
        <FooterSection />
      </Box>
    </Box>
  );
}