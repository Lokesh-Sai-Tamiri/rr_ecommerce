'use client';

import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  IconButton,
  Divider,
  useTheme,
  useMediaQuery
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { getStudyData } from '../data/guidelineData';

interface GuidelineDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  studyName: string;
  microorganism: string;
  category: string;
}

export default function GuidelineDetailModal({
  isOpen,
  onClose,
  studyName,
  microorganism,
  category
}: GuidelineDetailModalProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const studyData = getStudyData(category, studyName);

  if (!studyData) {
    return null;
  }

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      fullScreen={isMobile}
      sx={{
        '& .MuiDialog-paper': {
          maxWidth: { xs: '100%', sm: '600px', md: '700px' },
          maxHeight: { xs: '100%', sm: '80vh' },
          margin: { xs: 0, sm: 'auto' },
          borderRadius: { xs: 0, sm: '8px' },
          boxShadow: { xs: 'none', sm: '0 8px 32px rgba(0,0,0,0.12)' }
        }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        pb: 1,
        borderBottom: '1px solid #E0E0E0'
      }}>
        <Typography variant="h6" sx={{ 
          color: theme.palette.primary.main,
          fontWeight: 600,
          fontSize: { xs: '1.1rem', sm: '1.25rem' }
        }}>
          Study Details
        </Typography>
        <IconButton
          onClick={onClose}
          size="small"
          sx={{ 
            color: theme.palette.grey[600],
            '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' }
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 3, pb: 2 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ 
            color: theme.palette.primary.main,
            fontWeight: 600,
            mb: 2,
            fontSize: { xs: '1rem', sm: '1.1rem' }
          }}>
            {studyName}
          </Typography>
          
          <Divider sx={{ mb: 2 }} />
          
          <Box sx={{ display: 'grid', gap: 2 }}>
            <Box>
              <Typography variant="subtitle2" sx={{ 
                color: theme.palette.text.secondary,
                fontWeight: 600,
                mb: 0.5,
                fontSize: { xs: '0.8rem', sm: '0.875rem' }
              }}>
                Category
              </Typography>
              <Typography variant="body2" sx={{ 
                color: theme.palette.text.primary,
                fontSize: { xs: '0.9rem', sm: '1rem' }
              }}>
                {studyData.category}
              </Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2" sx={{ 
                color: theme.palette.text.secondary,
                fontWeight: 600,
                mb: 0.5,
                fontSize: { xs: '0.8rem', sm: '0.875rem' }
              }}>
                Microorganism Type
              </Typography>
              <Typography variant="body2" sx={{ 
                color: theme.palette.text.primary,
                fontSize: { xs: '0.9rem', sm: '1rem' }
              }}>
                {studyData.microorganismType}
              </Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2" sx={{ 
                color: theme.palette.text.secondary,
                fontWeight: 600,
                mb: 0.5,
                fontSize: { xs: '0.8rem', sm: '0.875rem' }
              }}>
                Microorganism
              </Typography>
              <Typography variant="body2" sx={{ 
                color: theme.palette.text.primary,
                fontSize: { xs: '0.9rem', sm: '1rem' }
              }}>
                {studyData.microorganism}
              </Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2" sx={{ 
                color: theme.palette.text.secondary,
                fontWeight: 600,
                mb: 0.5,
                fontSize: { xs: '0.8rem', sm: '0.875rem' }
              }}>
                Guideline
              </Typography>
              <Typography variant="body2" sx={{ 
                color: theme.palette.text.primary,
                fontSize: { xs: '0.9rem', sm: '1rem' }
              }}>
                {studyData.guideline}
              </Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2" sx={{ 
                color: theme.palette.text.secondary,
                fontWeight: 600,
                mb: 0.5,
                fontSize: { xs: '0.8rem', sm: '0.875rem' }
              }}>
                Price per Sample
              </Typography>
              <Typography variant="body2" sx={{ 
                color: theme.palette.text.primary,
                fontSize: { xs: '0.9rem', sm: '1rem' }
              }}>
                ₹{studyData.price.toLocaleString()}
              </Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2" sx={{ 
                color: theme.palette.text.secondary,
                fontWeight: 600,
                mb: 0.5,
                fontSize: { xs: '0.8rem', sm: '0.875rem' }
              }}>
                Duration
              </Typography>
              <Typography variant="body2" sx={{ 
                color: theme.palette.text.primary,
                fontSize: { xs: '0.9rem', sm: '1rem' }
              }}>
                {studyData.duration} days
              </Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2" sx={{ 
                color: theme.palette.text.secondary,
                fontWeight: 600,
                mb: 0.5,
                fontSize: { xs: '0.8rem', sm: '0.875rem' }
              }}>
                Deviation
              </Typography>
              <Typography variant="body2" sx={{ 
                color: theme.palette.text.primary,
                fontSize: { xs: '0.9rem', sm: '1rem' }
              }}>
                ±{studyData.deviation}%
              </Typography>
            </Box>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ 
        px: 3, 
        pb: 3,
        pt: 1,
        borderTop: '1px solid #E0E0E0'
      }}>
        <Button
          onClick={onClose}
          variant="contained"
          sx={{
            background: 'linear-gradient(105.34deg, #115293 0%, #1976D2 50%, #115293 100%)',
            color: 'white',
            textTransform: 'none',
            '&:hover': {
              background: 'linear-gradient(105.34deg, #0d3d6b 0%, #1565c0 50%, #0d3d6b 100%)',
            },
            fontSize: { xs: '0.8rem', sm: '0.875rem' },
            px: { xs: 2, sm: 3 }
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
