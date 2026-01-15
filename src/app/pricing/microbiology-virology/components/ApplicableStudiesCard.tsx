'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  FormControlLabel,
  Checkbox,
  Button,
  IconButton,
  Divider,
  Tooltip
} from '@mui/material';
// import ListAltIcon from '@mui/icons-material/ListAlt';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useTheme } from '@mui/material/styles';
import { 
  getDataForCategory, 
  getMicroorganismTypesForCategory,
  getMicroorganismsForType,
  getStudiesForMicroorganism,
  getStudiesForMicroorganismType,
  getStudyData,
  getStudiesForSampleFormAndType,
  MicrobiologyStudyData 
} from '../data/guidelineData';
import GuidanceDetailModal from './GuidanceDetailModal';

interface ApplicableStudiesCardProps {
  selectedProductType: string;
  selectedMicroorganismType: string;
  selectedMicroorganism: string[];
  selectedStudies: string[];
  onStudyChange: (studies: string[]) => void;
  onClearAll: () => void;
  onProceed: () => void;
  isProceedEnabled?: boolean;
  isAutoFilling?: boolean;
  selectedSampleForm?: string; // For disinfectants
  selectedSampleSolvent?: string; // Add sample solvent requirement
  customMicroorganism?: string; // Add custom microorganism text
  customSampleForm?: string; // Add custom sample form text
  customSampleSolvent?: string; // Add custom sample solvent text
}

