

import { useApplicationData } from '../../GlobalData/GlobalApplicationDataContext';

function EmployerInfo() {

  const { currentApplicationData, setCurrentApplicationData } = useApplicationData();

if (!currentApplicationData?.EmployerInfo) {
    return null; // safe guard
  }



  const paraGraphStyle: React.CSSProperties = {
  ...currentApplicationData.EmployerInfo.cssStyles,
   margin: 0
};

 const sectionStyle: React.CSSProperties = {
  ...currentApplicationData.EmployerInfo.cssStyles,
   margin: 0, fontSize : '18px', fontWeight : '700'
};

const sectionDivStyle: React.CSSProperties = {
  ...currentApplicationData.EmployerInfo.cssStyles,
   margin: 0, padding : '10px' , border : '1px', borderRadius : '8px' , fontWeight : '700'
};

// border: 1px solid rgb(204, 204, 204); border-radius: 8px; padding: 10px; font-weight: 700; font-size: 20px; box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 6px;
  return (

    // <div className='Applicaion_info_alignment'>
   
    <>
    <div style={sectionDivStyle}>
      <p className="section_title" id={currentApplicationData.EmployerInfo.thisClassName} style={sectionStyle}>
        {/* {currentApplicationData.EmployerInfo.sectionName} */}
      </p>
      {currentApplicationData.EmployerInfo.entries.map((EmployerEntry) => (
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

      ))}
</div>

     </>



  );
}

export default EmployerInfo; 