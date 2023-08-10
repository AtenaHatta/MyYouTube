const router = require('express').Router();
const { getVideoByName, getChanelById } = require('../controller/youtube.controller');

router.get('/search/:inputvalue', getVideoByName)
router.get('/subscribe', getChanelById)

module.exports = router;