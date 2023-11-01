const express = require("express")
const mongoose = require("mongoose")

const app = express()
const path = require("path")
const PORT = 4000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// View Engine Setup
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

mongoose
    .connect(`mongodb+srv://macro:12341234@passport-login.ck1cvtr.mongodb.net/`)
    .then(() => {
        console.log("MongoDB Connected!!")
    })
    .catch((error) => {
        console.log(error)
    })

app.use("/static", express.static(path.join(__dirname, "publilc")))

app.get("/login", (req, res) => {
    res.render("login")
})

app.get("/signup", (req, res) => {
    res.render("signup")
})

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
})
