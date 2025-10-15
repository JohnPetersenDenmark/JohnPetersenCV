
import { useCVData } from '../../GlobalData/GlobalCVDataContext';

function ContactInfo() {

const { currenrCVData, setCurrentCVData } = useCVData();

  return (
    <>
  
      <p className="section_title" id={currenrCVData.ContactInfo.thisClassName}>
    
        {currenrCVData.ContactInfo.sectionName}
      </p>
      {currenrCVData.ContactInfo.entries.map((contactInfoEntry, index) => (
        <div key={index}>
          <p>
            <span className='circle_little'>
              <span className={contactInfoEntry.icon}>
              </span>
            </span>
            {(() => {
              switch (contactInfoEntry.type) {
                case "email": return <span style={{ margin: '20' }}><a href={'mailto:' + contactInfoEntry.description}>{contactInfoEntry.description}</a></span>;
                default: return <span style={{ margin: '20' }}>{contactInfoEntry.description}</span>;
              }
            })()}
          </p>
        </div>
      ))}
    </>

  );
}

export default ContactInfo; 