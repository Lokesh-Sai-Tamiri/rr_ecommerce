'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  TextField,
  Button,
  IconButton,
  useTheme,
  Checkbox,
  Chip
} from '@mui/material';
// import ScienceIcon from '@mui/icons-material/Science';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface ProductDetailsCardProps {
  selectedProductType: string;
  selectedSampleForm: string;
  onSampleFormChange: (form: string) => void;
  selectedSampleSolvent: string;
  onSampleSolventChange: (solvent: string) => void;
  selectedTherapeuticAreas: string[];
  onTherapeuticAreaChange: (areas: string[]) => void;
  numSamples: number;
  onNumSamplesChange: (num: number) => void;
  customSampleForm: string;
  onCustomSampleFormChange: (form: string) => void;
  customSampleSolvent: string;
  onCustomSampleSolventChange: (solvent: string) => void;
  customTherapeuticArea: string;
  onCustomTherapeuticAreaChange: (area: string) => void;
  onClearAll: () => void;
  onAccordionChange?: (section: string | false) => void;
  expandedAccordion?: string | false;
  therapeuticAreas: string[];
}

const getSampleForms = (productType: string): string[] => {
  if (productType === 'cosmeceuticals') {
    return ['Gel', 'Foam', 'Cream', 'Lotion', 'Toner / Mist/Spray', 'Others'];
  }
  return [
    'Tablets',
    'Capsules',
    'Syrup',
    'Suspensions',
    'Powders',
    'Granules',
    'Oral Strips',
    'Drops',
    'Others'
  ];
};

const sampleSolvents = [
  'Distilled Water',
  'Buffered Aqueous Solutions',
  'Ethanol',
  'Others'
];

