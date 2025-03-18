### 키워드 정리 🍠

- 왜 **`TypeScript`**를 학습해야 할까요?
    
    <aside>
    📌
    
    마이크로소프트는, **`JavaScript`**의 **`Superset(기존 언어에, 새로운 기능과 문법을 추가하여, 보완하거나 향상함`**) 언어인, **`TypeScript`**를 공개했습니다. 기존, **`JavaScript`** 코드를 그대로 사용할 수 있어서, 기존 **`JavaScript`** 개발자들이 매우 좋아했습니다.
    
    **`TypeScript` 활용시 장점**
    1. 안정성 보장
    2. 개발 생산성 향상
    3. 협업에 유리
    4. **`JavaScript`**에 점진적으로 적용 가능
    
     대부분의 웹 개발자 채용 공고를 보면, 개발자들과 효율적인 협업을 위해 **`JavaScript`** 보다 **`TypeScript`**를 기본적으로 선호하는 회사가 많습니다.
    
    **`TypeScript`**를 잘 배워두면, React Native를 활용하여 iOS 및 Android 앱을 개발할 수 있으며, Nest.js 또는 Node.js로 서버를 구축할 수 있고, Electron을 이용해 데스크톱 애플리케이션도 만들 수 있습니다.
    
    </aside>
    
- 반환값에 타입을 붙이면 그것이 **`TypeScript`** 🍠
    
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
        
    - **null과 undefined의 차이 점에 대해 직접 작성해주세요!** 🍠
        
        null: 값이 없음을 명시할 때
        
        undefined: 선언은 됐으나 값이 할당되지 않았을 때
        
        null은 의도적인 빈 값, undefined는 변수를 선언할 때 값을 할당하지 않으면 기본적으로 할당되는 초기값
        
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
        
    
    <aside>
    📌
    
    반환값으로, 설정한 타입과 할당한 변수의 타입이 맞지 않으면, 어떻게 되는지 아래에 작성해주세요!
    아래와 같이, 반환값이 문자열이라고 예상했지만, 숫자가 들어간 경우, 에러가 발생합니다.
    
    각 실습들의 성공케이스와, 실패 케이스를 아래에 정리해주세요!
    
    
    </aside>
    
    - 실습 정리 🍠
        - string
            
            성공 케이스
            
            ```tsx
            const str: string = '성공';
            ```
            
            실패 케이스
            
            ```tsx
            const str: string = 12345;
            // Type 'number' is not assignable to type 'string'.
            ```
            
        - number
            
            성공 케이스
            
            ```tsx
            const age: number = 11;
            ```
            
            실패 케이스
            
            ```tsx
            const age: number = '열하나';
            // Type 'string' is not assignable to type 'number'.
            ```
            
        - boolean
            
            성공 케이스
            
            ```tsx
            const isBool: boolean = true;
            ```
            
            실패 케이스
            
            ```tsx
            const isBool: boolean = 'true';
            // Type 'string' is not assignable to type 'boolean'.
            ```
            
        - null
            
            성공 케이스
            
            ```tsx
            const isNull: null = null;
            ```
            
            실패 케이스
            
            ```tsx
            const isNull: null = undefined;
            // Type 'undefined' is not assignable to type 'null'.
            ```
            
        - undefined
            
            성공 케이스
            
            ```tsx
            const isUndefined: undefined = undefined;
            ```
            
            실패 케이스
            
            ```tsx
            const isUndefined: undefined = null;
            // Type 'null' is not assignable to type 'undefined'.
            ```
            
        - symbol
            
            성공 케이스
            
            ```tsx
            const isSymbol: symbol = Symbol('symbol');
            ```
            
            실패 케이스
            
            ```tsx
            const isSymbol: symbol = 'symbol';
            // Type 'string' is not assignable to type 'symbol'.
            ```
            
        - bigint
            
            성공 케이스
            
            ```tsx
            let bigNumber: bigint = 900930992547140991n;
            ```
            
            실패 케이스
            
            ```tsx
            const bigNumber: bigint = 10000000000;
            // Type 'number' is not assignable to type 'bigint'.
            ```
            
        - object
            
            성공 케이스
            
            ```tsx
            const yaho: object = { yaho: 'yaho' };
            ```
            
            실패 케이스
            
            ```tsx
            const yaho: object = 'yaho';
            // Type 'string' is not assignable to type 'object'.
            ```
            
- 함수에서의 **`TypeScript`** 🍠
    
    <aside>
    📌
    
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
        
    - 함수 선언식의 특징에 대해 정리해주세요! 🍠
        1. 명확한 타입 명시 가능
            1. 매개변수와 반환값 모두 타입 지정 가능
        2. 호이스팅 지원
            1. 화살표 함수와 다르게 호이스팅 지원, 코드 상단에서 호출 가능
        3. `this` 바인딩: 동적 바인딩
            1. 호출 시점에 따라 결정
        4. 오버로딩 지원
            1. 같은 함수 이름으로 다양한 인자 타입 받을 수 있음
        5. prototype 존재
    - 화살표 함수의 특징에 대해 정리해주세요! 🍠
        1. 간결함
        2. 호이스팅 불가
            1. 선언 이후에만 호출 가능
        3. `this` 바인딩: 정적 바인딩
            1. 선언된 위치에서 상위 스코프의 `this`를 가리킴
        4. 생성자로 사용 불가능
            1. new 키워드로 인스턴스 생성 불가능
        5. prototype 존재x
