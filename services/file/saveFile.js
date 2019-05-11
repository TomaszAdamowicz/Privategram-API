const multer = require('multer');
const path = require('path');
const dateData = require('../utils/date');

const fileUpload = (req, res, next) => {
    const year = dateData().year;

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            return cb(null, path.join(__dirname, `../public/images/${year}`))
        },
        filename: function (req, file, cb) {
            return cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
        }
    });

    const fileFilter = (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
            return cb(new Error('Only image files are allowed!'));
        }
        cb(null, true);
    }

    const upload = multer({
        storage: storage,
        fileFilter: fileFilter
    });

    return upload;
}

module.exports = fileUpload;