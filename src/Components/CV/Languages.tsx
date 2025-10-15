import { useCVData } from '../../GlobalData/GlobalCVDataContext';


function Languages() {

    const { currenrCVData, setCurrentCVData } = useCVData();

    return (
        <>         

                <p className="section_title" id={currenrCVData.Languages.thisClassName}>
             
                    {currenrCVData.Languages.sectionName}
                    </p>

                {currenrCVData.Languages.entries.map((languageEntry, index) => (

                    <div  key={index} className="language_entries_indent">
                        <p className='language_entry_title'>{languageEntry.language}</p>

                        <p className="language_entry_indent">{languageEntry.level}</p>
                    </div>
                ))}
                <hr className="section_ruler"></hr>
        </>
    );
}

export default Languages;