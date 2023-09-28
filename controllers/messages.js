const { response } = require("express");
const Message = require('../models/message');

const getMessagesFromChat = async (req, res = response) => {

    console.log('here we are')


    try {
        const myId = req.uid;

        const theirId = req.params.from;

        const last30 = await Message.find({
            $or: [{ from: myId, to: theirId }, { to: myId, from: theirId }]

        }).sort({ cretedAt: 'desc' }).limit(30);
        //ne means not exists and even this is used in a get, 
        //we have the req.uid because the middleware validate-jwt loads it

        // const messages = await Message.find({ _id: { $ne: req.uid } }).sort('-online').skip(from).limit(20);
        console.log('here we are')
        res.json({
            ok: true,
            conversation: last30,
        })
    }
    catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({
            ok: false,
            message: err
        })

    };

}


module.exports = { getMessagesFromChat };