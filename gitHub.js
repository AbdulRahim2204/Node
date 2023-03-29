const http = require('http');
const fs = require('fs');
const path = require('path');
const {MongoClient} = require('mongodb');

const PORT = 3000;

// Database Setting
let db;

try{
    MongoClient.connect('mongodb://127.0.0.1:27017/pizza_house', (err, client) => {
        if(err) throw err;

            db = client.db;
        
    });

} catch(err){
    console.log(err);
}

const server = http.createServer((req, res) => {
// file content type
    let contentType = 'text/html';

// The request methode
    const reqMethode = req.method.toLowerCase();

// Request body
    let body = '';
    if(reqMethode === 'post' || reqMethode === 'put' || reqMethode === 'delete'){
        req.on('data', (chunk) => {
            body += chunk.toString();

        });
        req.on('end', () => {
            console.log(body);
        })
    }


// any file that bowrser request
    let filePath = path.join(__dirname, 'pizzaHouse', req.url === '/' ? 'index.html' : req.url);


// file extetion
    let fileExt = path.extname(filePath);

    switch(fileExt){
        case '.css':
            contentType = 'text/css';
            break;
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.json':
                contentType = 'application/json';
                break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
    }

// read the file path content
    fs.readFile(filePath, (err, data) => {
        if(err){
            if(err.code === 'ENOENT'){
                switch(reqMethode){
                    case 'get':
                        fs.readFile(path.join(__dirname, 'pizzaHouse', '404.html'), (err, data) => {
                            if(err) console.log(err);
                            res.writeHead(404, {'Content-Type': contentType});
                            // res.write(data, 'utf8');
                            res.end(data, 'utf8');
                        });
                        break;
                        case 'post':
                            res.writeHead(200, {'Content-Type': 'application/json'});
                            res.end(body);
                            break;
                            case 'put':
                        break;
                    case 'delete':
                        break;
                }

            } else {
                res.writeHead(500);
                res.end(`Server Error:${err}`);
            }
        } else {

        res.writeHead(200, {'Content-Type': contentType});
        // res.write(data, 'utf8');
        res.end(data, 'utf8');
        }
    });
});

server.listen(PORT);