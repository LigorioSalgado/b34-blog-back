require('dotenv').config();
const { GraphQLServer } = require('graphql-yoga');
const { importSchema } = require('graphql-import');
const { makeExecutableSchema } = require('graphql-tools');
const mongoose = require('mongoose');
const resolvers = require('./src/resolvers');
const AuthDirective = require('./src/resolvers/Directives/AuthDirective');
const verifyToken = require('./src/utils/verifyToken');

const MONGO_URI = process.env.NODE_ENV == 'test' ? process.env.MONGO_TEST_URL : process.env.MONGO_URL;
mongoose.connect(MONGO_URI,{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology: true});

const mongo =  mongoose.connection;

mongo.on('error', (error) => console.log(error))
    .once('open',() => console.log('Connected to database'));

const typeDefs = importSchema(__dirname + '/schema.graphql');
 
// const typeDefs = `

//     type Query{
//         hello(name:String):String!
//         getUsers:[User!]

//     }

//     type Mutation{
//         createUser(name:String!,age:Int!):User
//     }

//     type User{
//         id:Int!
//         name:String!
//         age:Int!
//     }
   
// `;// La definición de como van a ser recibidos y enviados los 
//datos
// const users = [];

// const resolvers = {
//     Query:{
//         hello:(root,params,context,info) => `Hola ${params.name}`,//interpolacion
//         getUsers:(root,params,context,info) => users,
       
//     },
//     Mutation:{
//         createUser:(root,params,context,info) => {
//             const user  = {id:users.length+1,name:params.name,age:params.age};
//             users.push(user);
//             return user;
//         },
//     }
// };
//root -> trae la info del servidor de Graphql
//params -> son los datos que envia el cliente y estan definidos en el typeDefs
//context -> objeto por el cual se comunican todos los resolvers(Auth)
//info -> El query que se ejecuto en el cliente

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
    schemaDirectives:{
        auth:AuthDirective
    }
});

const port = process.env.PORT || 4000;

const server = new GraphQLServer({
    schema,
    context: async ({request}) => verifyToken(request)
});//schema de graphql

server.start({port},() => console.log('Works in port 4000 :)'));

module.exports = { schema };