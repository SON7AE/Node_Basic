const express = require("express")
const PORT = 4000
const app = express()

const Users = [
    { id: 0, name: "Jack" },
    { id: 1, name: "Jennifer" },
]

app.get("/", (req, res) => {
    res.send("HELLO WORLD!")
})

app.get("/users", (req, res) => {
    res.send(Users)
})

// req.params
app.get("/users/:userId", (req, res) => {
    const userId = Number(req.params.userId) // 타입이 Number여야 하니까
    const user = Users[userId]

    if (user) {
        res.json(user)
    } else {
        res.sendStatus(404)
    }
})

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}.`)
})
