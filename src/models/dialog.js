const {Schema, model} = require('mongoose');

const dialogSchema = new Schema({
    members: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }]
});

const Dialog = model('Dialog', dialogSchema);

module.exports = Dialog;