
const express = require('express');
const userController = require('../controllers/usersController');

const router = express.Router();


router.post('/register', userController.register);

module.exports = (app) => {
    app.use('/api/users', router);
};