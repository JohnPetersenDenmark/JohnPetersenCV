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

    <>
    <ContactInfo />
    <Profile />
   <Motivation />
   <Skills />
   <Education />
   <Languages />
   <WorkingHistory />
   <Sparetime />
    </>
  );
}

export default CV;