
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require('mongoose');
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

main()
    .then(() => {
    console.log("connection is successful");
})
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

//Index Route
app.get("/chats", async (req, res) => {
    let chats = await  Chat.find(); //asynchronous func
    // console.log(chats);
    res.render("index.ejs", { chats });
});

//New Route
app.get("/chats/new",  (req, res) => {
    res.render("new.ejs");
});

//Create Route
app.post("/chats", (req, res) => {
    let { from, to, text } = req.body; //Carries data from the client (used in POST/PUT).
    let newChat = new Chat({
        from: from,
        to: to,
        text: text,
        created_at: new Date()
    });
    newChat
        .save()
        .then((res) => { //when we use then we dont have to use await
            console.log("chat was saved");
        })
        .catch((err) => {
            console.log(err);
        });
    res.send("working");
});

//Edit Route
app.get("/chats/:id/edit",async (req, res) => {
    let { id } = req.params; //Carries identifiers from the URL (used in GET/PUT/DELETE).
    let chat = await Chat.findById(id);
    res.render("edit.ejs", {chat});
});

//Update Route
app.put("/chats/:id", async (req, res) => {
    let { id } = req.params; //Extracts the chat ID from the URL
    let { text: newTxt } = req.body; //Gets the new message text from the request body.
    let updatedChat = await Chat.findByIdAndUpdate(id, { text: newTxt,  updated_at: new Date() }, { runValidators: true, new: true });  //{ new: true }: Returns the updated document instead of the old one.
    console.log(updatedChat);
    res.redirect("/chats");
});

//Destroy Route
app.delete("/chats/:id", async (req, res) => {
    let { id } = req.params;
    let chatDeleted = await Chat.findByIdAndDelete(id);
    console.log(chatDeleted);
    res.redirect("/chats");
});

app.get("/", (req, res) => {
    res.send("root is working");
});

app.listen(8080, () => {
    console.log("server is listening on port 8080");
});
































































































// let chat1 = new Chat({
//     from: "neha",
//     to: "priya",
//     text : "send me your exam results",
//     created_at: new Date()
// });

// chat1.save()  //UTC
//     .then((res) => {
//         console.log(res);
//     });