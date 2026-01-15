'use client';

import React from 'react';
import { createPortal } from 'react-dom';
import {
  Box,
  Typography,
  Button,
  useTheme
} from '@mui/material';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
}

export default function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmButtonText = "Yes, Remove",
  cancelButtonText = "No"
}: DeleteConfirmationModalProps) {
  const theme = useTheme();

  if (!isOpen) return null;

  const modalContent = (
    <>
      {/* Modal */}
      <Box
        sx={{
          position: 'fixed',
          top: '50vh',
          left: '50vw',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90%', sm: '400px' },
          maxWidth: '400px',
          backgroundColor: '#DFEFFF',
          borderRadius: '12px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
          zIndex: 99999,
          p: 3,
          textAlign: 'center'
        }}
      >
        {/* Warning Icon */}
        <Box sx={{ mb: 2 }}>
          <Box
            sx={{
              width: 60,
              height: 60,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto'
            }}
          >
            <img
              src="/assets/images/landing/pricing/warning.png"
              alt="Warning"
              style={{
                width: '48px',
                height: '48px',
                objectFit: 'contain'
              }}
            />
          </Box>
        </Box>

        {/* Title */}
        <Typography 
          sx={{ 
            fontFamily: 'Open Sans',
            fontWeight: 700,
            fontStyle: 'normal',
            fontSize: '24px',
            lineHeight: '30px',
            letterSpacing: '0px',
            textAlign: 'center',
            verticalAlign: 'middle',
            color: theme.palette.primary.main, 
            mb: 2 
          }}
        >
          {title}
        </Typography>

        {/* Message */}
        <Typography 
          sx={{ 
            fontFamily: 'Open Sans',
            fontWeight: 400,
            fontStyle: 'normal',
            fontSize: '16px',
            lineHeight: '20px',
            letterSpacing: '0px',
            textAlign: 'center',
            verticalAlign: 'middle',
            color: '#115293', 
            mb: 3 
          }}
        >
          {message}
        </Typography>

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
          <Button
            variant="outlined"
            onClick={onClose}
            sx={{
              width: '209px',
              height: '48px',
              borderColor: theme.palette.primary.main,
              color: theme.palette.primary.main,
              paddingTop: '12px',
              paddingRight: '16px',
              paddingBottom: '12px',
              paddingLeft: '16px',
              borderRadius: '8px',
              opacity: 1,
              '&:hover': {
                borderColor: theme.palette.primary.dark,
                backgroundColor: 'rgba(25, 118, 210, 0.04)'
              }
            }}
          >
            {cancelButtonText}
          </Button>
          <Button
            variant="contained"
            onClick={onConfirm}
            sx={{
              width: '209px',
              height: '48px',
              background: 'linear-gradient(105.34deg, #115293 0%, #1976D2 50%, #115293 100%)',
              paddingTop: '12px',
              paddingRight: '16px',
              paddingBottom: '12px',
              paddingLeft: '16px',
              borderRadius: '8px',
              opacity: 1,
              '&:hover': {
                background: 'linear-gradient(105.34deg, #0d3f6b 0%, #1565c0 50%, #0d3f6b 100%)'
              }
            }}
          >
            {confirmButtonText}
          </Button>
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
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(4px)',
          zIndex: 99998
        }}
        onClick={onClose}
      />
    </>
  );

  return createPortal(modalContent, document.body);
}
