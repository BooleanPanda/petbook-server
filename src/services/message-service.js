const Message = require('../models/message');

const addMessage = async function (newMessage) {
    try {
        const message = new Message(newMessage);
        await message.save();
        return message;
    } catch (error) {
        return {
            message : `something went wrong`,
            error : error 
        };
    };
};

const deleteDialogMessages = async function (dialogId) {
    try {
        await Message.deleteMany({dialog : dialogId});
        return { message : `messages from dialog ${dialogId} deleted` };
    } catch (error) {
        return {
            message : `something went wrong`,
            error : error 
        };
    };
};

module.exports = {
    addMessage,
    deleteDialogMessages
};