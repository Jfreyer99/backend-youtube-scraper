const express = require('express')
const router = express.Router();
const YoutubeVideoListModel = require('../../../schema/YoutubeVideoListSchema')

/**
 * Get all videos for parameter "handle"
 */

router.get('/v1/youtubeVideoList/:handle', async (req, res, next) => {

    const handle = req.params.handle;

    if(!handle || handle === ''){
        res.send(400).send("{message} : \"handle param not found\" ")
    }

    const page = req.query.page || 0;
    const sort = req.query.sort || 0;

    const videosPerPage = 12;

    console.log(page);
    console.log(sort)

    let videos = await YoutubeVideoListModel.find({'handle': handle}).sort({"unixTimeStamp" : sort}).skip(page*videosPerPage).limit(videosPerPage);

    res.status(200).send(videos);

});

module.exports = router;