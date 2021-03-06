const makeTagsArray = require('../../utils/makeTagsArray');
const sanitize = require('../../utils/sanitize');

const postUpdater = (req) => {
    const {title, public, tags} = req.body;
    let post = {};

    if(title) post.title = sanitize(title);

    if(tags) {
        const sanitzedTags = sanitize(tags);
        const tagsArray = makeTagsArray(sanitzedTags);

        post.tags = tagsArray;
    }

    post.public = public;

    return post;
}

module.exports = postUpdater;