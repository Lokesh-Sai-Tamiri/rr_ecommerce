import { useState } from 'react';
import { getPortalApiUrl, API_ENDPOINTS } from '../utils/apiConfig';

interface UseOTPReturn {
  otpCode: string;
  isOtpVerified: boolean;
  showOTPModal: boolean;
  otpMessage: string | null;
  otpMessageType: 'success' | 'error' | null;
  generateOTP: () => string;
  handleSendOTP: (email: string, validateFields: () => boolean, customerName?: string) => Promise<void>;
  handleOTPVerify: (otpInput: string) => Promise<void>;
  handleOTPClose: () => void;
  handleEmailEdit: () => void;
  resetOTP: () => void;
}

export const useOTP = (): UseOTPReturn => {
  const [otpCode, setOtpCode] = useState('');
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [otpMessage, setOtpMessage] = useState<string | null>(null);
  const [otpMessageType, setOtpMessageType] = useState<'success' | 'error' | null>(null);

  const generateOTP = () => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setOtpCode(otp);
    return otp;
  };

  const handleSendOTP = async (email: string, validateFields: () => boolean, customerName?: string) => {
    if (!validateFields()) return;

    const otp = generateOTP();
    console.log(`OTP sent to ${email}: ${otp}`);

    // Clear any previous messages
    setOtpMessage(null);
    setOtpMessageType(null);

    // Show OTP modal immediately
    setShowOTPModal(true);

    try {
      // Send OTP email via API
      const response = await fetch(getPortalApiUrl(API_ENDPOINTS.otp), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          otpCode: otp,
          customerName: customerName || '',
        }),
      });

      const result = await response.json();

      if (result.success) {
        console.log('OTP email sent successfully:', result.data);
      } else {
        console.error('Failed to send OTP email:', result.message);
        throw new Error(result.message || 'Failed to send OTP email');
      }
    } catch (error) {
      console.error('Error sending OTP email:', error);
      // Modal is already shown, just throw the error
      throw error;
    }
  };

  const handleOTPVerify = async (otpInput: string) => {
    if (otpInput === otpCode) {
      setIsOtpVerified(true);
      setOtpMessage('OTP Verified Successfully');
      setOtpMessageType('success');
      // Close modal after a short delay to show success message
      setTimeout(() => {
        setShowOTPModal(false);
      }, 1500);
    } else {
      setOtpMessage('Invalid OTP');
      setOtpMessageType('error');
      throw new Error('Invalid OTP');
    }
  };

  const handleOTPClose = () => {
    setShowOTPModal(false);
    setOtpMessage(null);
    setOtpMessageType(null);
  };

  const handleEmailEdit = () => {
    setShowOTPModal(false);
    setIsOtpVerified(false);
    setOtpMessage(null);
    setOtpMessageType(null);
  };

  const resetOTP = () => {
    setOtpCode('');
    setIsOtpVerified(false);
    setShowOTPModal(false);
    setOtpMessage(null);
    setOtpMessageType(null);
  };

  return {
    otpCode,
    isOtpVerified,
    showOTPModal,
    otpMessage,
    otpMessageType,
    generateOTP,
    handleSendOTP,
    handleOTPVerify,
    handleOTPClose,
    handleEmailEdit,
    resetOTP,
  };
};
