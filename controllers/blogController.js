const BlogPost = require('../models/BlogPost');

exports.createPost = async (req, res, next) => {
  try {
    const { title, content, tags } = req.body;
    const post = new BlogPost({ title, content, tags, author: req.user._id });
    await post.save();
    res.status(201).json({ message: 'Blog post created successfully', post });
  } catch (error) {
    next(error);
  }
};

exports.updatePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await BlogPost.findById(id);
    if (!post || post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized or post not found' });
    }
    const { title, content, tags } = req.body;
    Object.assign(post, { title, content, tags });
    await post.save();
    res.json({ message: 'Blog post updated successfully', post });
  } catch (error) {
    next(error);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await BlogPost.findById(id);
    if (!post || post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized or post not found' });
    }
    await post.remove();
    res.json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    next(error);
  }
};

exports.fetchPosts = async (req, res, next) => {
  try {
    const { page = 1, tag } = req.query;
    const limit = 10;
    const query = tag ? { tags: tag } : {};
    const posts = await BlogPost.find(query)
      .populate('author', 'name')
      .limit(limit)
      .skip((page - 1) * limit);
    res.json(posts);
  } catch (error) {
    next(error);
  }
};
