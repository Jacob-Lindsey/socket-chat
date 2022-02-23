require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const server = require("http").createServer(app);
const Room = require("./models/roomModel");
const Message = require("./models/messageModel");

const DB_STRING = "mongodb+srv://pantzzzz:jakejake@cluster0.bjfcc.mongodb.net/ssockchat?retryWrites=true&w=majority";

const io = require("socket.io")(server, {
    cors: {
        origin: "*",
    },
});

// Connect to database
mongoose
    .connect(DB_STRING, {
        useNewUrlParser: true,  
        useUnifiedTopology: true, 
    })
    .then(() => {
        console.log('Connected to database');
    })
    .catch((err) => {
        console.error('Error connecting to database', err);
    });


const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";
const PORT = process.env.PORT || 4000;

app.use(cors({
    origin: '*',
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ------------------------------------------------------------------
// DEVELOPMENT
app.use(express.static(path.join(__dirname, '../public')));
process.env.DEBUG="*";
// ------------------------------------------------------------------


// ------------------------------------------------------------------
// PRODUCTION
/* app.use(express.static(path.join(__dirname, '../build'))); */
// ------------------------------------------------------------------


/* app.get('/:roomId', async (req, res) => {
    const messages = await Message.find()
        .sort({ timestamp: -1 })
        .limit(50);
    return res.json({ messages: messages });
}); */



app.get('/:roomId', async (req, res) => {
    console.log('GET route called');
    const messages = await Message.find()
        .sort({ timestamp: -1 })
        .limit(50);
    return res.json({ messages: messages });
});

app.post('/:roomId', async (req, res) => {
    console.log('POST route called');

    const roomId = req.body.room;
    const user = req.body.user;
    const hasPassword = req.body.hasPassword;
    const password = hasPassword ? req.body.password : "";
    let existingRoom = await Room.findOne({ name: roomId }).catch(err => { });
        
    if (!existingRoom) {
        // Create a new room
        const room = new Room({
            name: roomId,
            messages: [],
            users: [user],
            hasPassword: hasPassword,
            password: password,
            creator: user,
            admins: [user],
            mods: [user],
        });

        // Save room to database
        await room.save();
    } else {
        existingRoom.users.push(user);
        console.log(existingRoom.users);
    }
});

app.get('/', (req, res, next) => res.sendFile(__dirname + './index.hmtl'));



io.on("connection", (socket) => {

    const { roomId } = socket.handshake.query;
    
    socket.join(roomId);

    socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
        io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
        console.log(data.body);
        console.log(data.userID);
        console.log(data.user);
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