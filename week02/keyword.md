- React의 동작 원리  🍠
    
    ### React의 동작 원리
    
    React는 User Interface Library이다. 리액트의 핵심적인 특징은 아래와 같다.
    
    
    1. SPA (Single Page Application)
    - 정리
        
        SPA 사용 이전의 문제점
        
        예전에는 웹 페이지에서 페이지를 보여줄 때 여러페이지로 구성이 되어있었다. 그리고 페이지를 로딩할때마다 서버에서 리소스를 전달 받아 렌더링 했었는데 이는 규모가 커짐에따라 데이터 정보 전송 과부하로 인한 속도 저하등의 문제점이 생기게 되었다. 
        
        SPA
        
        이에 고안된 것이 SPA 이며 SPA의 경우 서버에서 제공하는 페이지가 한개이다.  페이지가 1개라고 해서 화면이 한 종류인 것이 아닌 사용자가 원하는 페이지와 현재 사용자 브라우저의 주소상태에 따라 다양한 화면을 보여줄 수 있다. (다른 주소에 다른 화면을 보여주는 것을 라우팅이라고 한다.)
        
    1. User Interface Library 
    - 정리
        
        React에서는 다양한 UI 라이브러리를 사용할 수 있는데 각 라이브러리는 고유한 특징과 장단점을 가지고 있습니다.
        
        1. React Bootstrap
            
            반응형 디자인,커스터마이즈,접근성에 중점
            
        2. Material UI
            
            Google의 Material Design을 기반으로 한 UI 라이브러리. 다양한 컴포넌트와 강력한 테마 커스터마이즈 기능 제공.
            
        3. **Chakra UI**
            
            간결하고 접근성이 뛰어난 UI 라이브러리. 다크 모드 지원과 테마 커스터마이즈가 용이함.
            
        4. **Ant Design**
            
            엔터프라이즈급 UI를 위한 디자인 시스템. 국제화 지원과 다양한 컴포넌트 제공
            
        
        그 외로 Mantine Next UI React Suite Tailwind UI 등 다양한 라이브러리가 있음
        
    1. Functional Component (함수형 컴포넌트)
    - 정리
        
        함수형 컴포넌트는 JSX를 반환하며 React 16.8 이후부터 Hook을 통해 상태 관리 및 다양한 기능에 사용 될 수 있습니다. 함수형 컴포넌트는 클래스형 컴포넌트보다 코드가 간결하며 메모리 효율성이 좋습니다.
        
    1. Virtual DOM (가상 DOM)
    - 정리
        
        가상 DOM을 사용하지 않을 때 문제점
        
        바닐라 자바스크립트에서는 getElement document와 같은 함수들로 각각의 DOM노드에 접근하여 수정하였는데 각각의 DOM노드에 접근하여 일일이 수정하는 방식은 많은 비용을 요구하게 된다. 어떤 요소에 변화가 생기면 해당 요소를 수정 후 하위요소들을 일일이 변경하는데 이와 같이 작은 변화에도 요소들을 모두 변경하고 DOM을 새로고침하는 것은 비효율적이다.
        
        가상 DOM 
        
        가상 DOM은 실제 DOM의 복사본으로 봐도 되는데 가상 DOM은 JS 형태로 메모리에 존재하는데 DOM 트리의 어떤 요소에 수정이 일어나면 실제 DOM이 아닌 가상 DOM을 수정하여서 이전의 state와 수정후의 state 중 수정이 일어난 부분만 변경을 반영하면 되기 때문에 빠른 렌더링이 가능하게 된다.
        
    1. 동시성 렌더링
    - 정리
        
        React의 동시성 렌더링은 애플리케이션의 반응성을 크게 향상시키는 기능으로 React가 여러 작업을 동시에 처리할 수 있도록 하여 사용자 인터페이스가 블록되지 않고 계속 반응할 수 있게 할 수 있다. 
        
        특징
        
        1. 중단 가능한 렌더링
            
             React 렌더링 중 더 중요한 작업이 발생하면 렌더링을 중단하고 우선순위가 더 높은 작업을 처리 할 수 있다.
            
        2. 다중 작업 처리
            
            여러 작업을 동시에 처리할 수 있어, 사용자 입력이나 네트워크 요청과 같은 작업이 블록되지 않는다.
            
        
        동시성 렌더링을 사용하는 방법은 React 18로 업그레이드 한 후에 **`ReactDOM.createRoot`**를 사용하여 루트 노드를 생성하고 렌더링하고 데이터를 가져올때 Suspense를 사용하면 부드로운 로딩상태를 제공받을 수 있다.
        
    1. React의 렌더링 조건
    - 정리
        
        React 렌더링 조건은 크게 상태 업데이트와 부모 컴포넌트의 렌더링에 의해 결정된다.
        
        1.상태 업데이트 
        
        React 컴포넌트는 상태가 변경될 때 해당 컴포넌트를 재렌더링 하는데 상태는 usestate Hook을 통해 관리되며 상태가 변경되면 자동으로 컴포넌트를 재렌더링 한다.
        
        2.부모 컴포넌트의 렌더링
        
        부모 컴포넌트가 렌더링 될 때 자식 컴포넌트도 재귀적으로 렌더링하게 된다. 
        
        그 외에 if문 삼항 연산자 &&연산자등을 이용해 조건부 렌더링도 할 수 있다.

    
     Lazy Initialization (게으른 초기화)**에 대해 설명해주세요 🍠
    
    useState()훅에서 초기상태를 설정할때 함수 자체를 호출 시키게 되면 상태 변화가 일어날때 마다 렌더링이 진행되어서 heavyComputation 같은 경우는 프로그램 속도 저하를 일으킬 수 있다. 이에 초기상태를 설정할 때 연산을 함수로 감싸서 실행 시키거나 참조값을 넘길 경우에는 첫 렌더링 이후에는 다시 렌더링 되지 않고 그 이후 값만 렌더링 하면 되기에 속도 저하가 일어나지 않는다.

