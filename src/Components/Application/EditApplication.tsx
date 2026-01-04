import { CopyApplicationDataToNew } from '../../GlobalData/GlobalApplicationData';

import { useEffect, useRef } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


import { useApplicationData } from '../../GlobalData/GlobalApplicationDataContext';

import SaveApplicationDataToFile from '../Application/SaveApplicationDataToFile'
import GetApplicationFileLocal from '../Application/GetApplicationFileLocal'

import Application from './Application'
import { EmployerInfo, ApplicantInfo, ApplicantContent, ApplicationDate, ApplicationJobTitle, ApplicantContentHeadline } from '../../Classes/ClassesApplicationData';
import { ApplicantInfoEntry, ApplicantContentEntry, ApplicationDateEntry, EmployerInfoEntry, ApplicationJobTitleEntry, ApplicantContentHeadlineEntry } from '../../Classes/ClassesApplicationData';

import SectionStyleEditor from '../Common/SectionStyleEditor';
import RichTextEditor from '../Common/RichTextEditor';
import TextToHtml from '../Common/TextToHtml';
import RichTextViewer from '../Common/RichTextViewer';

function EditApplication() {

    const selectedSectionRef = useRef<string>();
    const { currentApplicationData, setCurrentApplicationData } = useApplicationData();
    const [sectionDetails, setSectionDetails] = useState<string>('');

    const [currentSectionData, setCurrentSectionData] = useState({} as ApplicantInfo | EmployerInfo | ApplicantContent | ApplicationDate | ApplicationJobTitle | ApplicantContentHeadline)
    const [selectedSectionClassName, setSelectedSectionClassName] = useState('')

    const [selectedSectionRawData, setelectedSectionRawData] = useState('')

    const [fromDraggedEntry, setFromDraggedEntry] = useState({} as ApplicantInfoEntry | ApplicantContentEntry | ApplicationDateEntry | EmployerInfoEntry | ApplicationJobTitleEntry | ApplicantContentHeadlineEntry)
    //   let [action, setAction] = useState('edit')    
    const navigate = useNavigate();


    useEffect(() => {
        const onBeforeUnload = (event: BeforeUnloadEvent) => {
            // Prevent the user from leaving the page
            event.preventDefault();
        };

        window.addEventListener('beforeunload', onBeforeUnload);

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

    function goToPDFPage() {
        navigate("/reorderapp");
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

                        {/*   <div>
                                <p> from richtext editor </p>
                                {sectionDetails}
                            </div> */}

                        {/* <RichTextViewer html={sectionDetails} /> */}



                    </form>

                    <div style={{ marginTop: "1.5rem" }}>
                        {selectedSectionClassName ?
                            <RichTextEditor value={currentSectionData.sectionContent} onChange={handleRichTextEditorChange} readOnly={false} /> : ''}
                    </div>


                    {/* <TextToHtml htmlString={sectionDetails} /> */}
                </div>

                <div className='edit_content_app'>
                    <Application />
                </div>
            </div>

        </div> 

    )
}

export default EditApplication