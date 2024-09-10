

import { currenrCVData } from '../../GlobalData/GlobalCVData';


function Profile() {

  return (
    <>         
      <p className="section_title" id={currenrCVData.Profile.thisClassName}>
     
        {currenrCVData.Profile.sectionName}
      </p>
      <p style={{ lineHeight: 1.5 }}>{currenrCVData.Profile.entries[0].description}

      </p>

      <hr className="section_ruler"></hr>
    </>
  )
}

export default Profile;