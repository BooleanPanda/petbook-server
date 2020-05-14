const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./src/routers/router-exports');
const chatServer = require('./chat');

const app = express();

const servPort = 4000;
const chatPort = 4001;

app.use(express.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use(cors());


app.use('/users', router.userRouter);
app.use('/pets', router.petRouter);
app.use('/upload', router.uploadRouter);
app.use('/albums', router.albumRouter);
app.use('/photos', router.photoRouter);
app.use('/dialogs', router.dialogRouter);
app.use('/messages', router.messageRouter);

app.use(express.static(__dirname));


async function start () {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/Users-manager', {
            useNewUrlParser : true,
            useCreateIndex : true,
            useUnifiedTopology : true,
            useFindAndModify : false
        });
        app.listen(servPort, () => {
            console.log('app server on port ' + servPort);
        });
        chatServer.listen(chatPort, () => {
            console.log('chat server on port ' + chatPort);
        });
    } catch (e) {
        if (e) {
            throw e;
        };
    };
};
start();