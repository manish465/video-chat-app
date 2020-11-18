import React, { useState } from "react";

import { Paper, TextField, Button, Grid, Box } from "@material-ui/core";

import { ReactComponent as Banner } from "../asset/Banner/userPage.svg";

import SaveIcon from "@material-ui/icons/Save";

import { Link } from "react-router-dom";

import useStyles from "../styles/style";

const GenId = ({ setUserName }) => {
    const classes = useStyles();

    const [text, setText] = useState("");

    return (
        <Grid className={classes.container} container alignItems='center'>
            <Grid item xs={6}>
                <Banner className={classes.container_banner} />
            </Grid>
            <Grid item xs={6}>
                <Paper variant='outlined' className={classes.container_paper}>
                    <TextField
                        fullWidth
                        variant='outlined'
                        label='Enter Your Username'
                    />
                    <Button
                        color='primary'
                        className={classes.container_paper_button}
                        variant='contained'
                        fullWidth>
                        <SaveIcon fontSize='large' />
                    </Button>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default GenId;
