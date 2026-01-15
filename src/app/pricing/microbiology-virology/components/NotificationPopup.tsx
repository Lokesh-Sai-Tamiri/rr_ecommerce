import React, { useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  Button
} from '@mui/material';
import ScienceIcon from '@mui/icons-material/Science';
import { useTheme } from '@mui/material/styles';

interface NotificationPopupProps {
  isVisible: boolean;
  onViewOrderSummary: () => void;
  onContinueShopping: () => void;
  onClose: () => void;
  isEditMode?: boolean;
  cartCount?: number;
}

export default function NotificationPopup({
  isVisible,
  onViewOrderSummary,
  onContinueShopping,
  onClose,
  isEditMode = false,
  cartCount = 0
}: NotificationPopupProps) {
  const theme = useTheme();
  const popupRef = useRef<HTMLDivElement>(null);

  if (!isVisible) return null;

  return (
    <Box
      ref={popupRef}
      sx={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        zIndex: 9999,
        background: 'transparent',
        borderRadius: '12px',
        padding: '16px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(25, 118, 210, 0.1)',
        minWidth: '300px',
        animation: 'slideInFromRight 0.3s ease-out',
        isolation: 'isolate',
        transform: 'translateZ(0)'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: '8px',
              background: theme.palette.primary.main,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mr: 2,
              '&:hover': {
                backgroundColor: '#3770A9',
              }
            }}
          >
            <ScienceIcon sx={{ color: 'white', fontSize: '1.2rem' }} />
          </Box>
          <Typography variant="body1" sx={{ fontWeight: 600, color: '#333' }}>
            {isEditMode 
              ? 'Cart Updated Successfully' 
              : `${cartCount} ${cartCount === 1 ? 'item' : 'items'} Added Successfully`
            }
          </Typography>
        </Box>
        <Button
          variant="text"
          size="small"
          onClick={() => {
            onViewOrderSummary();
            onClose();
          }}
          sx={{
            color: theme.palette.primary.main,
            fontWeight: 600,
            textTransform: 'none',
            '&:hover': { 
              backgroundColor: 'rgba(25, 118, 210, 0.04)',
              textDecoration: 'underline'
            }
          }}
        >
          View Cart
        </Button>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          size="medium"
          onClick={() => {
            onContinueShopping();
            onClose();
          }}
            sx={{
              py: 1,
              px: 6,
              minWidth: '180px',
              background: 'linear-gradient(105.34deg, #115293 0%, #1976D2 50%, #115293 100%)',
              color: 'white',
              textTransform: 'none',
              borderRadius: '8px',
              '&:hover': {
                background: 'linear-gradient(105.34deg, #0d3d6b 0%, #1565c0 50%, #0d3d6b 100%)',
              }
            }}
        >
          Continue Shopping
        </Button>
      </Box>
    </Box>
  );
}