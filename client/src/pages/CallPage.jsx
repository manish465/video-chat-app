import React, { useRef, useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core";

import io from "socket.io-client";
import Peer from "simple-peer";

const socket = io.connect("http://localhost:8000");

const useStyles = makeStyles({
    userVideo: {
        position: "absolute",
        bottom: "10px",
        right: "10px",
        width: "250px",
        borderRadius: "20px",
    },
    partnerVideo: {
        height: "100vh",
        width: "100%",
    },
});

const CallPage = () => {
    const classes = useStyles();

    const userVideo = useRef();
    const partnerVideo = useRef();

    const [yourID, setYourID] = useState("");
    const [users, setUsers] = useState({});

    const [caller, setCaller] = useState("");
    const [callerSignal, setCallerSignal] = useState();

    const [receivingCall, setReceivingCall] = useState(false);

    const [stream, setStream] = useState();

    useEffect(() => {
        navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
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
    }, []);

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
    };

    const incomingCall = (
        <div>
            <h1>{caller} is calling you</h1>
            <button onClick={acceptCall}>Accept</button>
        </div>
    );

    const callList = Object.keys(users).map((id, key) => {
        if (id === yourID) {
            return null;
        } else {
            return (
                <div>
                    <button key={key} onClick={() => callPeer(id)}>
                        Call {id}
                    </button>
                </div>
            );
        }
    });

    return (
        <>
            <video
                className={classes.userVideo}
                playsInline
                ref={userVideo}
                muted
                autoPlay
            />
            <video
                className={classes.partnerVideo}
                playsInline
                ref={partnerVideo}
                autoPlay
            />
            <br />
            {receivingCall ? incomingCall : callList}
        </>
    );
};

export default CallPage;
