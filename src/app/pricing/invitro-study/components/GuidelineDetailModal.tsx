import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  Box,
  Typography,
  IconButton
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useTheme } from '@mui/material/styles';
import { getGuidelineData } from '../data/guidelineData';

interface GuidelineDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedGuideline: string;
  selectedProductType: string;
  selectedTherapeuticArea: string;
}

export default function GuidelineDetailModal({
  isOpen,
  onClose,
  selectedGuideline,
  selectedProductType,
  selectedTherapeuticArea
}: GuidelineDetailModalProps) {
  const theme = useTheme();
  const [mounted, setMounted] = useState(false);

  // Set mounted to true on client side
  useEffect(() => {
    setMounted(true);
  }, []);

  // Get guideline data and calculate duration
  const guidelineData = getGuidelineData(selectedTherapeuticArea, selectedGuideline);
  const baseDuration = guidelineData?.duration || 30;
  const discountPercent = guidelineData?.discount ? parseInt(guidelineData.discount.replace('%', '')) : 5;
  const deviation = baseDuration * (discountPercent / 100);
  const totalDuration = Math.round(baseDuration + deviation);

  if (!isOpen || !mounted) return null;

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
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          p: { xs: 2, md: 3 },
          borderBottom: '1px solid rgba(0, 0, 0, 0.1)'
        }}>
          <Box>
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 700,
                color: '#115293',
                fontSize: '1.3rem'
              }}
            >
              {guidelineData?.category || selectedGuideline}
            </Typography>
          </Box>
          <IconButton 
            onClick={onClose}
            sx={{ 
              color: '#115293',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.05)'
              }
            }}
          >
            <Typography sx={{ fontSize: '1.3rem', fontWeight: 700 }}>×</Typography>
          </IconButton>
        </Box>

        {/* Content */}
        <Box sx={{ p: { xs: 2, md: 3 } }}>
          {guidelineData ? (
            <>
              <Typography 
                variant="body1" 
                sx={{ 
                  color: '#115293',
                  fontFamily: 'Open Sans',
                  fontWeight: 400,
                  fontStyle: 'normal',
                  fontSize: '16px',
                  lineHeight: '24px',
                  letterSpacing: '0px',
                  mb: 3
                }}
              >
                {guidelineData.description}
              </Typography>

              {/* Study Duration */}
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
            </>
          ) : (
            <>
              <Typography 
                variant="body1" 
                sx={{ 
                  color: '#115293',
                  fontFamily: 'Open Sans',
                  fontWeight: 400,
                  fontStyle: 'normal',
                  fontSize: '16px',
                  lineHeight: '24px',
                  letterSpacing: '0px',
                  mb: 3
                }}
              >
                {selectedGuideline}
              </Typography>

              {/* Study Duration */}
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
            </>
          )}
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
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: '99998 !important',
          animation: 'fadeIn 0.3s ease-out'
        }}
      />
    </>
  );

  return createPortal(modalContent, document.body);
}
