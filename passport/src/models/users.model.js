const mongoose = reqruie("mongoose")

const userSchema = mongoose.Schema({
    email: { tyoe: String, unique: true },
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

const User = mongoose.model("User", userSchema)

module.exports = { User }
