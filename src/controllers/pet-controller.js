const service = require('../services/pet-service');

class PetController {
    constructor(){};
    addPet = async (req, res) => {
        try {
            const result = await service.addPet(req.body);
            res.status(201).send(result);
        } catch (e) {
            res.status(400).send({error:e.message});
        };
    };
    deletePet = async (req, res) => {
        try {
            const result = await service.deletePet(req.params.id);
            res.status(201).send(result);
        } catch (e) {
            res.status(400).send({error: e.message});
        };
    };
    updatePet = async (req, res) => {
        try {
            const result = await service.updatePet(req.params.id, req.body);
            res.status(201).send(result);
        } catch (e) {
            res.status(400).send({error: e.message});
        };
    };
    getAllPets = async (req, res) => {
        try {
            const result = await service.getAllPets();
            res.send(result);
        } catch (e) {
            res.status(400).send({error:e.message});
        };
    };
    getPetById = async (req, res) => {
        try {
            const result = await service.getPetById(req.params.id);
            res.send(result);
        } catch (e) {
            res.status(400).send({error:e.message});
        };
    };
};

module.exports = PetController;