const express = require('express');
const AlbumController = require('../controllers/album-controller');
const auth = require('../middleware/auth');
const rightCheck = require('../middleware/accessCheck');

const albumController = new AlbumController();
const albumRouter = new express.Router();

albumRouter.get('/:id', albumController.getAlbumWPhotos);
albumRouter.get('', albumController.getUserAlbums);
albumRouter.post('', albumController.addAlbum);
albumRouter.put('/:id', albumController.updateAlbum);
albumRouter.delete('/:id', albumController.deleteAlbum);

module.exports = albumRouter;