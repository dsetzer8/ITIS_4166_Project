// Required Modules
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const session = require('express-session');
const {MongoClient} = require('mongodb');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const mainRoutes = require('./routes/mainRoutes');
const {getCollection} = require('./models/connection');
const User = require('./models/user');
var _ = require('lodash');
// Create App
const app = express();

// Configure App
let port = 8084;
let host = 'localhost';
let url = 'mongodb://localhost:27017/NBAD';
app.set('view engine', 'ejs');

// Connect to MongoDB - NBAD
mongoose.connect('mongodb://localhost:27017/NBAD',
                    {useNewUrlParser: true, useUnifiedTopology: true})
.then(() =>{
        //Start App
        app.listen(port, host, ()=>{
            console.log('Server is running on port ', port);
    });
})
.catch(err => console.log(err.message));

// Mount Middleware
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('tiny'));
app.use(methodOverride('_method')); 

// Sessions and Cookies
app.use(session({
    secret: '398th9gh39hgiuqh23hg92hb29',
    resave: false,
    saveUninitialized: false,
    cookie:{maxAge: 60*60*1000},
    store: new MongoStore({mongoUrl:'mongodb://localhost:27017/NBAD'})
}));

// Session Counter
app.use((req, res, next)=>{
    if(!req.session.counter)
        req.session.counter = 1;
    else
        req.session.counter++;

    console.log(req.session);
    next();
});
// Flash
app.use(flash());
// Flash: Error and Success
app.use((req, res, next) => {
    //console.log(req.session);
    res.locals.user = req.session.user||null;
    res.locals.errorMessages = req.flash('error');
    res.locals.successMessages = req.flash('success');
    next();
});

// Main Route
app.use('/',mainRoutes);

// Connection Route
app.use('/connections', mainRoutes);

// Error Handlers - 404
app.use((req, res, next)=> {
    let err = new Error('The Server Cannot Locate The URL:' + req.url);
    err.status = 404;
    next(err);
});

// Error Handler - 500
app.use((err, req, res, next)=>{
    if(!err.status){
        err.status = 500;
        err.message = ("Internal Server Error");
    }
    res.status(err.status);
    res.render('error', {error: err});
});

// CHANGE THESE WHEN DONE

// Contact and About Routes
app.use('/contact',mainRoutes);
app.use('/about',mainRoutes);

//GET: Sign-up Form
app.get('/new', (req,res)=>{
    res.render('new');
});

//POST: Create A New User
app.post('/', (req, res, next)=>{
    let user = new User(req.body);
    user.save()
    .then(()=> res.redirect('/login'))
    .catch(err=>{
    if(err.name === 'ValidationError') {
        req.flash('error', err.message);
        return res.redirect('/new');
    }
    if(err.code === 11000){
        req.flash('error', 'Email Address Has Been Used');
        return res.redirect('/new');
    }
        next(err);
    });
});

//GET: Login Form
app.get('/login', (req,res)=>{
    console.log(req.flash());
    res.render('login');
});

//POST: Login Request
app.post('/login', (req, res, next)=>{
    //Authenticate The User's Login Request
    let email = req.body.email;
    let password = req.body.password;
    //Get The User that Matches the Email
    User.findOne({email: email})
    .then(user=>{
        if(user){
            //User In Database
            user.comparePassword(password)
            .then(result=>{
                if(result){
                    req.session.user = user._id; //Store User Id in the Session
                    req.flash('success', 'You Have Successfully Logged In');
                    res.redirect('/profile');
                }else{
                    console.log('Wrong Password');
                    req.flash('error', 'Wrong Password!');
                    res.redirect('/login');
                }
            })
        }else {
            console.log('Wrong Email Address');
            req.flash('error', 'Wrong Email Address!');
            res.redirect('/login');
        }
    })
    .catch(err=>next(err));
});

//GET: Profile Page
app.get('/profile', (req, res, next)=>{
    let id = req.session.user;
    console.log(req.flash());
    User.findById(id)
    .then(user=>res.render('profile', {user}))
    .catch(err=>(err));
});

//GET: Logout User
app.get('/logout', (req, res, next)=>{
    req.session.destroy(err=>{
        if(err)
            return next(err);
        else
            res.redirect('/');
    });
});