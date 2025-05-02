import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import './i18n';
import PWAUpdateNotification from './components/PWAUpdateNotification';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <PWAUpdateNotification />
  </React.StrictMode>
);
