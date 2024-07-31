
import { currenrCVData } from '../../GlobalData/GlobalCVData';


function SaveCVDataToFile() {

    let x = currenrCVData;
  
  let cv_as_json_string = JSON.stringify (currenrCVData);

  const blob = new Blob([cv_as_json_string], { type: "application/json" });

  function download_cv_as_json () {
      let cv_json_fileName = "cv.txt"       
      const downloadLink = document.createElement("a");
    
      downloadLink.href = window.URL.createObjectURL(blob);

      
      downloadLink.download = cv_json_fileName;
      downloadLink.click();
  }
  

  return (
      <>        
          <button className='download_button' onClick={download_cv_as_json}> Hent CV datafil </button>           
      </>
  );

}

export default SaveCVDataToFile;

