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
    
    const payload = JSON.stringify(req.body)
    let parsedPayload = null;
    let handle = null;
    let videos = [];

    if(!payload){
        res.status(400).send({"message": " Not valid JSON"})
    }

    try{
    parsedPayload = JSON.parse(payload);
    if(!parsedPayload){
        throw new SyntaxError("Bad JSON");
    }
    }
    catch(e){
        res.status(400).send({"message": "Couldn't parse JSON"})
    }

    for(let ele in parsedPayload){
        handle = ele;
        parsedPayload[handle].forEach(element => {
            videos.push(element);
        });
    }

    if(!handle || !videos)
    {
        res.status(400).send({"message": "Handle or Video not defined"})
    }
    else
    {
        let valid = false;

        for(let i = 0; i < videos.length; i++){
            if(videos[i].videoURL && videos[i].uploadDate && videos[i].viewCount && videos[i].title){
                valid = true;
            }
            else{
                valid = false;
                break;
            }
        }
        if(!valid)
        {
            res.status(400).send({"message": "Video Array doesnt meet requirements"})
        }
        else
        {
            next()
        }
    }
});


/**
 * Creates or updates resource
 */
router.put('/v1/youtubeVideoList', async (req, res, next) => {

    const payload = JSON.stringify(req.body)
    const parsedPayload = JSON.parse(payload);

    let handle = null;
    let videos = [];

    for(let ele in parsedPayload){
        handle = ele;
        parsedPayload[handle].forEach(element => {
            videos.push(element);
        });
    }

    const model = new YoutubeVideoListModel({
        handle : handle,
        videos: videos
    })

    try{
    const dbResponse = await model.save()
    if(dbResponse){
        res.status(201).send("{success: true}");
    }else{
        res.status(500).send("{message: database doesn't responded}");
    }
    }catch(err){
        res.status(500).send("{message: duplicate key error for collection, try using put method to update data}");
    }
});

module.exports = router;