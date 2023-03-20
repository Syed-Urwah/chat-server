const mongoose = require('mongoose');

const conversationSchema = mongoose.Schema({
    members:[String]
},{
    timestamps: true
})

const conversation = mongoose.model('conversation', conversationSchema)
module.exports = conversation;