const fs  = require('fs');
const url = require('../../config/hostUrl');

const deleteFiles = (files, year, next) => {

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
        const fileName = file.replace(`${url()}/images/${year}/`,'').trim();
        const filePath = `./public/images/${year}/${fileName}`;
        
        if(fs.existsSync(filePath)) removeFile(fileName);

    })
}

module.exports = deleteFiles;