

import   {currenrCVData}  from '../../GlobalData/GlobalCVData';
 

function Profile() {
 
    return (  
    <div>
      <p className="section_title">
      {currenrCVData.Profile.sectionName}
      </p>
      <p style={{lineHeight: 1.5}}>{currenrCVData.Profile.entries[0].description}

      </p>
      
      <hr className="section_ruler"></hr>     
    </div> 
    )
  } 
   
  export default Profile;