function encrypt(data) {
    return "encrypted data"
}

function send(url, data) {
    const encryptedData = encrypt(data)
    console.log(`${encryptedData} is being sent to ${url}`)
}

// COMMON JS 방식
// module.exports = {
//     send,
// }
// ECMA SCRIPT 방식
export { send }

// 여러가지 Exports 하는 방법
// 보통 모듈에서 함수를 export 했을 때, module.exports = { } 이런 식으로 해주었다.
// 다른 방법으로 하는 방법도 알아보겠다.

// module.exports.A = 1
// module.exports.함수이름 = 함수이름(){} 등 다양한 방법이 있지만,
// 결국, 가장 좋은 방법은 module.exports = { } 방법이 제일 좋은 방법이다.
