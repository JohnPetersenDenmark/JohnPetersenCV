import { useApplicationData } from '../../GlobalData/GlobalApplicationDataContext';
import { useState,  useEffect, useContext, } from 'react';
import { PageActionContext } from "../Common/PageActionContext";

function SaveApplicationDataToFile() {
  const { currentApplicationData } = useApplicationData();
  const [fileName, setFileName] = useState("application.txt");

  const context = useContext(PageActionContext);
const { action, setAction } = context ?? { action: null, setAction: () => {} };

   useEffect(() => {
    if (action === "SaveToFile") {
      download_application_as_text()  
      setAction(null); // reset
    }
     
  }, [action]);
  
  if (!currentApplicationData) return null;

  function download_application_as_text() {
    const text = JSON.stringify(currentApplicationData, null, 2); // pretty text

    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = fileName.endsWith(".txt") ? fileName : `${fileName}.txt`;

    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  return (
    <>
      <div className="bg-blue ml-5 mr-5"> 
        <p >File name:</p>
        <input
          type="text"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          style={{ width: "100%", padding: "0.5rem" }}
        />
      </div>

     {/*  <button onClick={download_application_as_text}>
        Gem ansøgning
      </button> */}
    </>
  );
}

export default SaveApplicationDataToFile;