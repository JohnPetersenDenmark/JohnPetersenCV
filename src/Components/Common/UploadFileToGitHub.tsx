
// see documentation here: https://www.npmjs.com/package/use-file-picker#install

import { useFilePicker } from 'use-file-picker';
import { UploadAsFileToGitHub, GetSHAFromGitHub } from '../../Utilities/UploadToGitHub'
import { useState } from 'react';
import PromptYesNo from './PromptYesNo'


function UploadFileToGitHub() {
  const [sha, setSha] = useState("");
  const [fileName, setFileName] = useState("");
  const [binaryContent, setBinaryContent] = useState("");


  async function updateFile(plainFiles: any, filesContent: any) {
    let fileInfo = plainFiles[0];


    let fileContent: string = filesContent[0].content;

    setFileName(fileInfo.name);

    const encoder = new TextEncoder();
    // 1: split the UTF-16 string into an array of bytes
    const charCodes = encoder.encode(fileContent);
    // 2: concatenate byte data to create a binary string
    // @ts-ignore   
    let tmpBinaryContent = String.fromCharCode(...charCodes)

    setBinaryContent(tmpBinaryContent);

    let tmpSha = await GetSHAFromGitHub(fileInfo.name);

    if (tmpSha === '') {
      UploadAsFileToGitHub(tmpBinaryContent, fileInfo.name, tmpSha)
    }
    else {
      if (tmpSha) {
        setSha(tmpSha);
      }
    }
  }

  const { openFilePicker, filesContent, loading } = useFilePicker({
    accept: '.txt',
    multiple: false,

    // @ts-ignore    
    onFilesSuccessfullySelected: ({ plainFiles, filesContent }) => {
      updateFile(plainFiles, filesContent)
    }
  });

  function handleUserChoice(userChoice: string) {
    if (userChoice === 'yes') {
      UploadAsFileToGitHub(binaryContent, fileName, sha)
    }

    setSha('');
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      
      <p className='section_title'>
      Upload fil til GitHub
      </p>
        <button className='admin_buttons' onClick={() => openFilePicker()}>Upload</button>
     
      <p>
        {sha !== "" ? <PromptYesNo
          defaultValue={'yes'}
          promptText={fileName + ' eksisterer allerede. Vil du overskrive filen?'}
          getUserChoice={(selectedValue: string) => {
            handleUserChoice(selectedValue)
          }
          }
        >
        </PromptYesNo> : ""}
      </p>
    </>
  )
}


export default UploadFileToGitHub