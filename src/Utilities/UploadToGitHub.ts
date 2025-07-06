
import { encode as base64_encode } from 'base-64';


async function UploadAsFileToGitHub(binaryContent: string, uploadAsFilename: string, sha: any) {

//let jpTokenFirstPart = process.env.REACT_APP_FIRST_PART as string
//let jpTokenSecondPart = process.env .REACT_APP_SECOND_PART as string

//let jpTokenFirstPart =   await getTokenPartOne() ;
//let jpTokenSecondPart = await getTokenPartTwo();

 //let jptokenFull = jpTokenFirstPart + jpTokenSecondPart;
  
 let jptokenFull = "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";  
 
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
        'Authorization': "Bearer " +  jptokenFull

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

 // let jpTokenFirstPart =   await getTokenPartOne() ;
//let jpTokenSecondPart = await getTokenPartTwo();

 //let jptokenFull = jpTokenFirstPart + jpTokenSecondPart;

 let jptokenFull = "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";  
 
  try {
    // const response = await fetch('https://api.github.com/repos/JohnPetersenDenmark/JohnPetersenCV/contents/datafiles/' + fileName, {
    const response = await fetch('https://api.github.com/repos/JohnPetersenDenmark/JohnPetersenCV/contents/datafiles/', {
      method: 'GET',
      headers: {      
        'Authorization': "Bearer " +  jptokenFull
      }
    }
    )
    let sha = "";

    let responseData: any[] = await response.json();

    const file = responseData.find(fileinfo => fileinfo.name === fileName);
    if (file) {
      sha = file.sha;
    }

    return sha;
 
  } catch (error) {

    console.log('There was an error', error);
  }
}

async  function getTokenPartOne () : Promise<string> {
  let url = 'https://johnpetersendenmark.github.io/JohnPetersenCV/datafiles/' + 'token_part1.txt'

  const response = await fetch(url);

  let responseData = await response.text();

  
  return (responseData.trim());

}

async  function getTokenPartTwo () : Promise<string> {
  let url = 'https://johnpetersendenmark.github.io/JohnPetersenCV/datafiles/' + 'token_part2.txt'

  const response = await fetch(url);

  let responseData = await response.text();

  
  return (responseData.trim());

}

export { UploadAsFileToGitHub }
export { GetSHAFromGitHub }