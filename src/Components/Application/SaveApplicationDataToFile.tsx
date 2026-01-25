import { useApplicationData } from '../../GlobalData/GlobalApplicationDataContext';
import { useState } from 'react';

function SaveApplicationDataToFile() {

    const { currentApplicationData, setCurrentApplicationData } = useApplicationData();
    const [fileName, setFileName] = useState("")

    if (currentApplicationData === null) {
        return (<></>);
    }

    let tmp = currentApplicationData;
    let Application_as_json_string = JSON.stringify(tmp);


   // const blob = new Blob([Application_as_json_string], { type: "application/json" });

    function download_application_as_json() {
    const blob = new Blob(
        [JSON.stringify(Application_as_json_string, null, 2)],
        { type: "application/json" }
    );


    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = fileName;


    document.body.appendChild(downloadLink);
    downloadLink.click();


    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(downloadLink.href);
}

/*  function download_application_as_json() {
     let application_json_fileName = "applicationjson.txt"
     const downloadLink = document.createElement("a");

     downloadLink.href = window.URL.createObjectURL(blob);


     downloadLink.download = application_json_fileName;
     downloadLink.click();
 } */


return (
    <>
     <div className="ml-5 mr-5">
                    <label htmlFor="svgheightsize">Height:</label>
                    <input
                      id="svgwidthsize"
                      type="text"
                      value={fileName}
                      onChange={(e) => setFileName(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "0.5rem",
                        marginTop: "0.25rem",
                        borderWidth: "1.5px",
                        borderStyle: "solid",
                        borderRadius: "4px",
                      }}
                    />
                  </div>
        <button
            style={{
                backgroundColor: "#00b8d7",  // Indigo blue
                color: "white",
                border: "3px solid",
                padding: "10px 20px",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: 500,
                boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                transition: "all 0.2s ease",

            }}
            onClick={download_application_as_json}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "Black")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#00b8d7")}
        >
            Gem ansøgning
        </button>
    </>
);
}


export default SaveApplicationDataToFile