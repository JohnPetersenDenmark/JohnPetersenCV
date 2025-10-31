import React, { useEffect, useRef, useState } from "react";
import { useApplicationData } from '../../GlobalData/GlobalApplicationDataContext';
import ApplicationStyling from "../Common/ApplicationStyling";

const ApplicantInfo: React.FC = () => {

 const { currentApplicationData, setCurrentApplicationData } = useApplicationData();

 if (!currentApplicationData?.ApplicantInfo) {
    return null; 
  }

  const { thisClassName, entries } = currentApplicationData.ApplicantInfo;

  const {
     sectionDivOuterStyle,
    sectionInnerDivStyle,
    paraGraphSectionStyle,
    paraGraphStyle
  } = ApplicationStyling(currentApplicationData.ApplicantInfo);

  return (
  <>
  <div style={sectionDivOuterStyle}>
      <div style={sectionInnerDivStyle}>
      <p  className="section_title" id={thisClassName} style={paraGraphSectionStyle}>
        {/* Optional: section title */}
      </p>

      {entries?.map((applicantInfo, index) => (
        <p key={index} style={paraGraphStyle}>{applicantInfo.description }</p>
      ))}
      </div>
      </div>
    </>
  );
};

export default ApplicantInfo;
