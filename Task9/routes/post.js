const express = require('express');
const router = express.Router();
const Post = require('../models/post.model');

/* Get all posts */
router.get('/', function(req, res, next) {

});

router.post('/', function(req, res, next) {
    const post = new Post(req.body);
    post.save(function(err) {
        err ? res.status(500).send(err) : res.status(201).send(post);
    });
    res.status(201).send(post);
});

module.exports = router;