- 리터럴 타입
    - 타입 자리에 **`리터럴** **값**`을 넣어보자!
        
        리터럴 타입(Literal Types)은 TypeScript에서 특정한 값 그 자체만을 허용하는 타입을 정의할 수 있는 기능입니다. 일반적으로 우리가 사용하는 **문자열 타입**(`string`), **숫자 타입**(`number`), **불리언 타입**(`boolean`)은 그 타입에 해당하는 모든 값을 포함합니다. 하지만 **리터럴 타입**을 사용하면 특정한 값 하나만 허용할 수 있습니다. 리터럴 타입을 사용하면 코드의 안정성을 높이고, 예기치 않은 값을 할당하는 오류를 방지할 수 있습니다.
        
        ## 1. 리터럴 타입의 기본 개념
        
        리터럴 타입은 값의 "리터럴"을 타입으로 사용하는 방식입니다. 즉, 특정한 값만을 허용하는 타입을 정의할 수 있습니다. 예를 들어, 변수에 **문자열 리터럴 타입**을 정의하면 그 변수는 해당 문자열만 가질 수 있게 됩니다.
        
        ### 예시 1: 문자열 리터럴 타입
        
        ```tsx
        const name: "Matthew" = "Matthew";
        ```
        
        위 코드에서 변수 `name`은 **문자열 리터럴 타입** `"Matthew"`를 가지고 있습니다. 따라서 이 변수는 `"Matthew"`라는 값만 가질 수 있으며, 다른 문자열을 대입하면 TypeScript에서 오류를 발생시킵니다.
        
        ### 잘못된 예시
        
        ```tsx
        const name: "Matthew" = "Yaho"; 
        ```
        
        이 코드에서는 변수 `name`이 `"Matthew"`라는 특정한 값만 가질 수 있도록 정의했기 때문에 `"Yaho"`을 대입하려고 하면 타입 불일치 오류가 발생합니다.
        
        ### 예시 2: 숫자 리터럴 타입
        
        숫자에도 동일한 방식으로 리터럴 타입을 적용할 수 있습니다.
        
        ```tsx
        const age: 30 = 30;
        ```
        
        이 변수는 **숫자 리터럴 타입** `30`을 가지고 있으므로, 값이 항상 `30`이어야 합니다. 다른 숫자를 대입하려고 하면 오류가 발생합니다.
        
        ### 잘못된 예시
        
        ```tsx
        const age: 30 = 25; 
        ```
        
    - 객체 리터럴 타입
        
        **`객체 리터럴 타입(Object Literal Types)`**은 **`TypeScript`**에서 **특정 구조와 값을 가진 객체**만을 허용하도록 제한하는 타입입니다. 이는 객체가 가질 수 있는 프로퍼티의 이름과 해당 프로퍼티의 값의 타입을 명확하게 정의함으로써, 예상치 못한 값이 객체에 포함되는 것을 방지합니다.
        
        ### 객체 리터럴 타입의 기본 개념
        
        **`TypeScript`**에서 객체 리터럴 타입을 정의하면, 해당 객체는 **미리 정의된 프로퍼티**만을 가져야 하고, 각 프로퍼티는 **정해진 타입의 값**만을 가질 수 있습니다. 객체의 구조와 값에 제약을 두어 코드를 더 안전하게 작성할 수 있습니다.
        
        ### 객체 리터럴 타입의 예시
        
        ```tsx
        const person: { name: string; age: number } = {
            name: "Matthew",
            age: 27
        };
        ```
        
        위 코드에서 `person`은 객체 리터럴 타입 `{ name: string; age: number }`을 가지고 있습니다. 이 타입은 `name` 프로퍼티가 **문자열**이고, `age` 프로퍼티가 **숫자**여야 함을 의미합니다.
        
        ### 잘못된 예시
        
        ```tsx
        const person: { name: string; age: number } = {
            name: "John",
            age: "yaho"
        };
        ```
        
        위 코드에서 `age`에 **`yaho`**라는 문자열을 할당했기 때문에, TypeScript는 오류를 발생시킵니다. `age`는 숫자 타입이어야 하므로 **`yaho`**는 올바른 타입의 값이 아닙니다.
        
        ---
        
        ## 객체 리터럴 타입의 실용성
        
        **`객체 리터럴 타입`**은 객체의 구조를 엄격하게 제한하여 코드의 안정성을 높여줍니다. 특히 복잡한 구조를 가지는 객체를 다룰 때, 미리 정의된 프로퍼티 외의 값이 객체에 포함되는 것을 방지할 수 있습니다.
        
        ### 예시: 불필요한 프로퍼티 방지
        
        ```tsx
        const person: { name: string; age: number } = {
            name: "Matthew",
            age: 30,
            job: "Engineer"
        };
        ```
        
        이 예시에서는 객체에 정의되지 않은 `job` 프로퍼티를 추가하려고 했기 때문에, TypeScript는 오류를 발생시킵니다. 객체 리터럴 타입은 정의된 프로퍼티 외에는 추가적인 프로퍼티를 허용하지 않습니다.
        
    - **`인덱스 시그니처`**를 통한, 추가 프로퍼티 받기.
        
        ### 추가적인 프로퍼티를 허용하려면?
        
        객체에 **추가적인 프로퍼티**를 허용하려면 **`인덱스 시그니처(Index Signature)`**를 사용할 수 있습니다. 인덱스 시그니처를 사용하면 객체의 프로퍼티 이름과 값의 타입에 대해 유연성을 부여할 수 있습니다.
        
        ```tsx
        const person: { name: string; age: number; [key: string]: any } = {
            name: "Matthew",
            age: 27,
            job: "Software Developer"
        };
        
        ```
        
        위 코드에서는 인덱스 시그니처 `[key: string]: any`를 사용하여 추가적인 프로퍼티(`job` 등)를 허용하고, 그 값은 `any` 타입으로 정의했습니다. 이 방식으로 **`객체의 특정 프로퍼티 외에도 임의의 키-값 쌍을 허용`**할 수 있습니다.
        
    - 선택적 프로퍼티 (Optional Property `?.`)
        
        ## 선택적 프로퍼티
        
        **`TypeScript`**에서는 객체 리터럴 타입의 프로퍼티 중 일부를 **`선택적(optional)`**으로 만들 수 있습니다. 선택적 프로퍼티는 있어도 되고 없어도 되는 프로퍼티입니다. 이를 위해 프로퍼티 이름 뒤에 `?`를 붙여 사용합니다.
        
        ### 예시: 선택적 프로퍼티
        
        ```tsx
        const person: { name: string; age?: number } = {
            name: "Matthew"
        };
        ```
        
        이 경우 `age`는 선택적 프로퍼티이므로, 객체에서 해당 프로퍼티가 없더라도 오류가 발생하지 않습니다. `age`가 없어도 문제없고, 있으면 숫자여야 합니다.
        
    - 자바스크립트 객체는 `const`로 선언되도, 수정이 가능하다. (**`as const`**)
        
        ## 자바스크립트의 객체는 const 변수여도 수정이 가능하다.
        
        자바스크립트의 객체는 const 변수라도, 수정이 가능하므로, 타입스크립트는 수정 가능성이 있다고, 판단하여 타입을 넓게 추론합니다.
        
        아래 코드를 실행시켜봅시다.
        
        ```tsx
        const matthew = { name: 'matthew' };
        ```
        
        실제로, 우리는 name에는 **`matthew`**만 들어가게 하고 싶지만, 아래 실행 코드를 보면 **`string으로 타입이 넓게 추론`**되는 것을 확인할 수 있습니다.
        
        
        **`matthew`** 이외에, **`다른 값을 들어가고 싶지 않게하고 싶고`**, **`수정 가능성이 없는 것이 확실`**하다면 **`as const`** 라는 특별한 접미사를 붙이면 됩니다.
        
        ```tsx
        const matthew = { name: 'matthew' } as const;
        
        matthew.name = 'hi';
        ```
        
    - **객체 리터럴 타입**과 **읽기 전용 프로퍼티**
        
        ## 객체 리터럴 타입과 읽기 전용(Readonly) 프로퍼티
        
        객체 리터럴 타입에서 특정 프로퍼티가 **`읽기 전용(readonly)`**이어야 한다면, `readonly` 키워드를 사용할 수 있습니다. 읽기 전용으로 정의된 프로퍼티는 객체가 생성된 후 값을 변경할 수 없습니다.
        
        ### 예시: 읽기 전용 프로퍼티
        
        ```tsx
        const person: { readonly name: string; age: number } = {
            name: "Matthew",
            age: 30
        };
        
        person.name = "John";  // 오류: 'name'은 읽기 전용이므로 값을 변경할 수 없습니다.
        ```
        
        위 코드에서 `name`은 `readonly`로 선언되었기 때문에, 객체가 생성된 후에 값을 변경하려고 하면 오류가 발생합니다.
        
