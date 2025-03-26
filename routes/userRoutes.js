const express = require('express');
const UserController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/me', authMiddleware, UserController.getCurrentUser);

module.exports = router;