const { createPost, updatePost, deletePost } = require('../../services/PostService');
const { getOneAuthor } = require('../../services/AuthorService'); 


const createNewPost =  async(_,params) => {
    const post = await createPost(params.data);
    // Temporal solution
    const author = await getOneAuthor(params.data.author);
    author.posts.push(post._id);
    author.save();
    return post;
};

const updateOnePost =  async(_,params) =>{
    const post = await updatePost(params.id,params.data);
    if(!post) throw new Error('Post not exist');
    return post;
};

const deleteOnePost = async(_,params) => {
    const post = await deletePost(params.id);
    if(!post) throw new Error('Post not exist');
    return 'Post deleted';
};

module.exports =  {
    createNewPost,
    updateOnePost,
    deleteOnePost
};