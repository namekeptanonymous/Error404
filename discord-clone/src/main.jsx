import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import {store} from "../src/app/store.js"
//import { ChatContextProvider } from './context/ChatContext';
import { useContext } from 'react';
import { ChatContextProvider } from './context/ChatContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  
  <React.StrictMode>
    <ChatContextProvider>
    <Provider store = {store}>
      <App />
    </Provider>
    </ChatContextProvider>
    
  </React.StrictMode>,
  
  
);
