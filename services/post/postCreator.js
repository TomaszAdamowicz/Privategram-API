const Post = require('../../api/models/postModel');
const makeTagsArray = require('../../utils/makeTagsArray');
const makePathsArray = require('../../utils/makePathsArray');
const dateData = require('../../utils/date');
const config = require('../../config/config');
const sanitize = require('../../utils/sanitize');

const getYear = () => {
    return dateData().year;
}

const makePaths = (req, num) => {
    const paths = req.files.map(file => `${config.host}/images/${num}/${file.filename}`);

    return paths;
}

const makeSmallPaths = (req, num) => {
    const paths = req.resizedImagesNames.map(file => `${config.host}/images/${num}/${file}`);

    return paths;
}

const postCreator = (req, author) => {
    const {title, public, tags} = req.body;
    const postAuthor = author;
    const media = 'jpg';
    const year = getYear();
    const paths = makePaths(req, year);
    const smallPaths = makeSmallPaths(req, year);
    const pathsArray = makePathsArray(paths, smallPaths);
    const sanitizedTitle = sanitize(title);
    const sanitizedTags = sanitize(tags);
    const tagsArray = makeTagsArray(sanitizedTags);

    const post = new Post({
        title: sanitizedTitle,
        media: media,
        path: pathsArray,
        public: public,
        author: postAuthor,
        tags: tagsArray,
        tags: tagsArray,
        year: year
    })

    return post;
}

module.exports = postCreator;