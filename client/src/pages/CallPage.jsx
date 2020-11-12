import React, { useRef, useEffect, useState } from "react";

import { makeStyles, Button, Typography, ButtonGroup } from "@material-ui/core";

import VideocamIcon from "@material-ui/icons/Videocam";
import VideocamOffIcon from "@material-ui/icons/VideocamOff";
import MicNoneIcon from "@material-ui/icons/MicNone";
import MicOffIcon from "@material-ui/icons/MicOff";
import CallEndIcon from "@material-ui/icons/CallEnd";

import CallIcon from "@material-ui/icons/Call";

import io from "socket.io-client";
import Peer from "simple-peer";

const socket = io.connect("http://localhost:8000");

const useStyles = makeStyles({
    userVideo: {
        position: "absolute",
        bottom: "30px",
        right: "30px",
        width: "250px",
        borderRadius: "20px",
    },
    partnerVideo: {
        height: "100%",
        width: "100%",
    },
    callListButton: {
        display: "block",
        margin: "10px auto",
    },
    inCallButtonGroup: {
        position: "absolute",
        bottom: "10%",
        left: "45%",
    },
});

const CallPage = () => {
    const classes = useStyles();

    const userVideo = useRef();
    const partnerVideo = useRef();

    const [callOption, setCallOption] = useState(false);

    const [video, setVideo] = useState(true);
    const [audio, setAudio] = useState(true);

    const [yourID, setYourID] = useState("");
    const [users, setUsers] = useState({});

    const [caller, setCaller] = useState("");
    const [callerSignal, setCallerSignal] = useState();

    const [receivingCall, setReceivingCall] = useState(false);
    const [callAccepted, setCallAccepted] = useState(false);

    const [stream, setStream] = useState();

    useEffect(() => {
        navigator.mediaDevices
            .getUserMedia({ video: video, audio: audio })
            .then((stream) => {
                if (userVideo.current) {
                    setStream(stream);
                    userVideo.current.srcObject = stream;
                }
            })
            .catch((e) => console.log(e));

        socket.on("yourID", (id) => {
            setYourID(id);
        });

        socket.on("allUsers", (users) => {
            setUsers(users);
        });

        socket.on("hey", (data) => {
            setReceivingCall(true);
            setCaller(data.from);
            setCallerSignal(data.signal);
        });
    }, [audio, video]);

    const callPeer = (id) => {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream: stream,
        });

        peer.on("signal", (data) => {
            socket.emit("callUser", {
                userToCall: id,
                signalData: data,
                from: yourID,
            });
        });

        peer.on("stream", (stream) => {
            if (partnerVideo.current) {
                partnerVideo.current.srcObject = stream;
            }
        });

        socket.on("callAccepted", (signal) => {
            peer.signal(signal);
            setCallAccepted(true);
        });
    };

    const acceptCall = () => {
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream: stream,
        });

        peer.on("signal", (data) => {
            socket.emit("acceptCall", { signal: data, to: caller });
        });

        peer.on("stream", (stream) => {
            partnerVideo.current.srcObject = stream;
        });

        peer.signal(callerSignal);
        setReceivingCall(false);
        setCallAccepted(true);
    };

    const incomingCall = (
        <div>
            <h1>{caller} is calling you</h1>
            <button onClick={acceptCall}>Accept</button>
        </div>
    );

    const callList = (
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
                        {callOption ? <CallIcon /> : null}
                    </Button>
                ) : null,
            )}
        </>
    );

    return (
        <>
            <video
                className={classes.userVideo}
                playsInline
                ref={userVideo}
                muted
                autoPlay
            />

            {callAccepted ? (
                <>
                    <video
                        className={classes.partnerVideo}
                        playsInline
                        ref={partnerVideo}
                        autoPlay
                    />
                    <ButtonGroup className={classes.inCallButtonGroup}>
                        <Button onClick={() => setVideo(!video)}>
                            {video ? <VideocamOffIcon /> : <VideocamIcon />}
                        </Button>
                        <Button onClick={() => setAudio(!audio)}>
                            {audio ? <MicOffIcon /> : <MicNoneIcon />}
                        </Button>
                        <Button
                            onClick={() => setCallAccepted(false)}
                            color='secondary'
                            variant='contained'>
                            <CallEndIcon />
                        </Button>
                    </ButtonGroup>
                </>
            ) : (
                callList
            )}

            {receivingCall ? incomingCall : null}
        </>
    );
};

export default CallPage;
