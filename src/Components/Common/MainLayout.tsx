import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useApplicationData } from '../../GlobalData/GlobalApplicationDataContext';
import MenuCardApplication, { MenuItem } from './MenuCardApplication';
import MenuCardCV from './MenuCardCV';
import { theme } from '../../Utilities/myconfig';
import { PageActionContext } from './PageActionContext';

// -------------------
// Flow ↔ Route maps
// -------------------
const flowToRoute: Record<string, string> = {
    IMPORT_APPLICATION: "/getapplication",
    IMPORT_APPLICATION_FROM_FILE: "/getapplication",
    EDIT_APPLICATION: "/editapp",
    REORDER_APPLICATION: "/reorderapp",
    AUTO_ARRANGE : "/reorderapp",
     CREATE_PDF : "/reorderapp",
    SAVE_APPLICATION: "/saveapp",
    SAVE_TOFILE: "/saveapp",
};

const routeToFlow: Record<string, string> = {
    "/getapplication": "IMPORT_APPLICATION",
    "/editapp": "EDIT_APPLICATION",
    "/reorderapp": "REORDER_APPLICATION",
    "/saveapp": "SAVE_APPLICATION",
};

let baseUrl = process.env.PUBLIC_URL;
// -------------------
// Single Menu Config
// -------------------
const menuConfig: MenuItem[] = [
    // Top-level items
    { id: 1, title: "Ny ansøgning", action: "/editapp", iconPath: baseUrl + "/images/newapplication.svg", level: 1, parentFlowId: 'NONE', flowId: 'EDIT_APPLICATION', functionToRun: "" },
    { id: 2, title: "Hent ansøgning", action: "/getapplication", iconPath: baseUrl + "/images/getapplication.svg", level: 1, parentFlowId: 'NONE', flowId: 'IMPORT_APPLICATION', functionToRun: "" },

    // Submenu items
    { id: 100, title: "Arranger", action: "/reorderapp", iconPath: baseUrl + "/images/arrange.svg", level: 2, parentFlowId: 'EDIT_APPLICATION', flowId: 'REORDER_APPLICATION', functionToRun: "" },
    { id: 200, title: "Gem ansøgning", action: "/saveapp", iconPath: baseUrl + "/images/save.svg", level: 2, parentFlowId: 'EDIT_APPLICATION', flowId: 'SAVE_APPLICATION', functionToRun: "" },
    { id: 300, title: "Skab PDF", action: "/reorderapp", iconPath: baseUrl + "/images/pdfdocument.svg", level: 2, parentFlowId: 'REORDER_APPLICATION', flowId: 'CREATE_PDF', functionToRun: "ToPDF" },
    { id: 400, title: "Autoarranger", action: "/reorderapp", iconPath: baseUrl + "/images/autoarrange.svg", level: 2, parentFlowId: 'REORDER_APPLICATION', flowId: 'AUTO_ARRANGE', functionToRun: "AutoArrange" },
    { id: 500, title: "Gem ansøgning", action: "/saveapp", iconPath: baseUrl + "/images/save.svg", level: 2, parentFlowId: 'SAVE_APPLICATION', flowId: 'SAVE_TOFILE', functionToRun: "SaveToFile" },
    { id: 600, title: "Hent ansøgning", action: "/getapplication", iconPath: baseUrl + "/images/getapplication.svg", level: 1, parentFlowId: 'IMPORT_APPLICATION', flowId: 'IMPORT_APPLICATION_FROM_FILE', functionToRun: "GetApplicationFromFile" },

    // Back button
    { id: 700, title: "Tilbage", action: "BACK", iconPath: baseUrl + "/images/back.svg", level: 2, parentFlowId: "", flowId: "APPLICATION_BACK", functionToRun: "SaveToFile" }
];

const MainLayout: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { currentApplicationData } = useApplicationData();
    const [action, setAction] = React.useState<string | null>(null);

    const [menuPoints, setMenuPoints] = useState<MenuItem[]>([]);
    const [selectedMenuPoint, setSelectedMenuPoint] = useState<MenuItem | null>(null);
    //  const [force,setforce] = useState(0)

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
            if (menuItem.functionToRun) {
                setAction(menuItem.functionToRun)
                /* const submenu = menuConfig.filter(
                    m => m.parentFlowId === menuItem.flowId || m.action === "BACK"
                );
                const selected = menuConfig.find(m => m.flowId === menuItem.flowId) || null;
                setSelectedMenuPoint(selected);

                setMenuPoints(submenu);
            }
            else {
                navigate(route); */
            }

            navigate(route);


        }
    };


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
                {selectedMenuPoint &&
                    <PageActionContext.Provider value={{ action, setAction }}>
                        <Outlet />
                    </PageActionContext.Provider>}
            </div>
        </>
    );
};

export default MainLayout;

