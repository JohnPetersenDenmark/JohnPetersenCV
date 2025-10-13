import React, { useEffect, useRef, useState } from "react";
import { currentApplicationData } from '../../GlobalData/GlobalApplicationData';

const ApplicantInfo: React.FC = () => {

 if (!currentApplicationData?.ApplicantInfo) {
    return null; // safe guard
  }

  const { thisClassName, entries } = currentApplicationData.ApplicantInfo;

  return (
    <div>
      <p className="section_title" id={thisClassName}>
        {/* Optional: section title */}
      </p>

      {entries?.map((applicantInfo, index) => (
        <p key={index}>{applicantInfo.description}</p>
      ))}
    </div>
  );
};

export default ApplicantInfo;
