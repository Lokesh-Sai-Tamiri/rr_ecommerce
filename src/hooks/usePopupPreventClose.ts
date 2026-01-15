/**
 * Custom hook to prevent popups from closing when touching outside
 * This hook provides a custom onClose handler that prevents closing on backdrop clicks
 */

import { useCallback } from 'react';

interface UsePopupPreventCloseOptions {
  /**
   * Whether to prevent closing on outside click/touch
   * @default true
   */
  preventOutsideClose?: boolean;
  
  /**
   * Whether to prevent closing on escape key
   * @default false
   */
  preventEscapeClose?: boolean;
  
  /**
   * Custom close handler to call when close is allowed
   */
  onClose: () => void;
}

interface UsePopupPreventCloseReturn {
  /**
   * Handler for Dialog onClose prop that prevents outside clicks
   */
  handleDialogClose: (event: {}, reason: string) => void;
  
  /**
   * Handler for backdrop click events
   */
  handleBackdropClick: (event: React.MouseEvent<HTMLDivElement>) => void;
  
  /**
   * Handler for escape key events
   */
  handleEscapeKey: (event: KeyboardEvent) => void;
}

export const usePopupPreventClose = ({
  preventOutsideClose = true,
  preventEscapeClose = false,
  onClose,
}: UsePopupPreventCloseOptions): UsePopupPreventCloseReturn => {
  
  /**
   * Handle Dialog onClose prop
   * Prevents closing when clicking outside if preventOutsideClose is true
   * Prevents closing when pressing escape if preventEscapeClose is true
   */
  const handleDialogClose = useCallback((event: {}, reason: string) => {
    // Prevent closing on backdrop click
    if (reason === 'backdropClick' && preventOutsideClose) {
      console.log('🚫 Popup close prevented: backdrop click blocked');
      return;
    }
    
    // Prevent closing on escape key
    if (reason === 'escapeKeyDown' && preventEscapeClose) {
      console.log('🚫 Popup close prevented: escape key blocked');
      return;
    }
    
    // Allow closing for other reasons (like explicit close button clicks)
    console.log('✅ Popup closing allowed:', reason);
    onClose();
  }, [preventOutsideClose, preventEscapeClose, onClose]);

  /**
   * Handle backdrop click events directly
   * Useful for custom backdrop implementations
   */
  const handleBackdropClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (preventOutsideClose) {
      console.log('🚫 Backdrop click prevented');
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    onClose();
  }, [preventOutsideClose, onClose]);

  /**
   * Handle escape key events
   * Useful for custom keyboard handling
   */
  const handleEscapeKey = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape' && preventEscapeClose) {
      console.log('🚫 Escape key prevented');
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    if (event.key === 'Escape' && !preventEscapeClose) {
      onClose();
    }
  }, [preventEscapeClose, onClose]);

  return {
    handleDialogClose,
    handleBackdropClick,
    handleEscapeKey,
  };
};

export default usePopupPreventClose;
