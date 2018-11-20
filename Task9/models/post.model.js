const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    text: {
        type: String,
        required: [true, "Text is required"]
    },
    photo: Buffer,
    author: {
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: {
            type: String,
            match: /\S+@\S+\.\S+/
        },
        avatarUrl: String
    }
});

postSchema.pre('save', function(next) {
    this._id = mongoose.mongo.ObjectId();
    this.user = {
        username: 'admin',
        password: '111',
        firstName: 'Admin',
        lastName: 'LastAdmin',
        email: 'admin@admin.com'
    };
    next();
});

module.exports = mongoose.model('Post', postSchema);