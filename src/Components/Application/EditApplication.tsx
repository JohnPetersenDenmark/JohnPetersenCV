import { copyOfCurrentApplicationData, CopyApplicationDataToNew, setNewCurrentApplicationData, setCurrentApplicationData } from '../../GlobalData/GlobalApplicationData';

import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Application from './Application'
import UploadApplicationdataToGithub from './UploadApplicationdataToGithub'
import { EmployerInfo, ApplicantInfo, ApplicantContent, ApplicationDate, ApplicationJobTitle, ApplicantContentHeadline } from '../../Classes/ClassesApplicationData';
import { ApplicantInfoEntry, ApplicantContentEntry, ApplicationDateEntry, EmployerInfoEntry, ApplicationJobTitleEntry, ApplicantContentHeadlineEntry } from '../../Classes/ClassesApplicationData';
import { sortSectionEntries } from '../../Utilities/Misc'

import AddApplicationSectionEntry from './AddSectionEntryApplication'

function EditApplication() {

    let [applicationDataCopy, setApplicationDataCopy] = useState(copyOfCurrentApplicationData)


    const [currentSectionData, setCurrentSectionData] = useState({} as ApplicantInfo | EmployerInfo | ApplicantContent | ApplicationDate | ApplicationJobTitle | ApplicantContentHeadline)
    const [selectedSectionClassName, setSelectedSectionClassName] = useState('')

    const [fromDraggedEntry, setFromDraggedEntry] = useState({} as ApplicantInfoEntry | ApplicantContentEntry | ApplicationDateEntry | EmployerInfoEntry | ApplicationJobTitleEntry | ApplicantContentHeadlineEntry)
    const [draggableEntries, setDragableEntries] = useState({} as ApplicantInfoEntry[] | ApplicantContentEntry[] | ApplicationDateEntry[] | EmployerInfoEntry[] | ApplicationJobTitleEntry[] | ApplicantContentHeadlineEntry[])

    let [action, setAction] = useState('edit')
    let [canBeSaved, setCanBeSaved] = useState(true)
    let [reRender, setReRender] = useState(0)
    let [dirtyFlag, setDirtyFlag] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {


        const onBeforeUnload = (event: BeforeUnloadEvent) => {
            // Prevent the user from leaving the page
            event.preventDefault();
            // alert("do you want to leave?")      

        };

        window.addEventListener('beforeunload', onBeforeUnload);


        const elements = Array.from(document.getElementsByClassName("section_title"));
        elements.forEach((element) => {
            let sectionClassName = element.id

            // @ts-ignore   
            let sectionValue = copyOfCurrentApplicationData[sectionClassName].sectionName
            element.innerHTML = sectionValue
            element.addEventListener('click', handleClick);
            element.classList.add("title_clickable");
        })

    }, []);

    const handleClick = (event: any) => {
        let section_name = event.target.id

        setSelectedSectionClassName(section_name);

        let tmpCopyApplicationdata = CopyApplicationDataToNew(applicationDataCopy);

        let application_section;
        // @ts-ignore   
        application_section = { ...tmpCopyApplicationdata[section_name] };

        setCurrentSectionData(application_section)

        setDragableEntries(application_section.entries)

        console.log('Clicked!');
    };

    const OnChangeSectionTitleContent = (targetField: any) => {

        let error_message = "";

        if (targetField.value === "") {
            error_message = 'feltet skal udfyldes'
            setCanBeSaved(false)
        }
        else {
            setCanBeSaved(true);
        }

        const elements = Array.from(document.getElementsByClassName("section-title-error"));
        elements.forEach((element) => {
            element.innerHTML = error_message;
            element.classList.add("title_clickable");
        })

        let tmpCopyApplicationdata = CopyApplicationDataToNew(applicationDataCopy);

        let application_section;
        // @ts-ignore   
        application_section = tmpCopyApplicationdata[currentSectionData.thisClassName];



        // @ts-ignore   
        application_section[targetField.name] = targetField.value;
        setApplicationDataCopy(tmpCopyApplicationdata);


    }

    const OnChangeEntry = (target: EventTarget & (HTMLInputElement | HTMLTextAreaElement), entryIndex: number) => {

        let tmpCopyApplicationdata = CopyApplicationDataToNew(applicationDataCopy);

        let application_section;
        // @ts-ignore   
        application_section = { ...tmpCopyApplicationdata[currentSectionData.thisClassName] }

        let sectionSelectedEntry = (application_section.entries[entryIndex])

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
        application_section.entries[entryIndex] = sectionSelectedEntry;
        setCurrentSectionData(application_section);
        setApplicationDataCopy(tmpCopyApplicationdata);
    }


    // const handleSubmit = (updateYesNo : boolean) => {     
    const handleSave = () => {
        // e.preventDefault();     


        let newApplicationdata = CopyApplicationDataToNew(applicationDataCopy);

        setNewCurrentApplicationData(newApplicationdata)
        setApplicationDataCopy(newApplicationdata);
        setCurrentApplicationData(newApplicationdata)
        // resetReloadDataFromFileFlag();
        // if (updateYesNo)   
        // {
        //     setReRender(reRender +1) 
        // }              
    }

    const handleSaveTemp = (yesNoString: boolean) => {
        if (yesNoString) {
            let newApplicationdata = CopyApplicationDataToNew(applicationDataCopy);

            setNewCurrentApplicationData(newApplicationdata)
            setApplicationDataCopy(newApplicationdata);
            setCurrentApplicationData(newApplicationdata)
            // resetReloadDataFromFileFlag();
        }
    }

    const handleAddEntry = (e: any) => {
        e.preventDefault();
        setAction('add');
    }
    const handleGoBack = () => {
        navigate(-1)
    }

    function doAddSection(newSectionData: any) {
        setCurrentSectionData(newSectionData);
        setAction('edit')
    }


    const handleDeleteEntry = (e: any, entryIndex: number) => {
        //  e.preventDefault();

        let tmpCopyApplicationdata = CopyApplicationDataToNew(applicationDataCopy);

        let application_section;
        // @ts-ignore   
        application_section = tmpCopyApplicationdata[currentSectionData.thisClassName]

        application_section.entries.splice(entryIndex, 1)

        setApplicationDataCopy(tmpCopyApplicationdata);
    }



    const handleDragStart: (entry: ApplicantInfoEntry | ApplicantContentEntry | ApplicationDateEntry | EmployerInfoEntry | ApplicationJobTitleEntry | ApplicantContentHeadlineEntry) => React.DragEventHandler<HTMLDivElement> = (entry) => (e) => {
        setFromDraggedEntry(entry)
        console.log('DragStart', entry, e)
    }

    const handleDragOver: (entry: ApplicantInfoEntry | ApplicantContentEntry | ApplicationDateEntry | EmployerInfoEntry | ApplicationJobTitleEntry | ApplicantContentHeadlineEntry) => React.DragEventHandler<HTMLDivElement> = (entry) => (e) => {
        e.preventDefault();
        console.log('DragEnter', entry, e)

    }

    const handleDrop: (entry: ApplicantInfoEntry | ApplicantContentEntry | ApplicationDateEntry | EmployerInfoEntry | ApplicationJobTitleEntry | ApplicantContentHeadlineEntry) => React.DragEventHandler<HTMLDivElement> = (entry) => (e) => {

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
                            <UploadApplicationdataToGithub applicationData={applicationDataCopy}

                                SetupdateFlag={(updateYesNo: boolean) => {
                                    handleSaveTemp(updateYesNo)
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

                                                        {currentSectionData.sectionNameLabel + 'aaa'}

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
                                                        selectedSectionClassName !== 'ApplicationDate' &&
                                                        selectedSectionClassName !== 'ApplicationJobTitle'
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
                        :
                        <AddApplicationSectionEntry
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
                <div className='edit_content_app'>
                    <Application />
                </div>
            </div>
        </div>
    )
}

export default EditApplication