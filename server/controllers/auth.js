const User = require('../Models/User')
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var dotenv = require('dotenv')

const registration = async (req, res) => {

    try {
        //checking if the user already exist or not
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            res.status(300).send('User Already Exist with this email')
        } else {
            //using bcrypt to convert password into hash
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(req.body.password, salt);
            const newUser = await new User({
                name: req.body.name,
                email: req.body.email,
                password: hash
            })
            newUser.save();
            res.status(200).json(newUser);
        }
    } catch (error) {
        res.status(400).send(error)
    }




}

const login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        //if user not available with the given email
        if (!user) {
            res.status(300).send('User not found with this email');
        } else {
            //if password is incorrect
            const password = bcrypt.compareSync(req.body.password, user.password); // true
            if (!password) {
                res.status(300).send('Kindly Enter Correct Credentials');
            } else {
                const data = {
                    user
                }

                const token = jwt.sign(data, process.env.JWT_SECRET);
                res.status(200).json({ user, token })
            }
        }




    } catch (error) {
        console.error(error)
        res.status(400).send('error')
    }



}

const GoogleAuth = async (req,res) => {

    try {
        const user = await User.findOne({email: req.body.email});
    //login with Google
    if(user){
        const data = {
            user
        }
        const token = jwt.sign(data,process.env.JWT_SECRET);
        res.status(200).json({user, token});
    }else{
    //registration with google
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            imgUrl: req.body.imgUrl
        });
        newUser.save();

        const data = {
            newUser
        }

        const token = jwt.sign(data, process.env.JWT_SECRET);
        res.status(200).json({user: newUser, token})
    }
    } catch (error) {
        res.status(500).json(error)
    }

    
}

//exporting all functions
module.exports = { registration, login, GoogleAuth }