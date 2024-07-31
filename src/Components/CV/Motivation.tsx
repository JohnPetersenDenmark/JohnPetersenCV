import   {currenrCVData}  from '../../GlobalData/GlobalCVData';

function Motivation() {
  

  return (
    <div>
      <p className="section_title">{currenrCVData.Motivation.sectionName}</p>
      <p style={{ lineHeight: '1.5' }}>{currenrCVData.Motivation.entries[0].description}</p>
    </div>
  );
}

export default Motivation;