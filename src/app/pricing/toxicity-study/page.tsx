/**
 * @fileoverview Toxicity Study page with product configuration
 */

'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Container,
  Chip,
  IconButton,
  useTheme,
  Button
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCart } from '../../../contexts/CartContext';

// Project imports
import AppBar from 'ui-component/extended/AppBar';
import FooterSection from 'views/pages/landing/FooterSection';
import { useScreenDetection } from 'views/pages/landing/utils/utils';

// Component imports
import {
  ProductDetailsCard,
  ApplicableGuidelinesCard,
  OrderSummaryModal,
  GuidelineDetailModal,
  CustomerDetailsModal,
  QuotationGenerationModal,
  NotificationPopup
} from './components';

// CartModal is handled by AppBar component

// Data imports
import { 
  getAvailableCategories, 
  getGuidelinesForCategory,
  getGuidelineData 
} from './data/guidelineData';
import { getGuidelinesForProductDetail } from './data/productGuidelineMapping';

// Sample form to application mapping based on OECD guidelines
const sampleFormToApplications: { [key: string]: string[] } = {
  'Tablets': ['Oral', 'Injectable', 'Ophthalmic', 'Nasal', 'Rectal/Vaginal', 'Any other'],
  'Capsules': ['Oral', 'Injectable', 'Ophthalmic', 'Nasal', 'Rectal/Vaginal', 'Any other'],
  'Syrup': ['Oral', 'Injectable', 'Ophthalmic', 'Nasal', 'Rectal/Vaginal', 'Any other'],
  'Suspensions': ['Oral', 'Injectable', 'Ophthalmic', 'Nasal', 'Rectal/Vaginal', 'Any other'],
  'Powders': ['Oral', 'Injectable', 'Ophthalmic', 'Nasal', 'Rectal/Vaginal', 'Any other'],
  'Granules': ['Oral', 'Injectable', 'Ophthalmic', 'Nasal', 'Rectal/Vaginal', 'Any other'],
  'Oral Strips': ['Oral', 'Injectable', 'Ophthalmic', 'Nasal', 'Rectal/Vaginal', 'Any other'],
  'Drops': ['Oral', 'Injectable', 'Ophthalmic', 'Nasal', 'Rectal/Vaginal', 'Any other'],
  'Cream': ['Topical'],
  'gel': ['Topical'],
  'Others': ['Oral', 'Injectable', 'Ophthalmic', 'Nasal', 'Rectal/Vaginal', 'Topical', 'Any other']
};

const categories = getAvailableCategories();

