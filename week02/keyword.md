### 1. React 동작 원리
#### 1) SPA(Single Page Application)
**정의) 한 개의 HTML 페이지에서 동작하는 웹 애플리케이션을 의미**

특징

1. 초기 로딩 시, HTML 한 번만 받아옴
2. **이후 페이지 이동은 새로고침 없이 javascirpt로 필요한 부분만 바뀜**
3. **빠른 전환**, 자연스러운 사용자 경험 제공
4. react Router 같은 라이브러리로 가짜 URL 경로 관리

#### 2) User Interface Library
**정의) 웹이나 앱의 화면을 구성하는 데 도움을 주는 코드 묶음**

특징

1. **버튼, 모달, 입력창 같은 UI 컴포넌트들을 빠르게 만들 수 있게 도와줌**
2. **재사용 가능한 컴포넌트 제공** → 개발 시간 단축
    
    ex) 버튼 컴포넌트
    
    - UI 라이브러리 없이 만든다면
    
    ``` jsx
    <button style={{ backgroundColor: 'blue', color: 'white', padding: '10px' }}>
      로그인
    </button>
    ```
    
    - UI 라이브러리 또는 컴포넌트를 재사용한다면?
    
    ```jsx
    //UI 라이브러리에서 제공해주는 Button 컴포넌트
    //style 사용하지 않아도 됨
    //html+css와 다른 점
    => 반응형, 테마 설정, 다크모드 -> CSS로 매번 관리해야함
    => 버튼 상태 관리도 직접 다 구현해야 함
    => 접근성 => 시각장애인도 사용할 수 있도록 마크업을 따로 해야함
    => 일관성 유지 -> 여러 명이 만들면 디자인이 제각각
    => 재사용 어려움 -> 비슷한 버튼 여러개라서 css가 중복됨
    <Button variant="contained" color="primary">
      로그인
    </Button>
    
    //재사용 컴포넌트
    <MyButton label="로그인" onClick={handleLogin} />
    ```


#### 3) Functional Component (함수형 컴포넌트)
**정의) 함수로 만들어진 React 컴포넌트**

특징? 
대부분의 React 프로젝트는 **함수형 컴포넌트 + Hooks** 조합을 사용

```jsx
fuction Welcome(){
	return <h1>안녕하세요</h1>;
}

const Welcome = () => <h1>안녕하세요!</h1>;
```

#### 4) Virtual DOM (가상 DOM)
정의) 브라우저의 실제 DOM(Document Obect Model) 을 복사하여 만든 가벼운 javaScript 객체 = 가짜(가상) DOM

필요성

1. Dom 조작 → 느림 ⇒ 많은 요소가 변할 대는 전체를 다시 그리면 비효율
2. React 에서 하는 방식
    1. virtul Dom 에 변경사항을 먼저 반영
    2. 이전 상태와 diff(비교) 한 다음
    3. 실제 Dom 에 변경된 부분만 최소한으로 반영

특징

1. 빠른 렌더링
2. 효율적
3. 구조적

#### 5) 동시성 렌더링
정의) React가 **여러 작업을 쪼개서 동시에 처리**할 수 있도록 해주는 렌더링 방식
→ 작업을 끊고(중단하고), 우선순위가 높은 작업부터 처리할 수 있도록 만든 것

<aside>
👉

무거운 화면 렌더링 중 → 사용자가 입력함
→ React가 렌더링을 일시 중단하고 입력 먼저 처리
→ 다시 렌더링 계속

</aside>

특징

1. 빠른 반응성 → 사용자의 입력을 기다리지 않고 즉시 반응
2. 우선 순위 조정 → 중요한 작업부터 먼저 처리 (예: 애니메이션, 입력)
3. UI 병렬 처리 → 여러 컴포넌트를 동시에 계산 가능

#### 6) React의 렌더링 조건
정의) **컴포넌트를 다시 그리는 것**, 즉 **UI를 다시 계산해서 브라우저에 반영하는 과정**

조건

1. props가 변경될 때
    1. **`props`** : 부모 컴포넌트가 자식에게 주는 값
    2. 해당 porps가 바뀌면서 자식도 렌더링
2. state가 변경될 때
    1. **`state`** : 컴포넌트 내부의 상태
    2. 해당 상태가 바뀌면서 해당 컴포넌트가 다시 렌더링
3. context  값이 변경될 때
    1. **`Context API`** : 여러 컴포넌트에 걸쳐서 데이터를 직접 전달하지 않고도 공유할 수 있게 해주는 React의 내장 기능
        1. **`props`**로 자식에게 계속 넘겨주지 말고 **`context`**를 생성해서 그대로 **`provider`**로 감싸서 값을 전달하는 거임
    2. Context API 를 사용할 대 구독 중인 값이 변경되면 렌더링 됨
