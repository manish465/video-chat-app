import React, { useRef, useEffect, useState } from "react";

import { Button, Typography, ButtonGroup, Paper } from "@material-ui/core";

import useStyles from "../styles/style";

import VideocamIcon from "@material-ui/icons/Videocam";
import VideocamOffIcon from "@material-ui/icons/VideocamOff";
import MicNoneIcon from "@material-ui/icons/MicNone";
import MicOffIcon from "@material-ui/icons/MicOff";
import CallEndIcon from "@material-ui/icons/CallEnd";

import CallIcon from "@material-ui/icons/Call";

import io from "socket.io-client";
import Peer from "simple-peer";

const CallPage = () => {
    const classes = useStyles();

    const userVideo = useRef();
    const partnerVideo = useRef();
    const socket = useRef();

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

        socket.current = io.connect("http://localhost:8000");

        socket.current.on("yourID", (id) => {
            setYourID(id);
        });

        socket.current.on("allUsers", (users) => {
            setUsers(users);
        });

        socket.current.on("hey", (data) => {
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
            socket.current.emit("callUser", {
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

        socket.current.on("callAccepted", (signal) => {
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
            socket.current.emit("acceptCall", { signal: data, to: caller });
        });

        peer.on("stream", (stream) => {
            partnerVideo.current.srcObject = stream;
        });

        peer.signal(callerSignal);
        setReceivingCall(false);
        setCallAccepted(true);
    };

    const incomingCall = (
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
                        {callOption ? <CallIcon /> : <CallEndIcon />}
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
                <video
                    className={classes.partnerVideo}
                    playsInline
                    ref={partnerVideo}
                    autoPlay
                />
            ) : (
                callList
            )}
            <ButtonGroup className={classes.inCallButtonGroup}>
                <Button onClick={() => setVideo(!video)}>
                    {video ? <VideocamOffIcon /> : <VideocamIcon />}
                </Button>
                <Button onClick={() => setAudio(!audio)}>
                    {audio ? <MicOffIcon /> : <MicNoneIcon />}
                </Button>
                <Button
                    onClick={() => setCallAccepted(false)}
                    disabled={!callAccepted}
                    color='secondary'
                    variant='contained'>
                    <CallEndIcon />
                </Button>
            </ButtonGroup>

            {receivingCall ? incomingCall : null}
        </>
    );
};

export default CallPage;
