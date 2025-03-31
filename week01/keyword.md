### 키워드 정리 🍠

- 왜 **`TypeScript`**를 학습해야 할까요?
    
    마이크로소프트는, **`JavaScript`**의 **`Superset(기존 언어에, 새로운 기능과 문법을 추가하여, 보완하거나 향상함`**) 언어인, **`TypeScript`**를 공개했습니다. 기존, **`JavaScript`** 코드를 그대로 사용할 수 있어서, 기존 **`JavaScript`** 개발자들이 매우 좋아했습니다.
    
    **`TypeScript` 활용시 장점**
    1. 안정성 보장
    2. 개발 생산성 향상
    3. 협업에 유리
    4. **`JavaScript`**에 점진적으로 적용 가능
    
     대부분의 웹 개발자 채용 공고를 보면, 개발자들과 효율적인 협업을 위해 **`JavaScript`** 보다 **`TypeScript`**를 기본적으로 선호하는 회사가 많습니다.
    
    **`TypeScript`**를 잘 배워두면, React Native를 활용하여 iOS 및 Android 앱을 개발할 수 있으며, Nest.js 또는 Node.js로 서버를 구축할 수 있고, Electron을 이용해 데스크톱 애플리케이션도 만들 수 있습니다.
    
- 반환값에 타입을 붙이면 그것이 **`TypeScript`**
    
    기본적으로 변수 이름 바로 뒤에 콜론과 함께 타입을 표기합니다.
    
    ```tsx
    const 변수: 변수의 예상되는 반환값: '변수';
    ```
    
    - 문자열 (string)
        
        ### string
        
        - 문자열을 표현하는 타입입니다.
        - 작은따옴표(`'`), 큰따옴표(`"`), 또는 백틱(```)을 사용할 수 있습니다.
        
        ```tsx
        const matthew: string = '매튜';
        
        let text: string = "Hello, TypeScript!";
        let template: string = `안녕하세요, ${text}`;
        ```
        
    - 숫자 (number)
        
        ### number
        
        - 정수와 소수를 포함한 모든 숫자를 표현합니다.
        - 10진수, 16진수, 2진수, 8진수를 사용할 수 있습니다.
        
        ```tsx
        const age: number = 26;
        
        let intNum: number = 42;
        let floatNum: number = 3.14;
        let hexNum: number = 0xff; // 16진수
        let binNum: number = 0b1010; // 2진수
        let octNum: number = 0o52; // 8진수
        ```
        
    - 참 / 거짓 불 값 (boolean)
         
        ### boolean
        
        `true` 또는 `false` 값을 가질 수 있습니다.
        
        ```tsx
        const isMac: boolean = true;
        const isGram: boolean = false;
        ```
        
    - null
        
        ### null
        
        - 값이 없음을 의미하는 타입입니다.
        - `null`은 보통 명시적으로 값이 없음을 나타낼 때 사용됩니다.
        
        ```tsx
        const isNull: null = null;
        ```
        
    - undefined
        
        ### undefined
        
        - 변수가 초기화되지 않았거나, 존재하지 않는 속성을 참조할 때 나타나는 값입니다.
        
        ```tsx
        const isUndefined: undefined = undefined;
        ```
        
    - **null과 undefined의 차이점**
        
        null은 직접 의도를 가지고 값이 없는 상태를 만드는 것으로 직접 할당해줘야 하지만 undefined같은 경우에는 선언만 하고 값을 할당하지 않으면 자동으로 할당된다는 점에서 차이가 있다.
        
    - symbol
        
        ### Symbol
        
        - **항상 고유한 값**
            - 같은 Symbol을 생성하더라도 서로 다른 값으로 취급됩니다.
            - 따라서 객체의 프로퍼티 키로 사용할 경우, 다른 프로퍼티와 충돌할 위험이 없습니다.
        - **변경 불가능(Immutable)**
            - 한 번 생성된 Symbol은 변경할 수 없습니다.
        - **객체의 숨겨진 속성으로 활용 가능**
            - 일반적인 객체 키(문자열)와 달리, `Symbol`을 키로 사용하면 `Object.keys()`나 `for...in` 반복문에서 노출되지 않습니다.
            - 즉, 은닉화된 프로퍼티를 만들 때 유용합니다.
        
        ```tsx
        const isSymbol: symbol = Symbol('symbol');
        ```
        
    - bigint
        
        ### bigint
        
        - 매우 큰 정수를 다룰 때 사용합니다.
        - `n`을 숫자 뒤에 붙이면 `bigint` 타입이 됩니다.
        
        ```tsx
        let bigNumber: bigint = 900930992547140991n;
        let anotherBig: bigint = BigInt(12345678901234567890);
        ```
        
    - object
        
        ### object
        
        - 객체를 표현하는 타입입니다.
        - 객체는 키-값 쌍을 가지며, 속성을 정의할 수 있습니다.
        
        ```tsx
        const yaho: object = { yaho: 'yaho' };
        
        let engName: { firstName: string; lastName: string } = {
          firstName: "Ahn",
          lastName: "Ohtani"
        };
        ```

- 함수에서의 **`TypeScript`** 
    
    **`parameter`**(매개 변수) 타입은, 매개변수 바로 뒤에 표기하고, 반환값의 타입은, 파라미터 뒤에 콜론과 함께 예상되는 반환값의 타입을 명시해줍니다.
    
    </aside>
    
    - 함수 선언식
        
        ```tsx
        function minus(x: number, y: number): number {
        	return x - y;
        }
        ```
        
    - 화살표 함수
        
        ```tsx
        const getFullname = (firstName: string, lastName: string): string => {
            return firstName + lastName;
        };
        
        const fullName = getFullname('김', '용민');
        console.log(fullName); // "김용민"
        
        ``` 
        
    - 함수 선언식의 특징
        - function을 선언하고 함수명('func_declaration')을 기재
        - 매개변수를 위한 소괄호와 로직을 위한 중괄호 사용
        - 코드 실행 전에 메모리에 저장되어 함수가 정의되기 전에 호출 가능

    - 화살표 함수의 특징
        - 함수 표현식에서 'function' 글자를 빼고 매개변수를 위한 소괄호 다음에 '=>' 화살표를 넣고 로직을 위한 중괄호 사용
        - 함수 본문이 단일 표현식일 경우 {} 생략 가능
        - 일반 함수와 달리 `call`, `apply`, `bind`로 변경 불가능
        - 일반 함수에서는 `arguments`를 통해 전달된 모든 인수를 참조할 수 있는 것과 달리 화살표 함수는 `arguments`가 없음
           