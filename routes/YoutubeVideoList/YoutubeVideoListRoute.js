const express = require('express');
const router = express.Router();

const putYoutubeVideoList = require('./put/putYoutubeVideoList');
const getYoutubeVideoList = require('./get/getYoutubeVideoList');

router.use(getYoutubeVideoList);
router.use(putYoutubeVideoList);

module.exports = router;