const user = require('../models/user');

exports.new = (req, res)=>{
    res.render('./user/new');
};

exports.create = (req, res, next)=>{
    let user = new User(req.body); //create a new user
    User.save() // save the user to the database
    .then(user=> res.redirect('/users/login'))
    .catch(err => next(err));
        if(err.name === 'ValidationError') {
            req.flash('error', err.message);
            return res.redirect('/new');
        }

        if(err.code === 11000) {
            req.flash('error', 'Email address has been used');
            return res.redirect('/new');
        }
        next(err);
};

exports.login = (req, res)=>{
    res.render('./user/login');
};

 exports.loginRequest = (req,res)=>{
    //authenticate user's login request
    let email = req.body.email;
    let password = req.body.password;
    console.log(req.flash());
    //get the user that matches the email
    User.findOne({email: email})
    .then(user=>{
        if(user){
            //user found in database
            user.comparePassword(password)
            .then(result=>{
                if(result) {
                    req.session.user = user._id;//store user's id in the session
                    req.flash('Success', 'You have successfully logged in');
                    res.redirect('./user/profile');
                } else {
                    console.log('Wrong Password');
                    req.flash('error', 'Wrong Password!!');
                    res.redirect('./user/login');
                }    
            })
        } else{
            console.log('Wrong Email Address');
            req.flash('error', 'Wrong Email Address!!');
            res.redirect('./user/login');
        }
    })
    .catch(err => next(err))
};

exports.profile = (req,res)=>{
    let id = req.session.user;
    console.log(req.flash());
    User.findById(id)
    .then(user=>res.render('./user/profile', {user}))
    .catch(err => next(err));
};

exports.logout = (req,res, next)=>{
    req.session.destroy(err=>{
        if(err)
            return next(err);
        else
            res.redirect('/');
    });
};