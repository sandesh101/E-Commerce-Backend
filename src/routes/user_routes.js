const UserRoutes = require('express').Router();
const UserController = require('./../controllers/user_controller');

    //Route for creating new USER   
    UserRoutes.post('/createAccount', UserController.createAccount);

    //Route for signing in the USER
    UserRoutes.post('/signIn', UserController.signIn);

module.exports = UserRoutes;