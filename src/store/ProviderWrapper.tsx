"use client";

import { ReactNode, useEffect } from "react";
import { usePathname } from 'next/navigation';

// map styles
import "mapbox-gl/dist/mapbox-gl.css";

// third party
import { Provider } from "react-redux";
import { ClerkProvider } from "@clerk/nextjs";
// import { PersistGate } from 'redux-persist/integration/react';

// project imports
import Locales from "ui-component/Locales";
import NavigationScroll from "layout/NavigationScroll";
// import RTLLayout from 'ui-component/RTLLayout';
import Snackbar from "ui-component/extended/Snackbar";
import Notistack from "ui-component/third-party/Notistack";

import ThemeCustomization from "themes";

// import { persister, store } from 'store';
import { store } from "store";
import { ConfigProvider } from "contexts/ConfigContext";
import { CartProvider } from "contexts/CartContext";
import { UserProvider } from "contexts/UserContext";
import { CustomerModalProvider } from "contexts/CustomerModalContext";

import { JWTProvider as AuthProvider } from "contexts/JWTContext";
// import { FirebaseProvider as AuthProvider } from '../contexts/FirebaseContext';
// import { Auth0Provider as AuthProvider } from '../contexts/Auth0Context';
// import { AWSCognitoProvider as AuthProvider } from 'contexts/AWSCognitoContext';
// import { SupabaseProvider as AuthProvider } from 'contexts/SupabaseContext';

// project imports - Chatbot
import Chatbot from "components/Chatbot";

// Conditional Chatbot Component
function ConditionalChatbot() {
  const pathname = usePathname();
  
  // Don't show chatbot on admin routes
  if (pathname?.startsWith('/admin')) {
    return null;
  }
  
  return <Chatbot />;
}

export default function ProviderWrapper({ children }: { children: ReactNode }) {
  const clerkPublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  
  // Log Clerk keys on page load/refresh
  useEffect(() => {
    console.log("🔑 ========== CLERK ENV KEYS ON PAGE LOAD/REFRESH ==========");
    console.log("🔑 NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:", clerkPublishableKey || "NOT SET");
    const clerkDomain = process.env.NEXT_PUBLIC_CLERK_DOMAIN;
    console.log("🔑 NEXT_PUBLIC_CLERK_DOMAIN:", clerkDomain || "NOT SET");
    console.log("⚠️ Note: CLERK_SECRET_KEY is server-side only and cannot be accessed from client-side code for security reasons");
    console.log("🔑 ========== CLERK ENV KEYS LOGGED ==========");
  }, []); // Run only once on mount
  
  // Debug: Log environment variable status in development
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    if (!clerkPublishableKey) {
      console.error('[ProviderWrapper] ❌ Clerk publishable key is missing!');
      console.error('[ProviderWrapper] Please ensure NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY is set in your .env file');
    } else {
      console.log('[ProviderWrapper] ✅ Clerk publishable key is configured');
    }
  }

  // Get domain from environment or use current hostname for dev
  const getDomain = () => {
    if (typeof window === 'undefined') return undefined;
    
    // Use explicit domain from env if set
    if (process.env.NEXT_PUBLIC_CLERK_DOMAIN) {
      return process.env.NEXT_PUBLIC_CLERK_DOMAIN;
    }
    
    // For dev environment, use current hostname
    if (process.env.NODE_ENV === 'development' && window.location.hostname !== 'localhost') {
      return window.location.hostname;
    }
    
    return undefined;
  };

  const domain = getDomain();

  if (!clerkPublishableKey) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        padding: '2rem',
        textAlign: 'center',
        backgroundColor: '#ffffff',
      }}>
        <h1 style={{ color: '#ef4444', marginBottom: '1rem' }}>
          ⚠️ Clerk Configuration Required
        </h1>
        <p style={{ color: '#6b7280', marginBottom: '0.5rem' }}>
          Clerk publishable key is not configured.
        </p>
        <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
          Please add <code style={{ backgroundColor: '#f3f4f6', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY</code> to your <code style={{ backgroundColor: '#f3f4f6', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>.env</code> or <code style={{ backgroundColor: '#f3f4f6', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>.env.local</code> file.
        </p>
        <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>
          <strong>Important:</strong> Restart your development server after adding/changing the key!
        </p>
      </div>
    );
  }

  return (
    <ClerkProvider
      publishableKey={clerkPublishableKey}
      domain={domain}
    >
      <Provider store={store}>
        {/* <PersistGate loading={null} persistor={persister}> */}
        <ConfigProvider>
          <UserProvider>
            <CustomerModalProvider>
              <ThemeCustomization>
                {/* <RTLLayout> */}
                <Locales>
                  <NavigationScroll>
                    <AuthProvider>
                      <CartProvider>
                        <Notistack>
                          <Snackbar />
                          {children}
                          <ConditionalChatbot />
                        </Notistack>
                      </CartProvider>
                    </AuthProvider>
                  </NavigationScroll>
                </Locales>
                {/* </RTLLayout> */}
              </ThemeCustomization>
            </CustomerModalProvider>
          </UserProvider>
        </ConfigProvider>
        {/* </PersistGate> */}
      </Provider>
    </ClerkProvider>
  );
}
