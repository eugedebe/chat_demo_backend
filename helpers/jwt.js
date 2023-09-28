const jwt = require('jsonwebtoken');

const generateJWT = (uid) => {
    return new Promise((resolve, reject) => {
        const payload = { uid };
        jwt.sign(payload, process.env.JWT_KEY, {
            expiresIn: '24h',
        }, (err, token) => {
            if (err) {
                reject(`The error coulnd not be generated ${err}`);
            } else {
                resolve(token);
            }
        });
    })
}

const checkJwt = (token = '') => {
    try {
        const { uid } = jwt.verify(token, process.env.JWT_KEY);
        return [true, uid];
    } catch (error) {
        console.log('error: ', error);
        return [false, null];
    }
}


module.exports = {
    generateJWT,
    checkJwt
}