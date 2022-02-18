const express = require("express");
const path = require("path");
const app = express();
const server = require("http").createServer(app);

const io = require("socket.io")(server);

const PORT = process.env.PORT || 4000;

app.use(express.static(path.join(__dirname, '../build')));
app.get('/', (req, res, next) => res.sendFile(__dirname + './index.hmtl'));

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";

io.on("connection", (socket) => {

    io.emit('serverTest', 'Server working...');

    const { roomId } = socket.handshake.query;

    socket.join(roomId);

    socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
        io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
    });

    socket.on("disconnect", () => {
        socket.leave(roomId);
    });
});

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});