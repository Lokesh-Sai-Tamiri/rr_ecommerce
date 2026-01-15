"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CustomerModalContextType {
  isCustomerModalOpen: boolean;
  setCustomerModalOpen: (isOpen: boolean) => void;
}

const CustomerModalContext = createContext<CustomerModalContextType | undefined>(undefined);

export function CustomerModalProvider({ children }: { children: ReactNode }) {
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);

  const setCustomerModalOpen = (isOpen: boolean) => {
    setIsCustomerModalOpen(isOpen);
  };

  return (
    <CustomerModalContext.Provider value={{ isCustomerModalOpen, setCustomerModalOpen }}>
      {children}
    </CustomerModalContext.Provider>
  );
}

export function useCustomerModal() {
  const context = useContext(CustomerModalContext);
  if (context === undefined) {
    throw new Error('useCustomerModal must be used within a CustomerModalProvider');
  }
  return context;
}
