const Connection = require('../models/connection');
//Check if user is a guest
exports.isGuest = (req,res,next)=>{
    if(!req.session.user){
        return next();
    } else {
        req.flash('error', 'You are logged in already');
        return res.redirect('/users/profile');
    }
};
//Check if user is authenticated
exports.isLoggedIn = (req,res,next)=>{
    if(req.session.user){
        return next();
    } else{
        req.flash('error', 'You need to log in first');
        return res.redirect('/users/login');
    }
};
//Check if user is author of the connection
exports.isAuthor = (req,res,next)=>{
    let id = req.params.id;
    Connection.findById(id)
    .then(connection=>{
        if(connection){
            if(connection.author == req.session.user){
                return next();
            } else{
                let err = new Error('Unauthorized to access the resource');
                err.status = 401;
                return next(err);
            }
        } else {
            let err = new Error('Cannot Find A Connection With Id ' + req.params.id);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err=>next(err));
};