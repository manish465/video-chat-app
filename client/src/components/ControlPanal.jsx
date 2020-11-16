import React from "react";

import { ButtonGroup, Button } from "@material-ui/core";

import VideocamIcon from "@material-ui/icons/Videocam";
import VideocamOffIcon from "@material-ui/icons/VideocamOff";
import MicNoneIcon from "@material-ui/icons/MicNone";
import MicOffIcon from "@material-ui/icons/MicOff";
import CallEndIcon from "@material-ui/icons/CallEnd";
import PresentToAllIcon from "@material-ui/icons/PresentToAll";
import PausePresentationIcon from "@material-ui/icons/PausePresentation";

import useStyles from "../styles/style";

const ControlPanal = ({
    video,
    setVideo,
    audio,
    setAudio,
    callAccepted,
    setCallAccepted,
    present,
    setPresent,
}) => {
    const classes = useStyles();

    return (
        <>
            <ButtonGroup className={classes.inCallButtonGroup}>
                <Button onClick={() => setVideo(!video)}>
                    {video ? <VideocamOffIcon /> : <VideocamIcon />}
                </Button>
                <Button onClick={() => setAudio(!audio)}>
                    {audio ? <MicOffIcon /> : <MicNoneIcon />}
                </Button>
                <Button onClick={() => setPresent(!present)}>
                    {present ? <PausePresentationIcon /> : <PresentToAllIcon />}
                </Button>
                <Button
                    onClick={() => setCallAccepted(false)}
                    disabled={!callAccepted}
                    color='secondary'
                    variant='contained'>
                    <CallEndIcon />
                </Button>
            </ButtonGroup>
        </>
    );
};

export default ControlPanal;
