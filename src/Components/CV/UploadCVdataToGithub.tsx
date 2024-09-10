import { currenrCVData } from '../../GlobalData/GlobalCVData';
import { UploadAsFileToGitHub, GetSHAFromGitHub } from '../../Utilities/UploadToGitHub'
import { useState } from 'react';
import PromptYesNo from '../Common/PromptYesNo'
import PromptForTextInput from '../Common/PromptForTextInput'

function UploadCVdataToGithub() {

    const [sha, setSha] = useState("");
    const [binaryContent, setBinaryContent] = useState("");
    const [fileNameToUpload, setfileNameToUpload] = useState("CV.txt");

   
   
    async function uploadCVdata(fileName : string) {

        let tmp_cv_as_json_string = JSON.stringify(currenrCVData);

        const encoder = new TextEncoder();
        // 1: split the UTF-16 string into an array of bytes
        const charCodes = encoder.encode(tmp_cv_as_json_string);
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
            }
        }
    }

    function handleUserChoice(userChoice: string) {
        if (userChoice === 'yes') {
            UploadAsFileToGitHub(binaryContent, fileNameToUpload, sha)
        }
    }

    function handleUserInputFileNameChoice(userEnteredFileNameChoice: string) {
        if (userEnteredFileNameChoice !== '') {
           // setfileName(userenteredFileNameChoice);
            uploadCVdata(userEnteredFileNameChoice);
        }
    }


    return (
        <>
              <p className='section_title'>
                Upload aktuelt CV til GitHub
            </p>
            {sha !== "" ? <PromptYesNo
                defaultValue={'yes'}
                promptText={' eksisterer allerede. Vil du overskrive filen?'}
                getUserChoice={(selectedValue: string) => {
                    handleUserChoice(selectedValue)
                }
                }
            >
            </PromptYesNo> : ""}

            {sha === "" ? <PromptForTextInput
                defaultValue={'cv.txt'}
                promptText={'Angiv fil-navn'}
                getUserTextInput={(enteredFileName: string) => {
                    handleUserInputFileNameChoice(enteredFileName)
                }
                }
            >
            </PromptForTextInput> : ""}





        </>


    )
}

export default UploadCVdataToGithub