const {Schema, model} = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    login: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
    },
    phone: {
        type: String,
        required: true,
        minlength: 11,
        maxlength: 12
    },
    email: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true,
        default: 'http://localhost:4000/public/avatarPlaceholder.png'
    },
    friends: [{
        friend: {
            type: Schema.Types.ObjectId,
            required: true
        }
    }],
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

userSchema.statics.findByCredentials = async (login, password) => {
    const user = await User.findOne({login});
    if (!user) {
        throw new Error('Invalid login');
    };
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Wrong password');
    };
    return user;
};

userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({_id: user._id.toString() }, 'servAppUganda');
    user.tokens = user.tokens.concat({ token });
    user.save();
    return token;
};

userSchema.pre('save', async function(next){
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    };
    next();
});

const User = model('User', userSchema);

module.exports = User;