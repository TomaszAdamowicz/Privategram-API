const jwt = require('jsonwebtoken');
const config = require('../config/config');

const verifyToken = (req, res, next) => {
    let token = '';

    if(req.headers['authorization'] !== undefined) {
        token = req.headers['authorization'];
    }

    if(!token) {
        return res.json({
            success: false,
            message: 'You need to log in'
        })
    }

    jwt.verify(token, config.jwt, (err, decoded) => {
        if(err) {
            return res.status(440).json({
                sucess: false,
                message: 'Expired token'
            })
        }

        res.locals.id = decoded.user;

        next();
    })
}

module.exports = verifyToken;
