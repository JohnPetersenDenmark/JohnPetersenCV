import { useCVData } from '../../GlobalData/GlobalCVDataContext';
import ApplicationStyling from "../Common/ApplicationStyling";

function Motivation() {

  const { currenrCVData, setCurrentCVData } = useCVData();

  const { thisClassName, entries } = currenrCVData.Motivation;

  const {
    sectionDivOuterStyle,
    sectionInnerDivStyle,
    paraGraphSectionStyle,
    paraGraphStyle
  } = ApplicationStyling(currenrCVData.Motivation);

  return (

    <>
      <div style={sectionDivOuterStyle}>
        <div style={sectionInnerDivStyle}>
          <p className="section_title" id={thisClassName} style={paraGraphSectionStyle}>
            {/* Optional: section title */}
          </p>

          <div
           dangerouslySetInnerHTML={{ __html: currenrCVData.Motivation.sectionContent }}
          />
        </div>
      </div>
    </>
  );
}

export default Motivation;