import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import PersonData from './components/DataGrids/PersonData';
import NotFound from './components/NotFound';
import TradeUnionData from './components/DataGrids/TradeUnionData';
import About from './components/About';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import 'devextreme/dist/css/dx.light.css';
import SignInSide from './components/SignIn';
import SignUp from './components/SignUp';
import { userSelector } from './redux/slices/user-slice';
import { useSelector } from 'react-redux';
import '@coreui/coreui/dist/css/coreui.min.css';

const App: React.FC = () => {
  const { user } = useSelector(userSelector);

  return (
    <BrowserRouter>
      <Routes>
        {user ? (
          <Route path="/" element={<MainLayout />}>
            <Route path="people" element={<PersonData />} />
            <Route path="unions" element={<TradeUnionData />} />
            <Route path="about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        ) : (
          <>
            <Route path="/register" element={<SignUp />} />
            <Route path="*" element={<SignInSide />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
