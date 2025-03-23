# ✅ TypeScript 키워드 정리 🍠

## ✅ TypeScript를 배우는 이유

- JavaScript의 상위 집합(Superset)
- 정적 타입 지원으로 안정성 향상
- 대규모 프로젝트에서 협업 효율 ↑
- 점진적으로 JS에 적용 가능

---

### ✅ 기본 타입

### 📌 string / number / boolean / null / undefined / symbol / bigint / object

```ts
const name: string = "Matthew";
const age: number = 26;
const isMac: boolean = true;
const empty: null = null;
const notInit: undefined = undefined;
const uniqueId: symbol = Symbol("id");
const big: bigint = 12345678901234567890n;

const person: { name: string; age: number } = {
  name: "Matthew",
  age: 27,
};
```

### ✅ 함수에서의 타입 정의

```ts
function minus(x: number, y: number): number {
  return x - y;
}

const getFullname = (first: string, last: string): string => {
  return `${first}${last}`;
};
```

- 함수 선언식: hoisting, arguments, this 동적
- 화살표 함수: this 고정(lexical), arguments 없음

### ✅ 리터럴 타입

```ts
const name: "Matthew" = "Matthew"; // 특정 값만 허용
```

#### 객체 리터럴 타입

```ts
const person: { name: string; age: number } = {
  name: "John",
  age: "yaho",
};
```

- 인덱스 시그니처를 통한, 추가 프로퍼티 받기.
  ```ts
  const person: { name: string; age: number; [key: string]: any } = {
    name: "Matthew",
    age: 27,
    job: "Software Developer",
  };
  ```
- 선택적 프로퍼티 (Optional Property ?.)
  ```ts
  const person: { name: string; age?: number } = {
    name: "Matthew",
  }; //age는 선택적 프로퍼티이므로, 객체에서 해당 프로퍼티가 없더라도 오류가 발생하지 않음
  ```
- 객체 리터럴 + as const : JS 객체는 const 변수라도, 수정이 가능

  ```ts
  const matthew = { name: "matthew" } as const;

  matthew.name = "hi"; // ❌오류 : readonly name : "matthew"
  ```

- readonly property
  ```ts
  const person: { readonly name: string; age: number } = {
    name: "Matthew",
    age: 30,
  };
  person.name = "John"; // 오류: 'name'은 읽기 전용이므로 값을 변경할 수 없습니다.
  ```

### ✅ 배열 & 튜플

- 배열 타입
  ```ts
  const arr1: string[] = ["a", "b"];
  ```
- 배열 타입의 문제점
  - 추론의 한계
  ```ts
  const array = [1, 2, 3];
  array[3].toFixed(2); // ❓ (존재하지 않는 요소)
  //타입스크립트는, array가 이미, number[] 숫자 배열이기 떄문에, array[3] 또한, 숫자로 추론이 됨
  ```
- 튜플

  - 각 요소 위치에 타입 지정

  ```ts
  const tuple: [string, boolean, number] = ["a", true, 10];
  ```

- 튜플 타입의 문제점

  - push, pop, unshift, shift 메서드와 같은, 배열에 요소를 추가하거나 제거하는 것은 막지 않음

  ```ts
  const array: [number, string, boolean] = [1, "야호", false];

  array.push(4);
  array.push(false);
  array.push("매튜");
  array.pop();
  array.unshift();
  array.shift();
  ```

- readonly 사용 시 push/pop 제한

  ```ts
  const readonlyTuple: readonly [string, number] = ["a", 1];
  ```

### ✅ 유니언 타입 ( | )

```ts
//기본 예시
let value: string | number;
value = "hello";
value = 123;

//유니온 타입이 적용된 배열
let mixedArray: (string | number)[] = ["Hello", 123, "World", 456];

//유니온 타입과 리터럴 타입의 결합
function move(direction: "left" | "right" | "up" | "down") {
  console.log(`You moved: ${direction}`);
}
move("left"); // 정상
move("right"); // 정상
move("forward"); // 오류: '"forward"'는 'Direction'에 할당할 수 없습니다.
```

- 유연한 타입 처리
- 타입 좁히기 : 유니언 타입을 사용할 때 조건문을 통해 타입을 좁히는 방법
  ```ts
  function process(value: string | number) {
    if (typeof value === "string") {
      console.log(`문자열 처리: ${value.toUpperCase()}`);
    } else {
      console.log(`숫자 처리: ${value.toFixed(2)}`);
    }
  }
  process("Hello"); // 출력: 문자열 처리: HELLO
  process(123); // 출력: 숫자 처리: 123.00
  ```

### ✅ 타입스크립트 전용 타입

- any 모든 타입 허용 (❌ 안전하지 않음)
- unknown 타입 검사 후 사용 (✅ 안전)
- void 반환값 없음
- never 절대 도달하지 않는 코드 (에러, 무한루프 등)

### ✅ Type Alias (타입 별칭)

```ts
type UMCPart = "WEB" | "DESIGN";
type Member = { name: string; part: UMCPart };
```

- 타입을 변수처럼 이름 붙여 사용
- 객체 타입도 별칭 가능
- & 연산자로 타입 결합 가능

### ✅ Interface

```ts
interface User {
  name: string;
  age?: number;
}
```

- 객체 타입 정의
- 병합 가능 (동일 이름 인터페이스)
- 네임스페이스로 병합 관리 가능

### ✅ Generic (제네릭)

```ts
function identity<T>(value: T): T {
  return value;
}

let result = identity<number>(10);
```

- 재사용 가능한 타입 생성
- 유연성과 타입 안전성 확보

### ✅ Enum (열거형)

```ts
enum Direction {
  Up,
  Down,
  Left,
  Right,
}

enum Color {
  Red = "RED",
  Green = "GREEN",
}
```

- 숫자/문자열 열거 가능
- 상수 enum (const enum)도 지원

### ✅ Utility Types

- Partial<T> 모든 속성 optional (?)
- Required<T> 모든 속성 필수 (!)
- Readonly<T> 모든 속성 읽기 전용
- Pick<T, K> 특정 속성만 선택
- Omit<T, K> 특정 속성 제외
- Record<K, T> 객체 키/값 타입 정의
- Exclude<T, U> 특정 타입 제거
- Extract<T, U> 특정 타입만 추출
- NonNullable<T> null, undefined 제거
- ReturnType<T> 함수 반환 타입 추출
