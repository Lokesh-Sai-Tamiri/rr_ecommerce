/**
 * @fileoverview User Context for managing user state
 * Provides user information across the application
 */

"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useUser as useClerkUser } from "@clerk/nextjs";

// Types
interface User {
  firstName: string;
  lastName: string;
  email: string;
  contactNumber?: string;
  country?: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoggedIn: boolean;
  login: (userData: User) => void;
  logout: () => void;
  getUserByEmail: (email: string) => User | null;
}

// Create context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider component
interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const { isSignedIn, user: clerkUser, isLoaded } = useClerkUser();

  const login = (userData: User) => {
    setUser(userData);
    
    // Save to localStorage for persistence
    localStorage.setItem('user', JSON.stringify(userData));
    
    // Also save to a users database in localStorage for email-based retrieval
    const existingUsers = JSON.parse(localStorage.getItem('users') || '{}');
    existingUsers[userData.email] = userData;
    localStorage.setItem('users', JSON.stringify(existingUsers));
  };

  const logout = () => {
    setUser(null);
    
    // Remove current user from localStorage but keep users database
    localStorage.removeItem('user');
  };

  const getUserByEmail = (email: string): User | null => {
    const existingUsers = JSON.parse(localStorage.getItem('users') || '{}');
    const foundUser = existingUsers[email] || null;
    return foundUser;
  };

  // Load user from localStorage on mount
  React.useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
      } catch (error) {
        localStorage.removeItem('user');
      }
    }
  }, []);

  // Automatically fetch user data from Clerk metadata when user signs in
  React.useEffect(() => {
    // Only auto-login if Clerk is actually signed in AND we don't have a user
    // Add a small delay to prevent race conditions during logout
    if (isLoaded && isSignedIn && clerkUser && !user) {
      // Use a timeout to prevent immediate auto-login during logout
      const timeoutId = setTimeout(() => {
        // Double-check that Clerk is still signed in (prevents race condition during logout)
        if (isSignedIn && clerkUser && !user) {
          const metadata = clerkUser.unsafeMetadata as any;
          const email = clerkUser.emailAddresses[0]?.emailAddress;
          
          if (metadata && metadata.firstName && email) {
            const userData: User = {
              firstName: metadata.firstName || "",
              lastName: metadata.lastName || "",
              email: email,
              contactNumber: metadata.phoneNumber || "",
              country: metadata.country || "",
            };
            
            // Set user data from Clerk metadata
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
            
            // Also save to users database for email-based retrieval
            const existingUsers = JSON.parse(localStorage.getItem('users') || '{}');
            existingUsers[email] = userData;
            localStorage.setItem('users', JSON.stringify(existingUsers));
          }
        }
      }, 200); // Small delay to allow logout to complete

      return () => clearTimeout(timeoutId);
    }
  }, [isLoaded, isSignedIn, clerkUser, user]);

  // Automatically clear UserContext when Clerk signs out
  React.useEffect(() => {
    if (!isSignedIn && user) {
      setUser(null);
      localStorage.removeItem('user');
    }
  }, [isSignedIn, user]);

  const value: UserContextType = {
    user,
    setUser,
    isLoggedIn: !!user,
    login,
    logout,
    getUserByEmail,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

// Custom hook to use the user context
export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
