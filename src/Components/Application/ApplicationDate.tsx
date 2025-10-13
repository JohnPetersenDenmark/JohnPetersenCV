import { currentApplicationData } from '../../GlobalData/GlobalApplicationData';



function ApplicationDate() {

    if (!currentApplicationData?.ApplicationDate) {
      return null; // safe guard
    }

    return (
        <div>
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