const express = require('express');
const PhotoController = require('../controllers/photo-controller');
const auth = require('../middleware/auth');
const rightCheck = require('../middleware/accessCheck');

const photoController = new PhotoController();
const photoRouter = new express.Router();

photoRouter.get('/:id', photoController.getPhotoById);
photoRouter.get('', photoController.getAllPhotos);
photoRouter.post('', photoController.addPhotos);
photoRouter.put('/:id', photoController.updatePhoto);
photoRouter.delete('/:id', auth, photoController.deletePhoto);

module.exports = photoRouter;