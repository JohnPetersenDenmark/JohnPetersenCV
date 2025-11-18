
import { useCVData } from '../../GlobalData/GlobalCVDataContext';
import ApplicationStyling from "../Common/ApplicationStyling";


function Sparetime() {

const { currenrCVData, setCurrentCVData } = useCVData();



  const { thisClassName, entries } = currenrCVData.Sparetime;

  const {
    sectionDivOuterStyle,
    sectionInnerDivStyle,
    paraGraphSectionStyle,
    paraGraphStyle
  } = ApplicationStyling(currenrCVData.Sparetime);

  return (

    <>
      <div style={sectionDivOuterStyle}>
        <div style={sectionInnerDivStyle}>
          <p className="section_title" id={thisClassName} style={paraGraphSectionStyle}>
            {/* Optional: section title */}
          </p>

          <div
           dangerouslySetInnerHTML={{ __html: currenrCVData.Sparetime.sectionContent }}
          />
        </div>
      </div>
    </>
  );
}

export default Sparetime; 