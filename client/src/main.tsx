import React from "react";
import ReactDOM from "react-dom/client";
import './main.scss';
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./context/store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
