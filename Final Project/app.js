// Required Modules
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
var _ = require('lodash');
const {MongoClient} = require('mongodb'); 
const mainRoutes = require('./routes/mainRoutes');
const {getCollection} = require('./models/connection');
const User = require('./models/user');

// Create App
const app = express();

// Configure App
let port = 8084;
let host = 'localhost';
let url = 'mongodb://localhost:27017/NBAD';
app.set('view engine', 'ejs');

// Connect to MongoDB - NBAD
mongoose.connect('mongodb://localhost:27017/NBAD',
                    {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
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

// Contact and About Routes
app.use('/contact',mainRoutes);
app.use('/about',mainRoutes);

// Change these when done

//Get: Sign-up Form
app.get('/new', (req,res)=>{
    res.render('new');
});

//POST: Create A New User
app.post('/', (req, res, next)=>{
    let user = new User(req.body);
    user.save()
    .then(()=> res.redirect('/login'))
    .catch(err=>next(err));
});