const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,'Title is mandatory']
    },
    caption:{
        type:String,
    },
    photo:{
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    postedBy:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    },
    likedBy:[{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    }],
    comment:[{
        text:String,
        postedBy:{
            type:mongoose.Schema.ObjectId,
            ref:'User'
        }
    }]
});
const Post = mongoose.model('Post',postSchema);
module.exports = Post;
