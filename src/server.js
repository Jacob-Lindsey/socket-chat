// PRODUCTION SERVER
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const server = require("http").createServer(app);
const Message = require("./models/messageModel");

const io = require("socket.io")(server, {
    cors: {
        origin: "*",
    },
});

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";
const PORT = process.env.PORT || 4000;

// DEVELOPMENT
app.use(express.static(path.join(__dirname, '../public')));
process.env.DEBUG="*";

// PRODUCTION
/* app.use(express.static(path.join(__dirname, '../build'))); */

app.get('/', (req, res, next) => res.sendFile(__dirname + './index.hmtl'));
/* app.get('/:roomId', async (req, res) => {
    const messages = await Message.find()
        .sort({ timestamp: -1 })
        .limit(50);
    return res.json({ messages: messages });
}); */


io.on("connection", (socket) => {

    const { roomId } = socket.handshake.query;
    
    socket.join(roomId);

    socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
        io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
        console.log(data.body);
        console.log(data.userID);
        console.log(data.username);
        console.log(data.timestamp);
    });

    /* socket.on('msg', async msg => {
        const messageList = await Message.find()
            .sort({ timestamp: -1 })
            .limit(50);
        io.in(roomId).emit('msg', { messages: messageList });

        const message = new Message({
            body: msg.
        });
    }) */

    socket.on("disconnect", () => {
        socket.leave(roomId);
    });
});

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});


// DEVELOPMENT SERVER
/* const server = require("http").createServer();
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
}); */