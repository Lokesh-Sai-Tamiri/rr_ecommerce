'use client';

import React, { useState, Fragment } from 'react';
import {
  Box,
  Typography,
  Paper,
  FormControlLabel,
  Checkbox,
  Button,
  IconButton,
  Divider,
  Chip,
  Tooltip
} from '@mui/material';
// import ListAltIcon from '@mui/icons-material/ListAlt';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useTheme } from '@mui/material/styles';
import { nutraceuticalsData, cosmeceuticalsData, pharmaceuticalsData, herbalAyushData } from '../data/guidelineData';
import GuidelineDetailModal from './GuidelineDetailModal';

interface ApplicableGuidelinesCardProps {
  therapeuticAreas: string[];
  selectedGuidelines: string[];
  onGuidelineChange: (guidelines: string[]) => void;
  onClearAll: () => void;
  onProceed: () => void;
  selectedProductType: string;
  isProceedEnabled?: boolean;
  activeSection?: 'sampleForm' | 'sampleSolvent';
  sampleFormGuidelines?: string[];
  sampleSolventGuidelines?: string[];
  isEditMode?: boolean;
  selectedSampleForm?: string; // Add sample form requirement
  selectedSampleSolvent?: string; // Add sample solvent requirement
  customSampleForm?: string; // Add custom sample form text
  customSampleSolvent?: string; // Add custom sample solvent text
  customTherapeuticArea?: string; // Add custom therapeutic area text
}

