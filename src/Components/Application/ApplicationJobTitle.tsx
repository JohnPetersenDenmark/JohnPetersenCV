//import { currentApplicationData } from '../../GlobalData/GlobalApplicationData';

import { useApplicationData } from '../../GlobalData/GlobalApplicationDataContext';

function ApplicationJobTitle() {

 const { currentApplicationData, setCurrentApplicationData } = useApplicationData();

  if (!currentApplicationData?.ApplicationJobTitle) {
      return null; // safe guard
    }
    
    return (
        <div>
            <p className="section_title" id={currentApplicationData.ApplicationJobTitle.thisClassName}>
                {/* {currentApplicationData.ApplicationJobTitle.sectionName} */} 
            </p>

            {currentApplicationData.ApplicationJobTitle.entries.map((entry) => (


                <p> {entry.jobtitle} </p>

            ))}

        </div>
    );
}

export default ApplicationJobTitle; 