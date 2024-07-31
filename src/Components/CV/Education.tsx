import   {currenrCVData}  from '../../GlobalData/GlobalCVData';

function Education() {


    return (
        <div>
            <p className="section_title">{currenrCVData.Educations.sectionName}</p>

            {currenrCVData.Educations.entries.map((educationEntry) => (

                <div className="education_entries_indent">
                    <p className='education_entry_title'>{educationEntry.title}</p>
                    <p className="education_entry_indent">{educationEntry.todate}</p>
                    <p className="education_entry_indent">{educationEntry.location}</p>                  
                </div>
            ))}
       <hr className="section_ruler"></hr>
        </div>
    );
} 

export default Education;