'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
  Box,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useCart } from '../../../../contexts/CartContext';
import ProductDetailsCard from './ProductDetailsCard';
import ApplicableStudiesCard from './ApplicableStudiesCard';
import OrderSummaryModal from './OrderSummaryModal';
import NotificationPopup from './NotificationPopup';
import { getStudiesForMicroorganismType } from '../data/guidelineData';

interface MicrobiologyVirologyPageContentProps {
  selectedProductType: string;
  onProductTypeChange: (index: number) => void;
  searchParams?: URLSearchParams;
}

export default function MicrobiologyVirologyPageContent({
  selectedProductType,
  onProductTypeChange,
  searchParams
}: MicrobiologyVirologyPageContentProps) {
  const theme = useTheme();
  const router = useRouter();
  const { addToCart, cartItems, updateCartItems } = useCart();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Product details state
  const [selectedSampleForm, setSelectedSampleForm] = useState('');
  const [selectedSampleSolvent, setSelectedSampleSolvent] = useState('');
  const [selectedMicroorganismType, setSelectedMicroorganismType] = useState('');
  const [selectedMicroorganism, setSelectedMicroorganism] = useState<string[]>([]);
  const [numSamples, setNumSamples] = useState(1);
  const [customSampleForm, setCustomSampleForm] = useState('');
  const [customSampleSolvent, setCustomSampleSolvent] = useState('');
  const [customMicroorganism, setCustomMicroorganism] = useState('');

  // Studies state
  const [selectedStudies, setSelectedStudies] = useState<string[]>([]);

  // Modal states
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  
  // Cart flow states
  const [currentCartItem, setCurrentCartItem] = useState<any>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingCartItem, setEditingCartItem] = useState<any>(null);
  const [isAutoFilling, setIsAutoFilling] = useState(false);

  // Track previous microorganism type to detect changes
  const prevMicroorganismTypeRef = useRef(selectedMicroorganismType);

  // Clear all product details when product type changes
  useEffect(() => {
    // Reset all form fields when product type changes
    setSelectedSampleForm('');
    setSelectedSampleSolvent('');
    setSelectedMicroorganismType('');
    setSelectedMicroorganism([]);
    setSelectedStudies([]);
    setCustomSampleForm('');
    setCustomSampleSolvent('');
    setCustomMicroorganism('');
  }, [selectedProductType]);

  // Clear studies and microorganism selection when microorganism type changes
  useEffect(() => {
    if (selectedMicroorganismType && prevMicroorganismTypeRef.current && 
        selectedMicroorganismType !== prevMicroorganismTypeRef.current) {
      setSelectedStudies([]);
      setSelectedMicroorganism([]);
    }
    prevMicroorganismTypeRef.current = selectedMicroorganismType;
  }, [selectedMicroorganismType]);

  // Handle URL parameters for cart item data (edit functionality)
  useEffect(() => {
    if (searchParams) {
      const cartItemData = searchParams.get('cartItem');
      if (cartItemData) {
        try {
          const item = JSON.parse(decodeURIComponent(cartItemData));
          console.log('🔄 Microbiology-Virology - Auto-filling cart item data:', item);
          console.log('🔄 Microbiology-Virology - Cart item properties:', {
            'item.selectedStudies': item.selectedStudies,
            'item.selectedMicroorganismType': item.selectedMicroorganismType,
            'item.microorganismType': item.microorganismType,
            'item.selectedMicroorganism': item.selectedMicroorganism,
            'item.sampleForm': item.sampleForm,
            'item.sampleSolvent': item.sampleSolvent
          });
          
          // Set edit mode FIRST to prevent resets during auto-fill
          setIsEditMode(true);
          
          // Set editingCartItem for update functionality
          setEditingCartItem(item);
          
          // Set auto-filling flag to prevent clearing during auto-fill
          setIsAutoFilling(true);
          
          // Auto-fill all form data
          setSelectedSampleForm(item.sampleForm || '');
          setSelectedSampleSolvent(item.sampleSolvent || '');
          setSelectedMicroorganismType(item.selectedMicroorganismType || item.microorganismType || '');
          setSelectedMicroorganism(item.selectedMicroorganism || []);
          setNumSamples(item.numSamples || 1);
          
          // Set custom fields if they exist
          if (item.customSampleForm) setCustomSampleForm(item.customSampleForm);
          if (item.customSampleSolvent) setCustomSampleSolvent(item.customSampleSolvent);
          if (item.customMicroorganism) setCustomMicroorganism(item.customMicroorganism);
          
          // Set the studies from cart item
          const studies = item.selectedStudies || [];
          console.log('🔄 Microbiology-Virology Auto-fill - Setting studies:', {
            studies,
            'studies.length': studies.length
          });
          setSelectedStudies(studies);
          
          // Set currentCartItem for the modal to use
          setCurrentCartItem(item);
          setIsEditMode(true);
          
          // Clear auto-filling flag after a delay
          setTimeout(() => {
            setIsAutoFilling(false);
          }, 500);
          
          console.log('🔄 Microbiology-Virology - Form populated with:', {
            sampleForm: item.sampleForm,
            sampleSolvent: item.sampleSolvent,
            microorganismType: item.microorganismType,
            selectedMicroorganism: item.selectedMicroorganism,
            selectedStudies: item.selectedStudies
          });
        } catch (error) {
          console.error('Error parsing cart item data:', error);
        }
      }
    }
  }, [searchParams]);

  const resetForm = useCallback(() => {
    setSelectedSampleForm('');
    setSelectedSampleSolvent('');
    setSelectedMicroorganismType('');
    setSelectedMicroorganism([]);
    setSelectedStudies([]);
    setNumSamples(1);
    setCustomSampleForm('');
    setCustomSampleSolvent('');
    setCustomMicroorganism('');
  }, []);

  const handleClearAll = useCallback(() => {
    resetForm();
  }, [resetForm]);

  const handleProceed = useCallback(() => {
    setShowOrderSummary(true);
  }, []);

  const handleAddToCart = useCallback((orderDataOrDescription?: any) => {
    // Handle both string parameter (legacy) and object parameter (from Order Summary modal)
    let orderData;
    
    if (typeof orderDataOrDescription === 'string') {
      // Legacy: string parameter (sampleDescription)
      orderData = {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        studyType: 'Microbiology & Virology Study',
        category: selectedProductType,
        sampleForm: selectedSampleForm === 'Others' ? `Others (${customSampleForm})` : selectedSampleForm,
        sampleSolvent: selectedSampleSolvent === 'Others' ? `Others (${customSampleSolvent})` : selectedSampleSolvent,
        microorganismType: selectedMicroorganismType,
        microorganism: (() => {
          if (customMicroorganism && Array.isArray(selectedMicroorganism) && selectedMicroorganism.includes('Any other')) {
            // Replace "Any other" with formatted custom text, keep all other microorganisms
            return selectedMicroorganism.map(m => m === 'Any other' ? `Any other (${customMicroorganism})` : m);
          }
          return selectedMicroorganism;
        })(),
        customMicroorganism,
        selectedStudies: selectedStudies,
        numSamples: numSamples,
        description: orderDataOrDescription || '',
        sampleDescription: orderDataOrDescription || '',
        application: 'Microbiology & Virology Study',
        timestamp: new Date().toISOString()
      };
    } else {
      // New: object parameter (from Order Summary modal)
      orderData = orderDataOrDescription;
    }
    
    if (isEditMode && editingCartItem) {
      // Update existing cart item
      updateCartItems(cartItems.map(item => 
        item.id === editingCartItem.id ? orderData : item
      ));
    } else {
      // Add new cart item
      addToCart(orderData);
    }
    
    // Show notification popup
    setShowNotification(true);
    
    // Close Order Summary Modal
    setShowOrderSummary(false);
    
    // Reset form and edit mode
    resetForm();
    setIsEditMode(false);
    setEditingCartItem(null);
  }, [selectedProductType, selectedSampleForm, selectedSampleSolvent, selectedMicroorganismType, selectedMicroorganism, selectedStudies, numSamples, customSampleForm, customSampleSolvent, addToCart, updateCartItems, cartItems, isEditMode, editingCartItem, resetForm]);

  const handleEditOrder = useCallback((orderData: any) => {
    // Handle sample form - extract "Others" and custom text if formatted
    const sampleForm = orderData.selectedSampleForm || '';
    if (sampleForm.startsWith('Others (')) {
      setSelectedSampleForm('Others');
      setCustomSampleForm(sampleForm.replace('Others (', '').replace(')', ''));
    } else {
      setSelectedSampleForm(sampleForm);
      setCustomSampleForm('');
    }
    
    // Handle sample solvent - extract "Others" and custom text if formatted
    const sampleSolvent = orderData.selectedSampleSolvent || '';
    if (sampleSolvent.startsWith('Others (')) {
      setSelectedSampleSolvent('Others');
      setCustomSampleSolvent(sampleSolvent.replace('Others (', '').replace(')', ''));
    } else {
      setSelectedSampleSolvent(sampleSolvent);
      setCustomSampleSolvent('');
    }
    
    setSelectedMicroorganismType(orderData.selectedMicroorganismType || '');
    
    // Handle microorganism - extract "Any other" and custom text if formatted
    const microorganisms = orderData.selectedMicroorganism || [];
    const processedMicroorganisms = microorganisms.map((micro: string) => {
      if (micro.startsWith('Any other (')) {
        setCustomMicroorganism(micro.replace('Any other (', '').replace(')', ''));
        return 'Any other';
      }
      return micro;
    });
    setSelectedMicroorganism(processedMicroorganisms);
    
    // Filter selected studies to only include valid ones for the new microorganism type
    let filteredStudies = orderData.selectedStudies || [];
    if (orderData.selectedMicroorganismType) {
      const enabledStudyNames = getStudiesForMicroorganismType(selectedProductType, orderData.selectedMicroorganismType).map((study: any) => study.studyName);
      filteredStudies = filteredStudies.filter((study: string) => enabledStudyNames.includes(study));
    }
    setSelectedStudies(filteredStudies);
    
    setNumSamples(orderData.numSamples || 1);
    
    // Close the modal and go back to the form
    setShowOrderSummary(false);
  }, [selectedProductType]);

  const handleRemoveStudy = useCallback((studyName: string) => {
    setSelectedStudies(prev => prev.filter(study => study !== studyName));
  }, []);

  const handleRemoveOrderDetail = useCallback((detailType: string) => {
    switch (detailType) {
      case 'sampleForm':
        setSelectedSampleForm('');
        setCustomSampleForm('');
        break;
      case 'sampleSolvent':
        setSelectedSampleSolvent('');
        setCustomSampleSolvent('');
        break;
      case 'microorganismType':
        setSelectedMicroorganismType('');
        setSelectedMicroorganism([]);
        setSelectedStudies([]);
        break;
      case 'microorganism':
        setSelectedMicroorganism([]);
        setSelectedStudies([]);
        break;
      default:
        break;
    }
  }, []);

  const handleViewCart = useCallback(() => {
    setShowNotification(false);
    router.push('/pricing/cart');
  }, [router]);

  const handleContinueShopping = useCallback(() => {
    setShowNotification(false);
    // Stay on the same page to continue shopping
  }, []);





  const isProceedEnabled = () => {
    return selectedSampleForm && 
           selectedSampleSolvent && 
           selectedMicroorganismType && 
           selectedMicroorganism.length > 0 && 
           selectedStudies.length > 0 && 
           numSamples >= 1 &&
           (selectedSampleForm !== 'Others' || customSampleForm.trim() !== '') &&
           (selectedSampleSolvent !== 'Others' || customSampleSolvent.trim() !== '');
  };

  return (
    <>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', lg: 'row' },
        gap: 3,
        justifyContent: 'center',
        alignItems: { xs: 'center', lg: 'flex-start' },
        animation: 'fadeInUp 0.8s ease-out 0.6s both',
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
        {/* Product Details Card */}
        <ProductDetailsCard
          selectedProductType={selectedProductType}
          selectedSampleForm={selectedSampleForm}
          selectedSampleSolvent={selectedSampleSolvent}
          selectedMicroorganismType={selectedMicroorganismType}
          selectedMicroorganism={selectedMicroorganism}
          numSamples={numSamples}
          customSampleForm={customSampleForm}
          customSampleSolvent={customSampleSolvent}
          customMicroorganism={customMicroorganism}
          onSampleFormSelection={setSelectedSampleForm}
          onSampleSolventSelection={setSelectedSampleSolvent}
          onMicroorganismTypeSelection={setSelectedMicroorganismType}
          onMicroorganismSelection={setSelectedMicroorganism}
          onNumSamplesChange={setNumSamples}
          onCustomSampleFormChange={setCustomSampleForm}
          onCustomSampleSolventChange={setCustomSampleSolvent}
          onCustomMicroorganismChange={setCustomMicroorganism}
          onClearAll={handleClearAll}
        />

        {/* Applicable Methods Card */}
        <ApplicableStudiesCard
          selectedProductType={selectedProductType}
          selectedMicroorganismType={selectedMicroorganismType}
          selectedMicroorganism={selectedMicroorganism}
          selectedStudies={selectedStudies}
          onStudyChange={setSelectedStudies}
          onClearAll={handleClearAll}
          onProceed={handleProceed}
          isProceedEnabled={isProceedEnabled()}
          isAutoFilling={isAutoFilling}
          selectedSampleForm={selectedSampleForm}
          selectedSampleSolvent={selectedSampleSolvent}
          customMicroorganism={customMicroorganism}
          customSampleForm={customSampleForm}
          customSampleSolvent={customSampleSolvent}
        />
      </Box>

      {/* Order Summary Modal */}
      <OrderSummaryModal
        isOpen={showOrderSummary}
        onClose={() => setShowOrderSummary(false)}
        onAddToCart={handleAddToCart}
        selectedProductType={selectedProductType}
        selectedSampleForm={selectedSampleForm}
        selectedSampleSolvent={selectedSampleSolvent}
        selectedMicroorganismType={selectedMicroorganismType}
        selectedMicroorganism={selectedMicroorganism}
        selectedStudies={selectedStudies}
        numSamples={numSamples}
        customSampleForm={customSampleForm}
        customSampleSolvent={customSampleSolvent}
        customMicroorganism={customMicroorganism}
        onEditOrder={handleEditOrder}
        onRemoveStudy={handleRemoveStudy}
        onRemoveOrderDetail={handleRemoveOrderDetail}
        onNumSamplesChange={setNumSamples}
        initialSampleDescription={(() => {
          const desc = currentCartItem ? currentCartItem.description || '' : '';
          console.log('🔄 Passing initialSampleDescription to OrderSummaryModal:', desc);
          console.log('🔄 currentCartItem:', currentCartItem);
          return desc;
        })()}
      />


      {/* Notification Popup */}
      <NotificationPopup
        isVisible={showNotification}
        onViewOrderSummary={handleViewCart}
        onContinueShopping={handleContinueShopping}
        onClose={() => setShowNotification(false)}
        isEditMode={false}
        cartCount={cartItems.length}
      />
    </>
  );
}