App.tsx 파일에 직접 카운터가 1씩 증가, 1씩 감소하는 기능을 만들어주세요 🍠

import { useState } from 'react';

function App() {
  const [count, setCount] = useState<number>(0);
  const handleIncreaseNumber=()=>{
    setCount((prev):number=>prev+1);
  }
  const handleDecreaseNumber=()=>{
    setCount((prev):number=>prev-1);
  }
  return (
    <>
      <h1>{count}</h1>
      <button onClick={()=>{handleIncreaseNumber()}}>숫자 증가</button>
      <button onClick={()=>{handleDecreaseNumber()}}>숫자 감소</button>
    </>
  );
}

export default App;

- 영상을 보고 실습을 하면서 몰랐던 개념들을 토글을 열어 정리해주세요 🍠
    
    {handleIncreaseNumber}와 {()=>{handleDecreaseNumber()}}간 개념이 헷갈림. 실습 처음에 {()=>{handleDecreaseNumber}} 코드로 진행 하였는데 상태 업데이트가 되지않아서 찾아보니 첫번째 방식은 직접 함수 참조 방식이고 두번째 방식은 익명함수인데 보통은 익명함수는 인자를 받을 때 사용하며 주의점은 함수를 호출할때 ()를 생략하면 함수가 호출되지 않기 때문에 ()를 꼭 사용해야한다고 함.

    - **`props-drilling`**이 어떤 부분에서 발생했나요?
    
    todos를 전달하기 위해서 todo.tsx부터 todoForm.tsx todoList.tsx 까지 전달하는 과정에서 props-drilling 이 발생했고 프로젝트 규모가 더 커지게 된다면 props를 전달하는 과정이 더 복잡해질 수 있다.
    
- ✅ 어떻게 이를 해결했나요?
    
    useContext를 활용하여 props를 컴포넌트 하나하나 내리기 보다는 Context.Provider로 감싼 부분 전부에서 함수를 바로 전달 할 수 있게 만들어 해결 하였다.