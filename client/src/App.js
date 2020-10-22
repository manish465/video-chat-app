import React, { useState } from "react";

import Home from "./pages/Home";

import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";

const lightTheme = createMuiTheme({
    palette: {
        background: { default: "#EBEDF9" },
        primary: { main: "#67D0E8" },
        text: { main: "#707070" },
    },
});

const darkTheme = createMuiTheme({
    palette: {
        background: { default: "#424451" },
        primary: { main: "#67D0E8" },
        text: { main: "#707070" },
    },
});

const App = () => {
    const [darkMode, setDarkMode] = useState(true);

    return (
        <ThemeProvider theme={darkMode ? lightTheme : darkTheme}>
            <CssBaseline />
            <Home darkMode={darkMode} setDarkMode={setDarkMode} />
        </ThemeProvider>
    );
};

export default App;
