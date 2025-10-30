import React, { useEffect, useRef, useState } from "react";
import { useApplicationData } from '../../GlobalData/GlobalApplicationDataContext';

const ApplicantInfo: React.FC = () => {

 const { currentApplicationData, setCurrentApplicationData } = useApplicationData();

 if (!currentApplicationData?.ApplicantInfo) {
    return null; // safe guard
  }

  const { thisClassName, entries } = currentApplicationData.ApplicantInfo;

  return (
  <>
      <p  className="section_title" id={thisClassName} style={currentApplicationData.ApplicantInfo.cssStyles}>
        {/* Optional: section title */}
      </p>

      {entries?.map((applicantInfo, index) => (
        <p key={index} style={currentApplicationData.ApplicantInfo.cssStyles}>{applicantInfo.description }</p>
      ))}
    </>
  );
};

export default ApplicantInfo;
