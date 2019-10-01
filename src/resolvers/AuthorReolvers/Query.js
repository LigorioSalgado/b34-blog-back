const { getAllAuthors, getOneAuthor } = require('../../services/AuthorService');

const getAuthors = async() => {
    const authors = await getAllAuthors();
    console.log(authors);
    return authors;
// return getAllAuthors().then(authors => authors)
//                       .catch((e) => {throw new Error(e)})
};

const getSingleAuthor =  async(_,params) => {
    const author = await getOneAuthor(params.id);
    if (!author) throw new Error('Author not exist');
    return author;
};

const me = async(root,params,{user}) => {
    const author = await getOneAuthor(user._id);
    return author;
};

module.exports = {
    getAuthors,
    getSingleAuthor,
    me
};