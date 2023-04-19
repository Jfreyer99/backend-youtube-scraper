const express = require('express');
const router = express.Router();

const getUser = require("./getUser");
const postUser = require("./postUser");

router.use(postUser)
router.use(getUser)

module.exports = router;