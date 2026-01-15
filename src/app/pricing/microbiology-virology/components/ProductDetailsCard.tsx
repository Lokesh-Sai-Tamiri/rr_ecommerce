'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Checkbox,
  TextField,
  IconButton
} from '@mui/material';
// import ScienceIcon from '@mui/icons-material/Science';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useTheme } from '@mui/material/styles';
import { getMicroorganismsForType, getSampleFormsForCategory } from '../data/guidelineData';

interface ProductDetailsCardProps {
  selectedProductType: string;
  selectedSampleForm: string;
  selectedSampleSolvent: string;
  selectedMicroorganismType: string;
  selectedMicroorganism: string[];
  numSamples: number;
  customSampleForm: string;
  customSampleSolvent: string;
  customMicroorganism: string;
  onSampleFormSelection: (value: string) => void;
  onSampleSolventSelection: (value: string) => void;
  onMicroorganismTypeSelection: (value: string) => void;
  onMicroorganismSelection: (value: string[]) => void;
  onNumSamplesChange: (value: number) => void;
  onCustomSampleFormChange: (value: string) => void;
  onCustomSampleSolventChange: (value: string) => void;
  onCustomMicroorganismChange: (value: string) => void;
  onClearAll: () => void;
}

const sampleForms = ['Solid', 'Liquid', 'Semi-Solid', 'Gel', 'Others'];
const sampleSolvents = ['Water', 'Alcohol', 'Others'];
const microorganismTypes = ['Bacteria', 'Fungi', 'Virus'];

