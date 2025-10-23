

import { useApplicationData } from '../../GlobalData/GlobalApplicationDataContext';

function CustomerInfo() {

  const { currentApplicationData, setCurrentApplicationData } = useApplicationData();

if (!currentApplicationData?.EmployerInfo) {
    return null; // safe guard
  }

  return (

    // <div className='Applicaion_info_alignment'>
    <div style={currentApplicationData.EmployerInfo.cssStyles}>
      <p className="section_title" id={currentApplicationData.EmployerInfo.thisClassName}>
        {/* {currentApplicationData.EmployerInfo.sectionName} */}
      </p>
      {currentApplicationData.EmployerInfo.entries.map((EmployerEntry) => (
        <>

          <p>
            {EmployerEntry.name}
          </p>
          <p>
            {EmployerEntry.AddressLine1}
          </p>
          <p>
            {EmployerEntry.AddressLine2}
          </p>
          <p>
            {EmployerEntry.zipcode}  {EmployerEntry.city}
          </p>
          <p>
            {EmployerEntry.attention}
          </p>
         

        </>

      ))}


     </div>



  );
}

export default CustomerInfo; 