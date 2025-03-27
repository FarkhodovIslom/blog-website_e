const Post = require('../models/Post');

const ownerMiddleware = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'POst not found' });
    }

    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access demied' });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: 'Servererror' });
  }
};

module.exports = ownerMiddleware;