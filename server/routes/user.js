const express = require('express');
const { fetchUser } = require('../controllers/user');
const verifyToken = require('../middle-wares/verifyToken');


const router = express.Router();

router.get('/fetchUser/:id',fetchUser)

module.exports = router;