
import { useCVData } from '../../GlobalData/GlobalCVDataContext';


function SaveCVDataToFile() {

  const { currenrCVData, setCurrentCVData } = useCVData();

  let x = currenrCVData;

  let cv_as_json_string = JSON.stringify(currenrCVData);

  const blob = new Blob([cv_as_json_string], { type: "application/json" });

  function download_cv_as_json() {
    let cv_json_fileName = "cv.txt"
    const downloadLink = document.createElement("a");

    downloadLink.href = window.URL.createObjectURL(blob);


    downloadLink.download = cv_json_fileName;
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
        onClick={download_cv_as_json}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "Black")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#00b8d7")}
      >
        Gem CV
      </button>


    </>
  );

}

export default SaveCVDataToFile;

