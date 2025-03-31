## React의 동작 원리

1. SPA (Single Page Application)

- **초기 로딩 시 단 하나의 HTML 파일만 서버에서 받아오고**,
  이후 사용자의 페이지 이동이나 동작은
  **클라이언트 측에서** 처리하는 방식의 웹 애플리케이션

2. User Interface Library

- 사용자 인터페이스(UI)를 만들 때 **필요한 구성 요소나 기능들을 모아놓은 코드 집합**
  → 빠른 개발 가능

3. Functional Component (함수형 컴포넌트)

- JavaScript의 **함수**를 사용해서 만드는 **React 컴포넌트**

4. Virtual DOM (가상 DOM)

- 실제 DOM(Document Object Model)의 가벼운 복사본(가상 트리 구조)
  React는 UI 변경 시 실제 DOM을 직접 조작하지 않고,
  **Virtual DOM을 먼저 업데이트한 후**, 실제 DOM과 비교해서 필요한 부분만
  **효율적으로 갱신**

5. 동시성 렌더링

- React가 **작업을 쪼개서 나눠서 처리**할 수 있게 해주는 렌더링 방식
  중요한 작업은 먼저 처리하고, 시간이 오래 걸리는 작업은 나중에 처리

6. React의 렌더링 조건

- 상태가 변경될 때
  props가 변경될 때
  context 값이 변경될 때

## React 유의사항

### 중괄호{}와 ``를 활용하여, 문자열과 함께 변수를 사용할 수 있음

```
import './App.css'

function App() {
  const nickname = '매튜'
  const sweetPotato = '고구마'
  return (
     <>
      <strong className='school'>상명대학교</strong>
      <p style={{color: 'purple', fontWeight:'bold', fontSize:'3rem'}}>{nickname}/김용민</p>
      <h1>{`${nickname}는 ${sweetPotato} 아이스크림을 좋아합니다.`}</h1>
     </>
  )
}

export default App
```

### 배열의 요소를 나타내는 방법

array안의 요소를 각각 나타내고 싶은 경우는 map을 활용

```
import './App.css'

function App() {
  const nickname = '매튜'
  const sweetPotato = '고구마'
  const array = ['REACT', 'NEXT', 'VUE', 'SVELTE', 'ANGULAR', 'REACT-NATIVE']
  return (
     <>
      <strong className='school'>상명대학교</strong>
      <p style={{color: 'purple', fontWeight:'bold', fontSize:'3rem'}}>{nickname}/김용민</p>
      <h1>{`${nickname}는 ${sweetPotato} 아이스크림을 좋아합니다.`}</h1>
      <ul>
        {array.map((yaho, idx) => {
          return <li key={idx}>{yaho}</li>
        })}
      </ul>
     </>
  )
}

export default App
```

중괄호를 사용한 경우에는 꼭 return을 적어주어야 반환하는 값이 제대로 보임
