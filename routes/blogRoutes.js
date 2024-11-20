const express = require('express');
const { createPost, updatePost, deletePost, fetchPosts } = require('../controllers/blogController');
const { authenticate } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', authenticate, createPost);
router.put('/:id', authenticate, updatePost);
router.delete('/:id', authenticate, deletePost);
router.get('/', fetchPosts);

module.exports = router;
