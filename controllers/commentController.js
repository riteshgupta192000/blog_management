const Comment = require('../models/Comment');

exports.addComment = async (req, res, next) => {
  try {
    const { blogPostId, content } = req.body;
    const comment = new Comment({ content, author: req.user._id, blogPost: blogPostId });
    await comment.save();
    res.status(201).json({ message: 'Comment added successfully', comment });
  } catch (error) {
    next(error);
  }
};

exports.fetchComments = async (req, res, next) => {
  try {
    const { blogPostId } = req.params;
    const comments = await Comment.find({ blogPost: blogPostId }).populate('author', 'name');
    res.json(comments);
  } catch (error) {
    next(error);
  }
};
