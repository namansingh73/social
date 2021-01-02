const Post = require('../models/postModel');
const User = require('./../models/userModel');

exports.frontPage = (req,res) => {
    res.status(200).render('front',{
        title:`Overview`
    });
};

exports.getLoginForm = (req,res) => {
    res.status(200).render('loginpage',{
        title:`Log into your account`
    });
};

exports.signupform = (req,res) => {
    res.status(200).render('signuppage',{
        title:`Create new account`
    });
};

exports.mainPage = async (req,res,next) => {
    const user = req.user;
    let posts = await Post.find().populate("postedBy","_id name profilePhoto").populate("comment.postedBy","_id name").sort("-createdAt");
    posts.forEach(post=>{
        post.currentUserLiked = post.likedBy.includes(req.user._id);
    });
    const mypost = false;
    res.status(200).render('mainpage',{
        title:`Welcome`,
        posts,
        user,
        mypost
    });
    next();
};

exports.forgotPass = (req,res) => {
    res.status(200).render('forgotpassword',{
        title:`Forgot Password`
    });
};

exports.resetPass = (req,res) => {
    res.status(200).render('resetpassword',{
        title:`Reset Password`
    });
};

exports.showProfile = async (req,res) => {
    const user = req.user;
    const myPosts = await Post.find({postedBy:req.user._id});
    res.status(200).render('profile',{
        title:`Profile`,
        myPosts,
        user
    });
};

exports.showOthers = async (req,res) => {
    const myPosts = await Post.find({postedBy:req.foundUser._id});
    const user = await User.findById(req.foundUser._id);
    const isFriend = req.friend;
    const currUser = req.user;
    const isSame = req.isSame;
    res.status(200).render('othersProfile',{
        title:`Profile`,
        myPosts,
        user,
        isFriend,
        currUser,
        isSame
    });
};

exports.searchUser = async (req,res) => {
    const users = await User.find();
    let eligibleUsers = [];
    for(let i=0;i<users.length;i++)
    {
        if(users[i].name.includes(req.params.name) || users[i].email.includes(req.params.name) || users[i].username.includes(req.params.name))
        {
            eligibleUsers.push(users[i]);
        }
    }
    res.status(200).render('searchUsers',{
        title:'Users',
        eligibleUsers
    });
};


exports.addPost = (req,res) => {
    res.status(200).render('addPost',{
        title:'AddPost'
    });
};

exports.commentShow = (req,res) => {
    const onPost = req.body;
    const comments = onPost.comment;
    const loggedUser = req.user;
    res.status(200).render('commentPage',{
        title:'Comments',
        comments,
        loggedUser,
        onPost
    });
};

exports.friendReq = async (req,res)=>{
    const user = await User.findById(req.user._id).populate("friendReq","_id name profilePhoto");
    res.status(200).render('friendReq',{
        title:'Requests',
        user
    });
};

exports.friends = async(req,res,next)=>{
    const user = await User.findById(req.params.userId).populate("friends","_id name profilePhoto");
    const currUser = req.user;
    res.status(200).render('friends',{
        title:'Friends',
        user,
        currUser
    });
};

exports.myPosts = async(req,res,next)=>{
    const user = req.user;
    const mypost = true;
    let posts = await Post.find({postedBy:req.user._id}).populate("postedBy","_id name profilePhoto").populate("comment.postedBy","_id name").sort("-createdAt");
    posts.forEach(post=>{
        post.currentUserLiked = post.likedBy.includes(req.user._id);
    });
    res.status(200).render('mainpage',{
        title:`Welcome`,
        posts,
        user,
        mypost
    });
    next();
};