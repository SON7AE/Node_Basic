const passport = require("passport")
const User = require("../models/users.model")
const LocalStrategy = require("passport-local").Strategy

// req.login(user)
passport.serializeUser((user, done) => {
    done(null, user.id)
})

// client => session => request
passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user)
    })
})

// passport local 모듈 사용
passport.use(
    "local",
    new LocalStrategy({ usernameField: "email", passwordField: "password" }, async (email, password, done) => {
        // User.findOne(
        //     {
        //         email: email.toLocaleLowerCase(),
        //     },
        //     (error, user) => {
        //         if (error) return done(error)
        //         if (!user) return done(null, false, { msg: `e-mail ${email} not found.` })

        //         user.comparePassword(password, (error, isMatch) => {
        //             if (error) return done(error)
        //             if (isMatch) return done(null, user)
        //             return done(null, false, { msg: "유효하지 않은 이메일 혹은 비밀번호 입니다." })
        //         })
        //     }
        // )

        try {
            const user = await User.findOne({ email: email.toLocaleLowerCase() })
            if (!user) return done(null, false, { msg: "제공된 이메일에 해당하는 유저가 없습니다." })

            const isMatch = await user.comparePassword(password)
            if (isMatch) return done(null, user, { msg: "비밀번호가 틀렸습니다." })

            // return done(null, false, { msg: "유효하지 않은 이메일 혹은 비밀번호 입니다." })
        } catch (error) {
            return done(error)
        }
    })
)
