const express = require('express');
const controller = require('../controllers/connectionController');
const {isLoggedIn, isAuthor} = require('../middlewares/auth');
const {validateId} = require('../middlewares/validator');

const router = express.Router();

//GET /connections: Send all connections to the user
router.get('/', controller.index);

//GET /connections/newConnection: Send html form for creating a new connection
router.get('/newConnections', isLoggedIn, controller.new);

//POST /connections: Create a new connection
router.post('/', isLoggedIn, controller.create);

//GET /connections/:id: Send details of connection identified by id
router.get('/:id', validateId, controller.show);

//GET /connections/:id/edit: Send html form for editing an existing story
router.get('/:id/edit', validateId, isLoggedIn, isAuthor, controller.edit);

//PUT /connections/:id: Update the connection identified by id
router.put('/:id', validateId, isLoggedIn, isAuthor, controller.update);

//DELETE /connections/:id: Delete the story identified by id
router.delete('/:id', validateId, isLoggedIn, isAuthor, controller.delete);

//GET /about: Display about page
router.get('/about', controller.about);

//GET /contact: Display contact page
router.get('/contact', controller.contact);

module.exports = router;