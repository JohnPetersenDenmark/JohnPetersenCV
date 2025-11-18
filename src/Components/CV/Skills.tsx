
import { useCVData } from '../../GlobalData/GlobalCVDataContext';
import ApplicationStyling from "../Common/ApplicationStyling";


function Skills() {

const { currenrCVData, setCurrentCVData } = useCVData();



  const { thisClassName, entries } = currenrCVData.Skills;

  const {
    sectionDivOuterStyle,
    sectionInnerDivStyle,
    paraGraphSectionStyle,
    paraGraphStyle
  } = ApplicationStyling(currenrCVData.Skills);

  return (

    <>
      <div style={sectionDivOuterStyle}>
        <div style={sectionInnerDivStyle}>
          <p className="section_title" id={thisClassName} style={paraGraphSectionStyle}>
            {/* Optional: section title */}
          </p>

          <div
           dangerouslySetInnerHTML={{ __html: currenrCVData.Skills.sectionContent }}
          />
        </div>
      </div>
    </>
  );
}

export default Skills; 