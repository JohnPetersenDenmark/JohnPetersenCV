import { currenrCVData } from '../../GlobalData/GlobalCVData';
import { UploadAsFileToGitHub, GetSHAFromGitHub } from '../../Utilities/UploadToGitHub'
import { useState } from 'react';
import PromptYesNo from '../Common/PromptYesNo'
import PromptForTextInput from '../Common/PromptForTextInput'

function UploadCVdataToGithub(props: any) {

    const [sha, setSha] = useState("");
    const [binaryContent, setBinaryContent] = useState("");
    const [fileNameToUpload, setfileNameToUpload] = useState("CV.txt");
    const [showYesNoPrompts, setShowYesNoPrompt] = useState(false);
    const [showPromptFileName, setShowPromptFileName] = useState(true);
    const [showError , setShowError] = useState(false);

   
   
    async function uploadCVdata(fileName : string) {

        //let tmp_cv_as_json_string = JSON.stringify(currenrCVData);

        let tmp_cv_as_json_string = JSON.stringify(props.CVdata);

        const encoder = new TextEncoder();
        // 1: split the UTF-16 string into an array of bytes
        const charCodes = encoder.encode(tmp_cv_as_json_string);
        // 2: concatenate byte data to create a binary string
        // @ts-ignore   
        let tmpBinaryContent = String.fromCharCode(...charCodes)

       
        let tmpSha = await GetSHAFromGitHub(fileName);
        if ( tmpSha === undefined)
        {
            setShowError(true);
            return("");
        }
        if (tmpSha === '') {
            UploadAsFileToGitHub(tmpBinaryContent, fileName, tmpSha)
           
        }
        else {
            if (tmpSha) {
                setfileNameToUpload(fileName)
                setSha(tmpSha);
                setBinaryContent(tmpBinaryContent);
                setShowYesNoPrompt(true)
                setShowPromptFileName(false)
            }
        }
    }

    function handleUserChoice(userChoice: string) {
        if (userChoice === 'yes') {
            UploadAsFileToGitHub(binaryContent, fileNameToUpload, sha)
            props.SetupdateFlag(true)
        }

        setShowYesNoPrompt(false)
        setShowPromptFileName(true)
    }

    function handleUserInputFileNameChoice(userEnteredFileNameChoice: string) {
        if (userEnteredFileNameChoice !== '') {
           // setfileName(userenteredFileNameChoice);
            uploadCVdata(userEnteredFileNameChoice);
            setShowYesNoPrompt(false)
            props.SetupdateFlag(true)
        }
    }


    return (
        <div>                          
        {showPromptFileName ? <PromptForTextInput
            defaultValue={'CVData.txt'}
            promptText={'Angiv fil-navn'}
            getUserTextInput={(enteredFileName: string) => {
                handleUserInputFileNameChoice(enteredFileName)
            }
            }
        >
        </PromptForTextInput> : ""}

      
         {showYesNoPrompts && sha !== "" ? <PromptYesNo
            defaultValue={'yes'}
            promptText={fileNameToUpload + ' eksisterer allerede. Vil du overskrive filen?'}
            getUserChoice={(selectedValue: string) => {
                handleUserChoice(selectedValue)
            }
            }
        >
        </PromptYesNo> : ""}

        {showError ? <div style={{color : "red"}}>Error getting sha</div> : ""} 
    </div>
    )
}

export default UploadCVdataToGithub