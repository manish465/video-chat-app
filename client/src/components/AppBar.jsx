import React from "react";

import {
    AppBar,
    Grid,
    IconButton,
    Toolbar,
    Typography,
} from "@material-ui/core";

import { ReactComponent as IdGen } from "../asset/icons/genId.svg";
import { ReactComponent as OneOne } from "../asset/icons/one-one.svg";
import { ReactComponent as GroupConf } from "../asset/icons/groupConf.svg";
import { ReactComponent as Dark } from "../asset/icons/dark.svg";
import { ReactComponent as Light } from "../asset/icons/light.svg";

const Topbar = ({ darkMode, setDarkMode }) => {
    return (
        <>
            <AppBar position='static'>
                <Toolbar>
                    <Grid
                        container
                        direction='row'
                        justify='space-between'
                        alignItems='center'>
                        <Grid item>
                            <Typography variant='subtitle1'>
                                convo 5:45PM Wed, Oct 21
                            </Typography>
                        </Grid>
                        <Grid item>
                            <IconButton onClick={() => setDarkMode(!darkMode)}>
                                {darkMode ? (
                                    <Dark style={{ width: "30px" }} />
                                ) : (
                                    <Light style={{ width: "30px" }} />
                                )}
                            </IconButton>
                            <IconButton>
                                <IdGen style={{ width: "30px" }} />
                            </IconButton>
                            <IconButton>
                                <OneOne style={{ width: "30px" }} />
                            </IconButton>
                            <IconButton>
                                <GroupConf style={{ width: "30px" }} />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </>
    );
};

export default Topbar;
