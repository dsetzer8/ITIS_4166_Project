const express = require('express');
const controller = require('../controller/connectionController');

const router = express.Router();

//GET /connections: Send all connections to the user
router.get('/', (req,res)=>{
    res.send('Send All Connections');
});

//GET /connections/newConnection: Send html form for creating a new connection
router.get('/newConnection', (req,res)=>{
    res.send('Send New Connections Form');
});

//POST /connections: Create a new connection
router.post('/', (req,res)=>{
    res.send('Created A New Connection');
});

//GET /connections/:id: Send details of connection identified by id
router.get('/:id', (req,res)=>{
    res.send('Send Connection With ID ' + req.params.id);
});

//GET /connections/:id/edit: Send html form for editing an existing story
router.get('/:id/edit', (req,res)=>{
    res.send('Send The Edit Form ');
});

//PUT /connections/:id: Update the connection identified by id
router.put('/:id', (req,res)=>{
    res.send('Update Story With Id ' + req.params.id);
});

//DELETE /connections/:id: Delete the story identified by id
router.delete('/:id', (req,res)=>{
    res.send('Delete Story With Id ' + req.params.id);
});

module.exports = router;