import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { OidcProvider } from '@axa-fr/react-oidc';
import './index.css';
import { App } from './App';
import { getConfiguration } from './oidc-config';
import { reportWebVitals } from './reportWebVitals';
import { getLogger } from './logger';

const logger = getLogger('index');

const configuration = getConfiguration(
  process.env.REACT_APP_OIDC_AUTHORITY,
  process.env.REACT_APP_OIDC_CLIENT_ID,
);
logger.debug(configuration, 'OIDC Configuration');

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <OidcProvider configuration={configuration}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </OidcProvider>
    </React.StrictMode>,
  );
} else {
  logger.error('Could not find root element to render into.');
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
