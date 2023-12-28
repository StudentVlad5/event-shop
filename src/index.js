import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "components/App";
import { GlobalStyle } from "components/baseStyles/GlobalStyle";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename="event-shop">
      <I18nextProvider i18n={i18n}>
        <GlobalStyle />
        <App />
      </I18nextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
