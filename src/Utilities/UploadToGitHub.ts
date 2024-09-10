
import { encode as base64_encode } from 'base-64';


async function UploadAsFileToGitHub (binaryContent : string, uploadAsFilename : string , sha : any) {

  let github_access_token = process.env.REACT_APP_GITHUB_ACCESS_TOKEN as string
  
    let requestbody = {
        "message": "Upload via github API",
        "content": base64_encode(binaryContent),
        "sha": sha
        //"content": "SmVnIHVwbG9hZGVy"
      }

    try {
        fetch('https://api.github.com/repos/JohnPetersenDenmark/JohnPetersenCV/contents/datafiles/' + uploadAsFilename, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + github_access_token
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

async function GetSHAFromGitHub(fileName: string) {

  let github_access_token = process.env.REACT_APP_GITHUB_ACCESS_TOKEN as string
  

    try {
      // const response = await fetch('https://api.github.com/repos/JohnPetersenDenmark/JohnPetersenCV/contents/datafiles/' + fileName, {
        const response = await fetch('https://api.github.com/repos/JohnPetersenDenmark/JohnPetersenCV/contents/datafiles/' , {  
      method: 'GET',
        headers: {
          'Authorization': "Bearer " + github_access_token
        }
      }
      )
      let sha = "";

      let responseData :any[] = await response.json();
     
       const file = responseData.find(fileinfo => fileinfo.name === fileName);
      if (file) {
         sha = file.sha;
      }
     
      return sha;

    } catch (error) {
      // TypeError: Failed to fetch
      console.log('There was an error', error);
    }
  }

export  {UploadAsFileToGitHub}
export  {GetSHAFromGitHub}