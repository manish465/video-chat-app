import React, { useState } from "react";
import { Route } from "react-router-dom";

import Home from "./pages/Home";
import CallPage from "./pages/CallPage";
import GenId from "./pages/GenId";

import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";

const lightTheme = createMuiTheme({
    palette: {
        background: { default: "#EBEDF9" },
        primary: { main: "#67D0E8" },
        secondary: { main: "#ff0000" },
        text: { main: "#e63939" },
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
    const [darkMode, setDarkMode] = useState(false);

    return (
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
            <CssBaseline />
            <Route
                exact
                path='/'
                component={() => (
                    <Home darkMode={darkMode} setDarkMode={setDarkMode} />
                )}
            />
            <Route exact path='/gen-id' component={GenId} />
            <Route exact path='/call' component={CallPage} />
        </ThemeProvider>
    );
};

export default App;
