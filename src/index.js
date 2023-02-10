import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom"
import axios from "axios";
import "./index.css"
import { store } from './store'
import { Provider } from 'react-redux'
import App from './app'
axios.defaults.baseURL = "http://localhost:3001";
// axios.defaults.baseURL = "https://peluqueriasback.onrender.com/";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  </div>
);
