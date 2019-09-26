const mongoose = require('mongoose');

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
        unique:true,
        
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

module.exports =  mongoose.model('authors',AuthorSchema);