const express = require('express');
const router = express.Router();


router.get("/v1/user/:email", (req, res, next) => {
    console.log("req user");
    console.log(req.params.email);
    res.status(200).send("works")
});


module.exports = router;