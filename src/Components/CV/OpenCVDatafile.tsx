import { useSearchParams } from 'react-router-dom';


function OpenCVDatafile(props: any) {
    
    const [searchParams] = useSearchParams();
    const cv_filename = searchParams.get('cvfilename');      
  //  const convertType = searchParams.get('converttype');
    const cvaction = searchParams.get('cvaction');

    let url = 'https://johnpetersendenmark.github.io/JohnPetersenCV/datafiles/' + cv_filename
  

    if (cvaction !== null && cvaction === 'opencv' && cv_filename !== null) {
        const response =  fetch(url);

        response.then(value => {
            let x = value;
            if (!x.ok) {
                props.SetCVdata(null);             
            }
        
            let data =  x.json();
            data.then( file_data => {
                props.SetCVdata(file_data);
            })
         })
    }
    // else{
    //     if (convertType !== null && convertType !== 'cv' ) {
    //         props.SetCVdata(null);     
    //     }
    // }

    return (
       <></>
    );

}


export default OpenCVDatafile;