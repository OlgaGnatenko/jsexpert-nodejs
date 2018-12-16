const mongoose = require('mongoose');

const dbURI = 'mongodb://dbuser:dbuser1234@ds019468.mlab.com:19468/jsexpert-node-db';

var dbOptions = {
    user: 'dbuser',
    pass: 'dbuser1234',
    useNewUrlParser: true
}

mongoose.connect(dbURI, dbOptions);
mongoose.connection.on('connected', function() {
    console.log('Mongoose connected to: ' + dbURI)
});

mongoose.connection.on('error', function() {
    console.log('Mongoose connection error: ' + dbURI)
});

module.exports = mongoose; 