const config = require('../config/config');
const path = require('path');

const createPaths = (array) => {
    const zipPath = path.join(__dirname, '../public');
    const links = array.map( arrayItem => arrayItem.path[0]);
    const linkArray = [].concat(...links);
    const urls = linkArray.map(item => item.replace(config.url, zipPath));

    return urls;
}

module.exports = createPaths;