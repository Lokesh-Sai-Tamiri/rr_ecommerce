/**
 * @fileoverview Configuration constants for quotation functionality
 * This file controls the behavior of quotation generation across the application
 * Last updated: October 26, 2025
 */

/**
 * Configuration for quotation generation modal behavior
 * 
 * When GENERATE_QUOTATION_MODAL is true:
 * - Shows all 3 steps (Order Summary → Customer Details → Generate Quotation)
 * - Shows "Generate Quotation" button
 * - Modal displays full quotation with PDF preview
 * 
 * When GENERATE_QUOTATION_MODAL is false:
 * - Shows only first 2 steps (Order Summary → Customer Details)
 * - Shows "Request Quotation" button
 * - After successful submission, shows confirmation modal
 * - Clicking "My Quotations" navigates to quotations page
 */
export const QUOTATION_CONFIG = {
  // Set to true for full quotation generation, false for quotation request
  GENERATE_QUOTATION_MODAL: false, 
 
  MY_QUOTATIONS_PATH: "/my-quotations",
  
  REQUEST_SUCCESS_TITLE: "Request Submitted Successfully!",
  REQUEST_SUCCESS_MESSAGE: "Your quotation request has been successfully submitted. We'll get back to you soon.",

  GENERATE_BUTTON_TEXT: "Save Quotation",    
  REQUEST_BUTTON_TEXT: "Request Quotation",   
  STEP2_BUTTON_TEXT: "Generate Quotation",    
  MY_QUOTATIONS_BUTTON_TEXT: "My Quotations",
  
  STEPS: {
    ORDER_SUMMARY: {
      id: 1,
      title: "Order Summary",
      completed: true
    },
    CUSTOMER_DETAILS: {
      id: 2,
      title: "Customer Details", 
      completed: true
    },
    GENERATE_QUOTATION: {
      id: 3,
      title: "Generate Quotation",
      completed: false
    }
  }
} as const;

export type QuotationMode = 'generate' | 'request';


export const getQuotationMode = (): QuotationMode => {
  const result = QUOTATION_CONFIG.GENERATE_QUOTATION_MODAL ? 'generate' : 'request';
  console.log('🔧 getQuotationMode DEBUG:', {
    configValue: QUOTATION_CONFIG.GENERATE_QUOTATION_MODAL,
    result
  });
  return result;
};

/**
 * Get steps to display based on current mode
 */
export const getVisibleSteps = () => {
  // Hardcode for testing - should show only 2 steps when false
  const shouldShowAll3Steps = QUOTATION_CONFIG.GENERATE_QUOTATION_MODAL;
  const allSteps = Object.values(QUOTATION_CONFIG.STEPS);
  
  console.log('🔧 getVisibleSteps DEBUG:', {
    configValue: QUOTATION_CONFIG.GENERATE_QUOTATION_MODAL,
    shouldShowAll3Steps,
    allStepsCount: allSteps.length,
    allSteps: allSteps.map(s => s.title)
  });
  
  if (shouldShowAll3Steps) {
    console.log('🔧 Config is TRUE - Returning ALL 3 steps');
    return allSteps; 
  } else {
    console.log('🔧 Config is FALSE - Returning ONLY 2 steps');
    const first2Steps = allSteps.slice(0, 2);
    console.log('🔧 First 2 steps:', first2Steps.map(s => s.title));
    return first2Steps; 
  }
};

/**
 * Get button text based on current mode
 */
export const getButtonText = () => {
  const mode = getQuotationMode();
  return mode === 'generate' 
    ? QUOTATION_CONFIG.GENERATE_BUTTON_TEXT 
    : QUOTATION_CONFIG.REQUEST_BUTTON_TEXT;
};

/**
 * Get button text for step 2 (CustomerDetailsModal)
 */
export const getStep2ButtonText = () => {
  const mode = getQuotationMode();
  return mode === 'generate' 
    ? QUOTATION_CONFIG.STEP2_BUTTON_TEXT    // "Generate Quotation" 
    : QUOTATION_CONFIG.REQUEST_BUTTON_TEXT; // "Request Quotation"
};
