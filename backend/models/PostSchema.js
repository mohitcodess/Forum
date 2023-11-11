import mongoose from "mongoose";
import User from "./UserSchema.js";
const {Schema} = mongoose;
const PostSchema = new Schema({
    text:String,
    createdBy:String,
    createdAt:String,
    likes:[],
    comments:[]
});
const Post = mongoose.model('Post',PostSchema);

export default Post;

