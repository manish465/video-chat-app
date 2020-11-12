const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const users = {};

io.on("connection", (socket) => {
    if (!users[socket.id]) {
        users[socket.id] = socket.id;
    }

    socket.emit("yourID", socket.id);

    io.sockets.emit("allUsers", users);

    socket.on("callUser", (data) => {
        io.to(data.userToCall).emit("hey", {
            signal: data.signalData,
            from: data.from,
        });
    });

    socket.on("acceptCall", (data) => {
        io.to(data.to).emit("callAccepted", data.signal);
    });

    socket.on("disconnect", () => {
        delete users[socket.id];
        io.sockets.emit("allUsers", users);
    });
});

http.listen(8000, () => {
    console.log("server is running");
});
