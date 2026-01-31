

import { useState, useRef, useEffect, useContext, } from 'react';
import { PageActionContext } from "../Common/PageActionContext";
import { useApplicationData } from '../../GlobalData/GlobalApplicationDataContext';
//import { useNavigationFlow } from '../Common/NavigationFlowContext';
import { useNavigate } from 'react-router-dom';

const GetApplicationFileLocal: React.FC = () => {

  const [fileContent, setFileContent] = useState("");
  const { setCurrentApplicationData } = useApplicationData();
  const navigate = useNavigate();
  // const { setFlowResult } = useNavigationFlow();

  const context = useContext(PageActionContext);
  const { action, setAction } = context ?? { action: null, setAction: () => { } };
const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (action === "GetApplicationFromFile") {
       fileInputRef.current?.click();
      setAction(null); // reset
      return
    }

  }, [action]);

  /*  useEffect(() => {
    // Open file picker immediately on mount
    fileInputRef.current?.click();
  }, []); */

 /*  function DoSomething() {
    let x = 1;
  } */

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return(<></>);

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result;
      if (typeof text === 'string') {
        try {
          const jsonData = JSON.parse(text); // 👈 Parse the JSON
          setCurrentApplicationData(jsonData);
          setFileContent(jsonData);
          navigate("/editapp")
          // handleSuccess();
          // navigate("/");

        } catch (error) {
          console.error('Invalid JSON file:', error);
          alert('The selected file does not contain valid JSON.');
        }
      }
    };
    reader.readAsText(file);
  };

  /* const handleSuccess = () => {
      setFlowResult('success');
    }; */

    if ( !fileInputRef)
      return(<></>);

  return (
    <>


    <div>
      <h1>Import ansøgning</h1>

      <input
        ref={fileInputRef}
        type="file"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </div>
  



     {/*  <label
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
 */}
    </>
  )
}

export default GetApplicationFileLocal