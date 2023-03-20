const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
    try {
        const token = req.header('token');
        if (!token) {
            res.status(300).send("Kindly Login first")
        } else {
            const data = jwt.verify(token, process.env.JWT_SECRET);
            req.user = data.user
            next();
        }
    } catch (error) {
        res.status(500).json(error)
    }

}

module.exports = verifyToken