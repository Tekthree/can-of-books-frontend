import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import "../node_modules/bootstrap/dist/css/bootstrap.css";

// TODO: wrap everything in Auth0
ReactDOM.render(
  <Auth0Provider
    domain={process.env.REACT_APP_AUTHO_DOMAIN}
    clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
    redirectUri="https://modest-raman-da64c4.netlify.app"
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);
