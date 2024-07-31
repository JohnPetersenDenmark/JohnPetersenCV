import { currentApplicationData } from '../../GlobalData/GlobalApplicationData';



function ApplicationJobTitle() {

   

    return (
        <div>            
                {currentApplicationData.ApplicateJobTitle}
        </div>
    );
}

export default ApplicationJobTitle; 