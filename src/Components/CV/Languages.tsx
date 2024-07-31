import   {currenrCVData}  from '../../GlobalData/GlobalCVData';

function Education() {


    return (
        <div>
            <p className="section_title">{currenrCVData.Languages.sectionName}</p>

            {currenrCVData.Languages.entries.map((languageEntry) => (

                <div className="language_entries_indent">
                    <p className='language_entry_title'>{languageEntry.language}</p>
                 
                    <p className="language_entry_indent">{languageEntry.level}</p>                  
                </div>
            ))}
            <hr className="section_ruler"></hr>
        </div>
    );
}

export default Education;