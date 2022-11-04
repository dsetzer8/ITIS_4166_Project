//Required Modules
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
var _ = require('lodash');
const {MongoClient} = require('mongodb'); 
const mainRoutes = require('./routes/mainRoutes');
const {getCollection} = require('./models/connection');
//Create App
const app = express();

//Configure App
let port = 8084;
let host = 'localhost';
let url = 'mongodb://localhost:27017';
app.set('view engine', 'ejs');

//Connect to MongoDB
MongoClient.connect(url)
.then(client =>{
    const db = client.db('NBAD');
    getCollection(db);
    //Start Server
    app.listen(port, host, ()=>{
        console.log('Server is running on port ', port);
    })
})
.catch(err => console.log(err.message));

//Mount Middleware
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('tiny'));
app.use(methodOverride('_method'));

//Main Route
app.use('/',mainRoutes);

//Connection Route
app.use('/connections', mainRoutes);

//Error Handlers
app.use((req, res, next)=> {
    let err = new Error('The Server Cannot Locate The URL:' + req.url);
    err.status = 404;
    next(err);
});

//Error Handler
app.use((err, req, res, next)=>{
    if(!err.status){
        err.status = 500;
        err.message = ("Internal Server Error");
    }
    res.status(err.status);
    res.render('error', {error: err});
});

