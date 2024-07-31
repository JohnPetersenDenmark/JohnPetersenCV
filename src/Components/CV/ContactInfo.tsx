

import   {currenrCVData}  from '../../GlobalData/GlobalCVData';

function ContactInfo() {

 let tmpRefValue = 'www.dr.dk'
  return (
    <div>
      <p className="section_title">
        {currenrCVData.ContactInfo.sectionName}
      </p>
      {currenrCVData.ContactInfo.entries.map((contactInfoEntry) => (
        <div>
          <p>
            <span className='circle_little'>
              <span className={contactInfoEntry.icon}>
              </span> 
            </span>
            {(() => {
              switch (contactInfoEntry.type) {
                // case "email": return  <span style={{ margin: '20' }}><a href={'mailto:' + contactInfoEntry.description }>{contactInfoEntry.description}</a></span>;  
                //case "email": return  <span style={{ margin: '20' }}><a href={tmpRefValue}>{contactInfoEntry.description}</a></span>;             
                default: return  <span style={{ margin: '20' }}>{contactInfoEntry.description}</span>;
              } 
            })()}            
          </p>
        </div>
      ))}

    </div>
  );
}

export default ContactInfo; 