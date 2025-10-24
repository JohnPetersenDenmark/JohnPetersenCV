
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

    let x = currentApplicationData;
    let y = x;

    return (
        <div className="application_content_grid">
            <>
                <div className="item1">
                    <p className="itemRight">
                        <ApplicantInfo />
                    </p>
                </div>
                <div className='itemX'></div>
                <div className='itemX'></div>
                <div className='itemX'></div>
                <div className="item2"><p className="itemLeft">
                    <Customerinfo />
                </p></div>
                <div className='itemX'></div>
                <div className='itemX'></div>
                <div className="item3"><p className="itemLeft jobtitle">
                    <ApplicationJobTitle />
                </p></div>
                <div className="item4"><p className="itemRight">
                    <ApplicationDate />
                </p></div>

                <div className='itemX'></div>
                <div className='itemX'></div>
                <div className="item5"><p className="itemLeft">
                    <ApplicationContent />
                </p></div>
                <div className='itemX'></div>
            </>
        </div>
    );

}

export default Application;