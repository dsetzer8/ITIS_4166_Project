//Create a server and interpret the request object

const http = require('http');
const fs = require('fs');

const port = 8084;
const host = 'localhost';
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');

    let path = './Local Module Exports and Imports/';

    if(req.url === '/') {
        path = path + 'index.html';
    } else if (req.url === '/contact'){
        path = path + 'contact.html';
    } else if (req.url === '/about'){
        path = path + 'about.html';
    } else {
        res.statusCode = 404;
        path = path + '404.html';
    }    
    fs.readFile('./Local Module Exports and Imports/index.html', (err, data) => {
        if(err) {
            console.log(err);
            res.end();
        }else {
            res.write(data);
            res.end();
        }
    });
});

server.listen(port, host, () => {
    console.log('The server is running on port', port);
});

//ctrl + c to close

