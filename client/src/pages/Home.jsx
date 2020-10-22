import React from "react";

import TopBar from "../components/AppBar";

const Home = ({ darkMode, setDarkMode }) => {
    return (
        <>
            <TopBar darkMode={darkMode} setDarkMode={setDarkMode} />
        </>
    );
};

export default Home;
