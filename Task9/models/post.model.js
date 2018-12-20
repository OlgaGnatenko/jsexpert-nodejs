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
    text: {
        type: String,
        required: [true, 'Post text cannot be empty']
    },
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

postSchema.pre('findOneAndUpdate', function(next) {
    this._update.lastUpdateDate = new Date();
    next();    
})

module.exports = mongoose.model('Post', postSchema);