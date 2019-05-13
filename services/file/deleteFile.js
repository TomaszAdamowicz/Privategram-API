const fs  = require('fs');
const url = require('../../config/hostUrl');

const deleteFiles = (files, year, next) => {

    const flattenedFilesArray = files.reduce((a,b) => {
        return a.concat(b);
    })

    const removeFile = (fileName) => {
        fs.unlink(`./public/images/${year}/${fileName}`, (err) => {
            if(err) {
                return next(err);
            }
        })
    }

    flattenedFilesArray.forEach( file => {
        const fileName = file.replace(`${url()}/images/${year}/`,'').trim();

        removeFile(fileName);
    })
}

module.exports = deleteFiles;