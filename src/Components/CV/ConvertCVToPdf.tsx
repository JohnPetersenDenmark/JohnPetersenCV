import Spinner from '../Common/Spinner'
import DownLoadCVButton from './DownLoadCVButton'
import { useState , useEffect} from 'react'
import { useSearchParams } from 'react-router-dom';

function ConvertCVFromUrlToPdf() {

    const [IsConverting, setIsConverting] = useState(false);
    const [searchParams] = useSearchParams();

    const cv_filename = searchParams.get('cvfilename');   
    const cvaction = searchParams.get('cvaction');

    useEffect(() => {
        let url_parameters = "";

        if (cv_filename != null && cvaction != null) {
            url_parameters = '?cvfilename=' + cv_filename + '&' + 'cvaction=' + cvaction  + '&converttype=cv'
        }
        else{
             url_parameters = '?converttype=cv'
        }
      
        let url_to_convert = 'https://johnpetersendenmark.github.io/JohnPetersenCV/#/noconverttopdf/' + url_parameters;
    
        setIsConverting(true);

        // @ts-ignore    
        window.convertUrlToPDFGetData(url_to_convert, PDFdataAsBase64)               
    
         // setTimeout( PDFdataAsBase64, 5000);


      }, []); 

    function PDFdataAsBase64(dataUri: any) {

      
        let pdf_Content_element = document.getElementById('cvpdf');
        if (pdf_Content_element !== null)
            pdf_Content_element.innerHTML = dataUri;
        setIsConverting(false);
    }
 
 

    return (

       <>
            {IsConverting ? "" : <DownLoadCVButton />}

            {IsConverting ? <Spinner /> : ""}
        </>

    );

}

export default ConvertCVFromUrlToPdf