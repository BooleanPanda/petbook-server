const express = require('express');
const MessageController = require('../controllers/message-controller');
const auth = require('../middleware/auth');
const rightCheck = require('../middleware/accessCheck');

const messageController = new MessageController();
const messageRouter = new express.Router();


messageRouter.post('', messageController.addMessage);

module.exports = messageRouter;