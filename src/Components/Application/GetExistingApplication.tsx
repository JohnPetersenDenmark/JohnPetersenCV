import GetApplicationFileLocal from "./GetApplicationFileLocal";
import { useApplicationData } from '../../GlobalData/GlobalApplicationDataContext';

export default function GetExistingApplication() {

    const { currentApplicationData, setCurrentApplicationData } = useApplicationData();

    function handleFileSelected (fileJSONcontent: any) {
       
        setCurrentApplicationData(fileJSONcontent);
    }

    

    return (
        <GetApplicationFileLocal  onChange={handleFileSelected} />
    )
}