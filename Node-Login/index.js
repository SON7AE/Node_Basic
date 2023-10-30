const express = require("express")
const jwt = require("jsonwebtoken")

const PORT = 4000
const app = express()
const secretText = "superSecret"

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

app.use(express.json())

app.post("/login", (req, res) => {
    const userName = req.body.userName
    const user = { name: userName }

    // JWT를 이용해서 토큰 생성하기 payload + secretText
    const accessToken = jwt.sign(user, secretText)
    res.json({ accessToken: accessToken })
})

app.get("/posts", (req, res) => {
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

app.listen(PORT, () => {
    console.log("Listening on port: " + PORT)
})
