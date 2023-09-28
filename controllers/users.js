const { response } = require("express");
const User = require('../models/user');

const getUsers = async (req, res = response) => {
    //from is the starting data, for example if from is 20 means that 
    //the query will get as the first data in the position 20.
    // to send it in the query, it needs the followin structure in the url;
    //localhost:3000/api/users?from=0

    const from = Number(req.query.from) || 0;

    try {
        //ne means not exists and even this is used in a get, 
        //we have the req.uid because the middleware validate-jwt loads it
        const users = await User.find({ _id: { $ne: req.uid } }).sort('-online').skip(from).limit(20);
        res.json({
            ok: true,
            users,
        })
    }
    catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({
            ok: false,
            message: `Internal error: ${err.message}`
        })

    };

}


module.exports = { getUsers };