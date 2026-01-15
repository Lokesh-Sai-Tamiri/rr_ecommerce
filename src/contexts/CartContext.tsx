/**
 * @fileoverview Cart context for global cart state management
 */

"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { useUser } from '@clerk/nextjs';
import { getPortalApiUrl, API_ENDPOINTS, portalApiGet, portalApiPost, portalApiPatch, portalApiDelete } from '../utils/apiConfig';

interface CartItem {
  id: string;
  configNo: string;
  studyType: string;
  price: number;
  numSamples: number;
  createdOn: string;
  validTill: string;
  description: string;
  category: string;
  sampleForm: string;
  sampleSolvent: string;
  application: string;
  selectedGuidelines: string[];
  sampleFormGuidelines?: string[];
  sampleSolventGuidelines?: string[];
  applicationGuidelines?: string[];
  selectedTherapeuticAreas?: string[];
  selectedMicroorganismType?: string;
  selectedMicroorganism?: string[];
  selectedStudies?: string[];
  image?: string;
}

interface CartContextType {
  cartItems: CartItem[];
  savedItems: CartItem[];
  loading: boolean;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateCartItems: (items: CartItem[]) => void;
  clearCart: () => void;
  saveForLater: (id: string) => void;
  addToOrder: (id: string) => void;
  removeFromSaved: (id: string) => void;
  cartCount: number;
  totalAmount: number;
  onGenerateQuotation?: (item: CartItem) => void;
  onViewFullDetails?: (item: CartItem) => void;
  onEditItem?: (item: CartItem) => void;
  onProceedToCheckout?: () => void;
  setNavigationHandlers: (handlers: { onGenerateQuotation?: (item: CartItem) => void; onViewFullDetails?: (item: CartItem) => void; onEditItem?: (item: CartItem) => void; onProceedToCheckout?: () => void }) => void;
  isCartModalOpen: boolean;
  openCartModal: () => void;
  closeCartModal: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const { user } = useUser();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [savedItems, setSavedItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [navigationHandlers, setNavigationHandlers] = useState<{
    onGenerateQuotation?: (item: CartItem) => void;
    onViewFullDetails?: (item: CartItem) => void;
    onEditItem?: (item: CartItem) => void;
    onProceedToCheckout?: () => void;
  }>({});
  const [isCartModalOpen, setIsCartModalOpen] = useState<boolean>(false);

  // Transform API cart item to CartItem format
  const transformApiItem = (apiItem: any): CartItem => {
    return {
      id: apiItem.id,
      configNo: apiItem.configNo || '',
      studyType: apiItem.studyType,
      price: apiItem.price || 0,
      numSamples: apiItem.numSamples,
      createdOn: apiItem.createdOn ? (typeof apiItem.createdOn === 'string' ? apiItem.createdOn : apiItem.createdOn.toISOString().split('T')[0]) : new Date().toISOString().split('T')[0],
      validTill: apiItem.validTill ? (typeof apiItem.validTill === 'string' ? apiItem.validTill : apiItem.validTill.toISOString().split('T')[0]) : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      description: apiItem.description || '',
      category: apiItem.category || '',
      sampleForm: apiItem.sampleForm || '',
      sampleSolvent: apiItem.sampleSolvent || '',
      application: apiItem.application || '',
      selectedGuidelines: apiItem.selectedGuidelines || [],
      sampleFormGuidelines: apiItem.sampleFormGuidelines || [],
      sampleSolventGuidelines: apiItem.sampleSolventGuidelines || [],
      applicationGuidelines: apiItem.applicationGuidelines || [],
      selectedTherapeuticAreas: apiItem.selectedTherapeuticAreas || [],
      selectedMicroorganismType: apiItem.selectedMicroorganismType,
      selectedMicroorganism: apiItem.selectedMicroorganism || [],
      selectedStudies: apiItem.selectedStudies || [],
      customMicroorganism: apiItem.customMicroorganism,
      customSampleForm: apiItem.customSampleForm,
      customSampleSolvent: apiItem.customSampleSolvent,
    };
  };

  // Fetch cart items from database
  const fetchCartItems = useCallback(async () => {
    if (!user?.id) {
      setCartItems([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await portalApiGet<any[]>(API_ENDPOINTS.cart.base, {
        userId: user.id,
        status: 'active',
      });
      
      const transformedItems = Array.isArray(response) ? response.map(transformApiItem) : [];
      setCartItems(transformedItems);
      console.log('✅ Cart items fetched from database:', transformedItems);
    } catch (error) {
      console.error('❌ Error fetching cart items:', error);
      // On error, keep existing cart items (don't clear them)
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  // Fetch cart items on mount and when user changes
  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  const addToCart = async (item: CartItem) => {
    console.log('CartContext addToCart called with:', item);
    
    if (!user?.id) {
      console.warn('⚠️ User not logged in, adding to local state only');
      setCartItems(prev => {
        const existingItemIndex = prev.findIndex(cartItem => cartItem.id === item.id);
        if (existingItemIndex !== -1) {
          const updatedItems = [...prev];
          updatedItems[existingItemIndex] = item;
          return updatedItems;
        }
        return [...prev, item];
      });
      return;
    }

    try {
      // Check if item already exists
      const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
      
      if (existingItem) {
        // Update existing item
        const updateUrl = `${API_ENDPOINTS.cart.base}/${item.id}?userId=${encodeURIComponent(user.id)}`;
        await portalApiPatch(updateUrl, {
          numSamples: item.numSamples,
          price: item.price,
          selectedGuidelines: item.selectedGuidelines,
          sampleFormGuidelines: item.sampleFormGuidelines,
          sampleSolventGuidelines: item.sampleSolventGuidelines,
          applicationGuidelines: item.applicationGuidelines,
          description: item.description,
        });
      } else {
        // Create new item
        await portalApiPost(API_ENDPOINTS.cart.base, {
          id: item.id,
          userId: user.id,
          configNo: item.configNo,
          studyType: item.studyType,
          category: item.category,
          sampleForm: item.sampleForm,
          sampleSolvent: item.sampleSolvent,
          application: item.application,
          numSamples: item.numSamples,
          selectedGuidelines: item.selectedGuidelines || [],
          sampleFormGuidelines: item.sampleFormGuidelines || [],
          sampleSolventGuidelines: item.sampleSolventGuidelines || [],
          applicationGuidelines: item.applicationGuidelines || [],
          selectedTherapeuticAreas: item.selectedTherapeuticAreas || [],
          selectedMicroorganismType: item.selectedMicroorganismType,
          selectedMicroorganism: item.selectedMicroorganism || [],
          customMicroorganism: item.customMicroorganism,
          selectedStudies: item.selectedStudies || [],
          customSampleForm: item.customSampleForm,
          customSampleSolvent: item.customSampleSolvent,
          price: item.price || 0,
          createdOn: item.createdOn || new Date().toISOString().split('T')[0],
          validTill: item.validTill || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          description: item.description || '',
        });
      }
      
      // Refresh cart items from database
      await fetchCartItems();
    } catch (error) {
      console.error('❌ Error adding item to cart:', error);
      // Fallback to local state update
      setCartItems(prev => {
        const existingItemIndex = prev.findIndex(cartItem => cartItem.id === item.id);
        if (existingItemIndex !== -1) {
          const updatedItems = [...prev];
          updatedItems[existingItemIndex] = item;
          return updatedItems;
        }
        return [...prev, item];
      });
    }
  };

  const removeFromCart = async (id: string) => {
    if (!user?.id) {
      setCartItems(prev => prev.filter(item => item.id !== id));
      return;
    }

    try {
      const deleteUrl = `${API_ENDPOINTS.cart.base}/${id}?userId=${encodeURIComponent(user.id)}`;
      await portalApiDelete(deleteUrl);
      // Refresh cart items from database
      await fetchCartItems();
    } catch (error) {
      console.error('❌ Error removing item from cart:', error);
      // Fallback to local state update
      setCartItems(prev => prev.filter(item => item.id !== id));
    }
  };

  const updateCartItems = async (items: CartItem[]) => {
    console.log('CartContext updateCartItems called with:', items);
    
    if (!user?.id) {
      setCartItems(items);
      return;
    }

    // For bulk updates, we'll sync each item individually
    // This is a simplified approach - in production, you might want a bulk update endpoint
    try {
      // First, fetch current items to see what needs to be added/removed/updated
      const currentItems = cartItems;
      const currentIds = new Set(currentItems.map(item => item.id));
      const newIds = new Set(items.map(item => item.id));

      // Remove items that are no longer in the list
      for (const currentItem of currentItems) {
        if (!newIds.has(currentItem.id)) {
          await removeFromCart(currentItem.id);
        }
      }

      // Add or update items
      for (const item of items) {
        if (currentIds.has(item.id)) {
          // Update existing item
          const updateUrl = `${API_ENDPOINTS.cart.base}/${item.id}?userId=${encodeURIComponent(user.id)}`;
          await portalApiPatch(updateUrl, {
            numSamples: item.numSamples,
            price: item.price,
            selectedGuidelines: item.selectedGuidelines,
            sampleFormGuidelines: item.sampleFormGuidelines,
            sampleSolventGuidelines: item.sampleSolventGuidelines,
            applicationGuidelines: item.applicationGuidelines,
            description: item.description,
          });
        } else {
          // Add new item
          await addToCart(item);
        }
      }

      // Refresh cart items from database
      await fetchCartItems();
    } catch (error) {
      console.error('❌ Error updating cart items:', error);
      // Fallback to local state update
      setCartItems(items);
    }
  };

  const clearCart = async () => {
    if (!user?.id) {
      setCartItems([]);
      return;
    }

    try {
      await portalApiPost(API_ENDPOINTS.cart.clear, {
        userId: user.id,
      });
      // Refresh cart items from database
      await fetchCartItems();
    } catch (error) {
      console.error('❌ Error clearing cart:', error);
      // Fallback to local state update
      setCartItems([]);
    }
  };

  const saveForLater = (id: string) => {
    const item = cartItems.find(item => item.id === id);
    if (item) {
      setSavedItems(prev => [...prev, item]);
      setCartItems(prev => prev.filter(item => item.id !== id));
    }
  };

  const addToOrder = (id: string) => {
    const item = savedItems.find(item => item.id === id);
    if (item) {
      setCartItems(prev => [...prev, item]);
      setSavedItems(prev => prev.filter(item => item.id !== id));
    }
  };

  const removeFromSaved = (id: string) => {
    setSavedItems(prev => prev.filter(item => item.id !== id));
  };

  const openCartModal = () => {
    setIsCartModalOpen(true);
  };

  const closeCartModal = () => {
    setIsCartModalOpen(false);
  };

  const cartCount = cartItems.length;
  const totalAmount = cartItems.reduce((sum, item) => sum + item.price, 0);

  const value: CartContextType = {
    cartItems,
    savedItems,
    loading,
    addToCart,
    removeFromCart,
    updateCartItems,
    clearCart,
    saveForLater,
    addToOrder,
    removeFromSaved,
    cartCount,
    totalAmount,
    onGenerateQuotation: navigationHandlers.onGenerateQuotation,
    onViewFullDetails: navigationHandlers.onViewFullDetails,
    onEditItem: navigationHandlers.onEditItem,
    onProceedToCheckout: navigationHandlers.onProceedToCheckout,
    setNavigationHandlers,
    isCartModalOpen,
    openCartModal,
    closeCartModal,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
