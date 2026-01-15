import React from 'react';
import {
  Box,
  Typography,
  Paper,
  FormControlLabel,
  Checkbox,
  Button,
  IconButton,
  Divider
} from '@mui/material';
// import ListAltIcon from '@mui/icons-material/ListAlt';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useTheme } from '@mui/material/styles';
import { getGuidelinesForCategory } from '../data/guidelineData';
import { getGuidelinesForProductDetail, getCombinedApplicableGuidelines } from '../data/productGuidelineMapping';

interface ApplicableGuidelinesCardProps {
  category: string;
  selectedGuidelines: string[];
  selectAll: boolean;
  onGuidelineToggle: (guideline: string) => void;
  onSelectAll: () => void;
  onGuidelineClick: (guideline: string) => void;
  onAddToOrder: () => void;
  onClearAll: () => void;
  onResetCards: () => void;
  isEditMode?: boolean;
  isAddToCartEnabled?: boolean;
  selectedSampleForms?: string[];
  selectedSampleSolvents?: string[];
  selectedApplications?: string[];
  customSampleForm?: string;
  customSampleSolvent?: string;
  customApplication?: string;
}

export default function ApplicableGuidelinesCard({
  category,
  selectedGuidelines,
  selectAll,
  onGuidelineToggle,
  onSelectAll,
  onGuidelineClick,
  onAddToOrder,
  onClearAll,
  onResetCards,
  isEditMode = false,
  isAddToCartEnabled = true,
  selectedSampleForms = [],
  selectedSampleSolvents = [],
  selectedApplications = [],
  customSampleForm = '',
  customSampleSolvent = '',
  customApplication = ''
}: ApplicableGuidelinesCardProps) {
  const theme = useTheme();
  
  // Get guidelines for the current category
  const oecdGuidelines = getGuidelinesForCategory(category);
  
  // Filter guidelines based on selected product details combination
  const getFilteredGuidelines = () => {
    // Get current selections
    const currentSampleForm = selectedSampleForms.length > 0 ? selectedSampleForms[0] : undefined;
    const currentSampleSolvent = selectedSampleSolvents.length > 0 ? selectedSampleSolvents[0] : undefined;
    const currentApplication = selectedApplications.length > 0 ? selectedApplications[0] : undefined;

    // For guideline mapping, always use the predefined keys ("Others", "Any other")
    // The custom text is validated above but not used in mapping logic
    const finalSampleForm = currentSampleForm;
    const finalSampleSolvent = currentSampleSolvent;
    const finalApplication = currentApplication;

    // Get guidelines based on the combination of all selections
    const applicableGuidelines = getCombinedApplicableGuidelines(
      category,
      finalSampleForm,
      finalSampleSolvent,
      finalApplication
    );

    return applicableGuidelines;
  };

  const filteredGuidelines = getFilteredGuidelines();

  // Check if ALL required fields are selected (sample form + sample solvent + application)
  const areAllFieldsSelected = () => {
    // Check if "Others" is selected for sample form but has no custom text
    const hasOthersSampleFormWithoutText = selectedSampleForms.includes('Others') && (!customSampleForm || customSampleForm.trim() === '');
    
    // Check if "Others" is selected for sample solvent but has no custom text
    const hasOthersSampleSolventWithoutText = selectedSampleSolvents.includes('Others') && (!customSampleSolvent || customSampleSolvent.trim() === '');
    
    // Check if "Any other" is selected for application but has no custom text
    const hasOthersApplicationWithoutText = selectedApplications.includes('Any other') && (!customApplication || customApplication.trim() === '');
    
    // If any required "Others" option is selected but has no text, don't show guidelines
    if (hasOthersSampleFormWithoutText || hasOthersSampleSolventWithoutText || hasOthersApplicationWithoutText) {
      return false;
    }
    
    // Require ALL THREE fields: sample form + sample solvent + application
    return selectedSampleForms.length > 0 && 
           selectedSampleSolvents.length > 0 && 
           selectedApplications.length > 0;
  };

  const allFieldsSelected = areAllFieldsSelected();

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
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3, pb: 2, borderBottom: 1, borderColor: '#AACAE9' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box 
            component="img" 
            src="/assets/images/landing/pricing/applicablestudies.png" 
            alt="Applicable Guidelines"
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
            Applicable Guidelines
          </Typography>
        </Box>
        <Typography 
          variant="body2" 
          onClick={onClearAll}
          sx={{ 
            color:  { color: theme.palette.primary.main },
            cursor: 'pointer',
            '&:hover': '#3770A9'
          }}
        >
          Clear All
        </Typography>
      </Box>



      {/* Select All - Only show when all fields are selected */}
      {allFieldsSelected && (
        <Box sx={{ mb: 2 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={selectAll}
                onChange={onSelectAll}
                icon={<CheckBoxOutlineBlankIcon />}
                checkedIcon={<CheckBoxIcon />}
                sx={{
                  color: theme.palette.primary.main,
                  '&.Mui-checked': {
                    color: theme.palette.primary.main,
                  },
                }}
              />
            }
            label="Select All"
            sx={{
              '& .MuiFormControlLabel-label': {
                color:  { color: theme.palette.primary.main },
                fontSize: '0.875rem'
              }
            }}
          />
        </Box>
      )}

      <Divider sx={{ mb: 2, borderColor: '#AACAE9' }} />

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
              No Applicable Guidelines Found
            </Typography>
            
            <Typography variant="body2" sx={{
              color: theme.palette.text.secondary,
              fontSize: '0.9rem',
              maxWidth: '300px',
              lineHeight: 1.5
            }}>
              {selectedSampleForms.length === 0 || selectedSampleSolvents.length === 0 || selectedApplications.length === 0 ? 
                'Select all the fields on Product Details to see the applicable studies' :
                selectedSampleForms.includes('Others') && (!customSampleForm || customSampleForm.trim() === '') ?
                  'Please enter a description for "Others" sample form to see applicable studies' :
                  selectedSampleSolvents.includes('Others') && (!customSampleSolvent || customSampleSolvent.trim() === '') ?
                    'Please enter a description for "Others" sample solvent to see applicable studies' :
                    selectedApplications.includes('Any other') && (!customApplication || customApplication.trim() === '') ?
                      'Please enter a description for "Any other" application to see applicable studies' :
                      'Please select all fields in Product Details to see the applicable studies'
              }
            </Typography>
          </Box>
        ) : filteredGuidelines.length === 0 ? (
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
            <Typography 
              variant="body1" 
              sx={{ 
                color: theme.palette.text.secondary,
                fontSize: '1rem',
                fontWeight: 500,
                lineHeight: '1.5'
              }}
            >
              No applicable guidelines found for this combination of sample form and application.
            </Typography>
          </Box>
        ) : (
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: category === 'Medical Devices' ? '1fr' : 'repeat(2, 1fr)', 
            gap: '10px',
            width: '100%'
          }}>
            {filteredGuidelines.map((guideline) => (
              <Box key={guideline} sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                width: '100%',
                height: '36px',
                borderRadius: '4px',
                angle: '0deg',
                opacity: 1,
                pt: '4px',
                pr: '8px',
                pb: '4px',
                pl: '8px',
                border: '1.5px solid #AACAE9',
                '&:hover': {
                  backgroundColor: 'rgba(170, 202, 233, 0.1)',
                  transform: 'translateY(-1px)',
                  boxShadow: '0 2px 8px rgba(170, 202, 233, 0.3)'
                },
                transition: 'all 0.2s ease'
              }}
              >
                <Checkbox
                  checked={selectedGuidelines.includes(guideline)}
                  onChange={() => onGuidelineToggle(guideline)}
                  icon={<CheckBoxOutlineBlankIcon />}
                  checkedIcon={<CheckBoxIcon />}
                  sx={{
                    color: theme.palette.primary.main,
                    '&.Mui-checked': {
                      color: theme.palette.primary.main,
                    },
                    mr: 1
                  }}
                />
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: theme.palette.primary.main,
                    fontFamily: 'Open Sans',
                    fontWeight: 500,
                    fontStyle: 'Medium',
                    fontSize: '14px',
                    lineHeight: '34.56px',
                    letterSpacing: '0%',
                    verticalAlign: 'middle',
                    flex: 1,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                >
                  {guideline}
                </Typography>
                <IconButton
                  onClick={() => onGuidelineClick(guideline)}
                  sx={{ 
                    color: theme.palette.primary.main,
                    p: 0.5,
                    '&:hover': {
                      backgroundColor: 'rgba(25, 118, 210, 0.1)',
                      transform: 'scale(1.1)'
                    },
                    transition: 'all 0.2s ease'
                  }}
                >
                  <ChevronRightIcon sx={{ fontSize: '1rem' }} />
                </IconButton>
              </Box>
            ))}
          </Box>
        )}
      </Box>

      {/* Add to Cart Button - Fixed at Bottom */}
      <Box sx={{ mt: 3, pt: 2, borderTop: 1, borderColor: '#AACAE9', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Button
          variant="contained"
          size="medium"
          onClick={onAddToOrder}
          disabled={!isAddToCartEnabled}
          // startIcon={<ShoppingCartIcon />}
          endIcon={<ArrowForwardIcon />}
          sx={{ 
            background: !isAddToCartEnabled 
              ? '#AACAE9' 
              : 'linear-gradient(105.34deg, #115293 0%, #1976D2 50%, #115293 100%)',
            color: 'white',
            textTransform: 'none',
            py: 1,
            px: 3,
            borderRadius: '8px',
            '&:hover': {
              background: !isAddToCartEnabled 
                ? '#AACAE9' 
                : 'linear-gradient(105.34deg, #0d3d6b 0%, #1565c0 50%, #0d3d6b 100%)',
            },
            '&:disabled': {
              backgroundColor: '#AACAE9',
              color: '#666'
            }
          }}
        >
          {isEditMode ? 'Proceed' : 'Proceed'}
        </Button>
      </Box>
    </Paper>
  );
}
