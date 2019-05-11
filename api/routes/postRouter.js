const router = require('express').Router();
const postController = require('../controllers/postController');
const auth = require('../../auth/authorization');
const saveFile = require('../../services/saveFile');
const resizeImage = require('../../services/resizeImage');
const createFolder = require('../../services/createFolder');
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

router.use(checkAdmin);

router.route('/save')
        .all(createFolder('images'))
        .all(saveFile().array('images'))
        .all(resizeImage)
        .post(postController.save);

router.route('/update')
        .put(postController.update);

router.route('/delete')
        .delete(postController.delete)

router.route('/getCopy')
        .get(postController.getPhotosCopy)

module.exports = router