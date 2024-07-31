import   {currentApplicationData}  from '../../GlobalData/GlobalApplicationData';



function ApplicantInfo() {

 
 
  return (
    <div  className = 'Applicaion_info_alignment'>
      <p className="section_title">
        {currentApplicationData.ApplicantInfo.applicantname}
      </p>
      {currentApplicationData.ApplicantInfo.entries.map((contactInfoEntry) => ( 
        <div>
          <p>
            <span className='circle_little'>
              <span className={contactInfoEntry.icon}>
              </span> 
            </span>
            {(() => {
              switch (contactInfoEntry.type) {
                case "email": return  <span style={{ margin: '20' }}><a href={'mailto:' + contactInfoEntry.description }>{contactInfoEntry.description}</a></span>;             
                default: return  <span style={{ margin: '20' }}>{contactInfoEntry.description}</span>;
              }
            })()}           
          </p>
        </div>
      ))}

    </div>
  );
}

export default ApplicantInfo; 