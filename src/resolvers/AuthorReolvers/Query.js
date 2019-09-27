const { getAllAuthors, getOneAuthor } = require('../../services/AuthorService');

const getAuthors = async() => {
    const authors = await getAllAuthors();
    return authors;
// return getAllAuthors().then(authors => authors)
//                       .catch((e) => {throw new Error(e)})
};

const getSingleAuthor =  async(_,params) => {
    const author = await getOneAuthor(params.id);
    if (!author) throw new Error('Author not exist');
    return author;
};

module.exports = {
    getAuthors,
    getSingleAuthor
};