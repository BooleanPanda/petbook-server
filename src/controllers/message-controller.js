const service = require('../services/dialog-service');

class MessageController {
    constructor(){};
    addMessage = async (req, res) => {
        try {
            const result = await service.addMessage(req.body);
            res.status(201).send(result);
        } catch (e) {
            res.status(400).send({error:e.message});
        };
    };
};

module.exports = MessageController;