const express = require('express');
const { newMessage, getMessages, lastMessage, searchMessage } = require('../controllers/message');
const verifyToken = require('../middle-wares/verifyToken');


const router = express.Router();

//create new message
router.post('/:conversationId', verifyToken, newMessage)

//get all the messages of a conversation
router.get('/:conversationId', verifyToken, getMessages)

router.get('/latestMessage/:conversationId', lastMessage)

router.get('/searchMessage', searchMessage)

module.exports = router