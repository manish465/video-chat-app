import React from "react";

import { Typography, Button } from "@material-ui/core";

import CallEndIcon from "@material-ui/icons/CallEnd";
import CallIcon from "@material-ui/icons/Call";

import useStyles from "../styles/style";

const CallList = ({ users, yourID, setCallOption, callPeer, callOption }) => {
    const classes = useStyles();

    return (
        <>
            <Typography variant='h2'>People Online:</Typography>
            {Object.keys(users).map((id, key) =>
                id !== yourID ? (
                    <Button
                        className={classes.callListButton}
                        onMouseEnter={() => setCallOption(true)}
                        onMouseLeave={() => setCallOption(false)}
                        variant='contained'
                        key={key}
                        onClick={() => callPeer(id)}>
                        <Typography>{id}</Typography>
                        {callOption ? <CallIcon /> : <CallEndIcon />}
                    </Button>
                ) : null,
            )}
        </>
    );
};

export default CallList;
