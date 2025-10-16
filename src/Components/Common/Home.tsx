import CV from '../../Components/CV/CV'
import Application from '../../Components/Application/Application'
import { useNavigate } from 'react-router-dom';


import { useState } from 'react';
import { currenrCVData, setCurrentCVData_v2 } from '../../GlobalData/GlobalCVData';
import { setCurrentApplicationData, currentApplicationData, defaultApplicationData } from '../../GlobalData/GlobalApplicationData';
import { CVData } from '../../Classes/ClassesCVData';

import { useSearchParams } from 'react-router-dom';




import { ApplicationData } from '../../Classes/ClassesApplicationData';

var _ = require('lodash');



function Home(props: any) {

    const navigate = useNavigate();
    function goToEditApplicationPage() {

        navigate("/editapp");

    }

     
    function goToEditCVPage() {

        navigate("/editcv");

    }

    return (
        <div className='app_content'>
           


            <div className='app_content_content'>





 <div style={{
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
            </div>
            
            <div style={{
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
            </div>











                <CV />
                <Application />
            </div>
        </div>
    );
}

export default Home