export default function ApplicableGuidelinesCard({
  therapeuticAreas,
  selectedGuidelines,
  onGuidelineChange,
  onClearAll,
  onProceed,
  selectedProductType,
  isProceedEnabled = true,
  activeSection = 'sampleForm',
  sampleFormGuidelines = [],
  sampleSolventGuidelines = [],
  isEditMode = false,
  selectedSampleForm = '',
  selectedSampleSolvent = '',
  customSampleForm = '',
  customSampleSolvent = '',
  customTherapeuticArea = ''
}: ApplicableGuidelinesCardProps) {
  
  // Debug logging
  console.log('🔄 ApplicableGuidelinesCard received:', {
    therapeuticAreas,
    selectedGuidelines,
    'selectedGuidelines.length': selectedGuidelines.length,
    selectedProductType,
    activeSection,
    isEditMode
  });
  
  const [selectedGuideline, setSelectedGuideline] = useState<string | null>(null);
  const [selectedTherapeuticArea, setSelectedTherapeuticArea] = useState<string | null>(null);
  const [showGuidelineDetails, setShowGuidelineDetails] = useState(false);

  // Get data based on selected product type
  const getDataForProductType = () => {
    switch (selectedProductType) {
      case 'nutraceuticals':
        return nutraceuticalsData;
      case 'cosmeceuticals':
        return cosmeceuticalsData;
      case 'pharmaceuticals':
        return pharmaceuticalsData;
      case 'herbalAyush':
        return herbalAyushData;
      default:
        return nutraceuticalsData;
    }
  };

  const handleGuidelineClick = (guideline: string, therapeuticArea: string) => {
    setSelectedGuideline(guideline);
    setSelectedTherapeuticArea(therapeuticArea);
    setShowGuidelineDetails(true);
  };

  const handleCloseGuidelineDetails = () => {
    setShowGuidelineDetails(false);
    setSelectedGuideline(null);
    setSelectedTherapeuticArea(null);
  };

  const handleGuidelineToggle = (guideline: string) => {
    const newSelected = selectedGuidelines.includes(guideline)
      ? selectedGuidelines.filter(g => g !== guideline)
      : [...selectedGuidelines, guideline];
    onGuidelineChange(newSelected);
  };

  const getStudiesForArea = (area: string) => {
    const data = getDataForProductType();
    return data.filter(item => item.therapeuticArea === area);
  };

  const getTherapeuticAreas = () => {
    const data = getDataForProductType();
    return [...new Set(data.map(item => item.therapeuticArea))];
  };

  const getSelectedCountForArea = (area: string) =>
    getStudiesForArea(area).filter(study => selectedGuidelines.includes(study.studyName)).length;

  // Check if all required product detail fields are selected
  const areAllFieldsSelected = () => {
    // Check if "Others" is selected for sample form but has no custom text
    const hasOthersSampleFormWithoutText = selectedSampleForm === 'Others' && (!customSampleForm || customSampleForm.trim() === '');
    
    // Check if "Others" is selected for sample solvent but has no custom text
    const hasOthersSampleSolventWithoutText = selectedSampleSolvent === 'Others' && (!customSampleSolvent || customSampleSolvent.trim() === '');
    
    // Check if "Others" is selected for therapeutic area but has no custom text
    const hasOthersTherapeuticAreaWithoutText = therapeuticAreas.includes('Others') && (!customTherapeuticArea || customTherapeuticArea.trim() === '');
    
    // If any "Others" option is selected but has no text, don't show studies
    if (hasOthersSampleFormWithoutText || hasOthersSampleSolventWithoutText || hasOthersTherapeuticAreaWithoutText) {
      return false;
    }
    
    return selectedSampleForm && selectedSampleSolvent && therapeuticAreas.length > 0;
  };

  const allFieldsSelected = areAllFieldsSelected();
  const theme = useTheme();

  return (
    <>
      <Paper 
        elevation={3}
        sx={{ 
          width: { xs: '100%', sm: '450px', md: '500px' },
          height: { xs: 'auto', md: '630px' },
          minHeight: { xs: '550px', md: '630px' },
          maxHeight: { xs: '80vh', md: '630px' },
          p: 2.5,
          backgroundImage: 'url(/assets/images/home-bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          borderRadius: '4px',
          border: '1px solid #AACAE9',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >
        {/* Header - Fixed */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          mb: 2,
          pb: 2,
          borderBottom: 1,
          borderColor: '#AACAE9',
          flexShrink: 0
        }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box 
            component="img" 
            src="/assets/images/landing/pricing/applicablestudies.png" 
            alt="Applicable Studies"
            sx={{ 
              mr: 1, 
              width: 32, 
              height: 32,
              objectFit: 'contain'
            }} 
          />
          <Typography
              variant="h6" 
              component="h2" 
              sx={{ 
                color: theme.palette.primary.main, 
                fontFamily: 'Open Sans',
                fontWeight: 700,
                fontStyle: 'normal',
                fontSize: '20px',
                lineHeight: '140%',
                letterSpacing: '0%',
                verticalAlign: 'middle'
              }}
            >
              Applicable Studies
            </Typography>
          </Box>
          <Typography 
            variant="body2" 
            onClick={onClearAll}
            sx={{ 
              color: theme.palette.primary.main,
              cursor: 'pointer',
              '&:hover': { color: '#3770A9' }
            }}
          >
            Clear All
          </Typography>
        </Box>

        <Divider sx={{ mb: 2, borderColor: '#AACAE9', flexShrink: 0 }} />

        {/* Guidelines List - Scrollable */}
        <Box sx={{
          flex: 1,
          overflowY: 'auto',
          pr: 1,
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'rgba(25, 118, 210, 0.3)',
            borderRadius: '3px',
            '&:hover': {
              background: 'rgba(25, 118, 210, 0.5)',
            },
          },
          '&::-webkit-scrollbar-thumb:vertical': {
            minHeight: '20px',
          },
        }}>
          {!allFieldsSelected ? (
            // Show "Select all fields" message when not all fields are selected
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              minHeight: '300px',
              textAlign: 'center',
              py: 4
            }}>
              <Box sx={{
                position: 'relative',
                mb: 3,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                {/* Search glass image */}
                <Box
                  component="img"
                  src="/assets/images/landing/pricing/searchglass.png"
                  alt="Search"
                  sx={{ 
                    width: '80px',
                    height: '80px',
                    objectFit: 'contain'
                  }}
                />
              </Box>
              
              <Typography variant="h6" sx={{
                color: theme.palette.primary.main,
                fontWeight: 600,
                mb: 2,
                fontSize: '1.1rem'
              }}>
                No Applicable Studies Found
                </Typography>
                
              <Typography variant="body2" sx={{
                color: theme.palette.text.secondary,
                fontSize: '0.9rem',
                maxWidth: '300px',
                lineHeight: 1.5
              }}>
                {!selectedSampleForm || !selectedSampleSolvent || therapeuticAreas.length === 0 ? 
                  'Select all the fields on Product Details to see the applicable studies' :
                  selectedSampleForm === 'Others' && (!customSampleForm || customSampleForm.trim() === '') ?
                    'Please enter a description for "Others" sample form to see applicable studies' :
                    selectedSampleSolvent === 'Others' && (!customSampleSolvent || customSampleSolvent.trim() === '') ?
                      'Please enter a description for "Others" sample solvent to see applicable studies' :
                      therapeuticAreas.includes('Others') && (!customTherapeuticArea || customTherapeuticArea.trim() === '') ?
                        'Please enter a description for "Others" therapeutic area to see applicable studies' :
                        'Select all the fields on Product Details to see the applicable studies'
                }
              </Typography>
                            </Box>
          ) : therapeuticAreas.length === 0 ? (
            // Show "Select therapeutic areas" message when all fields are selected but no therapeutic areas
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              minHeight: '300px',
              textAlign: 'center',
              py: 4
            }}>
              <Box sx={{
                position: 'relative',
                mb: 3,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                {/* Search glass image */}
                <Box
                  component="img"
                  src="/assets/images/landing/pricing/searchglass.png"
                  alt="Search"
                  sx={{ 
                    width: '80px',
                    height: '80px',
                    objectFit: 'contain'
                  }}
                />
              </Box>
              
              <Typography variant="h6" sx={{
                color: theme.palette.primary.main,
                fontWeight: 600,
                mb: 2,
                fontSize: '1.1rem'
              }}>
                No Applicable Studies Found
                </Typography>
                
              <Typography variant="body2" sx={{
                color: theme.palette.text.secondary,
                fontSize: '0.9rem',
                maxWidth: '300px',
                lineHeight: 1.5
              }}>
                Select the Therapeutic Areas to see the applicable studies
                              </Typography>
                            </Box>
          ) : (
            // Show only selected therapeutic area cards with enabled checkboxes
            therapeuticAreas.map((area) => {
              const studies = getStudiesForArea(area);
              const selectedCount = getSelectedCountForArea(area);
              const isAreaSelected = true; // Always true for selected areas
            
            return (
              <Box key={area} sx={{ 
                mb: 2,
                p: 2,
                backgroundColor: `${theme.palette.text.primary}15`,
                borderRadius: '16px',
                boxShadow: theme.shadows[2],
                border: 'none',
                outline: 'none',
                position: 'relative',
                transition: theme.transitions.create(
                  ["transform", "box-shadow"],
                  {
                    duration: theme.transitions.duration.standard,
                  }
                ),
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: theme.shadows[4],
                }
              }}>
                {/* Therapeutic Area Header */}
                <Typography 
                  variant="subtitle2" 
                  sx={{ 
                    color: theme.palette.primary.main,
                    fontWeight: 600,
                    mb: 1.5,
                    fontSize: '1rem'
                  }}
                >
                  {area}
                </Typography>
                
                {/* Studies List */}
                <Box sx={{ pl: 0 }}>
                  {studies.map((study) => (
                    <Box key={study.studyName} sx={{
                      mb: 1,
                      backgroundColor: 'rgba(25, 118, 210, 0.05)',
                      border: '1px solid rgba(25, 118, 210, 0.2)',
                      borderRadius: '4px',
                      position: 'relative',
                      maxWidth: '100%',
                      display: 'flex',
                      alignItems: 'flex-start'
                    }}>
                      <Box sx={{ flex: 1, p: 1.5 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Checkbox
                                  checked={selectedGuidelines.includes(study.studyName)}
                                onChange={() => {
                                  console.log('🔄 Checkbox clicked for:', study.studyName, 'Current selectedGuidelines:', selectedGuidelines);
                                  handleGuidelineToggle(study.studyName);
                                }}
                                  icon={<CheckBoxOutlineBlankIcon />}
                                  checkedIcon={<CheckBoxIcon />}
                                  sx={{
                                    color: theme.palette.primary.main,
                                    '&.Mui-checked': {
                                      color: theme.palette.primary.main,
                                    }
                                  }}
                                />
                            <Box>
                              <Typography
                                variant="body2"
                                sx={{
                                  fontWeight: 600, 
                                  fontSize: '0.875rem', 
                                  color: theme.palette.primary.main,
                                  whiteSpace: 'normal',
                                  wordBreak: 'break-word',
                                  lineHeight: 1.3
                                }}
                              >
                                {study.studyName}
                              </Typography>
                            </Box>
                          </Box>
                          <IconButton
                            size="small"
                            onClick={() => handleGuidelineClick(study.studyName, area)}
                            sx={{
                              color: theme.palette.primary.main,
                              '&:hover': {
                                backgroundColor: 'rgba(25, 118, 210, 0.1)'
                              }
                            }}
                          >
                            <ChevronRightIcon sx={{ fontSize: '1rem' }} />
                          </IconButton>
                        </Box>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            );
          })
          )}
        </Box>

        {/* Proceed Button - Fixed at Bottom */}
        <Box sx={{ 
          mt: 3, 
          pt: 2, 
          borderTop: 1, 
          borderColor: '#AACAE9', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          flexShrink: 0
        }}>
          <Button
            variant="contained"
            onClick={onProceed}
            disabled={!isProceedEnabled}
            endIcon={<ArrowForwardIcon sx={{ fontSize: { xs: '0.9rem', md: '1rem' } }} />}
            sx={{
              py: 1,
              px: 3,
              background: !isProceedEnabled 
                ? '#AACAE9' 
                : 'linear-gradient(105.34deg, #115293 0%, #1976D2 50%, #115293 100%)',
              color: 'white',
              textTransform: 'none',
              borderRadius: '8px',
              fontSize: { xs: '0.8rem', md: '0.9rem' },
              minWidth: { xs: 'auto', sm: '120px' },
              '&:hover': {
                background: !isProceedEnabled 
                  ? '#AACAE9' 
                  : 'linear-gradient(105.34deg, #0d3d6b 0%, #1565c0 50%, #0d3d6b 100%)',
              },
              '&:disabled': {
                backgroundColor: '#AACAE9',
                color: '#666'
              }
            }}
          >
            Proceed
          </Button>
        </Box>
      </Paper>

      {/* Guideline Detail Modal */}
      {showGuidelineDetails && selectedGuideline && selectedTherapeuticArea && (
      <GuidelineDetailModal
        isOpen={showGuidelineDetails}
        onClose={handleCloseGuidelineDetails}
          selectedGuideline={selectedGuideline}
        selectedProductType={selectedProductType}
          selectedTherapeuticArea={selectedTherapeuticArea}
      />
      )}
    </>
  );
}