const {Schema, model} = require('mongoose');

const messageSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    dialog: {
        type: Schema.Types.ObjectId,
        ref: 'Dialog',
        required: true
    }
},
{
    timestamps: true
});

const Message = model('Message', messageSchema);

module.exports = Message;