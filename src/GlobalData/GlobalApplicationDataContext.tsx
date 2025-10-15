import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ApplicationData } from '../Classes/ClassesApplicationData';

import {
  currentApplicationData as globalAppData,
  setCurrentApplicationData as setGlobalAppData,
} from './GlobalApplicationData';

// 👇 Define what the context provides
export interface ApplicationDataContextType {
  currentApplicationData: ApplicationData;
  setCurrentApplicationData: React.Dispatch<React.SetStateAction<ApplicationData>>;
}

// 👇 Create context with a safe default (null for now, handled in hook)
const ApplicationDataContext = createContext<ApplicationDataContextType | null>(null);

interface ProviderProps {
  children: ReactNode;
}

/**
 * Provider wraps your app and makes the global ApplicationData reactive
 */
export function ApplicationDataProvider({ children }: ProviderProps) {
  const [currentApplicationData, setCurrentApplicationData] = useState<ApplicationData>(globalAppData);

  // Keep legacy global variable in sync
  useEffect(() => {
    setGlobalAppData(currentApplicationData);
  }, [currentApplicationData]);

  return (
    <ApplicationDataContext.Provider value={{ currentApplicationData, setCurrentApplicationData }}>
      {children}
    </ApplicationDataContext.Provider>
  );
}

/**
 * Custom hook for consuming the context safely
 */
export function useApplicationData(): ApplicationDataContextType {
  const context = useContext(ApplicationDataContext);
  if (!context) {
    throw new Error('useApplicationData must be used within an ApplicationDataProvider');
  }
  return context;
}
