
import ApplicantInfo from './ApplicantInfo';
import Customerinfo from './EmployerInfo';
import ApplicationDate from './ApplicationDate';
import ApplicationJobTitle from './ApplicationJobTitle';
import ApplicationContent from './ApplicationContent';
import Applicationheadline from './Applicationheadline';


import { useApplicationData } from '../../GlobalData/GlobalApplicationDataContext';

function Application() {

    const { currentApplicationData, setCurrentApplicationData } = useApplicationData();

    if (currentApplicationData === null) {
        return (<></>);
    }

   

    return (

        <>
            <ApplicantInfo />
            <Customerinfo />
            <ApplicationJobTitle />
            <ApplicationDate />
            <ApplicationContent />
        </>

    );

}

export default Application;