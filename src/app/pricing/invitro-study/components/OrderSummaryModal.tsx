import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useScrollLock } from '../../../../hooks/useScrollLock';
import {
  Box,
  Typography,
  Paper,
  TextField,
  IconButton,
  Button
} from '@mui/material';
// import ScienceIcon from '@mui/icons-material/Science';
// import ListAltIcon from '@mui/icons-material/ListAlt';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useTheme } from '@mui/material/styles';
import { 
  getGuidelineData,
  nutraceuticalsData,
  cosmeceuticalsData,
  pharmaceuticalsData,
  herbalAyushData
} from '../data/guidelineData';
import DeleteConfirmationModal from '../../../../components/common/DeleteConfirmationModal';

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
  selectedTherapeuticAreas?: string[];
  expandedOrderAccordion: string | false;
  onNumSamplesChange: (increment: boolean) => void;
  onOrderAccordionChange: (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => void;
  onRemoveGuideline?: (guideline: string, cartIndex?: number, sectionType?: 'sampleForm' | 'sampleSolvent') => void;
  isCheckoutMode?: boolean;
  cartItems?: any[];
  onEditOrder?: (cartItem: any) => void;
  isEditMode?: boolean;
  initialSampleDescription?: string;
}

export default function OrderSummaryModal({
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
  selectedTherapeuticAreas = [],
  expandedOrderAccordion,
  onNumSamplesChange,
  onOrderAccordionChange,
  onRemoveGuideline,
  isCheckoutMode = false,
  cartItems = [],
  onEditOrder,
  isEditMode = false,
  sampleFormGuidelines = [],
  sampleSolventGuidelines = [],
  initialSampleDescription = ''
}: OrderSummaryModalProps) {
  const theme = useTheme();
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [guidelineToDelete, setGuidelineToDelete] = useState<string | null>(null);
  const [cartIndexToDelete, setCartIndexToDelete] = useState<number | null>(null);
  const [tempCartIndex, setTempCartIndex] = useState<number | null>(null);
  const [sectionTypeToDelete, setSectionTypeToDelete] = useState<'sampleForm' | 'sampleSolvent' | 'application' | null>(null);
  const [mounted, setMounted] = useState(false);
  const [sampleDescription, setSampleDescription] = useState('');
  const [showValidationError, setShowValidationError] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const sampleDescriptionRef = useRef<HTMLDivElement>(null);
  const hasScrolledRef = useRef<boolean>(false);

  // Function to find therapeutic area for a given guideline
  const findTherapeuticAreaForGuideline = (guideline: string): string | null => {
    const allData = [...nutraceuticalsData, ...cosmeceuticalsData, ...pharmaceuticalsData, ...herbalAyushData];
    const data = allData.find(item => item.studyName === guideline);
    return data ? data.therapeuticArea : null;
  };

  // Set mounted to true on client side
  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll when modal is open
  useScrollLock(isOpen);

  // Reset sample description when modal opens or auto-fill for edit mode
  useEffect(() => {
    if (isOpen && !isInitialized) {
      if (initialSampleDescription) {
        console.log('🔄 Auto-filling sample description from prop:', initialSampleDescription);
        setSampleDescription(initialSampleDescription);
      } else if (cartItems.length > 0 && cartItems[0].sampleDescription) {
        console.log('🔄 Auto-filling sample description from cart item:', cartItems[0].sampleDescription);
        setSampleDescription(cartItems[0].sampleDescription);
      } else {
        setSampleDescription('');
      }
      setIsInitialized(true);
    } else if (!isOpen) {
      setIsInitialized(false);
      // Reset scroll flag when modal closes
      hasScrolledRef.current = false;
    }
  }, [isOpen, initialSampleDescription, cartItems, isInitialized]);

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




  if (!isOpen || !mounted) return null;

  const handleDeleteClick = (guideline: string, cartIndex?: number, sectionType?: 'sampleForm' | 'sampleSolvent') => {
    const cartIndexToSet = cartIndex !== undefined ? cartIndex : null;
    setGuidelineToDelete(guideline);
    setCartIndexToDelete(cartIndexToSet);
    setTempCartIndex(cartIndexToSet);
    setSectionTypeToDelete(sectionType || null);
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (guidelineToDelete && onRemoveGuideline) {
      // Convert sectionType to match function signature
      const sectionType = sectionTypeToDelete === 'application' ? undefined : sectionTypeToDelete;
      onRemoveGuideline(guidelineToDelete, tempCartIndex, sectionType);
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
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: { xs: '100%', sm: '100%', md: '628px' },
          height: '100vh',
          maxWidth: { xs: '100vw', sm: '100vw', md: '628px' },
          zIndex: '99999 !important',
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
                  sx={{
                    backgroundColor: 'transparent',
                    color: 'white',
                    minWidth: '32px',
                    width: '32px',
                    height: '32px',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                    '&:disabled': {
                      color: 'rgba(255, 255, 255, 0.5)',
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
                  sx={{
                    backgroundColor: 'transparent',
                    color: 'white',
                    minWidth: '32px',
                    width: '32px',
                    height: '32px',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
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
                <Typography variant="body2" sx={{ 
                  fontWeight: 600, 
                  color: theme.palette.primary.main, 
                  mb: 1,
                  fontSize: '0.9rem'
                }}>
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
                      {/* <Typography variant="body2" sx={{ 
                        fontWeight: 700, 
                        fontSize: '0.9rem',
                        color: theme.palette.primary.main,
                        mb: 1,
                        borderBottom: '1px solid rgba(25, 118, 210, 0.2)',
                        pb: 0.5
                      }}>
                        Cart Item {index + 1}: {cartItem.category}
                      </Typography> */}
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

                        {/* Therapeutic Areas */}
                        {cartItem.selectedTherapeuticAreas && cartItem.selectedTherapeuticAreas.length > 0 && (
                          <Box sx={{ width: '100%' }}>
                            <Typography variant="body2" sx={{ 
                              fontWeight: 700, 
                              fontSize: '0.9rem',
                              color: theme.palette.primary.main,
                              mb: 1
                            }}>
                              Therapeutic Areas:
                            </Typography>
                            {cartItem.selectedTherapeuticAreas.map((area, areaIndex) => (
                              <Typography 
                                key={`cartTherapeuticArea-${index}-${areaIndex}`}
                                variant="body2" 
                                sx={{ 
                                  color: theme.palette.primary.main,
                                  fontSize: '0.8rem',
                                  fontWeight: 700,
                                  mb: 0.5,
                                  display: 'block'
                                }}
                              >
                                • {area}
                              </Typography>
                            ))}
                          </Box>
                        )}

                        {/* Application - Only show for Invitro Study */}
                        {cartItem.application && cartItem.application !== 'Invitro Study' && (
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

                    {/* Therapeutic Areas */}
                    {selectedTherapeuticAreas && selectedTherapeuticAreas.length > 0 && (
                      <Box sx={{ width: '100%' }}>
                        <Typography variant="body2" sx={{ 
                          fontWeight: 700, 
                          fontSize: '0.9rem',
                          color: theme.palette.primary.main,
                          mb: 1
                        }}>
                          Therapeutic Areas:
                        </Typography>
                        {selectedTherapeuticAreas.map((area, index) => (
                          <Typography 
                            key={`therapeuticArea-${index}`}
                            variant="body2" 
                            sx={{ 
                              color: theme.palette.primary.main,
                              fontSize: '0.8rem',
                              fontWeight: 700,
                              mb: 0.5,
                              display: 'block'
                            }}
                          >
                            • {area}
                          </Typography>
                        ))}
                      </Box>
                    )}

                    {/* Application - Only show for Invitro Study */}
                    {application && application !== 'Invitro Study' && (
                      <Box sx={{ width: '100%' }}>
                        <Typography variant="body2" sx={{ 
                          fontWeight: 700, 
                          fontSize: '0.9rem',
                          color: theme.palette.primary.main,
                          mb: 1
                        }}>
                          Application: {application}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                )}
              </Box>

              {/* Edit Button inside the card */}
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 'auto', pt: 1.5 }}>
                <Button
                  variant="text"
                  startIcon={<EditIcon sx={{ fontSize: '1rem' }} />}
                  onClick={() => {
                    if (onEditOrder && cartItems[0]) {
                      onEditOrder(cartItems[0]);
                    }
                    onClose(); // Ensure modal closes
                  }}
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
            </Paper>
          </Paper>

          {/* Applicable Studies Card */}
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
                alt="Applicable Studies"
                sx={{ 
                  mr: 1.5, 
                  width: 32, 
                  height: 32,
                  objectFit: 'contain'
                }} 
              />
              <Typography variant="h4" sx={{ color: theme.palette.primary.main, fontWeight: 600, fontSize: { xs: '1.1rem', sm: '1.2rem', md: '1.3rem' } }}>
                Applicable Studies
              </Typography>
            </Box>
            
            {(isCheckoutMode || (cartItems.length > 0 && !isEditMode)) ? (
              // Show all cart items in checkout mode with separate accordion sections
              <Box>
                {cartItems.map((cartItem, cartIndex) => (
                  <Box key={cartIndex} sx={{ mb: 3 }}>
                    {/* <Typography variant="h6" sx={{ 
                      fontWeight: 600, 
                      color: theme.palette.primary.main, 
                      mb: 2,
                      fontSize: '1rem',
                      borderBottom: '1px solid rgba(25, 118, 210, 0.2)',
                      pb: 1
                    }}>
                      Cart Item {cartIndex + 1}: {cartItem.category}
                    </Typography> */}
                    
                    {/* Combined Guidelines - Mixed together */}
                    {(() => {
                      // Combine all guidelines from both sections
                      const allGuidelines = [...(cartItem.sampleFormGuidelines || []), ...(cartItem.sampleSolventGuidelines || [])];
                      const uniqueGuidelines = [...new Set(allGuidelines)]; // Remove duplicates
                      
                      return uniqueGuidelines.length > 0 && (
                      <Box sx={{ mb: 2 }}>
                        {/* <Typography variant="subtitle1" sx={{ 
                          fontWeight: 600, 
                          color: theme.palette.primary.main, 
                          mb: 1,
                          fontSize: '0.9rem'
                        }}>
                          Applicable Studies
                        </Typography> */}
                        {uniqueGuidelines.map((guideline, guidelineIndex) => {
                          const guidelineData = getGuidelineData(cartItem.category, guideline);
                          const totalDuration = guidelineData?.duration || 0;
                          
                          return (
                            <Box key={`combined-${cartIndex}-${guidelineIndex}`} sx={{ 
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
                                    onClick={() => onOrderAccordionChange(`combined-${cartIndex}-${guidelineIndex}`)({} as any, expandedOrderAccordion !== `combined-${cartIndex}-${guidelineIndex}`)}
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
                                        transform: expandedOrderAccordion === `combined-${cartIndex}-${guidelineIndex}` ? 'rotate(180deg)' : 'rotate(0deg)',
                                        transition: 'transform 0.2s ease'
                                      }} 
                                    />
                                  </IconButton>
                                </Box>
                                {expandedOrderAccordion === `combined-${cartIndex}-${guidelineIndex}` && (
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
                              <Box sx={{ p: 1.5, pl: 0 }}>
                                <IconButton 
                                  size="small" 
                                  onClick={() => handleDeleteClick(guideline, cartIndex)}
                                  sx={{ 
                                    color: theme.palette.primary.main,
                                    '&:hover': { backgroundColor: 'rgba(25, 118, 210, 0.1)' }
                                  }}
                                >
                                  <DeleteIcon sx={{ fontSize: '1rem' }} />
                                </IconButton>
                              </Box>
                            </Box>
                          );
                        })}
                      </Box>
                      );
                    })()}

                    {/* Application Guidelines Accordion - Only show if not Invitro Study */}
                    {cartItem.application && cartItem.application !== 'Invitro Study' && (
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle1" sx={{ 
                          fontWeight: 600, 
                          color: theme.palette.primary.main, 
                          mb: 1,
                          fontSize: '0.9rem'
                        }}>
                          Application: {cartItem.application}
                        </Typography>
                        {(cartItem.applicationGuidelines || []).map((guideline, guidelineIndex) => {
                          const guidelineData = getGuidelineData(cartItem.category, guideline);
                          const totalDuration = guidelineData?.duration || 0;
                          
                          return (
                            <Box key={`application-${cartIndex}-${guidelineIndex}`} sx={{ 
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
                                    onClick={() => onOrderAccordionChange(`application-${cartIndex}-${guidelineIndex}`)({} as any, expandedOrderAccordion !== `application-${cartIndex}-${guidelineIndex}`)}
                                    sx={{ 
                                      color: theme.palette.primary.main,
                                      '&:hover': { backgroundColor: 'rgba(25, 118, 210, 0.1)' }
                                    }}
                                  >
                                    <ExpandMoreIcon 
                                      sx={{ 
                                        fontSize: '1rem',
                                        transform: expandedOrderAccordion === `application-${cartIndex}-${guidelineIndex}` ? 'rotate(180deg)' : 'rotate(0deg)',
                                        transition: 'transform 0.2s ease'
                                      }} 
                                    />
                                  </IconButton>
                                </Box>
                                {expandedOrderAccordion === `application-${cartIndex}-${guidelineIndex}` && (
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
                              <Box sx={{ p: 1.5, pl: 0 }}>
                                <IconButton 
                                  size="small" 
                                  onClick={() => handleDeleteClick(guideline, cartIndex)}
                                  sx={{ 
                                    color: theme.palette.primary.main,
                                    '&:hover': { backgroundColor: 'rgba(25, 118, 210, 0.1)' }
                                  }}
                                >
                                  <DeleteIcon sx={{ fontSize: '1rem' }} />
                                </IconButton>
                              </Box>
                            </Box>
                          );
                        })}
                      </Box>
                    )}
                  </Box>
                ))}
              </Box>
            ) : (selectedGuidelines.length > 0) ? (
              // Show guidelines grouped by section
              <Box>
                {/* Selected Guidelines */}
                {selectedGuidelines.length > 0 && (
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" sx={{ 
                      color: theme.palette.primary.main, 
                      fontWeight: 'bold', 
                      mb: 2,
                      fontSize: '1rem',
                      borderBottom: '2px solid rgba(25, 118, 210, 0.2)',
                      pb: 1
                    }}>
                      {/* Applicable Studies */}
                    </Typography>
                    {selectedGuidelines.map((guideline, index) => {
                      const therapeuticArea = findTherapeuticAreaForGuideline(guideline);
                      const guidelineData = therapeuticArea ? getGuidelineData(therapeuticArea, guideline) : null;
                      const baseDuration = guidelineData?.duration || 30;
                      const discountPercent = guidelineData?.discount ? parseInt(guidelineData.discount.replace('%', '')) : 5;
                      const deviation = baseDuration * (discountPercent / 100);
                      const totalDuration = Math.round(baseDuration + deviation);
                      
                      return (
                        <Box key={`form-${index}`} sx={{ 
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
                                onClick={() => onOrderAccordionChange(`form-guideline-${index}`)({} as any, expandedOrderAccordion !== `form-guideline-${index}`)}
                                sx={{ 
                                  color: theme.palette.primary.main,
                                  '&:hover': { backgroundColor: 'rgba(25, 118, 210, 0.1)' }
                                }}
                              >
                                <ExpandMoreIcon 
                                  sx={{ 
                                    fontSize: '1rem',
                                    transform: expandedOrderAccordion === `form-guideline-${index}` ? 'rotate(180deg)' : 'rotate(0deg)',
                                    transition: 'transform 0.2s ease'
                                  }} 
                                />
                              </IconButton>
                            </Box>
                            {expandedOrderAccordion === `form-guideline-${index}` && (
                              <Box sx={{ pt: 1 }}>
                                {/* Duration Information */}
                                <Box sx={{ 
                                  display: 'flex', 
                                  alignItems: 'center', 
                                  mb: 2
                                }}>
                                  <AccessTimeIcon sx={{ fontSize: '1.2rem', mr: 1, color: '#115293' }} />
                                  <Typography
                                    variant="body2"
                                    sx={{
                                      color: '#115293',
                                      fontFamily: 'Open Sans',
                                      fontWeight: 600,
                                      fontStyle: 'normal',
                                      fontSize: '14px',
                                      lineHeight: '20px',
                                      letterSpacing: '0px'
                                    }}
                                  >
                                    Total Duration: {totalDuration} days
                                  </Typography>
                                </Box>
                              </Box>
                            )}
                          </Box>
                          {/* <Box sx={{ p: 1.5, pl: 0 }}>
                            <IconButton 
                              size="small" 
                              onClick={() => handleDeleteClick(guideline, undefined, 'sampleForm')}
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
                )}

              </Box>
            ) : (
              <Typography variant="body2" sx={{ color: '#666', fontStyle: 'italic', fontSize: '0.875rem' }}>
                No guidelines selected
              </Typography>
            )}
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 'auto', pt: 1.5 }}>
                <Button
                  variant="text"
                  startIcon={<EditIcon sx={{ fontSize: '1rem' }} />}
                  onClick={() => {
                    if (onEditOrder && cartItems[0]) {
                      onEditOrder(cartItems[0]);
                    }
                    onClose(); // Ensure modal closes
                  }}
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
          </Paper>
        </Box>

        {/* Action Buttons */}
        <Box sx={{ p: { xs: 2, md: 3 }, pt: 0, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 2 }}>
          {/* Generate Quotation Button - Only show in checkout mode */}
          {isCheckoutMode && onGenerateQuotation && (
            <Button
              variant="outlined"
              size="medium"
              startIcon={<Box component="img" src="/assets/images/landing/pricing/applicablestudies.png" alt="Generate Quotation" sx={{ width: 16, height: 16, objectFit: 'contain' }} />}
              onClick={onGenerateQuotation}
              sx={{
                py: 1,
                px: 3,
                borderColor: theme.palette.primary.main,
                color: theme.palette.primary.main,
                borderRadius: '8px',
                '&:hover': {
                  borderColor: theme.palette.primary.dark,
                  backgroundColor: 'rgba(25, 118, 210, 0.04)'
                }
              }}
            >
              Generate Quotation
            </Button>
          )}
          
          {/* Add to Cart Button */}
          <Button
            variant="contained"
            size="medium"
            startIcon={<ShoppingCartIcon sx={{ fontSize: '1rem' }} />}
            onClick={() => {
              if (!sampleDescription.trim()) {
                setShowValidationError(true);
                return;
              }
              setShowValidationError(false);
              onNext(sampleDescription);
            }}
            disabled={false}
            sx={{
              py: 1,
              px: 3,
              background: 'linear-gradient(105.34deg, #115293 0%, #1976D2 50%, #115293 100%)',
              color: 'white',
              textTransform: 'none',
              borderRadius: '8px',
              '&:hover': {
                background: 'linear-gradient(105.34deg, #0d3d6b 0%, #1565c0 50%, #0d3d6b 100%)',
              },
              '&:disabled': {
                backgroundColor: '#AACAE9',
                color: '#666'
              }
            }}
          >
            Add to Cart
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
          backgroundColor: deleteConfirmOpen ? 'rgba(0, 0, 0, 0.6)' : 'rgba(0, 0, 0, 0.5)',
          backdropFilter: deleteConfirmOpen ? 'blur(3px)' : 'none',
                        zIndex: 99998,
          animation: 'fadeIn 0.3s ease-out',
          transition: 'all 0.3s ease'
        }}

      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={deleteConfirmOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Are you sure you want to remove this guideline?"
        message={`This action will remove "${guidelineToDelete}" from your order. You can add it back later if needed.`}
        confirmButtonText="Yes, Remove"
        cancelButtonText="No"
      />
    </>
  );

  return createPortal(modalContent, document.body);
}