const mongoose = require('mongoose');

const dbURI = 'mongodb://admin:admin123@ds019468.mlab.com:19468/jsexpert-node-db';

const connectionOptions = {
    useNewUrlParcer: true
};

mongoose.connect(dbURI, connectionOptions);

mongoose.connection.on('connected', function () {
    console.log('Mongo!', dbURI);
});

mongoose.connection.on('error', function (err) {
    console.log('ERROR connecting!', err);
});

module.exports = mongoose;

