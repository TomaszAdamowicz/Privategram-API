const router = require('express').Router();
const userController = require('../controllers/userController');
const auth = require('../../auth/authorization');
const checkAdmin = require('../../utils/checkAdmin');

router.route('/login')
        .post(userController.login);

router.use(auth);

router.route('/save')
        .all(checkAdmin)
        .post(userController.save);

router.route('/get')
        .all(checkAdmin)
        .get(userController.get);

router.route('/delete/:id')
        .all(checkAdmin)
        .delete(userController.delete)

module.exports = router