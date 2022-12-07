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
exports.create = (req,res, next)=>{
    let connection = new model(req.body);
    connection.save()
    .then(connection=> res.redirect('/connections'))
    .catch(err =>{
        if(err.name === 'ValidationError'){
            err.status = 400;
        }
        next(err);
    });
};
//Show connection details
exports.show = (req,res, next)=>{
    let id = req.params.id;//String type

    if(id.match("contact")){
        return res.render('./contact');
    }
    if(id.match("about")){
        return res.render('./about');
    }
    if(!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid Connection Id');
        err.status = 400;
        return next(err);
    }
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

    if(!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid Connection Id');
        err.status = 400;
        return next(err);
    }
    model.findById(id)
    .then(connection =>{
        if(connection){
            return res.render('./story/edit', {connection});
        } else {
            let err = Error('Cannot Find Connection With Id: ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err => next(err));
};
//Update an exisiting connection
exports.update = (req,res, next)=>{
    let connection = req.body;
    let id = req.params.id;
    if(!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid Connection Id');
        err.status = 400;
        return next(err);
    }

    model.findByIdAndUpdate(id, connection, {useFindAndModify: false, runValidators: true})
    .then(connection =>{
        if(connection) {
            res.redirect('/connections/'+id);
        }else{
            let err = Error('Cannot Find Connection With Id: ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err => {
        if(err.name === 'ValidationError')
            err.status = 400;
        next(err)
    });
};
//Delete an existing connection
exports.delete = (req,res, next)=>{
    let connection = req.body;
    let id = req.params.id;

    if(!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid Connection Id');
        err.status = 400;
        return next(err);
    }

    model.findByIdAndDelete(id,{useFindAndModify: false})
    .then(connection =>{
        if(connection) {
            res.redirect('/connections')
        } else{
            let err = new Error('Cannot find a story with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err => next(err)); 
};
//Render the about page - FIX ME
exports.about = (req,res)=>{
    res.redirect('./about');
};
//Render the contact page - FIX ME
exports.contact = (req,res)=>{
    res.redirect('./contact');
};
