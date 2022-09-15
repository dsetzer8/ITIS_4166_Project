const http = require('http');
const fs = require('fs');

const port = 8080;
const host = 'localhost';
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');

    let path = './views/';

    if(req.url === '/index') {
        path = path + 'index.html';
    } else if (req.url === '/connections'){
        path = path + 'connections.html';
    } else if (req.url === '/connectiondetails'){
        path = path + 'connectiondetails.html';
    } else if (req.url === '/newconnection'){
        path = path + 'newconnection.html';
    } else {
        res.statusCode = 404;
        path = path + '404.html';
    }    
    fs.readFile(path, (err, data) => {
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