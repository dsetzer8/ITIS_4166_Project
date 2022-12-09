// Required Modules
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const session = require('express-session');
const {MongoClient} = require('mongodb');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const connectionRoutes = require('./routes/connectionRoutes');
const userRoutes = require('./routes/userRoutes');

// Create App
const app = express();

// Configure App
let port = 8084;
let host = 'localhost';
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
            })
);

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

// Connection Routes
app.use('/connections', connectionRoutes);

// User Routes
app.use('/users', userRoutes);

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