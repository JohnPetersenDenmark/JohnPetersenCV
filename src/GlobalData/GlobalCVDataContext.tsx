import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CVData } from '../Classes/ClassesCVData';

import {
  currenrCVData as globalCVData,
  setCurrentCVData as setGlobalCVData,
} from './GlobalCVData';

// 👇 Define what the context provides
export interface CVDataContextType {
  currenrCVData: CVData;
  setCurrentCVData: React.Dispatch<React.SetStateAction<CVData>>;
}

// 👇 Create context with a safe default (null for now, handled in hook)
const CVDataContext = createContext<CVDataContextType | null>(null);

interface ProviderProps {
  children: ReactNode;
}

/**
 * Provider wraps your app and makes the global CVData reactive
 */
export function CVDataProvider({ children }: ProviderProps) {
  const [currenrCVData, setCurrentCVData] = useState<CVData>(globalCVData);

  // Keep legacy global variable in sync
  useEffect(() => {
    setGlobalCVData(currenrCVData);
  }, [currenrCVData]);

  return (
    <CVDataContext.Provider value={{ currenrCVData, setCurrentCVData }}>
      {children}
    </CVDataContext.Provider>
  );
}

/**
 * Custom hook for consuming the context safely
 */
export function useCVData(): CVDataContextType {
  const context = useContext(CVDataContext);
  if (!context) {
    throw new Error('useCVData() must be used within a CVDataProvider');
  }
  return context;
}
