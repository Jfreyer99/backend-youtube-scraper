const mongoose = require('mongoose');

const YoutubeVideoList = new mongoose.Schema({
    uploadDate: String,
    videoURL: String,
    unixTimeStamp: Number,
    handle: String,
    viewCount: String,
    title: String,
    thumbnailURL: String
});

const YoutubeVideoListModel = mongoose.model('YoutubeVideoList', YoutubeVideoList);
module.exports = YoutubeVideoListModel;