const fs  = require('fs');
const config = require('../../config/config');

const deleteFiles = (files, year) => {

    const flattenedFilesArray = files.reduce((a,b) => {
        return a.concat(b);
    })

    const removeFile = (filePath) => {
        fs.unlink(filePath , (err) => {
            if(err) {
                console.log(err);
            }
        })
    }

    flattenedFilesArray.forEach( file => {

        const fileName = file.replace(`${config.host}/images/${year}/`,'').trim();
        const filePath = `./public/images/${year}/${fileName}`;
        if(fs.existsSync(filePath)) removeFile(filePath);

    })
}

module.exports = deleteFiles;