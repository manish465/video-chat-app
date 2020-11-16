import React, { useState } from "react";

import { Paper, TextField, Button } from "@material-ui/core";

import SaveIcon from "@material-ui/icons/Save";

import { Link } from "react-router-dom";

import useStyles from "../styles/style";

const GenId = ({ setUserName }) => {
    const classes = useStyles();
    const [text, setText] = useState("");

    return (
        <Paper className={classes.paper} variant='outlined'>
            <TextField
                value={text}
                onChange={(event) => {
                    setText(event.target.value);
                }}
                className={classes.text}
                variant='outlined'
                label='Enter User Name'
            />
            <Button
                component={Link}
                onClick={() => setUserName(text)}
                to='/'
                size='large'
                variant='contained'
                className={classes.buttonGen}>
                <SaveIcon />
            </Button>
        </Paper>
    );
};

export default GenId;
