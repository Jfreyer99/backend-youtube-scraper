const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
const passport = require('passport');
const passportlocal = require('passport-local').Strategy;
const cookieParser = require('cookie-parser')
const bcrypt = require('bcryptjs')
const session = require('express-session');
const app = express();
const cors = require('cors');

const connectDatabase = require('./util')

let fs = require('fs')
let path = require('path')
let morgan = require('morgan')

const port = 8000 || process.env.PORT;

let accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

const videoListRoute = require('./routes/YoutubeVideoList/YoutubeVideoListRoute')
const userRoutes = require('./routes/User/userRoutes');

connectDatabase('mongodb://localhost:27017/youtube_scraper');

app.use(helmet());  
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))
app.use(bodyParser.json({ limit: "50mb" }))

app.use(cors(
    {
    origin: ["http://localhost:5173"],
    credentials : true, 
    allowedHeaders: 'Content-Type,Authorization',
    }
));

app.use(session({
    secret: "sdfu54<,.-4jind,.+fu345.6ihfih546uie45un",
    resave: true,
    saveUninitialized: true,
}));

app.use(cookieParser("sdfu54<,.-4jind,.+fu345.6ihfih546uie45un"))


app.use((err, req, res, next) => {
    res.status(400).send("{message: body is not valid json}")
})

app.use(morgan("combined",{stream: accessLogStream}));

app.use(userRoutes)
app.use(videoListRoute)

app.listen(port, () => {
    console.log(`Server running at address port ${port}`)
});