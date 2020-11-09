import React, { useRef, useEffect, useState } from "react";

import io from "socket.io-client";

const CallPage = () => {
    const userVideo = useRef();
    const partnerVideo = useRef();
    const socket = useRef();

    const [stream, setStream] = useState();
    const [yourID, setYourID] = useState("");
    const [users, setUsers] = useState({});

    useEffect(() => {
        navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
            .then((stream) => {
                setStream(stream);
                userVideo.current.srcObject = stream;
            })
            .catch((e) => console.log(e));

        socket.current = io("/");
        console.log("connected");

        socket.current.on("yourID", (id) => {
            setYourID(id);
            console.log(id);
        });

        socket.current.on("allUsers", (users) => {
            setUsers(users);
            console.log(users);
        });
    }, []);

    return (
        <>
            <video playsInline ref={userVideo} muted autoPlay />
            <video playsInline ref={partnerVideo} autoPlay />
        </>
    );
};

export default CallPage;
