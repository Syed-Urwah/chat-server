const express = require('express');
const { fetchUser, fetchByName } = require('../controllers/user');
const verifyToken = require('../middle-wares/verifyToken');


const router = express.Router();

router.get('/fetchUser/:id',fetchUser)

router.get('/fetchByName', fetchByName)

module.exports = router;