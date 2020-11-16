import React from "react";

import { FrontCanvas, Appbar } from "./../components";

const Home = ({ userName, darkMode, setDarkMode }) => {
    return (
        <>
            <Appbar
                userName={userName}
                darkMode={darkMode}
                setDarkMode={setDarkMode}
            />
            <FrontCanvas userName={userName} />
        </>
    );
};

export default Home;
