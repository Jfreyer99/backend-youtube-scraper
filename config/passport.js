const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UserModel = require('./../schema/User');
const bcrypt = require('bcryptjs');


passport.use(new LocalStrategy((username, password, done) => {
    UserModel.findOne({username: username})
             .then((user) => {
                if(!user){return done(null, false)}
                const isValid = bcrypt.compareSync(password, user.password)
                if(isValid){
                    return done(null, user)
                }else{
                    return done(null, false)
                }
            }).catch((err) => {
                done(err)
            });
}));

passport.serializeUser((user, done) => {
    done(null, user.id)
});

passport.deserializeUser((userId, done) => {
    UserModel.findById(userId)
            .then((user) => {
                done(null, user)
            })
            .catch((err) => {
                done(err)
            })
});