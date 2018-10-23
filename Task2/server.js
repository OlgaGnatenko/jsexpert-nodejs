const http = require('http');
const fs = require('fs');
const zlib = require('zlib');
const meter = require('stream-meter');

const m = meter();
m.on("error", function (e) {
    // log the error but don't kill the process
    console.log(`Meter error: ${e.message}`)
});

const uploadFolder = 'received-files';

var server = http.createServer(function (req, res) {
    const filename = req.headers.filename;
    console.log('File request to server: ' + filename);
    req
        .pipe(m)
        .pipe(zlib.createGunzip())
        .pipe(fs.createWriteStream(`${__dirname}/${uploadFolder}/${filename}`)) //todo: check if file with suhc name already exists and handle this situation 
        // Q - how to handle errors here??? 
        .on('finish', function () {
            res.writeHead(201, { 'Content-Type': 'text/plain' });
            console.log(`File saved: ${filename}`);
            console.log(`Compressed file size: ${m.bytes}b`);
            res.end();
        });
});

server.listen(3000, function () {
    console.log('Listening');
});