import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useScrollLock } from '../../../../hooks/useScrollLock';
import {
  Box,
  Typography,
  Paper,
  TextField,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
// import ScienceIcon from '@mui/icons-material/Science';
// import ListAltIcon from '@mui/icons-material/ListAlt';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useTheme } from '@mui/material/styles';
import { 
  getGuidelineData, 
  calculateTotalDuration, 
  formatDuration 
} from '../data/guidelineData';
import DeleteConfirmationModal from '../../../../components/common/DeleteConfirmationModal';
import { getGuidelinesForProductDetail } from '../data/productGuidelineMapping';

interface OrderSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNext: (sampleDescription?: string) => void;
  onGenerateQuotation?: () => void;
  category: string;
  sampleForm: string;
  sampleSolvent: string;
  application: string;
  numSamples: number;
  selectedGuidelines: string[];
  sampleFormGuidelines?: string[];
  sampleSolventGuidelines?: string[];
  applicationGuidelines?: string[];
  expandedOrderAccordion: string | false;
  onNumSamplesChange: (increment: boolean) => void;
  onOrderAccordionChange: (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => void;
  onRemoveGuideline?: (guideline: string, cartIndex?: number, sectionType?: 'sampleForm' | 'sampleSolvent' | 'application') => void;
  isCheckoutMode?: boolean;
  cartItems?: any[];
  onEditOrder?: (cartItem: any) => void;
  showAddToCartButton?: boolean;
  initialSampleDescription?: string;
}

function OrderSummaryModal({
  isOpen,
  onClose,
  onNext,
  onGenerateQuotation,
  category,
  sampleForm,
  sampleSolvent,
  application,
  numSamples,
  selectedGuidelines,
  sampleFormGuidelines = [],
  sampleSolventGuidelines = [],
  applicationGuidelines = [],
  expandedOrderAccordion,
  onNumSamplesChange,
  onOrderAccordionChange,
  onRemoveGuideline,
  isCheckoutMode = false,
  cartItems = [],
  onEditOrder,
  showAddToCartButton = false,
  initialSampleDescription = ''
}: OrderSummaryModalProps) {
  
  const theme = useTheme();
  
  // Lock body scroll when modal is open
  useScrollLock(isOpen);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [guidelineToDelete, setGuidelineToDelete] = useState<string | null>(null);
  const [cartIndexToDelete, setCartIndexToDelete] = useState<number | null>(null);
  const [tempCartIndex, setTempCartIndex] = useState<number | null>(null);
  const [sectionTypeToDelete, setSectionTypeToDelete] = useState<'sampleForm' | 'sampleSolvent' | 'application' | null>(null);
  const [sampleDescription, setSampleDescription] = useState('');
  const [showValidationError, setShowValidationError] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const sampleDescriptionRef = useRef<HTMLDivElement>(null);
  const hasScrolledRef = useRef<boolean>(false);

  // Debug: Log when deleteConfirmOpen changes
  useEffect(() => {
    console.log('deleteConfirmOpen changed to:', deleteConfirmOpen);
  }, [deleteConfirmOpen]);

  // Debug: Log when cartItems change
  useEffect(() => {
    console.log('OrderSummaryModal cartItems updated:', cartItems);
    console.log('OrderSummaryModal isCheckoutMode:', isCheckoutMode);
    console.log('OrderSummaryModal cartItems length:', cartItems.length);
  }, [cartItems, isCheckoutMode]);

  // Debug: Log when modal opens and auto-fill sample description for edit mode
  useEffect(() => {
    if (isOpen && !isInitialized) {
      console.log('OrderSummaryModal opened with cartItems:', cartItems);
      console.log('isCheckoutMode:', isCheckoutMode);
      console.log('initialSampleDescription:', initialSampleDescription);
      
      // Auto-fill sample description from prop or cart item
      if (initialSampleDescription) {
        console.log('🔄 Auto-filling sample description from prop:', initialSampleDescription);
        setSampleDescription(initialSampleDescription);
      } else if (cartItems.length > 0 && cartItems[0].sampleDescription) {
        console.log('🔄 Auto-filling sample description from cart item:', cartItems[0].sampleDescription);
        setSampleDescription(cartItems[0].sampleDescription);
      } else {
        setSampleDescription(''); // Keep field empty for new items
      }
      setIsInitialized(true);
    } else if (!isOpen) {
      setIsInitialized(false);
      // Reset scroll flag when modal closes
      hasScrolledRef.current = false;
    }
  }, [isOpen, cartItems, isCheckoutMode, initialSampleDescription, isInitialized]);

  // Scroll to sample description field when validation error is shown (only once)
  useEffect(() => {
    if (showValidationError && sampleDescriptionRef.current && !hasScrolledRef.current) {
      // Small delay to ensure the error state is rendered
      setTimeout(() => {
        sampleDescriptionRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
        // Focus the input field
        const input = sampleDescriptionRef.current.querySelector('input, textarea');
        if (input) {
          (input as HTMLElement).focus();
        }
        hasScrolledRef.current = true; // Mark that we've scrolled
      }, 100);
    } else if (!showValidationError) {
      // Reset scroll flag when error is cleared
      hasScrolledRef.current = false;
    }
  }, [showValidationError]);

  if (!isOpen) return null;

  const handleDeleteClick = (guideline: string, cartIndex?: number, sectionType?: 'sampleForm' | 'sampleSolvent' | 'application') => {
    console.log('OrderSummaryModal handleDeleteClick called with:', { guideline, cartIndex, sectionType });
    const cartIndexToSet = cartIndex !== undefined ? cartIndex : null;
    console.log('Setting cartIndexToDelete to:', cartIndexToSet);
    console.log('Setting tempCartIndex to:', cartIndexToSet);
    console.log('Setting sectionTypeToDelete to:', sectionType);
    setGuidelineToDelete(guideline);
    setCartIndexToDelete(cartIndexToSet);
    setTempCartIndex(cartIndexToSet);
    setSectionTypeToDelete(sectionType || null);
    setDeleteConfirmOpen(true);
    console.log('Delete confirmation modal should now be open');
  };

  const handleConfirmDelete = () => {
    if (guidelineToDelete && onRemoveGuideline) {
      console.log('handleConfirmDelete - calling onRemoveGuideline with:', { guidelineToDelete, cartIndexToDelete, tempCartIndex, sectionTypeToDelete });
      onRemoveGuideline(guidelineToDelete, tempCartIndex, sectionTypeToDelete);
      setGuidelineToDelete(null);
      setCartIndexToDelete(null);
      setTempCartIndex(null);
      setSectionTypeToDelete(null);
    }
    setDeleteConfirmOpen(false);
  };

  const handleCancelDelete = () => {
    setGuidelineToDelete(null);
    setCartIndexToDelete(null);
    setTempCartIndex(null);
    setSectionTypeToDelete(null);
    setDeleteConfirmOpen(false);
  };

  const modalContent = (
    <>
      {/* Backdrop */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(1px)',
          zIndex: 99998
        }}
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: { xs: '100%', sm: '100%', md: '628px' },
          height: '100vh',
          maxWidth: { xs: '100vw', sm: '100vw', md: '628px' },
          zIndex: 99999,
          backgroundImage: 'url(/assets/images/home-bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          borderTopLeftRadius: { xs: 0, md: '8px' },
          borderBottomLeftRadius: { xs: 0, md: '8px' },
          boxShadow: { xs: 'none', md: '-8px 0 32px rgba(0, 0, 0, 0.15)' },
          animation: 'slideInFromRight 0.4s ease-out',
          overflow: 'auto',
          opacity: 1
        }}
      >
        {/* Header */}
        <Box sx={{ 
          p: { xs: 2, md: 3 }, 
          borderBottom: '1px solid rgba(25, 118, 210, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Typography variant="h3" sx={{ fontWeight: 700, color: theme.palette.primary.main, fontSize: { xs: '1.3rem', sm: '1.5rem', md: '1.7rem' } }}>
            Item Summary
          </Typography>
          <IconButton onClick={onClose} sx={{ p: 1 }}>
            <Typography variant="h4" sx={{ color: '#666', fontSize: '1.3rem' }}>×</Typography>
          </IconButton>
        </Box>


        {/* Order Details Card */}
        <Box sx={{ p: { xs: 2, md: 3 }, pt: 0 }}>
          <Paper sx={{ 
            p: 3, 
            mb: 3,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            border: "none",
            outline: "none",
            backgroundColor: `${theme.palette.text.primary}15 !important`,
            borderRadius: '16px',
            boxShadow: theme.shadows[4],
            position: 'relative',
            transition: theme.transitions.create(
              ["transform", "box-shadow"],
              {
                duration: theme.transitions.duration.standard,
              }
            ),
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: theme.shadows[8],
              backgroundColor: `${theme.palette.text.primary}20 !important`,
            },
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, position: 'relative', zIndex: 1 }}>
              <Box 
                component="img" 
                src="/assets/images/landing/pricing/productdetailsicon.png" 
                alt="Item Details"
                sx={{ 
                  mr: 1.5, 
                  width: 32, 
                  height: 32,
                  objectFit: 'contain'
                }} 
              />
              <Typography variant="h4" sx={{ color: theme.palette.primary.main, fontWeight: 600, fontSize: { xs: '1.1rem', sm: '1.2rem', md: '1.3rem' } }}>
                Item Details
              </Typography>
            </Box>
            
            {/* No of Samples - Right side at end of card */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2, position: 'relative', zIndex: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box 
                  component="img" 
                  src="/assets/images/landing/pricing/no.of sampless.png" 
                  alt="No of Samples"
                  sx={{ 
                    mr: 1.5, 
                    width: 24, 
                    height: 24,
                    objectFit: 'contain'
                  }} 
                />
                <Typography variant="body1" sx={{ fontWeight: 600, fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' } }}>
                  No of Samples:
                </Typography>
              </Box>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center',
                backgroundColor: theme.palette.primary.main,
                borderRadius: '8px',
                padding: '4px',
                minWidth: '120px',
                justifyContent: 'space-between'
              }}>
                <IconButton 
                  onClick={() => onNumSamplesChange(false)}
                  disabled={numSamples === 1}
                  disableRipple
                  disableFocusRipple
                  sx={{
                    backgroundColor: 'transparent !important',
                    color: 'white',
                    minWidth: '32px',
                    width: '32px',
                    height: '32px',
                    borderRadius: 0,
                    boxShadow: 'none !important',
                    padding: 0,
                    margin: 0,
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1) !important',
                    },
                    '&:disabled': {
                      color: 'rgba(255, 255, 255, 0.5)',
                      backgroundColor: 'transparent !important',
                    },
                    '&.MuiIconButton-root': {
                      borderRadius: 0,
                      backgroundColor: 'transparent !important',
                    },
                    '&::before': {
                      display: 'none',
                    },
                    '&::after': {
                      display: 'none',
                    }
                  }}
                >
                  <RemoveIcon sx={{ fontSize: '1.2rem' }} />
                </IconButton>
                <Typography sx={{ 
                  color: 'white',
                  fontWeight: 600,
                  fontSize: '1rem',
                  minWidth: '40px',
                  textAlign: 'center'
                }}>
                  {numSamples}
                </Typography>
                <IconButton 
                  onClick={() => onNumSamplesChange(true)}
                  disableRipple
                  disableFocusRipple
                  sx={{
                    backgroundColor: 'transparent !important',
                    color: 'white',
                    minWidth: '32px',
                    width: '32px',
                    height: '32px',
                    borderRadius: 0,
                    boxShadow: 'none !important',
                    padding: 0,
                    margin: 0,
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1) !important',
                    },
                    '&.MuiIconButton-root': {
                      borderRadius: 0,
                      backgroundColor: 'transparent !important',
                    },
                    '&::before': {
                      display: 'none',
                    },
                    '&::after': {
                      display: 'none',
                    }
                  }}
                >
                  <AddIcon sx={{ fontSize: '1.2rem' }} />
                </IconButton>
              </Box>
            </Box>

            {/* Sample Description */}
            <Box ref={sampleDescriptionRef}>
              <Box sx={{ mb: 1 }}>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: theme.palette.primary.main,
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    mb: 1
                  }}
                >
                  Describe about your Samples <span style={{ color: 'red' }}>*</span>
                </Typography>
              </Box>
              <TextField
                multiline
                rows={3}
                placeholder="Please describe your sample in detail..."
                variant="outlined"
                fullWidth
                value={sampleDescription}
                onChange={(e) => {
                  setSampleDescription(e.target.value);
                  if (showValidationError && e.target.value.trim()) {
                    setShowValidationError(false);
                  }
                }}
                inputProps={{ maxLength: 500 }}
                InputProps={{
                  style: { fontSize: '0.8rem' }
                }}
                sx={{
                  mb: 2, 
                  position: 'relative', 
                  zIndex: 1,
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'transparent',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  '& fieldset': {
                    borderColor: showValidationError ? 'red' : 'rgba(25, 118, 210, 0.2)',
                  },
                  '&:hover fieldset': {
                    borderColor: showValidationError ? 'red' : 'rgba(25, 118, 210, 0.2)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: showValidationError ? 'red' : 'rgba(25, 118, 210, 0.2)',
                  },
                },
                '& .MuiInputBase-input': {
                  backgroundColor: 'transparent',
                  color: theme.palette.primary.main,
                },
                '& .MuiInputLabel-root': {
                  color: theme.palette.primary.main,
                  '&.Mui-focused': {
                    color: theme.palette.primary.main,
                  }
                },
                '& .MuiInputBase-input::placeholder': {
                  color: theme.palette.primary.main,
                  opacity: 1,
                  fontWeight: 400,
                  fontSize: '0.8rem'
                },
                '& .MuiInputBase-input::-webkit-input-placeholder': {
                  color: theme.palette.primary.main,
                  opacity: 1,
                  fontWeight: 400,
                  fontSize: '0.8rem'
                },
                '& .MuiInputBase-input::-moz-placeholder': {
                  color: theme.palette.primary.main,
                  opacity: 1,
                  fontWeight: 400,
                  fontSize: '0.8rem'
                }
              }}
              />
            </Box>

            {/* Sample Info Card */}
            <Paper sx={{ 
              p: 2.5,
              mb: 2,
              backgroundColor: 'transparent',
              borderRadius: '12px',
              border: '1px solid rgba(25, 118, 210, 0.2)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              position: 'relative',
              zIndex: 1,
              minHeight: '180px',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, flex: 1 }}>
                {(isCheckoutMode || cartItems.length > 0) ? (
                  // Show cart items in checkout mode
                  cartItems.map((cartItem, index) => (
                    <Box key={index} sx={{ width: '100%', mb: 2 }}>
                      <Typography variant="body2" sx={{ 
                        fontWeight: 700, 
                        fontSize: '0.9rem',
                        color: theme.palette.primary.main,
                        mb: 1,
                        borderBottom: '1px solid rgba(25, 118, 210, 0.2)',
                        pb: 0.5
                      }}>
                        Cart Item {index + 1}: {cartItem.category}
                      </Typography>
                      {/* Product Details Only - No Guidelines */}
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {/* Sample Form */}
                        {cartItem.sampleForm && (
                          <Box sx={{ width: '100%' }}>
                        <Typography variant="body2" sx={{ 
                          fontWeight: 700, 
                              fontSize: '0.9rem',
                              color: theme.palette.primary.main,
                              mb: 1
                            }}>
                              Sample Form: {cartItem.sampleForm}
                        </Typography>
                          </Box>
                        )}

                        {/* Sample Solvent */}
                        {cartItem.sampleSolvent && (
                          <Box sx={{ width: '100%' }}>
                        <Typography variant="body2" sx={{ 
                              fontWeight: 700, 
                              fontSize: '0.9rem',
                              color: theme.palette.primary.main,
                              mb: 1
                            }}>
                              Sample Solvent: {cartItem.sampleSolvent}
                        </Typography>
                  </Box>
                )}

                        {/* Application */}
                        {cartItem.application && (
                          <Box sx={{ width: '100%' }}>
                      <Typography variant="body2" sx={{ 
                        fontWeight: 700, 
                              fontSize: '0.9rem',
                              color: theme.palette.primary.main,
                              mb: 1
                            }}>
                              Application: {cartItem.application}
                      </Typography>
                          </Box>
                        )}
                      </Box>
                    </Box>
                  ))
                ) : (
                  // Show single item details
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {/* Sample Form */}
                    {sampleForm && (
                      <Box sx={{ width: '100%' }}>
                        <Typography variant="body2" sx={{ 
                          fontWeight: 700, 
                          fontSize: '0.9rem',
                          color: theme.palette.primary.main,
                          mb: 1
                        }}>
                          • Sample Form:
                        </Typography>
                        <Typography variant="body2" sx={{ 
                          color: theme.palette.primary.main,
                          fontSize: '0.8rem',
                          fontWeight: 400,
                          pl: 2,
                          mb: 1
                        }}>
                          {sampleForm}
                        </Typography>
                  </Box>
                )}

                    {/* Sample Solvent */}
                {sampleSolvent && (
                      <Box sx={{ width: '100%' }}>
                      <Typography variant="body2" sx={{ 
                        fontWeight: 700, 
                          fontSize: '0.9rem',
                          color: theme.palette.primary.main,
                          mb: 1
                        }}>
                          • Sample Solvent:
                      </Typography>
                      <Typography variant="body2" sx={{ 
                        color: theme.palette.primary.main,
                        fontSize: '0.8rem',
                        fontWeight: 400,
                        pl: 2,
                        mb: 1
                      }}>
                        {sampleSolvent}
                      </Typography>
                      </Box>
                    )}

                    {/* Application */}
                    {application && (
                      <Box sx={{ width: '100%' }}>
                        <Typography variant="body2" sx={{ 
                          fontWeight: 700, 
                          fontSize: '0.9rem',
                          color: theme.palette.primary.main,
                          mb: 1
                        }}>
                          • Application:
                        </Typography>
                        <Typography variant="body2" sx={{ 
                          color: theme.palette.primary.main,
                          fontSize: '0.8rem',
                          fontWeight: 400,
                          pl: 2,
                          mb: 1
                        }}>
                          {application}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                )}
              </Box>

              {/* Edit Button inside the card - Show when there are cart items to edit OR when adding new items with guidelines */}
              {(cartItems.length > 0 || (selectedGuidelines.length > 0 && !isCheckoutMode)) && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 'auto', pt: 1.5 }}>
                <Button
                  variant="text"
                  startIcon={<EditIcon sx={{ fontSize: '1rem' }} />}
                    onClick={() => onEditOrder && onEditOrder(cartItems.length > 0 ? cartItems[0] : null)}
                  sx={{ 
                    color: '#115293',
                    fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                    py: 0.5,
                    px: 2,
                    position: 'relative',
                    zIndex: 1,
                    '&:hover': {
                      backgroundColor: 'rgba(17, 82, 147, 0.04)'
                    }
                  }}
                >
                  Edit
                </Button>
              </Box>
              )}
            </Paper>
          </Paper>

          {/* Applicable Guidelines Card */}
          <Paper sx={{ 
            p: 3,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            border: "none",
            outline: "none",
            backgroundColor: `${theme.palette.text.primary}15 !important`,
            borderRadius: '16px',
            boxShadow: theme.shadows[4],
            transition: theme.transitions.create(
              ["transform", "box-shadow"],
              {
                duration: theme.transitions.duration.standard,
              }
            ),
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: theme.shadows[8],
              backgroundColor: `${theme.palette.text.primary}20 !important`,
            },
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box 
                component="img" 
                src="/assets/images/landing/pricing/applicablestudies.png" 
                alt="Applicable Guidelines"
                sx={{ 
                  mr: 1.5, 
                  width: 32, 
                  height: 32,
                  objectFit: 'contain'
                }} 
              />
              <Typography variant="h4" sx={{ color: theme.palette.primary.main, fontWeight: 600, fontSize: { xs: '1.1rem', sm: '1.2rem', md: '1.3rem' } }}>
                Applicable Guidelines
              </Typography>
            </Box>
            
            {selectedGuidelines.length > 0 ? (
              // Show only the selected guidelines (no duplicates)
              <Box>
                {selectedGuidelines.map((guideline, index) => {
                  const guidelineData = getGuidelineData(category, guideline);
                  const totalDuration = guidelineData 
                    ? calculateTotalDuration(guidelineData.baseDuration, guidelineData.deviation)
                    : 0;
                  
                  return (
                  <Box key={index} sx={{ 
                    mb: 1,
                    backgroundColor: 'rgba(25, 118, 210, 0.05)',
                    border: '1px solid rgba(25, 118, 210, 0.2)',
                    borderRadius: '4px',
                    position: 'relative',
                    maxWidth: '500px',
                    mx: 'auto',
                    display: 'flex',
                    alignItems: 'flex-start'
                  }}>
                    <Box sx={{ flex: 1, p: 1.5 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.875rem', color: theme.palette.primary.main }}>
                          {guideline}
                        </Typography>
                        <IconButton 
                          size="small" 
                          onClick={() => onOrderAccordionChange(`guideline-${index}`)({} as any, expandedOrderAccordion !== `guideline-${index}`)}
                          sx={{ 
                            color: theme.palette.primary.main,
                            '&:hover': {
                              backgroundColor: 'rgba(25, 118, 210, 0.1)'
                            }
                          }}
                        >
                          <ExpandMoreIcon 
                            sx={{ 
                              fontSize: '1rem',
                              transform: expandedOrderAccordion === `guideline-${index}` ? 'rotate(180deg)' : 'rotate(0deg)',
                              transition: 'transform 0.2s ease'
                            }} 
                          />
                        </IconButton>
                      </Box>
                      {expandedOrderAccordion === `guideline-${index}` && (
                        <Box sx={{ pt: 1 }}>
                            <Typography variant="body2" sx={{ color: theme.palette.primary.main, mb: 2 }}>
                              {guidelineData?.description || 'Description not available.'}
                          </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                              <AccessTimeIcon sx={{ fontSize: '1.2rem', mr: 1, color: '#115293' }} />
                              <Typography variant="body2" sx={{ color: '#115293', fontWeight: 600 }}>
                                Total Duration: {totalDuration} days
                            </Typography>
                          </Box>
                        </Box>
                      )}
                    </Box>
                    {/* <Box sx={{ p: 1.5, pl: 0 }}>
                      <IconButton 
                        size="small" 
                          onClick={() => handleDeleteClick(guideline)}
                        sx={{ 
                          color: theme.palette.primary.main,
                            '&:hover': { backgroundColor: 'rgba(25, 118, 210, 0.1)' }
                        }}
                      >
                        <DeleteIcon sx={{ fontSize: '1rem' }} />
                      </IconButton>
                    </Box> */}
                  </Box>
                  );
                })}
              </Box>
            ) : (
              <Typography variant="body2" sx={{ color: '#666', fontStyle: 'italic', fontSize: '0.875rem' }}>
                No guidelines selected
              </Typography>
            )}
            
            {/* Edit Button at the bottom of Applicable Guidelines */}
            {selectedGuidelines.length > 0 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, pt: 2 }}>
                <Button
                  variant="text"
                  startIcon={<EditIcon sx={{ fontSize: '1rem' }} />}
                  onClick={() => onEditOrder && onEditOrder(cartItems.length > 0 ? cartItems[0] : null)}
                  sx={{ 
                    color: '#115293',
                    fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                    py: 0.5,
                    px: 2,
                    '&:hover': {
                      backgroundColor: 'rgba(17, 82, 147, 0.04)'
                    }
                  }}
                >
                  Edit
                </Button>
              </Box>
            )}
          </Paper>
        </Box>

        {/* Action Buttons */}
        <Box sx={{ p: { xs: 2, md: 3 }, pt: 0, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 2 }}>
          {/* Generate Quotation Button - Only show in checkout mode */}
          {isCheckoutMode && onGenerateQuotation && (
            <Button
              variant="contained"
              onClick={onGenerateQuotation}
              sx={{
                backgroundColor: theme.palette.primary.main,
                color: 'white',
                px: 4,
                py: 1.5,
                borderRadius: '8px',
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 600,
                '&:hover': {
                  backgroundColor: theme.palette.primary.dark,
                }
              }}
            >
              Generate Quotation bbhhhhhhhh
            </Button>
          )}
          
          {/* Action Buttons */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              startIcon={showAddToCartButton ? <ShoppingCartIcon /> : <ArrowForwardIcon />}
              onClick={() => {
                if (showAddToCartButton && !sampleDescription.trim()) {
                  setShowValidationError(true);
                  return;
                }
                setShowValidationError(false);
                onNext(sampleDescription);
              }}
              disabled={false}
              sx={{
                background: 'linear-gradient(105.34deg, #115293 0%, #1976D2 50%, #115293 100%)',
                color: 'white',
                px: 4,
                py: 1.5,
                borderRadius: '8px',
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 600,
                '&:hover': {
                    background: 'linear-gradient(105.34deg, #0d3d6b 0%, #1565c0 50%, #0d3d6b 100%)'
                },
                '&:disabled': {
                  backgroundColor: theme.palette.primary.main,
                  color: 'white',
                  opacity: 0.6
                }
              }}
            >
              {showAddToCartButton ? 'Add to Cart' : 'Next'}
            </Button>
          </Box>
              </Box>
            </Box>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={deleteConfirmOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Are you sure you want to remove this item?"
        message={`This action will remove "${guidelineToDelete}" from your order. You can add it back later if needed.`}
        confirmButtonText="Yes, Remove"
        cancelButtonText="No"
      />
    </>
  );

  return createPortal(modalContent, document.body);
}

export default OrderSummaryModal;