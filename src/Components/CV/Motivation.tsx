import { useCVData } from '../../GlobalData/GlobalCVDataContext';

function Motivation() {
  
const { currenrCVData, setCurrentCVData } = useCVData();

  return (
    <>              
      <p className="section_title" id={currenrCVData.Motivation.thisClassName}>
     
        {currenrCVData.Motivation.sectionName}
        </p>
      <p style={{ lineHeight: '1.5' }}>{currenrCVData.Motivation.entries[0].description}</p>

    </>
  );
}

export default Motivation;