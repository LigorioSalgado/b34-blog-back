const AuthorResolvers = require('./AuthorReolvers');
const { URLResolver, EmailAddressResolver } = require('graphql-scalars');


module.exports ={
    EmailAddress:EmailAddressResolver,
    URL:URLResolver,
    Query:{
        ...AuthorResolvers.Query //split object
    },
    Mutation:{
        ...AuthorResolvers.Mutation
    }
};