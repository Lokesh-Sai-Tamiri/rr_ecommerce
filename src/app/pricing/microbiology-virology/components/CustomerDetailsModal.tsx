import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useScrollLock } from '../../../../hooks/useScrollLock';
import { useOTP } from '../../../../hooks/useOTP';
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useTheme } from '@mui/material/styles';
import OTPPopup from '../../../../components/AccountPopup/OTPPopup';
import { useCustomerModal } from '../../../../contexts/CustomerModalContext';

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
  onCustomerCountryChange
}: CustomerDetailsModalProps) {
  const theme = useTheme();
  const { setCustomerModalOpen } = useCustomerModal();
  const [mounted, setMounted] = useState(false);
  const [isSendingOTP, setIsSendingOTP] = useState(false);
  const [otpError, setOtpError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState({
    name: false,
    email: false,
    phone: false,
    company: false,
    country: false
  });

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
      setOtpError(error instanceof Error ? error.message : 'Failed to send OTP. Please try again.');
      // Close OTP modal if there was an error
      if (showOTPModal) {
        handleOTPClose();
      }
    } finally {
      setIsSendingOTP(false);
    }
  };
  
  // Lock body scroll when modal is open
  useScrollLock(isOpen);

  // Set mounted to true on client side
  useEffect(() => {
    setMounted(true);
  }, []);

  // Update context when modal opens/closes
  useEffect(() => {
    setCustomerModalOpen(isOpen);
  }, [isOpen, setCustomerModalOpen]);

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
      country: !customerCountry.trim() // Country is required
    };
    setValidationErrors(errors);
    return !Object.values(errors).some(error => error);
  };

  // Handle generate quotation with validation
  const handleGenerateQuotation = () => {
    if (validateFields()) {
      onGenerateQuotation();
    }
  };

  // Clear validation errors when fields change
  const handleNameChange = (value: string) => {
    onCustomerNameChange(value);
    if (validationErrors.name && value.trim()) {
      setValidationErrors(prev => ({ ...prev, name: false }));
    }
  };

  const handleEmailChange = (value: string) => {
    onCustomerEmailChange(value);
    if (validationErrors.email && value.trim() && isValidEmail(value)) {
      setValidationErrors(prev => ({ ...prev, email: false }));
    }
  };

  const handlePhoneChange = (value: string) => {
    onCustomerPhoneChange(value);
    if (validationErrors.phone && value.trim()) {
      setValidationErrors(prev => ({ ...prev, phone: false }));
    }
  };

  const handleCompanyChange = (value: string) => {
    onCustomerCompanyChange(value);
    if (validationErrors.company && value.trim()) {
      setValidationErrors(prev => ({ ...prev, company: false }));
    }
  };

  const handleCountryChange = (value: string) => {
    onCustomerCountryChange(value);
    if (validationErrors.country && value.trim()) {
      setValidationErrors(prev => ({ ...prev, country: false }));
    }
  };

  if (!isOpen || !mounted) return null;

  const modalContent = (
    <>
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: { xs: '100%', sm: '100%', md: '628px' },
          height: '100vh',
          maxWidth: { xs: '100vw', sm: '100vw', md: '628px' },
          zIndex: 1000,
          backgroundImage: 'url(/assets/images/home-bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          borderTopLeftRadius: { xs: 0, md: '8px' },
          borderBottomLeftRadius: { xs: 0, md: '8px' },
          boxShadow: { xs: 'none', md: '-8px 0 32px rgba(0, 0, 0, 0.15)' },
          animation: 'slideInFromRight 0.4s ease-out',
          overflow: 'hidden',
          opacity: 1,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Header */}
        <Box sx={{ 
          p: 3, 
          borderBottom: '1px solid rgba(25, 118, 210, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Typography variant="h3" sx={{ fontWeight: 700, color: theme.palette.primary.main, fontSize: { xs: '1.3rem', sm: '1.5rem', md: '1.7rem' } }}>
            Customer Details
          </Typography>
          <IconButton onClick={onClose} sx={{ p: 1 }}>
            <Typography variant="h4" sx={{ color: '#666', fontSize: '1.3rem' }}>×</Typography>
          </IconButton>
        </Box>

        {/* Content Area - Scrollable */}
        <Box sx={{ flex: 1, overflow: 'auto' }}>
          {/* Progress Steps */}
          <Box sx={{ p: 3, pb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 1.5 }}>
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column',
                alignItems: 'center', 
                flex: 1
              }}>
                <Box sx={{
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  background: theme.palette.primary.main,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    border: `2px solid rgba(25, 118, 210, 0.3)`,
                    top: '-4px',
                    left: '-4px'
                  }
                }}>
                  <Typography sx={{ color: 'white', fontSize: '12px', fontWeight: 'bold' }}>✓</Typography>
                </Box>
                <Typography variant="body2" sx={{ mt: 0.5, fontWeight: 600, color: theme.palette.primary.main, fontSize: '0.75rem', textAlign: 'center' }}>
                  Order Summary
                </Typography>
              </Box>
              <Box sx={{
                flex: 1,
                height: 2,
                background: theme.palette.primary.main,
                borderRadius: 1
              }} />
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column',
                alignItems: 'center', 
                flex: 1
              }}>
                <Box sx={{
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  background: theme.palette.primary.main,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    border: `2px solid rgba(25, 118, 210, 0.3)`,
                    top: '-4px',
                    left: '-4px'
                  }
                }}>
                  <Box sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: 'white'
                  }} />
                </Box>
                <Typography variant="body2" sx={{ mt: 0.5, fontWeight: 600, color: theme.palette.primary.main, fontSize: '0.75rem', textAlign: 'center' }}>
                  Customer Details
                </Typography>
              </Box>
              <Box sx={{
                flex: 1,
                height: 2,
                background: 'rgba(25, 118, 210, 0.3)',
                borderRadius: 1
              }} />
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column',
                alignItems: 'center'
              }}>
               
                  <Box sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: '#e0e0e0'
                  }} />
               
                <Typography variant="body2" sx={{ mt: 0.5, fontWeight: 600, color: theme.palette.primary.main, fontSize: '0.75rem', textAlign: 'center' }}>
                  Generate Quotation
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Customer Details Form */}
          <Box sx={{ p: 3, pt: 0 }}>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: { xs: 2, md: 3 }, mb: 3 }}>
              {/* Left Column */}
              <Box sx={{ flex: 1 }}>
                <TextField
                  label={<span>Name <span style={{ color: 'red' }}>*</span></span>}
                  value={customerName}
                  onChange={(e) => handleNameChange(e.target.value)}
                  fullWidth
                  variant="outlined"
                  error={validationErrors.name}
                  helperText={validationErrors.name ? "Name is required" : ""}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'transparent',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                      borderRadius: '8px',
                      '& fieldset': {
                        borderColor: validationErrors.name ? '#f44336' : '#1976d2',
                      },
                      '&:hover fieldset': {
                        borderColor: validationErrors.name ? '#f44336' : '#1976d2',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: validationErrors.name ? '#f44336' : '#1976d2',
                      },
                    },
                    '& .MuiInputBase-input': {
                      backgroundColor: 'transparent',
                      color: theme.palette.primary.main,
                      // Prevent autofill background
                      '&:-webkit-autofill': {
                        WebkitBoxShadow: `0 0 0 1000px transparent inset !important`,
                        WebkitTextFillColor: `${theme.palette.primary.main} !important`,
                        transition: 'background-color 5000s ease-in-out 0s',
                      },
                      '&:-webkit-autofill:hover': {
                        WebkitBoxShadow: `0 0 0 1000px transparent inset !important`,
                      },
                      '&:-webkit-autofill:focus': {
                        WebkitBoxShadow: `0 0 0 1000px transparent inset !important`,
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: validationErrors.name ? '#f44336' : theme.palette.primary.main,
                      '&.Mui-focused': {
                        color: validationErrors.name ? '#f44336' : theme.palette.primary.main,
                      }
                    },
                    '& .MuiFormHelperText-root': {
                      color: '#f44336',
                      fontSize: '0.75rem',
                      marginTop: '4px'
                    }
                  }}
                />
              </Box>
              {/* Right Column */}
              <Box sx={{ flex: 1 }}>
                <TextField
                  label={<span>Contact Number <span style={{ color: 'red' }}>*</span></span>}
                  value={customerPhone}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  fullWidth
                  variant="outlined"
                  error={validationErrors.phone}
                  helperText={validationErrors.phone ? "Contact number is required" : ""}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'transparent',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                      borderRadius: '8px',
                      '& fieldset': {
                        borderColor: validationErrors.phone ? '#f44336' : '#1976d2',
                      },
                      '&:hover fieldset': {
                        borderColor: validationErrors.phone ? '#f44336' : '#1976d2',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: validationErrors.phone ? '#f44336' : '#1976d2',
                      },
                    },
                    '& .MuiInputBase-input': {
                      backgroundColor: 'transparent',
                      color: theme.palette.primary.main,
                      // Prevent autofill background
                      '&:-webkit-autofill': {
                        WebkitBoxShadow: `0 0 0 1000px transparent inset !important`,
                        WebkitTextFillColor: `${theme.palette.primary.main} !important`,
                        transition: 'background-color 5000s ease-in-out 0s',
                      },
                      '&:-webkit-autofill:hover': {
                        WebkitBoxShadow: `0 0 0 1000px transparent inset !important`,
                      },
                      '&:-webkit-autofill:focus': {
                        WebkitBoxShadow: `0 0 0 1000px transparent inset !important`,
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: validationErrors.phone ? '#f44336' : theme.palette.primary.main,
                      '&.Mui-focused': {
                        color: validationErrors.phone ? '#f44336' : theme.palette.primary.main,
                      }
                    },
                    '& .MuiFormHelperText-root': {
                      color: '#f44336',
                      fontSize: '0.75rem',
                      marginTop: '4px'
                    }
                  }}
                />
              </Box>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: { xs: 2, md: 3 }, mb: 4 }}>
              {/* Left Column */}
              <Box sx={{ flex: 1 }}>
                <TextField
                  label={<span>Email <span style={{ color: 'red' }}>*</span></span>}
                  type="email"
                  value={customerEmail}
                  onChange={(e) => handleEmailChange(e.target.value)}
                  fullWidth
                  variant="outlined"
                  error={validationErrors.email}
                  helperText={validationErrors.email ? (customerEmail.trim() && !isValidEmail(customerEmail) ? "Please enter a valid email address" : "Email is required") : ""}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'transparent',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                      borderRadius: '8px',
                      '& fieldset': {
                        borderColor: validationErrors.email ? '#f44336' : '#1976d2',
                      },
                      '&:hover fieldset': {
                        borderColor: validationErrors.email ? '#f44336' : '#1976d2',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: validationErrors.email ? '#f44336' : '#1976d2',
                      },
                    },
                    '& .MuiInputBase-input': {
                      backgroundColor: 'transparent',
                      color: theme.palette.primary.main,
                      // Prevent autofill background
                      '&:-webkit-autofill': {
                        WebkitBoxShadow: `0 0 0 1000px transparent inset !important`,
                        WebkitTextFillColor: `${theme.palette.primary.main} !important`,
                        transition: 'background-color 5000s ease-in-out 0s',
                      },
                      '&:-webkit-autofill:hover': {
                        WebkitBoxShadow: `0 0 0 1000px transparent inset !important`,
                      },
                      '&:-webkit-autofill:focus': {
                        WebkitBoxShadow: `0 0 0 1000px transparent inset !important`,
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: validationErrors.email ? '#f44336' : theme.palette.primary.main,
                      '&.Mui-focused': {
                        color: validationErrors.email ? '#f44336' : theme.palette.primary.main,
                      }
                    },
                    '& .MuiFormHelperText-root': {
                      color: '#f44336',
                      fontSize: '0.75rem',
                      marginTop: '4px'
                    }
                  }}
                />
              </Box>
              {/* Right Column */}
              <Box sx={{ flex: 1 }}>
                <TextField
                  label="Company Name"
                  value={customerCompany}
                  onChange={(e) => handleCompanyChange(e.target.value)}
                  fullWidth
                  variant="outlined"
                  error={validationErrors.company}
                  helperText={validationErrors.company ? "Company name is required" : ""}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'transparent',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                      borderRadius: '8px',
                      '& fieldset': {
                        borderColor: validationErrors.company ? '#f44336' : '#1976d2',
                        borderWidth: '1px',
                      },
                      '&:hover fieldset': {
                        borderColor: validationErrors.company ? '#f44336' : '#1976d2',
                        borderWidth: '1px',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: validationErrors.company ? '#f44336' : '#1976d2',
                        borderWidth: '2px',
                      },
                    },
                    '& .MuiInputBase-input': {
                      backgroundColor: 'transparent',
                      color: theme.palette.primary.main,
                      // Prevent autofill background
                      '&:-webkit-autofill': {
                        WebkitBoxShadow: `0 0 0 1000px transparent inset !important`,
                        WebkitTextFillColor: `${theme.palette.primary.main} !important`,
                        transition: 'background-color 5000s ease-in-out 0s',
                      },
                      '&:-webkit-autofill:hover': {
                        WebkitBoxShadow: `0 0 0 1000px transparent inset !important`,
                      },
                      '&:-webkit-autofill:focus': {
                        WebkitBoxShadow: `0 0 0 1000px transparent inset !important`,
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: validationErrors.company ? '#f44336' : theme.palette.primary.main,
                      '&.Mui-focused': {
                        color: validationErrors.company ? '#f44336' : theme.palette.primary.main,
                      }
                    },
                    '& .MuiFormHelperText-root': {
                      color: '#f44336',
                      fontSize: '0.75rem',
                      marginTop: '4px'
                    }
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
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'transparent',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    borderRadius: '8px',
                    '& fieldset': {
                      borderColor: validationErrors.country ? '#f44336' : '#1976d2',
                      borderWidth: '1px',
                    },
                    '&:hover fieldset': {
                      borderColor: validationErrors.country ? '#f44336' : '#1976d2',
                      borderWidth: '1px',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: validationErrors.country ? '#f44336' : '#1976d2',
                      borderWidth: '2px',
                    },
                  },
                  '& .MuiInputBase-input': {
                    backgroundColor: 'transparent',
                    color: theme.palette.primary.main,
                  },
                  '& .MuiInputLabel-root': {
                    color: validationErrors.country ? '#f44336' : theme.palette.primary.main,
                    '&.Mui-focused': {
                      color: validationErrors.country ? '#f44336' : theme.palette.primary.main,
                    }
                  },
                  '& .MuiFormHelperText-root': {
                    color: '#f44336',
                    fontSize: '0.75rem',
                    marginTop: '4px'
                  }
                }}
              >
                <InputLabel>
                  <span>Country <span style={{ color: 'red' }}>*</span></span>
                </InputLabel>
                <Select
                  value={customerCountry}
                  onChange={(e) => handleCountryChange(e.target.value)}
                  label={<span>Country <span style={{ color: 'red' }}>*</span></span>}
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
                      color: '#f44336',
                      fontSize: '0.75rem',
                      marginTop: '4px',
                      marginLeft: '14px'
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
          <Box sx={{ 
            p: { xs: 2, md: 3 }, 
            backgroundColor: '#ffebee',
            borderTop: '1px solid #f44336',
            borderBottom: '1px solid #f44336'
          }}>
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#d32f2f', 
                textAlign: 'center',
                fontWeight: 500
              }}
            >
              {otpError}
            </Typography>
          </Box>
        )}

        {/* Action Buttons - Fixed at Bottom */}
        <Box sx={{ 
          p: { xs: 2, md: 3 }, 
          borderTop: '1px solid rgba(25, 118, 210, 0.1)',
          backgroundColor: 'transparent',
          display: 'flex',
          flexDirection: 'row',
          gap: { xs: 2, sm: 2 },
          justifyContent: 'flex-end',
          alignItems: 'center'
        }}>
          <Button
            variant="outlined"
            size="small"
            onClick={onBack}
            sx={{
              borderColor: theme.palette.primary.main,
              color: theme.palette.primary.main,
              backgroundColor: 'transparent',
              fontWeight: 600,
              py: { xs: 0.75, md: 1 },
              px: { xs: 2, md: 3 },
              fontSize: { xs: '0.8rem', md: '0.9rem' },
              borderRadius: '8px',
              minWidth: { xs: 'auto', sm: '100px' },
              flex: { xs: 1, sm: 'none' },
              '&:hover': {
                borderColor: theme.palette.primary.dark,
                backgroundColor: 'rgba(25, 118, 210, 0.04)'
              }
            }}
          >
            Back
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={isOtpVerified ? handleGenerateQuotation : handleSendOTPWithLoading}
            disabled={isSendingOTP}
            endIcon={<ArrowForwardIcon sx={{ fontSize: { xs: '0.9rem', md: '1rem' } }} />}
            sx={{
              py: { xs: 0.75, md: 1 },
              px: { xs: 2, md: 3 },
              background: 'linear-gradient(105.34deg, #115293 0%, #1976D2 50%, #115293 100%)',
              color: 'white',
              textTransform: 'none',
              border: 'none',
              borderRadius: '8px',
              fontSize: { xs: '0.8rem', md: '0.9rem' },
              minWidth: { xs: 'auto', sm: '160px' },
              flex: { xs: 1, sm: 'none' },
              '&:hover': {
                background: 'linear-gradient(105.34deg, #0d3d6b 0%, #1565c0 50%, #0d3d6b 100%)',
                color: 'white'
              },
              '&:disabled': {
                backgroundColor: '#ccc',
                color: '#666'
              }
            }}
          >
            {isSendingOTP ? 'Sending...' : (isOtpVerified ? 'Generate Quotation' : 'Send OTP')}
          </Button>
        </Box>
      </Box>

      {/* Backdrop */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 99,
          animation: 'fadeIn 0.3s ease-out'
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
    </>
  );

  return createPortal(modalContent, document.body);
}