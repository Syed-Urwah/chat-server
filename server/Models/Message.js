const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    conversationId: {
        type: String
    },
    sender:{
        type: String
    },
    text:{
        type: String
    },
    imgUrl:{
        type: String
    },
    video:{
        type: String
    },
    videoUrl:{
        type: String
    }
    
},{
    timestamps: true
})

const message = mongoose.model('message', messageSchema);
module.exports = message;