import React from "react";

import { Paper, Typography, ButtonGroup, Button } from "@material-ui/core";

import CallEndIcon from "@material-ui/icons/CallEnd";
import CallIcon from "@material-ui/icons/Call";

import useStyles from "../styles/style";

const IncomingCall = ({ caller, acceptCall, setReceivingCall }) => {
    const classes = useStyles();

    return (
        <Paper elevation={3} className={classes.incomingCall}>
            <Typography variant='h4'>{caller} is calling you</Typography>
            <ButtonGroup style={{ width: "20%" }}>
                <Button
                    variant='contained'
                    color='primary'
                    onClick={acceptCall}>
                    <CallIcon />
                </Button>
                <Button
                    variant='contained'
                    color='secondary'
                    onClick={() => setReceivingCall(false)}>
                    <CallEndIcon />
                </Button>
            </ButtonGroup>
        </Paper>
    );
};

export default IncomingCall;
