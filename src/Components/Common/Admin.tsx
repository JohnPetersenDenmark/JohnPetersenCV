

import SaveApplicationDataToFile from '../Application/SaveApplicationDataToFile'
import SaveCVDataToFile from '../CV/SaveCVDataToFile'
import UploadFileToGitHub from './UploadFileToGitHub'

import UploadCVdataToGithub from '../CV/UploadCVdataToGithub'

// import UploadApplicationdataToGithub from '../Application/UploadApplicationdataToGithub'
import { currentApplicationData } from '../../GlobalData/GlobalApplicationData';
import GetApplicationFileLocal from '../Application/GetApplicationFileLocal'




function DownloadDataFiles()   {

    return (
        <div className='app_content'>
            <div className='app_content_content'>
                <div className='admin_content'>
                    <div className='admin_content_right'>                      
                            <SaveApplicationDataToFile    />         
                            <GetApplicationFileLocal />                                
                           {/*  <SaveCVDataToFile />                     
                            <UploadCVdataToGithub />                                               
                            <UploadApplicationdataToGithub applicationData={currentApplicationData} />                                        
                            <UploadFileToGitHub />      */}                 
                    </div>
                </div>
            </div>
        </div>

    )
}

export default DownloadDataFiles