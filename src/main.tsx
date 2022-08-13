import React from "react";
import ReactDOM from "react-dom/client";

import "picnic";

import App from "./App";

// import './samples/node-api'

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

postMessage({ payload: "removeLoading" }, "*");
