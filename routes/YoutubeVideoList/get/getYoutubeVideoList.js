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
    const dateBefore = req.query.dateBefore;

    const unixTimestamp =
    Math.floor(new Date(`${dateBefore} 00:00:00.000`).getTime());

    const videosPerPage = 24;
    let videos = [];


    //Error Handling: Send right response if data is not found
    if(!isNaN(sort) && sort !== undefined){
        videos = await YoutubeVideoListModel
        .find({'handle': handle})
        .where('unixTimeStamp')
        .lte(unixTimestamp)
        .find({'title': new RegExp(title, 'i')})
        .sort({"unixTimeStamp" : sort})
        .skip(page*videosPerPage)
        .limit(videosPerPage);
    }else{
        videos = await YoutubeVideoListModel
        .find({'handle': handle})
        .where('unixTimeStamp')
        .lte(unixTimestamp)
        .find({'title': new RegExp(title, 'i')})
        .sort({"viewCountNumber" : -1})
        .skip(page*videosPerPage)
        .limit(videosPerPage);
    }

    res.status(200).send(videos);

});

module.exports = router;