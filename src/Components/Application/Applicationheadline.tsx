import { currentApplicationData } from '../../GlobalData/GlobalApplicationData';



function Applicationheadline() {

    if (currentApplicationData === null) {
        return (<></>);
    }

    return (
        <div>

            <p className="section_title" id={currentApplicationData.ApplicantContentHeadline.thisClassName}>
                {/* {currentApplicationData.ApplicantContentHeadline.sectionName} */} 
            </p>

            {currentApplicationData.ApplicantContentHeadline.entries.map((entry) => (


                <p> {entry.text} </p>

            ))}

        </div>
    );
}

export default Applicationheadline; 