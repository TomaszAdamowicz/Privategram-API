const router = require('express').Router();
const postController = require('../controllers/postController');
const auth = require('../../auth/authorization');
const fileUpload = require('../../utils/multer');
const resizeImage = require('../../utils/resizeImage');
const createFolder = require('../../utils/createFolder');
const checkAdmin = require('../../utils/checkAdmin');

router.use(auth);

router.route('/all/:page')
        .get(postController.getPosts);

router.route('/user/:id')
        .get(postController.getUserPosts)

router.route('/tags/:page/:tag')
        .get(postController.getPosts)

router.route('/tags/:page/:tag/:year')
        .get(postController.getPosts)

router.route('/year/:page/:year')
        .get(postController.getPosts)

router.route('/getYears')
        .get(postController.getYears);

router.route('/save')
        .all(checkAdmin)
        .all(createFolder('images'))
        .all(fileUpload().array('images'))
        .all(resizeImage)
        .post(postController.save);

router.route('/update')
        .all(checkAdmin)
        .put(postController.update);

router.route('/delete')
        .all(checkAdmin)
        .delete(postController.delete)

router.route('/getCopy')
        .all(checkAdmin)
        .get(postController.getPhotosCopy)

module.exports = router