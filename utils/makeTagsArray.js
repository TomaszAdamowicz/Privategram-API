const tagsArray = (string) => {
    const tagString = string.split(' ');

    tagString.forEach(tag => {
        tag.trim();
    })

    return tagString;
}

module.exports = tagsArray;