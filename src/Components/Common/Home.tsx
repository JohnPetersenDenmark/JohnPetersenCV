import CV from '../../Components/CV/CV'
import Application from '../../Components/Application/Application'
import OpenCVdataFile from '../../Components/CV/OpenCVDatafile'
import OpenApplicationdataFile from '../../Components/Application/OpenApplicationDatafile'
import ConvertCVToPdf from '../../Components/CV/ConvertCVToPdf'
import ConvertApplicationToPdf from '../../Components/Application/ConvertApplicationToPdf';

import { useState } from 'react';
import { currenrCVData, setCurrentCVData_v2 } from '../../GlobalData/GlobalCVData';
import { setCurrentApplicationData, currentApplicationData, defaultApplicationData } from '../../GlobalData/GlobalApplicationData';
import { CVData } from '../../Classes/ClassesCVData';

import { useSearchParams } from 'react-router-dom';

// import { useSearchParams } from 'react-router-dom';


import { ApplicationData } from '../../Classes/ClassesApplicationData';

var _ = require('lodash' );


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

    function setNewApplicationData(newApplicationData: any) {

        if (newApplicationData === null)
        {
            if ( currentApplicationData !== null)
            {
                setCurrentApplicationData(null);
                 setApplicationUpdateCounter(updateApplicationCounter + 1)
            }
          
            return("");
        }

        let tmp = currentApplicationData
        let oldCurrentApplicationDataStr = JSON.stringify(currentApplicationData);
        let mergedApplicationData = null;

        if ( currentApplicationData === null) {
             mergedApplicationData = { ...newApplicationData, ...defaultApplicationData }          
        }
        else{
             mergedApplicationData = { ...newApplicationData, ...currentApplicationData }
        }
       
        deepCopyApplicationData(newApplicationData, mergedApplicationData)
        let newCurrentApplicationDataStr = JSON.stringify(mergedApplicationData);

        if (!(_.isEqual(oldCurrentApplicationDataStr, newCurrentApplicationDataStr))) {

            setCurrentApplicationData(mergedApplicationData);
            setApplicationUpdateCounter(updateApplicationCounter + 1)
        }
    }


    function deepCopyApplicationData(source: ApplicationData, destination: ApplicationData) {


        for (let [key, value] of Object.entries(source)) {
            for (let [key1, value1] of Object.entries(destination)) {
                if (key === key1) {
                    if (value.entries) {
                        for (let i = 0; i < value.entries.length; i++) {
                            let bb = value.entries[i]
                            //  for (let x = 0; x < value1.entries.length; x++) {

                            let cc = value1.entries[i]
                            for (let [key2, value2] of Object.entries(bb)) {
                                for (let [key3, value3] of Object.entries(cc)) {
                                    if (key2 === key3) {
                                        //value3 = value2;
                                        value1.entries[i][key3] = value2
                                    }
                                }
                            }
                            // }
                        }
                    }
                    else {
                        value1 = value
                    }
                }
            }
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

                {/* {showApplication && reloadDataFromFile ?
                    <><OpenApplicationdataFile
                        SetApplicationdata={(newApplicationData: ApplicationData) => {
                            setNewApplicationData(newApplicationData)
                        }
                        }
                    >
                    </OpenApplicationdataFile>
                        <Application /></>
                    : <Application />} */}

                {showApplication ?
                    <><OpenApplicationdataFile
                        SetApplicationdata={(newApplicationData: ApplicationData) => {
                            setNewApplicationData(newApplicationData)
                        }
                        }
                    >
                    </OpenApplicationdataFile>
                        <Application /></>
                    : ""}

            </div>

            {convertflag ?

                <div className='app_download_buttons'>
                    {showCV ? <ConvertCVToPdf /> : ""}
                    {/* {showApplication && reloadDataFromFile ? <ConvertApplicationToPdf /> : ""} */}
                    {showApplication ? <ConvertApplicationToPdf /> : ""}
                </div>
                : ""
            }
        </div>
    );
}



export default Home
