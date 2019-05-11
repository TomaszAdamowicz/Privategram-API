const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const salt = require('../../config/jwt');
const sanitize = require('../../utils/sanitize');
const userCreator = require('../../services/user/userCreator');

exports.login = async (req, res, next) => {
    const {userName, userPassword} = req.body;

    if(!userName || !userPassword) next(err)

    const user = await User.findOne({name: userName});

    if(!user) {
        res.status(403).json({
            success: false,
            message: 'Wrong username or password'
        })
    } else if(user) {
        bcrypt.compare(userPassword, user.password, (err, result) => {
            if(err) {
                res.status(403).json({
                    success: false,
                    message: 'Wrong username or password'
                })
            } else if(result) {
                const payload = {
                    user: user._id,
                }

                const token = jwt.sign(payload, salt(), {
                    expiresIn: '96h'
                })

                res.status(200).json({
                    success: true,
                    message: 'User logged in',
                    user: user._id,
                    role: user.role,
                    token: token
                })
            } else if(!result) {
                res.status(403).json({
                    success: false,
                    message: 'Wrong username or password'
                })
            }
        })
    }

}

exports.save = (req, res, next) => {
    const newUser = userCreator(req);

    User.create(newUser , (err, result) => {
        if(err) next(err);

        res.status(200).json(result)
    })
}

exports.get = async (req, res, next) => {
    let users = await User.find({});

    users.forEach( user => {
        user.password = null
    })

    if(users){
        res.status(200).json(users)
    } else {
        res.status(500).json({
            success: false,
            message: 'Cannot fetch users. Please try again later'
        })
    }
}

exports.delete = async (req, res, next) => {
    const userId = req.params.id;

    User.findByIdAndDelete({_id: userId}, (err) => {
        if(err) {
            res.status(500).json({
                success: false,
                message: 'Cannot delete user. Please try again later'
            })
        } else {
            res.status(200).json({
                success: true,
                message: 'User has been deleted'
            })
        }
    })
}