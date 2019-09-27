const { getAllPosts, getSinglePost } = require('../../services/PostService');


const getPosts = async() => {
    const posts =  await getAllPosts();
    return posts;
};

const getOnePost = async(_,params) => {
    const post = await getSinglePost(params.id);
    if(!post) throw new Error('Post not exist');
    return post;
};


module.exports = {
    getPosts,
    getOnePost
};