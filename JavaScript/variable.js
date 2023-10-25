// var, let, const
// 자바스크립트에서 변수를 선언할 때, var & let & const를 사용한다.

// 변수 선언 방식
// var : 중복선언과 재할당이 가능하다.
// let : 중복선언은 불가하며, 재할당은 가능하다.
// const : 중복 선언과 재할당 둘 다 불가하다.

// 1. var
// - 아래와 같이 중복 선언과 재할당이 가능하며 마지막에 할당된 값이 변수에 저장된다.
// - 이런 특징으로 인해 자율성은 생기지만, 소스코드가 복잡해질 경우 기존 선언해둔 변수를 잊고 다시 선언하거나
// 재할당을 해서 어떤 부분에서 값이 변경되는지 파악하기 힘들어지게 될 수 있다.

var greeting = 'hello'
console.log(greeting) // hello

var greeting = 'hi'
console.log(greeting) // hi

greeting = 'How are you?'
console.log(greeting) // How are you?

// 위에서 설명했듯이 var는 중복선언과 재할당이 가능하다. 그러나 재할당을 할 경우 계속해서 변수에 담긴 값이 변경되기 때문에
// 소스코드 파악에 어려움을 겪는다.

// 2. let
// - 아래와 같이 중복선언은 불가하며, 재할당은 가능하다.

let greeting2 = 'hello'
console.log(greeting2) // hello

greeting2 = 'hi'
console.log(greeting2) // hi

// 3. const
// - 아래와 같이 중복선언과 재할당 모두 불가능하다.

const greeting3 = 'hello'
console.log(greeting3) // hello

// const greeting3 = 'h1' // 이미 선언된 변수입니다.
