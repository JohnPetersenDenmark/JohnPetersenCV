import { UploadAsFileToGitHub, GetSHAFromGitHub } from '../../Utilities/UploadToGitHub'
import { useState } from 'react';
import PromptYesNo from '../Common/PromptYesNo'
import PromptForTextInput from '../Common/PromptForTextInput'

function UploadApplicationdataToGithub(props: any) {
    const [sha, setSha] = useState("");
    const [binaryContent, setBinaryContent] = useState("");
    const [fileNameToUpload, setfileNameToUpload] = useState("Application.txt");
    const [showYesNoPrompts, setShowYesNoPrompt] = useState(false);
    const [showPromptFileName, setShowPromptFileName] = useState(true);

    async function uploadApplicationdata(fileName: string) {

        // let tmp_application_as_json_string = JSON.stringify(currentApplicationData);
        let tmp_application_as_json_string = JSON.stringify(props.applicationData);

        const encoder = new TextEncoder();
        // 1: split the UTF-16 string into an array of bytes
        const charCodes = encoder.encode(tmp_application_as_json_string);
        // 2: concatenate byte data to create a binary string
        // @ts-ignore   
        let tmpBinaryContent = String.fromCharCode(...charCodes)


        let tmpSha = await GetSHAFromGitHub(fileName);
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

    async function handleUserChoice(userChoice: string) {
        if (userChoice === 'yes') {
            await UploadAsFileToGitHub(binaryContent, fileNameToUpload, sha)
            props.SetupdateFlag(true)

        }

        setShowYesNoPrompt(false)
        setShowPromptFileName(true)
    }

    function handleUserInputFileNameChoice(userEnteredFileNameChoice: string) {
        if (userEnteredFileNameChoice !== '') {
            // setfileName(userenteredFileNameChoice);
            uploadApplicationdata(userEnteredFileNameChoice);
            setShowYesNoPrompt(false)
            props.SetupdateFlag(true)
        }
    }

    return (
        // <div className='save_app_dialog'>
        <div>                          
            {showPromptFileName ? <PromptForTextInput
                defaultValue={'Application.txt'}
                promptText={'Angiv fil-navn'}
                getUserTextInput={(enteredFileName: string) => {
                    handleUserInputFileNameChoice(enteredFileName)
                }
                }
            >
            </PromptForTextInput> : ""}

            {/* {showYesNoPrompts && sha !== "" ? <PromptYesNo */}
             {showYesNoPrompts && sha !== "" ? <PromptYesNo
                defaultValue={'yes'}
                promptText={fileNameToUpload + ' eksisterer allerede. Vil du overskrive filen?'}
                getUserChoice={(selectedValue: string) => {
                    handleUserChoice(selectedValue)
                }
                }
            >
            </PromptYesNo> : ""}
        </div>
    )
}

export default UploadApplicationdataToGithub