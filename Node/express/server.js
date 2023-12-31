const express = require("express")
const PORT = 4000
const app = express()

const usersRouter = require("./routes/users.router")
const postsRouter = require("./routes/posts.router")

// 미들웨어
app.use(express.json())
app.use((req, res, next) => {
    const start = Date.now()
    console.log(`start: ${req.method} ${req.url}`)

    next()

    const diffTijme = Date.now() - start
    console.log(`end: ${req.method} ${req.baseUrl}${req.url} ${diffTijme}ms`)
})

app.use("/users", usersRouter)
app.use("/posts", postsRouter)

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}.`)
})

// res.json() vs res.send()
// res.json()과 res.send()를 사용하는 것은 기능상으로 거의 동일히다.
// 그러면 res.send()를 이용해서 object를 보내도 되는 건지 아래에서 살펴보자.
// res.json()을 사용하는 것을 추천한다.

// res.send() vs res.end()
// response가 있고 일단 데이터를 수집하거나 호출자에게 제공하고 싶은 다른 직업을 수행하면 마지막 단계로 세션을 종료해야 한다.
// 이는 res.send()를 호출하여 수행할 수 있다.
// res.end()를 이용해서 꼭 세션을 종료해야 할까?

// res.end()로 종료해야 할 때
// => 데이터를 제공하지 않고 응답을 종료하려면 res.end()를 사용할 수 있다.
// 이것은 404 페이지에 유용할 수 있다.
// res.status(404).end()

// res.end()로 종료하지 않아도 될 때
// 데이터를 res.json() 이나 res.send()로 보내면 알아서 종료한다.

// ------------------------------------------------------------------------------------------

// 미들웨어란 무엇인가?
// Express는 자체 기능이 최소화된 라우팅 및 미들웨어 웹 프레임워크이다.
// Express 애플리케이션은 본질적으로 일련의 미들웨어 기능 호출이다.
// 미들웨어 기능은 애플리케이션의 요청-응답 주기에서 요청객체(req), 응답객체(res), next 미들웨어 함수에 접근할 수 있는 기능이다.
// next 미들웨어 기능은 일반적으로 next라는 변수로 표시된다.

// 미들웨어를 등록해줄 때, use 메서드를 사용한다.
// app.use((req, res, next) => {
//     console.log("Time:", Date.now())
//     next() // next(): 다음 미들웨어로 이동한다.
// })

// ------------------------------------------------------------------------------------------

// 절대경로 사용
// 그러나 express.static 함수에 제공하는 경로는 노드 프로세스를 시작하는 디렉토리에 상대적이다.
// 다른 디렉토리에서 익스프레스 앱을 실행하는 경우 제공하려는 디렉토리의 절대 경로를 사용하는 것이 더 안전하다.
// const path = require("path")
// app.use("/static", express.static(path.join(__dirname, "public")))
