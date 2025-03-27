- React의 동작 원리 🍠
  ### React의 동작 원리
  React는 User Interface Library이다. 리액트의 핵심적인 특징은 아래와 같다.
    <aside>
    💡
    
    각 특징들이 무엇인지, 어떠한 이점이 있는지 정리해주세요
    
    - UMC 웹 파트장 매튜 / 김용민 - 
    
    </aside>
    
    1. SPA (Single Page Application)
    - 정리
        - 하나의 페이지를 사용하는 애플리케이션.
        - 서버로부터 새로운 페이지를 가져오는 것이 아니라, 하나의 페이지에서 내용을 동적으로 변경하는 사용자 웹앱.
        - 장점
            - 클라이언트가 모든 페이지를 가지고 있으므로 앱과 같은 자연스러움.
            - 서버의 부담 경감.
            - 페이지 이동 시, 컴포넌트만 부분적으로 교체하므로 효율성 높음.
            - 모듈화나 컴포넌트 별 개발 용이.
            - 앱과 웹이 동일한 서버 이용 가능.
        - 단점
            - 초기 구동 속도가 비교적 느림.
            - 설계 방식에 따라 화면이 변하는 모습이 사용자에게 노출 가능.
            - 검색엔진 최적화(SEO)가 어려움.
            - 중요한 비즈니스 로직이 존재할 때, 사용자에게 노출될 수 있음.
    1. User Interface Library 
    - 정리
        - UI (User Interface): 사용자가 시스템을 조작하는데 사용하는 장치들
        - Library: 자주 사용되는 기능들을 재사용하기 쉽도록 잘 정리해놓은 묶음.
        - UI Library: 자주 사용되는 UI를 미리 구현해서 쉽게 사용할 수 있도록 잘 정리해놓은 묶음.
    1. Functional Component (함수형 컴포넌트)
    - 정리
        - 자바스크립트 함수 형태로 정의된 컴포넌트.
        - 간결한 문법과 성능 최적화로 인해 현재 가장 많이 사용되는 컴포넌트의 형태
        - 방식
            - 일반 함수
            - 화살표 함수
    1. Virtual DOM (가상 DOM)
    - 정리
        - DOM (Document Object Model): 웹페이지에 대한 인터페이스로 브라우저가 웹페이지의 콘텐츠와 구조를 어떻게 보여줄지에 대한 정보를 담고 있음.
            - 단점: DOM을 직접 수정하는 것은 비용이 많이 듦 → 성능에 큰 영향.
        - Virtual DOM (가상 DOM): DOM을 직접 수정하는 대신 가상 DOM을 사용하여 변경 사항을 메모리 상에서 처리. 가상 DOM을 통해 리액트는 UI 업데이트를 더 효율적으로 처리 가능.
            - 동작 원리: 랜더링, 비교, 업데이트 등
    1. 동시성 렌더링
    - 정리
        - 동시성(Concurrency): 여러 작업을 작은 단위로 나누어 우선순위를 두고 번갈아 처리하는 방식.
        - 동시성 렌더링: 렌더링을 긴급한 업데이트, 전환 업데이트로 나눠 긴급한 업데이트부터 진행함.
    1. React의 렌더링 조건
    - 정리
        - React는 컴포넌트의 상태나 속성이 변경될 때 렌더링을 트리거함.
        - 부모 컴포넌트가 렌더링될 때, 자식 컴포넌트들도 함께 렌더링 될 수 있음.
- React의 일반적인 폴더 구조

  ### React의 일반적인 폴더 구조

  ```tsx
  ohtani-app/ // 앱의 이름
  └── src/
      ├── assets/ // 이미지, 폰트, 스타일 파일(CSS, SCSS) 등 정적 자원을 관리합니다.
      │   ├── images/
      │   │   └── logo.png
      │   └── styles/
      │   │   └── global.css
      │   ├── fonts/
      │        └── custom-font.woff2
      ├── components/  // 재사용 가능한 UI 컴포넌트를 보관합니다.
      │   ├── Button.tsx
      │   └── Modal.tsx
      ├── pages/ // 라우터(3주차 학습 내용)와 연계하여, 페이지 단위로 분리합니다.
      │   ├── Home.tsx
      │   └── About.tsx
      ├── hooks/ // 공통 로직, 상태 관리 로직을 캡슐화하여 재사용성을 높입니다.
      │   └── useAuth.ts
      │   └── useCustomFetch.ts
      ├── utils/ // 여러 곳에 재사용 가능한 유틸리티 함수와 헬퍼 함수 (날짜 포맷팅, 데이터 가공)
      │   └── formatDate.ts
      ├── apis/ // 외부 API 호출 및 통신 로직을 관리 REST API 엔드포인트 호출 함수 등.
      │   └── movie.ts
      ├── types/ // 타입스크립트의 인터페이스, 타입 별칭, 기타 타입 정의를 저장합니다. (API 요청 / 응답에 대한 타입)
      │   └── movie.ts
      ├── enums/ // 열거형(enum)을 정의하여 상수 값을 관리합니다. (사용자 역할, 상태 코드 등)
      │   └── userRoles.ts
      ├── App.tsx
      └── index.tsx

  ```

  여기서 정말 강조 드리고 싶은 부분은, 폴더 구조는 `“정답”` 이 없습니다. 프로젝트의 특성과 규모 / 팀의 선호도 / 유지보수 여부에 따라 자유롭게 설계할 수 있습니다.
  위에서 소개 드린 예시는, 많은 개발자 분들이 참고하는 일반적인 구조이며 프로젝트에 가장 적합한 방식을 팀과 함께 소통하여 선택하는 것이 중요합니다!

