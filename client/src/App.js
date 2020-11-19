import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";

import { Home, CallPage, GenId, GroupChat, GroupChatRoom } from "./pages";

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
            <Route exact path='/'>
                <Home
                    userName={userName}
                    darkMode={darkMode}
                    setDarkMode={setDarkMode}
                />
            </Route>
            <Route exact path='/gen-id'>
                <GenId setUserName={setUserName} />
            </Route>
            <Route exact path='/call'>
                <CallPage userName={userName} />
            </Route>
            <Route exact path='/group'>
                <GroupChat />
            </Route>
            <Route exact path='/group/:room'>
                <GroupChatRoom />
            </Route>
        </ThemeProvider>
    );
};

export default App;
