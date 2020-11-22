import React, { useEffect, useRef, useState } from "react";

import io from "socket.io-client";

import { Button, Paper, TextField, Typography } from "@material-ui/core";

import { useHistory, Link } from "react-router-dom";

import { v4 as uuidv4 } from "uuid";

import useStyles from "../styles/style";

const PATH = "http://localhost:8000/group";

const GroupChat = () => {
    const classes = useStyles();

    const history = useHistory();
    const roomID = uuidv4();

    const socket = useRef();

    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        socket.current = io.connect(PATH);
        socket.current.on("all room", (rooms) => setRooms(rooms));
    });

    return (
        <>
            <Paper className={classes.group_chat_create_room}>
                <TextField
                    fullWidth
                    label='Enter a room name'
                    variant='outlined'
                />
                <Button
                    component={Link}
                    to={history.location.pathname + "/" + roomID}
                    className={classes.group_chat_create_room_create_button}
                    variant='contained'
                    fullWidth
                    onClick={() => {
                        socket.current.emit("create room", roomID);
                    }}>
                    Create a chat room
                </Button>
            </Paper>
            <Paper className={classes.group_chat_available_room}>
                <Typography variant='h3'>Availabe Room:</Typography>
                {rooms.map((room, key) => (
                    <Button
                        component={Link}
                        to={history.location.pathname + "/" + room}
                        className={classes.group_chat_available_room_button}
                        variant='contained'
                        fullWidth
                        key={key}>
                        {room}
                    </Button>
                ))}
            </Paper>
        </>
    );
};

export default GroupChat;