export default function ApplicableStudiesCard({
  selectedProductType,
  selectedMicroorganismType,
  selectedMicroorganism,
  selectedStudies,
  onStudyChange,
  onClearAll,
  onProceed,
  isProceedEnabled = true,
  isAutoFilling = false,
  selectedSampleForm = '',
  selectedSampleSolvent = '',
  customMicroorganism = '',
  customSampleForm = '',
  customSampleSolvent = ''
}: ApplicableStudiesCardProps) {
  
  // Debug logging
  console.log('🔄 ApplicableStudiesCard received:', {
    selectedProductType,
    selectedMicroorganismType,
    selectedMicroorganism,
    selectedStudies,
    'selectedStudies.length': selectedStudies.length,
    isAutoFilling
  });
  const theme = useTheme();
  const [selectedStudy, setSelectedStudy] = useState<string | null>(null);
  const [showStudyDetails, setShowStudyDetails] = useState(false);

  const handleStudyClick = (study: string) => {
    setSelectedStudy(study);
    setShowStudyDetails(true);
  };

  const handleCloseStudyDetails = () => {
    setShowStudyDetails(false);
    setSelectedStudy(null);
  };

  const handleStudyToggle = (study: string) => {
    const newSelected = selectedStudies.includes(study)
      ? selectedStudies.filter(s => s !== study)
      : [...selectedStudies, study];
    onStudyChange(newSelected);
  };

  const getAllStudies = (): MicrobiologyStudyData[] => {
    return getDataForCategory(selectedProductType);
  };

  const getAvailableStudies = (): MicrobiologyStudyData[] => {
    if (!selectedMicroorganismType) {
      return [];
    }
    
    let studiesForType: MicrobiologyStudyData[];
    
    // For disinfectants, filter by sample form and microorganism type
    if (selectedProductType.toLowerCase() === 'disinfectants' && selectedSampleForm) {
      studiesForType = getStudiesForSampleFormAndType(selectedProductType, selectedSampleForm, selectedMicroorganismType);
    } else {
      // For other product types, use the existing logic
      studiesForType = getStudiesForMicroorganismType(selectedProductType, selectedMicroorganismType);
    }
    
    // Create a map to store unique studies by study name
    const uniqueStudiesMap = new Map<string, MicrobiologyStudyData>();
    
    studiesForType.forEach(study => {
      if (!uniqueStudiesMap.has(study.studyName)) {
        uniqueStudiesMap.set(study.studyName, study);
      }
    });
    
    // Return array of unique studies
    return Array.from(uniqueStudiesMap.values());
  };

  const handleSelectAll = () => {
    if (!selectedMicroorganismType) return;
    const enabledStudies = getAvailableStudies(); // Get unique studies
    const allStudyNames = enabledStudies.map(study => study.studyName);
    
    // If all studies are already selected, clear all. Otherwise, select all.
    const allSelected = enabledStudies.length > 0 && selectedStudies.length === enabledStudies.length;
    if (allSelected) {
      onStudyChange([]);
    } else {
      onStudyChange(allStudyNames);
    }
  };

  const handleClearAllStudies = () => {
    onStudyChange([]);
  };

  // Check if all required product detail fields are selected
  const areAllFieldsSelected = () => {
    // Check if "Any other" is selected but has no custom text
    const hasAnyOtherWithoutText = selectedMicroorganism.includes('Any other') && (!customMicroorganism || customMicroorganism.trim() === '');
    
    // Check if "Others" is selected for sample form but has no custom text
    const hasOthersSampleFormWithoutText = selectedSampleForm === 'Others' && (!customSampleForm || customSampleForm.trim() === '');
    
    // Check if "Others" is selected for sample solvent but has no custom text
    const hasOthersSampleSolventWithoutText = selectedSampleSolvent === 'Others' && (!customSampleSolvent || customSampleSolvent.trim() === '');
    
    // If any "Others" option is selected but has no text, don't show studies
    if (hasAnyOtherWithoutText || hasOthersSampleFormWithoutText || hasOthersSampleSolventWithoutText) {
      return false;
    }
    
    // For disinfectants, require sample form, sample solvent, microorganism type, and microorganisms
    if (selectedProductType.toLowerCase() === 'disinfectants') {
      return selectedSampleForm && selectedSampleSolvent && selectedMicroorganismType && selectedMicroorganism.length > 0;
    }
    // For other product types, require sample form, sample solvent, microorganism type, and microorganisms
    return selectedSampleForm && selectedSampleSolvent && selectedMicroorganismType && selectedMicroorganism.length > 0;
  };

  const allFieldsSelected = areAllFieldsSelected();
  const availableStudies = getAvailableStudies();
  const enabledStudies = allFieldsSelected && selectedMicroorganismType ? 
    getAvailableStudies() : []; // Use the same filtered unique studies
  const selectAll = enabledStudies.length > 0 && selectedStudies.length === enabledStudies.length;

  // Clear selected studies when microorganism type changes (but not during auto-fill)
  useEffect(() => {
    if (selectedMicroorganismType && !isAutoFilling) {
      const uniqueStudies = getAvailableStudies(); // Get unique studies for the type
      const enabledStudyNames = uniqueStudies.map(study => study.studyName);
      const validStudies = selectedStudies.filter(study => enabledStudyNames.includes(study));
      if (validStudies.length !== selectedStudies.length) {
        onStudyChange(validStudies);
      }
    }
  }, [selectedMicroorganismType, selectedProductType, selectedSampleForm, onStudyChange, isAutoFilling]);

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
              alt="Applicable Methods"
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
              Applicable Methods
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

        {/* Select All - Fixed - Only show when all fields are selected and microorganism type is selected */}
        {allFieldsSelected && selectedMicroorganismType && (
          <Box sx={{ mb: 2, flexShrink: 0 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectAll}
                  onChange={handleSelectAll}
                  icon={<CheckBoxOutlineBlankIcon />}
                  checkedIcon={<CheckBoxIcon />}
                  sx={{
                    color: theme.palette.primary.main,
                    '&.Mui-checked': {
                      color: theme.palette.primary.main,
                    }
                  }}
                />
              }
              label="Select All"
              sx={{
                '& .MuiFormControlLabel-label': {
                  color: theme.palette.primary.main,
                  fontSize: '0.875rem'
                }
              }}
            />
          </Box>
        )}

        <Divider sx={{ mb: 2, borderColor: '#AACAE9', flexShrink: 0 }} />

        {/* Methods List - Scrollable */}
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
                No Applicable Methods Found
              </Typography>
              
              <Typography variant="body2" sx={{
                color: theme.palette.text.secondary,
                fontSize: '0.9rem',
                maxWidth: '300px',
                lineHeight: 1.5
              }}>
                {!selectedSampleForm || !selectedSampleSolvent ? 
                  'Select all the fields on Product Details to see the applicable methods' :
                  !selectedMicroorganismType ? 
                    'Select all the fields on Product Details to see the applicable methods' :
                    selectedMicroorganism.includes('Any other') && (!customMicroorganism || customMicroorganism.trim() === '') ?
                      'Please enter a Microorganism Name for "Any other" option to see applicable methods' :
                      selectedSampleForm === 'Others' && (!customSampleForm || customSampleForm.trim() === '') ?
                        'Please enter a description for "Others" Sample Form to see applicable methods' :
                        selectedSampleSolvent === 'Others' && (!customSampleSolvent || customSampleSolvent.trim() === '') ?
                          'Please enter a description for "Others" Sample Solvent to see applicable methods' :
                          'Select all the fields on Product Details to see the applicable methods'
                }
              </Typography>
            </Box>
          ) : (
            // Show methods when all fields are selected including microorganisms
            availableStudies.map((study) => {
              let isStudyEnabled = false;
              
              // For disinfectants, check if study exists for the selected sample form and microorganism type
              if (selectedProductType.toLowerCase() === 'disinfectants' && selectedSampleForm) {
                isStudyEnabled = selectedMicroorganismType && 
                  getStudiesForSampleFormAndType(selectedProductType, selectedSampleForm, selectedMicroorganismType)
                    .some(s => s.studyName === study.studyName);
              } else {
                // For other product types, use existing logic
                isStudyEnabled = selectedMicroorganismType && 
                  getStudiesForMicroorganismType(selectedProductType, selectedMicroorganismType)
                    .some(s => s.studyName === study.studyName);
              }
              
              return (
                <Box key={`${study.studyName}-${selectedMicroorganismType}`} sx={{
                  mb: 0.5,
                  backgroundColor: 'rgba(25, 118, 210, 0.05)',
                  border: '1px solid rgba(25, 118, 210, 0.2)',
                  borderRadius: '3px',
                  position: 'relative',
                  maxWidth: '100%',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <Box sx={{ flex: 1, p: 0.25 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.125 }}>
                        <Tooltip 
                          title={!isStudyEnabled ? "Enable after selecting microorganism type" : ""}
                          placement="top"
                        >
                          <span>
                            <Checkbox
                              checked={selectedStudies.includes(study.studyName)}
                              onChange={() => handleStudyToggle(study.studyName)}
                              disabled={!isStudyEnabled}
                              icon={<CheckBoxOutlineBlankIcon />}
                              checkedIcon={<CheckBoxIcon />}
                              sx={{
                                color: theme.palette.primary.main,
                                '&.Mui-checked': {
                                  color: theme.palette.primary.main,
                                },
                                '&.Mui-disabled': {
                                  color: theme.palette.action.disabled,
                                }
                              }}
                            />
                          </span>
                        </Tooltip>
                        <Box>
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: 600, 
                              fontSize: '0.7rem', 
                              color: theme.palette.primary.main,
                              whiteSpace: 'normal',
                              wordBreak: 'break-word',
                              lineHeight: 1.0
                            }}
                          >
                            {study.studyName}
                          </Typography>
                        </Box>
                      </Box>
                      <IconButton
                        size="small"
                        onClick={() => handleStudyClick(study.studyName)}
                        sx={{
                          color: theme.palette.primary.main,
                          padding: '1px',
                          minWidth: '20px',
                          width: '20px',
                          height: '20px',
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

      {/* Study Detail Modal */}
      {showStudyDetails && selectedStudy && (
        <GuidanceDetailModal
          isOpen={showStudyDetails}
          onClose={handleCloseStudyDetails}
          studyName={selectedStudy}
          studyData={getStudyData(selectedProductType, selectedStudy)}
        />
      )}
    </>
  );
}
