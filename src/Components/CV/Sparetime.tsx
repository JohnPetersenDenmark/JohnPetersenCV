


import { CVData } from '../../Classes/ClassesCVData';
import { useCVData } from '../../GlobalData/GlobalCVDataContext';
import {useState, useContext} from 'react';

function Sparetime() {

const { currenrCVData, setCurrentCVData } = useCVData();

    return (
        <>             
        <div>
            <p className="section_title" id={currenrCVData.Sparetime.thisClassName}>
          
                {currenrCVData.Sparetime.sectionName}
                </p>

            {currenrCVData.Sparetime.entries.map((SparetimeEntry, index) => (

                <div  key={index}>
                    <p style={{  lineHeight: '1.2'}} className='sparetime_entry_title'>{SparetimeEntry.interest}</p>                                                  
                </div>
            ))}
            <hr className="section_ruler"></hr>
        </div>
        </>
    );
} 

export default Sparetime;