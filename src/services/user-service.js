const mongoose = require('mongoose');
const User = require('../models/user');
const Pet = require('../models/pet');

const getAllUsers = async function () {
    try {
        return await User.find({}).select('-tokens -password -__v');
    } catch (error) {
        throw new Error (error.message);
    };
};

const getUserById = async function (userId) {
    try {
        /*return await User.findById(userId);*/
        return await User.aggregate([
            {
                $match : { '_id': mongoose.Types.ObjectId(userId) }
            },
            {
                $lookup : {
                    from: 'pets',
                    localField: '_id',
                    foreignField: 'owner',
                    as: 'pets'
                }
            },
            {
                $project: { 'tokens': 0, 'password': 0, '__v': 0 }
            }
        ]);
    } catch (error) {
        throw new Error (error.message);
    };
};

const addUser = async function (newUser) {
    try {
        const user = new User(newUser);
        await user.save();
        const token = await user.generateAuthToken();
        return {
            message : 'user added',
            user: user
        };
    } catch (error) {
        throw new Error (error.message);
    };
};

const updateUser = async function (userId, data) {
    try {
        await User.findByIdAndUpdate(userId, data);
        return await User.findById(userId);
    } catch (error) {
        throw new Error (error.message);
    };
};

const deleteUser = async function (userId) {
    try {
        await User.deleteOne({_id : userId});
        return { message : `user with id ${userId} deleted` };
    } catch (error) {
        throw new Error (error.message);
    };
};

const getUserPets = async function (userId) {
    try {
        return await Pet.find({owner: userId}).populate('owner');
    } catch (error) {
        throw new Error (error.message);
    };
};

const login = async function (req) {
    try {
        const user = await User.findByCredentials(req.login, req.password);
        const token = await user.generateAuthToken();
        return {token, id:user._id};
    } catch (error) {
        throw new Error (error.message);
    };
};

const logout = async function (req) {
    req.user.tokens = req.user.tokens.filter((token) => {
        return token.token !== req.token;
    });
    await req.user.save();
};

const setUserAvatar = async function (userId, filename) {
    try {
        await User.findByIdAndUpdate(userId, {avatar: `http://localhost:4000/public/${userId}/avatar/${filename}`});
        return await User.findById(userId)
    } catch (error) {
        throw new Error (error.message);
    };
};

module.exports = {
    getAllUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser,
    getUserPets,
    login,
    logout,
    setUserAvatar
};