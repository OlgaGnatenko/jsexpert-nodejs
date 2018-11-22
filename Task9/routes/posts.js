const express = require('express');
const router = express.Router();
const Post = require('../models/post.model');

/* 
 mock-data для проверки эндпоинтов
 */
// const posts = [
//     {
//         author: {
//             _id: 1,
//             name: 'Jacob Thornton',
//             avatar: '/assets/img/avatar-mdo.png',
//         },
//         publicationDate: 1541589597000,
//         text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis.',
//         picture: '/assets/img/instagram_1.jpg',
//         _id: 1,
//     },
//     {
//         author: {
//             _id: 1,
//             name: 'Jacob Thornton',
//             avatar: '/assets/img/avatar-mdo.png',
//         },
//         publicationDate: 1541071109000,
//         text: 'Curabitur dolor risus, porta vel mattis eget, aliquet sed ipsum. Pellentesque porta purus tellus, in porttitor.',
//         picture: '/assets/img/instagram_2.jpg',
//         _id: 2
//     },
//     {
//         author: {
//             _id: 1,
//             name: 'Jacob Thornton',
//             avatar: '/assets/img/avatar-mdo.png',
//         },
//         publicationDate: 1541071109000,
//         text: 'Pellentesque condimentum quam vitae tellus sodales, non tristique libero blandit. Nunc eu convallis arcu. Integer imperdiet.',
//         picture: '/assets/img/instagram_3.jpg',
//         _id: 3
//     },
//     {
//         author: {
//             _id: 1,
//             name: 'Jacob Thornton',
//             avatar: '/assets/img/avatar-mdo.png',
//         },
//         publicationDate: 1541071109000,
//         text: 'Sed quis ligula non tortor venenatis placerat ut id massa. Cras posuere nulla vel diam facilisis.',
//         picture: '/assets/img/instagram_4.jpg',
//         _id: 4
//     },
//     {
//         author: {
//             _id: 1,
//             name: 'Jacob Thornton',
//             avatar: '/assets/img/avatar-mdo.png',
//         },
//         publicationDate: 1541071109000,
//         text: 'Curabitur lobortis leo ut consequat molestie. Morbi semper varius erat, sed molestie libero ultrices sit amet.',
//         picture: '/assets/img/instagram_5.jpg',
//         _id: 5
//     },
//     {
//         author: {
//             _id: 1,
//             name: 'Jacob Thornton',
//             avatar: '/assets/img/avatar-mdo.png',
//         },
//         publicationDate: 1541071109000,
//         text: 'Aliquam in erat ut ligula gravida accumsan id vel ex. Duis volutpat, mi in tincidunt malesuada.',
//         picture: '/assets/img/instagram_6.jpg',
//         _id: 6
//     },
// ];

/* Get all posts */
router.get('/', function (req, res) {
    Post.find({}, (err, posts) => {
        err ? res.status(500).send(err) : res.status(200).send(posts);
    });
});

router.get('/:id', function (req, res) {
    console.log('Getting posts', req.params);
    Post.findOne({ _id: parseInt(req.params.id) }, (err, post) => {
        err ? res.status(500).send(err) : res.status(200).send(post);
    });
});

router.post('/', function (req, res, next) {
    const post = new Post(req.body);
    console.log('SAVE request', req.body);
    console.log('SAVE request', post);
    post.save(function (err) {
        err ? res.status(500).send(err) : res.status(201).send(post);
    });
});

router.use((err, req, res) => {
    console.error(err);

    if (req.app.get('env') !== 'development') {
        delete err.stack;
    }

    res.status(err.statusCOde || 500).json(err);
});

module.exports = router;
