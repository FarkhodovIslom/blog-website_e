const jwt = require('jsonwebtoken');

class TokenService {
    static generateAccessToken(userId) {
      return jwt.sign(
        { userId }, 
        process.env.JWT_SECRET, 
        { expiresIn: '15m' }
      );
    }

    static generateRefreshToken(userId) {
      return jwt.sign(
        { userId }, 
        process.env.REFRESH_TOKEN_SECRET, 
        { expiresIn: '7d' }
      );
    }

    static validateAccessToken(token) {
        try {
          return jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
          return null;
        }
    }

    static validateRefreshToken(token) {
        try {
          return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
        } catch (error) {
          return null;
        }
    }
};

module.exports = TokenService;