const express = require('express');
const controller = require('../controllers/userController');

const router = express.Router();

//GET /users/new: send html form for creating a new story
router.get('/new', controller.new);

//POST /users/new: Create the new user
router.post('/', controller.create);

router.get('/login', controller.login);

router.post('/login', controller.loginRequest);

router.get('/profile', controller.profile);

router.get('/logout', controller.logout);
module.exports = router;
