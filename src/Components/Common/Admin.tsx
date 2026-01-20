

import SaveApplicationDataToFile from '../Application/SaveApplicationDataToFile'
import SaveCVDataToFile from '../CV/SaveCVDataToFile'
//import UploadFileToGitHub from './UploadFileToGitHub'


// import UploadApplicationdataToGithub from '../Application/UploadApplicationdataToGithub'

import GetApplicationFileLocal from '../Application/GetApplicationFileLocal'
import GetCVFileLocal from '../CV/GetCVFileLocal';




function DownloadDataFiles() {

    return (
        <div className='app_content'>
            <div className='app_content_content'>
                <div className='admin_content'>
                    <div className='admin_content_right'>
                        <SaveApplicationDataToFile />
                        <p>
                            Vælg ansøgning
                        </p>
                        {/* <GetApplicationFileLocal /> */}



                        <SaveCVDataToFile />

                        <p>
                            Vælg CV
                        </p>
                        <GetCVFileLocal />
                    </div>
                </div>
            </div>
        </div>

    )
}

export default DownloadDataFiles