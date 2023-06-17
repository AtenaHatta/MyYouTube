const router = require('express').Router();
const { postUser, getUser } = require('../controller/user.controller');


router.post('/signup', postUser)

router.post('/signin', getUser)



module.exports = router;