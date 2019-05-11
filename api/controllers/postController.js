const Post = require('../models/postModel');
const User = require('../models/userModel');
const url = require('../../config/hostUrl');
const path = require('path');
const AdmZip = require('adm-zip');
const fs = require('fs');
const postCreator = require('../../services/post/postCreator');
const postUpdater = require('../../services/post/postUpdater');
const deleteFiles = require('../../services/file/deleteFile');


exports.getPosts = async (req, res, next) => {
    const {tag, page, year} = req.params;
    const user = await User.findById(res.locals.id);

    const filters = {};

    if(tag){
        filters.tags = `#${tag}`;
    }

    if(year){
        filters.year = year;
    }

    if(user.role != "Admin"){
        filters.public = {
            $ne: false
        };
    }

    const posts = await Post.find({...filters}).skip(page * 10).limit(10).sort({timestamp: -1});

    if(posts){
        res.status(200).json(posts);
    } else {
        res.status(500).json({
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
    const zipPath = path.join(__dirname, '../../public');
    const posts = await Post.find();
    const zip = new AdmZip();
    const today = new Date();
    const fileName = `wojtagram-${today.getMonth()}`;

    const createPaths = (array) => {
        const links = array.map( arrayItem => arrayItem.path[0]);
        const newArray = [].concat(...links);
        const urls = newArray.map(item => item.replace(url(), zipPath));

        return urls;
    }

    const paths = createPaths(posts);

    paths.map(path => {
        zip.addLocalFile(path);
    })

    zip.writeZip(`${zipPath}/zipped/${fileName}.zip`);

    res.download(`${zipPath}/zipped/${fileName}.zip`, `${fileName}.zip`, (err) => {
        if (err) {
            console.log(err);
        } else {
            fs.unlink(`${zipPath}/zipped/${fileName}.zip`, (err) => {
                if(err) throw err;
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
            res.status(500)
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
    const post = postUpdater(req);

    Post.findByIdAndUpdate({_id: _id}, post, {new: true}, (err, post) => {
        if(err){
            res.status(500).json({
                success: false,
                message: 'Nie udało się zaktualizować posta'
            })
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
            res.status(500).json({
                success: false,
                message: 'Cannot delete file, please try again later',
            })
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
        res.status(500),json({
            success: false,
            message: 'Server error connection'
        })
    }
}