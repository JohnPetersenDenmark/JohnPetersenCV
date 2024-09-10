import { currentApplicationData } from '../../GlobalData/GlobalApplicationData';



function ApplicationJobTitle() {



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