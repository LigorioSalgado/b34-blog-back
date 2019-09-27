const { createAuthor, updateAuthor, deleteAuthor } = require('../../services/AuthorService');

// eslint-disable-next-line no-unused-vars
const createNewAuthor = async(_,params) => {
    const author = await createAuthor(params.data);
    return author;
};

const updateOneAuthor = async(_,params) => {
    const author = await updateAuthor(params.id,params.data);
    //const author =  await getOneAuthor(params.id);
    if(!author) throw new Error('Author not exist');
    //Object.keys(params.data).forEach(key => author[key] = params.data[key]);
    //author.save({new:true});
    return author;
};

const deleteOneAuthor = async(_,params) => {
    const author =  await deleteAuthor(params.id);
    if(!author) throw new Error('Author not exist');
    return 'Author deleted';
};

module.exports = {
    createNewAuthor,
    updateOneAuthor,
    deleteOneAuthor
};