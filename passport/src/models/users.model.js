const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true, // 유효성 체크를 위해 (동일한 이메일 사용 불가)
    },
    password: {
        type: String,
        minLength: 5,
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true, // => 추가해주어야 하는 이유는 일반적인 로그인을 진행하였을 때, null 값으로 할당이 될 경우 에러가 발생하기 때문에 이를 방지하기 위해서
    },
})

userSchema.methods.comparePassword = function (plainPassword, callback) {
    // bcript compare
    // plainPassword => client가 입력한 비밀번호
    // this.password => 데이터베이스에 있는 비밀번호
    if (plainPassword === this.password) {
        callback(null, true)
    } else {
        callback(null, false)
    }
    // bcript compare error
    return callback({ error: 'error' })
}

const USER = mongoose.model('USER', userSchema)

// 다른 파일에서도 사용하기 위해
module.exports = USER
