import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "semantic-ui-css/semantic.min.css";

import App from "./App";
import { createStore } from "redux";
import { Provider } from "react-redux";
import middleware from "./middleware";
import reducers from "./reducers";
import { BrowserRouter } from "react-router-dom";
const store = createStore(reducers, middleware);

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