4. 부모 컴포넌트가 렌더링될 때
    1. 부모가 다시 렌더링되면, 자식도 자동으로 렌더링되는 경우가 많음
5. 강제로 렌더링할 때
    1. **`forceUpdate()`** : 클래스형 컴포넌트
    2. 상태를 억지로 바꾸는 경우

참고 사항) 렌더링은 되지만 실제 DOM은 안 바뀔 수 있음


### 2. JSX 사용시 유의 사항(기초)
<aside>
💡

여러개를 반환하고 싶은 경우는 어떻게 해야 할까요?
코드와, 이유를 간략하게 작성해주세요.

</aside>

- 답변 🍠
    
    ```jsx
    // 코드 아래 첨부
    function App() {
      return (
    		<div>
         <strong>상명대학교</strong>
    		 <p>여기는 div로 묶었습니다.</p>
    		</div>
      )
    }
    
    export default App
    
    function App() {
      return (
    		<>
         <strong>상명대학교</strong>
    		 <p>여기는 div로 묶었습니다.</p>
    		</>
      )
    }
    
    export default App
    
    function App() {
      return (
    		<React.Fragment>
         <strong>상명대학교</strong>
    		 <p>여기는 div로 묶었습니다.</p>
    		</React.Fragment>
      )
    }
    
    export default App
    ```
    
    <aside>
    💡
    
    이유:  반환되는 요소가 하나의 루트 요소여야 한다. 이때, 루트 요소가 하나가 되기 위해서는 <div> 와 같이 그룹으로 묶을 수 잇는 태그이면 여러 개가 자식 요소로 들어가서 가능해진다.
    
    </aside>



### 3. Lazy initialization (게으른 초기화) 에 대해 설명해주세요
정의) 값을 바로 계산하지 않고, 정말 필요할 때 한 번만 계산해서 사용하는 것

즉, 컴포넌트가 처음 렌더링될 때,

**무거운 계산을 미리 하지 않고**, **딱 한 번만 실행되도록** 지연시키는 것

### 4. App.tsx 파일에 직접 카운터가 1씩 증가, 감소 하는 기능을 만들어주세요.
```jsx
import './App.css'
import { useState } from 'react';

function App() {
  // 초기 상태로 '김용민', 26, '매튜'를 가진 person 객체를 초기값으로 생성합니다.
  const [cont, setCount] = useState(0);

  // city 값을 새로 추가하여 업데이트하는 함수
  const increase = () => {
	  setCount(count + 1); 
	  };

  // age 값을 1씩 증가시키는 함수
  const decrease = () => {
		setCount(count -1);
  };

  return (
    <>
      <h1>{count}</h1>
      <button onClick={increase}>수 증가</button>
      <button onClick={decrease}>수 감소</button>
    </>
  );
}

export default App;
```

### 5. Props drilling 은 무엇이고 애 문제가 될까요?
##### props drilling(프롭 드릴링)

✔️ **props drilling** 없이 여러 컴포넌트에서 **공유된 데이터**를 사용할 수 있도록 합니다.

정의) 부모 → 자식 → 손자 컴포넌트로 데이터를 전달할 때 계속 props를 내려줘야하기 때문에 문제가 됨

**ex) count 상태를 App → ButtonGroup → Button으로 내려야하는 경우**

문제점) 중간 Counter 컴포넌트는 count를 사용하지 않지만 단순히 props만 전달해야하는 단점이 생김

ex2) props drilling의 예제

**`App.tsx`**

```tsx
const [count, setCount] = useState(0);
```

→ 자식 컴포넌트인 이러고 ButtonGroup에게 함수 두 개를 props로 전달

`ButtonGroup.tsx`

```tsx
<Button onClick={handleIncrement} text="+1 증가" />
<Button onClick={handleDecrement} text="-1 감소" />
```

→ props로 받은 함수를 버튼에 연결함

→ 이럴 경우, 공용 컴포넌트를 만들어 관리하는 것이 효율적

why? 동작과 텍스트만 다르고 다 동일하기 때문

⇒ 재사용성과 유지보수에 좋음

**변경**

---

📌 `Button.tsx`

```tsx
interface ButtonProps {
  onClick: () => void;
  text: string;
}

const Button = ({ onClick, text }: ButtonProps) => {
  return <button onClick={onClick}>{text}</button>;
};

export default Button;
```

- 공통된 버튼 구조를 하나 만들고 어떤 동작, 어떤 텍스트인지 props 받음

→ 공용 컴포넌트로 분리해서 재사용성 향상

---

- Props-dfriling 문제점
1. 부모 → 자식 → 또 자식→ … 이렇게 계속 props를 전달해야할 때 발생하는 문제
2. 재사용성 낮아짐
3. 중간 컴포넌트 필요 없는데 props로 다 전달해줘야함

**해결 방안: useContext와 같은 전역 상태 관리를 사용**하면 props없이 전역적으로 상태를 관리할 수 있음