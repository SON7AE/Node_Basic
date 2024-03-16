const passport = require('passport')
const USER = require('../models/users.model')
const LocalStrategy = require('passport-local').Strategy

passport.use(
    new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, (email, password, done) => {
        USER.findOne(
            {
                email: email.toLocaleLowerCase(),
            },
            (error, user) => {
                if (error) return done(error)
                if (!user) {
                    return done(null, false, { msg: '해당 이메일을 찾을 수 없습니다.' })
                }
                user.comparePassword(password, (error, isMatch) => {
                    if (error) return done(error)
                    if (isMatch) {
                        return done(null, user) // 비밀번호 일치했을 경우
                    }
                    return done(null, false, { msg: '유효하지 않은 이메일 혹은 비밀번호 입니다.' })
                })
            }
        )
    })
)
