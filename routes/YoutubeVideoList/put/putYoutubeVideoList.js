const express = require('express');
const router = express.Router();

const YoutubeVideoListModel = require('../../../schema/YoutubeVideoListSchema')

/**
 * TODO
 * Check for API-Key when using HTTP Method PUT
 * 
 */

/**
 * validate payload
 */
router.put('*', (req, res, next) => {
    
    //TODO handle error handling and payload checking for request

    next();
});


/**
 * Creates or updates resource
 */
router.put('/v1/youtubeVideoList', async (req, res, next) => {

    //TODO If videos already exists update them with the current videos

    let videos = [];

    const payload = JSON.parse(JSON.stringify(req.body))

    for(let video of payload){
        videos.push(video);
    }

    const dbResponse = await YoutubeVideoListModel.collection.insertMany(videos);
    if(dbResponse){
        res.status(200).send("Hello World"); 
    }
    else{
        res.status(500).send("Error")
    }
});

module.exports = router;