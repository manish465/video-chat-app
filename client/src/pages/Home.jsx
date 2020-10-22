import React from "react";

import TopBar from "../components/AppBar";
import FrontCanvas from "./../components/FrontCanvas";

const Home = ({ darkMode, setDarkMode }) => {
    return (
        <>
            <TopBar darkMode={darkMode} setDarkMode={setDarkMode} />
            <FrontCanvas />
        </>
    );
};

export default Home;
