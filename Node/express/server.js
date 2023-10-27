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

// res.json() vs res.send()
// res.json()과 res.send()를 사용하는 것은 기능상으로 거의 동일히다.
// 그러면 res.send()를 이용해서 object를 보내도 되는 건지 아래에서 살펴보자.
