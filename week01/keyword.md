- 반환값에 타입을 붙이면 그것이 **`TypeScript`** 🍠

기본적으로 변수 이름 바로 뒤에 콜론과 함께 타입을 표기합니다.

```tsx
const 변수: 변수의 예상되는 반환값: '변수';
```

```tsx
let age: number = 25;  // age는 number 타입입니다.
let name: string = "John";  // name은 string 타입입니다.
```
- 함수에서의 TypeScript 🍠
<aside>
📌

**`parameter`**(매개 변수) 타입은, 매개변수 바로 뒤에 표기하고, 반환값의 타입은, 파라미터 뒤에 콜론과 함께 예상되는 반환값의 타입을 명시해줍니다.

</aside>

- 함수 선언식의 특징에 대해 정리해주세요! 🍠
    1. 타입 지정이 가능
        
        → 매개변수와 반환 값에 타입을 명시 가능
        
    2. 명시적 타입 추론
        
        → 반환 타입을 명시하지 않으면 typeScript가 자동적으로 타입을 추론해서 반환
        
    3. 호이스팅
        
        → 함수가 선언되기 전에 호출 가능
        
- 화살표 함수의 특징에 대해 정리해주세요! 🍠
    1. 간결한 문법
        
        → function  키워드 없이 ⇒ 기호를 사용해 함수를 정의
        
    2. this 바인딩
        
        → 자신만의 this가 아닌 상위 컨텍스트의 this를 참조
        
    3. return 생략 가능(한 줄로 표현 되는 경우에만)
    4. 함수 선언이 아닌 함수 표현식이라고 사용됨
 
  - any 🍠
    - 어떤 타입도 할당 가능, 타입 체크하지 않음
    
    ```tsx
    let value : any = 42;
    value = "hello";
    ```
    
- unknown 🍠
    - any와 유사
    - 값을 사용할 때 타입 체크가 필요
    
    ```tsx
    let value: unkown = 42;
    if(typeof value === "string"){
    	console.log(value.length);
    }
    ```
    
- void 🍠
    - 함수가 값을 반환하지 않음을 의미
    - undefined와는 다른 개념
    
    ```tsx
    function logmessage(message: string): void{
    	console.log(message);
    	}
    ```
    
- never 🍠
    - 결코 정상적으로 반환하지 않는 함수의 반환 타입
    - 무한 루프나 예외를 던지는 함수에 사용
    
    ```tsx
    function throwError(message: string): never {
    	throw new Error(message);
    }
    ```
