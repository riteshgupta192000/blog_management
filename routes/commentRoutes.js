const express = require('express');
const { addComment, fetchComments } = require('../controllers/commentController');
const { authenticate } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', authenticate, addComment);
router.get('/:blogPostId', fetchComments);

module.exports = router;
