const { Authors } = require('../models');


const createAuthor = (data) => Authors.create(data);

const getAllAuthors = () => Authors.find({is_active:true}).populate({
    path:'posts',
    model:'posts'
});

const getOneAuthor = (id) => Authors.findOne({_id:id,is_active:true}).populate({
    path:'posts',
    model:'posts'
});

const getAuthorByEmail = (email) => Authors.findOne({email,is_active:true});

const updateAuthor = (id,data) => Authors.findByIdAndUpdate(id,{...data},{new:true});

const deleteAuthor = (id) => Authors.findOneAndUpdate({_id:id,is_active:true},{is_active:false});

module.exports = {
    createAuthor,
    getAllAuthors,
    getOneAuthor,
    getAuthorByEmail,
    updateAuthor,
    deleteAuthor
};