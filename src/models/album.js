const {Schema, model} = require('mongoose');

const albumSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    preview: {
        type: String,
        required: true,
        default: 'http://localhost:4000/public/albumPlaceholder.png'
    },
    description: {
        type: String,
        required: true,
        default: 'Just another photo album'
    }
},
{
    timestamps: true
});

const Album = model('Album', albumSchema);

module.exports = Album;