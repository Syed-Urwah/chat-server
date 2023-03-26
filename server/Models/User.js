const mongoose = require('mongoose')

//creating userSchema
const userSchema = mongoose.Schema({
    name:{
        type: String,
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    imgUrl:{
        type: String,
        default: 'https://firebasestorage.googleapis.com/v0/b/mytube-78ca0.appspot.com/o/profile.webp?alt=media&token=915d3ba6-45b0-4783-a164-b4711eb16287'
    },
    shortDescription:{
        type: String,
        default: 'SyedChat Only'
    }
},{
    timestamps: true
});

//creating model
const User = mongoose.model('user', userSchema);
//exporting model
module.exports = User