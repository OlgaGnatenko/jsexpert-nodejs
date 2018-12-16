const posts = require('../mock/posts');

const Post = require('../models/post.model');

const getPosts = (req, res) => {
    Post.find({}, (err, posts) => {
        console.log("post response", err, posts);
        err ? res.status(500).json(err) : res.status(200).send(posts)
    })
};

const getPost = (req, res) => {
    const post = new Post(req.body);
    post.save( (err) => {
        err ? res.status(500).json(err) : res.status(201).send(post)
    });
};

const postPost = (req, res) => {
    const { text, picture } = req.body;
    const post = new Post({ text, picture });
    console.log('before save', post);
    post.save( (err) => {
        err ? res.status(500).json(err) : res.status(201).send(post)
    });
};

module.exports = {
    getPosts,
    postPost
};

