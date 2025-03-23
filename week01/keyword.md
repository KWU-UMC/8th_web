- **null과 undefined의 차이 점에 대해 직접 작성해주세요!** 🍠

  - null : JavaScript의 원시 값 중 하나로, 어떤 값이 의도적으로 비어있음을 표현. boolean 연산에서는 False로 취급
  - undefined : 정의되지 않음. 데이터 그 자체가 존재하지 않음. 동일하게 boolean 연산에서 False로 취급
    - 값을 할당하지 않은 변수
    - 함수가 값을 return 하지 않았을 때

- 함수 선언식의 특징에 대해 정리해주세요! 🍠
  - 정의 : function 키워드를 사용하여 함수 이름과 함께 함수를 선언하는 방식. 가장 기본적인 함수 정의 방식. 함수 이름 제공 필요.
  - 장점
    - 호이스팅으로 인한 유연성 : 변서 선언과 달리 전체 함수 본문이 코드 상단으로 끌어 올려짐.
    - 디버깅 용이
    - 코드 가독성
    - 전역/지역 스코프 처리 용이
    - 모듈화와 재사용
  - 단점
    - 전역 스코프에서 사용될 경우, 같은 이름을 가진 함수나 변수와 충돌 가능. 따라서, 지역 스코프나 모듈화된 구조에서 사용하는 것이 좋음
    - 중복 함수 정의 시 유의. 덮어쓰기 될 수 있음
  +) 함수 표현식과의 차이
  - 호이스팅 차이 (함수 표현식은 변수가 호이스팅 될 뿐, 함수 본문은 런타임에 해당. 따라서, 참조 오류 발생)
  - 가독성 및 유지 보수성 (함수 선언식은 코드 흐름을 직관적 이해 가능. 따라서, 가독성 증가)
- 화살표 함수의 특징에 대해 정리해주세요! 🍠

  - 정의 : 사용하던 기존의 함수 선언식이나 함수 표현식보다 좀 더 간결하며, 사용하기 쉬운 화살표를 사용한 함수 정의 방법
  - 제한점
    - this, arguments, super에 대한 자체 바인딩이 없고, 메서드로 사용 불가능
    - [new.target](http://new.target) 키워드 존재 X
    - call(), apply(), bind() 메서드 이용 불가
    - 생성자 함수로 사용 불가
    - yield를 화살표 함수 내부에서 사용 불가

- 타입 스크립트에만 존재하는 타입 🍠
  - any 🍠
    - 모든 타입을 허용할 수 있는 타입.
    - 일부 코드를 JavaScript처럼 동적으로 동작하도록 선언하고 싶거나 타입 시스템의 제한을 벗어나고 싶을 때 사용.
    - 명시된 타입 사용 시보다 생산성과 안정성이 떨어지는 대신, JavaScript와 더 유사하게 작성 가능.
    - never를 제외한 모든 타입이든 다른 타입에 할당 가능한 ‘타입 와일드카드’와도 같음.
    ```tsx
    //배열
    function getlength(arr: any[]) {
      return array.length;
    }

    //객체
    function hasTwelevelLetterKey(o: { [key: string]: any }) {
      for (const key in o) {
        if (key.length == 12) {
          console.log(key, o[key]);
          return true;
        }
      }
      return false;
    }

    //함수
    type Fn0 = () => any;
    ```
  - unknown 🍠
    - any 타입처럼 작동함.
    - any 타입은 모호한 반면, unknown은 세부 사항이 필요하므로 더 안전함.
    - any외에는 할당할 수 없음
    ```tsx
    int value: unknown;

    value = true;  //가능
    value = 'test';  //가능
    ```
    ```tsx
    let value: unknown;

    let value1: boolean = value; // 에러
    let value2: string = value; // 에러
    ```
    - typeof, instanceof 연산자 등을 이용해 구체적인 type으로 좁히기 가능.
    - as를 통해 타입 전환도 가능.
  - void 🍠
    - 어떠한 값을 가지지 않는 것을 의미.
    - return하지 않는 함수의 return 값으로 설정 가능. 명시적으로 반환 값을 설정하지 않은 함수는 undefined를 반환하기 때문에 TypeScript에서는 void를 명시.
    ```tsx
    // 예시 1
    function a(): void {}

    // 예시 2
    // void를 매서드로 선언
    interface Human {
      talk: () => void;
    }

    // 예시 3
    // void를 매개변수로 선언
    function a(callback: () => void): void {}
    ```
  - never 🍠
    - never은 집합 내에 어떤 값도 없음을 뜻함.
    - 어떤 값도 가질 수 없는 빈 타입
      - 제네틱 및 함수에서 허용되지 않는 파라미터
      - 호환 되지 않는 타입 교차
      - 빈 유니언 타입
    - 사용 방법
      - 함수에 올 수 있는 파라미터에 제한을 거는 용도
      - 조건문에 철저한 일치를 보장하기 위한 용도
      - 부분적으로 구조적 타이핑을 허용하지 않기 위한 용도
      - 무한 루프나 node 강제 종료 방
    ```tsx
    // throwError 함수가 never 타입을 반환하도록 함
    function throwError(message: string): never {
      throw new Error(message);
    }

    throwError("something went wrong");
    ```
