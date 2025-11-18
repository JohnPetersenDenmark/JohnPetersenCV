
import { useCVData } from '../../GlobalData/GlobalCVDataContext';
import ApplicationStyling from "../Common/ApplicationStyling";


function ContactInfo() {

const { currenrCVData, setCurrentCVData } = useCVData();



  const { thisClassName, entries } = currenrCVData.ContactInfo;

  const {
    sectionDivOuterStyle,
    sectionInnerDivStyle,
    paraGraphSectionStyle,
    paraGraphStyle
  } = ApplicationStyling(currenrCVData.ContactInfo);

  return (

    <>
      <div style={sectionDivOuterStyle}>
        <div style={sectionInnerDivStyle}>
          <p className="section_title" id={thisClassName} style={paraGraphSectionStyle}>
            {/* Optional: section title */}
          </p>

          <div
           dangerouslySetInnerHTML={{ __html: currenrCVData.ContactInfo.sectionContent }}
          />
        </div>
      </div>
    </>
  );
}

export default ContactInfo; 