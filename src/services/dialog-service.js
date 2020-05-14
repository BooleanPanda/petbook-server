const Dialog = require('../models/dialog');
const mongoose = require('mongoose');

const addDialog = async function (newDialog) {
    try {
        const dialog = new Dialog(newDialog);
        await dialog.save();
        return {
            message : 'dialog added',
        };
    } catch (error) {
        return {
            message : `something went wrong`,
            error : error
        };
    };
};

const deleteDialog = async function (dialogId) {
    try {
        await Dialog.deleteOne({_id : dialogId});
        return { message : `dialog with id ${dialogId} deleted` };
    } catch (error) {
        return {
            message : `something went wrong`,
            error : error
        };
    };
};

const getDialogWMessages = async function (dialogId) {
    try {
        return await Dialog.aggregate([
            {
                $match : { '_id': mongoose.Types.ObjectId(dialogId) }
            },
            {
                $lookup : {
                    from: 'messages',
                    localField: '_id',
                    foreignField: 'dialog',
                    as: 'messages'
                }
            }
        ]);
    } catch (error) {
        throw new Error (error.message);
    };
};

const getUserDialogs = async function (userId) {
    const id = mongoose.Types.ObjectId(userId);
    try {
        return await Dialog.aggregate([
            {
                $match : { members: { $all: [id] } }
            },
            {$addFields:
                 {members: 
                    {$filter: {
                        input: '$members',
                        as: 'member',
                        cond: { $ne: ['$$member', id] }
                    }}

                }
            },
            { 
                $unwind: { path: '$members' }
            },
            { 
                $lookup: {
                    from: 'users',
                    localField: 'members',
                    foreignField: '_id',
                    as: 'members',
                },
            },
            {
                $unwind:  '$members',
            },
            {
                $unset: ['members.tokens','members.friends','members.password','members.email','members.login','members.phone', 'members.__v']
            },
            { 
                $group: {
                     _id: '$_id',
                    members: { $push: '$members' }
                }
            },
        ]);
    } catch (error) {
        throw new Error (error.message);
    };
};

module.exports = {
    addDialog,
    deleteDialog,
    getDialogWMessages,
    getUserDialogs
};