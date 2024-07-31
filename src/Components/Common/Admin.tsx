

import SaveApplicationDataToFile from '../Application/SaveApplicationDataToFile'
import SaveCVDataToFile from '../CV/SaveCVDataToFile'
import UploadCVDataFile from './UploadDataFile'



function DownloadDataFiles() {

    return (
        <div className='app_content'>
            <div className='app_content_content'>
                <SaveApplicationDataToFile />
                <SaveCVDataToFile />
                <UploadCVDataFile />
            </div>
        </div>
    )
}

export default DownloadDataFiles