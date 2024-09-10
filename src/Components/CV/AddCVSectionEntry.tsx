import { ContactInfoEntry, CVData, EducationEntry, LanguageEntry, MotivationEntry, ProfileEntry, SkillEntry, SparetimeEntry, WorkingExperienceEntry } from "../../Classes/ClassesCVData";
import { SkillsSectionEntryLabels, WorkingExpirienceSectionEntryLabels, ProfileSectionEntryLabels, MotivationSectionEntryLabels } from "../../GlobalData/GlobalCVData";
import { EducationsSectionEntryLabels, LanguageSectionEntryLabels, SparetimeSectionEntryLabels, ContactInfoSectionEntryLabels } from "../../GlobalData/GlobalCVData";

import { SkillsSectionInputFields, ProfileSectionInputFields, MotivationInputFields, WorkingExpirienceInputFields } from "../../GlobalData/GlobalCVData";
import { EducationSectionInputFields, LanguageSectionInputFields, SparetimeSectionInputFields, ContactInfoInputFields } from "../../GlobalData/GlobalCVData";
import { useState, useEffect } from 'react';
import { ContactInfo, Sparetime, Skills, WorkingExperience, Languages, Educations, Motivation, Profile } from '../../Classes/ClassesCVData';

import { useNavigate } from "react-router-dom";


function AddCVSectionEntry(props: any) {



    let [sectionEntryElement, setSectionEntryElement] = useState({} as SkillEntry | MotivationEntry | WorkingExperienceEntry | ContactInfoEntry | LanguageEntry | SparetimeEntry | ProfileEntry | EducationEntry)
    let [elementIndex, setElementIndex] = useState(0)

    let currentSectionData = (props.currentSectionData) as Skills | Educations | ContactInfo | Sparetime | WorkingExperience | Languages | Motivation | Profile
    let selectedSectionClassName = props.selectedSectionClassName
    let action = props.action

    let newEntry: any;

    useEffect(() => {
        //let elementIndex;
        switch (selectedSectionClassName) {
            case 'Skills':
                newEntry = new SkillEntry("", 0, SkillsSectionEntryLabels, SkillsSectionInputFields, currentSectionData.entries.length)
                break;
            case 'Profile':
                newEntry = new ProfileEntry("", ProfileSectionEntryLabels, ProfileSectionInputFields, currentSectionData.entries.length)
                break;
            case 'Motivation':
                newEntry = new MotivationEntry("", MotivationSectionEntryLabels, MotivationInputFields, currentSectionData.entries.length)
                break;
            case 'WorkingExperience':
                newEntry = new WorkingExperienceEntry("", "", "", [], [], [], "", WorkingExpirienceSectionEntryLabels, WorkingExpirienceInputFields, currentSectionData.entries.length)
                break;
            case 'Educations':
                newEntry = new EducationEntry("", "", "", EducationsSectionEntryLabels, EducationSectionInputFields, currentSectionData.entries.length)
                break;
            case 'Languages':
                newEntry = new LanguageEntry("", "", LanguageSectionEntryLabels, LanguageSectionInputFields, currentSectionData.entries.length)
                break;
            case 'Sparetime':
                newEntry = new SparetimeEntry("", SparetimeSectionEntryLabels, SparetimeSectionInputFields, currentSectionData.entries.length)
                break;
            case 'ContactInfo':
                newEntry = new ContactInfoEntry("", "", "", ContactInfoSectionEntryLabels, ContactInfoInputFields, currentSectionData.entries.length)
                break;
            default:
                // 
                break;
        }

        // @ts-ignore  
        currentSectionData.entries.push(newEntry);
        let tmpIndex = currentSectionData.entries.length - 1
        setSectionEntryElement(currentSectionData.entries[tmpIndex]);
        setElementIndex(tmpIndex);
    }, []);


    const OnChangeEntry = (target: any) => {
        const CopyOfSectionEntryElement = {};
        const tmpSectionEntryElement = Object.assign(CopyOfSectionEntryElement, sectionEntryElement);

        // @ts-ignore  
        let noget = tmpSectionEntryElement[target.name]
        if (Array.isArray(noget)) {
            let tmpArray = target.value.split(",")
            // @ts-ignore  
            tmpSectionEntryElement[target.name] = tmpArray
        }
        else {
            // @ts-ignore  
            tmpSectionEntryElement[target.name] = target.value
        }

        // @ts-ignore  

        setSectionEntryElement(tmpSectionEntryElement);
    }


    const handleSubmit = (e: any) => {
        e.preventDefault();

        currentSectionData.entries[elementIndex] = sectionEntryElement;
        props.returnNewSectionData(currentSectionData)
    }

    const navigate = useNavigate();

    const handleBack = (e: any) => {
        e.preventDefault();

        currentSectionData.entries.splice(elementIndex, 1)

        props.setAction('edit');
    }


    return (
        <>
            <section className="card-row">
                <article className="card">
                    {// @ts-ignore 
                        sectionEntryElement ? Object.entries(sectionEntryElement).map((elementValue) => (
                            elementValue[0] !== 'labels' && elementValue[0] !== 'sectionEntryInput'  && elementValue[0] !== 'sortorder' ?

                                <>
                                    <h3>
                                        {sectionEntryElement.labels[elementValue[0]]}
                                    </h3>
                                    <p>
                                        {sectionEntryElement.sectionEntryInput && sectionEntryElement.sectionEntryInput[elementValue[0]].type === 'input'
                                            ?
                                            <input type="text"
                                                name={elementValue[0]}
                                                //  // @ts-ignore 
                                                value={elementValue[1]}
                                                onChange={(e) => OnChangeEntry(e.target)}

                                            >
                                            </input>
                                            :
                                            <textarea
                                                name={elementValue[0]}
                                                //  // @ts-ignore 
                                                // value={elementValue[1]}
                                                onChange={(e) => OnChangeEntry(e.target)}
                                            >
                                            </textarea>
                                        }
                                    </p>
                                </> : ""
                        )) : ""}
                </article>
                <button type="button" onClick={handleSubmit}>Gem</button>
                <button type="button" onClick={handleBack}>Tilbage</button>
            </section>
        </>
    )
}

export default AddCVSectionEntry