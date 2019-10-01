const { createPost, updatePost, deletePost } = require('../../services/PostService');
//const { getOneAuthor } = require('../../services/AuthorService'); 


const createNewPost =  async(_,{data},{user}) => {
    data.author = user._id;
    const post = await createPost(data);
    // Temporal solution
    //const author = await getOneAuthor(params.data.author);
    user.posts.push(post._id);
    user.save();
    return post;
};

const updateOnePost =  async(_,{id,data},{user}) =>{
    const post = await updatePost(id,data,user);
    if(!post) throw new Error('Post not exist');
    return post;
};

const deleteOnePost = async(_,{id},{user}) => {
    const post = await deletePost(id,user);
    if(!post) throw new Error('Post not exist');
    return 'Post deleted';
};

module.exports =  {
    createNewPost,
    updateOnePost,
    deleteOnePost
};