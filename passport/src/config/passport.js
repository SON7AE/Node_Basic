const passport = require('passport')
const USER = require('../models/users.model')
const LocalStrategy = require('passport-local').Strategy

// req.login(user)
passport.serializeUser((user, done) => {
    done(null, user.id)
})

// client => session => request
passport.deserializeUser((id, done) => {
    USER.findById(id).then((user) => {
        done(null, user)
    })
})

passport.use(
    new LocalStrategy('local', { usernameField: 'email', passwordField: 'password' }, (email, password, done) => {
        USER.findOne(
            {
                email: email.toLocaleLowerCase(),
            },
            (err, user) => {
                console.log(user)
                if (err) return done(err)
                if (!user) return done(null, false, { msg: `Email ${email} not found` })

                user.comparePassword(password, (err, isMatch) => {
                    if (err) return done(err)
                    if (isMatch) return done(null, user)

                    return done(null, false, { msg: 'Invalid email or password.' })
                })
            }
        )
    })
)
