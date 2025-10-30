
import { useApplicationData } from '../../GlobalData/GlobalApplicationDataContext';

function ApplicationJobTitle() {

 const { currentApplicationData, setCurrentApplicationData } = useApplicationData();

  if (!currentApplicationData?.ApplicationJobTitle) {
      return null; // safe guard
    }
    
    return (
        <>
            <p className="section_title" id={currentApplicationData.ApplicationJobTitle.thisClassName}>
                {/* {currentApplicationData.ApplicationJobTitle.sectionName} */} 
            </p>

            {currentApplicationData.ApplicationJobTitle.entries.map((entry) => (


                <p> {entry.jobtitle} </p>

            ))}

        </>
    );
}

export default ApplicationJobTitle; 