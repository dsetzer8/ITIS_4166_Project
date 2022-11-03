const express = require('express');
const controller = require('../controllers/mainController');

const router = express.Router();

//GET / :Main Route or Home Page
router.get('/',controller.home);

//GET /connections: Send all connections to the user
router.get('/connections', controller.index);

//GET /connections/newConnection: Send html form for creating a new connection
router.get('/newConnections', controller.new);

//POST /connections: Create a new connection
router.post('/', controller.create);

//GET /connections/:id: Send details of connection identified by id
router.get('/:id', controller.show);

//GET /connections/:id/edit: Send html form for editing an existing story
router.get('/:id/edit',controller.edit);

//PUT /connections/:id: Update the connection identified by id
router.put('/:id', controller.update);

//DELETE /connections/:id: Delete the story identified by id
router.delete('/:id', controller.delete);

//GET /connections/about: Display about page
router.get('/about',controller.about);

//GET /connections/contact: Display contact page
router.get('/contact',controller.contact);

module.exports = router;