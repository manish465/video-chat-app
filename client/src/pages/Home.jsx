import React from "react";

import FrontCanvas from "./../components/FrontCanvas";
import TopBar from "../components/AppBar";

const Home = ({ userName, darkMode, setDarkMode }) => {
    return (
        <>
            <TopBar
                userName={userName}
                darkMode={darkMode}
                setDarkMode={setDarkMode}
            />
            <FrontCanvas />
        </>
    );
};

export default Home;
