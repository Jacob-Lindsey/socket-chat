const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    body: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    room: { type: Schema.Types.ObjectId, ref: "Room", required: true },
    timestamp: { type: String, required: true }
});

module.exports = mongoose.model("Message", MessageSchema);



