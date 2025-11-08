import { copyOfCurrentApplicationData, CopyApplicationDataToNew, setNewCurrentApplicationData } from '../../GlobalData/GlobalApplicationData';

import { useEffect, useRef } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';



import CustomQuillEditor from '../Common/RichtextEditorQuill';
import { useApplicationData } from '../../GlobalData/GlobalApplicationDataContext';

import SaveApplicationDataToFile from '../Application/SaveApplicationDataToFile'
import GetApplicationFileLocal from '../Application/GetApplicationFileLocal'

import Application from './Application'
// import UploadApplicationdataToGithub from './UploadApplicationdataToGithub'
import { EmployerInfo, ApplicantInfo, ApplicantContent, ApplicationDate, ApplicationJobTitle, ApplicantContentHeadline } from '../../Classes/ClassesApplicationData';
import { ApplicantInfoEntry, ApplicantContentEntry, ApplicationDateEntry, EmployerInfoEntry, ApplicationJobTitleEntry, ApplicantContentHeadlineEntry } from '../../Classes/ClassesApplicationData';
import { sortSectionEntries } from '../../Utilities/Misc'

import AddApplicationSectionEntry from './AddSectionEntryApplication'
import SectionStyleEditor from '../Common/SectionStyleEditor';

function EditApplication() {

    const selectedSectionRef = useRef<string>();


    const { currentApplicationData, setCurrentApplicationData } = useApplicationData();




    const [sectionDetails, setSectionDetails] = useState<string>('');

    const [sectionData, setSectionData] = useState<string>('');

    //let tmp = currentApplicationData

    const [currentSectionData, setCurrentSectionData] = useState({} as ApplicantInfo | EmployerInfo | ApplicantContent | ApplicationDate | ApplicationJobTitle | ApplicantContentHeadline)
    const [selectedSectionClassName, setSelectedSectionClassName] = useState('')

    const [fromDraggedEntry, setFromDraggedEntry] = useState({} as ApplicantInfoEntry | ApplicantContentEntry | ApplicationDateEntry | EmployerInfoEntry | ApplicationJobTitleEntry | ApplicantContentHeadlineEntry)
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

        /*  const tmpCopy = CopyApplicationDataToNew(currentApplicationData);
         if (selectedSectionRef.current) {
             let selectedsec = selectedSectionRef.current
             // @ts-ignore   
             const application_section = tmpCopy[selectedsec];
 
             setSectionData( application_section.sectionContent)
 
 
         } */



    }, []);

    useEffect(() => {

        const elements = Array.from(document.getElementsByClassName("section_title"));
        elements.forEach((element) => {
            let sectionClassName = element.id

            // @ts-ignore   
            let sectionValue = currentApplicationData[sectionClassName].sectionName
            element.innerHTML = sectionValue
            element.addEventListener('click', handleClick);
            element.classList.add("title_clickable");
        })

    }, []);

    const appGrid = document.querySelector<HTMLDivElement>(".edit_content_app");

    if (appGrid) {
        // Find all <div> elements INSIDE that grid
        const backgroundColor = currentApplicationData?.CssStyles?.backgroundColor ?? "Blue";
        appGrid.style.backgroundColor = backgroundColor
    }

    const handleClick = (event: any) => {
        const sectionName = event.target.id;

        selectedSectionRef.current = sectionName;
        setSelectedSectionClassName(sectionName);

        const tmpCopy = CopyApplicationDataToNew(currentApplicationData);
        // @ts-ignore   
        const application_section = tmpCopy[sectionName];

        //    setSectionData( application_section.sectionContent)

        //   setCurrentApplicationData(tmpCopy);

        setCurrentSectionData(application_section);
        setSectionDetails(application_section.sectionContent);
    };

    const handleRichTextEditorChange = (editorHtml: string) => {
        const sectionClassName = selectedSectionRef.current;
        if (!sectionClassName) return;

        let tmpCopy = CopyApplicationDataToNew(currentApplicationData);
        // @ts-ignore   
        let application_section = tmpCopy[sectionClassName];

        if (application_section.sectionContent === editorHtml) return;

        application_section.sectionContent = editorHtml;
        // @ts-ignore   
        tmpCopy[sectionClassName] = application_section;

        setSectionDetails(editorHtml);
        setCurrentApplicationData(tmpCopy);
        // setCurrentSectionData(application_section);
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

        let tmpCopyApplicationdata = CopyApplicationDataToNew(currentApplicationData);

        let application_section;
        // @ts-ignore   
        application_section = tmpCopyApplicationdata[currentSectionData.thisClassName];



        // @ts-ignore   
        application_section[targetField.name] = targetField.value;
        setCurrentApplicationData(tmpCopyApplicationdata);


    }

    const OnChangeEntry = (target: EventTarget & (HTMLInputElement | HTMLTextAreaElement), entryIndex: number) => {

        let tmpCopyApplicationdata = CopyApplicationDataToNew(currentApplicationData);

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
        setCurrentApplicationData(tmpCopyApplicationdata);
    }



    const handleSave = (yesNoString: boolean) => {
        if (yesNoString) {
            let newApplicationdata = CopyApplicationDataToNew(currentApplicationData);

            setNewCurrentApplicationData(newApplicationdata)
            setCurrentApplicationData(newApplicationdata);
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

    function updateSectionInApplication(sectionData: any, index: number) {

        let newApplicationdata = CopyApplicationDataToNew(currentApplicationData);
        setNewCurrentApplicationData(newApplicationdata)
        setCurrentApplicationData(newApplicationdata);

    }

    function goToPDFPage() {

        navigate("/reorderapp");

    }

    const handleDeleteEntry = (e: any, entryIndex: number) => {
        //  e.preventDefault();

        let tmpCopyApplicationdata = CopyApplicationDataToNew(currentApplicationData);

        let application_section;
        // @ts-ignore   
        application_section = tmpCopyApplicationdata[currentSectionData.thisClassName]

        application_section.entries.splice(entryIndex, 1)

        setCurrentApplicationData(tmpCopyApplicationdata);
    }

    const handleStyleChange = (id: string, newStyle: React.CSSProperties) => {

        let tmpCopyApplicationdata = CopyApplicationDataToNew(currentApplicationData);
        let application_section;
        // @ts-ignore   
        application_section = tmpCopyApplicationdata[currentSectionData.thisClassName]
        application_section.cssStyles = newStyle;

        setCurrentApplicationData(tmpCopyApplicationdata);

        setCurrentSectionData(application_section);


    };

    const handleApplicationStyleChange = (id: string, newStyle: React.CSSProperties) => {

        let tmpCopyApplicationdata = CopyApplicationDataToNew(currentApplicationData);

        tmpCopyApplicationdata["CssStyles"] = newStyle

        setCurrentApplicationData(tmpCopyApplicationdata);


    };


    const headLine: string = "jjjjjj";


    if (currentApplicationData === null) {
        return (<></>);
    }

    return (

        <div>
            <div className='edit_content'>

                <div className='edit_content_content'>
                    <div style={{
                        marginBottom: '20px'
                    }}>
                        <GetApplicationFileLocal />
                    </div>
                    <div style={{
                        marginBottom: '20px'
                    }}>
                        <SaveApplicationDataToFile />
                    </div>
                    <div style={{
                        marginBottom: '20px'
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
                            Convert ansøgning to PDF
                        </button>
                    </div>

                    <p>
                        Ansøgningens baggrundsfarve
                    </p>
                    <SectionStyleEditor
                        section={{

                            sectionId: 'aaaa',
                            cssStyles: currentApplicationData.CssStyles,
                        }}
                        onStyleChange={handleApplicationStyleChange}
                    />


                    {action === 'edit' ?
                        <form className='edit_form'>
                            {selectedSectionClassName ?
                                <>
                                    <p>
                                        Afsnittets baggrundsfarve
                                    </p>
                                    <SectionStyleEditor
                                        section={{

                                            sectionId: selectedSectionClassName,
                                            cssStyles: currentSectionData.cssStyles,
                                        }}
                                        onStyleChange={handleStyleChange}
                                    /> </> : ''}
                            <div>
                                {/*  <p> 
                                    Richtext editor
                                </p>
                                 */}

                                {selectedSectionClassName ?
                                    <CustomQuillEditor
                                        className="my-quill-editor"
                                        // @ts-ignore   
                                        value={currentApplicationData[selectedSectionClassName].sectionContent}
                                        sectionClassName={selectedSectionClassName}
                                        onChange={handleRichTextEditorChange}
                                    />
                                    : ''}
                            </div>
                            {/*   <div>
                                <p> from richtext editor </p>
                                {sectionDetails}
                            </div> */}

                            {/*                             <div id='dropdiv'  >

                                {currentSectionData.entries ? (currentSectionData.entries).map((entry, entryIndex) => (
                                    <>
                                        <section key={'sectionid' + entryIndex.toString()} className="card-row">

                                            <article className="card">
                                                {entry ? Object.entries(entry).map((elementValue) => (
                                                    elementValue[0] !== 'labels' && elementValue[0] !== 'sectionEntryInput' && elementValue[0] !== 'sortorder' ?
                                                        <>
                                                            <h3>
                                                                {entry.labels[elementValue[0]]}
                                                            </h3>
                                                            <p >

                                                                {entry.sectionEntryInput && entry.sectionEntryInput[elementValue[0]].type === 'input'
                                                                    ?
                                                                    <input type="text"
                                                                        style={currentSectionData.cssStyles}
                                                                        name={elementValue[0]}
                                                                        value={elementValue[1]}
                                                                        onChange={(e) => OnChangeEntry(e.target, entryIndex)}>
                                                                    </input>
                                                                    :
                                                                    <textarea
                                                                        style={currentSectionData.cssStyles}
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

                                                <button type="button" onClick={(e) => updateSectionInApplication(e.target, entryIndex)}>
                                                    Opdater
                                                </button>
                                            </article>
                                        </section>
                                    </>
                                )) : ""}
                            </div> */}

                        </form>
                        :
                        ''}
                </div>
                <div className='edit_content_app'>
                    <Application />
                </div>
            </div>
        </div>
    )
}

export default EditApplication