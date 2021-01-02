const express = require('express');
const viewcontroller = require('../controller/viewcontroller');
const authController = require('../controller/authController');
const router = express.Router();
const postController = require('../controller/postController');

router.get('/',authController.isLoggedIn,authController.reDirect);
router.get('/login',viewcontroller.getLoginForm);
router.get('/signup',viewcontroller.signupform);
router.get('/mainpage',authController.isLoggedIn,viewcontroller.mainPage);
router.get('/forgotpassword',viewcontroller.forgotPass);
router.get('/resetpassword/:token',viewcontroller.resetPass);
router.get('/profile',authController.isLoggedIn,viewcontroller.showProfile);
router.get('/addpost',viewcontroller.addPost);
router.get('/profile/:userId',authController.isLoggedIn,postController.findOthersProfile,viewcontroller.showOthers);
router.get('/friendRequest/:userId',authController.isLoggedIn,viewcontroller.friendReq);
router.get('/friends/:userId',authController.isLoggedIn,viewcontroller.friends);
router.get('/showUsers/:name',authController.isLoggedIn,viewcontroller.searchUser);

module.exports = router;