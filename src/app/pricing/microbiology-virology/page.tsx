/**
 * @fileoverview Microbiology & Virology Study page
 */

'use client';

import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, Chip, IconButton, useTheme, useMediaQuery } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter, useSearchParams } from 'next/navigation';
import { MicrobiologyVirologyPageContent, NotificationPopup } from './components';

// Project imports
import AppBar from 'ui-component/extended/AppBar';
import FooterSection from 'views/pages/landing/FooterSection';
import { useScreenDetection } from 'views/pages/landing/utils/utils';
import { useCart } from '../../../contexts/CartContext';

const productTypes = [
  'Nutraceuticals',
  'Cosmeceuticals',
  'Pharmaceuticals',
  'Herbal/Ayush',
  'Disinfectants'
];

function MicrobiologyVirologyPageContentWrapper() {
  const theme = useTheme();
  const router = useRouter();
  const searchParams = useSearchParams();
  const screen = useScreenDetection();
  
  // Helper function to create URL-friendly hash
  const categoryToHash = (category: string) => {
    return category
      .toLowerCase()
      .replace(/\s*\/\s*/g, '')   // Remove "/"
      .replace(/\s+/g, '')        // Remove spaces
      .replace(/[^a-z0-9]/g, ''); // Remove any other special characters
  };

  // Get initial category tab from URL or default to 0
  const getInitialCategoryTab = () => {
    // Check URL parameters first
    const productType = searchParams.get('productType');
    if (productType) {
      const index = productTypes.findIndex(type => 
        categoryToHash(type) === productType.toLowerCase()
      );
      if (index !== -1) return index;
    }
    
    // Check URL hash
    const currentHash = window.location.hash.replace('#', '');
    if (currentHash) {
      console.log('🔄 Microbiology-Virology URL hash parsing:', {
        currentHash,
        productTypes: productTypes.map(type => ({ type, hash: categoryToHash(type) }))
      });
      const index = productTypes.findIndex(type => 
        categoryToHash(type) === currentHash.toLowerCase()
      );
      console.log('🔄 Microbiology-Virology found index:', index);
      if (index !== -1) return index;
    }
    
    return 0; // Default to first category
  };

  const [selectedProductType, setSelectedProductType] = useState(() => getInitialCategoryTab());
  
  // Notification state
  const [showNotification, setShowNotification] = useState(false);
  
  // Get cart items from context
  const { cartItems } = useCart();

  // Handle URL parameters for cart item data (edit functionality)
  useEffect(() => {
    const cartItemData = searchParams.get('cartItem');
    if (cartItemData) {
      try {
        const item = JSON.parse(decodeURIComponent(cartItemData));
        console.log('🔄 Microbiology-Virology - Auto-filling cart item data:', item);
        
        // Set the product type based on the cart item
        const productTypeIndex = productTypes.findIndex(type => 
          categoryToHash(type) === categoryToHash(item.category || 'Nutraceuticals')
        );
        if (productTypeIndex !== -1) {
          setSelectedProductType(productTypeIndex);
        }
      } catch (error) {
        console.error('Error parsing cart item data:', error);
      }
    }
  }, [searchParams]);

  // Set initial category tab on mount for direct URL navigation
  useEffect(() => {
    const initialTab = getInitialCategoryTab();
    setSelectedProductType(initialTab);
  }, []);

  const handleProductTypeChange = (index: number) => {
    // Update URL hash immediately for instant response
    const category = productTypes[index];
    const productTypeHash = categoryToHash(category);
    const newHash = `#${productTypeHash}`;
    
    // Use window.history.replaceState for immediate URL change
    window.history.replaceState({}, '', window.location.pathname + newHash);
    
    // Then update state
    setSelectedProductType(index);
  };

  // Notification handlers
  const handleViewCart = () => {
    router.push('/pricing/cart');
  };

  const handleContinueShopping = () => {
    setShowNotification(false);
  };

  const getChipStyles = (index: number, isSelected: boolean) => ({
    backgroundColor: isSelected ? theme.palette.primary.main : 'transparent',
    color: isSelected ? 'white' : theme.palette.primary.main,
    fontWeight: 600,
    fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
    py: { xs: 1, sm: 1.5 },
    px: { xs: 2, sm: 3 },
    borderRadius: '25px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    border: `2px solid ${theme.palette.primary.main}`,
    '&:hover': {
      backgroundColor: isSelected ? theme.palette.primary.main : 'rgba(25, 118, 210, 0.1)',
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 25px rgba(25, 118, 210, 0.3)',
    },
    '&:active': {
      transform: 'translateY(0)',
    }
  });

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Fixed Header */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          backdropFilter: 'blur(10px)'
        }}
      >
        <AppBar
          sx={{
            background: 'transparent',
            boxShadow: 'none',
            position: 'static'
          }}
          disableSticky={true}
          FooterComponent={FooterSection}
        />
      </Box>

      {/* Main Content Container */}
      <Box
        sx={{
          flex: 1,
          minHeight: 'calc(100vh - 120px)',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Microbiology Study Section with Background */}
        <Box
          sx={{
            flex: 1,
            minHeight: 'inherit',
            backgroundImage: `url('/assets/images/home-bg.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
            backgroundAttachment: screen.isMobile || screen.isTablet ? 'scroll' : 'fixed',
            ...(screen.isTablet && {
              minHeight: 'calc(100vh - 120px)',
              backgroundAttachment: 'scroll'
            }),
            paddingBottom: 0,
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
              backgroundColor: 'rgba(25, 118, 210, 0.1)',
          backdropFilter: 'blur(1px)',
        }
      }}
    >
          <Container maxWidth="xl" sx={{ 
            py: { xs: 10, sm: 12, md: 14 }, // Space for fixed app bar
            px: { xs: 2, sm: 4 },
            position: 'relative', 
            zIndex: 1 
          }}>
            {/* Hero Image Section with Floating Animation */}
            <Box sx={{ 
              position: 'relative',
              height: {
                xs: '180px',
                sm: '220px',
                md: '260px',
                lg: '260px'
              },
              overflow: 'hidden',
              borderRadius: 8,
              mb: { xs: 3, sm: 4, md: 5 },
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
              background: 'linear-gradient(135deg, #ffffff, #1976d215)',
              animation: 'fadeInUp 0.8s ease-out',
              '&::before': {
                content: '""',
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(45deg, rgba(17, 82, 147, 0.3), rgba(25, 118, 210, 0.2))',
                zIndex: 1,
                animation: 'shimmer 3s ease-in-out infinite alternate'
              },
              '@keyframes shimmer': {
                '0%': { opacity: 0.3 },
                '100%': { opacity: 0.1 }
              },
              '@keyframes fadeInUp': {
                '0%': {
                  opacity: 0,
                  transform: 'translateY(40px)'
                },
                '100%': {
                  opacity: 1,
                  transform: 'translateY(0)'
                }
              }
            }}>
              {/* Hero Image */}
              <Box
                component="img"
              src="/assets/images/landing/pricing/Microbiology-virology-study.jpg"
                alt="Microbiology & Virology Study"
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center center',
                  transition: 'transform 0.6s ease',
                  '&:hover': {
                    transform: 'scale(1.05)'
                  }
                }}
              />

              {/* Floating Particles */}
              <Box sx={{
                position: 'absolute',
                inset: 0,
                zIndex: 2,
                pointerEvents: 'none',
                '&::before, &::after': {
                  content: '""',
                  position: 'absolute',
                  width: '6px',
                  height: '6px',
                  background: 'rgba(255, 255, 255, 0.6)',
                  borderRadius: '50%',
                  animation: 'float 4s ease-in-out infinite'
                },
                '&::before': {
                  top: '20%',
                  left: '15%',
                  animationDelay: '0s'
                },
                '&::after': {
                  top: '60%',
                  right: '20%',
                  animationDelay: '2s'
                },
                '@keyframes float': {
                  '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
                  '33%': { transform: 'translate(30px, -30px) rotate(120deg)' },
                  '66%': { transform: 'translate(-20px, 20px) rotate(240deg)' }
                }
              }} />

              {/* Additional Floating Elements */}
              <Box sx={{
                position: 'absolute',
                top: '40%',
                left: '10%',
                width: '8px',
                height: '8px',
                background: 'rgba(255, 255, 255, 0.4)',
                borderRadius: '50%',
                animation: 'float 5s ease-in-out infinite',
                animationDelay: '1s',
                zIndex: 2
              }} />
              <Box sx={{
                position: 'absolute',
                top: '30%',
                right: '15%',
                width: '4px',
                height: '4px',
                background: 'rgba(255, 255, 255, 0.5)',
                borderRadius: '50%',
                animation: 'float 6s ease-in-out infinite',
                animationDelay: '3s',
                zIndex: 2
              }} />
              <Box sx={{
                position: 'absolute',
                bottom: '25%',
                left: '20%',
                width: '6px',
                height: '6px',
                background: 'rgba(255, 255, 255, 0.3)',
                borderRadius: '50%',
                animation: 'float 7s ease-in-out infinite',
                animationDelay: '4s',
                zIndex: 2
              }} />
            </Box>

            {/* Title Section */}
            <Box sx={{ 
              textAlign: 'center', 
              mb: { xs: 3, sm: 4, md: 5 },
              animation: 'fadeInUp 0.8s ease-out 0.2s both'
            }}>
             <Typography 
                  variant="h1" 
                  component="h1" 
                  sx={{ 
                    color: theme.palette.primary.main, 
                    fontWeight: 700,
                    fontSize: {
                      xs: screen.isMobile ? '1.5rem' : '1.75rem',
                      sm: '2rem',
                      md: '2.25rem',
                      lg: '2.5rem'
                    },
                    textAlign: 'center'
                  }}
                >
            Microbiology & Virology Study
          </Typography>
              {/* <Typography 
                variant="h6" 
                sx={{ 
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontWeight: 400,
                  fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
                  maxWidth: '600px',
                  mx: 'auto',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
                }}
              >
                Comprehensive microbial testing and virology studies for pharmaceutical, nutraceutical, and cosmetic products
              </Typography> */}
        </Box>
        
            {/* Product Type Chips */}
            <Box sx={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: 2, 
              justifyContent: 'center',
              mb: { xs: 3, sm: 4, md: 5 },
              px: 2,
              animation: 'fadeInUp 0.8s ease-out 0.4s both'
            }}>
              {productTypes.map((type, index) => (
                <Chip
                  key={type}
                  label={type}
                  onClick={() => handleProductTypeChange(index)}
                  sx={getChipStyles(index, selectedProductType === index)}
                />
              ))}
        </Box>
            
            <MicrobiologyVirologyPageContent 
              selectedProductType={productTypes[selectedProductType]}
              onProductTypeChange={handleProductTypeChange}
              searchParams={searchParams}
              showNotification={showNotification}
              onShowNotification={setShowNotification}
            />
      </Container>
        </Box>
      </Box>

      {/* Notification Popup - Top Level */}
      <NotificationPopup
        isVisible={showNotification}
        onViewOrderSummary={handleViewCart}
        onContinueShopping={handleContinueShopping}
        onClose={() => setShowNotification(false)}
        isEditMode={false}
        cartCount={cartItems.length}
      />
    </Box>
  );
}

// Export the content component for dynamic routes
export { MicrobiologyVirologyPageContentWrapper as MicrobiologyVirologyPageContent };

export default function MicrobiologyVirologyPage() {
  return <MicrobiologyVirologyPageContentWrapper />;
}
