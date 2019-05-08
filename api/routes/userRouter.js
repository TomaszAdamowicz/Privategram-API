const router = require('express').Router();
const userController = require('../controllers/userController');
const auth = require('../../auth/authorization');
const checkAdmin = require('../../utils/checkAdmin');

router.route('/login')
        .post(userController.login);

router.use(auth, checkAdmin);

router.route('/save')
        .post(userController.save);

router.route('/get')
        .get(userController.get);

router.route('/delete/:id')
        .delete(userController.delete)

module.exports = router