/**
 * @fileoverview Profile page for user account management
 */

"use client";

import { 
  Box, 
  Container, 
  Paper, 
  Typography, 
  Tabs, 
  Tab,
  Card,
  CardContent,
  Chip,
  Button,
  Tooltip
} from "@mui/material";
import { useState } from "react";
import { useUser } from "contexts/UserContext";
import { IconUser, IconMail, IconPhone, IconMapPin, IconEdit } from "@tabler/icons-react";

export default function ProfilePage() {
  const [selectedTab, setSelectedTab] = useState("profile");
  const useUserHook = useUser();
  const { user } = useUserHook;
  
  // Console log total user data
  console.log("=== TOTAL USER DATA ===");
  console.log("Complete useUser hook:", useUserHook);
  console.log("User object:", user);
  console.log("Is logged in:", useUserHook.isLoggedIn);
  console.log("Available methods:", {
    setUser: useUserHook.setUser,
    login: useUserHook.login,
    logout: useUserHook.logout
  });
  console.log("User properties:", user ? Object.keys(user) : "No user");
  console.log("==========================");


  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue);
  };

  return (
    <Box
      sx={{
        backgroundColor: "#f8fafc",
        minHeight: "100vh",
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          sx={{
            mb: 4,
            fontWeight: 600,
            color: "#115293",
          }}
        >
          Profile Settings
        </Typography>

        <Paper
          elevation={1}
          sx={{
            borderRadius: 2,
            overflow: "hidden",
            backgroundColor: "white",
            border: "1px solid #e2e8f0",
          }}
        >
          {/* Header with Tabs */}
          <Box sx={{ borderBottom: 1, borderColor: "divider", px: 3, pt: 3 }}>
            <Tabs
              value={selectedTab}
              onChange={handleTabChange}
              sx={{
                "& .MuiTab-root": {
                  textTransform: "none",
                  fontWeight: 500,
                  fontSize: "1rem",
                  minHeight: "48px",
                },
                "& .Mui-selected": {
                  color: "#115293 !important",
                },
                "& .MuiTabs-indicator": {
                  backgroundColor: "#115293",
                },
              }}
            >
              <Tab label="Profile Information" value="profile" />
              <Tab label="Account Settings" value="settings" />
              <Tab label="Security" value="security" />
            </Tabs>
          </Box>

          {/* Content */}
          <Box sx={{ p: 4 }}>
            {selectedTab === "profile" && (
              <Box>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                  Profile Information
                </Typography>
                {user ? (
                  <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 3 }}>
                    {/* Profile Summary Card */}
                    <Box sx={{ flex: 2 }}>
                      <Card
                        sx={{
                          backgroundColor: "#f8fafc",
                          border: "1px solid #e2e8f0",
                          boxShadow: "none",
                        }}
                      >
                        <CardContent sx={{ p: 3 }}>
                          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 3 }}>
                            <Typography variant="h6" sx={{ fontWeight: 600, color: "#115293" }}>
                              Personal Details
                            </Typography>
                            <Button
                              variant="outlined"
                              size="small"
                              startIcon={<IconEdit size={16} />}
                              sx={{
                                borderColor: "#115293",
                                color: "#115293",
                                "&:hover": {
                                  backgroundColor: "rgba(17, 82, 147, 0.1)",
                                  borderColor: "#115293",
                                },
                              }}
                            >
                              Edit
                            </Button>
                          </Box>
                          
                          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 3 }}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  width: 40,
                                  height: 40,
                                  borderRadius: "50%",
                                  backgroundColor: "rgba(17, 82, 147, 0.1)",
                                }}
                              >
                                <IconUser size={20} color="#115293" />
                              </Box>
                              <Box>
                                <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.8rem" }}>
                                  Full Name
                                </Typography>
                                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                  {user.firstName} {user.lastName}
                                </Typography>
                              </Box>
                            </Box>
                            
                            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  width: 40,
                                  height: 40,
                                  borderRadius: "50%",
                                  backgroundColor: "rgba(17, 82, 147, 0.1)",
                                }}
                              >
                                <IconMail size={20} color="#115293" />
                              </Box>
                              <Box>
                                <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.8rem" }}>
                                  Email Address
                                </Typography>
                                <Tooltip title={user.email} placement="top" arrow>
                                  <Typography 
                                    variant="body1" 
                                    sx={{ 
                                      fontWeight: 500,
                                      maxWidth: "200px",
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                      whiteSpace: "nowrap",
                                      cursor: "help"
                                    }}
                                  >
                                    {user.email}
                                  </Typography>
                                </Tooltip>
                              </Box>
                            </Box>
                            
                            {user.contactNumber && (
                              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: 40,
                                    height: 40,
                                    borderRadius: "50%",
                                    backgroundColor: "rgba(17, 82, 147, 0.1)",
                                  }}
                                >
                                  <IconPhone size={20} color="#115293" />
                                </Box>
                                <Box>
                                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.8rem" }}>
                                    Contact Number
                                  </Typography>
                                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                    {user.contactNumber}
                                  </Typography>
                                </Box>
                              </Box>
                            )}
                            
                            {user.country && (
                              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: 40,
                                    height: 40,
                                    borderRadius: "50%",
                                    backgroundColor: "rgba(17, 82, 147, 0.1)",
                                  }}
                                >
                                  <IconMapPin size={20} color="#115293" />
                                </Box>
                                <Box>
                                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.8rem" }}>
                                    Country
                                  </Typography>
                                  <Typography variant="body1" sx={{ fontWeight: 500, textTransform: "capitalize" }}>
                                    {user.country}
                                  </Typography>
                                </Box>
                              </Box>
                            )}
                          </Box>
                        </CardContent>
                      </Card>
                    </Box>
                    
                    {/* Account Status Card */}
                    <Box sx={{ flex: 1 }}>
                      <Card
                        sx={{
                          backgroundColor: "#fff",
                          border: "1px solid #e2e8f0",
                          boxShadow: "none",
                        }}
                      >
                        <CardContent sx={{ p: 3 }}>
                          <Typography variant="h6" sx={{ fontWeight: 600, color: "#115293", mb: 2 }}>
                            Account Status
                          </Typography>
                          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                              <Typography variant="body2" color="text.secondary">
                                Account Type
                              </Typography>
                              <Chip
                                label="Active"
                                color="success"
                                size="small"
                                sx={{ fontWeight: 500 }}
                              />
                            </Box>
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                              <Typography variant="body2" color="text.secondary">
                                Profile Completion
                              </Typography>
                              <Chip
                                label={`${user.contactNumber && user.country ? '100%' : '75%'}`}
                                color={user.contactNumber && user.country ? "success" : "warning"}
                                size="small"
                                sx={{ fontWeight: 500 }}
                              />
                            </Box>
                          </Box>
                        </CardContent>
                      </Card>
                    </Box>
                  </Box>
                ) : (
                  <Box sx={{ textAlign: "center", py: 4 }}>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                      No user information available
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Please log in to view your profile details
                    </Typography>
                  </Box>
                )}
              </Box>
            )}

            {selectedTab === "settings" && (
              <Box>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                  Account Settings
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Account settings functionality coming soon...
                </Typography>
              </Box>
            )}

            {selectedTab === "security" && (
              <Box>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                  Security Settings
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Security settings functionality coming soon...
                </Typography>
              </Box>
            )}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
