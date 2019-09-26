const {getAllAuthors} = require('../../services/AuthorService');

const getAuthors = async() => {
    const authors = await getAllAuthors();
    return authors;
// return getAllAuthors().then(authors => authors)
//                       .catch((e) => {throw new Error(e)})
};

module.exports = {
    getAuthors
};