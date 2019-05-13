const User = require('../models/userModel');
const userLogger = require('../../services/user/userLogger');
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
    } else {
        const loginResult = await userLogger(user, userPassword);
        
        if(loginResult !== null){
            res.status(200).json(loginResult);
        } else {
            res.status(403).json({
                success: false,
                message: 'Wrong username or password'
            })
        }
    }
}

exports.save = (req, res, next) => {
    const newUser = userCreator(req);

    User.create(newUser , (err, result) => {
        if(err) {
            return next(err);
        }
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
            return next(err);
        } else {
            res.status(200).json({
                success: true,
                message: 'User has been deleted'
            })
        }
    })
}