const bcrypt = require('bcrypt');
const { getAuthorByEmail } = require('../services/AuthorService');
const createToken = require('./createToken');

const authenticate =  ({ email, password }) => {
    return new Promise((resolve,reject) => {
        getAuthorByEmail(email).then( user => {
            if(!user) reject(new Error('Author not exist'));
            bcrypt.compare(password,user.password,(err, isValid) => {
                if(err) reject(new Error('Error to compare passwords'));
                isValid ? resolve(createToken(user)) : reject(new Error('Password is incorrect'));
            });
        });
    });
};


module.exports = authenticate;