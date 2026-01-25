import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useApplicationData } from '../../GlobalData/GlobalApplicationDataContext';
import MenuCardApplication, { MenuItem } from './MenuCardApplication';
import MenuCardCV from './MenuCardCV';
import { theme } from '../../Utilities/myconfig';

const MainLayout: React.FC = () => {
    const navigate = useNavigate();   
    
     const { currentApplicationData, setCurrentApplicationData } = useApplicationData();

    const DefaultMenuItems: MenuItem[] = [
        { id: 1, title: "Ny ansøgning", action: "/editapp", icon: "✉️", level: 1, parentFlowId: 'NONE', flowId: 'EDIT_APPLICATION' },
        { id: 2, title: "Hent ansøgning", action: "/getapplication", icon: "✉️", level: 1, parentFlowId: 'NONE', flowId: 'IMPORT_APPLICATION' }
    ];

    const allSubMenuItems: MenuItem[] = [
        { id: 100, title: "Arranger", action: "/reorderapp", icon: "✉️", level: 2, parentFlowId: 'EDIT_APPLICATION', flowId: 'REORDER_APPLICATION' },
        { id: 200, title: "Gem ansøgning", action: "/saveapp", icon: "✉️", level: 2, parentFlowId: 'EDIT_APPLICATION', flowId: 'SAVE_APPLICATION' },
        // { id: 300, title: "To PDF", action: "", icon: "✉️", level: 2, parentFlowId: 'EDIT_APPLICATION', flowId: 'APPLICATION_TOPDF' },
        { id: 400, title: "Tilbage", action: "/", icon: "✉️", level: 2, parentFlowId: 'EDIT_APPLICATION', flowId: 'APPLICATION_BACK' },
        { id: 420, title: "Tilbage", action: "/", icon: "✉️", level: 2, parentFlowId: 'REORDER_APPLICATION', flowId: 'APPLICATION_BACK' },
        { id: 430, title: "Tilbage", action: "/", icon: "✉️", level: 2, parentFlowId: 'APPLICATION_TOPDF', flowId: 'APPLICATION_BACK' },
        { id: 430, title: "Tilbage", action: "/", icon: "✉️", level: 2, parentFlowId: 'SAVE_APPLICATION', flowId: 'APPLICATION_BACK' },
         { id: 430, title: "Tilbage", action: "/", icon: "✉️", level: 2, parentFlowId: 'IMPORT_APPLICATION', flowId: 'APPLICATION_BACK' },
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

    // Handle menu item clicks
    const handleSelectedMenuPoint = (menuItem: MenuItem) => {

        // BACK 
        if (menuItem.action === "/") {
            if (selectedMenuPoint) {
                if (selectedMenuPoint.parentFlowId === 'NONE') {
                    if (currentApplicationData && selectedMenuPoint.flowId === 'IMPORT_APPLICATION')
                    {
                        let tmp = DefaultMenuItems.filter(m => m.flowId === 'EDIT_APPLICATION')
                        menuItem = tmp[0]
                    }
                    else{
                    setSelectedMenuPoint(null);
                    let tmpMenuPoints = DefaultMenuItems
                    setMenuPoints(tmpMenuPoints);
                    navigate("/")
                    return;
                    }
                }
                else {
                    let tmp = allSubMenuItems.filter(m => m.flowId === selectedMenuPoint.parentFlowId)
                    if (tmp.length === 0) {
                        tmp = DefaultMenuItems.filter(m => m.flowId === selectedMenuPoint.parentFlowId)
                        if (tmp.length > 0) {
                            menuItem = tmp[0]
                        }
                        else {
                            return
                        }
                    }
                }


            }
            else {
                return
            }
        }

        let tmpMenuPoints = [];

        // FLOW-BASED NAVIGATION
        switch (menuItem.flowId) {
            case "IMPORT_APPLICATION":
                // setFlow('IMPORT_APPLICATION');
                tmpMenuPoints = allSubMenuItems.filter(m => m.parentFlowId === 'IMPORT_APPLICATION')
                setMenuPoints(tmpMenuPoints);
                navigate('/getapplication');
                break;
            case "EDIT_APPLICATION":
                //   setFlow('EDIT_APPLICATION');
                tmpMenuPoints = allSubMenuItems.filter(m => m.parentFlowId === 'EDIT_APPLICATION')
                setMenuPoints(tmpMenuPoints);
                navigate('/editapp');
                break;
            case "REORDER_APPLICATION":
                // setFlow('REORDER_APPLICATION');
                tmpMenuPoints = allSubMenuItems.filter(m => m.parentFlowId === menuItem.flowId)
                setMenuPoints(tmpMenuPoints);
                navigate('/reorderapp');
                break;
            case "SAVE_APPLICATION":
                // setFlow('REORDER_APPLICATION');
                tmpMenuPoints = allSubMenuItems.filter(m => m.parentFlowId === menuItem.flowId)
                setMenuPoints(tmpMenuPoints);
                navigate('/saveapp');
                break;
            default:
                // navigate(menuItem.action);
                break;
        }

        setSelectedMenuPoint(menuItem);
    };

    return (
        <>
            {selectedMenuPoint ? (
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
