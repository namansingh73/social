const express = require('express');
const postController = require('./../controller/postController');
const authController = require('./../controller/authController');
const viewController = require('./../controller/viewcontroller');

const router = express.Router();

router.get('/getposts',postController.getAllPosts);
router.post('/addpost',authController.isLoggedIn,postController.createPost);
router.get('/myposts',authController.isLoggedIn,viewController.myPosts);
router.put('/addComment',authController.isLoggedIn,postController.addComment);
router.put('/likeUnlike',authController.isLoggedIn,postController.likeUnlike);
router.get('/showComments/:postId',authController.isLoggedIn,postController.showAllComments,viewController.commentShow);
router.put('/removeComment/:commentId',authController.isLoggedIn,postController.deleteComment);
router.put('/addFriend/:userId',authController.isLoggedIn,postController.sendRequest);
router.put('/rejectReq/:userId',authController.isLoggedIn,postController.rejectReq);
router.put('/acceptReq/:userId',authController.isLoggedIn,postController.acceptReq);
router.put('/removeFriend/:userId',authController.isLoggedIn,postController.removeFriend);
router.delete('/removePost/:postId',authController.isLoggedIn,postController.removePost);

module.exports = router;