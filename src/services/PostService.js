const { Posts } = require('../models');

//const createPost = (data) => Posts.create(data);

const getAllPosts = () => Posts.find({is_active:true}).populate('author');

const getSinglePost = (id) => Posts.findOne({_id:id,is_active:true}).populate('author');

const createPost = async(data) => { 
    const post  = await Posts.create(data);
    const populatedPost = await getSinglePost(post._id);
    return populatedPost;
};

const updatePost = (id,data) => Posts.findOneAndUpdate({_id:id},{...data},{new:true}).populate('author');

const deletePost = (id) => Posts.findOneAndUpdate({_id:id,is_active:true},{is_active:false});


module.exports = {
    createPost,
    getAllPosts,
    getSinglePost,
    updatePost,
    deletePost
};