const jwt = require('jsonwebtoken');
const User = require('../models/Users');

const authMiddleware = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
          return res.status(401).json({ message: 'Token doesnt exists!' });
        }
    
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);
    
        if (!user) {
          return res.status(401).json({ message: 'User mnot found!' });
        }
    
        req.user = user;
        next();
      } catch (error) {
        res.status(401).json({ message: 'incorrect token ' });
    }
};

module.exports = authMiddleware