

import Spinner from '../Common/Spinner'
import DownLoadApplicationButton from '../Application/DownLoadApplicationButton';
import { useState, useEffect } from 'react'
import { currentApplicationData } from '../../GlobalData/GlobalApplicationData';
import { useSearchParams } from 'react-router-dom';

function ConvertApplicationToPdf() {

    const [IsConverting, setIsConverting] = useState(false);

    const [searchParams] = useSearchParams();

    useEffect(() => {
        const application_filename = searchParams.get('applicationfilename');
        //const convertType = searchParams.get('converttype');
        const applAction = searchParams.get('applaction');
        let url_parameters = "";
        if (application_filename !== null && applAction != null) {
            url_parameters = '?applicationfilename=' + application_filename + '&' + 'applaction=' + applAction;
        }

        let url_to_convert = 'https://johnpetersendenmark.github.io/JohnPetersenCV/#/noconverttopdf/' + url_parameters + '&converttype=application';

        setIsConverting(true);

         //@ts-ignore    
         window.convertUrlToPDFGetData(url_to_convert, PDFdataAsBase64)

         //@ts-ignore    
       // window.convertUrlToWord(url_to_convert, PDFdataAsBase64);

        //

       //setTimeout(PDFdataAsBase64, 6000);


    }, []);

    if (currentApplicationData === null) {
        return (<></>);
    }



    function PDFdataAsBase64(dataUri: any) {


        let pdf_Content_element = document.getElementById('applicationpdf');
        if (pdf_Content_element !== null)
            pdf_Content_element.innerHTML = dataUri;
        setIsConverting(false);

    }



    return (


      <>
            {IsConverting ? "" : <DownLoadApplicationButton />}

            {IsConverting ? <Spinner /> : ""}
        </>
    )

}

export default ConvertApplicationToPdf