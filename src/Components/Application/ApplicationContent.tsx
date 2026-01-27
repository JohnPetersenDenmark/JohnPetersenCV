import { useApplicationData } from '../../GlobalData/GlobalApplicationDataContext';
import ApplicationStyling from '../Common/ApplicationStyling';
import parse from 'html-react-parser';


export const ApplicantContent: React.FC = () => {
//export function ApplicantContent() {

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

                    <div dangerouslySetInnerHTML={{ __html: currentApplicationData?.ApplicantContent?.sectionContent ?? "" }} />

                </div>
            </div>
        </>
    );
}

