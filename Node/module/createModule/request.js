function encrypt(data) {
    return "encrypted data"
}

function send(url, data) {
    const encryptedData = encrypt(data)
    console.log(`${encryptedData} is being sent to ${url}`)
}

// COMMON JS 방식
module.exports = {
    send,
}
