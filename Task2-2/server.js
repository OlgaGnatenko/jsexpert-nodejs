const http = require('http');
const fs = require('fs');
const split2 = require('split2');

const SERVER_PORT = 3000;
const RESPONSE_OK = 200;
const DELIMITER = ',';

const parsedCSVPath = `${__dirname}/assets/sample.csv`;
const parsedData = [];
let keys = [];

let lineCount = 0;
//read and parse CSV
fs.createReadStream(parsedCSVPath)
    .pipe(split2())
    .on('data', function (item) {
        if (lineCount == 0) {
            keys = item.split(',');
        } else {
            let newDataItem = {};
            item.split(',').forEach((value, index) => {
                newDataItem[keys[index]] = value;
            });
            parsedData.push(newDataItem);
        }
        lineCount++;
    })
    .on('end', () => {
        console.log("read end:\n", parsedData);
    });

var server = http.createServer(function (req, res) {
    if (req.method === 'GET') {
        // get response returns the headers it has received in request
        res.statusCode = RESPONSE_OK;
        res.setHeader('Content-Type', 'application/json');
        Object.keys(req.headers).forEach((key) => {
            res.setHeader(key, req.headers[key])
        })
        // parse csv and turn it into json
        res.write(JSON.stringify(parsedData));
        res.end();
    }
});

server.listen(SERVER_PORT, function () {
    console.log(`Listening at ${SERVER_PORT}`);
});