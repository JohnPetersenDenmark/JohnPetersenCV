import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './Components/Common/Home';
import Admin from './Components/Common/Admin';
import Edit from './Components/CV/EditCV';
import EditCVWithCV from './Components/CV/EditCVWithCV';
import EditApplication from './Components/Application/EditApplication';
import ApplicationPDF from './Components/Application/ApplicationPDF';
import CVPdf from './Components/CV/CVPdf';
import { ApplicationDataProvider } from './GlobalData/GlobalApplicationDataContext';
import { CVDataProvider } from './GlobalData/GlobalCVDataContext';
import ReorderApplicationSections from './Components/Application/ReorderApplicationSections';

const _ = require('lodash');

function App() {
  const location = useLocation();
  const base_url = process.env.REACT_APP_BASE_URL as string;

  return (
    <ApplicationDataProvider>
      <CVDataProvider>
      <div className="App bg">
        <Routes location={location}>
          <Route path={base_url} element={<Home convert_to_pdf={true} />} />
          <Route path={`${base_url}noconverttopdf`} element={<Home convert_to_pdf={false} />} />
          <Route path={`${base_url}admin`} element={<Admin />} />
          <Route path={`${base_url}edit`} element={<Edit />} />
          <Route path={`${base_url}editcv`} element={<EditCVWithCV />} />
          <Route path={`${base_url}editapp`} element={<EditApplication />} />
          <Route path={`${base_url}apppdf`} element={<ApplicationPDF />} />
          <Route path={`${base_url}cvpdf`} element={<CVPdf />} />
            <Route path={`${base_url}reorderapp`} element={<ReorderApplicationSections />} />
        </Routes>
      </div>
        </CVDataProvider>
    </ApplicationDataProvider>
  );
}

export default App;
