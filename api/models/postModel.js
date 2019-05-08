const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const dateData = require('../../utils/date');

const PostSchema = new Schema({
    title: {
        type: String,
        required: false,
    },
    media: {
        type: String,
        required: true,
    },
    path: {
        type: [{
            type: Object
        }],
        required: true,
    },
    public :{
        type: Boolean,
        required: false,
        default: true,
    },
    date: {
        type: String,
        required: true,
    },
    year: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    tags: {
        type: [{
            type: String
        }],
        required: false,
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
})

PostSchema.pre('validate', function(next) {
    const post = this;

    post.date = dateData().today;
    post.year = dateData().year;

    next();
})

module.exports = mongoose.model('post', PostSchema, 'posts');
