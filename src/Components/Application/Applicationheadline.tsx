import { currentApplicationData } from '../../GlobalData/GlobalApplicationData';



function Applicationheadline() {

   

    return (
        <div>
          
                {currentApplicationData.ApplicantContent.headline}
       
        </div>
    );
}

export default Applicationheadline; 