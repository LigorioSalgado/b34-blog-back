const { Query:QueryAuthor, Mutation:MutationAuthor} = require('./AuthorReolvers');
const { Query:QueryPost, Mutation:MutationPost  } = require('./PostResolvers');
const { post } =  require('./Subscriptions');
const { URLResolver, EmailAddressResolver } = require('graphql-scalars');


module.exports ={
    EmailAddress:EmailAddressResolver,
    URL:URLResolver,
    Query:{
        ...QueryAuthor, //split object,
        ...QueryPost
    },
    Mutation:{
        ...MutationAuthor,
        ...MutationPost
    },
    Subscription:{
        post
    }
};