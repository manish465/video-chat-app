import React from "react";

import { Button, Paper } from "@material-ui/core";

import { useHistory } from "react-router-dom";

import { v4 as uuidv4 } from "uuid";

const GroupChat = (props) => {
    const history = useHistory();
    const roomID = uuidv4();

    return (
        <Paper>
            <Button onClick={() => history.push(`/group/${roomID}`)}>
                Create a chat room
            </Button>
        </Paper>
    );
};

export default GroupChat;
