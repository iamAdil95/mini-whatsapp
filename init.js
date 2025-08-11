
const mongoose = require('mongoose');
const Chat = require("./models/chat.js");

main()
    .then(() => {
    console.log("connection is successful");
})
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let allChats = [ 
  {
    from: "rohit",
    to: "mohit",
    text: "teach me JS callbacks",
    created_at: new Date()
  },
  {
    from: "amit",
    to: "sumit",
    text: "all the best",
    created_at: new Date()
  },
  {
    from: "anita",
    to: "ramesh",
    text: "bring me some fruits",
    created_at: new Date()
  },
  {
    from: "ramesh",
    to: "anita",
    text: "sure, what kind?",
    created_at: new Date()
  },
  {
    from: "sumit",
    to: "amit",
    text: "thanks bro!",
    created_at: new Date()
  },
];

Chat.insertMany(allChats);