export function ToxicityStudyPageContent() {
  const theme = useTheme();
  const router = useRouter();
  const searchParams = useSearchParams();
  const screen = useScreenDetection();
  const { addToCart, setNavigationHandlers, cartItems, updateCartItems, openCartModal } = useCart();
  
  // Helper function to convert category name to hash
  const categoryToHash = (category: string) => {
    return category.toLowerCase()
      .replace(/\s*\/\s*/g, '')   // Remove "/"
      .replace(/\s+/g, '')        // Remove spaces
      .replace(/[^a-z0-9]/g, ''); // Remove any other special characters
  };

  // Initialize categoryTab based on URL hash or parameter or default to 0
  const getInitialCategoryTab = () => {
    // First check URL parameter
    const productType = searchParams.get('productType');
    if (productType) {
      const categoryIndex = categories.findIndex(cat => 
        categoryToHash(cat) === productType.toLowerCase()
      );
      if (categoryIndex >= 0) return categoryIndex;
    }
    
    // Then check URL hash
    const currentHash = window.location.hash.replace('#', '');
    if (currentHash) {
      const categoryIndex = categories.findIndex(cat => 
        categoryToHash(cat) === currentHash.toLowerCase()
      );
      if (categoryIndex >= 0) return categoryIndex;
    }
    
    return 0;
    
    // Default to Medical Devices (index 4) if no specific selection
    return 4;
  };
  
  const [categoryTab, setCategoryTab] = useState(() => getInitialCategoryTab());
  const [sampleForm, setSampleForm] = useState('Distilled Water');
  const [sampleSolvent, setSampleSolvent] = useState('');
  const [application, setApplication] = useState('');
  const [numSamples, setNumSamples] = useState(1);
  const [selectedGuidelines, setSelectedGuidelines] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [expandedAccordion, setExpandedAccordion] = useState<string | false>('sample-form');
  const [showNotification, setShowNotification] = useState(false);
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const [showGuidelineModal, setShowGuidelineModal] = useState(false);
  const [selectedGuideline, setSelectedGuideline] = useState('');
  const [expandedOrderAccordion, setExpandedOrderAccordion] = useState<string | false>(false);
  const [showCustomerDetails, setShowCustomerDetails] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerCompany, setCustomerCompany] = useState('');
  const [customerCountry, setCustomerCountry] = useState('');
  const [showQuotation, setShowQuotation] = useState(false);
  const [customSampleForm, setCustomSampleForm] = useState('');
  const [customSampleSolvent, setCustomSampleSolvent] = useState('');
  const [customApplication, setCustomApplication] = useState('');
  const [showCartCustomerDetails, setShowCartCustomerDetails] = useState(false);
  const [currentCartItem, setCurrentCartItem] = useState<any>(null);
  const [isFromCartFlow, setIsFromCartFlow] = useState(false);
  const [cartFlowGuidelines, setCartFlowGuidelines] = useState<string[]>([]);
  const [isCheckoutMode, setIsCheckoutMode] = useState(false);

  const [isEditMode, setIsEditMode] = useState(false);
  const [editingCartItem, setEditingCartItem] = useState<any>(null);
  const [isEditNotification, setIsEditNotification] = useState(false);
  
  // New state for tracking product detail selections
  const [selectedSampleForms, setSelectedSampleForms] = useState<string[]>([]);
  const [selectedSampleSolvents, setSelectedSampleSolvents] = useState<string[]>([]);
  const [selectedApplications, setSelectedApplications] = useState<string[]>([]);
  
  // New state for tracking guidelines per product detail type
  const [sampleFormGuidelines, setSampleFormGuidelines] = useState<string[]>([]);
  const [sampleSolventGuidelines, setSampleSolventGuidelines] = useState<string[]>([]);
  const [applicationGuidelines, setApplicationGuidelines] = useState<string[]>([]);
  
  // State to track which section is currently active for guideline selection
  const [activeSection, setActiveSection] = useState<'sampleForm' | 'sampleSolvent' | 'application' | null>(null);
  const [forceUpdate, setForceUpdate] = useState(0);
  const [rightSideKey, setRightSideKey] = useState(0);
  const [currentSectionGuidelines, setCurrentSectionGuidelines] = useState<string[]>([]);

  // State for temporary cart items in Order Summary modal (doesn't affect actual cart)
  const [tempCartItems, setTempCartItems] = useState<any[]>([]);

  // State for cart modal



  // Get current category
  const currentCategory = categories[categoryTab];


  // Reset guidelines and product details when category changes (but not when editing)
  useEffect(() => {
    if (!isEditMode) {
      // Clear product details
      setSampleForm('Distilled Water');
      setSampleSolvent('');
      setApplication('');
      setNumSamples(1);
      setCustomSampleForm('');
      setCustomSampleSolvent('');
      setCustomApplication('');
      
      // Clear product detail selections
      setSelectedSampleForms([]);
      setSelectedSampleSolvents([]);
      setSelectedApplications([]);
      setActiveSection(null);
      
      // Clear guidelines
      setSelectedGuidelines([]);
      setSelectAll(false);
      // Also clear section-specific guidelines
      setSampleFormGuidelines([]);
      setSampleSolventGuidelines([]);
      setApplicationGuidelines([]);
      setCurrentSectionGuidelines([]);
    }
  }, [categoryTab, isEditMode]);

  // Handle initial URL parsing on component mount
  useEffect(() => {
    const initialCategoryTab = getInitialCategoryTab();
    if (initialCategoryTab !== categoryTab) {
      setCategoryTab(initialCategoryTab);
    }
  }, []); // Only run on mount


  // Handle cart item data from URL parameters (for edit flow)
  useEffect(() => {
    const cartItemData = searchParams.get('cartItem');
    if (cartItemData) {
      try {
        const item = JSON.parse(decodeURIComponent(cartItemData));
        console.log('🔄 Auto-filling cart item data:', item);
        
        // Set the form data based on cart item
        if (item.sampleForm) setSampleForm(item.sampleForm);
        if (item.sampleSolvent) setSampleSolvent(item.sampleSolvent);
        if (item.application) setApplication(item.application);
        if (item.numSamples) setNumSamples(item.numSamples);
        if (item.selectedGuidelines) setSelectedGuidelines(item.selectedGuidelines);
        if (item.customSampleForm) setCustomSampleForm(item.customSampleForm);
        if (item.customSampleSolvent) setCustomSampleSolvent(item.customSampleSolvent);
        if (item.customApplication) setCustomApplication(item.customApplication);
        // Set currentCartItem for the modal to use
        setCurrentCartItem(item);
        console.log('🔄 Set currentCartItem with sampleDescription:', item.sampleDescription);
        
        // Auto-fill product detail selections
        if (item.sampleFormGuidelines) setSampleFormGuidelines(item.sampleFormGuidelines);
        if (item.sampleSolventGuidelines) setSampleSolventGuidelines(item.sampleSolventGuidelines);
        if (item.applicationGuidelines) setApplicationGuidelines(item.applicationGuidelines);
        
        // Auto-fill selected product details
        if (item.sampleForm) setSelectedSampleForms([item.sampleForm]);
        if (item.sampleSolvent) setSelectedSampleSolvents([item.sampleSolvent]);
        if (item.application) setSelectedApplications([item.application]);
        
        // Immediately set currentSectionGuidelines to show guidelines right away
        if (item.selectedGuidelines && item.selectedGuidelines.length > 0) {
          setCurrentSectionGuidelines(item.selectedGuidelines);
          console.log('🔄 Immediately set currentSectionGuidelines:', item.selectedGuidelines);
        }
        
        // Set active section to show guidelines immediately
        // Priority: sampleForm -> sampleSolvent -> application
        if (item.sampleForm) {
          setActiveSection('sampleForm');
        } else if (item.sampleSolvent) {
          setActiveSection('sampleSolvent');
        } else if (item.application) {
          setActiveSection('application');
        }
        
        // Also set selectAll state based on guidelines
        if (item.selectedGuidelines && item.selectedGuidelines.length > 0) {
          const totalPossibleGuidelines = getGuidelinesForCategory(item.category || currentCategory).length;
          setSelectAll(item.selectedGuidelines.length === totalPossibleGuidelines);
          console.log('🔄 Set selectAll to:', item.selectedGuidelines.length === totalPossibleGuidelines);
        }
        
        // Set edit mode
        setIsEditMode(true);
        setEditingCartItem(item);
        
        // Force update to ensure guidelines card re-renders
        setRightSideKey(prev => prev + 1);
        
        console.log('✅ Auto-fill completed for:', {
          sampleForm: item.sampleForm,
          sampleSolvent: item.sampleSolvent,
          application: item.application,
          numSamples: item.numSamples,
          selectedGuidelines: item.selectedGuidelines,
          sampleFormGuidelines: item.sampleFormGuidelines,
          sampleSolventGuidelines: item.sampleSolventGuidelines,
          applicationGuidelines: item.applicationGuidelines
        });
      } catch (error) {
        console.error('Error parsing cart item data:', error);
      }
    }
  }, [searchParams]);

  // Set navigation handlers for cart
  useEffect(() => {
    setNavigationHandlers({
      onGenerateQuotation: (item) => {
        // Store the cart item and show customer details directly
        setCurrentCartItem(item);
        setCartFlowGuidelines([...item.selectedGuidelines]);
        setIsFromCartFlow(true);
        handleCartCustomerDetails();
      },
      onViewFullDetails: (item) => {
        // Store the cart item and show order summary
        setCurrentCartItem(item);
        setCartFlowGuidelines([...item.selectedGuidelines]);
        setIsFromCartFlow(true);
        setIsCheckoutMode(false); // Explicitly set to false for single cart item view
        setShowOrderSummary(true);
      },
      onProceedToCheckout: () => {
        // For proceed button, show order summary modal in checkout mode for all cart items
        setIsFromCartFlow(true);
        setIsCheckoutMode(true);
        
        // Initialize temporary cart items for the modal (copy of actual cart)
        const tempItems = cartItems.map(item => ({
          ...item,
          sampleFormGuidelines: [...(item.sampleFormGuidelines || [])],
          sampleSolventGuidelines: [...(item.sampleSolventGuidelines || [])],
          applicationGuidelines: [...(item.applicationGuidelines || [])],
          selectedGuidelines: [...(item.selectedGuidelines || [])]
        }));
        setTempCartItems(tempItems);
        
        console.log('🔄 onProceedToCheckout - tempItems initialized:', tempItems);
        console.log('🔄 onProceedToCheckout - Total guidelines count:', tempItems.reduce((sum, item) => sum + (item.selectedGuidelines?.length || 0), 0));
        console.log('🔄 onProceedToCheckout - Individual item guidelines:', tempItems.map(item => ({
          id: item.id,
          sampleForm: item.sampleForm,
          selectedGuidelines: item.selectedGuidelines,
          guidelinesCount: item.selectedGuidelines?.length || 0
        })));
        
        setShowOrderSummary(true);
      },
    });
  }, [setNavigationHandlers, cartItems]);

  // Reset deleted guidelines when Order Summary modal opens
  useEffect(() => {
    if (showOrderSummary && isCheckoutMode) {
      console.log('Order Summary session started');
      
      // Ensure tempCartItems are properly initialized if they're empty
      if (tempCartItems.length === 0) {
        console.log('🔄 Initializing tempCartItems for Order Summary modal');
        const tempItems = cartItems.map(item => ({
          ...item,
          sampleFormGuidelines: [...(item.sampleFormGuidelines || [])],
          sampleSolventGuidelines: [...(item.sampleSolventGuidelines || [])],
          applicationGuidelines: [...(item.applicationGuidelines || [])],
          selectedGuidelines: [...(item.selectedGuidelines || [])]
        }));
        setTempCartItems(tempItems);
        console.log('🔄 tempCartItems initialized:', tempItems);
        console.log('🔄 Total guidelines count:', tempItems.reduce((sum, item) => sum + (item.selectedGuidelines?.length || 0), 0));
      }
    }
  }, [showOrderSummary, isCheckoutMode, cartItems, tempCartItems.length]);

  // Reset cart flow guidelines when Order Summary modal opens for single cart items
  useEffect(() => {
    if (showOrderSummary && !isCheckoutMode && currentCartItem) {
      setCartFlowGuidelines([...currentCartItem.selectedGuidelines]);
      console.log('Reset cart flow guidelines for single cart item:', currentCartItem.selectedGuidelines);
    }
  }, [showOrderSummary, isCheckoutMode, currentCartItem]);

  // Force right side update when activeSection changes in edit mode
  useEffect(() => {
    if (isEditMode && activeSection) {
      console.log('🔄 Active section changed in edit mode:', activeSection);
      console.log('🔄 Current guidelines state:', {
        sampleFormGuidelines,
        sampleSolventGuidelines,
        applicationGuidelines,
        activeSection
      });
      
      // Force a re-render of the right side by updating a dummy state
      // This ensures the ApplicableGuidelinesCard shows the correct guidelines
      const timer = setTimeout(() => {
        console.log('🔄 Forcing right side re-render for section:', activeSection);
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [activeSection, isEditMode, sampleFormGuidelines, sampleSolventGuidelines, applicationGuidelines]);

  // Additional useEffect to force re-render when activeSection changes
  useEffect(() => {
    console.log('🔄 ActiveSection changed to:', activeSection);
    console.log('🔄 Guidelines for current section:', {
      sampleForm: sampleFormGuidelines,
      sampleSolvent: sampleSolventGuidelines,
      application: applicationGuidelines
    });
    
    // Force a re-render when activeSection changes
    if (isEditMode) {
      console.log('🔄 Forcing re-render due to activeSection change');
      setForceUpdate(prev => prev + 1);
    }
  }, [activeSection, isEditMode]);

  // Specific useEffect to monitor Application guidelines changes
  useEffect(() => {
    if (isEditMode && activeSection === 'application') {
      console.log('🔄 Application section active - Application guidelines:', applicationGuidelines);
      console.log('🔄 Application guidelines length:', applicationGuidelines.length);
      console.log('🔄 Application guidelines content:', applicationGuidelines);
    }
  }, [applicationGuidelines, activeSection, isEditMode]);

  // Update currentSectionGuidelines whenever activeSection changes
  useEffect(() => {
    // Since all sections should have the same guidelines, always show the selectedGuidelines
    // regardless of which section is active
    let guidelinesToShow: string[] = selectedGuidelines;
    
    console.log('🔄 useEffect triggered - activeSection:', activeSection);
    console.log('🔄 Current state:', {
      sampleFormGuidelines,
      sampleSolventGuidelines,
      applicationGuidelines,
      selectedGuidelines,
      isEditMode
    });
    
    // Only update if we have guidelines to show and we're not in edit mode with empty guidelines
    if (guidelinesToShow.length > 0 || !isEditMode) {
    console.log('🔄 Setting currentSectionGuidelines to selectedGuidelines (same for all sections):', guidelinesToShow);
    setCurrentSectionGuidelines(guidelinesToShow);
    console.log('🔄 currentSectionGuidelines updated to:', guidelinesToShow);
    } else {
      console.log('🔄 Skipping update - in edit mode with empty guidelines');
    }
  }, [activeSection, sampleFormGuidelines, sampleSolventGuidelines, applicationGuidelines, selectedGuidelines, isEditMode]);




  const handleCategoryChange = (index: number) => {
    // Update URL hash immediately for instant response
    const category = categories[index];
    const productTypeHash = categoryToHash(category);
    const newHash = `#${productTypeHash}`;
    
    // Use window.history.replaceState for immediate URL change
    window.history.replaceState({}, '', window.location.pathname + newHash);
    
    // Then update state
    setCategoryTab(index);
  };

  const handleSampleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setSampleForm(newValue);
    // Increment sample count when a selection is made
    if (newValue && !sampleForm) {
      setNumSamples(prev => prev + 1);
    }
  };

  const handleSampleSolventChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setSampleSolvent(newValue);
    if (newValue && !sampleSolvent) {
      setNumSamples(prev => prev + 1);
    }
  };

  const handleApplicationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setApplication(newValue);
    if (newValue && !application) {
      setNumSamples(prev => prev + 1);
    }
  };

  // New handlers for product detail selections
  const handleSampleFormSelection = (value: string) => {
    setSelectedSampleForms([value]); // Only one selection allowed
    setActiveSection('sampleForm');
    
    // Clear incompatible applications when sample form changes
    const allowedApplications = sampleFormToApplications[value] || [];
    const currentApplication = selectedApplications[0];
    if (currentApplication && !allowedApplications.includes(currentApplication)) {
      setSelectedApplications([]); // Clear incompatible application
    }
    
    console.log('🔄 Sample Form selected, activeSection set to:', 'sampleForm');
    console.log('🔄 Current guidelines - Sample Form:', sampleFormGuidelines, 'Solvent:', sampleSolventGuidelines, 'Application:', applicationGuidelines);
    
    // Don't clear guidelines when switching sections - keep the same guidelines for all sections
    // Just switch the active section to show the guidelines
      const currentGuidelines = sampleFormGuidelines.length > 0 ? sampleFormGuidelines : selectedGuidelines;
      const totalPossibleGuidelines = getGuidelinesForCategory(currentCategory).length;
      setSelectAll(currentGuidelines.length === totalPossibleGuidelines);
      
      // Force a re-render to ensure right side updates
      console.log('🔄 Forcing right side update for Sample Form section');
      setForceUpdate(prev => prev + 1);
      setRightSideKey(prev => prev + 1);
      
      // Also directly update currentSectionGuidelines
      console.log('🔄 Directly updating currentSectionGuidelines to:', currentGuidelines);
      setCurrentSectionGuidelines(currentGuidelines);
  };

  const handleSampleSolventSelection = (value: string) => {
    setSelectedSampleSolvents([value]); // Only one selection allowed
    setActiveSection('sampleSolvent');
    
    console.log('🔄 Sample Solvent selected, activeSection set to:', 'sampleSolvent');
    console.log('🔄 Current guidelines - Sample Form:', sampleFormGuidelines, 'Solvent:', sampleSolventGuidelines, 'Application:', applicationGuidelines);
    
    // Don't clear guidelines when switching sections - keep the same guidelines for all sections
    // Just switch the active section to show the guidelines
      const currentGuidelines = sampleSolventGuidelines.length > 0 ? sampleSolventGuidelines : selectedGuidelines;
      const totalPossibleGuidelines = getGuidelinesForCategory(currentCategory).length;
      setSelectAll(currentGuidelines.length === totalPossibleGuidelines);
      
      // Force a re-render to ensure right side updates
      console.log('🔄 Forcing right side update for Sample Solvent section');
      setForceUpdate(prev => prev + 1);
      setRightSideKey(prev => prev + 1);
      
      // Also directly update currentSectionGuidelines
      console.log('🔄 Directly updating currentSectionGuidelines to:', currentGuidelines);
      setCurrentSectionGuidelines(currentGuidelines);
  };

  const handleApplicationSelection = (value: string) => {
    setSelectedApplications([value]); // Only one selection allowed
    setActiveSection('application');
    
    console.log('🔄 Application selected, activeSection set to:', 'application');
    console.log('🔄 Current guidelines - Sample Form:', sampleFormGuidelines, 'Solvent:', sampleSolventGuidelines, 'Application:', applicationGuidelines);
    console.log('🔄 Application guidelines length:', applicationGuidelines.length);
    console.log('🔄 Application guidelines content:', applicationGuidelines);
    
    // Don't clear guidelines when switching sections - keep the same guidelines for all sections
    // Just switch the active section to show the guidelines
      const currentGuidelines = applicationGuidelines.length > 0 ? applicationGuidelines : selectedGuidelines;
      const totalPossibleGuidelines = getGuidelinesForCategory(currentCategory).length;
      setSelectAll(currentGuidelines.length === totalPossibleGuidelines);
      
      // Force a re-render to ensure right side updates
      console.log('🔄 Forcing right side update for Application section');
      console.log('🔄 Application guidelines to show:', currentGuidelines);
      setForceUpdate(prev => prev + 1);
      setRightSideKey(prev => prev + 1);
      
      // Also directly update currentSectionGuidelines
      console.log('🔄 Directly updating currentSectionGuidelines to:', currentGuidelines);
      setCurrentSectionGuidelines(currentGuidelines);
  };

  // Check if Add to Cart button should be enabled
  const isAddToCartEnabled = () => {
    const hasBasicSelections = selectedSampleForms.length > 0 && 
           selectedSampleSolvents.length > 0 && 
           selectedApplications.length > 0 && 
           selectedGuidelines.length > 0;
    
    // Check if custom fields are required and filled
    const needsCustomSampleForm = selectedSampleForms.includes('Others') && customSampleForm.trim() === '';
    const needsCustomSampleSolvent = selectedSampleSolvents.includes('Others') && customSampleSolvent.trim() === '';
    const needsCustomApplication = selectedApplications.includes('Others') && customApplication.trim() === '';
    
    return hasBasicSelections && !needsCustomSampleForm && !needsCustomSampleSolvent && !needsCustomApplication;
  };

  // Get selected values for cart item creation
  const getSelectedValues = () => {
    return {
      sampleForm: selectedSampleForms.includes('Others') ? `Others (${customSampleForm})` : (selectedSampleForms[0] || 'Distilled Water'),
      sampleSolvent: selectedSampleSolvents.includes('Others') ? `Others (${customSampleSolvent})` : (selectedSampleSolvents[0] || ''),
      application: selectedApplications.includes('Others') ? `Others (${customApplication})` : (selectedApplications[0] || '')
    };
  };

  const handleNumSamplesChange = (increment: boolean) => {
    setNumSamples(prev => Math.max(1, increment ? prev + 1 : prev - 1));
  };

  const handleGuidelineToggle = (guideline: string) => {
    setSelectedGuidelines(prev => 
      prev.includes(guideline) 
        ? prev.filter(g => g !== guideline)
        : [...prev, guideline]
    );
    
    // Add/remove guidelines from all sections since they should all have the same guidelines
      setSampleFormGuidelines(prev => 
        prev.includes(guideline) 
          ? prev.filter(g => g !== guideline)
          : [...prev, guideline]
      );
      setSampleSolventGuidelines(prev => 
        prev.includes(guideline) 
          ? prev.filter(g => g !== guideline)
          : [...prev, guideline]
      );
      setApplicationGuidelines(prev => 
        prev.includes(guideline) 
          ? prev.filter(g => g !== guideline)
          : [...prev, guideline]
      );
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedGuidelines([]);
      // Clear all specific guideline arrays
      setSampleFormGuidelines([]);
      setSampleSolventGuidelines([]);
      setApplicationGuidelines([]);
    } else {
      const availableGuidelines = getGuidelinesForCategory(currentCategory);
      setSelectedGuidelines(availableGuidelines);
      // Populate all sections with the same guidelines
        setSampleFormGuidelines(availableGuidelines);
        setSampleSolventGuidelines(availableGuidelines);
        setApplicationGuidelines(availableGuidelines);
    }
    setSelectAll(!selectAll);
  };

  // Helper function to generate sample description based on category and selections
  const generateSampleDescription = () => {
    const currentCategory = categories[categoryTab];
    const allSelectedGuidelines = [...new Set([...sampleFormGuidelines, ...sampleSolventGuidelines, ...applicationGuidelines])];
    
    if (currentCategory === 'Pharmaceuticals') {
      return "Clinical evaluation of product's dermal safety by Patch test in Human volunteers as per IS 4011 guidelines.";
    } else if (currentCategory === 'Nutraceuticals') {
      return "Clinical evaluation of product's dermal safety by Patch test in Human volunteers as per IS 4011 guidelines.";
    } else if (currentCategory === 'Herbal/Ayush') {
      return "Clinical evaluation of product's dermal safety by Patch test in Human volunteers as per IS 4011 guidelines.";
    } else if (currentCategory === 'Medical devices') {
      return "ISO 10993-23:2021 specifies procedures for evaluating the irritation potential of medical devices, materials, or their extracts.";
    } else if (currentCategory === 'Cosmeceuticals') {
      // For Cosmeceuticals, use the specific description from the table data
      if (sampleForm === 'Lotions') {
        return "Evaluation of the dermatological safety and sensitivity of test formulation/product using Human Repeat Insult Patch Test (HRIPT) technique in Men and Women";
      } else if (sampleForm === 'Suspensions') {
        return "In vitro UV induced skin irritation test by NRU uptake assay in 3T3L cell line as per OECD 432";
      } else if (['Ointments', 'Creams/Emulsions', 'Gels', 'Sticks', 'Powder', 'Aerosols'].includes(sampleForm)) {
        return "Hens egg test/ Chorioallantoic membrane (HET-CAM) test for cosmetics/personal care product to determine the occular irritation potential";
      } else {
        // For Solutions and other forms
        return "Clinical evaluation of product's dermal safety by Patch test in Human volunteers as per IS 4011 guidelines";
      }
    } else {
      // For other categories, use the original logic
      const descriptions = allSelectedGuidelines.map(guideline => {
        const guidelineData = getGuidelineData(currentCategory, guideline);
        return guidelineData?.description || guideline;
      }).join('; ');
      return descriptions || 'Toxicity study evaluation for selected guidelines';
    }
  };

  const handleAddToOrder = () => {
    // If individual arrays are empty but selectedGuidelines has data, populate them
    if (selectedGuidelines.length > 0 && 
        sampleFormGuidelines.length === 0 && 
        sampleSolventGuidelines.length === 0 && 
        applicationGuidelines.length === 0) {
      
      // Use the same guidelines for all three sections
      const sameGuidelines = [...selectedGuidelines];
      
      setSampleFormGuidelines(sameGuidelines);
      setSampleSolventGuidelines(sameGuidelines);
      setApplicationGuidelines(sameGuidelines);
      
      console.log('🔍 Using same guidelines for all sections:', sameGuidelines);
      console.log('🔍 Setting individual arrays:', {
        sampleForm: sameGuidelines,
        sampleSolvent: sameGuidelines,
        application: sameGuidelines
      });
      
      // Wait for state to update before opening modal
      setTimeout(() => {
        console.log('🔍 Opening OrderSummaryModal with updated state:', {
          sampleFormGuidelines: sameGuidelines,
          sampleSolventGuidelines: sameGuidelines,
          applicationGuidelines: sameGuidelines,
          selectedGuidelines,
          selectedSampleForms,
          selectedSampleSolvents,
          selectedApplications,
          activeSection
        });
        setShowOrderSummary(true);
        setIsFromCartFlow(false);
        setIsCheckoutMode(false);
      }, 100);
    } else {
      // Open Order Summary modal directly if arrays already have data
      console.log('🔍 Opening OrderSummaryModal with current state:', {
        sampleFormGuidelines,
        sampleSolventGuidelines,
        applicationGuidelines,
        selectedGuidelines,
        selectedSampleForms,
        selectedSampleSolvents,
        selectedApplications,
        activeSection
      });
      setShowOrderSummary(true);
      setIsFromCartFlow(false);
      setIsCheckoutMode(false);
    }
  };

  const handleAddToCartFromOrderSummary = (sampleDescription?: string) => {
    // Combine all guidelines from all sections and remove duplicates
    const allSelectedGuidelines = [...new Set([...sampleFormGuidelines, ...sampleSolventGuidelines, ...applicationGuidelines])];
    
    // Calculate total price
    const totalPrice = allSelectedGuidelines.reduce((sum, guideline) => {
      const guidelineData = getGuidelineData(currentCategory, guideline);
      return sum + (guidelineData?.price || 0);
    }, 0);

    // Use the sample description from the modal if provided, otherwise use the generated description
    const finalDescription = sampleDescription || generateSampleDescription();

    const selectedValues = getSelectedValues();
    const generatedConfigNo = isEditMode ? editingCartItem.configNo : `RR${String(Math.floor(Math.random() * 1000000)).padStart(6, '0')}`;
    
    console.log('🔥 TOXICITY PAGE - Creating cart item:');
    console.log('🔥 isEditMode:', isEditMode);
    console.log('🔥 editingCartItem:', editingCartItem);
    console.log('🔥 generatedConfigNo:', generatedConfigNo);
    
    const cartItem = {
      id: isEditMode ? editingCartItem.id : `RR${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      configNo: generatedConfigNo,
      studyType: 'Toxicity Study',
      price: totalPrice,
      numSamples,
      createdOn: isEditMode ? editingCartItem.createdOn : new Date().toLocaleDateString('en-GB'),
      validTill: isEditMode ? editingCartItem.validTill : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB'),
      description: finalDescription,
      category: currentCategory,
      sampleForm: selectedValues.sampleForm,
      sampleSolvent: selectedValues.sampleSolvent,
      application: selectedValues.application,
      selectedGuidelines: allSelectedGuidelines,
      // Add specific guidelines for each product detail type
      // Use the guidelines that were selected for each specific product detail type
      sampleFormGuidelines: sampleFormGuidelines,
      sampleSolventGuidelines: sampleSolventGuidelines,
      applicationGuidelines: applicationGuidelines,
      sampleDescription: sampleDescription || '',
    };

    if (isEditMode) {
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
    setShowNotification(true);
    
    // Close Order Summary modal
    setShowOrderSummary(false);
    
    // Reset form and edit mode
    resetForm();
    setIsEditMode(false);
    setEditingCartItem(null);
    
    console.log(isEditMode ? 'Updated cart item:' : 'Added to cart:', cartItem);
  };

  const resetForm = () => {
    // Don't reset categoryTab - keep the current category selected
    // setCategoryTab(0);
    setSampleForm('Distilled Water');
    setSampleSolvent('');
    setApplication('');
    setNumSamples(1);
    setSelectedGuidelines([]);
    setSelectAll(false);
    setExpandedAccordion('sample-form');
    setCustomSampleForm('');
    setCustomSampleSolvent('');
    setCustomApplication('');
    
    // Reset product detail selections
    setSelectedSampleForms([]);
    setSelectedSampleSolvents([]);
    setSelectedApplications([]);
    
    // Reset guidelines per product detail type
    setSampleFormGuidelines([]);
    setSampleSolventGuidelines([]);
    setApplicationGuidelines([]);
  };

  const handleViewOrderSummary = () => {
    // Navigate to cart page
    router.push('/pricing/cart');
  };

  const handleCloseNotification = () => {
    setShowNotification(false);
    setIsEditNotification(false);
  };

  const handleContinueShopping = () => {
    resetForm();
  };

  const handleCloseOrderSummary = () => {
    // If we have pending changes in single cart item mode, persist them now
    if (!isCheckoutMode && currentCartItem && isFromCartFlow) {
      console.log('🔄 Persisting pending changes before closing modal');
      console.log('🔄 Final currentCartItem state:', currentCartItem);
      updateCartItems([currentCartItem]);
    }
    
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
      console.log('🔄 Temporary cart items reset - changes in Order Summary modal discarded');
    }
  };

  const handleGuidelineClick = (guideline: string) => {
    setSelectedGuideline(guideline);
    setShowGuidelineModal(true);
  };

  const handleCloseGuidelineModal = () => {
    setShowGuidelineModal(false);
    setSelectedGuideline('');
  };

  const handleOrderAccordionChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedOrderAccordion(isExpanded ? panel : false);
  };

  const handleRemoveGuideline = (guideline: string, cartIndex?: number, sectionType?: 'sampleForm' | 'sampleSolvent' | 'application') => {
    console.log('🔴 handleRemoveGuideline called with:', { 
      guideline, 
      cartIndex, 
      cartIndexType: typeof cartIndex,
      sectionType,
      isCheckoutMode, 
      cartItemsLength: cartItems.length,
      isFromCartFlow,
      hasCurrentCartItem: !!currentCartItem,
      currentCartItem: currentCartItem
    });
    
    // For Order Summary modal, use temporary state that doesn't affect the actual cart
    if (typeof cartIndex === 'number') {
      console.log('✅ Order Summary deletion - removing guideline from temporary state');
      
      if (isCheckoutMode) {
        // Multiple cart items mode - use temporary state, don't update actual cart
        console.log('🔄 Multiple cart items mode - updating temporary state only');
        
        // Use the existing temporary cart items state
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
          console.log('✅ Guideline removed from temporary state successfully (cart remains unchanged)');
        }
      } else {
        // Single cart item mode
        console.log('🔄 Single cart item mode - updating currentCartItem and cartFlowGuidelines');
        if (currentCartItem) {
          // Remove from cart flow guidelines (this updates the UI immediately)
          setCartFlowGuidelines(prev => {
            const filtered = prev.filter(g => g !== guideline);
            console.log('After filtering cartFlowGuidelines:', filtered);
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
          
          // DON'T update the global cart - this prevents affecting the cart modal
          // The changes will be persisted when the modal is closed or when editing
          console.log('✅ Guideline removed from single cart item successfully (local only)');
          console.log('Updated currentCartItem:', updatedCurrentCartItem);
        } else {
          console.log('❌ currentCartItem is null in single cart item mode');
        }
      }
    } else if (isFromCartFlow && currentCartItem && !isCheckoutMode) {
      console.log('✅ Single cart item deletion - updating cart flow guidelines');
      setCartFlowGuidelines(prev => {
        const filtered = prev.filter(g => g !== guideline);
        console.log('After filtering cartFlowGuidelines:', filtered);
        return filtered;
      });
      console.log('Cart flow guidelines updated - cart data remains unchanged');
    } else {
      console.log('❌ No matching deletion logic found - using local guidelines logic');
      // Update local guidelines for new items being added
      setSelectedGuidelines(prev => prev.filter(g => g !== guideline));
      
      // Since all sections should have the same guidelines, update all arrays when removing
      setSampleFormGuidelines(prev => prev.filter(g => g !== guideline));
      setSampleSolventGuidelines(prev => prev.filter(g => g !== guideline));
      setApplicationGuidelines(prev => prev.filter(g => g !== guideline));
      console.log('✅ Removed from all guideline arrays (same guidelines for all sections)');
    }
  };

  const handleNextStep = () => {
    setCurrentStep(2);
    setShowOrderSummary(false);
    setShowCustomerDetails(true);
  };

  const handleBackStep = () => {
    setCurrentStep(1);
    setShowCustomerDetails(false);
    setShowOrderSummary(true);
    // Reset customer details when going back
    setCustomerName('');
    setCustomerEmail('');
    setCustomerPhone('');
    setCustomerCompany('');
    // Reset custom text fields
    setCustomSampleForm('');
    setCustomSampleSolvent('');
    setCustomApplication('');
  };

  const handleCartBackStep = () => {
    setShowCartCustomerDetails(false);
    if (isCheckoutMode) {
      // In checkout mode, show order summary with all cart data
      setShowOrderSummary(true);
    } else {
      // For single item flow, show order summary with current cart item
      setShowOrderSummary(true);
    }
  };

  const handleGenerateQuotation = () => {
    // If in checkout mode, generate quotation directly without going through customer details
    if (isCheckoutMode) {
      console.log('🔄 Generating quotation directly from Order Summary Modal in checkout mode');
      setShowQuotation(true);
      
      // Ensure tempCartItems are properly set up for quotation generation
      if (tempCartItems.length === 0) {
        console.log('🔄 Setting up tempCartItems for quotation generation in checkout mode');
        const tempItems = cartItems.map(item => ({
          ...item,
          sampleFormGuidelines: [...(item.sampleFormGuidelines || [])],
          sampleSolventGuidelines: [...(item.sampleSolventGuidelines || [])],
          applicationGuidelines: [...(item.applicationGuidelines || [])],
          selectedGuidelines: [...(item.selectedGuidelines || [])]
        }));
        setTempCartItems(tempItems);
        console.log('🔄 tempCartItems set for quotation:', tempItems);
        console.log('🔄 Total guidelines count in tempItems:', tempItems.reduce((sum, item) => sum + (item.selectedGuidelines?.length || 0), 0));
      }
      
      // Debug: Log the current tempCartItems state
      console.log('🔄 Current tempCartItems state:', tempCartItems);
      console.log('🔄 Current tempCartItems guidelines count:', tempCartItems.reduce((sum, item) => sum + (item.selectedGuidelines?.length || 0), 0));
    } else {
      // Original flow for single cart items
      setCurrentStep(3);
      setShowCustomerDetails(false);
      setShowQuotation(true);
    }
    
    // Debug: Log the current state for quotation generation
    console.log('=== QUOTATION GENERATION DEBUG ===');
    console.log('Current cartItems:', cartItems);
    console.log('Current tempCartItems:', tempCartItems);
    console.log('Current isCheckoutMode:', isCheckoutMode);
    console.log('Current currentCartItem:', currentCartItem);
    console.log('Current cartFlowGuidelines:', cartFlowGuidelines);
    console.log('Current isFromCartFlow:', isFromCartFlow);
    console.log('Current customer details:', { customerName, customerEmail, customerPhone, customerCompany });
    
    // Here you would typically navigate to the quotation generation page
    console.log('Generating quotation with:', {
      customerName,
      customerEmail,
      customerPhone,
      customerCompany,
      orderDetails: {
        category: currentCategory,
        sampleForm,
        sampleSolvent,
        application,
        numSamples,
        selectedGuidelines
      }
    });
    // Note: We don't reset customer details here as they're needed for the quotation
  };

  const handleCloseCustomerDetails = () => {
    setShowCustomerDetails(false);
    // Reset customer details
    setCustomerName('');
    setCustomerEmail('');
    setCustomerPhone('');
    setCustomerCompany('');
    // Reset custom text fields
    setCustomSampleForm('');
    setCustomSampleSolvent('');
    setCustomApplication('');
  };

  const handleCloseQuotation = () => {
    setShowQuotation(false);
    
    // If we were in checkout mode, don't close the Order Summary modal
    if (!isCheckoutMode) {
      setShowCustomerDetails(false);
      setShowCartCustomerDetails(false);
      setShowOrderSummary(false);
      setCurrentStep(1);
      setCurrentCartItem(null);
      setIsFromCartFlow(false);
      setCartFlowGuidelines([]);
      setIsCheckoutMode(false);
      // Reset customer details
      setCustomerName('');
      setCustomerEmail('');
      setCustomerPhone('');
      setCustomerCompany('');
      // Reset custom text fields
      setCustomSampleForm('');
      setCustomSampleSolvent('');
      setCustomApplication('');
    }
  };

  const handleCartCustomerDetails = () => {
    setShowCartCustomerDetails(true);
  };

  const handleCloseCartCustomerDetails = () => {
    setShowCartCustomerDetails(false);
    setCurrentCartItem(null);
    setIsFromCartFlow(false);
  };

  const handleClearAllProductDetails = () => {
    setSampleForm('Distilled Water');
    setSampleSolvent('');
    setApplication('');
    setNumSamples(1);
    setCustomSampleForm('');
    setCustomSampleSolvent('');
    setCustomApplication('');
    
    // Clear product detail selections
    setSelectedSampleForms([]);
    setSelectedSampleSolvents([]);
    setSelectedApplications([]);
    setActiveSection(null);
  };

  const handleClearAllGuidelines = () => {
    setSelectedGuidelines([]);
    setSampleFormGuidelines([]);
    setSampleSolventGuidelines([]);
    setApplicationGuidelines([]);
    setSelectAll(false);
  };

  const handleEditOrder = (cartItem: any) => {
    console.log('🔄 Edit Order - Cart Item Data:', cartItem);
    
    if (!cartItem) {
      console.log('🔄 Edit Order - No cart item (adding new item), closing modal to return to main page');
      // When adding new items, close the modal to return to the main page for editing
      setShowOrderSummary(false);
      return;
    }
    
    // Set edit mode
    setIsEditMode(true);
    setEditingCartItem(cartItem);
    
    // Set currentCartItem for the modal to use
    setCurrentCartItem(cartItem);
    
    // Fill the form with cart item data
    setCategoryTab(categories.indexOf(cartItem.category));
    setNumSamples(cartItem.numSamples);
    
    // Set the main product detail selections
    if (cartItem.sampleForm) {
      setSampleForm(cartItem.sampleForm);
      setSelectedSampleForms([cartItem.sampleForm]);
    }
    if (cartItem.sampleSolvent) {
      setSampleSolvent(cartItem.sampleSolvent);
      setSelectedSampleSolvents([cartItem.sampleSolvent]);
    }
    if (cartItem.application) {
      setApplication(cartItem.application);
      setSelectedApplications([cartItem.application]);
    }
    
    // Set custom fields if they exist
    if (cartItem.customSampleForm) setCustomSampleForm(cartItem.customSampleForm);
    if (cartItem.customSampleSolvent) setCustomSampleSolvent(cartItem.customSampleSolvent);
    if (cartItem.customApplication) setCustomApplication(cartItem.customApplication);
    
    // Set the guidelines - use the specific arrays if available, fallback to selectedGuidelines
    const formGuidelines = cartItem.sampleFormGuidelines || [];
    const solventGuidelines = cartItem.sampleSolventGuidelines || [];
    const appGuidelines = cartItem.applicationGuidelines || [];
    
    console.log('🔄 Setting guidelines in edit mode:', {
      formGuidelines,
      solventGuidelines,
      appGuidelines,
      'formGuidelines.length': formGuidelines.length,
      'solventGuidelines.length': solventGuidelines.length,
      'appGuidelines.length': appGuidelines.length
    });
    
    setSampleFormGuidelines(formGuidelines);
    setSampleSolventGuidelines(solventGuidelines);
    setApplicationGuidelines(appGuidelines);
    
    // Combine all guidelines for selectedGuidelines
    const allGuidelines = [...formGuidelines, ...solventGuidelines, ...appGuidelines];
    setSelectedGuidelines(allGuidelines);
    
    // Set select all based on total guidelines
    const totalPossibleGuidelines = getGuidelinesForCategory(cartItem.category).length;
    setSelectAll(allGuidelines.length === totalPossibleGuidelines);
    
    // Always start with Sample Form if it has guidelines, then prioritize other sections
    if (formGuidelines.length > 0) {
      setActiveSection('sampleForm');
    } else if (solventGuidelines.length > 0) {
      setActiveSection('sampleSolvent');
    } else if (appGuidelines.length > 0) {
      setActiveSection('application');
    } else {
      // If no guidelines, default to sampleForm
      setActiveSection('sampleForm');
    }
    
    // Set currentSectionGuidelines to show guidelines immediately
    setCurrentSectionGuidelines(allGuidelines);
    
    // Force update to ensure guidelines card re-renders
    setRightSideKey(prev => prev + 1);
    
    console.log('🔄 Edit Order - Form populated with:', {
      category: cartItem.category,
      sampleForm: cartItem.sampleForm,
      sampleSolvent: cartItem.sampleSolvent,
      application: cartItem.application,
      formGuidelines,
      solventGuidelines,
      appGuidelines,
      allGuidelines,
      activeSection: formGuidelines.length > 0 ? 'sampleForm' : solventGuidelines.length > 0 ? 'sampleSolvent' : 'application'
    });
    
    // Close the modal
    setShowOrderSummary(false);
  };

  // Chip styles from service-styles
  const getChipStyles = (index: number, isSelected: boolean) => ({
    background: isSelected 
      ? theme.palette.primary.main 
      : `linear-gradient(135deg, ${theme.palette.primary.main}15, ${theme.palette.secondary.main}15)`,
    border: `1px solid ${theme.palette.primary.main}30`,
    color: isSelected ? 'white' : theme.palette.primary.main,
    fontWeight: 600,
    fontSize: '0.85rem',
    mt: 1,
    px: 2,
    py: 1,
    borderRadius: 5,
    transition: 'all 0.1s ease',
    cursor: 'pointer',
    '&:hover': {
      background: isSelected 
        ? theme.palette.primary.dark 
        : `linear-gradient(135deg, ${theme.palette.primary.main}25, ${theme.palette.secondary.main}25)`,
      boxShadow: `0 8px 25px ${theme.palette.primary.main}30`
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
          zIndex: 1100,
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
                {/* Toxicity Study Section with Background */}
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
            {/* Hero Image Section */}
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
                src="/assets/images/landing/pricing/toxicity study.jpg"
                alt="Toxicity Study"
                key="toxicity-hero-image"
                loading="eager"
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center center',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.02)'
                  }
                }}
              />

              {/* Floating Elements */}
              <Box sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 2,
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
                animation: 'float 4.5s ease-in-out infinite',
                animationDelay: '1.5s',
                zIndex: 2
              }} />

            </Box>

            {/* Centered Header */}
            <Box sx={{ 
              textAlign: 'center',
              mb: { xs: 2, sm: 3, md: 4 },
              animation: 'fadeInUp 0.8s ease-out 0.2s both'
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                <IconButton 
                  onClick={() => router.push('/')}
                  sx={{ 
                    mr: 2,
                    color: theme.palette.primary.main,
                    '&:hover': {
                      backgroundColor: 'rgba(25, 118, 210, 0.1)',
                    }
                  }}
                >
                  {/* <ArrowBackIcon /> */}
                </IconButton>
                <Typography 
                  variant="h1" 
                  component="h1" 
                  key="toxicity-title"
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
                  Toxicity Study
                </Typography>
              </Box>
            </Box>

                    {/* Category Chips */}
            <Box sx={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: 1, 
              mb: 3,
              justifyContent: 'center',
              animation: 'fadeInUp 0.8s ease-out 0.4s both'
            }}>
              {categories.map((category, index) => (
                <Chip
                  key={index}
                  label={category}
                  onClick={() => handleCategoryChange(index)}
                  sx={getChipStyles(index, categoryTab === index)}
                />
              ))}
            </Box>

                  {/* Content Panels */}
            <Box sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: 'center',
              alignItems: 'center',
              gap: { xs: 2, md: 3 },
              mt: 6,
              width: '100%'
            }}>
              {/* Left Panel - Product Details */}
              <ProductDetailsCard
                key={currentCategory}
                category={currentCategory}
                sampleSolvent={sampleSolvent}
                application={application}
                numSamples={numSamples}
                customSampleForm={customSampleForm}
                customSampleSolvent={customSampleSolvent}
                customApplication={customApplication}
                expandedAccordion={expandedAccordion}
                onSampleFormChange={handleSampleFormChange}
                onSampleSolventChange={handleSampleSolventChange}
                onApplicationChange={handleApplicationChange}
                onNumSamplesChange={handleNumSamplesChange}
                onCustomSampleFormChange={setCustomSampleForm}
                onCustomSampleSolventChange={setCustomSampleSolvent}
                onCustomApplicationChange={setCustomApplication}
                onAccordionChange={(section: string | false) => {
                  setExpandedAccordion(section);
                  
                  // Also update activeSection based on the expanded accordion
                  if (section === 'sample-form') {
                    setActiveSection('sampleForm');
                    console.log('🔄 Accordion expanded: sample-form, setting activeSection to sampleForm');
                  } else if (section === 'sample-solvent') {
                    setActiveSection('sampleSolvent');
                    console.log('🔄 Accordion expanded: sample-solvent, setting activeSection to sampleSolvent');
                  } else if (section === 'application') {
                    setActiveSection('application');
                    console.log('🔄 Accordion expanded: application, setting activeSection to application');
                  }
                  
                  // Force immediate update of currentSectionGuidelines based on new activeSection
                  setTimeout(() => {
                    let guidelinesToShow: string[] = [];
                    if (section === 'sample-form') {
                      guidelinesToShow = sampleFormGuidelines;
                    } else if (section === 'sample-solvent') {
                      guidelinesToShow = sampleSolventGuidelines;
                    } else if (section === 'application') {
                      guidelinesToShow = applicationGuidelines;
                    }
                    
                    console.log('🔄 Accordion change - updating currentSectionGuidelines to:', guidelinesToShow);
                    setCurrentSectionGuidelines(guidelinesToShow);
                    
                    // Force re-render
                    setForceUpdate(prev => prev + 1);
                    setRightSideKey(prev => prev + 1);
                  }, 0);
                }}
                onClearAll={handleClearAllProductDetails}
                selectedSampleForms={selectedSampleForms}
                selectedSampleSolvents={selectedSampleSolvents}
                selectedApplications={selectedApplications}
                onSampleFormSelection={handleSampleFormSelection}
                onSampleSolventSelection={handleSampleSolventSelection}
                onApplicationSelection={handleApplicationSelection}
              />

                        {/* Right Panel - Applicable Guidelines */}
              <ApplicableGuidelinesCard
                key={`guidelines-${activeSection}-${isEditMode}-${rightSideKey}`}
                category={currentCategory}
                selectedGuidelines={(() => {
                  console.log('🔄 ApplicableGuidelinesCard receiving props:', {
                    activeSection,
                    currentSectionGuidelines,
                    rightSideKey,
                    isEditMode
                  });
                  return currentSectionGuidelines;
                })()}
                selectAll={(() => {
                  // Set selectAll based on the active section
                  if (activeSection === 'sampleForm') {
                    return sampleFormGuidelines.length === getGuidelinesForCategory(currentCategory).length;
                  } else if (activeSection === 'sampleSolvent') {
                    return sampleSolventGuidelines.length === getGuidelinesForCategory(currentCategory).length;
                  } else if (activeSection === 'application') {
                    return applicationGuidelines.length === getGuidelinesForCategory(currentCategory).length;
                  }
                  return selectAll;
                })()}
                onGuidelineToggle={handleGuidelineToggle}
                onSelectAll={handleSelectAll}
                onGuidelineClick={handleGuidelineClick}
                onAddToOrder={handleAddToOrder}
                onClearAll={handleClearAllGuidelines}
                onResetCards={resetForm}
                isEditMode={isEditMode}
                isAddToCartEnabled={isAddToCartEnabled()}
                selectedSampleForms={selectedSampleForms}
                selectedSampleSolvents={selectedSampleSolvents}
                selectedApplications={selectedApplications}
                customSampleForm={customSampleForm}
                customSampleSolvent={customSampleSolvent}
                customApplication={customApplication}
              />
                      </Box>
                    </Container>
                  </Box>
                </Box>

                {/* Fixed Footer */}
                <Box
                  sx={{
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    zIndex: 1100,
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <FooterSection />
                </Box>

                {/* Notification Popup */}
      <NotificationPopup
        isVisible={showNotification}
        onViewOrderSummary={handleViewOrderSummary}
        onContinueShopping={handleContinueShopping}
        onClose={handleCloseNotification}
        isEditMode={isEditNotification}
        cartCount={cartItems.length}
      />

      {/* Order Summary Modal */}
      <OrderSummaryModal
        isOpen={showOrderSummary}
        onClose={handleCloseOrderSummary}
        onNext={isFromCartFlow ? handleNextStep : handleAddToCartFromOrderSummary}
        onGenerateQuotation={handleGenerateQuotation}
        category={isCheckoutMode ? 'Multiple Categories' : (currentCartItem ? currentCartItem.category : currentCategory)}
        sampleForm={isCheckoutMode ? 'Multiple Forms' : (isEditMode ? getSelectedValues().sampleForm : (currentCartItem ? currentCartItem.sampleForm : getSelectedValues().sampleForm))}
        sampleSolvent={isCheckoutMode ? 'Multiple Solvents' : (isEditMode ? getSelectedValues().sampleSolvent : (currentCartItem ? currentCartItem.sampleSolvent : getSelectedValues().sampleSolvent))}
        application={isCheckoutMode ? 'Multiple Applications' : (isEditMode ? getSelectedValues().application : (currentCartItem ? currentCartItem.application : getSelectedValues().application))}
        numSamples={isCheckoutMode ? (tempCartItems.length > 0 ? tempCartItems : cartItems).reduce((sum, item) => sum + item.numSamples, 0) : (isEditMode ? numSamples : (currentCartItem ? currentCartItem.numSamples : numSamples))}
        selectedGuidelines={(() => {
          const guidelines = isCheckoutMode ? (tempCartItems.length > 0 ? tempCartItems : cartItems).flatMap(item => item.selectedGuidelines) : (isEditMode ? selectedGuidelines : (currentCartItem ? cartFlowGuidelines : selectedGuidelines));
          console.log('OrderSummaryModal selectedGuidelines prop:', guidelines);
          return guidelines;
        })()}
        expandedOrderAccordion={expandedOrderAccordion}
        onNumSamplesChange={handleNumSamplesChange}
        onOrderAccordionChange={handleOrderAccordionChange}
        onRemoveGuideline={handleRemoveGuideline}
        isCheckoutMode={isCheckoutMode}
        cartItems={isCheckoutMode ? (tempCartItems.length > 0 ? tempCartItems : cartItems) : (isEditMode ? [{
          ...currentCartItem,
          sampleForm: getSelectedValues().sampleForm,
          sampleSolvent: getSelectedValues().sampleSolvent,
          application: getSelectedValues().application,
          numSamples: numSamples,
          selectedGuidelines: selectedGuidelines,
          sampleFormGuidelines: sampleFormGuidelines,
          sampleSolventGuidelines: sampleSolventGuidelines,
          applicationGuidelines: applicationGuidelines,
          customSampleForm: customSampleForm,
          customSampleSolvent: customSampleSolvent,
          customApplication: customApplication
        }] : (currentCartItem ? [{
          ...currentCartItem,
          selectedGuidelines: cartFlowGuidelines
        }] : []))}
        onEditOrder={handleEditOrder}
        showAddToCartButton={!isFromCartFlow}
        initialSampleDescription={(() => {
          const desc = currentCartItem ? currentCartItem.sampleDescription || '' : '';
          console.log('🔄 Passing initialSampleDescription to OrderSummaryModal:', desc);
          console.log('🔄 currentCartItem:', currentCartItem);
          return desc;
        })()}
        sampleFormGuidelines={(() => {
          const guidelines = isCheckoutMode ? [] : sampleFormGuidelines;
          console.log('🔍 Passing sampleFormGuidelines to OrderSummaryModal:', guidelines);
          return guidelines;
        })()}
        sampleSolventGuidelines={(() => {
          const guidelines = isCheckoutMode ? [] : sampleSolventGuidelines;
          console.log('🔍 Passing sampleSolventGuidelines to OrderSummaryModal:', guidelines);
          return guidelines;
        })()}
        applicationGuidelines={(() => {
          const guidelines = isCheckoutMode ? [] : applicationGuidelines;
          console.log('🔍 Passing applicationGuidelines to OrderSummaryModal:', guidelines);
          return guidelines;
        })()}
      />

      {/* Guideline Detail Modal */}
      <GuidelineDetailModal
        isOpen={showGuidelineModal}
        onClose={handleCloseGuidelineModal}
        selectedGuideline={selectedGuideline}
        category={currentCategory}
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

      {/* Cart Customer Details Modal */}
      <CustomerDetailsModal
        isOpen={showCartCustomerDetails}
        onClose={handleCloseCartCustomerDetails}
        onBack={handleCartBackStep}
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
      {(() => {
        // Prepare cart items with properly combined guidelines for checkout mode
        let processedCartItems = [];
        let processedSelectedGuidelines = [];
        
        if (isCheckoutMode && tempCartItems.length > 0) {
          // Process tempCartItems to ensure all guidelines are included
          processedCartItems = tempCartItems.map(item => {
            // Combine all guideline arrays into selectedGuidelines
            const allGuidelines = [
              ...(item.sampleFormGuidelines || []),
              ...(item.sampleSolventGuidelines || []),
              ...(item.applicationGuidelines || []),
              ...(item.selectedGuidelines || [])
            ];
            
            // Remove duplicates
            const uniqueGuidelines = [...new Set(allGuidelines)];
            
            return {
              ...item,
              selectedGuidelines: uniqueGuidelines
            };
          });
          
          // Flatten all guidelines for selectedGuidelines prop
          processedSelectedGuidelines = processedCartItems.flatMap(item => item.selectedGuidelines);
          
          console.log('🔄 Processed cart items with combined guidelines:', processedCartItems);
          console.log('🔄 Total combined guidelines count:', processedSelectedGuidelines.length);
        } else if (isCheckoutMode && cartItems.length > 0) {
          // Fallback to cartItems if tempCartItems is empty
          processedCartItems = cartItems.map(item => {
            const allGuidelines = [
              ...(item.sampleFormGuidelines || []),
              ...(item.sampleSolventGuidelines || []),
              ...(item.applicationGuidelines || []),
              ...(item.selectedGuidelines || [])
            ];
            const uniqueGuidelines = [...new Set(allGuidelines)];
            return {
              ...item,
              selectedGuidelines: uniqueGuidelines
            };
          });
          processedSelectedGuidelines = processedCartItems.flatMap(item => item.selectedGuidelines);
        } else {
          // Single item mode
          processedCartItems = currentCartItem && isFromCartFlow ? [{
            ...currentCartItem,
            selectedGuidelines: cartFlowGuidelines
          }] : [];
          processedSelectedGuidelines = isFromCartFlow ? cartFlowGuidelines : [];
        }
        
        const modalProps = {
          isOpen: showQuotation,
          onClose: handleCloseQuotation,
          category: isCheckoutMode ? 'Multiple Categories' : (currentCartItem ? currentCartItem.category : 'Multiple Categories'),
          sampleForm: isCheckoutMode ? (processedCartItems.length > 0 ? processedCartItems.map(item => item.sampleForm).join(', ') : 'Multiple Forms') : 'Multiple Forms',
          sampleSolvent: isCheckoutMode ? (processedCartItems.length > 0 ? processedCartItems.map(item => item.sampleSolvent).join(', ') : 'Multiple Solvents') : 'Multiple Solvents',
          application: isCheckoutMode ? (processedCartItems.length > 0 ? processedCartItems.map(item => item.application).join(', ') : 'Multiple Applications') : 'Multiple Applications',
          numSamples: isCheckoutMode ? processedCartItems.reduce((sum, item) => sum + item.numSamples, 0) : (currentCartItem && isFromCartFlow ? currentCartItem.numSamples : 0),
          selectedGuidelines: processedSelectedGuidelines,
          customerName,
          customerEmail,
          customerPhone,
          customerCompany,
          customerCountry,
          customSampleForm,
          customSampleSolvent,
          customApplication,
          isCheckoutMode,
          cartItems: processedCartItems
        };
        
        console.log('🔄 QuotationGenerationModal props:', modalProps);
        console.log('🔄 QuotationGenerationModal cartItems:', modalProps.cartItems);
        console.log('🔄 QuotationGenerationModal selectedGuidelines:', modalProps.selectedGuidelines);
        console.log('🔄 QuotationGenerationModal total guidelines count:', modalProps.selectedGuidelines.length);
        
        return <QuotationGenerationModal {...modalProps} />;
      })()}

      {/* Cart Modal is handled by AppBar component */}

              </Box>
            );
          }

// Wrapper component to handle client-side mounting
export default function ToxicityStudyPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // or a loading spinner
  }

  return <ToxicityStudyPageContent />;
          }
