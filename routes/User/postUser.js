const express = require('express');
const router = express.Router();
const UserModel = require('./../../schema/User');
const bcrypt = require('bcryptjs')
const passport = require('passport');

router.post("/v1/user/login", passport.authenticate("local", 
{ failureRedirect: '/login-failure', successRedirect: '/login-success'}), (req, res, next) => {});

router.post("/v1/user/register", async (req, res, next) => {
    
    const response = await UserModel.exists({username: req.body.username});
    if(response){
        res.status(404).send("User already exists");
    }
    else{
        const hashedPassword = await bcrypt.hash(req.body.password, 15);

        if(!hashedPassword){
            return res.status(500).send("Internal Server Error")
        }
        const newUser = new UserModel({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });

        const re = await newUser.save();
        if(re){
            res.status(201).send("user created");
        }else{
            res.status(500).send("user creation failed");
        }
    }

});



module.exports = router;