import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import MenuCardApplication, { MenuItem } from './MenuCardApplication';
import MenuCardCV from './MenuCardCV';
import { theme } from '../../Utilities/myconfig';
import { useNavigationFlow } from './NavigationFlowContext';

const MainLayout: React.FC = () => {
    const navigate = useNavigate();
    const { flow, setFlow, flowResult, setFlowResult } = useNavigationFlow();

    const base_url = process.env.REACT_APP_BASE_URL as string;

    const DefaultMenuItems: MenuItem[] = [
        { id: 1, title: "Ny ansøgning", action: "/editapp", icon: "✉️", level: 1, parentId: 1 },
        { id: 2, title: "Hent ansøgning", action: "/getapplication", icon: "✉️", level: 1, parentId: 2 }
    ];

    const allSubMenuItems: MenuItem[] = [
        { id: 100, title: "Arranger", action: "reorderapp", icon: "✉️", level: 2, parentId: 1 },
        { id: 200, title: "Gem ansøgning", action: "", icon: "✉️", level: 2, parentId: 1 },
        { id: 300, title: "To PDF", action: "", icon: "✉️", level: 2, parentId: 1 },
        { id: 400, title: "Tilbage", action: "/", icon: "✉️", level: 2, parentId: 1 },
        { id: 500, title: "Tilbage", action: "/", icon: "✉️", level: 2, parentId: 2 }
    ];

    const [menuPoints, setMenuPoints] = useState<MenuItem[]>(DefaultMenuItems);
    const [selectedMenuPoint, setSelectedMenuPoint] = useState<MenuItem | null>(null);

    // Set CSS theme variables
    useEffect(() => {
        const root = document.documentElement;
        root.style.setProperty("--primary-background-color", theme.primaryBackGroundColor);
        root.style.setProperty("--secondary-background-color", theme.secondaryBackgroundColor ?? theme.primaryBackGroundColor);
        root.style.setProperty("--third-background-color", theme.thirdGreyBackgroundColor ?? theme.thirdGreyBackgroundColor);
        root.style.setProperty("--addto-basket-color", theme.addToBasketHoverColor ?? theme.addToBasketHoverColor);
        root.style.setProperty("--primary-text-color", theme.primaryTextColor);
        root.style.setProperty("--secondary-text-color", theme.secondaryTextColor ?? theme.primaryTextColor);
        root.style.setProperty("--hover-menuactions-color", theme.hoverMenuActions ?? theme.hoverMenuActions);
    }, []);

    // React to child component flow results
    useEffect(() => {
        if (!flowResult) return;

        switch (flow) {
            case 'IMPORT_APPLICATION':
                if (flowResult === 'success') navigate(`${base_url}editapp`);
                else navigate(base_url);
                break;
            case 'EDIT_APPLICATION':
                navigate(`${base_url}editapp`);
                break;
            case 'REORDER_APPLICATION':
                navigate(`${base_url}reorderapp`);  
                break;
        }

        // Reset flow after handling
        setFlowResult(null);
        setFlow('NONE');
    }, [flowResult]);

    // Handle menu item clicks
    const handleSelectedMenuPoint = (menuItem: MenuItem) => {
        setSelectedMenuPoint(menuItem);

        // BACK / RESET
        if (menuItem.action === "/") {
            setMenuPoints(DefaultMenuItems);
            navigate(-1);
            return;
        }

        // FLOW-BASED NAVIGATION
        switch (menuItem.action) {
            case "/getapplication":
                setFlow('IMPORT_APPLICATION');
                setMenuPoints(allSubMenuItems.filter(m => m.parentId === menuItem.id && m.level === 2));
                navigate('/getapplication');
                break;
            case "/editapp":
                setFlow('EDIT_APPLICATION');
                setMenuPoints(allSubMenuItems.filter(m => m.parentId === menuItem.id && m.level === 2));
                navigate('/editapp');
                break;
            case "/reorderapp":
                setFlow('REORDER_APPLICATION');
                navigate('/reorderapp');
                break;
            default:
                navigate(menuItem.action);
                break;
        }
    };

    return (
        <>
            {flow !== 'NONE' ? (
                <>
                    <div className='m-24 fixed left-0'>
                        <MenuCardApplication
                            onChange={handleSelectedMenuPoint}
                            menuItems={menuPoints}
                        />
                    </div>
                    <div className='m-24 fixed left-0 top-[450px]'>
                        <MenuCardCV />
                    </div>
                </>
            ) : (
                <>
                    <div className='m-24'>
                        <MenuCardApplication
                            onChange={handleSelectedMenuPoint}
                            menuItems={menuPoints}
                        />
                    </div>
                    <div className='m-24'>
                        <MenuCardCV />
                    </div>
                </>
            )}

            {/* Child pages render here */}
            <div className="app_content">
                <Outlet />
            </div>
        </>
    );
};

export default MainLayout;
