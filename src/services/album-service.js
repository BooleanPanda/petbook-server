const Album = require('../models/album');
const mongoose = require('mongoose');

const getUserAlbums = async function (userId) {
    try {
        return await Album.find(
            {
                'owner': mongoose.Types.ObjectId(userId) 
            }
        );
    } catch (error) {
        return {
            message : `something went wrong 111`,
            error : error
        };
    };
};

const getAlbumWPhotos = async function (albumId) {
    try {
        /*return await Album.aggregate([
            {
                $match : { '_id': mongoose.Types.ObjectId(albumId) }
            },
            {
                $lookup : {
                    from: 'photos',
                    localField: '_id',
                    foreignField: 'album',
                    as: 'photos'
                },
            }
        ]);*/
        /*return await Album.aggregate([
            {
                $match : { '_id': mongoose.Types.ObjectId(albumId) }
            },
            {
                $lookup : {
                    from: 'photos',
                    localField: '_id',
                    foreignField: 'album',
                    as: 'photos'
                },
            },
            {$unwind: '$photos'},
            {$sort: {'photos.createdAt': -1}},
            {
                $group: {
                    _id: '$_id',
                    'name' : { '$first': '$name' },
                    'description' : { '$first': '$description' },
                    'preview' : { '$first': '$preview' },
                    'owner' : { '$first': '$owner' },
                    'createdAt' : { '$first': '$createdAt' },
                    photos: {
                        $push: '$photos'
                    }
                }
            }
        ]);*/
        const objectId = mongoose.Types.ObjectId(albumId);
        return await Album.aggregate([
            {
                $match : { '_id': objectId }
            },
            {
                $lookup : {
                    from: 'photos',
                    pipeline: [
                        {$match : { 'album': objectId }},
                        {$sort: { 'createdAt': -1 }}
                    ],
                    as: 'photos',
                },
            }
        ]);
    } catch (error) {
        return { 
            message : `something went wrong`,
            error : error
        };
    };
};

const addAlbum = async function (newAlbum) {
    try {
        const album = new Album(newAlbum);
        await album.save();
        return {
            message : 'album added',
            album: album
        };
    } catch (error) {
        return {
            message : `something went wrong`,
            error : error 
        };
    };
};

const updateAlbum = async function (albumId, data) {
    try {
        await Album.findByIdAndUpdate(albumId, data);
        return { message : `album with id ${albumId} updated` };
    } catch (error) {
        return {
            message : `something went wrong`,
            error : error 
        };
    };
};

const deleteAlbum = async function (albumId) {
    try {
        await Album.deleteOne({_id : albumId});
        return { message : `album with id ${albumId} deleted` };
    } catch (error) {
        return {
            message : `something went wrong`,
            error : error 
        };
    };
};

module.exports = {
    getUserAlbums,
    getAlbumWPhotos,
    addAlbum,
    updateAlbum,
    deleteAlbum
};