import React from "react";

import { Typography, Button } from "@material-ui/core";

import useStyles from "../styles/style";

const CallList = ({ users, yourID, callPeer }) => {
    const classes = useStyles();

    return (
        <>
            <Typography variant='h2'>People Online:</Typography>
            {Object.keys(users).map((id, key) =>
                id !== yourID ? (
                    <Button
                        className={classes.callListButton}
                        variant='contained'
                        key={key}
                        onClick={() => callPeer(id)}>
                        <Typography>Call : {id}</Typography>
                    </Button>
                ) : null,
            )}
        </>
    );
};

export default CallList;
