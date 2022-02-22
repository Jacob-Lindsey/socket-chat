const Message = require("../models/messageModel");
const Room = require("../models/roomModel");

const addMessageToRoom = (req, res) => {
    Room.findByIdAndUpdate(
        {_id: req.params.id},
        {$push: 
            {"messages": 
                {
                    body: req.body.chatInput,
                    user: req.user.username,
                    timestamp: req.
                }
            }}
    )
};

// https://github.com/Jacob-Lindsey/personal-blog/blob/main/controllers/comment_controller.js FOR REFERENCE