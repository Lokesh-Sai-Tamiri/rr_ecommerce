import React from 'react';
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  Button,
  IconButton,
} from '@mui/material';
import { IconCheck } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';

interface PaymentSuccessModalProps {
  open: boolean;
  onClose: () => void;
  orderNo?: string;
  quotationNo?: string;
}

export default function PaymentSuccessModal({
  open,
  onClose,
  orderNo,
  quotationNo,
}: PaymentSuccessModalProps) {
  const router = useRouter();

  const handleGoToOrders = () => {
    onClose();
    router.push('/my-orders');
  };

  const handleViewOrder = () => {
    onClose();
    // Navigate to orders page - if we have orderNo, we could potentially filter or scroll to it
    router.push('/my-orders');
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '16px',
          padding: '24px',
          border: '2px solid #115293',
        },
      }}
    >
      <DialogContent sx={{ padding: '32px 24px', textAlign: 'center' }}>
        {/* Success Icon */}
        <Box
          sx={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            backgroundColor: '#22c55e',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px',
            boxShadow: '0 4px 12px rgba(34, 197, 94, 0.3)',
          }}
        >
          <IconCheck size={48} color="white" strokeWidth={3} />
        </Box>

        {/* Title */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: '#115293',
            marginBottom: '16px',
            fontSize: { xs: '1.5rem', sm: '2rem' },
          }}
        >
          Payment Successfull!
        </Typography>

        {/* Description */}
        <Typography
          variant="body1"
          sx={{
            color: '#115293',
            marginBottom: '32px',
            fontSize: { xs: '0.9rem', sm: '1rem' },
            lineHeight: 1.6,
          }}
        >
          Your payment has been received, and your order has been placed.
        </Typography>

        {/* Action Buttons */}
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            justifyContent: 'center',
            flexDirection: { xs: 'column', sm: 'row' },
          }}
        >
          <Button
            variant="outlined"
            onClick={handleGoToOrders}
            sx={{
              minWidth: { xs: '100%', sm: '160px' },
              height: '48px',
              borderColor: '#115293',
              color: '#115293',
              fontWeight: 600,
              borderRadius: '8px',
              fontSize: '0.95rem',
              textTransform: 'none',
              '&:hover': {
                borderColor: '#0d3f6f',
                backgroundColor: 'rgba(17, 82, 147, 0.04)',
              },
            }}
          >
            Go to Orders
          </Button>
          <Button
            variant="contained"
            onClick={handleViewOrder}
            sx={{
              minWidth: { xs: '100%', sm: '160px' },
              height: '48px',
              backgroundColor: '#115293',
              color: 'white',
              fontWeight: 600,
              borderRadius: '8px',
              fontSize: '0.95rem',
              textTransform: 'none',
              background: 'linear-gradient(105.34deg, #115293 0%, #1976D2 50%, #115293 100%)',
              '&:hover': {
                background: 'linear-gradient(105.34deg, #0d3f6f 0%, #1565c0 50%, #0d3f6f 100%)',
              },
            }}
          >
            View Order
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

