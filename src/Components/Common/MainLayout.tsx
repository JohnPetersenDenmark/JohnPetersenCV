import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useApplicationData } from '../../GlobalData/GlobalApplicationDataContext';
import MenuCardApplication, { MenuItem } from './MenuCardApplication';
import MenuCardCV from './MenuCardCV';
import { theme } from '../../Utilities/myconfig';

// -------------------
// Flow ↔ Route maps
// -------------------
const flowToRoute: Record<string, string> = {
    IMPORT_APPLICATION: "/getapplication",
    EDIT_APPLICATION: "/editapp",
    REORDER_APPLICATION: "/reorderapp",
    SAVE_APPLICATION: "/saveapp",
};

const routeToFlow: Record<string, string> = {
    "/getapplication": "IMPORT_APPLICATION",
    "/editapp": "EDIT_APPLICATION",
    "/reorderapp": "REORDER_APPLICATION",
    "/saveapp": "SAVE_APPLICATION",
};

// -------------------
// Single Menu Config
// -------------------
const menuConfig: MenuItem[] = [
    // Top-level items
    { id: 1, title: "Ny ansøgning", action: "/editapp", icon: "✉️", level: 1, parentFlowId: 'NONE', flowId: 'EDIT_APPLICATION' },
    { id: 2, title: "Hent ansøgning", action: "/getapplication", icon: "✉️", level: 1, parentFlowId: 'NONE', flowId: 'IMPORT_APPLICATION' },

    // Submenu items
    { id: 100, title: "Arranger", action: "/reorderapp", icon: "✉️", level: 2, parentFlowId: 'EDIT_APPLICATION', flowId: 'REORDER_APPLICATION' },
    { id: 200, title: "Gem ansøgning", action: "/saveapp", icon: "✉️", level: 2, parentFlowId: 'EDIT_APPLICATION', flowId: 'SAVE_APPLICATION' },

    // Back button
    { id: 400, title: "Tilbage", action: "BACK", icon: "✉️", level: 2, parentFlowId: "", flowId: "APPLICATION_BACK" }
];

const MainLayout: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { currentApplicationData } = useApplicationData();

    const [menuPoints, setMenuPoints] = useState<MenuItem[]>([]);
    const [selectedMenuPoint, setSelectedMenuPoint] = useState<MenuItem | null>(null);

    // -------------------
    // Apply theme CSS variables
    // -------------------
    useEffect(() => {
        const root = document.documentElement;
        root.style.setProperty("--primary-background-color", theme.primaryBackGroundColor);
        root.style.setProperty("--secondary-background-color", theme.secondaryBackgroundColor ?? theme.primaryBackGroundColor);
        root.style.setProperty("--third-background-color", theme.thirdGreyBackgroundColor ?? theme.thirdGreyBackgroundColor);
        root.style.setProperty("--addto-basket-color", theme.addToBasketHoverColor ?? theme.addToBasketHoverColor);
        root.style.setProperty("--primary-text-color", theme.primaryTextColor);
        root.style.setProperty("--secondary-text-color", theme.secondaryTextColor ?? theme.primaryTextColor);
        root.style.setProperty("--hover-menuactions-color", theme.hoverMenuActions ?? theme.hoverMenuActions);
         root.style.setProperty("--black-color", theme.blackColor);
          root.style.setProperty("--white-color", theme.whiteColor);

    }, []);

    // -------------------
    // Sync menu with URL
    // -------------------
    useEffect(() => {
        const flowId = routeToFlow[location.pathname];


        if (!flowId) {
            setSelectedMenuPoint(null);
            setMenuPoints(menuConfig.filter(m => m.parentFlowId === "NONE"));
            return;
        }


        const selected = menuConfig.find(m => m.flowId === flowId) || null;
        setSelectedMenuPoint(selected);


        const submenu = menuConfig.filter(
            m => m.parentFlowId === flowId || m.action === "BACK"
        );
        setMenuPoints(submenu);
    }, [location.pathname]);

    // -------------------
    // Handle menu clicks
    // -------------------
    const handleSelectedMenuPoint = (menuItem: MenuItem) => {
        if (menuItem.action === "BACK") {
            // Go to parent flow dynamically
            if (selectedMenuPoint && selectedMenuPoint.parentFlowId && selectedMenuPoint.parentFlowId !== "NONE") {
                const parentItem = menuConfig.find(m => m.flowId === selectedMenuPoint.parentFlowId);
                if (parentItem) {
                    navigate(flowToRoute[parentItem.flowId]);
                } else {
                    navigate("/"); // fallback
                }
            } else {
                navigate("/"); // top-level fallback
            }
            return;
        }


        if (menuItem.action === "/") {
            navigate("/");
            return;
        }


        const route = flowToRoute[menuItem.flowId];
        if (route) {
            navigate(route);
        }
    };

    // -------------------
    // Render
    // -------------------
   /*  return (
        <>
            <div className="m-24">
                <MenuCardApplication
                    onChange={handleSelectedMenuPoint}
                    menuItems={menuPoints}
                />
                <MenuCardCV />
            </div>

            <div className="app_content">
                {selectedMenuPoint && <Outlet />}
            </div>
        </>
    );
}; */

return (
        <>
            {selectedMenuPoint ? (
                <>
                    <div className='m-24 mt-0 fixed left-0 top-[50px] bg-thirdBackgroundColor'>
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
                {selectedMenuPoint && <Outlet />}
            </div>
        </>
    );
};

export default MainLayout;

