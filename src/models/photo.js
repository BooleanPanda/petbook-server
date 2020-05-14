const {Schema, model} = require('mongoose');

const photoSchema = new Schema({
    album: {
        type: Schema.Types.ObjectId,
        ref: 'Album',
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    url: {
        type: String,
        required: true
    }
}, 
{
    timestamps: true
});

const Photo = model('Photo', photoSchema);

module.exports = Photo;