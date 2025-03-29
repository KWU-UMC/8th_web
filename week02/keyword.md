### React의 동작 원리

React는 User Interface Library이다. 리액트의 핵심적인 특징은 아래와 같다.

1. SPA (Single Page Application)
- 정리
    
    `SPA`는 페이지 전체가 아닌 필요한 부분만 로딩한다. 즉, 필요한 데이터만 받아와서 부분을 업데이트하는 방식으로 동작한다.
    
    `장점`
    
    더 적은 자원 사용, 빠른 속도, 효율적인 캐싱, 향상된 유저 경험
    
2. User Interface Library 
- 정리
    
    `User Interface Library`는 UI를 만들기 위한 기능 라이브러리다. MUI, React Bootstrap, Ant Design 등이 있다.
    
    `장점`
    
    반응형 디자인 지원, 컴포넌트를 기반으로 하여 코드의 유지보수 용이, 커스터마이징 가능 
    
3. Functional Component (함수형 컴포넌트)
- 정리
    
    `함수형 컴포넌트`는 hook을 사용하여 라이프사이클 기능과 state 기능을 구현할 수 있다.
    
    `장점`
    
    메모리 관리, 빠른 속도, 가독성 용이
    
4. Virtual DOM (가상 DOM)
- 정리
    
    `가상 돔`은 실제 돔에 접근하여 조작하는 대신, 이것을 추상화시킨 자바스크립트 객체를 사용한다. 즉, 실제 돔을 모방한 가상의 돔을 구성해 원래 돔과 비교하여 달라진 부분을 리렌더링 하는 방식으로 동작한다. 변화를 감지하면 재조정 과정을 통하여 실제 돔과 동기화한다. 
    
    `장점`
    
    렌더링 일관성 유지, 복잡한 UI 관리 가능, 성능 향상
    
5. 동시성 렌더링
- 정리
    
    `동시성 렌더링`은 UI를 더욱 반응적으로 만들기 위한 렌더링 모델이다.
    
    `장점`
    
    대규모 애플리케이션 지원 가능, 반응성 향상
    
6. React의 렌더링 조건
- 정리
    - state 변경될 때
        - useState, useReducer 등의 상태 변경 시
    -  props 변경될 때
        - 전달 받은 props 값 업데이트 시
    -  부모 component가 렌더링될 때

### JSX 문법에 대해 배워보자! (단, tsx를 곁들인..) 🍠

- JSX 사용시 유의 사항 (기초)
    
    ### 1. React에서 JSX를 반환할 때 꼭 하나의 태그만 반환해야한다.
    
    **`⭕️ 가능한 경우`**
    
    ```jsx
    function App() {
      return (
         <strong>상명대학교</strong>
      )
    }
    
    export default App
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
        // 코드 아래 첨부
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
        
        이유: return() 내부를 묶을 때 <div> 대신 <></>를 사용할 수 있다.
        
        </aside>

### 나의 첫 번째 react-hook (useState) 🍠
- **위의 영상을 보고 Lazy Initialization (게으른 초기화)**에 대해 설명해주세요 🍠
    
    **초기 상태를 함수로 감싸서 전달하는 방식(useState에 직접적인 값 대신 함수를 넘기는 방식)**
    
    컴포넌트가 처음 렌더링될 때(state가 처음 만들어 질 때) 한 번만 초기화 로직을 실행하고 이후의 리렌더링에서는 무시된다.


- **`App.tsx`** 파일에 직접 카운터가 1씩 증가, 1씩 감소하는 기능을 만들어주세요 🍠
    - 직접 작성한 코드 `App.tsx` 파일을 올려주세요!
        
        ```tsx
        import "./App.css";
        import { useState } from "react";
        
        function App() {
          const [count, setCount] = useState<number>(0);
        
          const handleIncrement = () => {
            setCount((prev) => prev + 1);
          };
        
          const handleDecrement = () => {
            setCount((prev) => prev - 1);
          };
        
          return (
            <>
            <h1>{count}</h1>
            <div className="btnGroup">
              <button onClick={handleIncrement}>+1 증가</button>
              <button onClick={handleDecrement}>-1 감소</button>
            </div>
            </>  
          );
        }
        
        export default App;
        ```
     