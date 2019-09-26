const { createAuthor } = require('../../services/AuthorService');

// eslint-disable-next-line no-unused-vars
const createNewAuthor = async(_,params) => {
    const author = await createAuthor(params.data);
    return author;
};

module.exports - {
    createNewAuthor
};