const express = require('express');
const { newConversation, getConversations, getbyConversationId, getByReciverId } = require('../controllers/conversation');
const verifyToken = require('../middle-wares/verifyToken');

const router = express.Router();

//create new conversation
router.post('/',  newConversation)

//get all the conversation
router.get('/byUserId/:userId', getConversations)

router.get('/byConversationId/:id', getbyConversationId)

router.get('/getByReciver', verifyToken, getByReciverId)


module.exports = router