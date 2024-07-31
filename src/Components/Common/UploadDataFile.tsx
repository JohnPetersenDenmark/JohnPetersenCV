
// see documentation here: https://www.npmjs.com/package/use-file-picker#install

import { useFilePicker } from 'use-file-picker';
import { encode as base64_encode } from 'base-64';


function UploadDataFile() {
  const { openFilePicker, filesContent, loading } = useFilePicker({
    accept: '.txt', 
    multiple: false,

    // @ts-ignore    
    onFilesSuccessfullySelected: ({ plainFiles, filesContent }) => {     
      updateFile(plainFiles, filesContent)
    }
  });

  async function updateFile(plainFiles: any, filesContent: any) {
    let fileInfo = plainFiles[0];

    let sha = await getSHA(fileInfo.name);

    let fileContent: string = filesContent[0].content;
  
    const encoder = new TextEncoder();
    // 1: split the UTF-16 string into an array of bytes
    const charCodes = encoder.encode(fileContent);
    // 2: concatenate byte data to create a binary string
    // @ts-ignore   
    let binaryContent = String.fromCharCode(...charCodes)

    let requestbody = {
      "message": "Upload via github API",
      "content": base64_encode(binaryContent),
      "sha": sha
      //"content": "SmVnIHVwbG9hZGVy"
    }

    try {
      fetch('https://api.github.com/repos/JohnPetersenDenmark/JohnPetersenCV/contents/datafiles/' + fileInfo.name, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': "Bearer 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"
        },

        body: JSON.stringify(requestbody)

      }
      )
        .then(response => {
          let x = response.status
        })

    } catch (error) {
      // TypeError: Failed to fetch
      console.log('There was an error', error);
    }
  }

  async function getSHA(fileName: string) {

    try {
      const response = await fetch('https://api.github.com/repos/JohnPetersenDenmark/JohnPetersenCV/contents/datafiles/' + fileName, {
        method: 'GET',
        headers: {
          'Authorization': "Bearer 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"
        }
      }
      )
      let x = await response.json();
      let sha = x.sha;

      return sha;

    } catch (error) {
      // TypeError: Failed to fetch
      console.log('There was an error', error);
    }
  }


  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <button onClick={() => openFilePicker()}>Upload file to GitHub</button>
  )
}

export default UploadDataFile;