- 배열 타입, 튜플 타입
    - 배열
        
        배열 타입은 아래와 같이 2가지 방식으로 정의할 수 있다.
        
        ```tsx
        const stringArray: string[] = ['야호', '고구마', '맥북'];
        const stringArray2: Array<string> = ['야호', '고구마', '맥북'];
        
        stringArray.push(14); // 오류: Argument of type 'number' is not assignable to parameter of type 'string'.
        ```
        
        `push`를 활용해서, 현재 문자열로 선언된 배열에 숫자를 넣는 것은, 타입이 호환되지 않으므로 에러가 발생함을 알 수 있다.
  
        
    - 배열 타입의 문제점 (추론의 한계)
        
        ### 배열의 문제점
        
        ```tsx
        const array = [1, 2, 3];
        
        array[3].toFixed(2); // ❓ (존재하지 않는 요소)
        ```
   
        
        실제로, **`toFixed`**는 숫자를, 소수점 이하 자리수를 정확하게 갖는 문자열 표현으로 반환하는 메소드입니다.
        
        우리는 현재 배열의 3번 인덱스에 값이 존재하지 않고, 위의 코드를 실행한다면 에러가 발생할 것 입니다.
        
        하지만, 타입스크립트는, `array`가 이미, `number[] 숫자 배열`이기 떄문에, `array[3] 또한, 숫자로 추론`이 됩니다.
        
        그래서, 타입 스크립트에서 에러를 잡을 수 없습니다.
        
        이러한 문제를 **`튜플`**로 해결할 수 있습니다.
        
    - 튜플
        
        ### Tuple 튜플
        
        각 요소 자리에 타입이 고정되어 있는 배열을 특별하게 튜플이라고 부릅니다.
        
        ```tsx
        const tuple: [string, boolean, number] = ['매튜', true, 26];
        ```
        
        아래와 같이, 여러가지 값을 대입해보면 아래와 같은 에러를 볼 수 있다.
        
        ```tsx
        const tuple: [string, boolean, number] = ['매튜', true, 26];
        
        // 문자열은 대입이 된다.
        tuple[0] = '고구마'; 
        
        // 문자열이 아닌 boolean이 들어갔으므로 에러가 발생한다.
        tuple[0] = false;
        
        // 배열의 3번 인덱스 자리는, 아무것도 들어갈 수 없으므로 에러가 발생한다.
        tuple[3] = true;
        ```
        
        아까 배열인 경우 발생한 문제점도 해결할 수 있음을 알 수 있다. 실행 이전 단계에서, 에러를 확인할 수 있다.
        
        ```tsx
        const array: [number, number, number] = [1, 2, 3];
        
        array[3].toFixed(2); // 튜플로, 선언했기에 이제 에러가 발생함을 알 수 있다.
        ```
        
    - 튜플 타입의 문제점
        
        튜플 타입의 경우, `push`, `pop`, `unshift`, `shift` 메서드와 같은, 배열에 요소를 추가하거나 제거하는 것은 막지 않는다.
        
        ```tsx
        const array: [number, string, boolean] = [1, '야호', false];
        
        array.push(4);
        array.push(false);
        array.push('매튜');
        array.pop();
        array.unshift();
        array.shift();
        ```
        
        이를 막기 위해서는 우리가 위에서 학습한 `readonly`를 통해 해결할 수 있다.
        
        ```tsx
        const array: readonly [number, string, boolean] = [1, '야호', false];
        
        // 에러 발생 Property 'push' does not exist on type 'readonly [number, string, boolean]'.(2339)
        array.push(4);
        array.push(false);
        array.push('매튜');
        array.pop();
        array.unshift();
        array.shift();
        ```
        
        
