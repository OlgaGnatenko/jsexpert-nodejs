const posts = require('../mock/posts');

const Post = require('../models/post.model');

const getPosts = (req, res) => {
    Post.find({}, null, { sort: {publicationDate: -1}}, (err, posts) => {
        err ? res.status(500).json(err) : res.status(200).send(posts)
    })
};

const postPost = (req, res) => {
    const { text, picture } = req.body;
    const post = new Post({ text, picture });
    post.save( (err) => {
        err ? res.status(500).json(err) : res.status(201).send(post)
    });
};

const getPost = (req, res) => {
    const { id } = req.params;
    const post = Post.findOne({_id: id}, (err, post) => {
        if (err) {
            return res.status(500).json(err)
        }
        if (!post) {
            return res.status(404).json(new Error("Post with such id does not exist"))
        }
        res.status(200).send(post);
    });
}

const updatePost = (req, res) => {
    const { text, picture, id } = req.body;
    const update = { text, picture };
    const options = {new: true, runValidators: true};

    // todo: handle validation errors on FE - show splash screen or return to editing 
    Post.findOneAndUpdate({_id: id}, update, options, (err, post) => {
        if (err) {
            return res.status(500).json(err);
        }
        if (!post) {
            return res.status(404).json(new Error("Post with such id does not exist"));
        }
        res.status(200).send(post);
    });
}

const removePost = (req, res) => {
    Post.findByIdAndRemove({_id: req.params.id}, function(err, post) {
        console.log('deleted post', post);
        err ? res.status(500).json(err) : res.status(200).send(post)
    });
}

module.exports = {
    getPosts,
    postPost,
    getPost,
    updatePost,
    removePost
};

