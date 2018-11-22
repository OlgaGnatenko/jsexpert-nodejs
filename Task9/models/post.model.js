const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    text: {
        type: String,
        required: [true, "Text is required"]
    },
    picture: String,
    publicationDate: Date,
    author: {
        id: Number,
        name: String,
        avatar: String
    }
});

postSchema.pre('save', function (next) {
    this.id = mongoose.mongo.ObjectId();
    this.author = {
        id: 1,
        name: 'Mr Admin',
        lastName: 'LastAdmin',
        avatar: '/assets/img/avatar-mdo.png'
    };
    this.publicationDate = new Date();
    next();
});

postSchema.post('save', (err, doc, next) => {
    if (err.name !== 'MongoError' || err.code != 11000) {
        return next(err);
    }
    // handle validation errors here 
    // const path = 'duplicate key';
    // const validationError = new mongoose.Error.ValidationError();
    // validationError.errors[path] = validationError.errors[path] || {};
    // validationError.errors[path].message = `${path} is expected to be unique`;
    // validationError.errors[path].reason = err.message;
    // validationError.errors[path].name = err.name;
    next(validationError);
});

module.exports = mongoose.model('Post', postSchema);