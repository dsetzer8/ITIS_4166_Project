const express = require('express');
const { v4: uuidv4} = require('uuid');
const morgan = require('morgan');
const app = express();
let port = 3000;
let host = 'localhost';

let students = [
    { id: 1, name: 'Alice', major: 'Computer Science '}, 
    { id: 2, name: 'Bob', major: 'Biology'},
    { id: 3, name: 'Charlie', major: 'Physics'}
];
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

app.use(morgan('tiny'));

app.use((req, res, next) => {
    console.log(req.method);
    console.log(req.url);
    next();
});

app.get('/', (req,res) => {
    res.sendFile('./views/index.html', {root: __dirname });
});

app.get('/students', (req, res) => {
    res.json(students);
});

app.post('/students', (req, res) => {
    //console.log(req.body);
    let student = req.body;
    student.id = uuidv4();
    students.push(student);
    res.redirect('/students');
});

app.get('/students/create', (req, res) => {
    res.sendFile('./views/new.html', {root: __dirname });
});

app.get('/students/:sid', (req,res) => {
    let id = req.params.sid;
    let student = students.find(element => element.id === parseInt(id));
    res.json(students);
});

app.get('/contact', (req,res) => {
    res.end('Contact Page');
});

app.get('/contact-me', (req, res) =>{
    res.redirect(301,'/contact');
});

app.use((req, res, next) =>{
    res.status(400).send('Page cannot be found');
});

app.listen(port, host, () => {
    console.log('The server is running at port', port);
});