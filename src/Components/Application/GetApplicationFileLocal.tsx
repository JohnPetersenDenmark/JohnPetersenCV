
import { useState } from 'react';
import { setCurrentApplicationData, CopyApplicationDataToNew, defaultApplicationData } from '../../GlobalData/GlobalApplicationData';


function GetApplicationFileLocal(props: any) {

    const [fileContent, setFileContent] = useState("");

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result;
      if (typeof text === 'string') {
        try {
          const jsonData = JSON.parse(text); // 👈 Parse the JSON
          setFileContent(jsonData);
          setCurrentApplicationData(jsonData); // 👈 Pass object, not string
      
        } catch (error) {
          console.error('Invalid JSON file:', error);
          alert('The selected file does not contain valid JSON.');
        }
      }
    };
    reader.readAsText(file);
  };


    return (
        <>
           
            <input type="file" accept=".txt" onChange={handleFileChange} />
        </>
    )
}

export default GetApplicationFileLocal