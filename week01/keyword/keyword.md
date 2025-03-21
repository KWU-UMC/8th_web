# null과 undefined의 차이 점에 대해 직접 작성해주세요! 🍠

null은 의도적으로 값이 없음을 표현하기 위해 사용하고 undefined의 경우는 변수는 선언 되었으나 값이 할당되거나 초기화되지 않았을 때 undefined로 정의됩니다.

# 실습 정리

- string
  const str: string = “abc”
  const str: string = 123
- number
  const num: number = 123
  const num: number = “123”
- boolean
  const bool: boolean = true
  const bool: boolean = “true”
- null
  const nll: null = null
  const nll: null = “abc”
- undefined
  const udf: undefined
  const udf: undefined = 123
- symbol
  const sbl: symbol = Symbol(”abc”)
  const sbl: symbol = “abc”
- bigint
  const big: bigint = BigInt(900930992547140991)
  const big: bigint = 900930992547140991
- object
  const obj: {a: string; b: string} = {a: “apple”, b: “2000”}
  const obj: {a: string; b: string} = {a: “apple”, b: 2000}

# 함수 선언식의 특징에 대해 정리해주세요! 🍠

함수를 참조하는 변수가 없음

# 화살표 함수의 특징에 대해 정리해주세요! 🍠

함수를 참조하는 변수 생성

# Typescript에만 존재하는 타입

- any 🍠
  string, boolean, number 등등의 어떤 타입도 가능하다는 것을 의미함
- unknown 🍠
  어떤 타입도 가능하다
- void 🍠
  함수의 반환값을 정의할 때 아무것도 반환하지 않는 함수의 타입을 void라고 지칭
- never 🍠
  어떤 타입의 value도 올 수 없다
