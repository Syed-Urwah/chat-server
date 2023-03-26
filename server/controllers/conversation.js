const Conversation = require('../Models/Converstaion');


const newConversation = async (req, res) => {

    try {
        const newCon = await new Conversation({
            members: [req.body.senderId, req.body.recieverId]
        });
        newCon.save();
        res.status(200).json(newCon)
    } catch (error) {
        res.status(500).json(error)
    }


}

const getConversations = async (req, res) => {
    try {
        const conversation = await Conversation.find({
            members: { $in: [req.params.userId] }
        });
        res.status(200).json(conversation);
    } catch (error) {
        res.status(500).json(error)
    }

}

const getbyConversationId = async(req,res)=>{
    try {
        const conversation = await Conversation.findById(req.params.id);
        res.status(200).json(conversation);
    } catch (error) {
        res.status(500).json(error)
    }
}

const getByReciverId = async (req,res) =>{

    try {
        const reciver = req.query.reciever
        const conversation = await Conversation.findOne({
        members: {$in : [reciver, req.user._id]}
    })
    if(conversation){
        res.status(200).json(conversation);
    }else{
        res.status(200).send('conversation not exist')
    }
    } catch (error) {
        res.status(500).json(error)
    }
    
}

module.exports = { newConversation, getConversations , getbyConversationId, getByReciverId }