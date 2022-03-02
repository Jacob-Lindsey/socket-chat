const http = require("http");
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const server = http.createServer(app);

const Room = require("./roomModel");

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});
const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");
const res = require("express/lib/response");

const DB_STRING = "mongodb+srv://pantzzzz:jakejake@cluster0.bjfcc.mongodb.net/ssockchat?retryWrites=true&w=majority";

mongoose.connect(
  DB_STRING,
  { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => { console.log('Connected to database'); })
  .catch((err) => { console.error('Error connecting to database', err); });

const PORT = process.env.PORT || 5000;

// ------------------------------------------------------------------
// DEVELOPMENT
app.use(express.static(path.join(__dirname, '../public')));
process.env.DEBUG="*";
// ------------------------------------------------------------------

// ------------------------------------------------------------------
// PRODUCTION
/* app.use(express.static(path.join(__dirname, '../build'))); */
// ------------------------------------------------------------------

app.get('/', (req, res, next) => res.sendFile(__dirname + './index.html'), function(err) {
  if (err) {
    res.status(500).send(err);
  }
});

app.get('/chat', async (req, res, next) => {
  const name = req.query.name;
  const room = req.query.room;

  Room.findOne({ name: room })
    .then(foundRoom => {
      if (!foundRoom) {
        const newRoom = new Room({
          name: room,
          messages: [],
          users: [name],
          hasPassword: false,
          password: null,
          creator: name,
          admins: [name],
          mods: [name],
        });
        newRoom.save();
        res.json(newRoom);
      } else {
        if (!foundRoom.users.includes(name)) {
          foundRoom.users.push(name);
          foundRoom.save();
        }
        res.json(foundRoom);
      }
    });
});

io.on("connection", (socket) => {
  
  // When a user joins a room
  socket.on("join", ({ name, room }) => {
    const { user, error } = addUser({ id: socket.id, name, room });

    if (error) return callback(error);

    socket.join(user.room);

    socket.emit("message", {
      user: "Admin",
      text: `Welcome to ${user.room}`,
    });

    socket.broadcast.to(user.room).emit("message", { user: "Admin", text: `${user.name} has joined!` });

    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
    
    // When a user sends a new message
    socket.on("sendMessage", ({ message }) => {
  
      const timestamp = new Date(Date.now()).toLocaleTimeString("en-US");
  
      const newMessage = {
        user: user.name,
        text: message,
        timestamp: timestamp,
      };
  
      Room.findOne({ name: room })
        .then(foundRoom => {
          foundRoom.messages.push(newMessage);
          foundRoom.save();
        });      
  
      io.to(user.room).emit("message", newMessage );
    });
  });

  // When a user leaves a room
  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    
    if (user) {
      io.to(user.room).emit("message", {
        user: "Admin",
        text: `${user.name} left the room`,
      });
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room)
      });
    }
    console.log("A disconnection has been made");
  });
});

server.listen(PORT, () => console.log(`Server is running on Port: ${PORT}`));