- 유니언 타입 **(|)**
    
    ### 유니언 타입 (Union Types)
    
    **`TypeScript`**의 **유니언 타입**은 **둘 이상의 타입을 허용**하여, 변수가 여러 타입 중 하나를 가질 수 있게 합니다. 이는 여러 가지 값을 처리할 때 타입을 유연하게 지정할 수 있어, 다양한 상황에서 유용하게 사용됩니다.
    
    ## 1. 유니언 타입의 기본 개념
    
    유니언 타입은 **파이프(|)** 기호를 사용하여 두 개 이상의 타입을 결합합니다. 이를 통해 변수나 함수의 인자, 반환 값 등이 여러 타입 중 하나를 가질 수 있도록 지정할 수 있습니다.
    
    ### 유니언 타입의 기본 예시
    
    ```tsx
    let value: string | number;
    
    value = "Hello";  // 정상
    value = 123;      // 정상
    value = true;     // 오류: 'boolean' 타입은 허용되지 않습니다.
    ```
    
    위 예시에서 `value`는 `string` 또는 `number` 타입을 가질 수 있으며, **문자열**이나 **숫자** 값을 대입할 수 있습니다. 그러나 `boolean` 타입의 값을 대입하려고 하면 오류가 발생합니다.
    
    ---
    
    ## 2. 유니언 타입의 활용
    
    **`유니언 타입`**은 주로 **함수의 인자**나 **반환 타입**을 지정할 때 많이 사용됩니다. 예를 들어, 특정 함수가 문자열 또는 숫자를 인자로 받아야 하거나, 문자열 또는 숫자를 반환할 수 있는 경우에 **`유니언 타입`**을 지정할 수 있습니다.
    
    ### 함수에서 유니언 타입 사용
    
    ```tsx
    function printValue(value: string | number) {
        console.log(value);
    }
    
    printValue("Hello");  // 출력: Hello
    printValue(123);      // 출력: 123
    ```
    
    위 함수 `printValue`는 인자로 **문자열**과 **숫자** 모두를 받을 수 있도록 유니언 타입을 지정했습니다. 따라서 호출 시에 문자열이나 숫자를 모두 전달할 수 있습니다.
    
    ---
    
    ## 3. 유니언 타입과 조건부 로직
    
    유니언 타입을 사용할 때는 **타입 좁히기**(Type Narrowing)로 각 타입별로 분기 처리할 수 있습니다. TypeScript는 유니언 타입을 사용할 때, 런타임에서 특정 타입으로 좁혀 처리할 수 있도록 다양한 방식을 제공합니다.
    
    ### 타입 좁히기(Type Narrowing)
    
    <aside>
    📌
    
    **`typeof ‘Matthew’;`
    typeof를 통해, 뒤에 붙은, 내용이 어떠한 타입인지 알 수 있습니다.**
    
    </aside>
    
    유니언 타입을 사용할 때 조건문을 통해 타입을 좁히는 방법입니다. `typeof` 또는 `instanceof`를 사용하여 변수의 실제 타입을 검사하고, 그에 맞게 처리할 수 있습니다.
    
    ```tsx
    function process(value: string | number) {
        if (typeof value === "string") {
            console.log(`문자열 처리: ${value.toUpperCase()}`);
        } else {
            console.log(`숫자 처리: ${value.toFixed(2)}`);
        }
    }
    
    process("Hello");  // 출력: 문자열 처리: HELLO
    process(123);      // 출력: 숫자 처리: 123.00
    ```
    
    이 코드에서는 `typeof`를 사용하여 `value`의 타입을 검사한 후, 각각 문자열과 숫자에 맞는 로직을 처리합니다.
    
    ---
    
    ## 4. 유니언 타입과 배열
    
    유니언 타입은 배열에도 적용될 수 있습니다. **배열에 여러 타입의 값**을 허용해야 할 때, 유니언 타입을 사용하여 정의할 수 있습니다.
    
    ### 유니언 타입이 적용된 배열
    
    ```tsx
    let mixedArray: (string | number)[] = ["Hello", 123, "World", 456];
    ```
    
    위 예시는 `string`과 `number` 타입을 모두 허용하는 배열을 선언한 것입니다. 배열에 문자열과 숫자가 섞여 있을 수 있으며, 각각의 값이 해당 타입에 맞는지 체크할 수 있습니다.
    
    ---
    
    ## 5. 유니언 타입과 리터럴 타입의 결합
    
    유니언 타입은 **리터럴 타입**과 결합하여 특정 값들만 허용하는 타입을 정의할 때도 유용합니다. 예를 들어, 함수의 인자로 특정한 값들만 허용하고 싶을 때 리터럴과 유니언 타입을 결합할 수 있습니다.
    
    ### 예시: 유니언과 리터럴 타입 결합
    
    ```tsx
    function move(direction: "left" | "right" | "up" | "down") {
        console.log(`You moved: ${direction}`);
    }
    
    move("left");  // 정상
    move("right"); // 정상
    move("forward"); // 오류: '"forward"'는 'Direction'에 할당할 수 없습니다.
    ```
    
    위 코드에서는 `direction` 타입을 `"left" | "right" | "up" | "down"`으로 정의하여, 특정 문자열 값들만 허용하도록 제한했습니다. 유니언 타입을 사용함으로써 허용 가능한 값들을 제한할 수 있어, 잘못된 값을 입력하는 **`실수를 방지`**할 수 있습니다.
    
