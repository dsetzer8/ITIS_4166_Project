//Required Modules
const model = require('../models/connection');

//Renders the connections page
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
    connection.author = req.session.user;
    connection.save()
    .then(connection=> {
        req.flash('success', 'Connection has been created successfully');
        res.redirect('/connections');
    })
    .catch(err =>{
        if(err.name === 'ValidationError'){
            req.flash('error', err.message);
            return res.redirect('/back');
        }
        next(err);
    });
};
//Show connection details
exports.show = (req, res, next)=>{
    let id = req.params.id;
    model.findById(id).populate('author', 'firstName lastName')
    .then(connection =>{
        if(connection) {
            return res.render('./story/connectionDetails', {connection});
        } else {
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
    model.findById(id)
    .then(connection=>{
        return res.render('./story/edit', {connection});
    })
    .catch(err=>next(err));
};
//Update an exisiting connection
exports.update = (req,res, next)=>{
    let connection = req.body;
    let id = req.params.id;

    model.findByIdAndUpdate(id, connection, {useFindAndModify: false, runValidators: true})
    .then(connection =>{
        if(connection) {
            res.redirect('/connections/' + id);
        }else{
            let err = Error('Cannot Find Connection With Id: ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err => {
        if(err.name === 'ValidationError') {
            req.flash('error', err.message);
            return res.redirect('/back');
        }
        next(err)
    });
};
//Delete an existing connection
exports.delete = (req,res, next)=>{
    let id = req.params.id;
    
    model.findByIdAndDelete(id, {useFindAndModify: false})
    .then(connection =>{
        res.redirect('/connections');
    })
    .catch(err=>next(err));
};

exports.rsvp = (req, res, next)=>{
    let rsvp = new model(req.body);
    rsvp.author = req.session.user;
    rsvp.save()
    .then(rsvp=> {
        req.flash('success', 'RSVP Successful');
        res.redirect('/connections');
    })
    .catch(err =>{
        if(err.name === 'ValidationError'){
            req.flash('error', err.message);
            return res.redirect('/back');
        }
        next(err);
    });
};