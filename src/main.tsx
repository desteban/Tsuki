import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import Request from './views/Request/Request';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Request />
  </React.StrictMode>,
);

// Use contextBridge
window.ipcRenderer.on('main-process-message', (_event, message) => {
  console.log(message);
});