- 타입 스크립트에만 존재하는 타입 🍠
    - any 🍠
        - 특정 값으로 인해 타입 오류가 발생하기를 원치 않을 때 쓰는 특수한 타입
        - 타입을 미리 알 수 없는 값이 있을 때 사용
        - any를 쓰면 자바스크립트처럼 타입이 검사되지 x
        
        ```tsx
        let a: any = '1'; // any
        let b: any = 1; // any
        let c = a + b; // any 에러 안남
        ```
        
    - unknown 🍠
        - any처럼 타입을 미리 알 수 없는 값이 있을 때 사용
        - 타입을 검사해 정제하기 전까지는 unknown 타입의 값 사용 불가능
        - error가 대표적인 unknown 타입
        
        ```tsx
        // 지금은 30이지만 
        // 나중에 어떤 타입이 될지 몰라서 unknown 타입으로 지정한 상황
        let a: unknown = 30; 
        
        // true 
        // unknown 타입인 값과 아닌 값 비교 가능
        let b = a === 30; 
        
        // 에러
        // 'a' is of type 'unknown'
        let c = a + 10; 
        
        // 타입을 정제했기 때문에 에러가 나지 않는다
        if (typeof a === 'number') {
            let c = a + 10; // number
        }
        ```
        
        **any는 어떤 타입이든 될 수 있고, 이후 어떤 동작이든 할 수 있음**
        
        **unknown은 어떤 타입이든 될 수 있지만, 그 이후 어떤 동작도 허용하지 않음**
        
        **unknown은 any와 다르게 방어처리를 해서 안전하게 사용 가능, 타입을 정제하는 unknown을 쓰는 것을 권장**
        
    - void 🍠
        - 아무것도 없음을 의미하는 타입
        - 아무런 값도 반환하지 않는 함수의 반환값 타입을 정의할 때 사용
    - never 🍠
        - 존재하지 않는, 불가능한 타입
        - 함수가 절대 정상적으로 종료될 수 없어서 이 함수의 반환값 자체가 있는 것이 모순인 경우(함수가 어떠한 값도 반환할 수 없는 경우)에 사용
            - 무한루프를 도는 함수
            - 에러를 던지는 함수
- Type Aliases (타입 별칭)
    
    ### Type Aliases
    
    **`타입 별칭`**은, 특정 타입이나 **`인터페이스를 참조`**할 수 있는 타입 변수를 의미합니다.
    
    ```tsx
    // 타입 별칭 사용
    type Matthew = 'Matthew';
    const yongminEnglishName: Matthew = 'Matthew';
    ```
    
    **`Union type`**으로 type이 길거나, 복잡한 경우, 객체나 함수에 타입을 정의하는 경우 유용하게 **`Type Aliases`**를 사용할 수 있다.
    
    ```tsx
    type UmcPartType = 'WEB' | 'SPRING' | 'NODE' | 'PLAN' | 'DESIGN' | 'ANDROID' | 'IOS';
    ```
    
    **`Type Aliases`**를 **`Union Type`**으로 합쳐서 가능하다.
    
    ```tsx
    type Name = string;
    type Nickname = string;
    
    type member = Name | Nickname;
    ```
    
    **`Type Aliases`**를 객체에 사용할 경우 매우 유용하다.
    
    ```tsx
    type UMC = {
        nickname: string;
        part: string;
    }
    
    let member: UMC = { nickname: 'Matthew', part: 'WEB' }
    ```
    
    **`& 연산자`**를 활용하여, **`object 타입을 합칠 수 있습니다.`**
    
    ```tsx
    type TNickname = { nickname: string }
    type TName = { name: string }
    
    type TMember = TNickname & TName;
    
    let me: TMember = {
        name: '김용민',
        nickname: '매튜'
    }
    ```
    
