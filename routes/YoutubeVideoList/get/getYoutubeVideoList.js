const express = require('express')
const router = express.Router();
const YoutubeVideoListModel = require('../../../schema/YoutubeVideoListSchema')

/**
 * Get all videos for parameter "handle" and search Options
 */
router.get('/v1/youtubeVideoList/:handle', async (req, res, next) => {

    const handle = req.params.handle;

    if(!handle || handle === ''){
        res.send(400).send("{message} : \"handle param not found\" ")
    }

    let page;

    if(page === req.query.page){
        page = 0;
    }else{
        page = req.query.page || 0;
    }

    const sort = req.query.sort;

    const title = req.query.title || "";
    let dateBefore = req.query.dateBefore;

    const unixTimestamp =
    Math.floor(new Date(`${dateBefore}`).getTime());

    const videosPerPage = 12;
    let videos = [];

    //Error Handling: Send right response if data is not found
    if(!isNaN(sort) && sort !== undefined){
        videos = await YoutubeVideoListModel
        .find({'handle': handle,'title': new RegExp(title, 'i')})
        .where('unixTimeStamp')
        .lte(unixTimestamp)
        .sort({"unixTimeStamp" : sort})
        .skip(page*videosPerPage)
        .limit(videosPerPage);
    }else{
        videos = await YoutubeVideoListModel
        .find({'handle': handle,'title': new RegExp(title, 'i')})
        .where('unixTimeStamp')
        .lte(unixTimestamp)
        .sort({"viewCountNumber" : -1})
        .skip(page*videosPerPage)
        .limit(videosPerPage);
    }

    if(videos){
        res.status(200).send(videos);
    }
    else{
        res.status(500).send({"message": "Couldn't find the videos"});
    }

});

module.exports = router;