const User = require('../models/User');

class UserController {
    
  static async getCurrentUser(req, res) {
    try {
        
      const user = await User.findById(req.user._id).select('-password');
      
      if (!user) {
        return res.status(404).json({ message: 'User not found!' });
      }

      res.status(200).json({
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          createdAt: user.createdAt
        }
      });
    } catch (error) {
      res.status(500).json({ 
        message: 'Error', 
        error: error.message 
      });
    }
  }
}

module.exports = UserController;