import React, { useRef, useEffect, useState } from "react";

import io from "socket.io-client";
import Peer from "simple-peer";

import { ControlPanal, CallList, IncomingCall } from "../components";

import useStyles from "../styles/style";

const PATH = "http://localhost:8000";

const CallPage = ({ userName }) => {
    const classes = useStyles();

    const userVideo = useRef();
    const partnerVideo = useRef();
    const socket = useRef();

    const [present, setPresent] = useState(false);

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
        if (present) {
            navigator.mediaDevices
                .getDisplayMedia({ video: video, audio: audio })
                .then((stream) => {
                    if (userVideo.current) {
                        setStream(stream);
                        userVideo.current.srcObject = stream;
                    }
                })
                .catch((e) => console.log(e));
        } else {
            navigator.mediaDevices
                .getUserMedia({ video: video, audio: audio })
                .then((stream) => {
                    if (userVideo.current) {
                        setStream(stream);
                        userVideo.current.srcObject = stream;
                    }
                })
                .catch((e) => console.log(e));
        }
    }, [audio, video, present]);

    useEffect(() => {
        socket.current = io.connect(PATH);

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

        socket.current.on("user left", () => {
            setCaller("");
            setCallAccepted(false);
        });
    }, []);

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
                <CallList users={users} yourID={yourID} callPeer={callPeer} />
            )}
            <ControlPanal
                video={video}
                setVideo={setVideo}
                audio={audio}
                setAudio={setAudio}
                callAccepted={callAccepted}
                setCallAccepted={setCallAccepted}
                present={present}
                setPresent={setPresent}
                socket={socket}
            />
            {receivingCall && callAccepted === false ? (
                <IncomingCall
                    caller={caller}
                    acceptCall={acceptCall}
                    setReceivingCall={setReceivingCall}
                />
            ) : null}
        </>
    );
};

export default CallPage;
