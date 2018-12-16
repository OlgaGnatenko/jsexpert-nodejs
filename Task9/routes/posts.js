const express = require('express');
const router = express.Router();
const controller = require('../controllers/posts');

router.get('/', controller.getPosts);

router.post('/', controller.postPost);


// router.get('/', (req, res) => {
//     console.log('getting posts', controller.getPosts);
//     const postsTemp = [{
//         author: {
//             id: 1,
//             name: 'Jacob Thornton',
//             avatar: '/assets/img/avatar-mdo.png',
//         },
//         publicationDate: 1541589597000,
//         text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis.',
//         picture: '/assets/img/instagram_1.jpg',
//         id: 1,
//     }];
//     res.status(200).send(postsTemp);
// });


// router.get('/:id', controller.getPostById(id));

// router.get('/posts', function(req, res) {

// });

// router.get('/posts/:postId/', function(req, res) {

// });

/* 
 mock-data для проверки эндпоинтов
 */

module.exports = router;
