import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'antd/dist/antd.css';
import "./i18n/configs"
import { Provider } from "react-redux"
import rootStore from "./redux/store"
import axios from "axios"
import { PersistGate } from "redux-persist/integration/react"

axios.defaults.headers['x-icode'] = 'D60C91843FFCDC7C'

ReactDOM.render(
  <React.StrictMode>
    {/* 在全局注入 store（react-redux） */}
    <Provider store={rootStore.store}>
      <PersistGate persistor={rootStore.persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
