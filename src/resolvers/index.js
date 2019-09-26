const AuthorResolvers = require('./AuthorReolvers');


module.exports ={
    Query:{
        ...AuthorResolvers.Query //split object
    },
    Mutation:{
        ...AuthorResolvers.Mutation
    }
};