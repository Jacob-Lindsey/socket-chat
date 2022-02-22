const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
    name: { type: String },
    messages: { type: Array },
    hasPassword: { type: Boolean, default: false },
    password: { type: String },
    creator: { type: Schema.Types.ObjectId, ref: "User", required: true },
    admins: { type: Array },
    mods: { type: Array },
});

module.exports = mongoose.model("Room", RoomSchema);