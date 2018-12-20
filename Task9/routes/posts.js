const express = require('express');
const router = express.Router();
const controller = require('../controllers/posts');

router.get('/', controller.getPosts);
router.post('/', controller.postPost);
router.patch('/', controller.updatePost);

router.get('/:id', controller.getPost);
router.delete('/:id', controller.removePost);

// router.get('/posts', function(req, res) {

// });

// router.get('/posts/:postId/', function(req, res) {

// });

/* 
 mock-data для проверки эндпоинтов
 */

module.exports = router;
