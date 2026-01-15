// Test file to debug quotation configuration
import { QUOTATION_CONFIG, getQuotationMode, getVisibleSteps, getButtonText } from './quotationConfig';

console.log('🔧 CONFIGURATION TEST:');
console.log('GENERATE_QUOTATION_MODAL:', QUOTATION_CONFIG.GENERATE_QUOTATION_MODAL);
console.log('Mode:', getQuotationMode());
console.log('Visible steps count:', getVisibleSteps().length);
console.log('Visible steps:', getVisibleSteps().map(s => s.title));
console.log('Button text:', getButtonText());

// Test both modes
console.log('\n🔧 TESTING BOTH MODES:');

// Manually set to false
const configFalse = { ...QUOTATION_CONFIG, GENERATE_QUOTATION_MODAL: false };
console.log('When false - Mode should be "request"');

// Manually set to true  
const configTrue = { ...QUOTATION_CONFIG, GENERATE_QUOTATION_MODAL: true };
console.log('When true - Mode should be "generate"');