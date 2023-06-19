const router = require('express').Router();
const { postUser, getUser, postWatchList } = require('../controller/user.controller');


router.post('/signup', postUser) //when user go to /signup, run postUser function

router.post('/signin', getUser) //when user go to /signin, run getUser function

router.post('/watchlist', postWatchList) 



module.exports = router;