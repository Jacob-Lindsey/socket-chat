const http = require("http");
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const server = http.createServer(app);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const Room = require("./roomModel");

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const { 
  addUser, 
  removeUser, 
  getUser, 
  getUsersInRoom, 
  addTypingUser, 
  removeTypingUser 
} = require("./users");
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
/* app.use(express.static(path.join(__dirname, '../public')));
process.env.DEBUG="*"; */
// ------------------------------------------------------------------

// ------------------------------------------------------------------
// PRODUCTION
app.use(express.static(path.join(__dirname, 'client/build')));
// ------------------------------------------------------------------

app.get('/', (req, res, next) => res.sendFile(__dirname + './index.html'), function(err) {
  if (err) {
    res.status(500).send(err);
  }
});

app.get('/chat', async (req, res, next) => {
  const name = req.query.name;
  const room = req.query.room;
  const persistent = req.query.per;

  Room.findOne({ name: room })
    .then(foundRoom => {
      if (!foundRoom) {
        const newRoom = new Room({
          name: room,
          messages: [],
          users: [name],
          hasPassword: false,
          password: null,
          persistent: persistent,
          creator: name,
          admins: [name],
          mods: [name],
        });
        newRoom.save();
        res.json(newRoom);
      } else {
        if (!foundRoom.users.includes(name) && foundRoom.persistent) {
          foundRoom.users.push(name);
          foundRoom.save();
        }
        res.json(foundRoom);
      }
    });
});

app.post('/chat', async (req, res, next) => {
  const room = req.query.room;
  
  Room.findOneAndUpdate({ name: room }, req.body, function(err, doc) {
    if (err) return res.send(500, {error: err});
    return res.send('Room updated');
  })
});

io.on("connection", (socket) => {
  socket.on("join", ({ name, room }, callback) => {
    const { user, error } = addUser({ id: socket.id, name, room });

    if (error) return callback(error);

    socket.join(user.room);

    socket.emit("message", { user: "Admin", text: `Welcome to ${user.room}` });
    socket.broadcast.to(user.room).emit("message", { user: "Admin", text: `${user.name} has joined!` });

    io.to(user.room).emit('roomData', { users: getUsersInRoom(user.room) });
    
    // When a user sends a message, save to DB only if room is marked 'persistent'
    socket.on("sendMessage", ({ message }) => {
      const timestamp = new Date(Date.now()).toLocaleTimeString("en-US");
      const newMessage = {
        user: user.name,
        text: message,
        timestamp: timestamp,   
      };
  
      Room.findOne({ name: room })
        .then(foundRoom => {
          if (foundRoom.persistent) {
            foundRoom.messages.push(newMessage);
            foundRoom.save();
          }
        });      
  
      io.to(user.room).emit("message", newMessage );
    });

    // Alert room when a user is typing
    socket.on("typing", () => {
      const typingUsers = addTypingUser(socket.id, user.name);
      socket.broadcast.to(user.room).emit("typing", typingUsers);
    });

    socket.on("stoppedTyping", () => {
      const typingUsers = removeTypingUser(socket.id);
      socket.broadcast.to(user.room).emit("stoppedTyping", typingUsers);
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
