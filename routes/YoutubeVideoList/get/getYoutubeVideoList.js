const express = require('express')
const router = express.Router();
const YoutubeVideoListModel = require('../../../schema/YoutubeVideoListSchema')

/**
 * Get all videos for parameter "handle"
 */

router.get('/v1/youtubeVideoList/:handle', async (req, res, next) => {

    const handle = req.params.handle;

    if(!handle){
        res.send(400).send("{message} : \"handle param not found\" ")
    }

    const page = req.query.page || 0;
    const videosPerPage = 12;

    let videos = await YoutubeVideoListModel.findOne({"handle": handle});

    let v = []

    for(let i = page * videosPerPage; i < (videosPerPage*page)+videosPerPage; i++){
        if(videos["videos"][i] === null || videos["videos"][i] === undefined){
            break;
        }
        v.push(videos["videos"][i]);
    }

    if(v[0] !== undefined){
        videos["videos"] = v;
        if(videos){
            res.status(200).send(videos)
        }else{
            res.status(500).send("{message: Couldn't find Videos}")
        }
    }
    else{
        res.status(200).send("{videos : []}")
    }
});

module.exports = router;