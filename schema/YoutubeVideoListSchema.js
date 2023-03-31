const mongoose = require('mongoose');

const YoutubeVideoList = new mongoose.Schema({
    handle: {
        type: String,
        index: { unique: true, dropDups: true}
    },
    videos: {
        type: [],
    }
});

const YoutubeVideoListModel = mongoose.model('YoutubeVideoList', YoutubeVideoList);
module.exports = YoutubeVideoListModel;