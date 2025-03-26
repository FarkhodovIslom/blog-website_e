const Post = require('../models/Post');

class PostController {
    
  static async createPost(req, res) {
    try {
      const { title, content } = req.body;
      
      
      const post = new Post({
        title,
        content,
        author: req.user._id,
        image: req.file ? req.file.path : null 
      });

      await post.save();

      res.status(201).json({
        message: 'Пост успешно создан',
        post: {
          id: post._id,
          title: post.title,
          content: post.content,
          author: post.author,
          createdAt: post.createdAt
        }
      });
    } catch (error) {
      res.status(500).json({ 
        message: 'Error craeting post', 
        error: error.message 
      });
    }
  }

  
  static async getAllPosts(req, res) {
    try {
        
      const posts = await Post.find()
        .populate('author', 'username email')
        .sort({ createdAt: -1 }); 

      res.status(200).json({
        posts: posts.map(post => ({
          id: post._id,
          title: post.title,
          content: post.content,
          author: post.author,
          createdAt: post.createdAt
        }))
      });
    } catch (error) {
      res.status(500).json({ 
        message: 'Error', 
        error: error.message 
      });
    }
  }

  
  static async getPostById(req, res) {
    try {
      const post = await Post.findById(req.params.id)
        .populate('author', 'username email');

      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }

      res.status(200).json({
        post: {
          id: post._id,
          title: post.title,
          content: post.content,
          author: post.author,
          createdAt: post.createdAt
        }
      });
    } catch (error) {
      res.status(500).json({ 
        message: error, 
        error: error.message 
      });
    }
  }

  
  static async updatePost(req, res) {
    try {
      const { title, content } = req.body;
      
      const post = await Post.findByIdAndUpdate(
        req.params.id, 
        { title, content },
        { new: true } 
      );

      if (!post) {
        return res.status(404).json({ message: 'Post not f' });
      }

      res.status(200).json({
        message: 'Update successful!',
        post: {
          id: post._id,
          title: post.title,
          content: post.content
        }
      });
    } catch (error) {
      res.status(500).json({ 
        message: error, 
        error: error.message 
      });
    }
  }

  
  static async deletePost(req, res) {
    try {
      const post = await Post.findByIdAndDelete(req.params.id);

      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }

      res.status(200).json({ 
        message: 'Post deleted succesfully' 
      });
    } catch (error) {
      res.status(500).json({ 
        message: error, 
        error: error.message 
      });
    }
  }
}

module.exports = PostController;