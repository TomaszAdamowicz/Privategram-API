const Post = require('../models/postModel');
const User = require('../models/userModel');
const dateData = require('../../utils/date');
const deleteFiles = require('../../utils/deleteFile');
const url = require('../../settings/hostUrl');
const makeTagsArray = require('../../utils/makeTagsArray');
const makePathsArray = require('../../utils/makePathsArray');
const sanitize = require('../../utils/sanitize');
const path = require('path');
const AdmZip = require('adm-zip');
const fs = require('fs');

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

    const year = dateData().year;
    const imgPaths = [];

    req.files.forEach( file => {
        imgPaths.push(`${url()}/images/${year}/${file.filename}`);
    })

    const imgSmallPaths = [];

    req.resizedImagesNames.forEach( file => {
        imgSmallPaths.push(`${url()}/images/${year}/${file}`)
    })

    const {title, public, userId, tags} = req.body;
    const user = await User.findById({_id: userId});

    const imgTags = makeTagsArray(tags);
    const paths = makePathsArray(imgPaths, imgSmallPaths);

    const post = new Post ({
        title: sanitize(title),
        media: 'jpg',
        path: paths,
        public: public,
        author: sanitize(user.name),
        tags: sanitize(imgTags)
    })

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
    const {_id, title, tags, public} = req.body;
    let newPost = {};

    if(title) newPost.title = sanitize(title)

    newPost.public = public;

    if(tags) {
        const tagsArray = makeTagsArray(tags);
        newPost.tags = sanitize(tagsArray);
    }

    Post.findByIdAndUpdate({_id: _id}, newPost, {new: true}, (err, post) => {
        if(err){
            res.status(500).json({
                success: false,
                message: 'Cannot update post, please try again later'
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