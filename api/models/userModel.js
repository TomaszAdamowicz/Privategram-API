const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: false,
    },
    role: {
        type: String,
        default: 'Guest',
        required: true
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post'
    }]
})

UserSchema.pre('save', function(next){
    const user = this;

    if(!user.isModified('password')) return next()

    bcrypt.hash(user.password, 10, function(err, hash){
        if(err) return next(err)

        user.password = hash;

        next();
    })
})

module.exports = mongoose.model('user', UserSchema, 'users');
