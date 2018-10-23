const http = require('http');
const fs = require('fs');
const zlib = require('zlib');

const readFileName = 'input_data.txt';
const fileSize = 0;

const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/',
    method: 'POST',
    headers: {
        filename: readFileName,
        'Content-Type': 'application/octet-stream',
        'Accept-Encoding': 'gzip'
    }
};

fs.stat(readFileName, function (err, stat) {
    console.log(`Initial file size: ${stat.size}b`);
});


const req = http.request(options, function (res) {
    console.log(`Server response: ${res.statusCode}`);
});

fs.createReadStream(readFileName)
    .pipe(zlib.createGzip())
    .pipe(req)
    .on('finish', function () {
        console.log('File successfully sent');
    });