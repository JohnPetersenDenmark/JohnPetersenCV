import { currentApplicationData } from '../../GlobalData/GlobalApplicationData';


function SaveApplicationDataToFile() {

    let Application_as_json_string = JSON.stringify (currentApplicationData);

    const blob = new Blob([Application_as_json_string], { type: "application/json" });

    function download_applivation_as_json () {
        let application_json_fileName = "applicationjson.txt"       
        const downloadLink = document.createElement("a");
      
        downloadLink.href = window.URL.createObjectURL(blob);


        downloadLink.download = application_json_fileName;
        downloadLink.click();
    }
    

    return (
        <>        
            <button className='download_button' onClick={download_applivation_as_json}> Hent ansøgning datafil </button>           
        </>
    );
}


export default SaveApplicationDataToFile