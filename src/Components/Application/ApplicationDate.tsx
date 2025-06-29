import { currentApplicationData } from '../../GlobalData/GlobalApplicationData';



function ApplicationDate() {

    let tmp = currentApplicationData;
    let x = tmp;

    if (currentApplicationData === null) {
        return (<></>);
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