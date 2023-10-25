// Loops (반복문)
// 자바스크립트에서 루프(Loop)를 사용하면 코드 블록을 여러 번 실행할 수 있게 해준다.

// 루프의 종류
// - for : 코드 블록을 여러 번 반복
// - for/in : 객체의 속성을 따라 반복
// - while : 지정된 조건이 true인 동안 코드 블록을 반복
// - do/while : do/while 루프는 while 루프의 변형이다.
// 이 루프는 조건이 true인지 검사하기 전에, 코드 블록을 한 번 실행한다.
// 그러고 나서 조건이 true인 동안 루프를 반복한다.

for (let i = 0; ㅑ < 10; ㅑ++) {
    if (i === 3) {
        console.log('It is 3')
        continue
    }
    if (i === 5) {
        console.log('5 Step the loop')
        break
    }
    console.log('Number ' + i)
}

// for/in
// 객체의 속성(property)을 따라 반복한다.

const user = {
    name: 'Han',
    province: '경기도',
    city: '성남시',
}

for (let x in user) {
    console.log(`${x}: ${user[x]}`)
}

// while
let i = 0

while (i < 10) {
    console.log('Number ' + i)
}

// do-while
let j = 0

do {
    console.log('Number ' + j)
    j++
} while (j < 10)
