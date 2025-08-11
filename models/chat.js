
const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    from: {
        type: String,
        required: true,
    },
    to: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        maxLength: 60,
    },
    created_at: {
        type: Date,
        required: true,
    },
     updated_at: {
    type: Date,
    default: null, // optional: null until first update
  }
});


const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;