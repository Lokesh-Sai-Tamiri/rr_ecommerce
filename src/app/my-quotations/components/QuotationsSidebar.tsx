/**
 * @fileoverview Quotations Sidebar Component
 */

"use client";

import {
  Box,
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
} from "@mui/material";
import { IconUserCircle } from "@tabler/icons-react";
import {
  IconClipboardList,
  IconSettings,
  IconLogout,
  IconShoppingCart,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useClerk } from "@clerk/nextjs";
import { useState } from "react";
import DeleteConfirmationModal from "../../../components/common/DeleteConfirmationModal";

interface QuotationsSidebarProps {
  selectedTab: string;
  onTabChange: (event: React.SyntheticEvent, newValue: string) => void;
}

const THEME_COLORS = {
  primary: "#115293",
  secondary: "#115293",
  white: "#ffffff",
  background: "rgba(255, 255, 255, 0.95)",
  border: "rgba(17, 82, 147, 0.1)",
};

export default function QuotationsSidebar({
  selectedTab,
  onTabChange,
}: QuotationsSidebarProps) {
  const router = useRouter();
  const { signOut } = useClerk();
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);

  const handleItemClick = (value: string) => {
    if (value === "profile-settings") {
      console.log(
        "🔍 Profile Settings clicked in sidebar - navigating to /my-quotations/profile"
      );
      router.push("/my-quotations/profile");
    } else if (value === "my-quotations") {
      console.log(
        "🔍 My Quotations clicked in sidebar - navigating to /my-quotations"
      );
      router.push("/my-quotations");
    } else if (value === "my-orders") {
      console.log("🔍 My Orders clicked in sidebar - navigating to /my-orders");
      router.push("/my-orders");
    } else if (value === "logout") {
      console.log("🔍 Logout clicked in sidebar - showing confirmation");
      setLogoutConfirmOpen(true);
    } else {
      onTabChange({} as React.SyntheticEvent, value);
    }
  };

  const handleLogoutConfirm = async () => {
    console.log("🔍 Logout confirmed - signing out");
    setLogoutConfirmOpen(false);
    try {
      // Clear local state first to ensure logout works even if Clerk API fails
      localStorage.removeItem('serviceToken');
      localStorage.removeItem('user');

      // Try to sign out from Clerk with timeout protection
      const currentOrigin = window.location.origin;
      
      try {
        // Set a timeout for Clerk signOut to prevent hanging on 504 errors
        const signOutPromise = signOut({ redirectUrl: currentOrigin });
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('SignOut timeout')), 5000)
        );
        
        await Promise.race([signOutPromise, timeoutPromise]);
        console.log("✅ Clerk signOut completed");
      } catch (signOutError) {
        // If Clerk signOut fails (504 timeout or other error), continue with local logout
        console.warn("⚠️ Clerk signOut failed, continuing with local logout:", signOutError);
      }

      // Small delay to ensure Clerk state updates
      await new Promise(resolve => setTimeout(resolve, 100));

      console.log("✅ Logout completed successfully");
      
      // Reload page to ensure consistent state
      window.location.href = "/";
    } catch (error) {
      console.error("❌ Logout error:", error);
      // Fallback: clear everything and redirect manually if signOut fails
      localStorage.clear();
      window.location.href = "/";
    }
  };

  const handleLogoutCancel = () => {
    console.log("🔍 Logout cancelled");
    setLogoutConfirmOpen(false);
  };

  const menuItems = [
    {
      id: "my-orders",
      label: "My Orders",
      icon: <IconShoppingCart size={20} />,
    },
    {
      id: "my-quotations",
      label: "My Quotations",
      icon: <IconClipboardList size={20} />,
    },
    {
      id: "profile-settings",
      label: "Profile Settings",
      icon: <IconUserCircle size={20} />,
    },
    {
      id: "logout",
      label: "Logout",
      icon: <IconLogout size={20} />,
    },
  ];

  return (
    <Box
      sx={{
        backgroundColor: "transparent",
        borderRadius: 2,
        overflow: "hidden",
        height: "fit-content",
        minHeight: "400px",
      }}
    >
      <List sx={{ p: 0 }}>
        {menuItems.map((item) => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton
              selected={selectedTab === item.id}
              onClick={() => handleItemClick(item.id)}
              sx={{
                py: 1.5,
                px: 2,
                borderRadius: 2,
                mb: 1,
                "&.Mui-selected": {
                  backgroundColor: THEME_COLORS.secondary,
                  "& .MuiListItemIcon-root": {
                    color: "white",
                  },
                  "& .MuiListItemText-primary": {
                    color: "white",
                    fontWeight: 600,
                  },
                  "&:hover": {
                    backgroundColor: THEME_COLORS.secondary,
                  },
                },
                "&:hover:not(.Mui-selected)": {
                  backgroundColor: "rgba(25, 118, 210, 0.1)",
                  "& .MuiListItemIcon-root": {
                    color: THEME_COLORS.primary,
                  },
                  "& .MuiListItemText-primary": {
                    color: THEME_COLORS.primary,
                  },
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 40,
                  color:
                    selectedTab === item.id ? "white" : THEME_COLORS.primary,
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                sx={{
                  "& .MuiListItemText-primary": {
                    color:
                      selectedTab === item.id ? "white" : THEME_COLORS.primary,
                    fontSize: "1rem",
                    fontWeight: selectedTab === item.id ? 600 : 400,
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* Logout Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={logoutConfirmOpen}
        onClose={handleLogoutCancel}
        onConfirm={handleLogoutConfirm}
        title="Are you sure you want to logout?"
        message="You will be signed out of your account and redirected to the home page."
        confirmButtonText="Yes, Logout"
        cancelButtonText="Cancel"
      />
    </Box>
  );
}
