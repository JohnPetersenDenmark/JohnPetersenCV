import { useApplicationData } from '../../GlobalData/GlobalApplicationDataContext';



function ApplicationDate() {

    const { currentApplicationData, setCurrentApplicationData } = useApplicationData();
    
    if (!currentApplicationData?.ApplicationDate) {
      return null; // safe guard
    }

    return (
        <div  style={currentApplicationData.ApplicationDate.cssStyles}>
            <p className="section_title" id={currentApplicationData.ApplicationDate.thisClassName}>
                {/* {currentApplicationData.ApplicationDate.headline} */} 
            </p>

            {currentApplicationData.ApplicationDate.entries.map((entry) => (


                <p className='application_content_paragraphs'> {entry.date} </p>

            ))}

        </div>
    );
}

export default ApplicationDate; 