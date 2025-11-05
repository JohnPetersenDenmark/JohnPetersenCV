

import { useApplicationData } from '../../GlobalData/GlobalApplicationDataContext';
import ApplicationStyling from '../Common/ApplicationStyling';

function EmployerInfo() {

  const { currentApplicationData, setCurrentApplicationData } = useApplicationData();

if (!currentApplicationData?.EmployerInfo) {
    return null; // safe guard
  }

const {
     sectionDivOuterStyle,
    sectionInnerDivStyle,
    paraGraphSectionStyle,
    paraGraphStyle
  } = ApplicationStyling(currentApplicationData.EmployerInfo);

// border: 1px solid rgb(204, 204, 204); border-radius: 8px; padding: 10px; font-weight: 700; font-size: 20px; box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 6px;
  return (

    // <div className='Applicaion_info_alignment'>
   
    <>
    <div style={sectionDivOuterStyle}>
      <div style={sectionInnerDivStyle}>
      <p className="section_title" id={currentApplicationData.EmployerInfo.thisClassName} style={paraGraphSectionStyle}> 
        {/* {currentApplicationData.EmployerInfo.sectionName} */}
      </p>
     

       <div
  dangerouslySetInnerHTML={{ __html: currentApplicationData.EmployerInfo.sectionContent }}
/>
     {/*  {currentApplicationData.EmployerInfo.entries.map((EmployerEntry) => (
        <>

          <p style={paraGraphStyle}>
            {EmployerEntry.name}
          </p>
          <p style={paraGraphStyle}>
            {EmployerEntry.AddressLine1}
          </p>
          <p style={paraGraphStyle}>
            {EmployerEntry.AddressLine2}
          </p>
          <p style={paraGraphStyle}>
            {EmployerEntry.zipcode}  {EmployerEntry.city}
          </p>
          <p style={paraGraphStyle}>
            {EmployerEntry.attention}
          </p>
         

        </>

      ))} */}
      </div>
</div>

     </>



  );
}

export default EmployerInfo; 