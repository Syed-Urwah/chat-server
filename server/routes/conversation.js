const express = require('express');
const { newConversation, getConversations } = require('../controllers/conversation');
const verifyToken = require('../middle-wares/verifyToken');

const router = express.Router();

//create new conversation
router.post('/',  newConversation)

//get all the conversation
router.get('/:userId', getConversations)


module.exports = router