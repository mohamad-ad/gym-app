import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';

// import { ApiProvider } from '@reduxjs/toolkit/query/react';
// import { apiSlice } from './redux/apiSlice';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <ApiProvider api={apiSlice}>
    <Provider store={store}>
      <App/>
    </Provider>
  // </ApiProvider>
);

