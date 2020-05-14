const service = require('../services/user-service');
const rimraf = require("rimraf");
const path = require('path');
const fs = require('fs');

class UserController {
    constructor(){};
    addUser = async (req, res) => {
        try {
            const result = await service.addUser(req.body);
            fs.mkdirSync(`./public/${result.user._id}`);
            fs.mkdirSync(`./public/${result.user._id}/avatar`);
            fs.mkdirSync(`./public/${result.user._id}/albums`);
            res.status(201).send(result);
        } catch (e) {
            res.status(400).send({error:e.message});
        };
    };
    deleteUser = async (req, res) => {
        try {
            const result = await service.deleteUser(req.params.id);
            rimraf.sync(`./public/${req.params.id}`);
            res.status(201).send(result);
        } catch (e) {
            res.status(400).send({error: e.message});
        };
    };
    updateUser = async (req, res) => {
        try {
            const result = await service.updateUser(req.params.id, req.body);
            res.status(201).send(result);
        } catch (e) {
            res.status(400).send({error: e.message});
        };
    };
    getAllUsers = async (req, res) => {
        try {
            const result = await service.getAllUsers();
            res.send(result);
        } catch (e) {
            res.status(400).send({error:e.message});
        };
    };
    getUserById = async (req, res) => {
        try {
            const result = await service.getUserById(req.params.id);
            res.send(result);
        } catch (e) {
            res.status(400).send({error:e.message});
        };
    };
    getUserPets = async (req, res) => {
        try {
            const result = await service.getUserPets(req.params.id);
            res.send(result);
        } catch (e) {
            res.status(400).send({error:e.message});
        };
    };
    login = async (req, res) => {      
        try {
            const result = await service.login(req.body);
            res.status(201).send({message: 'Logged in!', result});
        } catch (e) {
            res.status(400).send({error:e.message});
        };
    };
    logout =  async (req, res) => {
        try {
            await service.logout(req);
            res.status(201).send({response: 'Logged out!'});
        } catch (e) {
            res.status(400).send({error:e.message});
        };
    };
    setUserAvatar =  async (req, res) => {
        try {
            const result = await service.setUserAvatar(req.user._id, req.filename);
            fs.readdir(`./public/${req.user._id}/avatar`, (err, files) => {
                if (err) throw err;
                for (const file of files) {
                    if (file!==req.filename){
                        fs.unlink(path.join(`./public/${req.user._id}/avatar`, file), err => {
                            if (err) throw err;
                        });
                    }
                }
            });
            res.status(201).send(result);
        } catch (e) {
            res.status(400).send({error:e.message});
        };
    };
};

module.exports = UserController;