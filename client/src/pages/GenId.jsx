import React, { useState } from "react";

import { Paper, makeStyles, TextField, Button } from "@material-ui/core";

import SaveIcon from "@material-ui/icons/Save";

import { Link } from "react-router-dom";

const useStyles = makeStyles({
    paper: {
        margin: "10% 25%",
        height: "30vh",
    },
    text: {
        marginTop: "65px",
        marginLeft: "170px",
    },
    button: {
        marginTop: "70px",
        marginLeft: "20px",
    },
});

const GenId = ({ setUserName }) => {
    const classes = useStyles();
    const [text, setText] = useState(null);

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
                className={classes.button}>
                <SaveIcon />
            </Button>
        </Paper>
    );
};

export default GenId;
