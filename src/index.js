import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import "../node_modules/bootstrap/dist/css/bootstrap.css";

// TODO: wrap everything in Auth0
ReactDOM.render(
  <Auth0Provider
    domain="dev-butuv-4t.us.auth0.com"
    clientId="l3TsUPyimtjM4AbvZZmHTmtKMhiK2xgX"
    redirectUri="https://best-books-backend-hunt-tek.herokuapp.com"
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);
