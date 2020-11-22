require("dotenv").config();
const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const port = process.env.PORT || 8000;

const users = {};
const rooms = [];

const call = io.of("/call");
const group = io.of("/group");

call.on("connection", (socket) => {
    console.log(`user ${socket.id} joined`);
    if (!users[socket.id]) {
        users[socket.id] = socket.id;
    }

    call.emit("allUsers", users);

    socket.emit("yourID", socket.id);

    socket.on("callUser", (data) => {
        call.to(data.userToCall).emit("hey", {
            signal: data.signalData,
            from: data.from,
        });
    });

    socket.on("acceptCall", (data) => {
        call.to(data.to).emit("callAccepted", data.signal);
    });

    socket.on("user disconnect", () => {
        socket.broadcast.emit("user disconnect");
        call.emit("allUsers", users);
    });

    socket.on("disconnect", () => {
        console.log(`user ${socket.id} left`);
        socket.broadcast.emit("user left");
        delete users[socket.id];
        call.emit("allUsers", users);
    });
});

group.on("connection", (socket) => {
    socket.emit("all room", rooms);
    socket.on("create room", (id) => {
        rooms.push(id);
        console.log(`${id} room was created`);
        group.emit("all room", rooms);
        rooms.forEach((room) => {
            const chatRoom = io.of(`/group/${room}`);
            chatRoom.on("connection", (socket) => {
                console.log(socket.connected);
            });
        });
    });
});

http.listen(port, () => {
    console.log(`server is running ${port}`);
});
