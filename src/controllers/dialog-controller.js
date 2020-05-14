const service = require('../services/dialog-service');
const messageService = require('../services/message-service');

class DialogController {
    constructor(){};
    addDialog = async (req, res) => {
        try {
            const result = await service.addDialog(req.body);
            res.status(201).send(result);
        } catch (e) {
            res.status(400).send({error:e.message});
        };
    };
    deleteDialog = async (req, res) => {
        try {
            const result = await service.deleteDialog(req.params.id);
            await messageService.deleteDialogMessages(req.params.id);
            res.status(201).send(result);
        } catch (e) {
            res.status(400).send({error: e.message});
        };
    };
    getDialogWMessages = async (req, res) => {
        try {
            const result = await service.getDialogWMessages(req.params.id);
            res.send(result);
        } catch (e) {
            res.status(400).send({error:e.message});
        };
    };
    getUserDialogs = async (req, res) => {
        try {
            const result = await service.getUserDialogs(req.params.userid);
            res.send(result);
        } catch (e) {
            res.status(400).send({error:e.message});
        };
    };
};

module.exports = DialogController;