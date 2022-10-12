const express = require('express');
const controller = require('../controller/connectionController');

const router = express.Router();

//GET /connections: Send all connections to the user
router.get('/', controller.index);

//GET /connections/newConnection: Send html form for creating a new connection
router.get('/newConnection', controller.new);

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

module.exports = router;