const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    email: { type: String, unique: true },
    password: {
        type: String,
        minLength: 5,
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true,
    },
})

userSchema.methods.comparePassword = function (plainPassword, callback) {
    // 데이터베이스에 입력된 비밀번호와 입력된 비밀번호와 일치하는지 비교를 해줘야한다.
    // plainPassword: 클라이언트가 입력한 비밀번호
    // this.password: 데이터베이스에 있는 비밀번호
    if (plainPassword === this.password) {
        callback(null, true)
    } else {
        callback(null, false)
    }
    return callback({ error: "error" })
}

const User = mongoose.model("User", userSchema)

module.exports = User
