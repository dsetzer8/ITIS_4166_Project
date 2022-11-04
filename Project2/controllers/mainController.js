//Required Modules
const model = require('../models/connection');

//Render the home page
exports.home = (req,res)=>{
    res.render('./index');
}
//Renders the connections pageS
exports.index = (req,res,next)=>{
    model.find()
    .then(connections => res.render('./story/index', {connections}))
    .catch(err => next(err));
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
exports.show = (req,res, next)=>{
    let id = req.params.id;//String type
    model.findById(id)
    .then(connection =>{
        if(connection) {
            res.render('./story/connectionDetails', {connection});
        }else{
            let err = new Error('Cannot Find Connection With Id: ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err => next(err));
};
//Edit a connections details
exports.edit = (req,res, next)=>{
    let id = req.params.id;
    let connection = model.findById(id);
    if(connection){
        res.render('./story/edit', {connection});
    } else {
        let err = Error('Cannot Find Connection With Id: ' + id);
        err.status = 404;
        next(err);
    }
};
//Update an exisiting connection
exports.update = (req,res, next)=>{
    let connection = req.body;
    let id = req.params.id;

    if(model.updateById(id, connection)) {
        res.redirect('/connections/'+id);
    }else{
        let err = Error('Cannot Find Connection With Id: ' + id);
        err.status = 404;
        next(err);
    }
};
//Delete an existing connection
exports.delete = (req,res, next)=>{
    let connection = req.body;
    let id = req.params.id;

    if(model.deleteById(id, connection)) {
        res.redirect('/connections');
    }else{
        let err = Error('Cannot Find Connection With Id: ' + id);
        err.status = 404;
        next(err);
    }
};
//Render the about page - FIX ME
exports.about = (req,res)=>{
    res.render('about');
};
//Render the contact page - FIX ME
exports.contact = (req,res)=>{
    res.render('contact');
};
