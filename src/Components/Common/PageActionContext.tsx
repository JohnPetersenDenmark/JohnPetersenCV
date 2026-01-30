// context/PageActionContext.tsx
import { createContext } from "react";

export type PageActionContextType = {
  action: string | null;
  setAction: React.Dispatch<React.SetStateAction<string | null>>;
};

export const PageActionContext =
  createContext<PageActionContextType | null>(null);
