const fs = require('fs');
const dateData = require('../utils/date');

const createFolder = (dest) => {
    const makeFolder = (req, res, next) => {
        const year = dateData().year;
        const dirMain = `./public/${dest}`;
        const dirSub = `${dirMain}/${year}`;

        const makeSubDir = () => {
            if (!fs.existsSync(dirSub)) {
                fs.mkdirSync(dirSub);
                next();
            } else {
                next();
            }
        }

        if (!fs.existsSync(dirMain)) {
            fs.mkdirSync(dirMain);
            makeSubDir();
        } else {
            makeSubDir();
        }
    }

    return makeFolder;
}

module.exports = createFolder;
