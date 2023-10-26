// HTTPS 모듈 생성
// Client => 데이터를 암호화해서 특정 경로에 요청을 보냄 => Server
// Server => 암호화돼서 온 결과 데이터를 복호화하기 => Client

const request = require("./request")
const response = require("./response")

function makeRequest(url, data) {
    // 요청보내기
    request.send(url, data)
    // 데이터 Return 하기
    return response.read()
}

const responseData = makeRequest("https://naver.com", "any data")
console.log(responseData)
