
import { useCVData } from '../../GlobalData/GlobalCVDataContext';
import ApplicationStyling from "../Common/ApplicationStyling";


function WorkingHistory() {

const { currenrCVData, setCurrentCVData } = useCVData();



  const { thisClassName, entries } = currenrCVData.WorkingExperience;

  const {
    sectionDivOuterStyle,
    sectionInnerDivStyle,
    paraGraphSectionStyle,
    paraGraphStyle
  } = ApplicationStyling(currenrCVData.WorkingExperience);

  return (

    <>
      <div style={sectionDivOuterStyle}>
        <div style={sectionInnerDivStyle}>
          <p className="section_title" id={thisClassName} style={paraGraphSectionStyle}>
            {/* Optional: section title */}
          </p>

          <div
           dangerouslySetInnerHTML={{ __html: currenrCVData.WorkingExperience.sectionContent }}
          />
        </div>
      </div>
    </>
  );
}

export default WorkingHistory; 