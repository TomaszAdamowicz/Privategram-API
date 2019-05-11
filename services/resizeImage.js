const jimp = require('jimp')
const path = require('path')
const dateData =  require('../utils/date')

const resizeImage = async (req, res, next) => {

    const images = req.files;
    const year = dateData().year;
    const imagesNames = [];

    images.forEach( image => {
        const fileName = path.parse(image.filename).name;
        const filePath = path.join(__dirname, `../public/images/${year}`);

        jimp.read(image.path)
        .then(file => {
            return file
                    .resize(500, jimp.AUTO)
                    .write(`${filePath}/${fileName}-small.jpg`)
        })

        imagesNames.push(`${fileName}-small.jpg`)
    })

    req.resizedImagesNames = imagesNames;

    next();
}

module.exports = resizeImage;