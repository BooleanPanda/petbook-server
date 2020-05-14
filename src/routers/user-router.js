const express = require('express');
const UserController = require('../controllers/user-controller');
const auth = require('../middleware/auth');
const rightCheck = require('../middleware/accessCheck');
const validate = require('../middleware/validation');
const userValSchema = require('../utils/userValidation');

const userController = new UserController();
const userRouter = new express.Router();

userRouter.get('/:id/pets', auth, userController.getUserPets);
userRouter.get('/:id', auth, userController.getUserById);
userRouter.get('', auth, userController.getAllUsers);
userRouter.post('', validate(userValSchema), userController.addUser);
userRouter.post('/login', userController.login);
userRouter.post('/logout', auth, userController.logout);
userRouter.put('/:id', auth, rightCheck, userController.updateUser);
userRouter.delete('/:id', auth, rightCheck, userController.deleteUser);

module.exports = userRouter;