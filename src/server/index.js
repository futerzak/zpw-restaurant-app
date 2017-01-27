const express = require("express");
const bodyParser= require('body-parser');

const http = require('http').Server(app);
const io = require('socket.io')(http);

const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/api", (req, res) => {
    res.send("ok");
});

mongoose.connect('mongodb://mongo:27017/restaurantApp');

const models = require('./models')(mongoose);

const route = require('./route.js')(app, models, io);

app.use(express.static("../angular"));


// io.on('connection', (socket) => {
//   console.log('a user connected');
//   socket.on('disconnect', () => {
//     console.log('user disconnected');
//   });
//
//   socket.on('chat message', (msg) => {
//     io.emit('chat message', msg);
//   });
//
// });

app.listen(80, () => {
    console.warn("App run on port 80");
});
