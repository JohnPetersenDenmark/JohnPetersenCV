import { useCVData } from '../../GlobalData/GlobalCVDataContext';
import ApplicationStyling from "../Common/ApplicationStyling";

function Education() {

  const { currenrCVData, setCurrentCVData } = useCVData();

  const { thisClassName, entries } = currenrCVData.Educations;

  const {
    sectionDivOuterStyle,
    sectionInnerDivStyle,
    paraGraphSectionStyle,
    paraGraphStyle
  } = ApplicationStyling(currenrCVData.Educations);

  return (

    <>
      <div style={sectionDivOuterStyle}>
        <div style={sectionInnerDivStyle}>
          <p className="section_title" id={thisClassName} style={paraGraphSectionStyle}>
            {/* Optional: section title */}
          </p>

          <div
           dangerouslySetInnerHTML={{ __html: currenrCVData.Educations.sectionContent }}
          />
        </div>
      </div>
    </>
  );
}

export default Education;