import CV from '../../Components/CV/CV'
import Application from '../../Components/Application/Application'
import OpenCVdataFile from '../../Components/CV/OpenCVDatafile'
// import OpenApplicationdataFile from '../../Components/Application/OpenApplicationDatafile'
import ConvertCVToPdf from '../../Components/CV/ConvertCVToPdf'
// import ConvertApplicationToPdf from '../../Components/Application/ConvertApplicationToPdf';


import { useState } from 'react';
import { currenrCVData, setCurrentCVData_v2 } from '../../GlobalData/GlobalCVData';
import { setCurrentApplicationData, currentApplicationData, defaultApplicationData } from '../../GlobalData/GlobalApplicationData';
import { CVData } from '../../Classes/ClassesCVData';

import { useSearchParams } from 'react-router-dom' ;

// import { useSearchParams } from 'react-router-dom';


import { ApplicationData } from '../../Classes/ClassesApplicationData';

var _ = require('lodash'  );


function Home(props: any) {

    //let tmp = reloadDataFromFile;
    let [updateCVCounter, setUpdateCVCounter] = useState(0);
    let [updateApplicationCounter, setApplicationUpdateCounter] = useState(0);

    let convertflag = props.convert_to_pdf

    const [searchParams] = useSearchParams();
    const converttype = searchParams.get('converttype');
    const showCV = (converttype === null || converttype === 'cv') ? true : false;
    const showApplication = (converttype === null || converttype === 'application') ? true : false;



     function setNewCVData(newCVData: CVData) {
        let oldcurrenrCVData = currenrCVData;
        setCurrentCVData_v2(newCVData);
        let tmp = currenrCVData;

        if (!(_.isEqual(currenrCVData, oldcurrenrCVData))) {
            setUpdateCVCounter(updateCVCounter + 1)
        }

    }

    

    return (
        <div className='app_content'>

            <div className='app_content_content'>

                {showCV ?
                    <><OpenCVdataFile
                        SetCVdata={(newCVData: CVData) => {
                            setNewCVData(newCVData)
                        }
                        }
                    >
                    </OpenCVdataFile>
                        <div className='app_content_content'> <CV /> </div></>
                    : ""}

             

                {showApplication ?
                    <>                  
                        <Application />
                        </>
                    : ""}

            </div>

            {convertflag ?

                <div className='app_download_buttons'>
                    {showCV ? <ConvertCVToPdf /> : ""}
                    {/* {showApplication && reloadDataFromFile ? <ConvertApplicationToPdf /> : ""} */}
                    {/* {showApplication ? <ConvertApplicationToPdf /> : ""} */}
                </div>
                : ""
            }
        </div>
    );
}



export default Home
