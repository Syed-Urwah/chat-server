const User = require('../Models/User')
const jwt = require('jsonwebtoken');

const fetchUser = async (req,res) =>{
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
}


module.exports = {fetchUser};