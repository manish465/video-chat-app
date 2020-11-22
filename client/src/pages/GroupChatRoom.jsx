import React, { useEffect, useRef } from "react";

import { useHistory } from "react-router-dom";

import io from "socket.io-client";

const GroupChatRoom = () => {
    const history = useHistory();
    const socket = useRef();
    useEffect(() => {
        socket.current = io.connect(
            "http://localhost:8000" + history.location.pathname,
        );
        console.log(socket.current.connected);
    }, [history]);

    return <div>GroupChatRoom</div>;
};

export default GroupChatRoom;
