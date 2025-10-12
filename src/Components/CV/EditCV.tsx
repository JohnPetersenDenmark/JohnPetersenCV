
import { CopyCVDataToNew, currenrCVData, setCurrentCVData_v2 } from '../../GlobalData/GlobalCVData';
import { useState } from 'react';
import { CVData, ContactInfo, Sparetime, Skills, WorkingExperience, Languages, Educations, Motivation, Profile, ContactInfoEntry } from '../../Classes/ClassesCVData';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Select from 'react-select'



function EditCV() {

    const [currentSectionData, setCurrentSectionData] = useState({} as Skills | Educations | ContactInfo | Sparetime | WorkingExperience | Languages | Motivation | Profile)
    const [CVDataCopy, setCopyOfCVdataData] = useState({} as CVData)
    const [selectedOption, setSelectedOption] = useState({});

    useEffect(() => {
        let TmpCopyOfCVdata = CopyCVDataToNew(currenrCVData);
        setCopyOfCVdataData(TmpCopyOfCVdata);
    }, []);

    const OnChangeSectionTitleContent = (targetField: any) => {


        let tmpCopyCVdata = CopyCVDataToNew(CVDataCopy);

        let cv_section;
        // @ts-ignore   
        cv_section = tmpCopyCVdata[currentSectionData.constructor.name];

        // @ts-ignore   
        cv_section[targetField.name] = targetField.value;
        setCopyOfCVdataData(tmpCopyCVdata);

    }

    const OnChangeEntry = (target: any, entryIndex: number) => {
        let x = target.value;
        let y = target.name

        let tmpCopyCVdata = CopyCVDataToNew(CVDataCopy);

        let cv_section;
        // @ts-ignore   
        cv_section = tmpCopyCVdata[currentSectionData.constructor.name]

        let tmpAA = currentSectionData.entries
        let sectionSelectedEntry = (currentSectionData.entries[entryIndex])

        // @ts-ignore       
        sectionSelectedEntry[target.name] = target.value
        // @ts-ignore   
        cv_section.entries[entryIndex] = sectionSelectedEntry;
        setCopyOfCVdataData(tmpCopyCVdata)
    }

    const SelectSection = () => {
        class OptionItem {
            value: any = ""
            label: string = ""
        }

        let options: OptionItem[] = [];
        Object.entries(CVDataCopy).forEach((item) => {
            let optionItem = new OptionItem();
            let gg = item[1].constructor.name
            optionItem.label = item[0]
            optionItem.value = item[1]
            options.push(optionItem);

        })

        const SelectSectionChanged = (option: any) => {

            setSelectedOption(option);
            let selectedSection = option.value
            setCurrentSectionData(selectedSection)
        }

        if (CVDataCopy === null) {
            return <></>
        }

        return (
            <Select
                value={selectedOption}
                options={options}
                defaultValue={options[0]}
                onChange={(values) => SelectSectionChanged(values)} />
        )
    }

    const navigate = useNavigate();

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setCurrentCVData_v2(CVDataCopy)
        navigate(-1);
    }

    return (

        
        // <div className='app_content'>
        //     <div className='app_content_content'>
        <form>
            <label>Afsnit </label>
            {CVDataCopy ? <SelectSection /> : ""}
            <p>
                {currentSectionData.sectionName ?
                    Object.entries(currentSectionData).map((elementValue) => (
                        elementValue[0] === 'sectionName' ?
                            <input type="text"
                                name={elementValue[0]}
                                value={elementValue[1]}
                                onChange={(e) => OnChangeSectionTitleContent(e.target)}>
                            </input>
                            : ""
                    ))
                    : ""
                }
            </p>

           

            {currentSectionData.entries ? (currentSectionData.entries).map((entry, entryIndex) => (
                <>
                    {entry ? Object.entries(entry).map((elementValue) => (
                        elementValue[0] !== 'labels' && elementValue[0] !== 'sectionEntryInput' ?
                            <div className='inputandlabeldiv'>
                                <div className='labeldiv'>
                                    <label>
                                        {entry.labels[elementValue[0]]}
                                    </label>
                                </div>
                                <div className='inputdiv'>
                                    {entry.sectionEntryInput && entry.sectionEntryInput[elementValue[0]].type === 'input'
                                        ?
                                        <input className='inputfield' type="text"
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
                                </div>
                            </div> : ""
                    )) : ""}

                </>
            )) : ""}
            <p>
                <button type="submit" onClick={handleSubmit}>Gem</button>
            </p>

    
        </form>
        //     </div>
        // </div>
    );
}
export default EditCV