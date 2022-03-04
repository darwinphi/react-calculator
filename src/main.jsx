import React from "react";
import ReactDOM from "react-dom";
import "./normalize.css";
import "./global.css";
import Calculator from "./Calculator";

ReactDOM.render(
  <React.StrictMode>
    <Calculator />
  </React.StrictMode>,
  document.getElementById("root")
);
