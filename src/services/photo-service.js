const Photo = require('../models/photo');

const getAllPhotos = async function () {
    try {
        return await Photo.find({}).populate('owner');
    } catch (error) {
        return {
            message : `something went wrong`,
            error : error
        };
    };
};

const getPhotoById = async function (photoId) {
    try {
        return await Photo.findById(photoId);
    } catch (error) {
        return { 
            message : `something went wrong`,
            error : error
        };
    };
};

const addPhotos = async function (newPhotos) {
    try {
        /*const photo = new Photo(newPhoto);
        await photo.save();*/
        await Photo.insertMany(newPhotos);
        return {
            message : 'album added',
            photo: photo
        };
    } catch (error) {
        return {
            message : `something went wrong`,
            error : error 
        };
    };
};

const deletePhoto = async function (photoId) {
    try {
        await Photo.deleteOne({_id : photoId});
        return { message : `photo with id ${photoId} deleted` };
    } catch (error) {
        return {
            message : `something went wrong`,
            error : error 
        };
    };
};

const deleteAlbumPhotos = async function (albumId) {
    try {
        await Photo.deleteMany({album : albumId});
        return { message : `photos with owner ${albumId} deleted` };
    } catch (error) {
        return {
            message : `something went wrong`,
            error : error 
        };
    };
};

module.exports = {
    getAllPhotos,
    getPhotoById,
    addPhotos,
    deletePhoto,
    deleteAlbumPhotos
};