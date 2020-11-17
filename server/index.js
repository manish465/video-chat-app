const app = require("express")();
const http = require("http").createServer(app);

const port = process.env.PORT || 8000;

const onePeer = require("./components/callPeer");

onePeer.call(http);

http.listen(port, () => {
    console.log(`server is running ${port}`);
});
