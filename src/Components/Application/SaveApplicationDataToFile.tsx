import { useApplicationData } from '../../GlobalData/GlobalApplicationDataContext';


function SaveApplicationDataToFile() {

     const { currentApplicationData, setCurrentApplicationData } = useApplicationData();
     
    if (currentApplicationData === null )
    {
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
            <p >
                Download aktuel ansøgning til din PC
            </p>
            <div className='admin_content_buttons'>
            <button className='admin_buttons' onClick={download_application_as_json}> Hent</button>
            </div>

        </>
    );
}


export default SaveApplicationDataToFile