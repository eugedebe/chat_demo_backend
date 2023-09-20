const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { generateJWT } = require('../helpers/jwt');

const createUser = async (req, res = response) => {

    try {

        const mailExists = await User.findOne({ email });
        if (mailExists) {
            return res.status(400).json({
                ok: false,
                message: 'The email already exists.'
            })
        }

        const user = new User(req.body);

        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);
        await user.save();

        const token = await generateJWT(user.id);


        res.json({
            ok: true,
            msg: 'User Creation',
            user,
            token

        })

    } catch (e) {
        console.log(e);
        res.status(500).json({
            ok: false,
            message: `Internal error: ${e.message}`
        })
    }


}



const loginUser = async (req, res = response) => {
    const { email, password } = req.body;

    try {
        // Step 1: Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                ok: false,
                message: 'Invalid email or password.'
            });
        }

        // Step 2: Compare the passwords
        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                message: 'Invalid email or password.'
            });
        }

        // Step 3: Generate a JWT token
        const token = await generateJWT(user.id);

        // Step 4: Send a response with the token and user data
        res.json({
            ok: true,
            user,
            token
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            ok: false,
            message: `Internal error: ${e.message}`
        });
    }



}

const renewToken = async (req, res = response) => {

    try {
        const uid = req.uid;

        const token = await generateJWT(uid);

        const user = await User.findById(uid);



        res.json({
            ok: true,
            user,
            token
        })
    } catch (e) {
        return res.status(500).json({
            ok: false,
            message: `Error ${e.message}`
        })

    }
}
module.exports = { createUser, loginUser, renewToken }


