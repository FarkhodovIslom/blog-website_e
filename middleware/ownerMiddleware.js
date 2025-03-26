const Post = require('../models/Post');

const ownerMiddleware = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Пост не найден' });
    }

    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Недостаточно прав' });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

module.exports = ownerMiddleware;