const express = require("express")
const mongoose = require("mongoose")

const app = express()
const PORT = 4000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

mongoose
    .connect(`mongodb+srv://macro:12341234@passport-login.ck1cvtr.mongodb.net/`)
    .then(() => {
        console.log("MongoDB Connected!!")
    })
    .catch((error) => {
        console.log(error)
    })

app.use("/static", express.static(path.join__dirname, "publilc"))

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
})
