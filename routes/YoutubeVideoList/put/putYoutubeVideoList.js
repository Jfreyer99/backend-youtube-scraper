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

    const payload = JSON.parse(JSON.stringify(req.body))

    let dbResponse = null;

    for(let video of payload){
        dbResponse = await YoutubeVideoListModel.exists({"videoURL": video.videoURL});
        if(dbResponse){
            dbResponse = await YoutubeVideoListModel.updateOne({"videoURL": video.videoURL}, video);
        }
        else if(dbResponse === null){
            dbResponse = await YoutubeVideoListModel.collection.insertOne(video);
        }
    }

    res.status(200).send("Hello World"); 

});

module.exports = router;