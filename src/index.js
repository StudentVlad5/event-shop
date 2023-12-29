import 'modern-normalize';
import AOS from 'aos';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import { App } from 'components/App';
import { GlobalStyle } from 'components/baseStyles/GlobalStyle';
import { ThemeStatus } from 'components/ThemeStatus/ThemeProvider';
import { StatusProvider } from 'components/ContextStatus/ContextStatus';

import i18n from './i18n';

AOS.init();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={'Loading'} persistor={persistor}>
        <BrowserRouter basename="/">
          <StatusProvider>
            <I18nextProvider i18n={i18n}>
              <ThemeStatus>
                <GlobalStyle />
                <App />
              </ThemeStatus>
            </I18nextProvider>
          </StatusProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
