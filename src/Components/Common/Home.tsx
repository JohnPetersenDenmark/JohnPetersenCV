import CV from '../../Components/CV/CV'
import Application from '../../Components/Application/Application'
// import OpenApplicationdataFile from '../../Components/Application/OpenApplicationDatafile'
//import ConvertCVToPdf from '../../Components/CV/ConvertCVToPdf'
// import ConvertApplicationToPdf from '../../Components/Application/ConvertApplicationToPdf';


import { useState } from 'react';
import { currenrCVData, setCurrentCVData_v2 } from '../../GlobalData/GlobalCVData';
import { setCurrentApplicationData, currentApplicationData, defaultApplicationData } from '../../GlobalData/GlobalApplicationData';
import { CVData } from '../../Classes/ClassesCVData';

import { useSearchParams } from 'react-router-dom';




import { ApplicationData } from '../../Classes/ClassesApplicationData';

var _ = require('lodash');


function Home(props: any) {

    return (
        <div className='app_content'>

            <div className='app_content_content'>
                <CV />
                <Application />
            </div>
        </div>
    );
}

export default Home
