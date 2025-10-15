
import { useState } from 'react';
import { useCVData } from '../../GlobalData/GlobalCVDataContext';


function GetCVFileLocal(props: any) {

    const [fileContent, setFileContent] = useState("");
const { currenrCVData, setCurrentCVData } = useCVData();
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
           setCurrentCVData(jsonData); // 
      
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

export default GetCVFileLocal