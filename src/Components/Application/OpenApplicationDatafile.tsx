import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';


function OpenApplicationDatafile(props: any) {

  //  let [newApplicationData, setNewApplicationData] = useState(null);

   // useEffect(() => {
 //       props.SetApplicationdata(newApplicationData); 
 //     }, []);


    const [searchParams] = useSearchParams();


    const application_filename = searchParams.get('applicationfilename');
    // const convertType = searchParams.get('converttype');
    
    const applAction = searchParams.get('applaction');


    let url = 'https://johnpetersendenmark.github.io/JohnPetersenCV/datafiles/' + application_filename;


    if (applAction !== null && applAction === 'openapplication' && application_filename !== null) {

        try {
            const response = fetch(url);

            response.then(value => {
                let x = value;
                if (!x.ok) {
                 //   props.SetApplicationdata(null);
                 //   setNewApplicationData(null)
                 props.SetApplicationdata(null);
                }

                let data = x.json();
                data.then(file_data => {
                  //  props.SetApplicationdata(file_data);
                  //  setNewApplicationData(file_data)
                    props.SetApplicationdata(file_data);
                })
            })
        } catch (error) {
            // TypeError: Failed to fetch
            console.log('There was an error', error);
        }
    }
    else{
        //props.SetApplicationdata(null);
      //  setNewApplicationData(null)
    }
    // else {
    //     if (convertType !== null && convertType !== 'application') {
    //         props.SetApplicationdata(null);
    //     }    
    // }

    return (
        <></>
    );

}


export default OpenApplicationDatafile;