const express = require('express');
const PostController = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware');
const ownerMiddleware = require('../middleware/ownerMiddleware');
const multer = require('multer');

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); 


router.post('/', 
  authMiddleware, 
  upload.single('image'), 
  PostController.createPost
);

router.get('/', PostController.getAllPosts);
router.get('/:id', PostController.getPostById);

router.put('/:id', 
  authMiddleware, 
  ownerMiddleware, 
  PostController.updatePost
);

router.delete('/:id', 
  authMiddleware, 
  ownerMiddleware, 
  PostController.deletePost
);

module.exports = router;