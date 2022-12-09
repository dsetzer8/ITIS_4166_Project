const {body} = require('express-validator');
const {validationResult} = require('express-validator');

exports.validateId = (req,res,next)=>{
    let id = req.params.id; //String type
    if(id.match("contact")){
        return res.render('./contact');
    }
    if(id.match("about")){
        return res.render('./about');
    }
    if(id.match("profile")){
        return res.render('/users/profile');
    }
    if(id.match("login")){
        return res.render('/users/login');
    }
    if(id.match("new")){
        return res.redirect('./new');
    }
    if(id.match("logout")){
        return res.redirect('/');
    }
    if(!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid Connection Id');
        err.status = 400;
        return next(err);
    }
};

exports.validateSignUp = [body('firstName', 'First name cannot be empty').notEmpty().trim().escape(),
body('lastName', 'Last name cannot be empty').notEmpty().trim().escape(),
body('email', 'Email must be a valid email address.').isEmail().trim().escape().normalizeEmail(),
body('password', 'Password must be at least 8 characters and at most 64 characters.').isLength({min:8, max:64})];

exports.validateLogin = [body('email', 'Email must be a valid email address.').isEmail().trim().escape().normalizeEmail(),
body('password', 'Password must be at least 8 characters and at most 64 characters.').isLength({min:8, max:64})];

exports.validateResult = (req, res, next) => {
    let errors = validationResult(req);
    if(!errors.isEmpty()) {
        errors.array().forEach(error =>{
            req.flash('error', error.msg);
        });
        return res.redirect('back');
    } else {
        return next();
    }
}

exports.validateStory = [body('title', 'Title cannot be empty').notEmpty().trim().escape(),
body('content', 'Content must be at least 10 characters').trim().escape()];