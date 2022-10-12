//Required Modules
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const connectionRoutes = require('./routes/connectionRoutes');

//Create App
const app = express();

//Configure App
let port = 8084;
let host = 'localhost';
app.set('view engine', 'ejs');

//Mount Middleware
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('tiny'));
app.use(methodOverride('_method'));

//Main Route
app.get('/', (req,res)=>{
    res.render('index');
});

//Connection Route
app.use('/connections', connectionRoutes);

//Error Handlers


//Start Server
app.listen(port, host, ()=>{
    console.log('Server is running on port ', port);
})