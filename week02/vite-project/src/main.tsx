// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.tsx'

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

// tsx = typescipt + jsx
// react에서는 UI 그릴 때 html처럼 생긴 문법 jsx 을
// javascript 또는 typescirpt 코드 안에 사용할 수 있도록 함

// jsx ? html 처럼 보이지만 return 값이 javasciprt 객체로 변환해주는 코드
// txt 안에 html 구조처럼 보이는 걸 그림(UI)로 쓰는거임

// html과의 차이
// html은 script.ts가 필요했지만, tsx는 onClick, useSTate로 연결
// 컴포넌트 단위로 모듈화(큰 코드를 작게 쪼개서 필요한 기능만 따로따로 만들고 사용하는 것)
// => 재사용성 높아짐
// 상태 새로 고침 필요 없이 화면 갱신
//TodoApp.tsx 랑 App.tsx로 나눌 예정
//Todo.tsx : 실제 To-do 기능을 구현한 주인공 컴포넌트
//App.txt : 여러 컴포넌트를 불러오는 뼈대
import ReactDOM from 'react-dom/client';
import App from './App.tsx'; // ← App.tsx 가져오기
import './index.css';        // ← 전역 스타일 (style.css로 바꿔도 됨)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <App /> {/* ✅ App 컴포넌트를 화면에 출력 */}
  </>,
);
