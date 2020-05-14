const express = require('express');
const DialogController = require('../controllers/dialog-controller');
const auth = require('../middleware/auth');
const rightCheck = require('../middleware/accessCheck');

const dialogController = new DialogController();
const dialogRouter = new express.Router();

dialogRouter.get('/:userid', dialogController.getUserDialogs);
dialogRouter.get('/:id/messages', dialogController.getDialogWMessages);
dialogRouter.post('', dialogController.addDialog);
dialogRouter.delete('/:id', dialogController.deleteDialog);

module.exports = dialogRouter;