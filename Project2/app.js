//Required Modules
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const storyRoutes = require('./routes/storyRoutes');
//Create App
const app = express();

//Configure App
let port = 3000;
let host = 'localhost';
app.set('view engine', 'ejs');

//Mount Middleware
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('tiny'));
app.use(methodOverride('_method'));

//Routes Setup
app.get('/', (req,res)=>{
    res.render('index');
});

//Start Server
app.listen(port, host, ()=>{
    console.log('Server is running on port ', port);
})