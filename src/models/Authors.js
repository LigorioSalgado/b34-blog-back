const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const AuthorSchema = new Schema({

    first_name:{
        type:String,
        required:true
    },
    last_name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
        
    },
    password:{
        type:String
    },
    birth_date:{
        type:Date //2019-09-25T20:00:00
    },
    gender:{
        type:String,
        enum:['M','F','O']
    },
    posts:{
        type:[Schema.Types.ObjectId],
        ref:'posts'
    },
    profile_pic:{
        type:String
    },
    is_active:{
        type:Boolean,
        default:true
    }

},{timestamps:true});

AuthorSchema.pre('save',function(next){
    const author = this;
    const SALT_FACTOR = 10;
    if(!author.isModified('password')) {return next();}
    bcrypt.genSalt(SALT_FACTOR,function(err,salt){
        if(err) return next(err);
        bcrypt.hash(author.password,salt,function(err,hash){
            if(err) return next(err);
            author.password = hash;
            next();
        });
    });

});
// //ES5
// function(){
//     this // scope ---> Prototype
// }
// //ES6
// () => {
//  this // Scope ---> Object Class
// }

module.exports =  mongoose.model('authors',AuthorSchema);