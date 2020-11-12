import React, { useRef, useEffect, useState } from "react";

import io from "socket.io-client";

const socket = io.connect("http://localhost:8000");

const CallPage = () => {
    const userVideo = useRef();
    const partnerVideo = useRef();

    const [yourId, setYourId] = useState("");

    useEffect(() => {
        navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
            .then((stream) => {
                userVideo.current.srcObject = stream;
            })
            .catch((e) => console.log(e));

        socket.on("hello", (id) => {
            setYourId(id);
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
