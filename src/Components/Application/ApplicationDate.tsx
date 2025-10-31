import { useApplicationData } from '../../GlobalData/GlobalApplicationDataContext';
import ApplicationStyling from '../Common/ApplicationStyling';


function ApplicationDate() {

    const { currentApplicationData, setCurrentApplicationData } = useApplicationData();

    if (!currentApplicationData?.ApplicationDate) {
        return null; // safe guard
    }

    const {
        sectionDivOuterStyle,
        sectionInnerDivStyle,
        paraGraphSectionStyle,
        paraGraphStyle
    } = ApplicationStyling(currentApplicationData.ApplicationDate);

    return (
        <>
            <div style={sectionDivOuterStyle}>
                <div style={sectionInnerDivStyle}>
                    <p className="section_title" id={currentApplicationData.ApplicationDate.thisClassName} style={paraGraphSectionStyle}>
                        {/* {currentApplicationData.ApplicationDate.headline} */}
                    </p>

                    {currentApplicationData.ApplicationDate.entries.map((entry) => (


                        <p className='application_content_paragraphs'  style={paraGraphStyle}> {entry.date} </p>

                    ))}
                </div>
            </div>
        </>
    );
}

export default ApplicationDate; 