import { CopyApplicationDataToNew } from '../../GlobalData/GlobalApplicationData';
import { useEffect, useRef } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApplicationData } from '../../GlobalData/GlobalApplicationDataContext';
import Application from './Application'
import { EmployerInfo, ApplicantInfo, ApplicantContent, ApplicationDate, ApplicationJobTitle, ApplicantContentHeadline } from '../../Classes/ClassesApplicationData';
import SectionStyleEditor from '../Common/SectionStyleEditor';
import RichTextEditor from '../Common/RichTextEditor';
import "./EditApplication.css";


function EditApplication() {

    const selectedSectionRef = useRef<string>();
    const { currentApplicationData, setCurrentApplicationData } = useApplicationData();

    const [currentSectionData, setCurrentSectionData] = useState({} as ApplicantInfo | EmployerInfo | ApplicantContent | ApplicationDate | ApplicationJobTitle | ApplicantContentHeadline)
    const [selectedSectionClassName, setSelectedSectionClassName] = useState('')
    const [isPopupEditorOpen, setIsPopupEditorOpen] = useState(false);

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
        setIsPopupEditorOpen(true);

    };

    const handleRichTextEditorChange = (editorHtml: string) => {

        const sectionClassName = selectedSectionRef.current;
        if (!sectionClassName) return;

        let tmpCopy = CopyApplicationDataToNew(currentApplicationData);
        // @ts-ignore   
        let application_section = tmpCopy[sectionClassName];

        application_section.sectionContent = editorHtml;
        // @ts-ignore   
        tmpCopy[sectionClassName] = application_section;

        setCurrentApplicationData(tmpCopy);
    };

    const handleStyleChange = (newBackgroundColor: string) => {

        let tmpCopyApplicationdata = CopyApplicationDataToNew(currentApplicationData);

        // @ts-ignore   
        let application_section = tmpCopyApplicationdata[selectedSectionClassName]
        application_section.cssStyles.backgroundColor = newBackgroundColor;
        // @ts-ignore   
        tmpCopyApplicationdata[selectedSectionClassName] = application_section
        setCurrentApplicationData(tmpCopyApplicationdata);
    };

    const handleApplicationStyleChange = (id: string, selectedColor: string) => {
        let tmpCopyApplicationdata = CopyApplicationDataToNew(currentApplicationData);
        tmpCopyApplicationdata.CssStyles.backgroundColor = selectedColor;
        setCurrentApplicationData(tmpCopyApplicationdata);
    };

    if (currentApplicationData === null) {
        return (<></>);
    }

    return (

        // <div>
        <div className='edit_content'>

            <div className='edit_content_content'>
                {/* <p>
                    Ansøgningens baggrundsfarve
                </p>
                <SectionStyleEditor
                    section={{

                        sectionId: 'aaaa',
                        cssStyles: currentApplicationData.CssStyles,
                    }}
                    onStyleChange={handleApplicationStyleChange}
                /> */}

                <div className="color-picker">
                    <label className="color-picker-label">
                        Ansøgningens baggrundsfarve
                    </label>


                    <div className="color-picker-control">
                        <input
                            type="color"
                            value={currentApplicationData.CssStyles.backgroundColor}
                            onChange={(e) =>
                                handleApplicationStyleChange("backgroundColor", e.target.value)
                            }
                            className="color-input"
                        />


                        <span className="color-value">
                            {currentApplicationData.CssStyles.backgroundColor}
                        </span>
                    </div>
                </div>

                <Application />

                {isPopupEditorOpen && (
                    <div className="popup-overlay">
                        {/* <div className="container"> */}
                        {/* <div className="popup-editor"> */}
                        <button
                            className="popup-close"
                            onClick={() => setIsPopupEditorOpen(false)}
                        >
                            ✕
                        </button>

                        <p>Afsnittets baggrundsfarve</p>

                        {selectedSectionClassName && (
                            <div className="color-picker-control">
                            <input
                                type="color"
                                value={
                                    // @ts-ignore
                                    currentApplicationData[selectedSectionClassName].cssStyles.backgroundColor
                                }
                                onChange={(e) => handleStyleChange(e.target.value)}
                                className="color-input"
                            />
                             <span className="color-value">
                                {  // @ts-ignore
                            currentApplicationData[selectedSectionClassName].cssStyles.backgroundColor}
                        </span>
                            </div>
                        )}

                        <div style={{ marginTop: "1.5rem" }}>
                            {selectedSectionClassName && (
                                <RichTextEditor
                                    // @ts-ignore
                                    value={currentApplicationData[selectedSectionClassName].sectionContent}
                                    onChange={handleRichTextEditorChange}
                                    readOnly={false}
                                />
                            )}
                        </div>
                        {/* </div> */}
                        {/* </div> */}
                    </div>
                )}


                {/*  {isPopupEditorOpen ?
                        <>
                            <p>
                                Afsnittets baggrundsfarve
                            </p>

                            {selectedSectionClassName &&
                                <input
                                    type="color"
                                    // @ts-ignore  
                                    value={currentApplicationData[selectedSectionClassName].cssStyles.backgroundColor}
                                    onChange={(e) => handleStyleChange(e.target.value)}
                                />
                            }

                            <div style={{ marginTop: "1.5rem" }}>
                                {selectedSectionClassName ?
                                    // @ts-ignore   
                                    <RichTextEditor value={currentApplicationData[selectedSectionClassName].sectionContent} onChange={handleRichTextEditorChange} readOnly={false} /> : ''}
                            </div>
                        </>
                        : ''} */}

            </div>
        </div>
        // </div>

    )
}

export default EditApplication