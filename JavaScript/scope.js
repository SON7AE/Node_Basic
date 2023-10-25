// 스코프(Scope)

// var : 함수 레벨 스코프 (function-level-scope)
// let / const : 블록 레벨 스코프 (block-level-scope)

// 1. var
// - 아래와 같이 함수 내에서 선언된 변수는 함수 내에서만 유효하다. (함수 내에서는 블록 내외부에 관계없이 유효하다.)
// - 하지만 함수 외부에서는 참조할 수 없다.

// 유효한 참조범위 : var는 함수레벨 스코프
function func1() {
    if (true) {
        var a1 = 'a1'
        console.log(a1) // a1
    }
    console.log(a1) // a1 => fun1 함수 내부에서 콘솔이 있고, var가 함수레벨 스코프이기 때문에 조회가 가능하다.
}

func1()
console.log(a1) // ReferenceError: a1 is not defined

// 2. let / const => block 레벨 스코프
function func2() {
    if (true) {
        let a2 = 'a2'
        console.log(a2) // a2
    }
    console.log(a2) // ReferenceError: a2 is not defined. 아직 함수 레벨이긴 하나 let이 선언된 블록의 범위를 넘어섰으므로
    // const도 동일하다.
    // scope가 좁아야 관리하기 편리하다.
}

func2()

// var는 이제 사용하지 않는다.
