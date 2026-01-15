/**
 * @fileoverview Main pricing page
 */

'use client';

import { Box, Typography, Container } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export default function PricingPage() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: 'url(/assets/images/home-bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(1px)',
        }
      }}
    >
      <Container  sx={{ py: 4, position: 'relative', zIndex: 1 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ color: 'white' }}>
            Pricing Plans
          </Typography>
          <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
            Choose the right study for your research needs
          </Typography>
        </Box>
        
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, 
          gap: 3,
          mt: 4 
        }}>
          {/* Pricing cards will be added here */}
        </Box>
      </Container>
    </Box>
  );
}