- **Interface** 객체 타이핑
    - 인터페이스 병합
        
        ### Merging Interfaces
        
        TypeScript에서는 같은 이름을 가진 여러 인터페이스가 있을 경우, 이를 자동으로 병합하여 하나의 인터페이스로 취급합니다. 이 기능은 인터페이스를 확장하는 데 유용하며, 모듈 간의 충돌을 방지하면서도 인터페이스를 유연하게 관리할 수 있습니다.
        
        ```tsx
        interface UMC {
        	name: string;
        	nickname: string;
        }
        
        interface UMC {
        	skill: string;
        }
        
        let member: UMC = { name: '김용민', nickname: '매튜', skill: 'WEB' };
        ```
        
        ### 특징
        
        1. **자동 병합**: 같은 이름을 가진 인터페이스는 자동으로 병합됩니다.
        2. **확장성**: 여러 곳에서 인터페이스를 정의하고 나중에 필요할 때 다른 속성을 추가할 수 있습니다.
        3. **타입 안전성 유지**: 병합된 인터페이스는 여전히 타입 검사를 통해 안전하게 사용됩니다.
        
        ### 주의사항
        
        - **중복된 타입 정의**: 같은 속성 이름이지만 다른 타입으로 정의된 경우 오류가 발생할 수 있습니다. 예를 들어, 두 인터페이스에서 동일한 속성 `name`을 하나는 `string`, 다른 하나는 `number`로 정의하면 충돌이 발생합니다.
        
        ```tsx
        interface UMC {
          name: string;
        }
        
        interface UMC {
          name: number; // 오류 발생
        }
        ```
        
         
        
    - 네임 스페이스
        
        ### namespace
        
         위에서 설명드린, **`인터페이스 병합에는 큰 단점`**이 있습니다. 바로, 남이 만든 인터페이스와 의도치 않게 병합될 수 있습니다. (다른 라이브러리 설치 등)
        
        `네임스페이스`는 코드를 모듈화하고 논리적으로 그룹화하는 방법 중 하나로, 여러 변수나 함수를 하나의 단위로 묶어 충돌을 방지하는 데 사용됩니다. 특히 대규모 애플리케이션에서 전역 네임스페이스 오염을 피하고, 같은 이름을 가진 함수나 변수가 의도치 않게 충돌하는 문제를 해결할 수 있습니다.
        
        ```tsx
        namespace A {
            const a = 1;
            export let b = a + 10;
        }
        
        namespace A {
            export const c = 2;
            b = 20;
        }
        
        console.log(A.c)
        ```
        
        위 예시에서 `A`라는 네임스페이스를 두 번 선언했지만, 이는 `TypeScript에서 자동으로 병합`됩니다. 즉, 네임스페이스 `A`는 `b`와 `c` 모두를 포함하는 하나의 네임스페이스가 됩니다. 코드가 복잡해지더라도 네임스페이스를 이용하면 같은 이름의 변수가 다른 역할을 하는 것을 방지할 수 있습니다.
        
        ### 특징
        
        1. **코드 조직화**: 네임스페이스는 코드를 모듈화하고 관련 있는 기능들을 **`묶어서 관리`**할 수 있습니다.
        2. **네임스페이스 병합**: 동일한 이름의 네임스페이스가 **`여러 곳에서 선언`**되어도, 자동으로 병합되어 하나의 네임스페이스로 처리됩니다.
        3. **전역 네임스페이스 오염 방지**: 네임스페이스 내에서 변수를 선언함으로써 전역 변수의 이름 충돌을 방지할 수 있습니다.
        
        ### 우연한 병합 가능성
        
        네임스페이스는 편리한 기능이지만, **`의도치 않은 병합**이 발생`할 수 있습니다. 즉, 프로젝트에서 다른 개발자가 동일한 이름의 네임스페이스를 사용하면, 두 네임스페이스가 병합되어 의도하지 않은 결과를 초래할 수 있습니다.
        
        예를 들어, 두 명의 개발자가 각각 `A`라는 네임스페이스를 사용하고, 내부에 동일한 이름의 변수나 함수가 있다면, 코드가 병합되면서 예기치 않은 오류가 발생할 수 있습니다. 이러한 문제를 방지하기 위해 모듈 시스템이나 외부 라이브러리를 사용할 때는 네임스페이스 이름을 신중하게 선택하거나, 모듈 임포트 방식을 사용하는 것이 좋습니다.
        
        ### 요약
        
        - **네임스페이스**는 전역 네임스페이스 오염을 방지하고 코드를 조직화하는 데 사용된다.
        - 네임스페이스는 동일한 이름으로 선언되면 자동으로 병합된다.
        - 의도치 않은 병합을 방지하기 위해 모듈 시스템 사용이 권장된다
- **Generic**
    
    ### Generic
    
    `제네릭`은 다양한 타입에서 재사용성을 높이기 위해 사용하는 문법입니다. TypeScript는 정적 타입을 가지는 언어로, `제네릭` 문법을 지원합니다.
    
    ### 제네릭이란?
    
    함수, 타입, 클래스 등에서 사용할 **구체적인 타입을 미리 정하지 않고** 타입 변수를 사용해 **유연하게 처리**할 수 있는 방식입니다. 이렇게 하면 실제로 타입이 필요한 시점에 **외부에서** 원하는 타입을 지정할 수 있습니다.
    
    ### 제네릭의 사용법
    
    - 함수나 클래스의 매개변수처럼, 타입의 자리를 비워 두고, 사용하는 순간 타입을 지정합니다.
    
    ```tsx
    function identity<T>(arg: T): T {
      return arg;
    }
    
    // 사용 시점에 타입 지정 (number -> 숫자 타입)
    let result = identity<number>(42); // T = number 
    ```
    
    1. **`<T>` (제네릭 타입 선언)**
        - 이 부분에서 `T`는 **제네릭 타입 변수를 선언**하는 곳입니다.
        - `<T>`는 이 함수가 **제네릭 타입을 사용할 것**임을 명시합니다. 즉, `T`는 아직 구체적인 타입이 정해지지 않았고, 함수가 호출될 때 **외부에서** 지정된 타입이 들어옵니다.
    2. **`arg: T` (매개변수 타입)**
        - 함수의 매개변수 `arg`는 **`T` 타입**을 가집니다.
        - 즉, 첫 번째 `<T>`에서 선언된 제네릭 타입을 이 매개변수의 타입으로 사용하겠다는 의미입니다. 함수가 호출될 때, `T` 자리에 어떤 타입이 지정되면 `arg`는 그 타입을 따릅니다.
    3. **`: T` (반환 타입)**
        - 이 부분은 **함수의 반환 타입**을 나타냅니다.
        - 함수의 반환 값 또한 `T` 타입이어야 함을 의미합니다. 따라서 이 함수는 매개변수로 받은 `T` 타입의 값을 그대로 반환하게 됩니다.
    
    ### 제네릭의 장점
    
    - 코드 재사용성을 높일 수 있어 **`유지보수에 유리`**합니다.
    - 다양한 타입에 대해 **타입 안전성**을 유지하면서 **`하나의 함수로 여러 타입을 처리`**할 수 있습니다.
