const express = require('express');
const {registration, login, GoogleAuth } = require('../controllers/auth');
const router = express.Router();

router.post('/registration', registration)

router.post('/login', login)

router.post('/google', GoogleAuth)

module.exports = router