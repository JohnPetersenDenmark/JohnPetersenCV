import CV from '../../Components/CV/CV'
import Application from '../../Components/Application/Application'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { theme } from '../../Utilities/myconfig';
import MenuCardApplication from './MenuCardApplication';
import { MenuItem } from './MenuCardApplication';
import MenuCardCV from './MenuCardCV';





import { useState } from 'react';
import EditApplication from '../Application/EditApplication';
import { currenrCVData, setCurrentCVData_v2 } from '../../GlobalData/GlobalCVData';
import { setCurrentApplicationData, currentApplicationData, defaultApplicationData } from '../../GlobalData/GlobalApplicationData';
import { CVData } from '../../Classes/ClassesCVData';

import { useSearchParams } from 'react-router-dom';

import { ApplicationData } from '../../Classes/ClassesApplicationData';

var _ = require('lodash');

function Home(props: any) {

    const base_url = process.env.REACT_APP_BASE_URL as string;

    const DefaultMenuItems: MenuItem[] = [{
        id: 1,
        title: "Ny ansøgning",
        action: "",
        icon: "✉️",
        level: 1,
        parentId: 1
    }, {
        id: 2,
        title: "Hent ansøgning",
        action: "",
        icon: "✉️",
        level: 1,
        parentId: 2
    }]

    const allSubMenuItems: MenuItem[] = [{
        id: 100,
        title: "Arranger",
        // action: "/getapplication",
        action: "",
        icon: "✉️",
        level: 2,
        parentId: 1
    }, {
        id: 200,
        title: "Gem ansøgning",
        action: "",
        icon: "✉️",
        level: 2,
        parentId: 1
    }, {
        id: 300,
        title: "To PDF",
        action: "",
        icon: "✉️",
        level: 2,
        parentId: 1
    },
    {
        id: 400,
        title: "Tilbage",
        action: "/",
        icon: "✉️",
        level: 2,
        parentId: 1
    }
    ]

    const navigate = useNavigate();
    const [menuLevel, setMenuLevel] = useState(1);
    const [menuPoints, setMenuPoints] = useState<MenuItem[]>(DefaultMenuItems);

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


    /* 
        function goToEditApplicationPage() {
    
            navigate("/editapp");
        } */

    function handleSelectedMenuPoint(menuItem: MenuItem) {

        let subMenuPoints = []

        if (menuItem.action === "/") {
            if ( menuItem.level === 2)
            {
                subMenuPoints = DefaultMenuItems.filter(menuPoint => menuPoint.level === 1 );
            }
            else{
                 subMenuPoints = allSubMenuItems.filter(menuPoint => menuPoint.id === menuItem.parentId  &&  menuPoint.level === menuItem.level -1  );
            }
           
            setMenuLevel(menuItem.level -1)
            navigate(-1)
        }
        else {
            subMenuPoints = allSubMenuItems.filter(menuPoint => menuItem.id === menuPoint.parentId && menuPoint.parentId !== 0 && menuPoint.level === menuItem.level + 1);
            setMenuLevel(menuItem.level +1)
            navigate(menuItem.action)
        }

        setMenuPoints(subMenuPoints)
    }

    /*   function goToEditCVPage() {
          navigate("/editcv");
      } */

    return (
        <>
            {menuLevel > 1 ?
                <>
                    <div className='m-24 fixed left-0'>
                        <MenuCardApplication onChange={handleSelectedMenuPoint} menuItems={menuPoints} />
                    </div>
                    <div className='m-24 fixed left-0 top-[450px]'>
                        <MenuCardCV />
                    </div>  </>
                :
                <>
                    <div className='m-24' >
                        <MenuCardApplication onChange={handleSelectedMenuPoint} menuItems={menuPoints} />
                    </div>
                    <div className='m-24'>
                        <MenuCardCV />
                    </div> </>
            }

            {/* <div className='app_content'>

                <div className='app_content_content'> */}


            <EditApplication />

            {/*  <div style={{
                    marginBottom: '20px',
                    marginLeft: '20px'
                }}>
                    <button
                        style={{
                            backgroundColor: "#00b8d7",  // Indigo blue
                            color: "white",
                            border: "3px solid",
                            padding: "10px 20px",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontSize: "16px",
                            fontWeight: 500,
                            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                            transition: "all 0.2s ease",

                        }}
                        onClick={(e) => goToEditApplicationPage()}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "Black")}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#00b8d7")}
                    >
                        Editer ansøgning
                    </button>
                </div> */}

            {/*  <div style={{
                    marginBottom: '20px',
                    marginLeft: '20px'
                }}>
                    <button
                        style={{
                            backgroundColor: "#00b8d7",  // Indigo blue
                            color: "white",
                            border: "3px solid",
                            padding: "10px 20px",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontSize: "16px",
                            fontWeight: 500,
                            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                            transition: "all 0.2s ease",

                        }}
                        onClick={(e) => goToEditCVPage()}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "Black")}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#00b8d7")}
                    >
                        Editer CV
                    </button>
                </div> */}
            {/*  <CV />
                <Application /> */}
            {/*   </div>
            </div> */}
        </>
    );
}

export default Home
