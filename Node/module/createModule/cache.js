// 모듈 캐싱이란?
// 모듈에서 다른 모듈을 가져올 때, ECMA Script 모듈을 사용하든지 Common JS 모듈을 사용하든지 해당 모듈을 캐싱하게 된다.

// COMMON JS 방식
const request = require("./request.js")
const response = require("./response.js")

// ECMA SCRIPT 방식

function makeRequest(url, data) {
    // 요청보내기
    request.send(url, data)
    // 데이터 Return 하기
    return response.read()
}

const responseData = makeRequest("https://naver.com", "any data")
console.log(responseData)
