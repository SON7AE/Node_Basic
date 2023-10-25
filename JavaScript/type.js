// 자바스크립트 타입

// - 원시타입 : Boolean, String, Number, Null, Undefined, Symbol (불변성을 가지고 있다.)
// - 참조타입 : Object, Array

// 기본적으로 JavaScript는 원시타입에 대한 값을 저장하기 위해 Call Stack 메모리 공간을 사용하지만
// 참조타입의 경우 Heap이라는 별도의 메모리 공간을 사용한다.
// 이 경우 Call Stack은 개체 및 배열 값이 아닌 Heap 메모리 참조 ID를 값으로 저장한다.

// 원시타입 : 고정된 크기로 Call Stack 메모리에 저장, 실제 데이터가 변수에 할당.
// 참조타입 : 데이터 크기가 정해지지 않고 Call Stack 메모리에 저장, 데이터의 값이 heap에 저장되며 변수에 heap 메모리의 주소값이 할당.

// 자바스크립트는 동적타입이다.
// 모든 타입의 값으로 할당 가능하다.

let foo = 42 // foo의 타입은 number
foo = 'bar' // foo의 타입은 string
foo = true // foo의 타입은 boolean

// 배열도 Object의 형태이기 때문에 typeof를 통해 type을 체크할 때 object로 찍힌다.
// 그러므로 배열의 타입을 체크할 때는
Array.isArray() // true, false로 검증하면 된다.
