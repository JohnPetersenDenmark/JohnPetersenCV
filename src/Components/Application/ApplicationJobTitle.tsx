
import { useApplicationData } from '../../GlobalData/GlobalApplicationDataContext';
import ApplicationStyling from '../Common/ApplicationStyling';

export function ApplicationJobTitle() {

    const { currentApplicationData, setCurrentApplicationData } = useApplicationData();

    if (!currentApplicationData?.ApplicationJobTitle) {
        return null; // safe guard
    }

    const {
        sectionDivOuterStyle,
        sectionInnerDivStyle,
        paraGraphSectionStyle,
        paraGraphStyle
    } = ApplicationStyling(currentApplicationData.ApplicationJobTitle);

    return (
        <>
            <div style={sectionDivOuterStyle}>
                <div style={sectionInnerDivStyle}>
                    <p className="section_title" id={currentApplicationData.ApplicationJobTitle.thisClassName} style={paraGraphSectionStyle}>
                        {/* {currentApplicationData.ApplicationJobTitle.sectionName} */}
                    </p>
                   
                    <div  dangerouslySetInnerHTML={{ __html: currentApplicationData?.ApplicationJobTitle?.sectionContent ?? "" }}
                    />
                </div>
            </div>
        </>
    );
}

