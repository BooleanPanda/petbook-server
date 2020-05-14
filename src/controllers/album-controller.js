const service = require('../services/album-service');
const photoService = require('../services/photo-service');
const rimraf = require('rimraf');
const fs = require('fs');

class AlbumController {
    constructor(){};
    addAlbum = async (req, res) => {
        try {
            const result = await service.addAlbum(req.body);
            fs.mkdirSync(`./public/${req.body.owner}/albums/${result.album._id}`);
            res.status(201).send(result);
        } catch (e) {
            res.status(400).send({error:e.message});
        };
    };
    deleteAlbum = async (req, res) => {
        try {
            const result = await service.deleteAlbum(req.params.id);
            await photoService.deleteAlbumPhotos(req.params.id);
            rimraf.sync(`./public/${req.query.ownerId}/albums/${req.params.id}`);
            res.status(201).send(result);
        } catch (e) {
            res.status(400).send({error: e.message});
        };
    };
    updateAlbum = async (req, res) => {
        try {
            const result = await service.updateAlbum(req.params.id, req.body);
            res.status(201).send(result);
        } catch (e) {
            res.status(400).send({error: e.message});
        };
    };
    getUserAlbums = async (req, res) => {
        try {
            const result = await service.getUserAlbums(req.query.userId);
            res.send(result);
        } catch (e) {
            res.status(400).send({error:e.message});
        };
    };
    getAlbumWPhotos = async (req, res) => {
        try {
            const result = await service.getAlbumWPhotos(req.params.id);
            res.send(result);
        } catch (e) {
            res.status(400).send({error:e.message});
        };
    };
};

module.exports = AlbumController;