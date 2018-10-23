const http = require('http');
const fs = require('fs');
const zlib = require('zlib');

const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/',
    method: 'POST',
    headers: {
        filename: 'data.txt',
        'Content-Type': 'application/octet-stream'
    }
};

const req = http.request(options, function(res) {
    console.log('Server response:' + res.statusCode);
});

fs.createReadStream('input_data.txt')
    .pipe(zlib.createGzip())
    .pipe(req)
    .on('finish', function() {
        console.log('File successfully sent');
    });