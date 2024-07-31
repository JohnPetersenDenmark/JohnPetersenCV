// import   {currenrCVData}  from './GlobalCVData';


import { CVData } from '../../Classes/ClassesCVData';
import   { currenrCVData}  from '../../GlobalData/GlobalCVData';
import {useState, useContext} from 'react';

function Sparetime() {

    return (
        <div>
            <p className="section_title">{currenrCVData.Sparetime.sectionName}</p>

            {currenrCVData.Sparetime.entries.map((SparetimeEntry) => (

                <div>
                    <p style={{  lineHeight: '1.2'}} className='sparetime_entry_title'>{SparetimeEntry.interest}</p>                                                  
                </div>
            ))}
            <hr className="section_ruler"></hr>
        </div>
    );
} 

export default Sparetime;