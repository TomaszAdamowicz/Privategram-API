const router = require('express').Router();
const postRouter = require('./routes/postRouter');
const userRouter = require('./routes/userRouter');

router.use('/posts',postRouter);
router.use('/users', userRouter);

module.exports = router