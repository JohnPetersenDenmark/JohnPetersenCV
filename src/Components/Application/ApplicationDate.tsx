import { useApplicationData } from '../../GlobalData/GlobalApplicationDataContext';



function ApplicationDate() {

    const { currentApplicationData, setCurrentApplicationData } = useApplicationData();
    
    if (!currentApplicationData?.ApplicationDate) {
      return null; // safe guard
    }

    return (
        <>
            <p className="section_title" id={currentApplicationData.ApplicationDate.thisClassName}>
                {/* {currentApplicationData.ApplicationDate.headline} */} 
            </p>

            {currentApplicationData.ApplicationDate.entries.map((entry) => (


                <p className='application_content_paragraphs'> {entry.date} </p>

            ))}

        </>
    );
}

export default ApplicationDate; 