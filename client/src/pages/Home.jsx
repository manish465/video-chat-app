import React from "react";

import FrontCanvas from "./../components/FrontCanvas";
import TopBar from "../components/AppBar";

const Home = ({ darkMode, setDarkMode }) => {
    return (
        <>
            <TopBar darkMode={darkMode} setDarkMode={setDarkMode} />
            <FrontCanvas />
        </>
    );
};

export default Home;
