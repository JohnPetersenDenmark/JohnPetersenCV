import { createContext, useContext, useState } from 'react';


type FlowResult = 'success' | 'cancel' | null;
export type AppFlow =
    | 'NONE' 
    | 'IMPORT_APPLICATION'
    | 'EDIT_APPLICATION'
    | 'REORDER_APPLICATION'
    | 'SAVE_APPLICATION'
    | 'APPLICATION_TOPDF'
    | 'APPLICATION_BACK'

interface NavigationFlowContextType {
    flow: AppFlow;
    setFlow: (flow: AppFlow) => void;
    flowResult: FlowResult;
    setFlowResult: (value: FlowResult) => void;
}

const NavigationFlowContext =
    createContext<NavigationFlowContextType | undefined>(undefined);

export const NavigationFlowProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [flow, setFlow] = useState<AppFlow>('NONE');
    const [flowResult, setFlowResult] = useState<FlowResult>(null);

    return (
        <NavigationFlowContext.Provider value={{ flow, setFlow, flowResult, setFlowResult }}>
            {children}
        </NavigationFlowContext.Provider>
    );
};

export const useNavigationFlow = () => {
    const ctx = useContext(NavigationFlowContext);
    if (!ctx) {
        throw new Error('useNavigationFlow must be used within NavigationFlowProvider');
    }
    return ctx;
};
