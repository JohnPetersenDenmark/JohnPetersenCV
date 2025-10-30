

import { useApplicationData } from '../../GlobalData/GlobalApplicationDataContext';


function Applicationheadline() {

    const { currentApplicationData, setCurrentApplicationData } = useApplicationData();

    if (currentApplicationData === null) {
        return (<></>);
    }

    return (
        <>

            <p className="section_title" id={currentApplicationData.ApplicantContentHeadline.thisClassName}>
                {/* {currentApplicationData.ApplicantContentHeadline.sectionName} */} 
            </p>

            {currentApplicationData.ApplicantContentHeadline.entries.map((entry) => (


                <p> {entry.text} </p>

            ))}

        </>
    );
}

export default Applicationheadline; 