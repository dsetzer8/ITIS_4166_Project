//Required Modules
const model = require('../models/connection');

//Render the home page
exports.home = (req,res)=>{
    res.render('./index');
}
//Renders the connections page
exports.index = (req,res)=>{
    let connections = model.find();
    res.render('./story/index', {connections});
};
//Renders a new connection
exports.new = (req,res)=>{
    res.render('./story/newConnections');
};
//Create a connection and redirect to connections
exports.create = (req,res)=>{
    let connection = req.body;
    model.save(connection);
    res.redirect('/connections');
};
//Show connection details
exports.show = (req,res)=>{
    let id = req.params.id;
    let connection = model.findById(id);
    if(connection) {
        res.render('./story/connectionDetails', {connection});
    }
        res.status(404).send('Cannot Find A Connection With The ID: ' + id);
};
//Edit a connections details
exports.edit = (req,res)=>{
    let id = req.params.id;
    let connection = model.findById(id);
    if(connection){
        res.render('./story/edit', {connection});
    } else {
        let err = Error('Cannot find connection with id ' + id);
        err.status = 404;
        next(err);
    }
};
//Update an exisiting connection
exports.update = (req,res)=>{
    let connection = req.body;
    let id = req.params.id;

    if(model.updateById(id, connection)) {
        res.redirect('/connections/'+id);
    }else{
        res.status(404).send('Cannot Find Story With Id: ' + id);
    }
};
//Delete an existing connection
exports.delete = (req,res)=>{
    let connection = req.body;
    let id = req.params.id;

    if(model.deleteById(id, connection)) {
        res.redirect('/connections');
    }else{
        res.status(404).send('Cannot Find Story With Id: ' + id);
    }
};
//Render the about page - FIX ME
exports.about = (req,res)=>{
    res.render('./story/about');
};
//Render the contact page - FIX ME
exports.contact = (req,res)=>{
    res.render('./story/contact');
};
