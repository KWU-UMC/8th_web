# 🔍 React의 동작 원리

React는 **User Interface Library**로, 효율적인 UI 생성을 목표로 한다. 핵심 개념은 아래와 같다.

---

## 1️⃣ SPA (Single Page Application)

- 단일 HTML 페이지로 구성된 앱
- URL은 유지되며, 새 페이지 전체를 로드하지 않고 필요한 데이터만 받아와 **DOM을 동적으로 변경**
- 빠른 화면 전환과 부드러운 사용자 경험 제공

🔗 [관련 참고 링크](https://stackoverflow.com/a/62529948/30031670)

---

## 2️⃣ User Interface Library

- **React는 UI만 담당하는 JavaScript 라이브러리**
- 전체 애플리케이션 구조를 강제하지 않고, 필요한 만큼만 도입 가능
- _라이브러리 vs 프레임워크 차이점_: 자유도 vs 통제

---

## 3️⃣ Functional Component (함수형 컴포넌트)

- JavaScript 함수로 UI 정의

```tsx
const Welcome = ({ name }: { name: string }) => {
  return <h1>Hello, {name}</h1>;
};
```

### 📌 특징 요약

| 특징           | 설명                                   |
| -------------- | -------------------------------------- |
| 함수 기반      | 클래스 없이 UI 작성                    |
| 훅 사용        | `useState`, `useEffect` 등 사용 가능   |
| 간결함         | 짧고 읽기 쉬운 코드                    |
| 상태 관리 가능 | 단순 UI → 상태ful 컴포넌트로 확장 가능 |

---

## 4️⃣ Virtual DOM과 React 렌더링 방식

- Virtual DOM: 실제 DOM의 **가벼운 복사본**
- 변경사항 발생 시:
  1. 새 Virtual DOM 생성
  2. 이전과 비교(Diffing)
  3. 실제 DOM에 최소 변경 적용(Commit)

🧠 React는 **동기적 렌더링 작업을 추상화**해 대부분의 경우 빠른 성능 제공

📺 [React 렌더링 방식 강연](http://youtube.com/watch?v=N7qlk_GQRJU&t=1329s)

---

## 5️⃣ Concurrent Rendering (React 18+)

### 🔴 기존 문제 (React 17 이하)

- 렌더링은 **동기적** → 중단 불가
- 무거운 작업 중 사용자 인터랙션에 **즉시 반응하지 못함**

### ✅ React 18의 해결책

- 렌더링을 **중단, 재시작, 폐기 가능**
- **우선순위 기반 작업 처리** 가능

| 개념                    | 설명                       |
| ----------------------- | -------------------------- |
| Interruptible Rendering | 렌더링 중단 가능           |
| Prioritized Tasks       | 사용자 이벤트 우선 처리    |
| Deferred Rendering      | 덜 급한 작업은 나중에 처리 |

🔗 [Concurrent React](https://velog.io/@jay/Concurrent-React)

---

## 6️⃣ React 컴포넌트의 리렌더링 조건

| 조건                | 예시/설명                           |
| ------------------- | ----------------------------------- |
| `state` 변경        | `setState()` 호출                   |
| `props` 변경        | 부모가 다른 값 전달 시              |
| 부모 리렌더링       | 자식도 리렌더링                     |
| `context` 값 변경   | `useContext()` 사용하는 컴포넌트    |
| 강제 업데이트       | `useReducer` 활용 시 `dispatch()`   |
| `React.memo` 미사용 | 부모 리렌더링 시 자식도 함께 렌더링 |

✅ **최적화 Tip**: `React.memo`, `useMemo`, `useCallback`으로 불필요한 렌더링 방지 가능

# JSX & TSX 핵심 정리 🍠

## ✅ JSX 기초 문법

- **JSX는 하나의 부모 태그만 반환 가능**

  - 여러 요소를 반환할 경우 `Fragment(<>...</>)`로 감싸야 함

- **React 스타일링 방법**

  - `className` 사용 (기존 class 아님)
  - Inline style은 `style={{ color: 'red' }}` 형태로 작성 (CamelCase)

- **JSX에서 변수 사용**
  - `{}` 중괄호 안에 변수 삽입
  - 문자열 + 변수는 `` 템플릿 리터럴 사용 가능

## ✅ 배열 렌더링 (map)

- JSX에서 `array.map()`으로 요소 반복 가능
- 꼭 `key` prop 설정해야 함 → 성능 최적화 및 경고 방지
- 구조분해 할당을 통해 props 접근 간결화 가능

```tsx
const List = ({ tech }: { tech: string }) => <li>{tech}</li>;
```

---

## ✅ useState 기초

- `useState`는 컴포넌트 내 상태를 선언하는 React Hook
- `[state, setState] = useState(초기값)` 형태 사용
- 값 변경 시 setState로 업데이트 → 컴포넌트 리렌더링 유도

```tsx
const [count, setCount] = useState<number>(0);
```

## ✅ 상태 함수 업데이트 방식 2가지

1. `setState(count + 1)` → 이전 상태 기억 못 함 (클로저 문제 발생 가능)
2. `setState(prev => prev + 1)` → 이전 값 기준 업데이트 (권장)

---

## ✅ 객체 상태 업데이트 (useState)

- 객체는 얕은 복사로 인해 직접 수정하면 원본도 영향받음
- 전개 연산자(`...`)로 기존 상태를 복사한 후 변경

```tsx
setPerson((prev) => ({ ...prev, city: "서울" }));
```

- 깊은 복사가 필요한 경우 `lodash.cloneDeep()` 또는 `JSON.parse(JSON.stringify(obj))` 사용

---

## 🔍 구조 분해 할당 + Props 활용

```tsx
interface ListProps {
  tech: string;
}
const List = ({ tech }: ListProps) => <li>{tech}</li>;
```

- 구조 분해 할당으로 props 값 쉽게 접근
- 타입스크립트에서는 props 타입 명시 필수

# useContext 핵심 정리 🍠

## 1. props drilling이란?

- 상태나 함수를 하위 컴포넌트로 전달할 때, **중간 컴포넌트들이 필요하지 않은 props까지 받아서 전달**만 해야 하는 현상
- 컴포넌트 계층이 깊어질수록 관리 복잡도 증가
- `ButtonGroup`처럼 **자체적으로 쓰진 않지만 하위에 전달해야 하는 상황**이 대표적 예

## 2. useContext의 필요성

- 전역 상태를 **Context API로 한 곳에서 관리**하면 중간 컴포넌트가 props를 받을 필요 없어짐
- `createContext`, `Provider`, `useContext`로 구성

## 3. 핵심 흐름

```tsx
// context 생성
export const CounterContext = createContext<CounterContextType | undefined>(
  undefined
);

// provider 생성
export const CounterProvider = ({ children }: { children: ReactNode }) => {
  const [count, setCount] = useState(0);
  const handleIncrement = () => setCount((prev) => prev + 1);
  const handleDecrement = () => setCount((prev) => prev - 1);

  return (
    <CounterContext.Provider
      value={{ count, handleIncrement, handleDecrement }}
    >
      {children}
    </CounterContext.Provider>
  );
};
```

## 4. 커스텀 훅 사용 (useCount)

- context가 없을 경우 **에러를 던져주는 안전장치**
- `useContext()` 반복 방지 → **코드 간결성**

```tsx
export const useCount = () => {
  const context = useContext(CounterContext);
  if (!context) {
    throw new Error(
      "useCount는 반드시 CountProvider 내부에서 사용되어야 합니다."
    );
  }
  return context;
};
```

## 5. 실제 사용 구조 (리팩토링 후)

| 컴포넌트          | 역할                   | 사용하는 값                     |
| ----------------- | ---------------------- | ------------------------------- |
| `main.tsx`        | Provider로 전체 감싸기 | `CounterProvider`               |
| `App.tsx`         | count만 가져와 출력    | `useCount().count`              |
| `ButtonGroup.tsx` | 이벤트 핸들러 가져오기 | `useCount().handleIncrement` 등 |
| `Button.tsx`      | UI만 처리              | props로 받은 text, onClick      |

## 6. 달성 효과

- ✅ props drilling 제거
- ✅ 관심사 분리 (state 관리 vs UI 렌더링)
- ✅ 재사용성 증가, 코드 가독성 향상
- ✅ 안전한 context 사용 보장
