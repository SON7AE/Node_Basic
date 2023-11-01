const express = require("express")
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")

const PORT = 4000
const app = express()
const secretText = "superSecret"
const refreshSecretText = "supersuperSecret"

const posts = [
    {
        userName: "John",
        title: "POST 01",
    },
    {
        userName: "Park",
        title: "POST 02",
    },
]
let refreshTokens = []

app.use(express.json())
app.use(cookieParser())

app.post("/login", (req, res) => {
    const userName = req.body.userName
    const user = { name: userName }

    // JWT를 이용해서 토큰 생성하기 payload + secretText
    // 유효기간 추가
    const accessToken = jwt.sign(user, secretText, { expiresIn: "30s" })
    // JWT를 이용해서 refreshToken 생성
    const refreshToken = jwt.sign(user, refreshSecretText, { expiresIn: "1d" })
    refreshTokens.push(refreshToken)
    // refreshToken을 쿠키에 넣어주기
    res.cookie("jwt", refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })

    res.json({ accessToken: accessToken })
})

app.get("/posts", authMiddleware, (req, res) => {
    res.json(posts)
})

// 인증이 된 사람만 요청을 POST를 가져올 수 있게 만들기
function authMiddleware(req, res, next) {
    // 토큰을 request headers애서 가져오기
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]

    if (token === null) return res.sendStatus(401)
    // verify 메서드를 이용하면 sign 메소드를 이용해서 token을 만들 때,
    // 넣어줬던 user 정보를 가져오게 된다.
    // 토큰이 있으니 유효한 토론인지 확인
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
        console.log(error)
        if (error) return res.sendStatus(403)
        req.user = user

        next()
    })
}

app.get("/refresh", (req, res) => {
    // npm install cookie-parser
    console.log("req.cookies", req.cookies)
    // cookies 가져오기
    const cookies = req.cookies

    if (!cookies?.jwt) return res.send(403)

    const refreshToken = cookies.jwt
    // refreshToken이 데이터베이스에 있는 토큰인지 확인
    if (!refreshToken.includes(refreshToken)) {
        return res.sendStatus(403)
    }

    // token이 유효한 토큰인지 확인
    jwt.verify(refreshToken, refreshSecretText, (error, user) => {
        if (error) return res.sendStatus(403)
        // 새로운 accessToken 생성하기
        const accessToken = jwt.sign({ name: user.name }, secretText, { expiresIn: "30s" })
        res.json({ accessToken })
    })
})

app.listen(PORT, () => {
    console.log("Listening on port: " + PORT)
})

// Refresh Token 생성하기
// 현재 앱에서 accessToken 하나만 있다면, 이것을 가지고 계속 인증이 필요한 요청을 보낼 수가 있다.
// 로그인을 한 번 더 해서 다른 토큰을 받고 그 이전에 토큰을 이용해도 아직 유효하다.

// 하나의 토큰을 탈취하면, 탈취한 토큰으로 계속 요청을 보내게 될 수 있다.
// 이걸 위해서 토큰의 유효시간을 줄일 수 있다.

// 유효시간을 너무 짧게 하면 ==> 자동으로 로그아웃돼어 너무 자주 로그인을 다시 해야한다.
// 유효시간을 너무 길게 하면 ==> 토큰에 유효시간을 주는 이유가 사라지게 된다. 토큰이 탈취당하면 긴 유효시간이 끝날 때가지 계속 탈취당한 토근을 사용 가능하게 한다.

// Refresh Token
// 위와 같은 문제점을 보완하기 위해서 refreshToken을 사용하게 된다.
// refreshToken도 accessToken처럼 JWT를 이용해서 발급 가능하며, 주로 accessToken의 유효시간은 짧게 해주며
// refreshToken의 유효시간은 길게 해준다. 그래서 accessToken의 유효시간이 다 지나면 refreshToken을 이용해서 새로운 accessToken을 발급해준다.

// accessToken: accessToken은 리소스에 접근하기 위해서 사용되는 토큰이다.
// refreshToken: 기존에 클라이언트가 가지고 있던 AccessToken이 만료되었을 때, accessToken을 새로 발급받기 위해 사용한다.
