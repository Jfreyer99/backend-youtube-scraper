const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
const app = express();
const cors = require('cors');

let fs = require('fs')
let path = require('path')
let morgan = require('morgan')

let accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost:27017/youtube_scraper')

const videoListRoute = require('./routes/YoutubeVideoList/YoutubeVideoListRoute')

const port = 8000 || process.env.PORT;

app.use(helmet());

app.use(cors({credentials :  true,  methods: 'GET', allowedHeaders: 'Content-Type,Authorization' }));

app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))
app.use(bodyParser.json({ limit: "50mb" }))

app.use((err, req, res, next) => {
    res.status(400).send("{message: body is not valid json}")
})

app.use(morgan("combined",{stream: accessLogStream}));

app.use(videoListRoute)

app.listen(port, () => {
    console.log(`Server running at address port ${port}`)
});