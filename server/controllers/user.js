const User = require('../Models/User')
const jwt = require('jsonwebtoken');

const fetchUser = async (req, res) => {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
}

const fetchByName = async (req, res) => {
    try {
        const query = req.query.search;
        const users = await User.find({ name: { $regex: query, $options: "i" } }).limit(40);
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json(error)
    }

}


module.exports = { fetchUser, fetchByName };