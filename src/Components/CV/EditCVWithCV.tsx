import { useEffect , useRef} from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CopyCVDataToNew, setNewCurrentCVData, } from '../../GlobalData/GlobalCVData';
import SectionStyleEditor from '../Common/SectionStyleEditor';
import GetCVFileLocal from './GetCVFileLocal';
import SaveCVDataToFile from './SaveCVDataToFile';

import { useCVData } from '../../GlobalData/GlobalCVDataContext';

import { ContactInfo, Sparetime, Skills, WorkingExperience, Languages, Educations, Motivation, Profile } from '../../Classes/ClassesCVData';
import { ContactInfoEntry, EducationEntry, LanguageEntry, MotivationEntry, ProfileEntry, SkillEntry, SparetimeEntry, WorkingExperienceEntry } from "../../Classes/ClassesCVData";

//import AddCVSectionEntry from './AddCVSectionEntry'
import { sortSectionEntries } from '../../Utilities/Misc'


import CV from './CV'


function EditCVWithCV() {

    const { currenrCVData, setCurrentCVData } = useCVData();
     const [sectionDetails, setSectionDetails] = useState<string>('');

    let [currentSectionData, setCurrentSectionData] = useState({} as Skills | Educations | ContactInfo | Sparetime | WorkingExperience | Languages | Motivation | Profile);
    const [selectedSectionClassName, setSelectedSectionClassName] = useState('')
    const [rerenderForce, setRerenderForce] = useState(0)

    const [fromDraggedEntry, setFromDraggedEntry] = useState({} as SkillEntry | MotivationEntry | WorkingExperienceEntry | ContactInfoEntry | LanguageEntry | SparetimeEntry | ProfileEntry | EducationEntry)
    const [draggableEntries, setDragableEntries] = useState({} as SkillEntry[] | MotivationEntry[] | WorkingExperienceEntry[] | ContactInfoEntry[] | LanguageEntry[] | SparetimeEntry[] | ProfileEntry[] | EducationEntry[])

    let [action, setAction] = useState('edit')
    let [canBeSaved, setCanBeSaved] = useState(true)
    const navigate = useNavigate();
     const selectedSectionRef = useRef<string>();



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
            let sectionValue = currenrCVData[sectionClassName].sectionName
            element.innerHTML = sectionValue
            element.addEventListener('click', handleClick);
            element.classList.add("title_clickable");
        })

    }, []);

    const appGrid = document.querySelector<HTMLDivElement>(".edit_content_app");

    if (appGrid) {
        // Find all <div> elements INSIDE that grid
        const backgroundColor = currenrCVData?.CssStyles?.backgroundColor ?? "Blue";
        appGrid.style.backgroundColor = backgroundColor
    }

    const handleClick = (event: any) => {
        const sectionName = event.target.id;

        selectedSectionRef.current = sectionName;
        setSelectedSectionClassName(sectionName);

        const tmpCopy = CopyCVDataToNew(currenrCVData);
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

        let tmpCopy = CopyCVDataToNew(currenrCVData);
        // @ts-ignore   
        let application_section = tmpCopy[sectionClassName];

        if (application_section.sectionContent === editorHtml) return;

        application_section.sectionContent = editorHtml;
        // @ts-ignore   
        tmpCopy[sectionClassName] = application_section;

         setSectionDetails(editorHtml);
        setCurrentCVData(tmpCopy);
       
    };

    function goToPDFPage() {
        navigate("/reordercv");
    }
   
    const handleStyleChange = (id: string, newStyle: React.CSSProperties) => {

        let tmpCopyApplicationdata = CopyCVDataToNew(currenrCVData);
        let application_section;
        // @ts-ignore   
        application_section = tmpCopyApplicationdata[currentSectionData.thisClassName]
        application_section.cssStyles = newStyle;
        setCurrentCVData(tmpCopyApplicationdata);
        setCurrentSectionData(application_section);
    };

    const handleApplicationStyleChange = (id: string, newStyle: React.CSSProperties) => {
        let tmpCopyApplicationdata = CopyCVDataToNew(currenrCVData);
        tmpCopyApplicationdata["CssStyles"] = newStyle
        setCurrentCVData(tmpCopyApplicationdata);
    };

    if (currenrCVData === null) {
        return (<></>);
    }

    return (

        <div>
            <div className='edit_content'>

                <div className='edit_content_content'>
                    <div style={{
                        marginBottom: '20px'
                    }}>
                        <GetCVFileLocal />
                    </div>
                    <div style={{
                        marginBottom: '20px'
                    }}>
                        <SaveCVDataToFile />
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
                            Convert CV to PDF
                        </button>
                    </div>

                    <p>
                        CV baggrundsfarve
                    </p>
                    <SectionStyleEditor
                        section={{

                            sectionId: 'aaaa',
                            cssStyles: currenrCVData.CssStyles,
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
                            <div>
                                {/*  <p> 
                                    Richtext editor
                                </p>
                                 */}

                               {/*  {selectedSectionClassName ?
                                    <CustomQuillEditor
                                        className="my-quill-editor"
                                        // @ts-ignore   
                                        value={currenrCVData[selectedSectionClassName].sectionContent}
                                        sectionClassName={selectedSectionClassName}
                                        onChange={handleRichTextEditorChange}
                                    />
                                    : ''} */}
                            </div>
                            {/*   <div>
                                <p> from richtext editor </p>
                                {sectionDetails}
                            </div> */}

                           
                        </form>                      
                </div>
                <div className='edit_content_app'>
                    <CV />
                </div>
            </div>
        </div>
    )
}




export default EditCVWithCV