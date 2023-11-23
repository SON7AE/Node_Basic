const express = require("express")
const mongoose = require("mongoose")
const cookieSession = require("cookie-session")

const User = require("./models/users.model")

const app = express()
const path = require("path")
const passport = require("passport")
const PORT = 4000

const cookieEncryptionKey = "supersecret-key"

app.use(
    cookieSession({
        keys: [cookieEncryptionKey],
    })
)

// register regenerate & save after the cookieSession middleware initialization
app.use(function (req, res, next) {
    if (req.session && !req.session.regenerate) {
        req.session.regenerate = (callback) => {
            callback()
        }
    }
    if (req.session && !req.session.save) {
        req.session.svae = (callback) => {
            callback()
        }
    }
    next()
})

app.use(passport.initialize())
app.use(passport.session())
require("./config/passport")

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// View Engine Setup
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

mongoose
    .connect(`mongodb+srv://macro:12341234@passport-login.ck1cvtr.mongodb.net/`)
    .then(() => {
        console.log("MongoDB Connected!!")
    })
    .catch((error) => {
        console.log(error)
    })

app.use("/static", express.static(path.join(__dirname, "publilc")))

app.get("/", (req, res) => {
    res.render("index")
})

app.get("/login", (req, res) => {
    res.render("login")
})
app.post("/login", (req, res, next) => {
    // Local Strategy 사용
    passport.authenticate("local", (error, user, info) => {
        if (error) return next(error)
        if (!user) return res.json({ msg: info })

        req.login(user, function (error) {
            if (error) return next(error)
            res.redirect("/")
        })
    })(req, res, next)
})

// ----------------------------------------------------------------------------------------------------

app.get("/signup", (req, res) => {
    res.render("signup")
})
app.post("/signup", async (req, res) => {
    // user 객체를 생성한다.
    // const user = new User(req.body)
    const user = new User()

    try {
        // user 컬렉션에 유저를 데이터베이스에 저장한다.
        await user.save()
        return res.status(200).json({
            success: true,
        })
    } catch (error) {
        console.log(error)
    }
})

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
})
