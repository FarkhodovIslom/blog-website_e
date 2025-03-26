const User = require('../models/Users');
const TokenService = require('../utils/tokenService');

class AuthController {
    
    static async register(req, res) {
      try {
        const { username, email, password } = req.body;
  
        
        const existingUser = await User.findOne({ 
          $or: [{ email }, { username }] 
        });
  
        if (existingUser) {
          return res.status(400).json({ 
            message: 'User already exists !' 
          });
        }
  
        
        const user = new User({ username, email, password });
        await user.save();
  
        
        const accessToken = TokenService.generateAccessToken(user._id);
        const refreshToken = TokenService.generateRefreshToken(user._id);
  
        
        res.status(201).json({
          message: 'User succesfuly registered ',
          user: {
            id: user._id,
            username: user.username,
            email: user.email
          },
          tokens: {
            accessToken,
            refreshToken
          }
        });
      } catch (error) {
        res.status(500).json({ 
          message: 'Error ', 
          error: error.message 
        });
      }
    }
  
    
    static async login(req, res) {
      try {
        const { email, password } = req.body;
  
        
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(401).json({ 
            message: 'Incorect exmail or password ' 
          });
        }
  
        
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
          return res.status(401).json({ 
            message: 'incorrect email or password ' 
          });
        }
  
        
        const accessToken = TokenService.generateAccessToken(user._id);
        const refreshToken = TokenService.generateRefreshToken(user._id);
  
        
        res.status(200).json({
          message: 'Login successful ',
          user: {
            id: user._id,
            username: user.username,
            email: user.email
          },
          tokens: {
            accessToken,
            refreshToken
          }
        });
      } catch (error) {
        res.status(500).json({ 
          message: 'Login error', 
          error: error.message 
        });
      }
    }
  
    
    static async refreshToken(req, res) {
      try {
        const { refreshToken } = req.body;
  
        
        const decoded = TokenService.validateRefreshToken(refreshToken);
        if (!decoded) {
          return res.status(401).json({ 
            message: 'Refresh token error ' 
          });
        }
  
        
        const user = await User.findById(decoded.userId);
        if (!user) {
          return res.status(401).json({ 
            message: 'User not found ' 
          });
        }
  
        
        const newAccessToken = TokenService.generateAccessToken(user._id);
  
        res.status(200).json({
          accessToken: newAccessToken
        });
      } catch (error) {
        res.status(500).json({ 
          message: 'Error while updating token', 
          error: error.message 
        });
      }
    }
  
    
    static async logout(req, res) {
      try {
        res.status(200).json({ 
          message: 'Login succesful' 
        });
      } catch (error) {
        res.status(500).json({ 
          message: 'Error while logging in', 
          error: error.message 
        });
      }
    }
  }
  
  module.exports = AuthController;