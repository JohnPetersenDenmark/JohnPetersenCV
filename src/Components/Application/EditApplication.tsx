import { CopyApplicationDataToNew } from '../../GlobalData/GlobalApplicationData';
import { useEffect, useRef } from 'react';
import { useState } from 'react';
import { useApplicationData } from '../../GlobalData/GlobalApplicationDataContext';
import { EmployerInfo, ApplicantInfo, ApplicantContent, ApplicationDate, ApplicationJobTitle, ApplicantContentHeadline } from '../../Classes/ClassesApplicationData';
import RichTextEditor from '../Common/RichTextEditor';
import "./EditApplication.css";
import { Pointer } from 'lucide-react';
/* import Customerinfo from './EmployerInfo';
import { ApplicantInfo as Applicant } from './ApplicantInfo';
import { ApplicationDate as ApplicationDatum } from './ApplicationDate';
import { ApplicationJobTitle as JobTitle } from './ApplicationJobTitle';
import { ApplicantContent as ApplicationContent } from './ApplicationContent'; */



function EditApplication() {

    const selectedSectionRef = useRef<string>();
    const { currentApplicationData, setCurrentApplicationData } = useApplicationData();
    const [sections, setSections] = useState<any[]>([])

    const [currentSectionData, setCurrentSectionData] = useState({} as ApplicantInfo | EmployerInfo | ApplicantContent | ApplicationDate | ApplicationJobTitle | ApplicantContentHeadline)
    const [selectedSectionClassName, setSelectedSectionClassName] = useState('')
    const [isPopupEditorOpen, setIsPopupEditorOpen] = useState(false);
    const [showCopyBackgroundColor, setShowCopyBackgroundColor] = useState(false);

    useEffect(() => {
        const onBeforeUnload = (event: BeforeUnloadEvent) => {
            // Prevent the user from leaving the page
            event.preventDefault();
        };

        window.addEventListener('beforeunload', onBeforeUnload);

    }, []);

    useEffect(() => {
        setSections(
            Object.entries(currentApplicationData).filter(
                ([key]) => key !== "ApplicantContentHeadline" && key !== "CssStyles"
            )
        );
    }, [currentApplicationData]);


    const appGrid = document.querySelector<HTMLDivElement>(".edit_content_app");

    if (appGrid) {
        // Find all <div> elements INSIDE that grid
        const backgroundColor = currentApplicationData?.CssStyles?.backgroundColor ?? "Blue";
        appGrid.style.backgroundColor = backgroundColor
    }


    const handleSectionClick = (sectionName: string) => {
        if (sectionName) {
            selectedSectionRef.current = sectionName;
            setSelectedSectionClassName(sectionName);
        }

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
        //  setShowCopyBackgroundColor(true);
    };

    const handleApplicationStyleChangeInput = (id: string, selectedColor: string) => {

       /*  if (selectedColor.length != 7) {
            return;
        } */

       /*  let colorNumberValue = selectedColor.replace("#", "")
        if (!isHex(colorNumberValue)) {
            return;
        } */
        let tmpCopyApplicationdata = CopyApplicationDataToNew(currentApplicationData);
        tmpCopyApplicationdata.CssStyles.backgroundColor = selectedColor;
        setCurrentApplicationData(tmpCopyApplicationdata);
        //  setShowCopyBackgroundColor(true);
    };

    function isHex(str: string): boolean {
        let y = /^[0-9a-fA-F]+$/.test(str)
        return (y)
    }

    function handleCopyBackgroundColor(selected: any) {
        if (selected === false) {
            return
        }

        let ApplicationBackgroundColor = currentApplicationData.CssStyles.backgroundColor

        let tmpCopyApplicationdata = CopyApplicationDataToNew(currentApplicationData);
        //tmpCopyApplicationdata.CssStyles.backgroundColor = selectedColor;

        for (let x = 0; x < sections.length; x++) {

            // @ts-ignore
            tmpCopyApplicationdata[sections[x][1].thisClassName].cssStyles.backgroundColor = ApplicationBackgroundColor
        }

        setCurrentApplicationData(tmpCopyApplicationdata)
    }

    if (currentApplicationData === null) {
        return (<></>);
    }

    return (

        <div className='edit_content'>

            <div className='edit_content_content'>
                <div className="flex gap-10 items-center">
                    <div >

                        <div className="text-black text-base">
                            Vælg ansøgningens baggrundsfarve
                        </div>
                        <div className="mt-5">
                            <input
                                className="w-[300px] h-24"
                                type="color"
                                value={currentApplicationData.CssStyles.backgroundColor}
                                onChange={(e) =>
                                    handleApplicationStyleChange("backgroundColor", e.target.value)
                                }

                            />
                        </div>
                    </div>

                    <div>
                        <div className="text-black text-base">
                            Angiv ansøgningens baggrundsfarve
                        </div>
                        <div className="text-black w-[300px]  mt-5 ">
                            <input
                                className="h-24 border-4  border-gray-300 "
                                type="text"
                                value={currentApplicationData.CssStyles.backgroundColor}
                                onChange={(e) =>
                                    handleApplicationStyleChangeInput("backgroundColor", e.target.value)
                                }
                            />
                        </div>
                    </div>

                    <div className="text-black">
                          <div className="text-black text-base">
                            Kopier baggrundsfarve til alle afsnint
                        </div>
                        <div>
                            <input
                                className="w-[20px] h-24 "
                                type="checkbox"
                                checked={showCopyBackgroundColor}
                                onChange={(e) => handleCopyBackgroundColor(e.target.checked)}
                            />

                        </div>
                    </div>
                </div>



                <div
                    style={{ backgroundColor: currentApplicationData.CssStyles.backgroundColor }}
                    className=""
                >

                    {sections.map(([key, section]) => (
                        <div className="border-2 border-black pl-5 pr-5 pt-0 pb-0 rounded-lg mb-10 mt-10 text-secondaryTextColor"
                            style={{
                                cursor: 'Pointer',
                                backgroundColor:  // @ts-ignore 
                                    currentApplicationData[section.thisClassName].cssStyles.backgroundColor
                            }}
                            onClick={e => handleSectionClick(section.thisClassName)}
                        >
                            {section.thisClassName}

                            <div
                                className="border-2 border-black pl-10 pr-10 pt-0 pb-0 rounded-lg mb-10  text-secondaryTextColor"
                                style={{
                                    whiteSpace: "normal",
                                    overflowWrap: "break-word",
                                    wordBreak: "break-word",
                                }}
                                dangerouslySetInnerHTML={{
                                    __html: section.sectionContent,
                                }}
                            />
                        </div>
                    ))}
                </div>


                {isPopupEditorOpen && (
                    <div className="popup-overlay">
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
                    </div>
                )}
            </div>
        </div>
    )
}

export default EditApplication