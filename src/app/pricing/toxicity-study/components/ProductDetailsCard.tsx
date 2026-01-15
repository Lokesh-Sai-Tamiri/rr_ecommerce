import React from 'react';
import {
  Box,
  Typography,
  Paper,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  IconButton,
  Divider
} from '@mui/material';
// import ScienceIcon from '@mui/icons-material/Science';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTheme } from '@mui/material/styles';

interface ProductDetailsCardProps {
  category: string;
  sampleForm: string;
  sampleSolvent: string;
  application: string;
  numSamples: number;
  customSampleForm: string;
  customSampleSolvent: string;
  customApplication: string;
  expandedAccordion: string | false;
  onSampleFormChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSampleSolventChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onApplicationChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onNumSamplesChange: (increment: boolean) => void;
  onCustomSampleFormChange: (value: string) => void;
  onCustomSampleSolventChange: (value: string) => void;
  onCustomApplicationChange: (value: string) => void;
  onAccordionChange: (section: string | false) => void;
  onClearAll: () => void;
  // New props for selection tracking
  selectedSampleForms: string[];
  selectedSampleSolvents: string[];
  selectedApplications: string[];
  onSampleFormSelection: (value: string) => void;
  onSampleSolventSelection: (value: string) => void;
  onApplicationSelection: (value: string) => void;
}

// Sample forms for different categories
const pharmaceuticalSampleForms = [
  'Tablets',
  'Capsules',
  'Syrup',
  'Suspensions',
  'Powders',
  'Granules',
  'Oral Strips',
  'Drops',
  'Cream',
  'gel',
  'Others'
];

const medicalDeviceSampleForms = [
  'Vascular Access & Infusion Devices',
  'Wound Care & Closure Products',
  'Dialysis & Fluid Exchange Systems',
  'Ophthalmic Devices',
  'Intraocular Lenses',
  'Barrier & Protective Devices',
  'Gloves',
  'Gynecological & Gastrointestinal Devices',
  'Dental & Orthodontic Devices',
  'Others'
];

// Function to get sample forms based on category
const getSampleFormsByCategory = (category: string): string[] => {
  if (category === 'Medical Devices') {
    return medicalDeviceSampleForms;
  }
  return pharmaceuticalSampleForms;
};

const sampleSolvents = [
  'Distilled Water',
  'Buffered Aqueous Solution',
  'Ethanol',
  'Methanol',
  'Acetone',
  'Chloroform',
  'Dimethyl Sulfoxide',
  'Others'
];

// Base applications list
const allApplications = [
  'Topical',
  'Oral',
  'Injectable', 
  'Ophthalmic',
  'Nasal',
  'Rectal/Vaginal',
  'Any other'
];

// Sample form to application mapping based on OECD guidelines
const sampleFormToApplications: { [key: string]: string[] } = {
  // Pharmaceutical forms
  'Tablets': ['Oral', 'Injectable', 'Ophthalmic', 'Nasal', 'Rectal/Vaginal', 'Any other'],
  'Capsules': ['Oral', 'Injectable', 'Ophthalmic', 'Nasal', 'Rectal/Vaginal', 'Any other'],
  'Syrup': ['Oral', 'Injectable', 'Ophthalmic', 'Nasal', 'Rectal/Vaginal', 'Any other'],
  'Suspensions': ['Oral', 'Injectable', 'Ophthalmic', 'Nasal', 'Rectal/Vaginal', 'Any other'],
  'Powders': ['Oral', 'Injectable', 'Ophthalmic', 'Nasal', 'Rectal/Vaginal', 'Any other'],
  'Granules': ['Oral', 'Injectable', 'Ophthalmic', 'Nasal', 'Rectal/Vaginal', 'Any other'],
  'Oral Strips': ['Oral', 'Injectable', 'Ophthalmic', 'Nasal', 'Rectal/Vaginal', 'Any other'],
  'Drops': ['Oral', 'Injectable', 'Ophthalmic', 'Nasal', 'Rectal/Vaginal', 'Any other'],
  'Cream': ['Topical'],
  'gel': ['Topical'],
  
  // Medical Device forms - all can use similar applications
  'Vascular Access & Infusion Devices': ['Injectable', 'Topical', 'Any other'],
  'Wound Care & Closure Products': ['Topical', 'Any other'],
  'Dialysis & Fluid Exchange Systems': ['Injectable', 'Topical', 'Any other'],
  'Ophthalmic Devices': ['Ophthalmic', 'Topical', 'Any other'],
  'Intraocular Lenses': ['Ophthalmic', 'Any other'],
  'Barrier & Protective Devices': ['Topical', 'Any other'],
  'Gloves': ['Topical', 'Any other'],
  'Gynecological & Gastrointestinal Devices': ['Topical', 'Any other'],
  'Dental & Orthodontic Devices': ['Topical', 'Oral', 'Any other'],
  
  'Others': ['Oral', 'Injectable', 'Ophthalmic', 'Nasal', 'Rectal/Vaginal', 'Topical', 'Any other']
};

