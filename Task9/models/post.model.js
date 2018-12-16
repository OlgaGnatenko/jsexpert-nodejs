const mongoose = require('mongoose');
const user = require('../mock/user'); //todo: replace with user retrieval 

const postSchema = mongoose.Schema({
    _id: mongoose.Schema.ObjectId,
    author: {
        id: Number,
        name: String,
        avatar: String
    },
    publicationDate: Date,
    lastUpdateDate: Date, 
    text: String,
    picture: String
});

postSchema.pre('save', function(next) {
    this._id = mongoose.mongo.ObjectId();
    this.publicationDate = new Date();
    this.lastUpdateDate = new Date();
    this.author = {
        id: user.id,
        avatar: user.avatarUrl,
        name: user.firstName + ' ' + user.lastName
    };
    next();
});

module.exports = mongoose.model('Post', postSchema);