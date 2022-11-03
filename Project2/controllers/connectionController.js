const model = require('../models/connection');
exports.index = (req,res)=>{
    let connections = model.find();
    res.render('./story/index', {connections});
};

exports.new = (req,res)=>{
    res.render('./story/newConnections');
};

exports.create = (req,res)=>{
    let connection = req.body;
    model.save(connection);
    res.redirect('/connections');
};

exports.show = (req,res)=>{
    let id = req.params.id;
    let connection = model.findById(id);
    if(connection) {
        res.render('./story/connectionDetails', {connection});
    }
        res.status(404).send('Cannot Find A Connection With The ID: ' + id);
};

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

exports.update = (req,res)=>{
    let connection = req.body;
    let id = req.params.id;

    if(model.updateById(id, connection)) {
        res.redirect('/connections/'+id);
    }else{
        res.status(404).send('Cannot Find Story With Id: ' + id);
    }
};

exports.delete = (req,res)=>{
    let connection = req.body;
    let id = req.params.id;

    if(model.deleteById(id, connection)) {
        res.redirect('/connections');
    }else{
        res.status(404).send('Cannot Find Story With Id: ' + id);
    }
};

exports.about = (req,res)=>{
    res.redirect('/story/about');
};

exports.contact = (req,res)=>{
    res.redirect('/story/contact');
};