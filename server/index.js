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

    socket.on("disconnect", () => {
        delete users[socket.id];
        io.sockets.emit("allUsers", users);
    });
});

http.listen(8000, () => {
    console.log("server is running");
});
