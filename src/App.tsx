import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import PersonData from './components/DataGrids/PersonData';
import NotFound from './components/NotFound';
import TradeUnionData from './components/DataGrids/TradeUnionData';
import About from './components/About';
import SignInSide from './components/SignIn';
import SignUp from './components/SignUp';
import { signIn, signInWithToken, userSelector } from './redux/slices/user-slice';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from './redux/store';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import 'devextreme/dist/css/dx.light.css';
import '@coreui/coreui/dist/css/coreui.min.css';
import { getTokenFromLocalStorage } from './redux/utils/redux-utils';
import CustomLoadingIndicator from './components/LoadingIndicator';
import {
  mainContentRenderSelector,
  setRendered,
} from './redux/slices/localStates/main-content-rendered-slice';
import styles from './components/LoadingIndicator/customLoadingDiv.module.scss';
import { UsersData } from './components/DataGrids/UsersData';
import MainContent from './components/Main';

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { rendered } = useSelector(mainContentRenderSelector);
  const { user } = useSelector(userSelector);

  React.useEffect(() => {
    if (getTokenFromLocalStorage()) {
      dispatch(signInWithToken(getTokenFromLocalStorage() as string));
    }
  }, []);

  React.useEffect(() => {}, [rendered]);

  // Первый четыре секунды при первом рендере будет показываться индикатор загрузки
  if (!rendered) {
    setTimeout(() => {
      dispatch(setRendered(true));
    }, 3000);
    return (
      <div className={styles.indicator}>
        <CustomLoadingIndicator />
      </div>
    );
  } else {
    return (
      <BrowserRouter>
        <Routes>
          {user ? (
            <Route path="/" element={<MainLayout />}>
              <Route index element={<MainContent />} />
              {user.role === 'ROLE_ADMIN' && <Route path="/users" element={<UsersData />} />}
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
  }
};

export default App;
