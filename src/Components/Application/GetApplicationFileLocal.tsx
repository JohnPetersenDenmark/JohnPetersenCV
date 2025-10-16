
import { useState } from 'react';
import { useApplicationData } from '../../GlobalData/GlobalApplicationDataContext';

function GetApplicationFileLocal(props: any) {

  const [fileContent, setFileContent] = useState("");
  const { setCurrentApplicationData } = useApplicationData();

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
          setCurrentApplicationData(jsonData);

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

      <label
        htmlFor="fileUpload"
        style={{
          backgroundColor: "#00b8d7",
          color: "white",
          border: "3px solid",
          padding: "10px 20px",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: 500,
          boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
          transition: "all 0.2s ease",
          display: "inline-block",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "black")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#00b8d7")}
      >
        Hent ansøgning
        <input
          id="fileUpload"
          type="file"
          accept=".txt"
          onChange={handleFileChange}
          style={{ display: "none" }} // hide the native file input
        />
      </label>

    </>
  )
}

export default GetApplicationFileLocal