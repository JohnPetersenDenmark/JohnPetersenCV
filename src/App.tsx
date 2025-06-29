
import Home from './Components/Common/Home'
import Admin from './Components/Common/Admin'
import Edit from './Components/CV/EditCV'
import EditCVWithCV from './Components/CV/EditCVWithCV'
import EditApplication from './Components/Application/EditApplication'

 
import { Routes, Route, useLocation } from 'react-router-dom';


var _ = require('lodash' );

 
function App() {

  const location = useLocation();
  //console.log(location);

  let base_url = process.env.REACT_APP_BASE_URL as string
 // console.log('BaseUrl ' + base_url);


  return (
    <div className="App bg">
      <Routes>
        <Route path={base_url} element={<Home convert_to_pdf={true} />} />
        <Route path={base_url + "noconverttopdf"} element={<Home convert_to_pdf={false} />} />  
        <Route path={base_url + "admin"} element={<Admin/>} />  
        <Route path={base_url + "edit"} element={<Edit/>} />       
        <Route path={base_url + "editcv"} element={<EditCVWithCV/>} />  
         <Route path={base_url + "editapp"} element={<EditApplication/>} />   
        
      </Routes>
    </div>
  );
}

export default App;
