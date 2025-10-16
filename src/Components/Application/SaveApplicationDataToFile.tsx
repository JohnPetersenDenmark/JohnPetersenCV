import { useApplicationData } from '../../GlobalData/GlobalApplicationDataContext';


function SaveApplicationDataToFile() {

    const { currentApplicationData, setCurrentApplicationData } = useApplicationData();

    if (currentApplicationData === null) {
        return (<></>);
    }

    let tmp = currentApplicationData;
    let Application_as_json_string = JSON.stringify(tmp);


    const blob = new Blob([Application_as_json_string], { type: "application/json" });

    function download_application_as_json() {
        let application_json_fileName = "applicationjson.txt"
        const downloadLink = document.createElement("a");

        downloadLink.href = window.URL.createObjectURL(blob);


        downloadLink.download = application_json_fileName;
        downloadLink.click();
    }


    return (
        <>
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