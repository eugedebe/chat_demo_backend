const jwt = require('jsonwebtoken');

const validateJWT = (req, res, next) => {
    //read the token
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            ok: false,
            message: 'No token found'
        });
    }
    try {

        const { uid } = jwt.verify(token, process.env.JWT_KEY);
        // console.log(uid);
        req.uid = uid;


        next();

    } catch (e) {
        return res.status(401).json({
            ok: false,
            message: "Could not validate the token auth"
        })
    }

}

module.exports = { validateJWT };