import React from "react";
import ReactDom from "react-dom";
import App from './app';
import './index.css';
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";



const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
