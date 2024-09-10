import { currentApplicationData } from '../../GlobalData/GlobalApplicationData';



function CustomerInfo() {

let x = currentApplicationData

  return (

    // <div className='Applicaion_info_alignment'>
    <div>
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
          <p>
            {EmployerEntry.city}
          </p>

        </>

      ))}


     </div>



  );
}

export default CustomerInfo; 