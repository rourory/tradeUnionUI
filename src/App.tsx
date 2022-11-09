import React from 'react';
import { Provider } from 'react-redux';
import PersonData from './components/PersonData';
// import './App.css';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import 'devextreme/dist/css/dx.light.css';
import { store } from './redux/store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersonData />;
    </Provider>
  );
};

export default App;
