import React from "react";
import ReactDOM from "react-dom/client";
import HomePage from "./HomePage";
import "./style/well.css";
import "./style/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-notifications/lib/notifications.css";
import "react-bootstrap-typeahead/css/Typeahead.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HomePage />
  </React.StrictMode>
);
