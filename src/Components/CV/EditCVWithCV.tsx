import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CopyCVDataToNew, currenrCVData, setNewCurrentCVData, setCurrentCVData } from '../../GlobalData/GlobalCVData';
import { ContactInfo, Sparetime, Skills, WorkingExperience, Languages, Educations, Motivation, Profile } from '../../Classes/ClassesCVData';
import { ContactInfoEntry, EducationEntry, LanguageEntry, MotivationEntry, ProfileEntry, SkillEntry, SparetimeEntry, WorkingExperienceEntry } from "../../Classes/ClassesCVData";

import AddCVSectionEntry from './AddCVSectionEntry'
import { sortSectionEntries } from '../../Utilities/Misc'

import CV from './CV'
import UploadCVdataToGithub from '../CV/UploadCVdataToGithub'

function EditCVWithCV() {

    let [CVDataCopy, setCopyOfCVData] = useState(currenrCVData)
    let [currentSectionData, setCurrentSectionData] = useState({} as Skills | Educations | ContactInfo | Sparetime | WorkingExperience | Languages | Motivation | Profile)
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

        let tmpCopyCVdata = CopyCVDataToNew(CVDataCopy);

        let cv_section;
        // @ts-ignore   
        cv_section = tmpCopyCVdata[section_name];

        setCurrentSectionData(cv_section)

        setDragableEntries(cv_section.entries)

        console.log('Clicked!');
    };


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

        let tmpCopyCVdata = CopyCVDataToNew(CVDataCopy);

        let cv_section;
        // @ts-ignore   
        cv_section = tmpCopyCVdata[currentSectionData.thisClassName];

        // @ts-ignore   
        cv_section[targetField.name] = targetField.value;
        setCurrentSectionData(cv_section)
        setCopyOfCVData(tmpCopyCVdata);


    }

    const OnChangeEntry = (target: any, entryIndex: number) => {
        let tmpCopyCVdata = CopyCVDataToNew(CVDataCopy);

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
        setCopyOfCVData(tmpCopyCVdata)
    }

    // const navigate = useNavigate();

    const handleSave = (yesNoString: boolean) => {
        if (yesNoString) {

            let newCVdata = CopyCVDataToNew(CVDataCopy);
            setNewCurrentCVData(newCVdata);
            setCopyOfCVData(newCVdata);
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

        let tmpCopyCVdata = CopyCVDataToNew(CVDataCopy);

        let cv_section;
        // @ts-ignore   
        cv_section = tmpCopyCVdata[currentSectionData.thisClassName]

        cv_section.entries.splice(entryIndex, 1)

        setCopyOfCVData(tmpCopyCVdata)
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
                    {currentSectionData.entries && canBeSaved ?
                        <UploadCVdataToGithub CVdata={CVDataCopy}

                            SetupdateFlag={(updateYesNo: boolean) => {
                                handleSave(updateYesNo)
                            }
                            }
                        /> : ""}

                    <button className='download_button' type="button" onClick={handleGoBack}>Tilbage</button>
                </div>

                <div className='edit_content_content'>
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