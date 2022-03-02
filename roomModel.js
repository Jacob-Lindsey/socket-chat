const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/* const RoomSchema = new Schema({
    name: { type: String },
    messages: { type: Array },
    users: { type: Array },
    hasPassword: { type: Boolean, default: false },
    password: { type: String, default: "" },
    creator: { type: String },
    admins: { type: Array },
    mods: { type: Array },
}); */

const RoomSchema = new Schema({
    name: { type: String },
    messages: { type: Array },
    users: { type: Array },
    hasPassword: { type: Boolean, default: false },
    password: { type: String, default: "" },
    creator: { type: String },
    admins: { type: Array },
    mods: { type: Array },
});

module.exports = mongoose.model("Room", RoomSchema);