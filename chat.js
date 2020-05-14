const express = require('express');
const socket = require('socket.io');
const http = require('http');
const messageService = require('./src/services/message-service');

const chat = express();

const chatServer = http.createServer(chat);
const io = socket(chatServer);

io.on('connection', (socket) => {
    console.log('a connection over here');


    socket.on('join', ({id, dialog})=>{
        socket.join(dialog);
    })
    socket.on('disconnect', ({dialog}) => {
        console.log(dialog)
        socket.leave(dialog);
        console.log('disconnected')
    });
    socket.on('sendMessage', (data, cb) => {
        console.log(data)
        io.to(data.chat).emit('message', data);
        cb();
    })
});


module.exports = chatServer;