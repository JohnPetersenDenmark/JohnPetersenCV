import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CopyCVDataToNew, setNewCurrentCVData, } from '../../GlobalData/GlobalCVData';

import { useCVData } from '../../GlobalData/GlobalCVDataContext';

import { ContactInfo, Sparetime, Skills, WorkingExperience, Languages, Educations, Motivation, Profile } from '../../Classes/ClassesCVData';
import { ContactInfoEntry, EducationEntry, LanguageEntry, MotivationEntry, ProfileEntry, SkillEntry, SparetimeEntry, WorkingExperienceEntry } from "../../Classes/ClassesCVData";

import AddCVSectionEntry from './AddCVSectionEntry'
import { sortSectionEntries } from '../../Utilities/Misc'
import GetCVFileLocal from './GetCVFileLocal';
import SaveCVDataToFile from './SaveCVDataToFile';
import CV from './CV'


function EditCVWithCV() {

    const { currenrCVData, setCurrentCVData } = useCVData();

    let [currentSectionData, setCurrentSectionData] = useState({} as Skills | Educations | ContactInfo | Sparetime | WorkingExperience | Languages | Motivation | Profile) ;
       const [selectedSectionClassName, setSelectedSectionClassName] = useState('')
    const [rerenderForce, setRerenderForce] = useState(0)

    const [fromDraggedEntry, setFromDraggedEntry] = useState({} as SkillEntry | MotivationEntry | WorkingExperienceEntry | ContactInfoEntry | LanguageEntry | SparetimeEntry | ProfileEntry | EducationEntry)
    const [draggableEntries, setDragableEntries] = useState({} as SkillEntry[] | MotivationEntry[] | WorkingExperienceEntry[] | ContactInfoEntry[] | LanguageEntry[] | SparetimeEntry[] | ProfileEntry[] | EducationEntry[])

    let [action, setAction] = useState('edit')
    let [canBeSaved, setCanBeSaved] = useState(true)
    const navigate = useNavigate();



    useEffect(() => {
        const elements = Array.from(document.getElementsByClassName("section_title"));
        elements.forEach((element) => {
            element.addEventListener('click', handleClick);
            element.classList.add("title_clickable");
        })

    }, []);

    const handleClick = (event: any) => {
        let section_name = event.target.id

        setSelectedSectionClassName(section_name);

      
        let cv_section;
        // @ts-ignore   
        cv_section = currenrCVData[section_name];
         setCurrentSectionData(cv_section)

        console.log('Clicked!');
    };


 function goToPDFPage() {

        navigate("/cvpdf");

    }

    const OnChangeSectionTitleContent = (targetField: any) => {

        let error_message = "";

        // if (targetField.value === "") {
        //     error_message = 'feltet skal udfyldes'
        //     setCanBeSaved(false)
        // }
        // else {
        //     setCanBeSaved(true);

        // }

        setCanBeSaved(true);

        const elements = Array.from(document.getElementsByClassName("section-title-error"));
        elements.forEach((element) => {
            element.innerHTML = error_message;
            element.classList.add("title_clickable");
        })

        let tmpCopyCVdata = CopyCVDataToNew(currenrCVData);

        let cv_section;
        // @ts-ignore   
        cv_section = tmpCopyCVdata[currentSectionData.thisClassName];

        // @ts-ignore   
        cv_section[targetField.name] = targetField.value;
        setCurrentSectionData(cv_section)
        setCurrentCVData(tmpCopyCVdata);


    }

    function updateSectionInCV(sectionData: any, index: number) {


        let newCVdata = CopyCVDataToNew(currenrCVData);
        // @ts-ignore     
        newCVdata[currentSectionData.thisClassName] = currentSectionData;
       // setNewCurrentCVData(newCVdata)

       
        setCurrentCVData(newCVdata)
    }

    const OnChangeEntry = (target: any, entryIndex: number) => {
        let tmpCopyCVdata = CopyCVDataToNew(currenrCVData);

        let cv_section;
        // @ts-ignore   
        cv_section = tmpCopyCVdata[currentSectionData.thisClassName]


        let sectionSelectedEntry = (currentSectionData.entries[entryIndex])

        // @ts-ignore 
        let noget = sectionSelectedEntry[target.name]

        // @ts-ignore             
        if (Array.isArray(noget)) {
            let tmpArray = target.value.split(",")
            // @ts-ignore  
            sectionSelectedEntry[target.name] = tmpArray
        }
        else {
            // @ts-ignore  
            sectionSelectedEntry[target.name] = target.value
        }

        // @ts-ignore   
        cv_section.entries[entryIndex] = sectionSelectedEntry;
        setCurrentSectionData(cv_section)
      
        setCurrentCVData(tmpCopyCVdata)
    }

    // const navigate = useNavigate();

    const handleSave = (yesNoString: boolean) => {
        if (yesNoString) {

            let newCVdata = CopyCVDataToNew(currenrCVData);
          //  setNewCurrentCVData(newCVdata);
            
            setCurrentCVData(newCVdata);
        }
    }

    const handleAddEntry = (e: any) => {
        e.preventDefault();
        setAction('add');
    }

    function doAddSection(newSectionData: any) {
        setCurrentSectionData(newSectionData);
        setAction('edit')
    }

    const handleGoBack = () => {
        navigate(-1)
    }


    const handleDeleteEntry = (e: any, entryIndex: number) => {
        //  e.preventDefault();

        let tmpCopyCVdata = CopyCVDataToNew(currenrCVData);

        let cv_section;
        // @ts-ignore   
        cv_section = tmpCopyCVdata[currentSectionData.thisClassName]

        cv_section.entries.splice(entryIndex, 1)

        setCurrentCVData(tmpCopyCVdata)
    }

    const handleDragStart: (entry: SkillEntry | MotivationEntry | WorkingExperienceEntry | ContactInfoEntry | LanguageEntry | SparetimeEntry | ProfileEntry | EducationEntry) => React.DragEventHandler<HTMLDivElement> = (entry) => (e) => {
        setFromDraggedEntry(entry)
        console.log('DragStart', entry, e)
    }

    const handleDragOver: (entry: SkillEntry | MotivationEntry | WorkingExperienceEntry | ContactInfoEntry | LanguageEntry | SparetimeEntry | ProfileEntry | EducationEntry) => React.DragEventHandler<HTMLDivElement> = (entry) => (e) => {
        e.preventDefault();
        console.log('DragEnter', entry, e)

    }

    const handleDrop: (entry: SkillEntry | MotivationEntry | WorkingExperienceEntry | ContactInfoEntry | LanguageEntry | SparetimeEntry | ProfileEntry | EducationEntry) => React.DragEventHandler<HTMLDivElement> = (entry) => (e) => {

        let toDraggedEntry = entry;

        let multiplyFactor = toDraggedEntry.sortorder >= fromDraggedEntry.sortorder ? -1 : 1;


        let newEntries = draggableEntries.map((dragableEntry) => {

            if (fromDraggedEntry.sortorder === dragableEntry.sortorder) {
                return {
                    ...dragableEntry,
                    sortorder: toDraggedEntry.sortorder
                }
            }
            else {
                let toDraggedEntryOrder = toDraggedEntry.sortorder * multiplyFactor;
                let fromDraggedEntryOrder = fromDraggedEntry.sortorder * multiplyFactor;
                let dragableItemOrder = dragableEntry.sortorder * multiplyFactor;

                if (dragableItemOrder >= toDraggedEntryOrder && dragableItemOrder < fromDraggedEntryOrder) {
                    return {
                        ...dragableEntry,
                        sortorder: dragableEntry.sortorder + (1 * multiplyFactor)
                    }
                }
                else {
                    return {
                        ...dragableEntry,
                    }
                }
            }
        })

        let sortedEntryList = sortSectionEntries(newEntries)
        setDragableEntries(sortedEntryList);
        currentSectionData.entries = sortedEntryList;
    }





    return (

        <div>
            <div className='edit_content'>
                <div className='edit_content_save'>


                    <button className='download_button' type="button" onClick={handleGoBack}>Tilbage</button>
                </div>

                <div className='edit_content_content'>
                    <div style={{
                           marginBottom : '20px'
                        }}>
                    <GetCVFileLocal />
                    </div>
                    <div style={{
                           marginBottom : '20px'
                        }}>
                    <SaveCVDataToFile />
                    </div>
 <div style={{
                           marginBottom : '20px'
                        }}>
                    <button
                        style={{
                            backgroundColor: "#00b8d7",  // Indigo blue
                            color: "white",
                            border: "3px solid",
                            padding: "10px 20px",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontSize: "16px",
                            fontWeight: 500,
                            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                            transition: "all 0.2s ease",

                        }}
                        onClick={(e) => goToPDFPage()}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "Black")}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#00b8d7")}
                    >
                        Convert to PDF
                    </button>
                    </div>

                    
                    {action === 'edit' ?
                        <form className='edit_form'>
                            <>
                                {currentSectionData ?
                                    Object.entries(currentSectionData).map((elementValue, index) => (
                                        elementValue[0] === 'sectionName' ?
                                            <section className="header-card-row ">
                                                {/* <section key={index} className="header-card-row "> */}
                                                <article className="header-card ">
                                                    <h3>

                                                        {currentSectionData.sectionNameLabel}

                                                    </h3>
                                                    <p>
                                                        <input type="text"
                                                            name={elementValue[0]}
                                                            value={elementValue[1]}
                                                            onChange={(e) => OnChangeSectionTitleContent(e.target)}>
                                                        </input>
                                                        <span className='section-title-error'>

                                                        </span>
                                                    </p>

                                                    {currentSectionData.entries &&
                                                        selectedSectionClassName !== 'Motivation' &&
                                                        selectedSectionClassName !== 'Profile' &&
                                                        selectedSectionClassName !== 'Sparetime'
                                                        ?
                                                        <button type="button" onClick={handleAddEntry}>Tilføj</button> : ""}
                                                </article>

                                            </section>
                                            : ""
                                    ))
                                    : ""
                                }

                            </>
                            {/* <div id='dropdiv'  onDrop={drop} onDragOver={allowDrop}> */}
                            <div id='dropdiv'  >

                                {currentSectionData.entries ? (currentSectionData.entries).map((entry, entryIndex) => (
                                    <>
                                        <section draggable onDragStart={handleDragStart(entry)} onDragOver={handleDragOver(entry)} onDrop={handleDrop(entry)} key={'sectionid' + entryIndex.toString()} className="card-row">

                                            <article className="card">
                                                {entry ? Object.entries(entry).map((elementValue) => (
                                                    elementValue[0] !== 'labels' && elementValue[0] !== 'sectionEntryInput' && elementValue[0] !== 'sortorder' ?
                                                        <>
                                                            <h3>
                                                                {entry.labels[elementValue[0]]}
                                                            </h3>
                                                            <p>
                                                                {entry.sectionEntryInput && entry.sectionEntryInput[elementValue[0]].type === 'input'
                                                                    ?
                                                                    <input type="text"
                                                                        name={elementValue[0]}
                                                                        value={elementValue[1]}
                                                                        onChange={(e) => OnChangeEntry(e.target, entryIndex)}>
                                                                    </input>
                                                                    :
                                                                    <textarea
                                                                        name={elementValue[0]}
                                                                        value={elementValue[1]}
                                                                        onChange={(e) => OnChangeEntry(e.target, entryIndex)}
                                                                    >
                                                                    </textarea>
                                                                }
                                                            </p>

                                                        </> : ""
                                                )) : ""}
                                                <button type="button" onClick={(e) => handleDeleteEntry(e.target, entryIndex)}>
                                                    Slet
                                                </button>
                                                <button type="button" onClick={(e) => updateSectionInCV(e.target, entryIndex)}>
                                                    Opdater
                                                </button>
                                            </article>
                                        </section>
                                    </>
                                )) : ""}
                            </div>

                        </form>
                        : <AddCVSectionEntry
                            currentSectionData={currentSectionData}
                            action={action}
                            selectedSectionClassName={selectedSectionClassName}
                            setAction={setAction}
                            returnNewSectionData={(newSectionData: any) => {
                                doAddSection(newSectionData)
                            }

                            }
                        />}
                </div>
                <div className='edit_content_cv'>
                    <CV />
                </div>
            </div>
        </div>
    );
}




export default EditCVWithCV