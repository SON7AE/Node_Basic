const express = require('express')
const { default: mongoose } = require('mongoose')
const passport = require('passport')
const path = require('path')
const USER = require('./models/users.model')
const cookieSession = require('cookie-session')

const app = express()
const PORT = 4000

// ----------------------------------------------------------------------------------------------------

const cookieEncryptionKey = 'superSecret-key'
app.use(
    cookieSession({
        name: 'cookie-session-name',
        keys: [cookieEncryptionKey],
    })
)

// register regenerate & save after the cookieSession middleware initialization
app.use(function (request, response, next) {
    if (request.session && !request.session.regenerate) {
        request.session.regenerate = (cb) => {
            cb()
        }
    }
    if (request.session && !request.session.save) {
        request.session.save = (cb) => {
            cb()
        }
    }
    next()
})

// ----------------------------------------------------------------------------------------------------
// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// ----------------------------------------------------------------------------------------------------

app.use(passport.initialize())
app.use(passport.session())
require('./config/passport')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/static', express.static(path.join(__dirname, 'public')))

// ----------------------------------------------------------------------------------------------------

// MongoDB 연결
mongoose
    .connect('mongodb+srv://bobsot0225:B0oUxl2pTWTxvyy0@mongodb.lnyutby.mongodb.net')
    .then(() => {
        console.log('MongoDB is connected!')
    })
    .catch((error) => {
        console.log(error)
    })

// ----------------------------------------------------------------------------------------------------
app.get('/', (req, res) => {
    res.render('index')
})
app.get('/login', (req, res) => {
    res.render('login')
})
app.get('/signup', (req, res) => {
    res.render('signup')
})
// 회원가입
app.post('/signup', async (req, res) => {
    // user 객체를 생성
    const user = new USER(req.body) // 이메일과 비밀번호가 들어있다.
    try {
        // user 컬렉션에 유저를 저장
        await user.save()
        return res.status(200).json({
            success: true,
        })
    } catch (error) {
        console.log(error)
    }
})
// 로그인
app.post('/login', (req, res, next) => {
    passport.authenticate('local', (error, user, info) => {
        if (error) return next(error)
        if (!user) return res.json({ msg: info })

        // 로그인 세션 생성
        req.logIn(user, function (error) {
            if (error) return next(error)
            res.redirect('/') // 메인 페이지 이동
        })
    })(req, res, next)
})

// ----------------------------------------------------------------------------------------------------

// 생성된 서버 PORT에 연결하여 실행
app.listen(PORT, () => {
    console.log(`Listening on${PORT}`)
})
