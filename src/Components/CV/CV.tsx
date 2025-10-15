import Motivation from './Motivation';
import Profile from './Profile';
import ContactInfo from './ContactInfo';
import Skills from './Skills';
import Education from './Education';
import Languages from './Languages';
import WorkingHistory from './WorkingHistory';
import Sparetime from './Sparetime';

import { useCVData } from '../../GlobalData/GlobalCVDataContext';






function CV() {

  const { currenrCVData, setCurrentCVData } = useCVData();
  
  if (currenrCVData === null) {
    return (<></>);
  }

  return (

    <div className="cv_content">
     
      <div className="cv_header_contact_info">
        <ContactInfo />
      </div>
      <div className="cv_header">
        <Motivation />
      </div>
      <div className="cv_right">
        <Profile />
        <WorkingHistory />
      </div>
      <div className="cv_left">
        <Skills />
        <Education />
        <Languages />
        <Sparetime />
      </div>
    </div>
  );
}

export default CV;