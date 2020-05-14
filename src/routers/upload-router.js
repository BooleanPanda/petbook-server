const express = require('express');
const UserController = require('../controllers/user-controller');
const PhotoController = require('../controllers/photo-controller');
const avatarConfig = require('../utils/avatarConfig');
const albumConfig = require('../utils/albumConfig')
const auth = require('../middleware/auth');

const uploadMediator = async (req, res, next) => {
    try{
        req.filenames = [];
        next();
    } catch (e) {
        res.status(401).send({e});
    };
};

const userController = new UserController();
const photoController = new PhotoController();
const uploadRouter = new express.Router();


uploadRouter.post('/avatar', auth,  avatarConfig, userController.setUserAvatar);
uploadRouter.post('/album/:id', auth, uploadMediator, albumConfig, photoController.addPhotos);

module.exports = uploadRouter;