export default function ProductDetailsCard({
  selectedProductType,
  selectedSampleForm,
  selectedSampleSolvent,
  selectedMicroorganismType,
  selectedMicroorganism,
  numSamples,
  customSampleForm,
  customSampleSolvent,
  customMicroorganism,
  onSampleFormSelection,
  onSampleSolventSelection,
  onMicroorganismTypeSelection,
  onMicroorganismSelection,
  onNumSamplesChange,
  onCustomSampleFormChange,
  onCustomSampleSolventChange,
  onCustomMicroorganismChange,
  onClearAll
}: ProductDetailsCardProps) {
  const theme = useTheme();
  
  // Check if current product is disinfectants
  const isDisinfectants = selectedProductType.toLowerCase() === 'disinfectants';
  
  // Get sample forms for disinfectants from data
  const disinfectantSampleForms = getSampleFormsForCategory(selectedProductType);
  
  // Use appropriate sample forms based on product type
  const currentSampleForms = isDisinfectants ? disinfectantSampleForms : sampleForms;
  const [expandedSections, setExpandedSections] = useState({
    sampleForm: true,
    sampleSolvent: false,
    microorganismType: false,
    microorganism: false
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => {
      // If the clicked section is already open, close it
      if (prev[section]) {
        return {
          ...prev,
          [section]: false
        };
      }
      // Otherwise, close all sections and open only the clicked one
      return {
        sampleForm: false,
        sampleSolvent: false,
        microorganismType: false,
        microorganism: false,
        [section]: true
      };
    });
  };

  const handleNumSamplesChange = (delta: number) => {
    const newValue = numSamples + delta;
    if (newValue >= 1) {
      onNumSamplesChange(newValue);
    }
  };

  // Note: Removed useEffect that was clearing microorganism selection
  // This was causing checkboxes to disappear quickly

  // Reset expanded sections when product type changes
  useEffect(() => {
    setExpandedSections({
      sampleForm: true,
      sampleSolvent: false,
      microorganismType: false,
      microorganism: false
    });
  }, [selectedProductType]);

  return (
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
            src="/assets/images/landing/pricing/productdetailsicon.png" 
            alt="Product Details"
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
            Product Details
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

      {/* Scrollable Content */}
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

      {/* Sample Form Section */}
      <Box sx={{ mb: 3 }}>
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            mb: 1.5,
            cursor: 'pointer',
            padding: 1,
            borderRadius: 1,
            '&:hover': {
              backgroundColor: 'rgba(25, 118, 210, 0.05)'
            }
          }}
          onClick={() => toggleSection('sampleForm')}
        >
          <Typography 
            variant="subtitle1" 
            sx={{ 
              color: theme.palette.primary.main, 
              fontFamily: 'Open Sans',
              fontWeight: 700,
              fontStyle: 'normal',
              fontSize: '18px',
              lineHeight: '140%',
              letterSpacing: '0%',
              flex: 1
            }}
          >
            Sample Form
          </Typography>
          <IconButton 
            size="small" 
            sx={{ color: theme.palette.primary.main }}
          >
             <Box 
               sx={{ 
                 width: 0, 
                 height: 0,
                 borderLeft: '6px solid transparent',
                 borderRight: '6px solid transparent',
                 borderBottom: expandedSections.sampleForm ? `8px solid ${theme.palette.primary.main}` : 'none',
                 borderTop: expandedSections.sampleForm ? 'none' : `8px solid ${theme.palette.primary.main}`,
                 transition: 'all 0.3s ease'
               }} 
             />
          </IconButton>
        </Box>
        
        {expandedSections.sampleForm && (
          <FormControl component="fieldset">
            <RadioGroup
              value={selectedSampleForm}
              onChange={(e) => onSampleFormSelection(e.target.value)}
              sx={{ gap: 0.5 }}
            >
              {currentSampleForms.map((form) => (
                <FormControlLabel
                  key={form}
                  value={form}
                  control={
                    <Radio 
                      sx={{ 
                        color: theme.palette.primary.main,
                        '&.Mui-checked': { color: theme.palette.primary.main }
                      }} 
                    />
                  }
                  label={form}
                  sx={{
                    '& .MuiFormControlLabel-label': {
                      color: theme.palette.primary.main,
                      fontSize: '0.875rem'
                    }
                  }}
                />
              ))}
            </RadioGroup>
          </FormControl>
        )}

        {selectedSampleForm === 'Others' && (
          <Box sx={{ mt: 2, pl: 4 }}>
            <TextField
              label="Describe about your Sample Form"
              value={customSampleForm}
              onChange={(e) => {
                const value = e.target.value;
                if (value.length <= 20) {
                  onCustomSampleFormChange(value);
                }
              }}
              fullWidth
              variant="outlined"
              placeholder="Describe about your Sample Form"
              inputProps={{
                maxLength: 20
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'transparent',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  '& fieldset': {
                    borderColor: theme.palette.primary.main,
                  },
                  '&:hover fieldset': {
                    borderColor: theme.palette.primary.main,
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: theme.palette.primary.main,
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
                }
              }}
              InputProps={{
                endAdornment: (
                  <Typography variant="caption" sx={{ color: '#666', fontSize: '0.75rem' }}>
                    {customSampleForm.length}/20
                  </Typography>
                ),
              }}
            />
            {/* <Typography variant="caption" sx={{ 
              color: theme.palette.primary.main, 
              fontSize: '0.75rem',
              mt: 0.5,
              display: 'block',
              textAlign: 'right'
            }}>
              {customSampleForm.length}/20
            </Typography> */}
          </Box>
        )}
      </Box>

      {/* Sample Solvent Section - Show for all product types including Disinfectants */}
      <Box sx={{ mb: 3 }}>
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            mb: 1.5,
            cursor: 'pointer',
            padding: 1,
            borderRadius: 1,
            '&:hover': {
              backgroundColor: 'rgba(25, 118, 210, 0.05)'
            }
          }}
          onClick={() => toggleSection('sampleSolvent')}
        >
          <Typography 
            variant="subtitle1" 
            sx={{ 
              color: theme.palette.primary.main, 
              fontFamily: 'Open Sans',
              fontWeight: 700,
              fontStyle: 'normal',
              fontSize: '18px',
              lineHeight: '140%',
              letterSpacing: '0%',
              flex: 1
            }}
          >
            Sample Solvent
          </Typography>
          <IconButton 
            size="small" 
            sx={{ color: theme.palette.primary.main }}
          >
             <Box 
               sx={{ 
                 width: 0, 
                 height: 0,
                 borderLeft: '6px solid transparent',
                 borderRight: '6px solid transparent',
                 borderBottom: expandedSections.sampleSolvent ? `8px solid ${theme.palette.primary.main}` : 'none',
                 borderTop: expandedSections.sampleSolvent ? 'none' : `8px solid ${theme.palette.primary.main}`,
                 transition: 'all 0.3s ease'
               }} 
             />
          </IconButton>
        </Box>
        
        {expandedSections.sampleSolvent && (
          <FormControl component="fieldset">
            <RadioGroup
              value={selectedSampleSolvent}
              onChange={(e) => onSampleSolventSelection(e.target.value)}
              sx={{ gap: 0.5 }}
            >
              {sampleSolvents.map((solvent) => (
                <FormControlLabel
                  key={solvent}
                  value={solvent}
                  control={
                    <Radio 
                      sx={{ 
                        color: theme.palette.primary.main,
                        '&.Mui-checked': { color: theme.palette.primary.main }
                      }} 
                    />
                  }
                  label={solvent}
                  sx={{
                    '& .MuiFormControlLabel-label': {
                      color: theme.palette.primary.main,
                      fontSize: '0.875rem'
                    }
                  }}
                />
              ))}
            </RadioGroup>
          </FormControl>
        )}

        {selectedSampleSolvent === 'Others' && (
          <Box sx={{ mt: 2, pl: 4 }}>
            <TextField
              label="Describe about your Sample Solvent"
              value={customSampleSolvent}
              onChange={(e) => {
                const value = e.target.value;
                if (value.length <= 20) {
                  onCustomSampleSolventChange(value);
                }
              }}
              fullWidth
              variant="outlined"
              placeholder="Describe about your Sample Solvent"
              inputProps={{
                maxLength: 20
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'transparent',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  '& fieldset': {
                    borderColor: theme.palette.primary.main,
                  },
                  '&:hover fieldset': {
                    borderColor: theme.palette.primary.main,
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: theme.palette.primary.main,
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
                }
              }}
            />
            <Typography variant="caption" sx={{ 
              color: theme.palette.primary.main, 
              fontSize: '0.75rem',
              mt: 0.5,
              display: 'block',
              textAlign: 'right'
            }}>
              {customSampleSolvent.length}/20
            </Typography>
          </Box>
        )}
      </Box>

      {/* Type of Micro-organism Section */}
      <Box sx={{ mb: 3 }}>
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            mb: 1.5,
            cursor: 'pointer',
            padding: 1,
            borderRadius: 1,
            '&:hover': {
              backgroundColor: 'rgba(25, 118, 210, 0.05)'
            }
          }}
          onClick={() => toggleSection('microorganismType')}
        >
          <Typography 
            variant="subtitle1" 
            sx={{ 
              color: theme.palette.primary.main, 
              fontFamily: 'Open Sans',
              fontWeight: 700,
              fontStyle: 'normal',
              fontSize: '18px',
              lineHeight: '140%',
              letterSpacing: '0%',
              flex: 1
            }}
          >
            Type of Micro-organism
          </Typography>
          <IconButton 
            size="small" 
            sx={{ color: theme.palette.primary.main }}
          >
             <Box 
               sx={{ 
                 width: 0, 
                 height: 0,
                 borderLeft: '6px solid transparent',
                 borderRight: '6px solid transparent',
                 borderBottom: expandedSections.microorganismType ? `8px solid ${theme.palette.primary.main}` : 'none',
                 borderTop: expandedSections.microorganismType ? 'none' : `8px solid ${theme.palette.primary.main}`,
                 transition: 'all 0.3s ease'
               }} 
             />
          </IconButton>
        </Box>
        
        {expandedSections.microorganismType && (
          <FormControl component="fieldset">
            <RadioGroup
              value={selectedMicroorganismType}
              onChange={(e) => onMicroorganismTypeSelection(e.target.value)}
              sx={{ gap: 0.5 }}
            >
              {microorganismTypes.map((type) => (
                <FormControlLabel
                  key={type}
                  value={type}
                  control={
                    <Radio 
                      sx={{ 
                        color: theme.palette.primary.main,
                        '&.Mui-checked': { color: theme.palette.primary.main }
                      }} 
                    />
                  }
                  label={type}
                  sx={{
                    '& .MuiFormControlLabel-label': {
                      color: theme.palette.primary.main,
                      fontSize: '0.875rem'
                    }
                  }}
                />
              ))}
            </RadioGroup>
          </FormControl>
        )}
      </Box>

      {/* Micro-organism Section - Only show when microorganism type is selected */}
      {selectedMicroorganismType && (
        <Box sx={{ mb: 3 }}>
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              mb: 1.5,
              cursor: 'pointer',
              padding: 1,
              borderRadius: 1,
              '&:hover': {
                backgroundColor: 'rgba(25, 118, 210, 0.05)'
              }
            }}
            onClick={() => toggleSection('microorganism')}
          >
            <Typography 
              variant="subtitle1" 
              sx={{ 
                color: theme.palette.primary.main, 
                fontFamily: 'Open Sans',
                fontWeight: 700,
                fontStyle: 'normal',
                fontSize: '18px',
                lineHeight: '140%',
                letterSpacing: '0%',
                flex: 1
              }}
            >
              Micro-organism
            </Typography>
            <IconButton 
              size="small" 
              sx={{ 
                color: theme.palette.primary.main 
              }}
            >
               <Box 
                 sx={{ 
                   width: 0, 
                   height: 0,
                   borderLeft: '6px solid transparent',
                   borderRight: '6px solid transparent',
                   borderBottom: expandedSections.microorganism ? `8px solid ${theme.palette.primary.main}` : 'none',
                   borderTop: expandedSections.microorganism ? 'none' : `8px solid ${theme.palette.primary.main}`,
                   transition: 'all 0.3s ease'
                 }} 
               />
            </IconButton>
          </Box>
        
          {expandedSections.microorganism && (
            <FormControl component="fieldset">
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column',
                gap: 0.5
              }}>
                {selectedMicroorganismType ? (
                  <>
                    {getMicroorganismsForType(selectedProductType, selectedMicroorganismType).map((microorganism) => (
                      <FormControlLabel
                        key={microorganism}
                        control={
                          <Checkbox 
                            checked={Array.isArray(selectedMicroorganism) && selectedMicroorganism.includes(microorganism)}
                            onChange={(e) => {
                              const currentSelection = Array.isArray(selectedMicroorganism) ? selectedMicroorganism : [];
                              if (e.target.checked) {
                                const newSelection = [...currentSelection, microorganism];
                                // If selecting a specific microorganism and "Any other" is selected but empty, uncheck "Any other"
                                if (microorganism !== 'Any other' && currentSelection.includes('Any other') && customMicroorganism.trim() === '') {
                                  const filteredSelection = newSelection.filter(m => m !== 'Any other');
                                  onMicroorganismSelection(filteredSelection);
                                  onCustomMicroorganismChange('');
                                } else {
                                  onMicroorganismSelection(newSelection);
                                }
                              } else {
                                const newSelection = currentSelection.filter(m => m !== microorganism);
                                // If "Any other" is unchecked and custom text is empty, clear custom text
                                if (microorganism === 'Any other' && customMicroorganism.trim() === '') {
                                  onCustomMicroorganismChange('');
                                }
                                onMicroorganismSelection(newSelection);
                              }
                            }}
                            sx={{ 
                              color: theme.palette.primary.main,
                              '&.Mui-checked': { color: theme.palette.primary.main }
                            }} 
                          />
                        }
                        label={microorganism}
                        sx={{
                          margin: 0,
                          '& .MuiFormControlLabel-label': {
                            color: theme.palette.primary.main,
                            fontSize: '0.875rem'
                          }
                        }}
                      />
                    ))}
                    
                    {/* Show text field when "Any other" is selected */}
                    {Array.isArray(selectedMicroorganism) && selectedMicroorganism.includes('Any other') && (
                      <Box sx={{ 
                        mt: 1, 
                        ml: 0, 
                        width: '100%',
                        maxWidth: '100%',
                        px: 0
                      }}>
                        <TextField
                          fullWidth
                          size="medium"
                          placeholder="Enter microorganism "
                          value={customMicroorganism}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (value.length <= 20) {
                              onCustomMicroorganismChange(value);
                            }
                          }}
                          inputProps={{
                            maxLength: 20,
                            style: {
                              fontSize: '0.875rem',
                              color: theme.palette.primary.main,
                              padding: '12px 16px'
                            }
                          }}
                          sx={{
                            width: '100%',
                            '& .MuiOutlinedInput-root': {
                              backgroundColor: 'transparent',
                              width: '100%',
                              '& fieldset': {
                                borderColor: theme.palette.primary.main,
                              },
                              '&:hover fieldset': {
                                borderColor: theme.palette.primary.main,
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: theme.palette.primary.main,
                              },
                            },
                            '& .MuiInputBase-input': {
                              color: theme.palette.primary.main,
                              backgroundColor: 'transparent',
                            }
                          }}
                          InputProps={{
                            endAdornment: (
                              <Typography variant="caption" sx={{ 
                                color: theme.palette.text.secondary, 
                                fontSize: '0.75rem',
                                mr: 1
                              }}>
                                {customMicroorganism.length}/20
                              </Typography>
                            ),
                          }}
                        />
                      </Box>
                    )}
                  </>
                ) : (
                  <Typography variant="body2" sx={{ color: theme.palette.text.secondary, fontStyle: 'italic' }}>
                    Please select microorganism type first
                  </Typography>
                )}
              </Box>
            </FormControl>
          )}
        </Box>
      )}
      </Box>

      {/* No of Samples Section - Fixed at Bottom */}
      <Box sx={{ 
        mt: 'auto',
        pt: 1, 
        borderTop: '1px solid #AACAE9',
        flexShrink: 0
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
          <Typography 
            variant="subtitle1" 
            sx={{ 
              color: theme.palette.primary.main, 
              fontFamily: 'Open Sans',
              fontWeight: 700,
              fontStyle: 'normal',
              fontSize: '18px',
              lineHeight: '140%',
              letterSpacing: '0%'
            }}
          >
            No of Samples
          </Typography>
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
            <Typography 
              sx={{ 
                color: 'white',
                fontWeight: 600,
                fontSize: '1rem',
                minWidth: '40px',
                textAlign: 'center'
              }}
            >
              {numSamples}
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
      </Box>
    </Paper>
  );
}
