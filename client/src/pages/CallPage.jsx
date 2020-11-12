import React, { useRef, useEffect } from "react";

import io from "socket.io-client";

const socket = io.connect("http://localhost:8000");

const CallPage = () => {
    const userVideo = useRef();
    const partnerVideo = useRef();

    useEffect(() => {
        navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
            .then((stream) => {
                userVideo.current.srcObject = stream;
            })
            .catch((e) => console.log(e));

        socket.on("hello", (id) => console.log(id));
    }, []);

    return (
        <>
            <video playsInline ref={userVideo} muted autoPlay />
            <video playsInline ref={partnerVideo} autoPlay />
        </>
    );
};

export default CallPage;
