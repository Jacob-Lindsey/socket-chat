const server = require("http").createServer();
const io = require("socket.io")(server, {
    cors: {
        origin: "*",
    },
});

const PORT = 4000;
const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";

io.on("connection", (socket) => {

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