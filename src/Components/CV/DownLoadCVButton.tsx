
import { useState } from 'react';
import { Hourglass } from 'react-loader-spinner';
import { useSearchParams } from 'react-router-dom';


function DownLoadCVButton() {

    const [isDownloading, setIsDownloading] = useState(false);



    const [searchParams] = useSearchParams();
    const cv_filename = searchParams.get('cvfilename');

    function download_cv() {
        let dataUri;

        let pdf_Content_element = document.getElementById('cvpdf');
        if (pdf_Content_element === null)
            return (null);

        dataUri = pdf_Content_element.innerHTML;
        let pdfFileName = "cv.pdf"
        if (cv_filename !== null) {
            pdfFileName = cv_filename.replace(".txt", ".pdf")
        }

        const downloadLink = document.createElement("a");
        downloadLink.href = dataUri;
        downloadLink.download = pdfFileName;
        downloadLink.click();
    }

    return (
        <>
            <button className='download_button' onClick={download_cv}> Hent CV </button>
        </>


    );

    return (<></>)
}

export default DownLoadCVButton