import React, { useEffect, useRef, useState } from "react";
import { useApplicationData } from '../../GlobalData/GlobalApplicationDataContext';
import ApplicationStyling from "../Common/ApplicationStyling";

export const ApplicantInfo: React.FC = () => {

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
          <p className="section_title" id={thisClassName} style={paraGraphSectionStyle}>
            {/* Optional: section title */}
          </p>

          <div
            dangerouslySetInnerHTML={{ __html: currentApplicationData.ApplicantInfo.sectionContent }}
          />
        </div>
      </div>
    </>
  );
};


