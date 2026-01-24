import { Routes, Route } from 'react-router-dom';

import EditApplication from './Components/Application/EditApplication';
import { ApplicationDataProvider } from './GlobalData/GlobalApplicationDataContext';
import { CVDataProvider } from './GlobalData/GlobalCVDataContext';
import ReorderApplicationSections from './Components/Application/ReorderApplicationSections';
import GetApplicationFileLocal from './Components/Application/GetApplicationFileLocal';
import { NavigationFlowProvider } from './Components/Common/NavigationFlowContext';
import MainLayout from './Components/Common/MainLayout';
import './index.css'

const _ = require('lodash');

function App() {
  const base_url = process.env.REACT_APP_BASE_URL as string;

  return (
    <NavigationFlowProvider>
      <ApplicationDataProvider>
        <CVDataProvider>
          <Routes>
            <Route path={base_url} element={<MainLayout />}>
              <Route index element={<EditApplication />} />
              <Route path="getapplication" element={<GetApplicationFileLocal />} />
              <Route path="editapp" element={<EditApplication />} />
              <Route path="reorderapp" element={<ReorderApplicationSections />} />
            </Route>
          </Routes>
        </CVDataProvider>
      </ApplicationDataProvider>
    </NavigationFlowProvider>
  );
}

export default App;
