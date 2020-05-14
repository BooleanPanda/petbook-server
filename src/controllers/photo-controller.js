const service = require('../services/photo-service');
const fs = require('fs');

class PhotoController {
    constructor(){};
    addPhotos = async (req, res) => {
        try {
            /*const result = await service.addPhoto(
                {
                    album: req.params.id,
                    owner: req.user._id,
                    url: `http://localhost:4000/public/${req.user._id}/albums/${req.params.id}/${req.filename}`
                }
            );*/
            const photos = [];
            req.filenames.forEach(filename => {
                photos.push({
                    album: req.params.id,
                    owner: req.user._id,
                    url: `http://localhost:4000/public/${req.user._id}/albums/${req.params.id}/${filename}`
                })
            });
            const result = await service.addPhotos(photos);
            res.status(201).send(result);
        } catch (e) {
            res.status(400).send({error:e.message});
        };
    };
    deletePhoto = async (req, res) => {
        try {
            const result = await service.deletePhoto(req.params.id);
            fs.unlinkSync(req.query.photoUrl);
            res.status(201).send(result);
        } catch (e) {
            console.log(e)
            res.status(400).send({error: e.message});
        };
    };
    updatePhoto = async (req, res) => {
        try {
            const result = await service.updatePhoto(req.params.id, req.body);
            res.status(201).send(result);
        } catch (e) {
            res.status(400).send({error: e.message});
        };
    };
    getAllPhotos = async (req, res) => {
        try {
            const result = await service.getAllPhotos();
            res.send(result);
        } catch (e) {
            res.status(400).send({error:e.message});
        };
    };
    getPhotoById = async (req, res) => {
        try {
            const result = await service.getPhotoById(req.params.id);
            res.send(result);
        } catch (e) {
            res.status(400).send({error:e.message});
        };
    };
};

module.exports = PhotoController;