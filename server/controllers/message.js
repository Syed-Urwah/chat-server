const Message = require('../Models/Message');

const newMessage = async (req, res) => {
    try {
        const newMsg = new Message({
            conversationId: req.params.conversationId,
            sender: req.user._id,
            text: req.body.text,
            imgUrl: req.body.imgUrl,
            videoUrl: req.body.videoUrl
        })
        newMsg.save();
        res.status(200).json(newMsg);
    } catch (error) {
        res.status(500).json(error)
    }

}

const getMessages = async (req, res) => {
    try {
        const messages = await Message.find({
            conversationId: req.params.conversationId
        })
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json(error)
    }

}

const lastMessage = async (req, res) => {
    try {
        const message = await Message.find({conversationId: req.params.conversationId}).sort({ createdAt: -1 }).limit(1);
        res.status(200).json(message)
    } catch (error) {
        res.status(500).json(error);
    }

}

const searchMessage = async (req,res) =>{
    try {
        const query = req.query.search
        const message = await Message.find({text: { $regex: query, $options: "i" }}).limit(40);
        res.status(200).json(message)
    } catch (error) {
        res.status(500).json(error);
    }
    
}

module.exports = { newMessage, getMessages, lastMessage, searchMessage }
