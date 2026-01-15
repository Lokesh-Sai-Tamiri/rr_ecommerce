'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Box, Typography, Chip, useTheme, useMediaQuery } from '@mui/material';
import { useRouter } from 'next/navigation';
import ProductDetailsCard from './ProductDetailsCard';
import ApplicableGuidelinesCard from './ApplicableGuidelinesCard';
import OrderSummaryModal from './OrderSummaryModal';
import CustomerDetailsModal from './CustomerDetailsModal';
import QuotationGenerationModal from './QuotationGenerationModal';
import { useCart } from '../../../../contexts/CartContext';
import { 
  getTherapeuticAreasForProductType,
  nutraceuticalsData,
  cosmeceuticalsData,
  pharmaceuticalsData,
  herbalAyushData,
  getGuidelineData
} from '../data/guidelineData';

const productTypes = [
  { label: 'Nutraceuticals', value: 'nutraceuticals' },
  { label: 'Cosmeceuticals', value: 'cosmeceuticals' },
  { label: 'Pharmaceuticals', value: 'pharmaceuticals' },
  { label: 'Herbal/Ayush', value: 'herbalAyush' }
];

interface InvitroStudyPageContentProps {
  selectedProductTypeIndex?: number;
  searchParams?: URLSearchParams;
  showNotification?: boolean;
  onShowNotification?: (show: boolean) => void;
}

