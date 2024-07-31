import { Hourglass } from 'react-loader-spinner';

function Spinner() {

let y = 2;

    return (
        <Hourglass
            visible={true}
            height="40"
            width="40"
            ariaLabel="hourglass-loading"
            wrapperStyle={{}}
            wrapperClass="spinner"
            colors={['#fff', '#00b8d7']}
        />

    )

}


export default Spinner