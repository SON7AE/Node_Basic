// HTTPS 모듈 생성
// Client => 데이터를 암호화해서 특정 경로에 요청을 보냄 => Server
// Server => 암호화돼서 온 결과 데이터를 복호화하기 => Client

// COMMON JS 방식
// const request = require("./request.mjs")
// const response = require("./response.mjs")

// ECMA SCRIPT 방식
import { send } from "./request.mjs"
import { read } from "./response.mjs"

function makeRequest(url, data) {
    // 요청보내기
    send(url, data)
    // 데이터 Return 하기
    return read()
}

const responseData = makeRequest("https://naver.com", "any data")
console.log(responseData)