export default function ProductDetailsCard({
  selectedProductType,
  selectedSampleForm,
  onSampleFormChange,
  selectedSampleSolvent,
  onSampleSolventChange,
  selectedTherapeuticAreas,
  onTherapeuticAreaChange,
  numSamples,
  onNumSamplesChange,
  customSampleForm,
  onCustomSampleFormChange,
  customSampleSolvent,
  onCustomSampleSolventChange,
  customTherapeuticArea,
  onCustomTherapeuticAreaChange,
  onClearAll,
  onAccordionChange,
  expandedAccordion: propExpandedAccordion,
  therapeuticAreas
}: ProductDetailsCardProps) {
  const theme = useTheme();
  const [expandedAccordion, setExpandedAccordion] = useState<string | false>('sample-form');
  
  // Use prop value if provided, otherwise use local state
  const currentExpandedAccordion = propExpandedAccordion !== undefined ? propExpandedAccordion : expandedAccordion;

  const handleNumSamplesChange = (increment: boolean) => {
    const newValue = increment ? numSamples + 1 : Math.max(1, numSamples - 1);
    onNumSamplesChange(newValue);
  };

  const handleAccordionChange = (section: string | false) => {
    const newExpandedState = currentExpandedAccordion === section ? false : section;
    setExpandedAccordion(newExpandedState);
    
    // Call the parent's accordion change handler if provided
    if (onAccordionChange) {
      onAccordionChange(newExpandedState);
    }
  };

  return (
    <Paper 
      elevation={3}
      sx={{ 
        width: { xs: '100%', sm: '450px', md: '500px' },
        height: { xs: 'auto', md: '630px' },
        minHeight: { xs: '550px', md: '630px' },
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
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2, pb: 2, borderBottom: 1, borderColor: '#AACAE9' }}>
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
              fontStyle: 'Bold',
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

      {/* Scrollable Content Area */}
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
        <Box sx={{ mb: 2, pt: 2 }}>
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              p: 1,
              cursor: 'pointer',
              backgroundColor: currentExpandedAccordion === 'sample-form' ? 'rgba(25, 118, 210, 0.05)' : 'transparent',
              borderRadius: 1,
              '&:hover': { backgroundColor: 'rgba(25, 118, 210, 0.05)' }
            }}
            onClick={() => handleAccordionChange('sample-form')}
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
                letterSpacing: '0%'
              }}
            >
              Sample Form
            </Typography>
             <Box 
               sx={{ 
                 width: 0, 
                 height: 0,
                 borderLeft: '6px solid transparent',
                 borderRight: '6px solid transparent',
                 borderBottom: currentExpandedAccordion === 'sample-form' ? `8px solid ${theme.palette.primary.main}` : 'none',
                 borderTop: currentExpandedAccordion === 'sample-form' ? 'none' : `8px solid ${theme.palette.primary.main}`,
                 transition: 'all 0.3s ease'
               }} 
             />
          </Box>
          {currentExpandedAccordion === 'sample-form' && (
            <Box sx={{ pl: 0, pr: 1, pb: 1 }}>
              <FormControl component="fieldset" sx={{ width: '100%' }}>
                <RadioGroup
                  value={selectedSampleForm}
                  onChange={(e) => onSampleFormChange(e.target.value)}
                >
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0, width: '100%', '& .MuiFormControlLabel-root': { margin: 0, padding: '2px 0', minHeight: 'auto', width: '100%' }, '& .MuiFormControlLabel-label': { margin: 0, padding: 0 } }}>
                    {getSampleForms(selectedProductType).map((form) => (
                      <FormControlLabel
                        key={form}
                        value={form}
                        control={
                          <Radio 
                            sx={{
                              color: theme.palette.primary.main,
                              '&.Mui-checked': {
                                color: theme.palette.primary.main,
                              },
                              '& .MuiSvgIcon-root': {
                                fontSize: '1.2rem',
                              },
                            }}
                          />
                        }
                        label={form}
                        sx={{
                          width: '100%',
                          '& .MuiFormControlLabel-label': {
                            color: theme.palette.primary.main,
                            fontSize: '0.9rem'
                          }
                        }}
                      />
                    ))}
                  </Box>
                </RadioGroup>
                
                {/* Custom Sample Form Text Field */}
                {getSampleForms(selectedProductType).slice(-1)[0] === selectedSampleForm && (
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
                  </Box>
                )}
              </FormControl>
            </Box>
          )}
        </Box>

        {/* Sample Solvent Section */}
        <Box sx={{ mb: 2 }}>
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              p: 1,
              cursor: 'pointer',
              backgroundColor: currentExpandedAccordion === 'sample-solvent' ? 'rgba(25, 118, 210, 0.05)' : 'transparent',
              borderRadius: 1,
              '&:hover': { backgroundColor: 'rgba(25, 118, 210, 0.05)' }
            }}
            onClick={() => handleAccordionChange('sample-solvent')}
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
                letterSpacing: '0%'
              }}
            >
              Sample Solvent
            </Typography>
             <Box 
               sx={{ 
                 width: 0, 
                 height: 0,
                 borderLeft: '6px solid transparent',
                 borderRight: '6px solid transparent',
                 borderBottom: currentExpandedAccordion === 'sample-solvent' ? `8px solid ${theme.palette.primary.main}` : 'none',
                 borderTop: currentExpandedAccordion === 'sample-solvent' ? 'none' : `8px solid ${theme.palette.primary.main}`,
                 transition: 'all 0.3s ease'
               }} 
             />
          </Box>
          {currentExpandedAccordion === 'sample-solvent' && (
            <Box sx={{ pl: 0, pr: 1, pb: 1 }}>
              <FormControl component="fieldset" sx={{ width: '100%' }}>
                <RadioGroup
                  value={selectedSampleSolvent}
                  onChange={(e) => onSampleSolventChange(e.target.value)}
                >
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0, width: '100%', '& .MuiFormControlLabel-root': { margin: 0, padding: '2px 0', minHeight: 'auto', width: '100%' }, '& .MuiFormControlLabel-label': { margin: 0, padding: 0 } }}>
                    {sampleSolvents.map((solvent) => (
                      <FormControlLabel
                        key={solvent}
                        value={solvent}
                        control={
                          <Radio 
                            sx={{
                              color: theme.palette.primary.main,
                              '&.Mui-checked': {
                                color: theme.palette.primary.main,
                              },
                              '& .MuiSvgIcon-root': {
                                fontSize: '1.2rem',
                              },
                            }}
                          />
                        }
                        label={solvent}
                        sx={{
                          width: '100%',
                          '& .MuiFormControlLabel-label': {
                            color: theme.palette.primary.main,
                            fontSize: '0.9rem'
                          }
                        }}
                      />
                    ))}
                  </Box>
                </RadioGroup>
                
                {/* Custom Sample Solvent Text Field */}
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
                        },
                        '& .MuiInputLabel-root': {
                          color: theme.palette.primary.main,
                          '&.Mui-focused': {
                            color: theme.palette.primary.main,
                          }
                        }
                      }}
                    />
                  </Box>
                )}
              </FormControl>
            </Box>
          )}
        </Box>

        {/* Therapeutic Areas Section */}
        <Box sx={{ mb: 2 }}>
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              p: 1,
              cursor: 'pointer',
              backgroundColor: currentExpandedAccordion === 'therapeutic-areas' ? 'rgba(25, 118, 210, 0.05)' : 'transparent',
              borderRadius: 1,
              '&:hover': { backgroundColor: 'rgba(25, 118, 210, 0.05)' }
            }}
            onClick={() => handleAccordionChange('therapeutic-areas')}
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
                letterSpacing: '0%'
              }}
            >
              Therapeutic Areas
            </Typography>
             <Box 
               sx={{ 
                 width: 0, 
                 height: 0,
                 borderLeft: '6px solid transparent',
                 borderRight: '6px solid transparent',
                 borderBottom: currentExpandedAccordion === 'therapeutic-areas' ? `8px solid ${theme.palette.primary.main}` : 'none',
                 borderTop: currentExpandedAccordion === 'therapeutic-areas' ? 'none' : `8px solid ${theme.palette.primary.main}`,
                 transition: 'all 0.3s ease'
               }} 
             />
          </Box>
          
          {currentExpandedAccordion === 'therapeutic-areas' && (
            <Box sx={{ pl: 0, pr: 1, pb: 1 }}>
              {/* Selected Therapeutic Areas as Chips */}
              {selectedTherapeuticAreas.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {selectedTherapeuticAreas.map((area) => (
                  <Chip
                    key={area}
                    label={area}
                    onDelete={() => {
                      onTherapeuticAreaChange(selectedTherapeuticAreas.filter(a => a !== area));
                    }}
                    sx={{
                      backgroundColor: 'rgba(25, 118, 210, 0.1)',
                      color: theme.palette.primary.main,
                      border: '1px solid rgba(25, 118, 210, 0.3)',
                      '& .MuiChip-deleteIcon': {
                        color: theme.palette.primary.main,
                        '&:hover': {
                          color: '#d32f2f'
                        }
                      }
                    }}
                  />
                ))}
              </Box>
            </Box>
          )}
          
          {/* Available Therapeutic Areas as Checkboxes */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0, width: '100%', '& .MuiFormControlLabel-root': { margin: 0, padding: '2px 0', minHeight: 'auto', width: '100%' }, '& .MuiFormControlLabel-label': { margin: 0, padding: 0 } }}>
            {therapeuticAreas.map((area) => (
              <FormControlLabel
                key={area}
                control={
                  <Checkbox 
                    checked={selectedTherapeuticAreas.includes(area)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        onTherapeuticAreaChange([...selectedTherapeuticAreas, area]);
                      } else {
                        onTherapeuticAreaChange(selectedTherapeuticAreas.filter(a => a !== area));
                      }
                    }}
                    sx={{
                      color: theme.palette.primary.main,
                      '&.Mui-checked': {
                        color: theme.palette.primary.main,
                      },
                      '& .MuiSvgIcon-root': {
                        fontSize: '1.2rem',
                      },
                    }}
                  />
                }
                label={area}
                sx={{
                  width: '100%',
                  '& .MuiFormControlLabel-label': {
                    color: theme.palette.primary.main,
                    fontSize: '0.9rem'
                  }
                }}
              />
            ))}
          </Box>
          
          {/* Custom Therapeutic Area Text Field */}
          {selectedTherapeuticAreas.includes('Others') && (
            <Box sx={{ mt: 2 }}>
              <TextField
                label="Describe about your Therapeutic Area"
                value={customTherapeuticArea}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.length <= 20) {
                    onCustomTherapeuticAreaChange(value);
                  }
                }}
                fullWidth
                variant="outlined"
                placeholder="Describe about your Therapeutic Area"
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
                  },
                  '& .MuiInputLabel-root': {
                    color: theme.palette.primary.main,
                    '&.Mui-focused': {
                      color: theme.palette.primary.main,
                    }
                  }
                }}
              />
            </Box>
          )}
            </Box>
          )}
        </Box>

      </Box>

      {/* Number of Samples - Bottom of Card */}
      <Box sx={{ 
        mt: 'auto',
        pt: 1, 
        borderTop: '1px solid #AACAE9'
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
              onClick={() => handleNumSamplesChange(false)}
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
              onClick={() => handleNumSamplesChange(true)}
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
