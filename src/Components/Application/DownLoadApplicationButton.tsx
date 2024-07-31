
import { useSearchParams } from 'react-router-dom';

function DownLoadApplicationButton() {

    const [searchParams] = useSearchParams();
    const application_filename = searchParams.get('applicationfilename');

    function download_application() {
        let dataUri;

        let pdf_Content_element = document.getElementById('applicationpdf');
        if (pdf_Content_element === null)
            return (null);

        dataUri = pdf_Content_element.innerHTML;
        let pdfFileName = "Ansøgning.pdf"
        if (application_filename !== null) {
            pdfFileName = application_filename.replace(".txt", ".pdf")
        }

        const downloadLink = document.createElement("a");
        downloadLink.href = dataUri;
        downloadLink.download = pdfFileName;
        downloadLink.click();
    }

    return (
        <>        
            <button className='download_button' onClick={download_application}> Hent ansøgning </button>           
        </>
    );

}

export default DownLoadApplicationButton