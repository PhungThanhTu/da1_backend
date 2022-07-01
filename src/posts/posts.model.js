const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {

    title: {
      type: String,
      required: true,
      unique:true
    },
    desc: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: false,
    },
    content:{
        type:String,
        required:false
    },
    username: {
      type: String,
      required: true,
    },
    categories: {
      type: Array,
      required: false,
    },
  },
  { timestamps: true }
);

var Post = mongoose.model("Posts",PostSchema,'posts');


// get post by id
exports.getPostById = async id => {
  return await Post.findById(id);
},
// create post
exports.createPost = async (post,username,categories) => {
  post.username = username;
  post.categories = categories;
  console.log(post);
  const newPost =   await Post(post);
  console.log(newPost);
  return await newPost.save();
},
// update post
exports.updatePost = async (id,post) => {
  return await Post.findByIdAndUpdate(
    id,
    {
      $set:post
    },
    {
      new: true
    }
  );
},
// delete post
exports.deletePost = async id => {
  const post = await Post.findById(id);
  return await post.delete();
},
// get posts by category
exports.getByCategory = async categories => {
  const categoryArr = categories.map(category => {
    categories: category
  })
  return await Post.find({
    categories : {
      categoryArr
    }
  })
},
// get all post
exports.getAll = async () =>{
  return await Post.find();
}
// get my posts
exports.getMy = async (username) => {
  return await Post.find({
    username:username
  })
}
