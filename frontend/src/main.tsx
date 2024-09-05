import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ErrorMonitoringSDK } from './sdk';

// Initialize the SDK
const errorSDK = new ErrorMonitoringSDK({
  projectId: 'your-project-id',
  environment: 'development',
  apiUrl: 'http://localhost:8080/api/errors',
});
errorSDK.init();


window.errorSDK = errorSDK;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);