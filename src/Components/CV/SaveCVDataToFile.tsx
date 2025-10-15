
import { useCVData } from '../../GlobalData/GlobalCVDataContext';


function SaveCVDataToFile() {

const { currenrCVData, setCurrentCVData } = useCVData();

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
       <p className='section_title'>
            Download aktuelt CV til din PC
            </p>      
          <button className='admin_buttons' onClick={download_cv_as_json}> Hent</button>  
            
      </>
  );

}

export default SaveCVDataToFile;

