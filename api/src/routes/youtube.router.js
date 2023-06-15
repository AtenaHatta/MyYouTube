const router = require('express').Router();
const { getVideoByName } = require('../controller/youtube.controller');

router.get('/search/:inputvalue', getVideoByName)
module.exports = router;