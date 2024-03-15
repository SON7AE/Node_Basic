const express = require('express')
const jwt = require('jsonwebtoken')
const posts = require('./dummy.json')

const app = express()
const PORT = 4000
const secretText = 'superSecret'
const refreshSecretText = 'supersuperSecret'
let refreshTokens = []
// 미들웨어 등록
app.use(express.json())

// ----------------------------------------------------------------------------------------------------

app.post('/login', (req, res) => {
    const userName = req.body.userName
    const user = { name: userName }

    // JWT를 이용하여 TOKEN 생성하기
    // 유효기간 추가
    const accessToken = jwt.sign(user, secretText, { expiresIn: '30s' }) // 원래는 데이터베이스에 저장
    // JWT를 이용해서 refreshToken도 생성
    const refreshToken = jwt.sign(user, refreshSecretText, { expiresIn: '1d' }) // 원래는 데이터베이스에 저장
    refreshTokens.push(refreshToken) // 현재 데이터베이스가 없어서 임의의 배열에 저장

    // refreshToken을 쿠키에 넣어주기
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true, // 쿠키탈취방지
        maxAge: 24 * 60 * 60 * 1000,
    })
    res.json({ accessToken: accessToken }) // 생성한 Token 전달(response)
})

// ----------------------------------------------------------------------------------------------------
// 인증이 된 사람만 요청을 Posts를 조회할 수 있도록 하는 로직 구성하기 - 미들웨어 구성

function authMiddleware(req, res, next) {
    // 토큰을 request headers에서 가져오기
    const authHeader = req.headers['authorization'] // Bearer xxxxx.yyyyy.zzzzz
    const token = authHeader && authHeader.split(' ')[1]

    if (token === null) {
        return res.sendStatus(401)
    } else {
        // 토큰이 있으니 유효한 토큰인지 확인
        jwt.verify(token, secretText, (error, payload) => {
            if (error) return res.sendStatus(403)
            req.user = payload // 다른 미들웨어에서 사용할 수 있도록 하는 작업
            next()
        })
    }
}

// 클라이언트에서 토큰을 보내주는데, 그 토큰은 request header에 들어있다.
app.get('/posts', authMiddleware, (req, res) => {
    res.json(posts)
})

// ----------------------------------------------------------------------------------------------------

app.listen(PORT, () => {
    console.log('Listening on port: ' + PORT)
})

// ----------------------------------------------------------------------------------------------------

// 리프레시 토큰(RefreshToken 생성하기)
// 새롭게 생성한 토큰이 아닌 예전 토큰을 사용하더라도 데이터에 접근할 수 있기 때문에 이를 보완하기 위해 토큰에 유효기간을 줄 수 있도록 했다.
// 그러나 유효기간이 지난 후엔 토큰을 새롭게 생성해야하는 불편함이 생길 수 있다.

// 유효시간을 너무 짧게 하면 ====> 자동으로 로그아웃 되어 너무 자주 로그인을 해야한다.
// 유효시간을 너무 길게 하면 ====> 토큰에 유효시간을 주는 이유가 사라지게 된다. 토큰이 탈취당하면 긴 유효시간이 끝날 때까지 계속 탈취당한 토큰을 사용할 수 있기 때문이다.

// 위와 같은 문제점을 보완하기 위해서 refreshToken을 사용하게 된다.
// refreshTokeneh accessToken처럼 jwt를 이용해서 발급이 가능하며, 주로 accessToken의 유효시간은 짧게 해주며 refreshToken의 유효시간은 길게 해준다.
// 그래서 accessToken의 유효시간이 다 지나면 refreshToken을 이용해서 새로운 accessToken을 발급해준다.

// ----------------------------------------------------------------------------------------------------

// AccessToken + RefreshToken Flow
// 1. User Authorization request ==>
// 2. Access Token and Refresh Token <==
// 이때, 위 토큰들을 어딘가에 저장
// 3. Request with Access Token ==>
// accessToken이 유효성 검사
// 4. Protected resource <==
// 5. Request with Access Token ==>
// 6. Invalid Token Error <==
// 7. Refresh Token ==>
// refreshToken 유효성 검사
// 8. Access Token and Refresh Token <==
