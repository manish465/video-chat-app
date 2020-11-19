const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const port = process.env.PORT || 8000;

const users = {};

const call = io.of("/call");

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

http.listen(port, () => {
    console.log(`server is running ${port}`);
});
