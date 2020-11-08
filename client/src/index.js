import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import "./index.css";
import "./asset/Fonts/Proxima_Nova_Reg.ttf";

import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.getElementById("root"),
);
