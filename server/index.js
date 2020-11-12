const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

io.on("connection", (socket) => {
    socket.emit("hello", socket.id);
});

http.listen(8000, () => {
    console.log("server is running");
});
