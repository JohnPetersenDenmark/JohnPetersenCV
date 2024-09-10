import { EmployerInfo, ApplicantInfo, ApplicantContent } from '../../Classes/ClassesApplicationData';
import { ApplicantInfoEntry, ApplicantContentEntry , EmployerInfoEntry} from '../../Classes/ClassesApplicationData';
import { ApplicantInfoEntryLabels, ApplicantContentEntryLabels, EmployerEntryLabels } from '../../GlobalData/GlobalApplicationData';
import { ApplicantInfoInputFields, ApplicantContentInputFields, EmployerInputFields } from '../../GlobalData/GlobalApplicationData';
import { useState, useEffect } from 'react';

import { useNavigate } from "react-router-dom";

function AddSectionEntryApplication(props: any) {


    let [sectionEntryElement, setSectionEntryElement] = useState({} as ApplicantInfoEntry | ApplicantContentEntry | EmployerInfoEntry )
    let [elementIndex, setElementIndex] = useState(0)

    let currentSectionData = (props.currentSectionData) as ApplicantInfo | EmployerInfo | ApplicantContent 
    let selectedSectionClassName = props.selectedSectionClassName
    let action = props.action

    let newEntry: any;

    useEffect(() => {
        //let elementIndex;
        switch (selectedSectionClassName) {
            case 'ApplicantInfo':
                newEntry = new ApplicantInfoEntry("", "", "", currentSectionData.entries.length, ApplicantInfoEntryLabels, ApplicantInfoInputFields)
                break;
            case 'ApplicantContent':
                newEntry = new ApplicantContentEntry("", currentSectionData.entries.length, ApplicantContentEntryLabels, ApplicantContentInputFields)
                break;

            case 'EmployerInfo':
                newEntry = new EmployerInfoEntry("", "", "" , "" , "" , "", "", currentSectionData.entries.length, EmployerEntryLabels, EmployerInputFields)
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
                            elementValue[0] !== 'labels' && elementValue[0] !== 'sectionEntryInput' && elementValue[0] !== 'sortorder' ?

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



export default AddSectionEntryApplication