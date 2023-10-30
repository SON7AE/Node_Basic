// import { Users } from "../models/users.model"
const model = require("../models/users.model")

// 유저 한 명 조회
// req.params
function getUser(req, res) {
    const userId = Number(req.params.userId) // 타입이 Number여야 하니까
    const user = model[userId]

    if (user) {
        res.json(user)
    } else {
        res.sendStatus(404)
    }
}

// 다수의 유저 조회
function getUsers(req, res) {
    res.send(model)
}

function postUser(req, res) {
    console.log("req.body.name: ", req.body.name)
    // TypeError: Cannot read properties of undefined
    // 전달된 body 값이 읽을 수 없는 형태이기 때문에 발생하는 이슈다. 이를 해결하기 위해서는 body의 값을 읽을 수 있는 형태로 파싱(추출)해야 한다.
    // 이때 사용하는 게 body-parser라는 모듈인데, express 4.x 부터는 내장되어 있어 따로 설치하지 않아도 된다.
    // 다만, 다음 코드를 추가해야 한다.
    // app.use(express.json())

    if (!req.body.name) {
        return res.status(400).json({
            error: "Missing User Name.",
        })
    }

    const newUser = {
        name: req.body.name,
        id: model.length,
    }
    Users.push(newUser)
    res.json(newUser)
}

module.exports = {
    getUser,
    getUsers,
    postUser,
}
