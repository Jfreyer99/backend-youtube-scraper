const express = require('express');
const router = express.Router();

router.get('/login-success', (req, res ,next) => {
    if(req.isAuthenticated())
    {
        return res.send(req.user);
    }
    res.status(403).send("Whatcha doing here?")
});

router.get('/v1/user/isAuth', (req, res, next) => {
    if(req.isAuthenticated){
        const username = req.user.username;
        const email = req.user.email;
        return res.status(200).send({username, email});
    }
    return res.status(403).send("Error");
})

router.get("/login-failure", (req, res ,next) => {
    res.status(403).send("Whatcha doing here?")
});

router.get("/v1/user/logout", (req, res, next) => {
    if(req.isAuthenticated){
        req.logOut();
        res.send("Logged Out")
    }
    res.status(403).send("Error")
});

module.exports = router;