import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";

import { Home, CallPage, GenId } from "./pages";

import themes from "./styles/theme";

import { CssBaseline, ThemeProvider } from "@material-ui/core";

const PATH = "video-chat-app";
const USERNAMEPATH = "name";

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
        <ThemeProvider theme={darkMode ? themes.darkTheme : themes.lightTheme}>
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
