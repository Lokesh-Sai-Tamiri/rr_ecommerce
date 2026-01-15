'use client';

import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useScrollLock } from '../../../../hooks/useScrollLock';
import {
  Button,
  Typography,
  Box,
  IconButton,
  TextField,
  Paper,
  Chip,
  useTheme,
  useMediaQuery,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
// import ScienceIcon from '@mui/icons-material/Science';
// import ListAltIcon from '@mui/icons-material/ListAlt';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getStudyData } from '../data/guidelineData';
import DeleteConfirmationModal from '../../../../components/common/DeleteConfirmationModal';

interface OrderSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (orderData: any) => void;
  selectedProductType: string;
  selectedSampleForm: string;
  selectedSampleSolvent: string;
  selectedMicroorganismType: string;
  selectedMicroorganism: string[];
  selectedStudies: string[];
  numSamples: number;
  customSampleForm: string;
  customSampleSolvent: string;
  customMicroorganism: string;
  onEditOrder?: (orderData: any) => void;
  onRemoveStudy?: (studyName: string) => void;
  onRemoveOrderDetail?: (detailType: string) => void;
  onNumSamplesChange?: (value: number) => void;
  initialSampleDescription?: string;
}

export default function OrderSummaryModal({
  isOpen,
  onClose,
  onAddToCart,
  selectedProductType,
  selectedSampleForm,
  selectedSampleSolvent,
  selectedMicroorganismType,
  selectedMicroorganism,
  selectedStudies,
  numSamples,
  customSampleForm,
  customSampleSolvent,
  customMicroorganism,
  onEditOrder,
  onRemoveStudy,
  onRemoveOrderDetail,
  onNumSamplesChange,
  initialSampleDescription = ''
}: OrderSummaryModalProps) {
  const theme = useTheme();
  
  // Lock body scroll when modal is open
  useScrollLock(isOpen);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [sampleDescription, setSampleDescription] = useState('');
  const [showValidationError, setShowValidationError] = useState(false);
  const [orderNumSamples, setOrderNumSamples] = useState(numSamples);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [studyToDelete, setStudyToDelete] = useState<string | null>(null);
  const [detailToDelete, setDetailToDelete] = useState<string | null>(null);
  const [expandedStudy, setExpandedStudy] = useState<string | false>(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const sampleDescriptionRef = useRef<HTMLDivElement>(null);
  const hasScrolledRef = useRef<boolean>(false);

  // Auto-fill sample description when modal opens
  useEffect(() => {
    if (isOpen && !isInitialized) {
      if (initialSampleDescription) {
        console.log('🔄 Auto-filling sample description from prop:', initialSampleDescription);
        setSampleDescription(initialSampleDescription);
      } else {
        setSampleDescription('');
      }
      setIsInitialized(true);
    } else if (!isOpen) {
      setIsInitialized(false);
      // Reset scroll flag when modal closes
      hasScrolledRef.current = false;
    }
  }, [isOpen, initialSampleDescription, isInitialized]);

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

  // Sync orderNumSamples with numSamples prop changes
  useEffect(() => {
    setOrderNumSamples(numSamples);
  }, [numSamples]);

  const handleNumSamplesChange = (delta: number) => {
    const newValue = orderNumSamples + delta;
    if (newValue >= 1) {
      setOrderNumSamples(newValue);
      // Notify parent component about the change
      if (onNumSamplesChange) {
        onNumSamplesChange(newValue);
      }
    }
  };

  const calculateTotalPrice = () => {
    let total = 0;
    selectedStudies.forEach(studyName => {
      const studyData = getStudyData(selectedProductType, studyName);
      if (studyData) {
        // For microbiology studies, multiply by number of microorganisms
        const microorganismCount = Array.isArray(selectedMicroorganism) ? selectedMicroorganism.length : 1;
        total += studyData.price * microorganismCount * orderNumSamples;
      }
    });
    return total;
  };

  const calculateTotalDuration = () => {
    if (selectedStudies.length === 0) return 0;
    const durations = selectedStudies.map(studyName => {
      const studyData = getStudyData(selectedProductType, studyName);
      return studyData ? studyData.duration : 0;
    });
    return Math.max(...durations);
  };

  const handleAddToCart = () => {
    const processedMicroorganisms = (() => {
      if (customMicroorganism && Array.isArray(selectedMicroorganism) && selectedMicroorganism.includes('Any other')) {
        // Replace "Any other" with custom text, keep all other microorganisms
        return selectedMicroorganism.map(m => m === 'Any other' ? customMicroorganism : m);
      }
      return selectedMicroorganism;
    })();

    const orderData = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      studyType: 'Microbiology & Virology Study',
      category: selectedProductType,
      sampleForm: customSampleForm || selectedSampleForm,
      sampleSolvent: customSampleSolvent || selectedSampleSolvent,
      selectedMicroorganismType,
      selectedMicroorganism: processedMicroorganisms,
      customMicroorganism,
      selectedStudies,
      numSamples: orderNumSamples,
      price: calculateTotalPrice(),
      description: sampleDescription,
      baseDuration: calculateTotalDuration(),
      deviation: 5,
      createdOn: new Date().toISOString(),
      validTill: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      configNo: `RR${String(Math.floor(Math.random() * 1000000)).padStart(6, '0')}`
    };

    console.log('🔥 MICROBIOLOGY OrderSummaryModal - Creating cart item:');
    console.log('🔥 orderData with configNo:', orderData);

    onAddToCart(orderData);
    onClose();
  };

  const getDisplaySampleForm = () => {
    if (selectedSampleForm === 'Others' && customSampleForm) {
      return `${selectedSampleForm} (${customSampleForm})`;
    }
    return selectedSampleForm;
  };

  const getDisplaySampleSolvent = () => {
    if (selectedSampleSolvent === 'Others' && customSampleSolvent) {
      return `${selectedSampleSolvent} (${customSampleSolvent})`;
    }
    return selectedSampleSolvent;
  };

  const getDisplayMicroorganism = () => {
    if (Array.isArray(selectedMicroorganism)) {
      let microorganismList = [...selectedMicroorganism];
      
      // If "Any other" is selected and has custom text, replace it with the custom text
      if (microorganismList.includes('Any other') && customMicroorganism) {
        microorganismList = microorganismList.map(m => 
          m === 'Any other' ? customMicroorganism : m
        );
      }
      
      const count = microorganismList.length;
      const displayList = microorganismList.join(', ');
      return `${displayList} (${count} microorganism${count !== 1 ? 's' : ''})`;
    }
    return selectedMicroorganism || '';
  };

  const handleDeleteClick = (itemToDelete: string) => {
    // Check if it's a study or order detail
    if (selectedStudies.includes(itemToDelete)) {
      setStudyToDelete(itemToDelete);
      setDetailToDelete(null);
    } else {
      setDetailToDelete(itemToDelete);
      setStudyToDelete(null);
    }
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (studyToDelete && onRemoveStudy) {
      onRemoveStudy(studyToDelete);
      setStudyToDelete(null);
    } else if (detailToDelete && onRemoveOrderDetail) {
      onRemoveOrderDetail(detailToDelete);
      setDetailToDelete(null);
    }
    setDeleteConfirmOpen(false);
  };

  const handleCancelDelete = () => {
    setStudyToDelete(null);
    setDetailToDelete(null);
    setDeleteConfirmOpen(false);
  };

  const handleStudyAccordionChange = (studyName: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedStudy(isExpanded ? studyName : false);
  };

  const handleEditClick = () => {
    if (onEditOrder) {
      const orderData = {
        selectedProductType,
        selectedSampleForm,
        selectedSampleSolvent,
        selectedMicroorganismType,
        selectedMicroorganism,
        selectedStudies,
        numSamples: orderNumSamples,
        customSampleForm,
        customSampleSolvent,
        customMicroorganism,
        sampleDescription
      };
      onEditOrder(orderData);
    }
  };

  if (!isOpen) return null;

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
                  onClick={() => handleNumSamplesChange(-1)}
                  disabled={orderNumSamples === 1}
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
                  {orderNumSamples}
                </Typography>
                <IconButton 
                  onClick={() => handleNumSamplesChange(1)}
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
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {/* Sample Form */}
                  {selectedSampleForm && (
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
                        {getDisplaySampleForm()}
                      </Typography>
                    </Box>
                  )}

                  {/* Sample Solvent */}
                  {selectedSampleSolvent && (
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
                        {getDisplaySampleSolvent()}
                      </Typography>
                    </Box>
                  )}

                  {/* Type of Micro-organism */}
                  {selectedMicroorganismType && (
                    <Box sx={{ width: '100%' }}>
                      <Typography variant="body2" sx={{ 
                        fontWeight: 700, 
                        fontSize: '0.9rem',
                        color: theme.palette.primary.main,
                        mb: 1
                      }}>
                        • Type of Micro-organism:
                      </Typography>
                      <Typography variant="body2" sx={{ 
                        color: theme.palette.primary.main,
                        fontSize: '0.8rem',
                        fontWeight: 400,
                        pl: 2,
                        mb: 1
                      }}>
                        {selectedMicroorganismType}
                      </Typography>
                    </Box>
                  )}

                  {/* Micro-organism */}
                  {selectedMicroorganism.length > 0 && (
                    <Box sx={{ width: '100%' }}>
                      <Typography variant="body2" sx={{ 
                        fontWeight: 700, 
                        fontSize: '0.9rem',
                        color: theme.palette.primary.main,
                        mb: 1
                      }}>
                        • Micro-organism:
                      </Typography>
                      <Typography variant="body2" sx={{ 
                        color: theme.palette.primary.main,
                        fontSize: '0.8rem',
                        fontWeight: 400,
                        pl: 2,
                        mb: 1
                      }}>
                        {getDisplayMicroorganism()}
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Box>

              {/* Edit Button inside the card */}
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 'auto', pt: 1.5 }}>
                <Button
                  variant="text"
                  startIcon={<EditIcon sx={{ fontSize: '1rem' }} />}
                  onClick={handleEditClick}
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

          {/* Applicable Methods Card */}
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
                alt="Applicable Methods"
                sx={{ 
                  mr: 1.5, 
                  width: 32, 
                  height: 32,
                  objectFit: 'contain'
                }} 
              />
              <Typography variant="h4" sx={{ color: theme.palette.primary.main, fontWeight: 600, fontSize: { xs: '1.1rem', sm: '1.2rem', md: '1.3rem' } }}>
                Applicable Methods
              </Typography>
            </Box>
            
            {selectedStudies.length > 0 ? (
              <Box>
                {selectedStudies.map((studyName, index) => {
                  const studyData = getStudyData(selectedProductType, studyName);
                  const totalDuration = studyData?.duration || 0;
                  
                  return (
                    <Accordion 
                      key={`study-${index}`}
                      expanded={expandedStudy === studyName}
                      onChange={handleStudyAccordionChange(studyName)}
                      sx={{
                        mb: 1,
                        backgroundColor: 'rgba(25, 118, 210, 0.05)',
                        border: '1px solid rgba(25, 118, 210, 0.2)',
                        borderRadius: '4px !important',
                        boxShadow: 'none',
                        maxWidth: '500px',
                        mx: 'auto',
                        '&:before': {
                          display: 'none',
                        },
                        '&.Mui-expanded': {
                          margin: '0 auto 8px auto',
                        }
                      }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon sx={{ color: theme.palette.primary.main }} />}
                        sx={{
                          minHeight: 'auto',
                          py: 1,
                          px: 1.5,
                          '& .MuiAccordionSummary-content': {
                            margin: '0',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            width: '100%'
                          },
                          '& .MuiAccordionSummary-expandIconWrapper': {
                            color: theme.palette.primary.main,
                            order: 2,
                            marginLeft: 'auto'
                          }
                        }}
                      >
                        <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.875rem', color: theme.palette.primary.main, flex: 1 }}>
                          {studyName}
                        </Typography>
                        {/* <Box
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteClick(studyName);
                          }}
                          sx={{ 
                            color: theme.palette.primary.main,
                            cursor: 'pointer',
                            padding: '4px',
                            borderRadius: '4px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            '&:hover': { backgroundColor: 'rgba(25, 118, 210, 0.1)' },
                            order: 3,
                            ml: 1,
                            mr: 0.5
                          }}
                        >
                          <DeleteIcon sx={{ fontSize: '1.2rem' }} />
                        </Box> */}
                      </AccordionSummary>
                      <AccordionDetails sx={{ pt: 1, pb: 2, px: 1.5 }}>
                        {studyData && (
                          <Typography variant="body2" sx={{ 
                            color: theme.palette.primary.main, 
                            fontWeight: 500,
                            fontSize: '0.875rem'
                          }}>
                            Total Duration: {totalDuration} days
                          </Typography>
                        )}
                      </AccordionDetails>
                    </Accordion>
                  );
                })}
              </Box>
            ) : (
              <Typography variant="body2" sx={{ color: '#666', fontStyle: 'italic', fontSize: '0.875rem' }}>
                No methods selected
              </Typography>
            )}
             <Box sx={{ display: 'flex', justifyContent: 'center', mt: 'auto', pt: 1.5 }}>
                <Button
                  variant="text"
                  startIcon={<EditIcon sx={{ fontSize: '1rem' }} />}
                  onClick={handleEditClick}
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
        <Box sx={{ p: { xs: 2, md: 3 }, pt: 0, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
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
              handleAddToCart();
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
        title="Are you sure you want to remove this item?"
        message={`This action will remove "${studyToDelete || detailToDelete}" from your order. You can add it back later if needed.`}
        confirmButtonText="Yes, Remove"
        cancelButtonText="No"
      />
    </>
  );

  return createPortal(modalContent, document.body);
}