### JSX 문법에 대해 배워보자! (단, tsx를 곁들인..) 🍠

- JSX 사용시 유의 사항 (기초)

  ### 1. React에서 JSX를 반환할 때 꼭 하나의 태그만 반환해야한다.

  **`⭕️ 가능한 경우`**

  ```jsx
  function App() {
    return <strong>상명대학교</strong>;
  }

  export default App;
  ```

  **`❌ 불가능한 경우`**

  ```jsx
  import './App.css'

  function App() {
    return (
       <strong>상명대학교</strong>
       <p>매튜/김용민</p>
    )
  }

  export default App

  ```

    <aside>
    💡
    
    여러개를 반환하고 싶은 경우는 어떻게 해야 할까요?
    코드와, 이유를 간략하게 작성해주세요.
    
    </aside>
    
    - 답변 🍠
        
        ```jsx
        import './App.css'
        
        function App() {
          return (
        	  <>
             <strong>상명대학교</strong>
             <p>매튜/김용민</p>
            </>
          )
        }
        
        export default App
        
        ```
        
        <aside>
        💡
        
        이유:  React에서는 꼭 하나의 태그만 반환해야 하므로 반환할 모든 태그를 빈 태그로 묶어 하나의 태그로 취급한다.
        
        </aside>
        
    - 해설
        
        ```jsx
        function App() {
          return (
             <>
              <strong>상명대학교</strong>
              <p>매튜/김용민</p>
             </>
          )
        }
        
        export default App
        ```
        
        많은 분들이 `<> 빈 태그(Fragment)`를 활용할 수 있다는 부분을 모르실 것 같습니다. 스타일링을 하거나, 부모태그가 필요한 경우가 아닌, 다수의 태그를 반환하고 싶은 경우는 `<> 빈 태그를 활용`해도 좋습니다.

- **위의 영상을 보고 Lazy Initialization (게으른 초기화)**에 대해 설명해주세요 🍠
  - 객체나 값을 실제로 필요할 때까지 초기화하지 않고, 처음으로 사용되는 시점에 초기화하는 기법.
  - 불필요한 초기화 작업을 피할 수 있고, 성능을 최적화하는 데 도움이 됨.
  - 특징
    - 초기화 지연
    - 성능 최적화
    - 불필요한 계산 방지
- **`App.tsx`** 파일에 직접 카운터가 1씩 증가, 1씩 감소하는 기능을 만들어주세요 🍠
  - 직접 작성한 코드 `App.tsx` 파일을 올려주세요!
    ```jsx
    import { useState } from "react";

    function App() {
      const [count, setCount] = useState(0);

      const handleIncrement = () => {
        setCount(count + 1);
      };

      const handleDecrement = () => {
        setCount(count - 1);
      };

      return (
        <>
          <h1>{count}</h1>
          <div>
            <button onClick={handleIncrement}>+1 증가</button>
            <button onClick={handleDecrement}>-1 감소</button>
          </div>
        </>
      );
    }

    export default App;
    ```
  - 정답 (스스로 혼자 해보고 꼭 열어서 확인해주세요!)
    ```tsx
    import { useState } from "react";

    function App() {
      const [count, setCount] = useState(0);

      const handleIncrement = () => {
        setCount(count + 1);
      };

      const handleDecrement = () => {
        setCount(count - 1);
      };

      return (
        <>
          <h1>{count}</h1>
          <div>
            <button onClick={handleIncrement}>+1 증가</button>
            <button onClick={handleDecrement}>-1 감소</button>
          </div>
        </>
      );
    }

    export default App;
    ```
- 영상을 보고 실습을 하면서 몰랐던 개념들을 토글을 열어 정리해주세요 🍠
  - useState는 컴포넌트에 state 변수를 추가할 수 있는 React Hook임.
    - set 함수를 호출해도 이미 실행중인 코드의 현재 state는 변경되지 않음.
    - set은 다음 랜더링에서 반환할 useState에만 영향을 줌
