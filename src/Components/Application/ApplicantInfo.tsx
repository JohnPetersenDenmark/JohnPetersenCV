import React, { useEffect, useRef, useState } from "react";
import { useApplicationData } from '../../GlobalData/GlobalApplicationDataContext';

const ApplicantInfo: React.FC = () => {

 const { currentApplicationData, setCurrentApplicationData } = useApplicationData();

 if (!currentApplicationData?.ApplicantInfo) {
    return null; // safe guard
  }

  const { thisClassName, entries } = currentApplicationData.ApplicantInfo;

  return (
    <div style={currentApplicationData.ApplicantInfo.cssStyles} >
      <p  className="section_title" id={thisClassName}>
        {/* Optional: section title */}
      </p>

      {entries?.map((applicantInfo, index) => (
        <p key={index}>{applicantInfo.description}</p>
      ))}
    </div>
  );
};

export default ApplicantInfo;
