function decrypt(data) {
    return "decrypted data"
}

function read() {
    return decrypt("data")
}

// COMMON JS 방식
// module.exports = {
//     read,
// }

// ECMA SCRIPT 방식
export { read }
