import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Box,
  IconButton,
} from '@mui/material';

interface BaseItem {
  id: string;
  quotationNo: string;
  studyType: string;
  amount: number;
  numberOfSamples: number;
  sampleDescription?: string;
  sampleForm: string;
  sampleSolvent: string;
  category?: string;
  therapeuticAreas?: string;
  typeOfMicroorganism?: string;
  microorganism?: string;
  application?: string;
  selectedGuidelines?: string[];
  image: string;
}

interface OrderSummaryModalProps {
  open: boolean;
  onClose: () => void;
  selectedItem: BaseItem | null;
  onDownloadPDF: (item: BaseItem) => void;
}

const OrderSummaryModal: React.FC<OrderSummaryModalProps> = ({
  open,
  onClose,
  selectedItem,
  onDownloadPDF,
}) => {
  if (!selectedItem) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: '16px',
          maxHeight: '90vh',
          width: '500px',
          backgroundColor: '#f8fafc',
        }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        pb: 1,
        fontSize: '1.1rem',
        fontWeight: 600
      }}>
        Item Summary
        <IconButton 
          onClick={onClose}
          sx={{ color: 'grey.500' }}
        >
          ✕
        </IconButton>
      </DialogTitle>
      
      <DialogContent sx={{ pt: 1, px: 3 }}>
        <Box>
          {/* Item Details Header */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1, 
              mb: 2,
              fontWeight: 600,
              color: '#1976d2'
            }}>
              📋 Item Details
            </Typography>
            
            <Box sx={{ 
              backgroundColor: '#e3f2fd', 
              borderRadius: '12px', 
              p: 2,
              border: '1px solid #bbdefb'
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Box 
                  sx={{ 
                    width: 60, 
                    height: 60, 
                    borderRadius: '8px',
                    overflow: 'hidden',
                    flexShrink: 0
                  }}
                >
                  <img 
                    src={selectedItem.image} 
                    alt={selectedItem.studyType}
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover' 
                    }}
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      fontWeight: 600, 
                      mb: 0.5,
                      color: '#1976d2' 
                    }}
                  >
                    {selectedItem.studyType}
                  </Typography>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 4,
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    p: 1.5,
                    border: '1px dashed #1976d2'
                  }}>
                    <Box sx={{ textAlign: 'center', minWidth: 60 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600, color: '#1976d2' }}>
                        {selectedItem.numberOfSamples}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#666', fontSize: '0.7rem' }}>
                        No of Samples
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>

              {/* Sample Description */}
              {selectedItem.sampleDescription && (
                <Typography variant="body2" sx={{ 
                  mb: 2,
                  fontSize: '0.9rem'
                }}>
                  <span style={{ fontWeight: 600, color: '#1976d2' }}>Sample Description:</span>{' '}
                  <span style={{ color: '#666' }}>{selectedItem.sampleDescription}</span>
                </Typography>
              )}

              {/* Sample Details */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {selectedItem.category && (
                  <Typography variant="body2" sx={{ fontSize: '0.85rem', color: '#666' }}>
                    • <span style={{ fontWeight: 600 }}>Product Type:</span> {selectedItem.category}
                  </Typography>
                )}
                <Typography variant="body2" sx={{ fontSize: '0.85rem', color: '#666' }}>
                  • <span style={{ fontWeight: 600 }}>Sample Form:</span> {selectedItem.sampleForm}
                </Typography>
                <Typography variant="body2" sx={{ fontSize: '0.85rem', color: '#666' }}>
                  • <span style={{ fontWeight: 600 }}>Sample Solvent:</span> {selectedItem.sampleSolvent}
                </Typography>
                {selectedItem.therapeuticAreas && (
                  <Typography variant="body2" sx={{ fontSize: '0.85rem', color: '#666' }}>
                    • <span style={{ fontWeight: 600 }}>Therapeutic Areas:</span> {selectedItem.therapeuticAreas}
                  </Typography>
                )}
                {selectedItem.typeOfMicroorganism && (
                  <Typography variant="body2" sx={{ fontSize: '0.85rem', color: '#666' }}>
                    • <span style={{ fontWeight: 600 }}>Type of Micro-organism:</span> {selectedItem.typeOfMicroorganism}
                  </Typography>
                )}
                {selectedItem.microorganism && (
                  <Typography variant="body2" sx={{ fontSize: '0.85rem', color: '#666' }}>
                    • <span style={{ fontWeight: 600 }}>Micro-organism:</span> {selectedItem.microorganism}
                  </Typography>
                )}
                {selectedItem.application && selectedItem.studyType !== "Invitro Study" && (
                  <Typography variant="body2" sx={{ fontSize: '0.85rem', color: '#666' }}>
                    • <span style={{ fontWeight: 600 }}>Application:</span> {selectedItem.application}
                  </Typography>
                )}
              </Box>
            </Box>
          </Box>

          {/* Guidelines Section */}
          {selectedItem.selectedGuidelines && selectedItem.selectedGuidelines.length > 0 && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1, 
                mb: 2,
                fontWeight: 600,
                color: '#1976d2'
              }}>
                📋 Applicable Guidelines
              </Typography>
              
              <Box sx={{ 
                backgroundColor: '#e3f2fd', 
                borderRadius: '12px', 
                p: 2,
                border: '1px solid #bbdefb'
              }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {selectedItem.selectedGuidelines.map((guideline, index) => (
                    <Box 
                      key={index}
                      sx={{
                        backgroundColor: '#1976d2',
                        color: 'white',
                        px: 2,
                        py: 1,
                        borderRadius: '8px',
                        fontSize: '0.85rem',
                        fontWeight: 500
                      }}
                    >
                      {guideline}
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      </DialogContent>
      
      <DialogActions sx={{ p: 3, pt: 0, gap: 2 }}>
        <Button
          variant="outlined"
          onClick={() => onDownloadPDF(selectedItem)}
          sx={{ 
            flex: 1,
            height: '42px',
            borderColor: '#1976d2',
            color: '#1976d2',
            fontWeight: 600,
            '&:hover': {
              borderColor: '#1565c0',
              backgroundColor: 'rgba(25, 118, 210, 0.04)',
            }
          }}
        >
          View Quotation
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            console.log('Pay clicked for:', selectedItem.quotationNo);
            onClose();
          }}
          sx={{ 
            flex: 1,
            height: '42px',
            background: "linear-gradient(105.34deg, #115293 0%, #1976D2 50%, #115293 100%)",
            fontWeight: 600,
            '&:hover': {
              background: "linear-gradient(105.34deg, #0d3f6f 0%, #155bb5 50%, #0d3f6f 100%)",
            }
          }}
        >
          Pay
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OrderSummaryModal;