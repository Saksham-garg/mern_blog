import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true,
        unique:true
    },
    content:{
        type:String,
        required:true
    },
    category:{
        type:String,
        default:'uncategorized'
    },
    imageUrl:{
        type:String,
        default:''
    },
    slug:{
        type:String,
        required:true
    }
},{timestamps:true})

export const Post = mongoose.model('Post', PostSchema)