const http = require('http');
const fs = require('fs');
const zlib = require('zlib'); 

function errorCb (err, data) {
    console.log(err ? "Error: " + err : data);
}

var server = http.createServer(function(req, res) {
    const filename = req.headers.filename;
    console.log('file request to server: ' + filename);
    req
        .pipe(zlib.createGunzip(), {end: false})
        .pipe(fs.createWriteStream(filename))
        .on('error', function(err, data) {
            console.error("server error", err)
        })
        .on('finish', function() {
            res.writeHead(201, {'Content-Type': 'text/plain'});
            res.end('That\'s it\n');
            console.log('File saved', filename);
        });
});

server.listen(3000, function() {
    console.log('Listening');
});