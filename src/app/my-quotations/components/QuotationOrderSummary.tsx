/**
 * @fileoverview Quotation Order Summary Modal Component
 */

"use client";

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useScrollLock } from '../../../hooks/useScrollLock';
import {
  Box,
  Typography,
  Paper,
  IconButton,
  Button
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useTheme } from '@mui/material/styles';
import QuotationPreviewModal from './QuotationPreviewModal';

interface QuotationOrderSummaryProps {
  open: boolean;
  onClose: () => void;
  item: any; // Item data
  subTab?: string; // Add subTab prop
  onPayClick?: (item: any) => void;
  onViewQuotationClick?: (item: any) => void;
}

export default function QuotationOrderSummary({
  open,
  onClose,
  item,
  subTab,
  onPayClick,
  onViewQuotationClick,
}: QuotationOrderSummaryProps) {
  const theme = useTheme();
  const [expandedAccordion, setExpandedAccordion] = useState<string | false>(false);
  const [mounted, setMounted] = useState(false);
  const [quotationPreviewOpen, setQuotationPreviewOpen] = useState(false);

  // Set mounted to true on client side
  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll when modal is open
  useScrollLock(open);

  if (!open || !mounted || !item) return null;

  const handleAccordionChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedAccordion(isExpanded ? panel : false);
  };

  const handlePayClick = () => {
    if (onPayClick) {
      onPayClick(item);
    }
  };

  const handleViewQuotationClick = () => {
    setQuotationPreviewOpen(true);
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
                  disabled
                  sx={{
                    backgroundColor: 'transparent',
                    color: 'white',
                    minWidth: '32px',
                    width: '32px',
                    height: '32px',
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
                  {item.numberOfSamples}
                </Typography>
                <IconButton 
                  disabled
                  sx={{
                    backgroundColor: 'transparent',
                    color: 'white',
                    minWidth: '32px',
                    width: '32px',
                    height: '32px',
                    '&:disabled': {
                      color: 'rgba(255, 255, 255, 0.5)',
                    }
                  }}
                >
                  <AddIcon sx={{ fontSize: '1.2rem' }} />
                </IconButton>
              </Box>
            </Box>

            {/* Sample Description */}
            {item.sampleDescription && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ 
                  fontWeight: 600, 
                  color: theme.palette.primary.main, 
                  mb: 1,
                  fontSize: '0.9rem'
                }}>
                  Sample Description: 
                  <span style={{ fontWeight: 400, marginLeft: 8 }}>
                    {item.sampleDescription}
                  </span>
                </Typography>
              </Box>
            )}

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
                  {/* Product Type */}
                  {item.category && (
                    <Box sx={{ width: '100%' }}>
                      <Typography variant="body2" sx={{ 
                        fontSize: '0.9rem',
                        color: theme.palette.primary.main,
                        mb: 1
                      }}>
                        <span style={{ fontWeight: 700 }}>• Product Type:</span> {item.category}
                      </Typography>
                    </Box>
                  )}

                  {/* Sample Form */}
                  {item.sampleForm && (
                    <Box sx={{ width: '100%' }}>
                      <Typography variant="body2" sx={{ 
                        fontSize: '0.9rem',
                        color: theme.palette.primary.main,
                        mb: 1
                      }}>
                        <span style={{ fontWeight: 700 }}>• Sample Form:</span> {item.sampleForm}
                      </Typography>
                    </Box>
                  )}

                  {/* Sample Solvent */}
                  {item.sampleSolvent && (
                    <Box sx={{ width: '100%' }}>
                      <Typography variant="body2" sx={{ 
                        fontSize: '0.9rem',
                        color: theme.palette.primary.main,
                        mb: 1
                      }}>
                        <span style={{ fontWeight: 700 }}>• Sample Solvent:</span> {item.sampleSolvent}
                      </Typography>
                    </Box>
                  )}

                  {/* Therapeutic Areas - for Invitro Study */}
                  {item.studyType === "Invitro Study" && item.therapeuticAreas && (
                    <Box sx={{ width: '100%' }}>
                      <Typography variant="body2" sx={{ 
                        fontSize: '0.9rem',
                        color: theme.palette.primary.main,
                        mb: 1
                      }}>
                        <span style={{ fontWeight: 700 }}>• Therapeutic Areas:</span> {item.therapeuticAreas}
                      </Typography>
                    </Box>
                  )}

                  {/* Type of Micro-organism - for Microbiology Study */}
                  {item.studyType === "Microbiology & Virology Study" && item.typeOfMicroorganism && (
                    <Box sx={{ width: '100%' }}>
                      <Typography variant="body2" sx={{ 
                        fontSize: '0.9rem',
                        color: theme.palette.primary.main,
                        mb: 1
                      }}>
                        <span style={{ fontWeight: 700 }}>• Type of Micro-organism:</span> {item.typeOfMicroorganism}
                      </Typography>
                    </Box>
                  )}

                  {/* Micro-organism - for Microbiology Study */}
                  {item.studyType === "Microbiology & Virology Study" && item.microorganism && (
                    <Box sx={{ width: '100%' }}>
                      <Typography variant="body2" sx={{ 
                        fontSize: '0.9rem',
                        color: theme.palette.primary.main,
                        mb: 1
                      }}>
                        <span style={{ fontWeight: 700 }}>• Micro-organism:</span> {item.microorganism}
                      </Typography>
                    </Box>
                  )}

                  {/* Application - for non-Invitro studies */}
                  {item.studyType !== "Invitro Study" && item.application && (
                    <Box sx={{ width: '100%' }}>
                      <Typography variant="body2" sx={{ 
                        fontSize: '0.9rem',
                        color: theme.palette.primary.main,
                        mb: 1
                      }}>
                        <span style={{ fontWeight: 700 }}>• Application:</span> {item.application}
                      </Typography>
                    </Box>
                  )}
                </Box>
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
            
            {/* Guidelines */}
            {(() => {
              // Combine all possible guideline sources for different study types
              const allGuidelines = [
                ...(item.selectedGuidelines || []),
                ...(item.sampleFormGuidelines || []),
                ...(item.sampleSolventGuidelines || []),
                ...(item.applicationGuidelines || []),
                ...(item.selectedStudies || []) // For Microbiology studies
              ];
              
              // Remove duplicates
              const uniqueGuidelines = [...new Set(allGuidelines)].filter(g => g && g.trim());
              
              return uniqueGuidelines.length > 0 ? (
                <Box>
                  {uniqueGuidelines.map((guideline: string, index: number) => (
                    <Box key={`guideline-${index}`} sx={{ 
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
                            onClick={() => handleAccordionChange(`guideline-${index}`)({} as any, expandedAccordion !== `guideline-${index}`)}
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
                                transform: expandedAccordion === `guideline-${index}` ? 'rotate(180deg)' : 'rotate(0deg)',
                                transition: 'transform 0.2s ease'
                              }} 
                            />
                          </IconButton>
                        </Box>
                        {expandedAccordion === `guideline-${index}` && (
                          <Box sx={{ pt: 1 }}>
                            <Typography variant="body2" sx={{ color: theme.palette.primary.main, mb: 2 }}>
                              This guideline provides comprehensive testing protocols for {item.studyType.toLowerCase()}.
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                              <AccessTimeIcon sx={{ fontSize: '1.2rem', mr: 1, color: '#115293' }} />
                              <Typography variant="body2" sx={{ color: '#115293', fontWeight: 600 }}>
                                Total Duration: 30-45 days
                              </Typography>
                            </Box>
                          </Box>
                        )}
                      </Box>
                    </Box>
                  ))}
                </Box>
              ) : (
                <Typography variant="body2" sx={{ color: '#666', fontStyle: 'italic', fontSize: '0.875rem' }}>
                  No guidelines selected
                </Typography>
              );
            })()}
          </Paper>
        </Box>

        {/* Action Buttons - At Bottom of Modal Content */}
        <Box sx={{ 
          position: 'relative',
          display: 'flex', 
          justifyContent: 'flex-end', 
          alignItems: 'center', 
          gap: 2,
          mt: 3,
          mb: 2,
          px: { xs: 2, md: 3 },
          zIndex: 10
        }}>
          {/* View Quotation Button */}
          <Button
            variant="outlined"
            size="medium"
            onClick={handleViewQuotationClick}
            disabled={subTab === "requested"} // Disable for requested status
            sx={{
              py: 1.2,
              px: 4,
              borderColor: theme.palette.primary.main,
              color: theme.palette.primary.main,
              borderRadius: '8px',
              backgroundColor: 'rgba(25, 118, 210, 0.04)',
              backdropFilter: 'blur(4px)',
              fontSize: '0.95rem',
              fontWeight: 500,
              minWidth: '140px',
              opacity: subTab === "requested" ? 0.85 : 1,
              '&:hover': {
                borderColor: theme.palette.primary.dark,
                backgroundColor: 'rgba(25, 118, 210, 0.08)'
              },
              '&:disabled': {
                opacity: 0.85,
              }
            }}
          >
            View Quotation
          </Button>
          
          {/* Pay Button - Hide for requested status */}
          {/* {subTab !== "requested" && (
            <Button
              variant="contained"
              size="medium"
              onClick={handlePayClick}
              disabled={subTab === "expired"} // Disable for expired status
              sx={{
                py: 1.2,
                px: 4,
                background: 'linear-gradient(105.34deg, #115293 0%, #1976D2 50%, #115293 100%)',
                color: 'white',
                textTransform: 'none',
                borderRadius: '8px',
                boxShadow: theme.shadows[3],
                fontSize: '0.95rem',
                fontWeight: 600,
                minWidth: '140px',
                opacity: subTab === "expired" ? 0.85 : 1,
                '&:hover': {
                  background: 'linear-gradient(105.34deg, #0d3d6b 0%, #1565c0 50%, #0d3d6b 100%)',
                  boxShadow: theme.shadows[6]
                },
                '&:disabled': {
                  opacity: 0.85,
                }
              }}
            >
              Pay
            </Button>
          )} */}
        </Box>
      </Box>

      {/* Quotation Preview Modal */}
      <QuotationPreviewModal
        open={quotationPreviewOpen}
        onClose={() => setQuotationPreviewOpen(false)}
        item={item}
      />

      {/* Backdrop */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 99998,
          animation: 'fadeIn 0.3s ease-out',
        }}
        onClick={onClose}
      />
    </>
  );

  return createPortal(modalContent, document.body);
}