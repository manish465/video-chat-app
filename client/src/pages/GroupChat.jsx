import React, { useEffect, useRef, useState } from "react";

import io from "socket.io-client";

import { Button, Paper } from "@material-ui/core";

import { useHistory } from "react-router-dom";

import { v4 as uuidv4 } from "uuid";

const PATH = "http://localhost:8000/group";

const GroupChat = () => {
    const history = useHistory();
    const roomID = uuidv4();

    const socket = useRef();

    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        socket.current = io.connect(PATH);
        socket.current.on("all room", (room) => setRooms(room));
    });

    return (
        <>
            <Paper>
                <Button
                    onClick={() => {
                        history.push(`/group/${roomID}`);
                        socket.current.emit("create room", roomID);
                    }}>
                    Create a chat room
                </Button>
            </Paper>
            <Paper>
                {rooms.map((room, key) => (
                    <Button key={key}>{room}</Button>
                ))}
            </Paper>
        </>
    );
};

export default GroupChat;
