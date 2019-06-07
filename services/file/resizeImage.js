const jimp = require('jimp')
const path = require('path')
const dateData =  require('../../utils/date')

const resizeImage = (req, res, next) => {

    const images = req.files;
    const year = dateData().year;

    const resizeImages = async (image) => {
        const fileName = path.parse(image.filename).name;
        const filePath = path.join(__dirname, `../../public/images/${year}`);

        const photo = await jimp.read(image.path);
        await photo.resize(500, jimp.AUTO);
        await photo.write(`${filePath}/${fileName}-small.jpg`);

        return `${fileName}-small.jpg`;
    }

    const imagesNames = images.map(resizeImages);

    Promise.all(imagesNames)
        .then( images =>{
            req.resizedImagesNames = images;
            next();
        })

}

module.exports = resizeImage;