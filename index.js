const express = require('express');
const session = require('express-session');
require('dotenv').config();

const helmet = require('helmet');

const app = express();
const cors = require('cors');

const connectDatabase = require('./util')

let fs = require('fs')
let path = require('path')
let morgan = require('morgan')

const passport = require('passport');

const port = process.env.PORT;

let accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

const videoListRoute = require('./routes/YoutubeVideoList/YoutubeVideoListRoute')
const userRoutes = require('./routes/User/userRoutes');

const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser');

connectDatabase(process.env.MONGODB_URL);

app.use(helmet());

app.use(express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))
app.use(express.json({ limit: "50mb" }))

app.use(cors( 
    {
    allRoutes: true,
    origin: process.env.CORS_ORIGIN,
    credentials : true,
    methods: 'GET, POST, PUT, DELETE, OPTIONS, HEAD',
    allowedHeaders: 'content-type,Authorization',
    }
));

app.use(cookieParser())

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URL
    }),
    cookie:{
        maxAge: 1000 * 60 * 60 * 24,
    }
}));

app.use(passport.initialize());
app.use(passport.session());
require("./config/passport")

app.use((err, req, res, next) => {
    res.status(400).send("{message: body is not valid json}")
})

app.use(morgan("combined",{stream: accessLogStream}));

app.use(userRoutes)
app.use(videoListRoute)

app.listen(port, () => {
    console.log(`Server running at address port ${port}`)
});