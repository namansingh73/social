const Post = require('../models/postModel');
const User = require('./../models/userModel');

exports.getAllUsers = async (req,res,next)=>{
    try{
        const users = await User.find();
        res.status(200).json({
            status:'success',
            results:users.length,
            data:{
                user:users
            }
        });
    }catch(err)
    {
        res.status(400).json({
            status:'fail'
        });
    }
};

exports.createUser = async (req,res,next)=>{
    try{
    const newUser = await User.create(req.body);
    res.status(201).json({
        status:'success',
        data:{
            data:newUser
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

exports.deleteUser = async (req,res,next)=>{
    const user = await User.findByIdAndDelete(req.params.id);
    if(!user)
    {
        res.status(400).json({
            status:'fail',
            message:'No user found by this id'
        });
        return next();
    }
};

exports.getUser = async (req,res,next)=>{
    const user = await User.findById(req.params.id);
    res.status(200).json({
        status:'success',
        data:{
            data:user,
        }
    });
};
// exports.addFriend = async (req,res,next)=>{
//     const user = User.findById
// };