export default function InvitroStudyPageContent({ 
  selectedProductTypeIndex = 0, 
  searchParams,
  showNotification = false,
  onShowNotification
}: InvitroStudyPageContentProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const router = useRouter();
  const { addToCart, cartItems, updateCartItems, openCartModal, closeCartModal } = useCart();
  
  const [selectedProductType, setSelectedProductType] = useState('nutraceuticals');
  const [selectedSampleForm, setSelectedSampleForm] = useState('');
  const [selectedSampleSolvent, setSelectedSampleSolvent] = useState('');
  const [selectedTherapeuticAreas, setSelectedTherapeuticAreas] = useState<string[]>([]);
  const [numSamples, setNumSamples] = useState(1);
  const [selectedGuidelines, setSelectedGuidelines] = useState<string[]>([]);
  const [sampleFormGuidelines, setSampleFormGuidelines] = useState<string[]>([]);
  const [sampleSolventGuidelines, setSampleSolventGuidelines] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [activeSection, setActiveSection] = useState<'sampleForm' | 'sampleSolvent'>('sampleForm');
  const [currentSectionGuidelines, setCurrentSectionGuidelines] = useState<string[]>([]);
  const [forceUpdate, setForceUpdate] = useState(0);
  const [rightSideKey, setRightSideKey] = useState(0);
  const [expandedAccordion, setExpandedAccordion] = useState<string | false>('sample-form');
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingCartItem, setEditingCartItem] = useState<any>(null);
  const isAutoFillingRef = useRef(false);
  const [customSampleForm, setCustomSampleForm] = useState('');
  const [customSampleSolvent, setCustomSampleSolvent] = useState('');
  const [customTherapeuticArea, setCustomTherapeuticArea] = useState('');
  
  // Modal states
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const [showCustomerDetails, setShowCustomerDetails] = useState(false);
  const [showQuotation, setShowQuotation] = useState(false);
  const [expandedOrderAccordion, setExpandedOrderAccordion] = useState<string | false>(false);
  
  // Customer details
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerCompany, setCustomerCompany] = useState('');
  const [customerCountry, setCustomerCountry] = useState('');
  
  // Edit mode states
  const [isEditNotification, setIsEditNotification] = useState(false);
  
  // Cart flow states
  const [currentCartItem, setCurrentCartItem] = useState<any>(null);
  const [isFromCartFlow, setIsFromCartFlow] = useState(false);
  const [cartFlowGuidelines, setCartFlowGuidelines] = useState<string[]>([]);
  const [isCheckoutMode, setIsCheckoutMode] = useState(false);
  const [tempCartItems, setTempCartItems] = useState<any[]>([]);

  // Debug selectedGuidelines changes
  useEffect(() => {
    console.log('🔄 selectedGuidelines changed:', {
      selectedGuidelines,
      'length': selectedGuidelines.length,
      'isEditMode': isEditMode
    });
  }, [selectedGuidelines, isEditMode]);

  // Debug currentSectionGuidelines changes
  useEffect(() => {
    console.log('🔄 currentSectionGuidelines changed:', {
      currentSectionGuidelines,
      'length': currentSectionGuidelines.length,
      'isEditMode': isEditMode
    });
  }, [currentSectionGuidelines, isEditMode]);

  // Update selectedProductType when selectedProductTypeIndex changes
  useEffect(() => {
    const productTypeMap = ['nutraceuticals', 'cosmeceuticals', 'pharmaceuticals', 'herbalAyush'];
    setSelectedProductType(productTypeMap[selectedProductTypeIndex] || 'nutraceuticals');
  }, [selectedProductTypeIndex]);

  // Handle URL parameters for cart item data (edit functionality)
  useEffect(() => {
    if (searchParams) {
      const cartItemData = searchParams.get('cartItem');
      if (cartItemData) {
        try {
          const item = JSON.parse(decodeURIComponent(cartItemData));
          console.log('🔄 Invitro Study - Auto-filling cart item data:', item);
          console.log('🔄 Invitro Study - Cart item properties:', {
            'item.selectedGuidelines': item.selectedGuidelines,
            'item.sampleFormGuidelines': item.sampleFormGuidelines,
            'item.sampleSolventGuidelines': item.sampleSolventGuidelines,
            'item.selectedTherapeuticAreas': item.selectedTherapeuticAreas,
            'item.sampleForm': item.sampleForm,
            'item.sampleSolvent': item.sampleSolvent,
            'item.category': item.category
          });
          
          // Set auto-filling flag to prevent resets during auto-fill
          isAutoFillingRef.current = true;
          
          // Set edit mode FIRST to prevent resets during auto-fill
          setIsEditMode(true);
          
          // Auto-fill all form data
          setSelectedProductType(item.category || 'nutraceuticals');
          setSelectedSampleForm(item.sampleForm || '');
          setSelectedSampleSolvent(item.sampleSolvent || '');
          setSelectedTherapeuticAreas(item.selectedTherapeuticAreas || []);
          setNumSamples(item.numSamples || 1);
          
          // Set custom fields if they exist
          if (item.customSampleForm) setCustomSampleForm(item.customSampleForm);
          if (item.customSampleSolvent) setCustomSampleSolvent(item.customSampleSolvent);
          if (item.customTherapeuticArea) setCustomTherapeuticArea(item.customTherapeuticArea);
          
          // Set the guidelines from cart item
          const formGuidelines = item.sampleFormGuidelines || [];
          const solventGuidelines = item.sampleSolventGuidelines || [];
          
          setSampleFormGuidelines(formGuidelines);
          setSampleSolventGuidelines(solventGuidelines);
          
          // Set currentCartItem for the modal to use
          setCurrentCartItem(item);
          
          // Set editingCartItem for update functionality
          setEditingCartItem(item);
          
          // Determine which section to show initially
          let initialSection: 'sampleForm' | 'sampleSolvent' = 'sampleForm';
          
          if (formGuidelines.length > 0) {
            initialSection = 'sampleForm';
          } else if (solventGuidelines.length > 0) {
            initialSection = 'sampleSolvent';
          }
          
          setActiveSection(initialSection);
          setExpandedAccordion(initialSection === 'sampleForm' ? 'sample-form' : 'sample-solvent');
          
          // Set selectedGuidelines to the combined guidelines from both sections
          const allGuidelines = [...formGuidelines, ...solventGuidelines];
          console.log('🔄 Auto-fill - Setting guidelines:', {
            formGuidelines,
            solventGuidelines,
            allGuidelines,
            'allGuidelines.length': allGuidelines.length,
            'isEditMode': true
          });
          // In edit mode, selectedGuidelines should represent the current form state
          // We'll set it to the combined guidelines from the cart item, but remove duplicates
          const uniqueGuidelines = [...new Set(allGuidelines)];
          setSelectedGuidelines(uniqueGuidelines);
          setCurrentSectionGuidelines(uniqueGuidelines);
          
          // Force immediate update to ensure guidelines are set
          setTimeout(() => {
            console.log('🔄 Auto-fill - Verifying guidelines after timeout:', {
              'selectedGuidelines should be': allGuidelines,
              'currentSectionGuidelines should be': allGuidelines
            });
          }, 100);
          
          // Force update to ensure guidelines card re-renders
          setRightSideKey(prev => prev + 1);
          
          // Set select all state after a delay to ensure product type is set
          setTimeout(() => {
            const totalPossibleGuidelines = getTherapeuticAreas().length;
            setSelectAll(allGuidelines.length === totalPossibleGuidelines);
          }, 100);
          
          // Clear auto-filling flag after a delay to allow all state updates to complete
          setTimeout(() => {
            isAutoFillingRef.current = false;
            console.log('🔄 Auto-fill completed, cleared isAutoFillingRef');
          }, 200);
          
          console.log('🔄 Invitro Study - Form populated with:', {
            category: item.category,
            sampleForm: item.sampleForm,
            sampleSolvent: item.sampleSolvent,
            selectedTherapeuticAreas: item.selectedTherapeuticAreas,
            formGuidelines,
            solventGuidelines,
            allGuidelines,
            initialSection
          });
        } catch (error) {
          console.error('Error parsing cart item data:', error);
        }
      }
    }
  }, [searchParams]);

  // Reset guidelines and product details when product type changes (like Toxicity Study)
  useEffect(() => {
    // Only reset if not in edit mode and not auto-filling (to preserve auto-filled data)
    if (!isEditMode && !isAutoFillingRef.current) {
      console.log('🔄 Product type changed - resetting guidelines and product details (normal mode)');
      
      // Clear product details
      setSelectedSampleForm('');
      setSelectedSampleSolvent('');
      setSelectedTherapeuticAreas([]);
      setNumSamples(1);
      setCustomSampleForm('');
      setCustomSampleSolvent('');
      setCustomTherapeuticArea('');
      
      // Clear guidelines
      setSelectedGuidelines([]);
      setSampleFormGuidelines([]);
      setSampleSolventGuidelines([]);
      setActiveSection('sampleForm');
      setCurrentSectionGuidelines([]);
    } else {
      console.log('🔄 Product type changed - preserving guidelines (edit mode or auto-filling)');
    }
  }, [selectedProductType, isEditMode]);

  // Force right side update when activeSection changes in edit mode (like Toxicity Study)
  useEffect(() => {
    if (isEditMode && activeSection) {
      console.log('🔄 Active section changed in edit mode:', activeSection);
      console.log('🔄 Current guidelines state:', {
        sampleFormGuidelines,
        sampleSolventGuidelines,
        activeSection
      });
      
      // Force a re-render of the right side by updating a dummy state
      // This ensures the ApplicableGuidelinesCard shows the correct guidelines
      const timer = setTimeout(() => {
        console.log('🔄 Forcing right side re-render for section:', activeSection);
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [activeSection, isEditMode, sampleFormGuidelines, sampleSolventGuidelines]);

  // Additional useEffect to force re-render when activeSection changes (like Toxicity Study)
  useEffect(() => {
    console.log('🔄 ActiveSection changed to:', activeSection);
    console.log('🔄 Guidelines for current section:', {
      sampleForm: sampleFormGuidelines,
      sampleSolvent: sampleSolventGuidelines
    });
    
    // Force a re-render when activeSection changes
    if (isEditMode) {
      console.log('🔄 Forcing re-render due to activeSection change');
      setForceUpdate(prev => prev + 1);
    }
  }, [activeSection, isEditMode]);

  // Update currentSectionGuidelines to always show the same guidelines regardless of active section
  useEffect(() => {
    console.log('🔄 useEffect for currentSectionGuidelines - isEditMode:', isEditMode, 'selectedGuidelines.length:', selectedGuidelines.length);
    
    if (isEditMode) {
      // In edit mode, always use selectedGuidelines (which contains the auto-filled data from cart)
      console.log('🔄 Edit mode: Setting currentSectionGuidelines to selectedGuidelines:', selectedGuidelines);
      setCurrentSectionGuidelines(selectedGuidelines);
    } else {
      // In normal mode, use selectedGuidelines regardless of active section
      console.log('🔄 Normal mode: Setting currentSectionGuidelines to selectedGuidelines:', selectedGuidelines);
      setCurrentSectionGuidelines(selectedGuidelines);
    }
  }, [activeSection, sampleFormGuidelines, sampleSolventGuidelines, selectedGuidelines, isEditMode]);

  // Handle edit order like Toxicity Study
  const handleEditOrder = useCallback((cartItem: any) => {
    // Check if cartItem exists
    if (!cartItem) {
      console.error('handleEditOrder: cartItem is undefined');
      return;
    }
    
    // Close any open modals
    setShowOrderSummary(false);
    setShowCustomerDetails(false);
    setShowQuotation(false);
    
    // Set edit mode
    setIsEditMode(true);
    setEditingCartItem(cartItem);
    
    // Fill the form with cart item data
    setSelectedProductType(cartItem.category || 'nutraceuticals');
    
    // Handle sample form - extract "Others" and custom text if formatted
    const sampleForm = cartItem.sampleForm || '';
    if (sampleForm.startsWith('Others (')) {
      setSelectedSampleForm('Others');
      setCustomSampleForm(sampleForm.replace('Others (', '').replace(')', ''));
    } else {
      setSelectedSampleForm(sampleForm);
      setCustomSampleForm('');
    }
    
    // Handle sample solvent - extract "Others" and custom text if formatted
    const sampleSolvent = cartItem.sampleSolvent || '';
    if (sampleSolvent.startsWith('Others (')) {
      setSelectedSampleSolvent('Others');
      setCustomSampleSolvent(sampleSolvent.replace('Others (', '').replace(')', ''));
    } else {
      setSelectedSampleSolvent(sampleSolvent);
      setCustomSampleSolvent('');
    }
    
    // Handle therapeutic areas - extract "Others" and custom text if formatted
    const therapeuticAreas = cartItem.selectedTherapeuticAreas || [];
    const processedTherapeuticAreas = therapeuticAreas.map((area: string) => {
      if (area.startsWith('Others (')) {
        setCustomTherapeuticArea(area.replace('Others (', '').replace(')', ''));
        return 'Others';
      }
      return area;
    });
    setSelectedTherapeuticAreas(processedTherapeuticAreas);
    
    setNumSamples(cartItem.numSamples || 1);
    
    // Set the guidelines from cart item
    const formGuidelines = cartItem.sampleFormGuidelines || [];
    const solventGuidelines = cartItem.sampleSolventGuidelines || [];
    
    setSampleFormGuidelines(formGuidelines);
    setSampleSolventGuidelines(solventGuidelines);
    
    // Determine which section to show initially based on which has selections (like Toxicity Study)
    let initialSection: 'sampleForm' | 'sampleSolvent' = 'sampleForm';
    
    if (formGuidelines.length > 0) {
      initialSection = 'sampleForm';
    } else if (solventGuidelines.length > 0) {
      initialSection = 'sampleSolvent';
    } else {
      // If no guidelines, default to sampleForm
      initialSection = 'sampleForm';
    }
    
    // Set active section
    setActiveSection(initialSection);
    
    // Set accordion to show Sample Form section initially
    setExpandedAccordion('sample-form');
    
    // Set selectedGuidelines to the guidelines for the initial section (like Toxicity Study)
    const initialGuidelines = initialSection === 'sampleForm' ? formGuidelines : solventGuidelines;
    setSelectedGuidelines(initialGuidelines);
    
    // Edit mode set successfully
  }, []);

  // Navigation handlers are set directly in the cart context

  // Get unique therapeutic areas from selected product type
  const getTherapeuticAreas = useCallback(() => {
    return getTherapeuticAreasForProductType(selectedProductType);
  }, [selectedProductType]);



  // Check if Add to Cart button should be enabled
  const isAddToCartEnabled = useCallback(() => {
    return selectedProductType && 
           (selectedSampleForm || customSampleForm) && 
           (selectedSampleSolvent || customSampleSolvent) && 
           (sampleFormGuidelines.length > 0 || sampleSolventGuidelines.length > 0) &&
           selectedTherapeuticAreas.length > 0;
  }, [selectedProductType, selectedSampleForm, customSampleForm, selectedSampleSolvent, customSampleSolvent, sampleFormGuidelines.length, sampleSolventGuidelines.length, selectedTherapeuticAreas.length]);

  const handleProceed = () => {
    if (sampleFormGuidelines.length === 0 && sampleSolventGuidelines.length === 0) {
      alert('Please select at least one guideline for Sample Form or Sample Solvent');
      return;
    }
    
    if (selectedTherapeuticAreas.length === 0) {
      alert('Please select at least one therapeutic area');
      return;
    }

    // Open Order Summary Modal
    setShowOrderSummary(true);
  };

  // Helper function to format date as DD/MM/YYYY
  const formatDateDDMMYYYY = (date: Date) => {
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const handleAddToCart = (sampleDescription?: string) => {
    
    if (sampleFormGuidelines.length === 0 && sampleSolventGuidelines.length === 0) {
      alert('Please select at least one guideline for Sample Form or Sample Solvent');
      return;
    }
    
    if (selectedTherapeuticAreas.length === 0) {
      alert('Please select at least one therapeutic area');
      return;
    }
    
    if (!sampleDescription || !sampleDescription.trim()) {
      alert('Please describe your sample');
      return;
    }

    // Get data based on selected product type
    let selectedData: any[] = [];
    switch (selectedProductType) {
      case 'nutraceuticals':
        selectedData = nutraceuticalsData;
        break;
      case 'cosmeceuticals':
        selectedData = cosmeceuticalsData;
        break;
      case 'pharmaceuticals':
        selectedData = pharmaceuticalsData;
        break;
      case 'herbalAyush':
        selectedData = herbalAyushData;
        break;
      default:
        selectedData = nutraceuticalsData;
    }
    
    const selectedGuidelinesData = selectedData.filter(item => 
      selectedGuidelines.includes(item.studyName)
    );

    // Get all selected therapeutic areas from both sections
    const allSelectedAreas = [...new Set([...sampleFormGuidelines, ...sampleSolventGuidelines])];
    
    // Calculate price based on selected guidelines/studies and therapeutic areas
    // Each study name should be matched with the corresponding therapeutic area to get the price
    let calculatedPrice = 0;
    
    // For each selected guideline/study, find its price by matching with therapeutic areas
    allSelectedAreas.forEach(studyName => {
      selectedTherapeuticAreas.forEach(therapeuticArea => {
        const guidelineData = getGuidelineData(therapeuticArea, studyName);
        if (guidelineData) {
          calculatedPrice += guidelineData.price;
          console.log(`🔥 PRICE MATCH: ${therapeuticArea} + ${studyName} = ₹${guidelineData.price}`);
        }
      });
    });

    // Debug price calculation
    console.log('🔥 PRICE DEBUG - selectedTherapeuticAreas:', selectedTherapeuticAreas);
    console.log('🔥 PRICE DEBUG - allSelectedAreas (study names):', allSelectedAreas);
    console.log('🔥 PRICE DEBUG - calculated price:', calculatedPrice);

    const generatedConfigNo = isEditMode && editingCartItem ? editingCartItem.configNo : `RR${String(Math.floor(Math.random() * 1000000)).padStart(6, '0')}`;
    
    console.log('🔥 INVITRO PAGE CONTENT - Creating cart item:');
    console.log('🔥 isEditMode:', isEditMode);
    console.log('🔥 editingCartItem:', editingCartItem);
    console.log('🔥 generatedConfigNo:', generatedConfigNo);

    const cartItem = {
      id: isEditMode && editingCartItem ? editingCartItem.id : `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      configNo: generatedConfigNo,
      studyType: 'Invitro Study',
      category: selectedProductType,
      sampleForm: selectedSampleForm === 'Others' ? `Others (${customSampleForm})` : selectedSampleForm,
      sampleSolvent: selectedSampleSolvent === 'Others' ? `Others (${customSampleSolvent})` : selectedSampleSolvent,
      application: 'Invitro Study', // Keep for compatibility but won't be displayed
      numSamples,
      selectedGuidelines: allSelectedAreas, // Therapeutic areas selected
      sampleFormGuidelines: sampleFormGuidelines, // Therapeutic areas selected for sample form
      selectedTherapeuticAreas: selectedTherapeuticAreas.map(area => 
        area === 'Others' ? `Others (${customTherapeuticArea})` : area
      ), // Therapeutic areas selected from left side
      sampleSolventGuidelines: sampleSolventGuidelines, // Therapeutic areas selected for sample solvent
      applicationGuidelines: [], // Empty for Invitro Study
      price: calculatedPrice,
      createdOn: isEditMode && editingCartItem ? editingCartItem.createdOn : formatDateDDMMYYYY(new Date()),
      validTill: isEditMode && editingCartItem ? editingCartItem.validTill : formatDateDDMMYYYY(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)),
      description: sampleDescription || '' // Sample description from modal
    };

    if (isEditMode && editingCartItem) {
      // Update existing cart item
      updateCartItems(cartItems.map(item => 
        item.id === editingCartItem.id ? cartItem : item
      ));
      setIsEditNotification(true);
    } else {
      // Add new cart item
      addToCart(cartItem);
      setIsEditNotification(false);
    }

    // Show notification
    onShowNotification?.(true);
    
    // Close Order Summary Modal
    setShowOrderSummary(false);
    
    // Reset form and edit mode
    resetForm();
    setIsEditMode(false);
    setEditingCartItem(null);
  };

  const resetForm = () => {
    setSelectedSampleForm('');
    setSelectedSampleSolvent('');
    setSelectedTherapeuticAreas([]);
    setNumSamples(1);
    setSelectedGuidelines([]);
    setSampleFormGuidelines([]);
    setSampleSolventGuidelines([]);
    setActiveSection('sampleForm');
    setExpandedAccordion('sample-form');
    setCustomSampleForm('');
    setCustomSampleSolvent('');
    setCustomTherapeuticArea('');
    setIsEditMode(false);
    setEditingCartItem(null);
  };

  const handleClearAll = () => {
    resetForm();
  };

  // Handle accordion change like Toxicity Study
  const handleAccordionChange = (section: string | false) => {
    // Update the expanded accordion state
    setExpandedAccordion(section);
    
    // Also update activeSection based on the expanded accordion
    if (section === 'sample-form') {
      setActiveSection('sampleForm');
      console.log('🔄 Accordion expanded: sample-form, setting activeSection to sampleForm');
    } else if (section === 'sample-solvent') {
      setActiveSection('sampleSolvent');
      console.log('🔄 Accordion expanded: sample-solvent, setting activeSection to sampleSolvent');
    }
    
    // Force immediate update of currentSectionGuidelines based on new activeSection
    setTimeout(() => {
      if (isEditMode) {
        // In edit mode, don't override currentSectionGuidelines - let the useEffect handle it
        console.log('🔄 Accordion change - Edit mode: Not overriding currentSectionGuidelines');
      } else {
        // In normal mode, update based on section
        let guidelinesToShow: string[] = [];
        if (section === 'sample-form') {
          guidelinesToShow = sampleFormGuidelines;
        } else if (section === 'sample-solvent') {
          guidelinesToShow = sampleSolventGuidelines;
        }
        
        console.log('🔄 Accordion change - Normal mode: updating currentSectionGuidelines to:', guidelinesToShow);
        setCurrentSectionGuidelines(guidelinesToShow);
      }
      
      // Force re-render
      setForceUpdate(prev => prev + 1);
      setRightSideKey(prev => prev + 1);
    }, 0);
  };

  // Handle sample form change with reset logic like Toxicity Study
  const handleSampleFormChange = (form: string) => {
    setSelectedSampleForm(form);
    setActiveSection('sampleForm');
    
    console.log('🔄 Sample Form selected, activeSection set to:', 'sampleForm');
    console.log('🔄 Current guidelines - Sample Form:', sampleFormGuidelines, 'Solvent:', sampleSolventGuidelines);
    
    // Always keep guidelines persistent, just switch sections
    const currentGuidelines = sampleFormGuidelines;
    const totalPossibleGuidelines = getTherapeuticAreas().length;
    
    setSelectAll(currentGuidelines.length === totalPossibleGuidelines);
    
    // Force a re-render to ensure right side updates
    console.log('🔄 Forcing right side update for Sample Form section');
    setForceUpdate(prev => prev + 1);
    setRightSideKey(prev => prev + 1);
    
    // Also directly update currentSectionGuidelines
    console.log('🔄 Directly updating currentSectionGuidelines to:', currentGuidelines);
    setCurrentSectionGuidelines(currentGuidelines);
  };

  // Handle sample solvent change with reset logic like Toxicity Study
  const handleSampleSolventChange = (solvent: string) => {
    setSelectedSampleSolvent(solvent);
    setActiveSection('sampleSolvent');
    
    console.log('🔄 Sample Solvent selected, activeSection set to:', 'sampleSolvent');
    console.log('🔄 Current guidelines - Sample Form:', sampleFormGuidelines, 'Solvent:', sampleSolventGuidelines);
    
    // Always keep guidelines persistent, just switch sections
    const currentGuidelines = sampleSolventGuidelines;
    const totalPossibleGuidelines = getTherapeuticAreas().length;
    
    setSelectAll(currentGuidelines.length === totalPossibleGuidelines);
    
    // Force a re-render to ensure right side updates
    console.log('🔄 Forcing right side update for Sample Solvent section');
    setForceUpdate(prev => prev + 1);
    setRightSideKey(prev => prev + 1);
    
    // Also directly update currentSectionGuidelines
    console.log('🔄 Directly updating currentSectionGuidelines to:', currentGuidelines);
    setCurrentSectionGuidelines(currentGuidelines);
  };

  // Handle therapeutic area change
  const handleTherapeuticAreaChange = (areas: string[]) => {
    setSelectedTherapeuticAreas(areas);
    console.log('🔄 Therapeutic Areas selected:', areas);
  };

  // Handle guideline selection - update all sections simultaneously like Toxicity Study
  const handleGuidelineChange = (guidelines: string[]) => {
    console.log('🔄 Guideline change - activeSection:', activeSection, 'guidelines:', guidelines);
    // Remove duplicates to prevent showing the same guideline multiple times
    const uniqueGuidelines = [...new Set(guidelines)];
    setSelectedGuidelines(uniqueGuidelines);
    setCurrentSectionGuidelines(uniqueGuidelines);
    
    // Update all sections with the same guidelines
    console.log('🔄 Updating all sections with guidelines:', uniqueGuidelines);
    setSampleFormGuidelines(uniqueGuidelines);
    setSampleSolventGuidelines(uniqueGuidelines);
  };

  // Modal handlers
  const handleViewOrderSummary = () => {
    // Navigate to cart page using client-side routing
    router.push('/pricing/cart');
  };

  const handleCloseNotification = () => {
    onShowNotification?.(false);
    setIsEditNotification(false);
  };

  const handleContinueShopping = () => {
    resetForm();
  };

  const handleCloseOrderSummary = () => {
    setShowOrderSummary(false);
    // Clear cart flow state when closing order summary
    if (isFromCartFlow) {
      setCurrentCartItem(null);
      setIsFromCartFlow(false);
      setCartFlowGuidelines([]);
    }
    
    // Reset temporary cart items when closing modal (changes made in modal don't persist)
    if (isCheckoutMode) {
      setTempCartItems([]);
    }
  };

  const handleNextStep = () => {
    setShowOrderSummary(false);
    setShowCustomerDetails(true);
  };

  const handleBackStep = () => {
    setShowCustomerDetails(false);
    setShowOrderSummary(true);
    // Reset customer details when going back
    setCustomerName('');
    setCustomerEmail('');
    setCustomerPhone('');
    setCustomerCompany('');
  };

  const handleGenerateQuotation = () => {
    // If in checkout mode, generate quotation directly without going through customer details
    if (isCheckoutMode) {
      setShowQuotation(true);
      
      // Ensure tempCartItems are properly set up for quotation generation
      if (tempCartItems.length === 0) {
        const tempItems = cartItems.map(item => ({
          ...item,
          sampleFormGuidelines: [...(item.sampleFormGuidelines || [])],
          sampleSolventGuidelines: [...(item.sampleSolventGuidelines || [])],
          applicationGuidelines: [...(item.applicationGuidelines || [])],
          selectedGuidelines: [...(item.selectedGuidelines || [])]
        }));
        setTempCartItems(tempItems);
      }
    } else {
      // Original flow for single cart items
      setShowCustomerDetails(false);
      setShowQuotation(true);
    }
  };

  const handleCloseCustomerDetails = () => {
    setShowCustomerDetails(false);
    // Reset customer details
    setCustomerName('');
    setCustomerEmail('');
    setCustomerPhone('');
    setCustomerCompany('');
  };

  const handleCloseQuotation = () => {
    setShowQuotation(false);
    
    // If we were in checkout mode, don't close the Order Summary modal
    if (!isCheckoutMode) {
      setShowCustomerDetails(false);
      setShowOrderSummary(false);
      setCurrentCartItem(null);
      setIsFromCartFlow(false);
      setCartFlowGuidelines([]);
      setIsCheckoutMode(false);
      // Reset customer details
      setCustomerName('');
      setCustomerEmail('');
      setCustomerPhone('');
      setCustomerCompany('');
    }
  };

  const handleOrderAccordionChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedOrderAccordion(isExpanded ? panel : false);
  };

  const handleRemoveGuideline = (guideline: string, cartIndex?: number, sectionType?: 'sampleForm' | 'sampleSolvent') => {
    if (typeof cartIndex === 'number') {
      // Order Summary modal deletion - remove guideline from temporary state
      if (isCheckoutMode) {
        // Multiple cart items mode - use temporary state, don't update actual cart
        const updatedTempItems = [...tempCartItems];
        const cartItem = updatedTempItems[cartIndex];
        if (cartItem) {
          // Remove from all guideline arrays in temporary state
          if (cartItem.sampleFormGuidelines) {
            cartItem.sampleFormGuidelines = cartItem.sampleFormGuidelines.filter(g => g !== guideline);
          }
          if (cartItem.sampleSolventGuidelines) {
            cartItem.sampleSolventGuidelines = cartItem.sampleSolventGuidelines.filter(g => g !== guideline);
          }
          if (cartItem.applicationGuidelines) {
            cartItem.applicationGuidelines = cartItem.applicationGuidelines.filter(g => g !== guideline);
          }
          if (cartItem.selectedGuidelines) {
            cartItem.selectedGuidelines = cartItem.selectedGuidelines.filter(g => g !== guideline);
          }
          
          // Update the temporary cart items state (don't update actual cart)
          setTempCartItems(updatedTempItems);
        }
      } else {
        // Single cart item mode
        if (currentCartItem) {
          // Remove from cart flow guidelines (this updates the UI immediately)
          setCartFlowGuidelines(prev => {
            const filtered = prev.filter(g => g !== guideline);
            return filtered;
          });
          
          // Update the currentCartItem state (this keeps the modal open)
          const updatedCurrentCartItem = {
            ...currentCartItem,
            selectedGuidelines: currentCartItem.selectedGuidelines.filter(g => g !== guideline),
            sampleFormGuidelines: (currentCartItem.sampleFormGuidelines || []).filter(g => g !== guideline),
            sampleSolventGuidelines: (currentCartItem.sampleSolventGuidelines || []).filter(g => g !== guideline),
            applicationGuidelines: (currentCartItem.applicationGuidelines || []).filter(g => g !== guideline)
          };
          
          // Update the currentCartItem state first (this keeps the modal open)
          setCurrentCartItem(updatedCurrentCartItem);
        }
      }
    } else if (isFromCartFlow && currentCartItem && !isCheckoutMode) {
      // Single cart item deletion - updating cart flow guidelines
      setCartFlowGuidelines(prev => {
        const filtered = prev.filter(g => g !== guideline);
        return filtered;
      });
    } else {
      // Update local guidelines - remove from specific section only
      setSelectedGuidelines(prev => prev.filter(g => g !== guideline));
      
      if (sectionType === 'sampleForm') {
        // Remove only from sample form guidelines
        setSampleFormGuidelines(prev => prev.filter(g => g !== guideline));
      } else if (sectionType === 'sampleSolvent') {
        // Remove only from sample solvent guidelines
        setSampleSolventGuidelines(prev => prev.filter(g => g !== guideline));
      } else {
        // Fallback: remove from both if no section type specified
        setSampleFormGuidelines(prev => prev.filter(g => g !== guideline));
        setSampleSolventGuidelines(prev => prev.filter(g => g !== guideline));
      }
    }
    
    // If in edit mode, also update the current form state to reflect the deletion
    if (isEditMode && currentCartItem) {
      // Update the current form state to reflect the deletion
      setSelectedGuidelines(prev => prev.filter(g => g !== guideline));
      setSampleFormGuidelines(prev => prev.filter(g => g !== guideline));
      setSampleSolventGuidelines(prev => prev.filter(g => g !== guideline));
    }
  };


  return (
    <>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: isMobile ? 'column' : 'row', 
        gap: 3,
        animation: 'fadeIn 0.5s ease-in-out'
      }}>
        {/* Left Panel - Product Details */}
        <Box sx={{ flex: isMobile ? 'none' : 1 }}>
          <ProductDetailsCard
            selectedProductType={selectedProductType}
            selectedSampleForm={selectedSampleForm}
            onSampleFormChange={handleSampleFormChange}
            selectedSampleSolvent={selectedSampleSolvent}
            onSampleSolventChange={handleSampleSolventChange}
            selectedTherapeuticAreas={selectedTherapeuticAreas}
            onTherapeuticAreaChange={handleTherapeuticAreaChange}
            numSamples={numSamples}
            onNumSamplesChange={setNumSamples}
            customSampleForm={customSampleForm}
            onCustomSampleFormChange={setCustomSampleForm}
            customSampleSolvent={customSampleSolvent}
            onCustomSampleSolventChange={setCustomSampleSolvent}
            customTherapeuticArea={customTherapeuticArea}
            onCustomTherapeuticAreaChange={setCustomTherapeuticArea}
            onClearAll={handleClearAll}
            onAccordionChange={handleAccordionChange}
            expandedAccordion={expandedAccordion}
            therapeuticAreas={getTherapeuticAreas()}
          />
        </Box>

        {/* Right Panel - Applicable Studies */}
        <Box sx={{ flex: isMobile ? 'none' : 1 }}>
          <ApplicableGuidelinesCard
            key={`guidelines-${activeSection}-${isEditMode}-${rightSideKey}`}
            therapeuticAreas={selectedTherapeuticAreas}
            selectedGuidelines={currentSectionGuidelines}
            onGuidelineChange={handleGuidelineChange}
            onClearAll={handleClearAll}
            onProceed={handleProceed}
            selectedProductType={selectedProductType}
            isProceedEnabled={isAddToCartEnabled()}
            activeSection={activeSection}
            sampleFormGuidelines={sampleFormGuidelines}
            sampleSolventGuidelines={sampleSolventGuidelines}
            isEditMode={isEditMode}
            selectedSampleForm={selectedSampleForm}
            selectedSampleSolvent={selectedSampleSolvent}
            customSampleForm={customSampleForm}
            customSampleSolvent={customSampleSolvent}
            customTherapeuticArea={customTherapeuticArea}
          />
        </Box>
      </Box>


      {/* Order Summary Modal */}
      <OrderSummaryModal
        isOpen={showOrderSummary}
        onClose={handleCloseOrderSummary}
        onNext={handleAddToCart}
        onGenerateQuotation={handleGenerateQuotation}
        category={isCheckoutMode ? 'Multiple Categories' : (currentCartItem && isEditMode ? selectedProductType : (currentCartItem ? currentCartItem.category : selectedProductType))}
        sampleForm={isCheckoutMode ? 'Multiple Forms' : 
          (currentCartItem && isEditMode ? 
            (selectedSampleForm || customSampleForm) : 
            (currentCartItem ? 
              currentCartItem.sampleForm : 
              (selectedSampleForm === 'Others' ? `Others (${customSampleForm})` : selectedSampleForm)
            )
          )}
        sampleSolvent={isCheckoutMode ? 'Multiple Solvents' : 
          (currentCartItem && isEditMode ? 
            (selectedSampleSolvent || customSampleSolvent) : 
            (currentCartItem ? 
              currentCartItem.sampleSolvent : 
              (selectedSampleSolvent === 'Others' ? `Others (${customSampleSolvent})` : selectedSampleSolvent)
            )
          )}
        application="Invitro Study"
        numSamples={isCheckoutMode ? (tempCartItems.length > 0 ? tempCartItems : cartItems).reduce((sum, item) => sum + item.numSamples, 0) : (currentCartItem && isEditMode ? numSamples : (currentCartItem ? currentCartItem.numSamples : numSamples))}
        selectedGuidelines={(() => {
          if (isCheckoutMode) {
            return (tempCartItems.length > 0 ? tempCartItems : cartItems).flatMap(item => item.selectedGuidelines);
          } else if (currentCartItem && isEditMode) {
            // In edit mode, always use current form state to show real-time changes
            return selectedGuidelines;
          } else if (currentCartItem) {
            // When viewing cart item (not in edit mode), use cart item data
            const allGuidelines = [...(currentCartItem.sampleFormGuidelines || []), ...(currentCartItem.sampleSolventGuidelines || [])];
            return [...new Set(allGuidelines)]; // Remove duplicates
          } else {
            // Use selectedGuidelines directly, not separate arrays
            return selectedGuidelines;
          }
        })()}
        selectedTherapeuticAreas={isCheckoutMode ? 
          (tempCartItems.length > 0 ? tempCartItems : cartItems).flatMap(item => item.selectedTherapeuticAreas || []) : 
          (currentCartItem && isEditMode ? 
            selectedTherapeuticAreas : 
            (currentCartItem ? 
              currentCartItem.selectedTherapeuticAreas : 
              selectedTherapeuticAreas.map(area => area === 'Others' ? `Others (${customTherapeuticArea})` : area)
            )
          )}
        expandedOrderAccordion={expandedOrderAccordion}
        onNumSamplesChange={(increment: boolean) => {
          setNumSamples(prev => Math.max(1, increment ? prev + 1 : prev - 1));
        }}
        onOrderAccordionChange={handleOrderAccordionChange}
        onRemoveGuideline={handleRemoveGuideline}
        isCheckoutMode={isCheckoutMode}
        cartItems={isCheckoutMode ? (tempCartItems.length > 0 ? tempCartItems : cartItems) : (currentCartItem && !isEditMode ? [{
          ...currentCartItem,
          selectedGuidelines: [...(currentCartItem.sampleFormGuidelines || []), ...(currentCartItem.sampleSolventGuidelines || [])]
        }] : [])}
        onEditOrder={handleEditOrder}
        isEditMode={isEditMode}
        initialSampleDescription={(() => {
          const desc = currentCartItem ? currentCartItem.description || '' : '';
          console.log('🔄 Passing initialSampleDescription to OrderSummaryModal:', desc);
          console.log('🔄 currentCartItem:', currentCartItem);
          return desc;
        })()}
      />

      {/* Customer Details Modal */}
      <CustomerDetailsModal
        isOpen={showCustomerDetails}
        onClose={handleCloseCustomerDetails}
        onBack={handleBackStep}
        onGenerateQuotation={handleGenerateQuotation}
        customerName={customerName}
        customerEmail={customerEmail}
        customerPhone={customerPhone}
        customerCompany={customerCompany}
        customerCountry={customerCountry}
        onCustomerNameChange={setCustomerName}
        onCustomerEmailChange={setCustomerEmail}
        onCustomerPhoneChange={setCustomerPhone}
        onCustomerCompanyChange={setCustomerCompany}
        onCustomerCountryChange={setCustomerCountry}
      />

      {/* Quotation Generation Modal */}
      <QuotationGenerationModal
        isOpen={showQuotation}
        onClose={handleCloseQuotation}
        category={isCheckoutMode ? 'Multiple Categories' : (currentCartItem && isEditMode ? selectedProductType : (currentCartItem ? currentCartItem.category : selectedProductType))}
        sampleForm={isCheckoutMode ? 'Multiple Forms' : (currentCartItem && isEditMode ? (selectedSampleForm || customSampleForm) : (currentCartItem ? currentCartItem.sampleForm : (selectedSampleForm || customSampleForm)))}
        sampleSolvent={isCheckoutMode ? 'Multiple Solvents' : (currentCartItem && isEditMode ? (selectedSampleSolvent || customSampleSolvent) : (currentCartItem ? currentCartItem.sampleSolvent : (selectedSampleSolvent || customSampleSolvent)))}
        application="Invitro Study"
        numSamples={isCheckoutMode ? (tempCartItems.length > 0 ? tempCartItems : cartItems).reduce((sum, item) => sum + item.numSamples, 0) : (currentCartItem && isEditMode ? numSamples : (currentCartItem ? currentCartItem.numSamples : numSamples))}
        selectedGuidelines={(() => {
          if (isCheckoutMode) {
            return (tempCartItems.length > 0 ? tempCartItems : cartItems).flatMap(item => item.selectedGuidelines);
          } else if (currentCartItem && isEditMode) {
            // In edit mode, always use current form state to show real-time changes
            return selectedGuidelines;
          } else if (currentCartItem) {
            // When viewing cart item (not in edit mode), use cart item data
            const allGuidelines = [...(currentCartItem.sampleFormGuidelines || []), ...(currentCartItem.sampleSolventGuidelines || [])];
            return [...new Set(allGuidelines)]; // Remove duplicates
          } else {
            // Use selectedGuidelines directly, not separate arrays
            return selectedGuidelines;
          }
        })()}
        selectedTherapeuticAreas={isCheckoutMode ? (tempCartItems.length > 0 ? (tempCartItems[0] as any)?.selectedTherapeuticAreas || [] : (cartItems[0] as any)?.selectedTherapeuticAreas || []) : (currentCartItem ? (currentCartItem as any).selectedTherapeuticAreas : selectedTherapeuticAreas)}
        customerName={customerName}
        customerEmail={customerEmail}
        customerPhone={customerPhone}
        customerCompany={customerCompany}
        customSampleForm={customSampleForm}
        customSampleSolvent={customSampleSolvent}
        customApplication="Invitro Study"
        isCheckoutMode={isCheckoutMode}
        cartItems={isCheckoutMode ? (tempCartItems.length > 0 ? tempCartItems : cartItems) : (currentCartItem && !isEditMode ? [{
          ...currentCartItem,
          selectedGuidelines: [...(currentCartItem.sampleFormGuidelines || []), ...(currentCartItem.sampleSolventGuidelines || [])]
        }] : [])}
      />
    </>
  );
}
