const Post = require('../models/postModel');
const User = require('../models/userModel');

exports.getAllPosts = async (req,res,next)=>{
    try{
        const posts = await Post.find().populate("postedBy","_id name").populate("comment.postedBy","_id name").sort("-createdAt");
        res.status(200).json({
            status:'success',
            results:posts.length,
            data:{
                posts
            }
        });
    }catch(err)
    {
        res.status(400).json({
            status:'fail'
        });
    }
};

exports.createPost = async (req,res,next)=>{
    try{
    const {title,caption,photo} = req.body;
    const postedBy = req.user;
    const newPost = await Post.create({
        title,
        caption,
        photo,
        postedBy
    });
    res.status(201).json({
        status:'success',
        data:{
            data:newPost
        }
    });
    }catch(err)
    {
        res.status(400).json({
            status:'fail',
            message:err
        });
    }
};

exports.getMyPosts = async (req,res,next)=>{
    const myPosts = await Post.find({postedBy:req.user.id});
    res.status(201).json({
        status:'success',
        data:{
            data:myPosts
        }
    });
    next();
};

exports.addComment = async (req,res,next)=>{
    const comment = {
        text:req.body.text,
        postedBy:req.user
    }
    await Post.findByIdAndUpdate(req.body.postId,{
        $push:{comment:comment}
    },{
        new:true
    });
    res.status(201).json({
        status:'success',
        data:{
            comment
        }
    });
    next();
};

exports.likeUnlike = async (req,res,next)=>{
    const post = await Post.findById(req.body.postId);
    const truth = post.likedBy.includes(req.user._id);
    let obj ;
    if(truth)
    {
        obj = {
            $pull:{likedBy:req.user._id}
        }
    }
    else
    {
        obj = {
            $push:{likedBy:req.user._id}
        }
    }
    await Post.findByIdAndUpdate(req.body.postId,obj,{
        new:true
    });
    res.status(201).json({
        status:'success',
        data:{
            post
        }
    });
    next();
};

exports.showAllComments = async (req,res,next)=>{
    const posts = await Post.findById(req.params.postId).populate("comment.postedBy","_id name profilePhoto");
    req.body = posts;
    next();
};

exports.findOthersProfile = async (req,res,next) => {
    const thisUser = await User.findById(req.params.userId);
    const isFriend = req.user.friends.includes(thisUser._id);
    const isSame = req.user._id.toString() === thisUser._id.toString();
    if(isSame)
    {
        res.redirect('/profile');
    }
    else
    {
        req.foundUser = thisUser;
        req.friend = isFriend;
        next();
    }
};

exports.deleteComment = async (req,res,next)=>{
    const post = await Post.findById(req.body.postId);
    const comments = post.comment;
    let commentRemoved;
    for(var i=0;i<comments.length;i++)
    {
        if(comments[i]._id.toString() === req.body.commentId.toString())
        {
            commentRemoved = comments[i];
        }
    }
    await Post.findByIdAndUpdate(req.body.postId,{
        $pull:{comment:commentRemoved}
    },{
        new:true
    });
    res.status(201).json({
        status:'success',
        data:{
            commentRemoved
        }
    });
    next();
};

exports.sendRequest = async(req,res,next)=>{
    const userId = req.params.userId;
    const otherUser = await User.findById(userId);
    const friendReq = otherUser.friendReq.includes(req.body.currUser);
    if(!friendReq)
    {
        await User.findByIdAndUpdate(userId,{
            $push:{friendReq:req.body.currUser}
        },{
            new:true
        });
        res.status(201).json({
            status:'success',
            data:{
                userId
            }
        });
    }
    next();
};

exports.rejectReq = async(req,res,next)=>{
    await User.findByIdAndUpdate(req.user._id,{
        $pull:{friendReq:req.body.userId}
    },{
        new:true
    });
    res.status(201).json({
        status:'success',
    });
    next();
};

exports.acceptReq = async(req,res,next)=>{
    await User.findByIdAndUpdate(req.user._id,{
        $pull:{friendReq:req.body.userId},
        $push:{friends:req.body.userId}
    },{
        new:true
    });

    await User.findByIdAndUpdate(req.body.userId,{
        $push:{friends:req.user._id}
    },{
        new:true
    });

    res.status(201).json({
        status:'success',
    });
    next();
};

exports.removeFriend = async(req,res,next)=>{
    await User.findByIdAndUpdate(req.user._id,{
        $pull:{friends:req.params.userId}
    },{
        new:true
    });

    await User.findByIdAndUpdate(req.params.userId,{
        $pull:{friends:req.user._id}
    },{
        new:true
    });
    res.status(201).json({
        status:'success',
    });
    next();
};

exports.removePost = async(req,res,next)=>{
    await Post.findByIdAndDelete(req.params.postId);
    res.status(201).json({
        status:'success',
    });
    next();
};
