const jwt = require('jsonwebtoken');
const salt = require('../config/jwt');

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

    jwt.verify(token, salt(), (err, decoded) => {
        if(err) {
            return res.status(401).json({
                sucess: false,
                message: 'Session expired. Login again'
            })
        }

        res.locals.id = decoded.user;

        next();
    })
}

module.exports = verifyToken;
