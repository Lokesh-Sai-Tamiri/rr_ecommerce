'use client';

import React from 'react';
import { createPortal } from 'react-dom';
import {
  Typography,
  Box,
  IconButton,
  useTheme,
  useMediaQuery
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

interface GuidanceDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  studyName: string;
  studyData: any;
}

export default function GuidanceDetailModal({
  isOpen,
  onClose,
  studyName,
  studyData
}: GuidanceDetailModalProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (!isOpen || !studyData) return null;

  const baseDuration = studyData.duration || 0;
  const deviation = studyData.deviation || 0;
  const deviationAmount = Math.round((baseDuration * deviation) / 100);
  const totalDuration = baseDuration + deviationAmount;

  const modalContent = (
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
        opacity: 1,
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Header */}
        <Box
          sx={{
            // backgroundColor: 'white',
            color: theme.palette.primary.main,
            p: { xs: 2, md: 3 },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0,
            borderTopLeftRadius: { xs: 0, md: '8px' },
            borderBottom: `1px solid ${theme.palette.primary.main}`
          }}
        >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
            fontSize: { xs: '1.1rem', sm: '1.2rem', md: '1.3rem' },
            color: theme.palette.primary.main
          }}
        >
          {studyName}
        </Typography>
        <IconButton
          onClick={onClose}
          sx={{
            color: theme.palette.primary.main,
            '&:hover': {
              backgroundColor: 'rgba(25, 118, 210, 0.1)'
            }
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Content */}
      <Box
        sx={{
          flex: 1,
          p: { xs: 2, md: 3 },
          overflow: 'auto',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'flex-start'
        }}
      >
        {/* Duration Display */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            mt: 2
          }}
        >
          <AccessTimeIcon sx={{ fontSize: '1.5rem', color: theme.palette.primary.main }} />
          <Typography
            variant="h6"
            sx={{
              color: theme.palette.primary.main,
              fontWeight: 500,
              fontSize: '1.1rem'
            }}
          >
            Total Duration : {totalDuration} days
          </Typography>
        </Box>
      </Box>

    </Box>
  );

  return createPortal(modalContent, document.body);
}
