const Post = require('../models/postModel');
const User = require('../models/userModel');
const fs = require('fs');
const postCreator = require('../../services/post/postCreator');
const postUpdater = require('../../services/post/postUpdater');
const deleteFiles = require('../../services/file/deleteFile');
const createSearchFilters = require('../../utils/createSearchFilters');
const createDownloadPaths = require('../../utils/createDownloadPaths');
const zipFiles = require('../../services/file/zipFiles');

exports.getPosts = async (req, res, next) => {
    const {tag, page, year} = req.params;
    const user = await User.findById(res.locals.id);
    const filters = createSearchFilters(tag, year, user.role);
    const posts = await Post.find({...filters}).skip(page * 10).limit(10).sort({timestamp: -1});

    if(posts){
        res.status(200).json(posts);
    } else {
        res.status(204).json({
            success: false,
            message: 'No posts matching tag'
        })
    }
}

exports.getUserPosts = (req, res, next) => {
    User.findById(req.params.id).populate('posts').exec((err, user) => {
        if(user.posts.length > 0){
            res.status(200).json(user.posts)
        } else {
            res.status(204).json({
                success: false,
                message: `No posts from user ${user.name}`
            })
        }
    })
}

exports.getPhotosCopy = async (req, res, next) => {
    const posts = await Post.find();
    const paths = createDownloadPaths(posts);

    const fileData = zipFiles(paths);

    res.download(fileData.path, fileData.file, (err) => {
        if (err) {
            return next(err);
        } else {
            fs.unlink(fileData.path, (err) => {
                if(err) {
                    return next(err);
                }
            });
        }
    });
}

exports.save = async (req, res, next) => {
    const {userId} = req.body;
    const user = await User.findById({_id: userId});
    const post = postCreator(req, user.name);

    post.save((err) => {
        if(err) {
            return next(err);
        } else {
            user.posts.push(post);
            user.save((err) => {
                next(err)
            })
            res.status(200).json(post)
        }
    })
}

exports.update = (req, res, next) => {
    const {_id} = req.body;
    let post = postUpdater(req);

    Post.findByIdAndUpdate({_id: _id}, post, {new: true}, (err, post) => {
        if(err){
            let error = new Error('Nie udało się zaktualizować posta');
    
            return next(error);
        } else {
            res.status(200).json(post)
        }
    })
}

exports.delete = async (req, res, next) => {
    const {postId, author} = req.body;
    const user = await User.findOne({name: author});
    const post = await Post.findById(postId);

    deleteFiles(post.path, post.year);

    user.posts.remove(postId);
    user.save()

    Post.findByIdAndDelete({_id: postId}, (err) => {
        if(err) {
            let error = new Error('Nie udało się usunąć posta, spróbuj ponownie później');
    
            return next(error);
        } else {
            res.status(200).json({
                success: true,
                message: 'File has been removed'
            })
        }
    })
}

exports.getYears = async (req, res, next) => {
    const posts = await Post.find();

    const yearsArray = posts.map(post => post.year);

    const years = [...new Set(yearsArray)];

    if(years != undefined) {
        res.status(200).json({
            success: true,
            years: years
        });
    } else {
        return next();
    }
}