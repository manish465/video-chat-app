import React from "react";

import { createMuiTheme, ThemeProvider } from "@material-ui/core";

import Home from "./pages/Home";

const lightTheme = createMuiTheme({
    palette: {
        background: { default: "#EBEDF9" },
        primary: { main: "#67D0E8" },
        text: { main: "#707070" },
    },
});

const App = () => {
    return (
        <ThemeProvider theme={lightTheme}>
            <Home />
        </ThemeProvider>
    );
};

export default App;