- **Enum**
    
    ### Enum
    
    `Enum`(열거형)은 TypeScript에서 **이름이 있는 상수 집합**을 정의하는 방법입니다. 여러 값들을 하나의 그룹으로 묶어, **가독성**을 높이고 **의미 있는 이름**을 제공할 수 있도록 도와줍니다. JavaScript에는 없는 TypeScript만의 고유한 기능입니다.
    
    ### Enum의 종류
    
    TypeScript에서는 크게 두 가지 유형의 `enum`을 지원합니다:
    
    1. **숫자형 Enum (Numeric Enum)**
    2. **문자열 Enum (String Enum)**
    
    ---
    
    ### 1. 숫자형 Enum (Numeric Enum)
    
    기본적으로 `Enum`의 값은 숫자입니다. **첫 번째 값은 0**부터 시작하며, 이후 값들은 자동으로 1씩 증가합니다.
    
    ```tsx
    enum Direction {
      Up,    // 0
      Down,  // 1
      Left,  // 2
      Right  // 3
    }
    
    let dir: Direction = Direction.Up;
    console.log(dir); // 0
    ```
    
    - 여기서 `Direction.Up`의 값은 **0**이고, `Direction.Down`은 **1**로 자동으로 증가합니다.
    - 만약 특정 값으로 시작하고 싶다면, **첫 번째 값에 수동으로 설정**할 수 있습니다.
    
    ```tsx
    enum Status {
      Success = 1,  // 1
      Failure,      // 2
      Pending       // 3
    }
    ```
    
    ### 2. 문자열 Enum (String Enum)
    
    숫자 대신 **문자열을 사용할 수 있는 Enum**도 지원됩니다. 이 경우 값들을 수동으로 **문자열로 지정**해야 합니다.
    
    ```tsx
    enum Color {
      Red = "RED",
      Green = "GREEN",
      Blue = "BLUE"
    }
    
    let myColor: Color = Color.Green;
    console.log(myColor); // "GREEN"
    ```
    
    - 문자열 `enum`은 자동 증가하지 않고, **직접 명시한 문자열 값**이 사용됩니다.
    
    ---
    
    ### Enum의 특징
    
    1. **양방향 매핑 (숫자형 Enum만 해당)**
        - 숫자형 Enum에서는 **값을 통해 키를 역으로 조회**할 수 있습니다.
        
        ```tsx
        enum Role {
          Admin = 1,
          User,
          Guest
        }
        
        console.log(Role[1]); // "Admin"
        console.log(Role.Admin); // 1
        ```
        
    2. **상수 Enum**
        - 컴파일된 JavaScript 파일에서 **enum 값을 직접 상수로 삽입**하려면 `const enum`을 사용할 수 있습니다. 이는 성능 최적화에 도움이 됩니다.
        
        ```tsx
        const enum Size {
          Small = 1,
          Medium,
          Large
        }
        
        let tshirtSize = Size.Medium;
        ```
        
    
    ---
    
    ### Enum의 장점
    
    - **`가독성`**: 숫자나 문자열 상수 대신 의미 있는 이름을 사용할 수 있어, 코드를 더 읽기 쉽게 만듭니다.
    - **`유지보수성`**: 여러 관련 값들을 한 곳에서 관리할 수 있어, 코드를 쉽게 변경하고 관리할 수 있습니다.
    - **`타입 안정성`**: Enum 값은 컴파일 타임에 확인되므로, 잘못된 값을 사용할 경우 컴파일러가 오류를 발생시킵니다.
    
    ---
    
    `TypeScript`의 `Enum`을 통해 의미 있는 상수 집합을 정의하고, 코드의 가독성과 유지보수성을 높일 수 있습니다.
    
