import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";

import Home from "./pages/Home";
import CallPage from "./pages/CallPage";
import GenId from "./pages/GenId";

import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";

const PATH = "video-chat-app";
const USERNAMEPATH = "name";

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
    const [userName, setUserName] = useState("");

    useEffect(() => {
        if (userName !== "") {
            localStorage.setItem(PATH + " " + USERNAMEPATH, userName);
        }
        if (localStorage.getItem(PATH + " " + USERNAMEPATH)) {
            setUserName(localStorage.getItem(PATH + " " + USERNAMEPATH));
        }
    }, [userName]);

    return (
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
            <CssBaseline />
            <Route
                exact
                path='/'
                component={() => (
                    <Home
                        userName={userName}
                        darkMode={darkMode}
                        setDarkMode={setDarkMode}
                    />
                )}
            />
            <Route
                exact
                path='/gen-id'
                component={() => <GenId setUserName={setUserName} />}
            />
            <Route exact path='/call' component={CallPage} />
        </ThemeProvider>
    );
};

export default App;