// Get filtered applications based on selected sample form
const getFilteredApplications = (selectedSampleForm: string): string[] => {
  if (!selectedSampleForm) return allApplications;
  return sampleFormToApplications[selectedSampleForm] || allApplications;
};

export default function ProductDetailsCard({
  category,
  sampleForm,
  sampleSolvent,
  application,
  numSamples,
  customSampleForm,
  customSampleSolvent,
  customApplication,
  expandedAccordion,
  onSampleFormChange,
  onSampleSolventChange,
  onApplicationChange,
  onNumSamplesChange,
  onCustomSampleFormChange,
  onCustomSampleSolventChange,
  onCustomApplicationChange,
  onAccordionChange,
  onClearAll,
  selectedSampleForms,
  selectedSampleSolvents,
  selectedApplications,
  onSampleFormSelection,
  onSampleSolventSelection,
  onApplicationSelection
}: ProductDetailsCardProps) {
  const theme = useTheme();

  // Get sample forms based on category
  const sampleForms = getSampleFormsByCategory(category);

  // Get filtered applications based on the first selected sample form
  let filteredApplications = getFilteredApplications(selectedSampleForms[0] || '');

  // For Medical Devices, show all applications
  if (category === 'Medical Devices') {
    filteredApplications = allApplications;
  }

  return (
    <Paper 
      elevation={3}
      sx={{ 
        width: { xs: '100%', sm: '400px', md: '450px' },
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
        <Box sx={{ mb: 1, pt: 2 }}>
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              p: 1,
              cursor: 'pointer',
              backgroundColor: expandedAccordion === 'sample-form' ? 'rgba(25, 118, 210, 0.05)' : 'transparent',
              borderRadius: 1,
              '&:hover': { backgroundColor: 'rgba(25, 118, 210, 0.05)' }
            }}
            onClick={() => onAccordionChange(expandedAccordion === 'sample-form' ? false : 'sample-form')}
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
                 borderBottom: expandedAccordion === 'sample-form' ? `8px solid ${theme.palette.primary.main}` : 'none',
                 borderTop: expandedAccordion === 'sample-form' ? 'none' : `8px solid ${theme.palette.primary.main}`,
                 transition: 'all 0.3s ease'
               }} 
             />
          </Box>
          {expandedAccordion === 'sample-form' && (
            <Box sx={{ pl: 0, pr: 1, pb: 1 }}>
              <FormControl component="fieldset" sx={{ width: '100%' }}>
                <RadioGroup
                  value={selectedSampleForms[0] || ''}
                  onChange={(e) => onSampleFormSelection(e.target.value)}
                >
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0, width: '100%', '& .MuiFormControlLabel-root': { margin: 0, padding: 0, minHeight: 'auto' }, '& .MuiFormControlLabel-label': { margin: 0, padding: 0 } }}>
                    {sampleForms.map((form) => (
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
                {selectedSampleForms.includes('Others') && (
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
                  </Box>
                )}
              </FormControl>
            </Box>
          )}
        </Box>

        {/* Thin Line Separator */}
        <Divider sx={{ borderColor: '#AACAE9', my: 0.5 }} />

        {/* Sample Solvent Section */}
        <Box sx={{ mb: 1 }}>
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              p: 1,
              cursor: 'pointer',
              backgroundColor: expandedAccordion === 'sample-solvent' ? 'rgba(25, 118, 210, 0.05)' : 'transparent',
              borderRadius: 1,
              '&:hover': { backgroundColor: 'rgba(25, 118, 210, 0.05)' }
            }}
            onClick={() => onAccordionChange(expandedAccordion === 'sample-solvent' ? false : 'sample-solvent')}
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
                 borderBottom: expandedAccordion === 'sample-solvent' ? `8px solid ${theme.palette.primary.main}` : 'none',
                 borderTop: expandedAccordion === 'sample-solvent' ? 'none' : `8px solid ${theme.palette.primary.main}`,
                 transition: 'all 0.3s ease'
               }} 
             />
          </Box>
          {expandedAccordion === 'sample-solvent' && (
            <Box sx={{ pl: 0, pr: 1, pb: 1 }}>
              <FormControl component="fieldset" sx={{ width: '100%' }}>
                <RadioGroup
                  value={selectedSampleSolvents[0] || ''}
                  onChange={(e) => onSampleSolventSelection(e.target.value)}
                >
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0, width: '100%', '& .MuiFormControlLabel-root': { margin: 0, padding: 0, minHeight: 'auto' }, '& .MuiFormControlLabel-label': { margin: 0, padding: 0 } }}>
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
                {selectedSampleSolvents.includes('Others') && (
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
                      InputProps={{
                        endAdornment: (
                          <Typography variant="caption" sx={{ color: '#666', fontSize: '0.75rem' }}>
                            {customSampleSolvent.length}/20
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

        {/* Thin Line Separator */}
        <Divider sx={{ borderColor: '#AACAE9', my: 0.5 }} />

        {/* Application Section */}
        <Box sx={{ mb: 1 }}>
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              p: 1,
              cursor: 'pointer',
              backgroundColor: expandedAccordion === 'application' ? 'rgba(25, 118, 210, 0.05)' : 'transparent',
              borderRadius: 1,
              '&:hover': { backgroundColor: 'rgba(25, 118, 210, 0.05)' }
            }}
            onClick={() => onAccordionChange(expandedAccordion === 'application' ? false : 'application')}
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
              Application
            </Typography>
             <Box 
               sx={{ 
                 width: 0, 
                 height: 0,
                 borderLeft: '6px solid transparent',
                 borderRight: '6px solid transparent',
                 borderBottom: expandedAccordion === 'application' ? `8px solid ${theme.palette.primary.main}` : 'none',
                 borderTop: expandedAccordion === 'application' ? 'none' : `8px solid ${theme.palette.primary.main}`,
                 transition: 'all 0.3s ease'
               }} 
             />
          </Box>
          {expandedAccordion === 'application' && (
            <Box sx={{ pl: 0, pr: 1, pb: 1 }}>
              <FormControl component="fieldset" sx={{ width: '100%' }}>
                <RadioGroup
                  value={selectedApplications[0] || ''}
                  onChange={(e) => onApplicationSelection(e.target.value)}
                >
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0, width: '100%', '& .MuiFormControlLabel-root': { margin: 0, padding: 0, minHeight: 'auto' }, '& .MuiFormControlLabel-label': { margin: 0, padding: 0 } }}>
                    {filteredApplications.map((app) => (
                      <FormControlLabel
                        key={app}
                        value={app}
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
                        label={app}
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
                
                {/* Custom Application Text Field */}
                {selectedApplications.includes('Any other') && (
                  <Box sx={{ mt: 2, pl: 4 }}>
                    <TextField
                      label="Describe about your Application"
                      value={customApplication}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value.length <= 20) {
                          onCustomApplicationChange(value);
                        }
                      }}
                      fullWidth
                      variant="outlined"
                      placeholder="Describe about your Application"
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
                            {customApplication.length}/20
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
      </Box>
    </Paper>
  );
}
