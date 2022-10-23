//react dependencies
import * as React from "react";
import { createRoot } from "react-dom/client";
import reportWebVitals from "./reportWebVitals";

//reactRouterDom dependencies
import { BrowserRouter } from "react-router-dom";

//store dependencies
import { Provider } from "react-redux";
import { store } from "./state/store";

//app to be runned
import App from "./App";

// main CSS file
import "./index.css";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
