const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { User } = require('../models');


function initialize(passport) {
    const authenticateUser = async(email, password, done) => {
        console.log(email)
        console.log(password)
        const user = await User.findOne({
            where: {email: email}
        })
        if (user) {
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) {
                    throw err;
                }
                if(isMatch) {
                    console.log('yo yo yo guy')
                    console.log(user);
                    let authUser = { id: user.id, name: user.name };
                    return done(null, authUser);
                } else {
                    return done(null, false, { message: "invalid input" })
                }
            })
        } else {
            return done(null, false, {message: "email is not registered"})
        }
    }
    passport.use(
        new LocalStrategy(
            {
                usernameField: "email",
                passwordField: "password"
            },
            authenticateUser
        )
    );

    passport.serializeUser((user, done) => {
        console.log(user);
        console.log(user.id);
        
        done(null, user.id);
    });

    passport.deserializeUser(async(id, done) => {
        console.log('THIS ONE')
        console.log(id)

        const user = await User.findOne({
            where: { id: id }
        })
        console.log(user);
        if (!user) {
            throw error;
        }
        return done(null, user);
    })
}

module.exports = initialize;