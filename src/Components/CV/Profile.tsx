

import { useCVData } from '../../GlobalData/GlobalCVDataContext';


function Profile() {

const { currenrCVData, setCurrentCVData } = useCVData();

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