- **Utility Type**
    - Pick
        
        ## 🔹 **`Pick<T, K>` - 특정 프로퍼티만 선택**
        
        `Pick<T, K>`는 `T` 타입에서 **일부 속성만 선택**하여 새로운 타입을 생성합니다.
        
        ✅ **사용 예시**
        
        ```tsx
        interface User {
          id: number;
          name: string;
          age: number;
          email: string;
        }
        
        type UserPreview = Pick<User, "id" | "name">;
        
        const user: UserPreview = { id: 1, name: "Alice" };
        ```
        
        ### ✅ **변환 후 타입**
        
        ```tsx
        type UserPreview = {
          id: number;
          name: string;
        };
        ```
        
        ### 🚀 **언제 사용하나요?**
        
        - API 응답에서 필요한 필드만 가져올 때
        - 특정 속성만 포함하는 DTO 생성
        
    - Omit
        
        ## 🔹  **`Omit<T, K>` - 특정 프로퍼티 제외**
        
        `Omit<T, K>`는 `T` 타입에서 **일부 속성을 제외**하여 새로운 타입을 생성합니다.
        
        ### ✅ **사용 예시**
        
        ```tsx
        type UserWithoutEmail = Omit<User, "email">;
        
        const user: UserWithoutEmail = { id: 1, name: "Matthew", age: 27 };
        ```
        
        ### ✅ **변환 후 타입**
        
        ```tsx
        type UserWithoutEmail = {
          id: number;
          name: string;
          age: number;
        };
        ```
        
        ### 🚀 **언제 사용하나요?**
        
        - 특정 속성을 제외한 새로운 타입을 만들 때
        
    - Record
        
        ## 🔹  **`Record<K, T>` - 객체의 키-값 타입 정의**
        
        `Record<K, T>`는 객체의 **키(`K`)와 값(`T`) 타입을 지정**할 수 있습니다.
        
        ✅ **사용 예시**
        
        ```tsx
        type Role = "admin" | "user" | "guest";
        
        const userRoles: Record<Role, string> = {
          admin: "관리자",
          user: "사용자",
          guest: "손님",
        };
        ```
        
        ✅ **변환 후 타입**
        
        ```tsx
        type UserRoles = {
          admin: string;
          user: string;
          guest: string;
        };
        
        ```
        
        ### 🚀 **언제 사용하나요?**
        
        - 특정 키 집합을 강제하고 싶을 때
        - 객체를 특정 타입의 값으로만 매핑할 때
    - Partial
        
        ## 🔹 **`Partial<T>` - 모든 프로퍼티를 선택적으로 변경**
        
        `Partial<T>`는 `T` 타입의 모든 프로퍼티를 **선택적(optional, `?`)으로 변환**합니다.
        
        ✅ **사용 예시**
        
        ```tsx
        interface User {
          id: number;
          name: string;
          age: number;
        }
        
        const updateUser = (user: Partial<User>) => {
          console.log(user);
        };
        
        updateUser({ name: "Alice" }); // id, age 생략 가능
        ```
        
        ✅ **변환 후 타입**
        
        ```tsx
        type PartialUser = {
          id?: number;
          name?: string;
          age?: number;
        };
        ```
        
        ### 🚀 **언제 사용하나요?**
        
        - POST 요청으로 게시글을 생성할 때 필요한 정보가 title과 content라고 합시다. 생성할 때 만약에 필수로 입력했다고 기획을 했다고 하면, 수정할 떄는 둘 중 하나만 업데이트 시, 일부 속성만 변경할 수 있도록 할 때 (`PATCH` 요청 등)
        - 기본 객체를 만들고 일부만 덮어쓰고 싶을 때
        
    - Required
        
        ## 🔹 **`Required<T>` - 모든 프로퍼티를 필수로 변경**
        
        `Required<T>`는 `T` 타입의 모든 프로퍼티를 **필수(required, `!`)로 변환**합니다.
        
        ✅ **사용 예시**
        
        ```tsx
        interface User {
          id?: number;
          name?: string;
          age?: number;
        }
        
        const createUser = (user: Required<User>) => {
          console.log(user);
        };
        
        // 🚨 모든 필드를 제공해야 함
        createUser({ id: 1, name: "Ohtani", age: 30 }); 
        ```
        
        ✅ **변환 후 타입**
        
        ```tsx
        type RequiredUser = {
          id: number;
          name: string;
          age: number;
        };
        ```
        
        ### 🚀 **언제 사용하나요?**
        
        - 선택적인 속성을 모두 필수로 강제하고 싶을 때
        
    - Readonly
        
        🔹  **`Readonly<T>` - 모든 프로퍼티를 읽기 전용으로 변경**
        
        `Readonly<T>`는 `T` 타입의 모든 프로퍼티를 **읽기 전용(`readonly`)으로 변환**합니다.
        
        ### ✅ **사용 예시**
        
        ```tsx
        interface User {
          id: number;
          name: string;
        }
        
        const user: Readonly<User> = { id: 1, name: "Alice" };
        
        // ❌ 읽기 전용이므로 변경 불가능
        user.name = "Bob"; // Error!
        
        ```
        
    - Exclude
        
        ## 🔹 **`Exclude<T, U>` - 타입에서 특정 타입 제거**
        
        `Exclude<T, U>`는 `T`에서 `U` 타입을 **제외**합니다.
        
        ### ✅ **사용 예시**
        
        ```tsx
        type Status = "success" | "error" | "pending";
        type ExcludedStatus = Exclude<Status, "pending">;
        
        // ✅ "success" | "error"만 가능
        const status: ExcludedStatus = "success";
        ```
        
        ### 🚀 **언제 사용하나요?**
        
        - 특정 값만 허용하고 싶을 때
        
    - Extract
        
        ## 🔹 **`Extract<T, U>` - 특정 타입만 추출**
        
        `Extract<T, U>`는 `T`에서 `U` 타입만 **추출**합니다.
        
        ### ✅ **사용 예시**
        
        ```tsx
        type Status = "success" | "error" | "pending";
        type AllowedStatus = Extract<Status, "success" | "error">;
        
        // ✅ "success" 또는 "error"만 가능
        const status: AllowedStatus = "error";
        ```
        
        ### 🚀 **언제 사용하나요?**
        
        - 타입에서 특정 값만 허용하고 싶을 때
        
    - NonNullable
        
        ### 🔹 **`NonNullable<T>` - `null`과 `undefined` 제거**
        
        `NonNullable<T>`는 `T` 타입에서 **`null` 및 `undefined`를 제거**합니다.
        
        ✅ **사용 예시**
        
        ```tsx
        type UserName = string | null | undefined;
        type ValidUserName = NonNullable<UserName>; // string만 남음
        ```
        
        ### 🚀 **언제 사용하나요?**
        
        - `null` 및 `undefined`를 제거하고 안전한 타입을 보장할 때
    - ReturnType
        
        ## 🔹 **`ReturnType<T>` - 함수 반환 타입 가져오기**
        
        `ReturnType<T>`는 **함수의 반환 타입을 추출**합니다.
        
        ### ✅ **사용 예시**
        
        ```tsx
        function getUser() {
          return { id: 1, name: "Anne" };
        }
        
        type UserReturnType = ReturnType<typeof getUser>;
        
        // ✅ { id: number; name: string; }
        
        ```
        
        ### 🚀 **언제 사용하나요?**
        
        - 함수의 반환 타입을 재사용하고 싶을 때
        
    
    ### 📌 결론
    
    | 유틸리티 타입 | 설명 |
    | --- | --- |
    | `Partial<T>` | 모든 프로퍼티를 선택적으로 만듦 (`?`) |
    | `Required<T>` | 모든 프로퍼티를 필수로 만듦 (`!`) |
    | `Readonly<T>` | 모든 프로퍼티를 읽기 전용으로 만듦 |
    | `Record<K, T>` | 객체의 키와 값 타입을 정의 |
    | `Pick<T, K>` | 특정 프로퍼티만 선택 |
    | `Omit<T, K>` | 특정 프로퍼티 제외 |
    | `Exclude<T, U>` | 특정 타입 제거 |
    | `Extract<T, U>` | 특정 타입만 추출 |
    | `NonNullable<T>` | `null` 및 `undefined` 제거 |
    | `ReturnType<T>` | 함수의 반환 타입 추출 |