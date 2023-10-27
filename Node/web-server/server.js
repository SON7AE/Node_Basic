const http = require("http")
const PORT = 4000

const server = http.createServer((req, res) => {
    // writeHead는 한 번만 호출되어야 하며 end()가 호출되기 전에 호출되어야 한다.
    // 상태코드와 응답헤더를 클라이언트에 보낸다.
    res.writeHead(200, {
        "Content-Type": "text/plain",
    })
    // 데이터가 로드되었음을 서버에 알림
    res.end("Hello, world!!")

    // 서버에서 클라이언트로 텍스트를 보내는 것이 아닌 JavaScript Object 보내려면?
    // Content Type을 변경해주면 된다.
    // 'Content-Type': 'application/json'
    // res.end(JSON.stringify({
    // a: "a",
    // b: "b"
    // }))
})

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}.`)
})
