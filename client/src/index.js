import React from "react";
import ReactDOM from "react-dom";

import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";

import App from "./App";

const lightTheme = createMuiTheme({
    palette: {
        background: { default: "#EBEDF9" },
        primary: { main: "#67D0E8" },
        text: { main: "#707070" },
    },
});

ReactDOM.render(
    <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <App />
    </ThemeProvider>,
    document.getElementById("root"),
);
