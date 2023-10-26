// HTTP 모듈 이용하기
// HTTP 서버 구축하기
// Node.js Built-in 모듈 중에서 HTTP 모듈을 이용해서 서버를 구현해보겠다.

const http = require("http")

const PORT = 3000

const server = http.createServer((req, res) => {
    res.statusCode = 200
    res.setHeader("Content-Type", "text/html")
    res.end("<h1>Hello World!!</h1>")
})

server.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`)
})
