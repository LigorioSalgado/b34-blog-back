require('dotenv').config();
const { GraphQLServer } = require('graphql-yoga');
const { importSchema } = require('graphql-import');
const resolvers = require('./src/resolvers');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology: true});

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

const server = new GraphQLServer({typeDefs, resolvers});//schema de graphql

server.start(() => console.log('Works in port 4000 :)'));