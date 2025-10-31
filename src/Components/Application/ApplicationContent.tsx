import { useApplicationData } from '../../GlobalData/GlobalApplicationDataContext';
import ApplicationStyling from '../Common/ApplicationStyling';
import parse from 'html-react-parser';



function ApplicationContent() {

    const { currentApplicationData, setCurrentApplicationData } = useApplicationData();
    if (!currentApplicationData?.ApplicantContent) {
        return null; // safe guard
    }


    const {
        sectionDivOuterStyle,
        sectionInnerDivStyle,
        paraGraphSectionStyle,
        paraGraphStyle
    } = ApplicationStyling(currentApplicationData.ApplicantContent);

    return (
        <>
            <div style={sectionDivOuterStyle}>
                <div style={sectionInnerDivStyle}>
                    <p className="section_title" id={currentApplicationData.ApplicantContent.thisClassName} style={paraGraphSectionStyle}>
                        {/* {currentApplicationData.ApplicantContent.sectionName} */}
                    </p>

                    {currentApplicationData.ApplicantContent.entries.map((paragraph) => (


                        <p className='application_content_paragraphs' style={{ whiteSpace: "pre-wrap" }}> {paragraph.bodyparagraph} </p>

                    ))}
                </div>
            </div>
        </>
    );
}

export default ApplicationContent; 