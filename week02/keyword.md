# 🎯 핵심 키워드

---

<aside>
💡 주요 내용들에 대해 조사해보고, 자신만의 생각을 통해 정리해보세요!
레퍼런스를 참고하여 정의, 속성, 장단점 등을 적어주셔도 됩니다.
조사는 공식 홈페이지 **Best**, 블로그(최신 날짜) **Not Bad

추가로, 위에서 초기 세팅 한 App.tsx 파일을 바탕으로 핵심 키워드를 정리해 볼 예정입니다.
초기 세팅을 먼저하고 진행해주세요!**

</aside>

### React 넌 어떻게 동작하니?

- React의 동작 원리  🍠

  ### React의 동작 원리

  React는 User Interface Library이다. 리액트의 핵심적인 특징은 아래와 같다.

    <aside>
    💡

  각 특징들이 무엇인지, 어떠한 이점이 있는지 정리해주세요

    - UMC 웹 파트장 매튜 / 김용민 -

    </aside>

    1. SPA (Single Page Application)
    - 정리

      반대의 개념을 먼저 이해하고 가면 쉬운데, MPA(Multi Page Application)은 우리가 흔하게 웹이라고 할 때 아는 URL을 치면 새롭게 로딩되는 형태의 웹이다. 다만 이런 방식은 같은 서비스라고 할지라도 다른 페이지에 접속할 때 항상 페이지의 모든 부분을 다시 불러오게 되고, 때문에 리소스를 중복으로 불러올 수도 있다. 이는 낭비이며 사용자 경험에도 자칫하다가는 악영향을 끼치게 될 수도 있다.

      SPA는 URL이 변경되었을 때 페이지의 모든 부분을 다시 로드하는 것이 아니라 필요한 부분만 로드할 수 있도록 한다.

    1. User Interface Library
    - 정리

      자주 사용되는 UI 컴포넌트를 모아서 만든 라이브러리를 지칭한다.

    1. Functional Component (함수형 컴포넌트)
    - 정리

      JSX 요소를 반환하는 함수이다. JSX는 기존에 `document.createElement()` 등으로 HTML을 생성해야 하는 수고로움을 덜어준다.

    1. Virtual DOM (가상 DOM)
    - 정리

      DOM은 웹페이지의 구조를 프로그래밍 가능하도록 객체화 해둔 모델을 지칭한다. 가상 DOM은 React가 DOM을 효율적으로 업데이트 하기 위해서 변경사항 등을 관리하는 보다 가벼운 객체다.

    1. 동시성 렌더링
    - 정리

      React 18 이전에서는 UI가 그리는 데 너무 오래 걸리면 다른 작업을 진행할 수 없었지만 React 18부터는 UI를 그리는 중간에 다른 작업을 진행할 수 있게 되었다. 이는 메인 스레드를 차단하지 않고 React가 백그라운드에서 다음 UI를 준비할 수 있음을 의미한다.

    1. React의 렌더링 조건
    - 정리

      State가 변경되거나 props가 변경될 때 다시 렌더링 된다.

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


---

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
        
        function App() {
          return (
        	  <>
             <strong>상명대학교</strong>
             <p>매튜/김용민</p>
            </>
          )
        }
        ```

        <aside>
        💡

      이유: 여러 개를 하나로 묶으면 기술적으로는 하나로 묶이게 되고 결과적으로는 여러 개가 보이게 된다.

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


    또한 React에서는 HTML에서 사용하신 다양한 태그를 사용할 수 있습니다~!!
    
    ### 2. React에서 스타일링 방법
    
    1. className을 활용한 스타일링
    
    ```tsx
    import './App.css'
    
    function App() {
      return (
         <>
          <strong className='school'>상명대학교</strong>
          <p>매튜/김용민</p>
         </>
      )
    }
    
    export default App
    
    ```
    
    이런식으로, `className`을 지정해주겠습니다. `App.tsx` 코드 상단을 보면 `‘./App.css’`를 import하여 사용하고 있습니다.
    
    `App.css` 파일로 가서 아래와 같이 코드를 입력해주겠습니다.
    
    ```css
    .school {
      background-color: blue;
      color: white;
      font-size: 10rem;
    }
    ```
    
    ![스크린샷 2024-09-09 오후 4.58.48.png](attachment:2d957261-4c70-4d89-bf9c-549fbfc1aca7:%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-09-09_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_4.58.48.png)
    
    1. Inline-Styling을 활용한 스타일링
    
    ```tsx
    import './App.css'
    
    function App() {
      return (
         <>
          <strong className='school'>상명대학교</strong>
          <p style={{color: 'purple', fontWeight:'bold', fontSize:'3rem'}}>매튜/김용민</p>
         </>
      )
    }
    
    export default App
    ```
    
    위와 같이, **`style`** 이후 중괄호를 두번 연 후, 카멜 표기법을 사용하여, css 코드를 작성할 수 있습니다.
    
    중괄호를 두개 쓰는 이유는, 아래와 같습니다.
    
    1. 바깥쪽 중괄호는 자바스크립트 문법임을 나타낸다.
    2. 안쪽 중괄호는 자바스크립트의 객체임을 나타낸다.
    
    **`HTML 방식과 유사하지만 살짝 다르므로, 주의해주세요!!`**
    
    ```tsx
    // HTML 방식 (케밥 표기법)
    <div style="background-color: purple">
    	고구마
    </div>
    
    // JSX 방식 (카멜 표기법)
    <div style={{backgroundColor: 'purple'}}>
    	고구마
    </div>
    ```
    
    ### 3. local variable (로컬 변수) 선언
    
    ```tsx
    import './App.css'
    
    function App() {
      return (
         <>
          <strong className='school'>상명대학교</strong>
          <p style={{color: 'purple', fontWeight:'bold', fontSize:'3rem'}}>매튜/김용민</p>
         </>
      )
    }
    
    export default App
    ```
    
    여기서, 이제 매튜라는 이름을, `nickname` 이라는 변수를 할당 받아서, 사용해보고자 합니다.
    
    ```tsx
    import './App.css'
    
    function App() {
      const nickname = '매튜'
      return (
         <>
          <strong className='school'>상명대학교</strong>
          <p style={{color: 'purple', fontWeight:'bold', fontSize:'3rem'}}>매튜/김용민</p>
         </>
      )
    }
    
    export default App
    
    ```
    
    매튜/김용민 → 이 부분을 **`nickname/김용민`** 이렇게 쓴다면 당연히, 문자열로 인식 할 것 입니다.
    
    `nickname`이라는 변수에 접근해서, `nickname`의 변수가 갖고 있는 매튜라는 닉네임에 접근하고 싶기에 이러한 경우에는 **`중괄호{}`** 를 사용하면 됩니다.
    
    ```tsx
    import './App.css'
    
    function App() {
      const nickname = '매튜'
      return (
         <>
          <strong className='school'>상명대학교</strong>
          <p style={{color: 'purple', fontWeight:'bold', fontSize:'3rem'}}>
    	      {nickname}/김용민
    	     </p>
         </>
      )
    }
    
    export default App
    
    ```
    
    제대로 동작함을 확인할 수 있고, `nickname` 안의 값도 자유롭게 변경하면, 그에 맞춰서 `nickname`이 변경됨을 확인할 수 있습니다.

- TSX 사용시 유의 사항 (심화)

  ### 1. 문자열과 함께 변수 사용하기

  `중괄호{}`와 ```를 활용`하여, 문자열과 함께 변수를 사용할 수 있습니다.

  자주 사용하는 패턴이니 꼭 익숙해지시길 바랍니다!

    ```tsx
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

  ![스크린샷 2024-09-09 오후 5.16.19.png](attachment:da56da7b-3210-4644-b4fd-4872afd15bad:%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-09-09_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_5.16.19.png)

  ### 2. 배열의 요소를 나타내는 방법.

  array안의 요소를 각각 나타내고 싶은 경우는 **`map`**을 활용합니다.

  map에 대해 잘 모르는 분들은, JS 관련 워크북을 다시 한번 보시거나, 구글링 하여 공부 후 진행해주세요.

    ```tsx
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

  map은 yaho를 인자로 받아서, 값을 반환합니다. **`중괄호를 사용한 경우에는 꼭 return을 적어주어야`** 반환하는 값이 제대로 보입니다. 많은 분들이, 이 부분에서 어려움을 많이 겪기에, 혹시라도 본인이 작업한 내용이 잘 보이지 않는다면 중괄호인지, 소괄호인지를 먼저 찾아보세요!

    ```tsx
          <ul>
            {array.map((yaho, idx) => {
              return <li key={idx}>{yaho}</li>
            })}
          </ul>
    ```

  소괄호를 활용한 경우에는 return을 생략할 수 있습니다.

    ```tsx
          <ul>
            {array.map((yaho, idx) => (
               <li key={idx}>{yaho}</li>
            ))}
          </ul>
    ```

  map을 활용하는 경우에는, `key`라는 `props를 설정`해야 함. key값은 각 원소들마다 가지고 있는 **`고유값`**으로 설정을 해야 합니다.

  현재는 map 함수에서, 제공해주는 index를 활용해주었지만, 실제로 인덱스를 활용한 경우, 값이 삭제되는 기타 동작의 경우, 문제가 발생하기 떄문에 보통 서버에서 제공해주는 고유한 id 값을 사용하기는 합니다.

  `yaho`와, `idx`와 같은 경우는 정해진 이름은 없습니다. 본인이 원하는 이름을 사용해서 반환해주어도 좋습니다.

    ```tsx
    // 보통은 복수와 단수를 잘 활용하는게 좋습니다.
    const numbers = [1, 2, 3, 4, 5];
    
    // 단수를 인자로.
    numbers.map((number, index) => return { // 작업들 } ));
    ```

  ![스크린샷 2024-09-09 오후 5.27.56.png](attachment:7a3741ba-5f49-4af9-95a1-0c773825accf:%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-09-09_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_5.27.56.png)

- 첫 컴포넌트 만들어보기

  ### 첫 컴포넌트 만들어보기

  `React`에서는 컴포넌트를 통해 UI를 재사용 가능한 개별적인 여러 조각으로 나누고, 각 조각을 개별적으로 관리할 수 있습니다.

  위에서 순서대로 진행했더라면, 현재 우리의 코드는 아래와 같습니다.

    ```jsx
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
            {array.map((yaho, idx) => (
               <li key={idx}>{yaho}</li>
            ))}
          </ul>
         </>
      )
    }
    
    export default App
    ```

  실제로, `yaho를 반환하는 부분`을 **`List 컴포넌트`**로 만들어 보겠습니다.

    ```jsx
    <li key={idx}>{yaho}</li>
    ```

  **`src 폴더 내부`**에 **`components`** 폴더를 하나 만들어주겠습니다. 그 후 **`List.tsx 파일`**을 만들어보겠습니다.

  ![사진에서는 jsx로 되어있지만 tsx로 진행해주세요!](attachment:d9a6330d-3f0b-43c1-b1b1-d39ad37f85c6:%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-09-09_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_5.35.51.png)

  사진에서는 jsx로 되어있지만 tsx로 진행해주세요!

  우리가 궁극적으로 만들고 싶은 내용은 아래와 같습니다.

  ![스크린샷 2024-09-09 오후 5.37.05.png](attachment:e20d1131-591b-4581-802f-03a75ebb4fa2:%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-09-09_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_5.37.05.png)

  기존에 작업하던, `App.tsx`로 가서

    ```jsx
    import './App.css'
    // 1. List Component를 Import 해줍니다.
    import List from './components/List';
    
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
            {array.map((yaho, idx) => (
              // 2.  <li key={idx}>{yaho}입니다.</li> -> List 컴포넌트를 호출합니다.
              <List />
            ))}
          </ul>
         </>
      )
    }
    
    export default App
    
    ```

  각각의 **`컴포넌트는 props`**를 활용하여 데이터를 전달 받을 수 있습니다.

  저희는, 일단 `map` 방식은 `key를 전달`해주어야 하기 때문에 `List 컴포넌트에 key를 전달`해 줄 것 입니다.

    ```jsx
    <List key={idx} />
    ```

  추가적으로, 각 List에 화면에 보여줄 데이터를 전달해주기 위해 특정 이름으로 데이터를 전달해 줄 것입니다.

  기술 스택을 전달해주므로, **`문맥상 맞게 tech라는 props의 이름`**으로 전달해주겠습니다.

    ```jsx
    <List key={idx} tech={yaho} />
    ```

  이렇게 하고 화면을 실행시켜 봅시다.

  ![스크린샷 2024-09-09 오후 5.41.47.png](attachment:7bd5e857-40f6-401f-b9fa-178e46ce149e:%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-09-09_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_5.41.47.png)

  당연히 현재 List 컴포넌트는 아래와 같기에 아무것도 반환되지 않습니다.

    ```jsx
    const List = () => {
      return (
        <>
          
        </>
      )
    }
    
    export default List
    
    ```

  전달받은 props를 활용해보고자 합니다.

    ```jsx
    const List = (props) => {
       console.log(props)
      return (
        <>
          
        </>
      )
    }
    
    export default List
    
    ```

  앞으로 프론트엔드 개발을 진행하시면서, **`console.log()`**를 통하여, 자주 본인이 하는 것들을 확인하는 습관이 매우 중요합니다. props의 내용이 무엇이 들었는지 **`Chrome → F12`** 개발자도구를 통해 만든 웹사이트에서 확인해보겠습니다.

  ![스크린샷 2024-09-09 오후 5.43.17.png](attachment:99ecfc9e-0a76-462f-8174-a3fd8a0a6a41:%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-09-09_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_5.43.17.png)

  우리가 아까 **`<List key={idx} tech={yaho} />`** 이런 식으로 값을 전달해주었기에 props를 호출 했을 때 tech라는 이름에 요소 하나하나의 값이 들어가 있음을 확인할 수 있습니다.

  여기서 주의하셔야 합니다.

  실제로 우리가 props를 호출 했을 때 { tech: ‘REACT’ } 라는 결과값이 나왔습니다.

  그럼 우리가 해당 값을 활용할 떄는 {tech}를 활용하는 것이 아닌, **`{props.tech}`**를 통해 값에 접근해야 합니다. **`(해당 내용이 이해가 안가면, 자바스크립트 워크북 객체에 대해 공부하셔야 합니다.)`**

    ```jsx
    // props를 호출했을 때 
    const List = (props) => {
       console.log(props)
      return (
        <li>
          {props.tech}
        </li>
      )
    }
    
    export default List
    
    ```

  ![스크린샷 2024-09-09 오후 5.46.22.png](attachment:765780fd-dd7d-483a-a8c4-cba2f856fae9:%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-09-09_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_5.46.22.png)

  여기서 현재는 [props.tech](http://props.tech) 하나밖에 없기에 불편함을 크게 못느끼기겠지만, 전달받은 props가 tech 이외에, name, food 등 여러가지라면 매번 props.tech, props.name, [props.food](http://props.food) 이런식으로 값을 활용하는 것은 매우 귀찮을 것 입니다.

  우리는 이것을 해결하기 위해 **`JS 구조분해 할당에 대해 이전에 학습`**했습니다. 어떤 식으로 활용하면 좋을지 본인이 직접 해보고 아래에 **`List.tsx`** 파일을 넣어주세요.

    - 구조분해 할당 활용 **`List.tsx`**

        ```tsx
        const List = (props) => {
        	const {tech, name, food} = props;
        
        	return (
        		<li>
        			{tech} {name} {food}
        		</li>
        	)
        }
        
        export default List
        ```

    - 해설

      첫번째 방식

        ```jsx
        // 직접 props를 받는 부분에서 구조 분해 할당을 진행하는 방법.
        const List = ({tech, food, yaho}) => {
          return (
            <li>
              {tech}
            </li>
          )
        }
        
        export default List
        
        ```

      두번쨰 방식

        ```jsx
        // props를 전달 받고, 그 이후에 구조 분해 할당을 하는 방법.
        const List = (props) => {
          const { tech, food, yaho } = props;
          return (
            <li>
              {tech}
            </li>
          )
        }
        
        export default List
        
        ```


    이제 각 컴포넌트에 해당하는 스타일링을 진행하면 좋습니다. 스타일링은 크게 많이 하지 않을 것이고, 거슬리는 부분만 제거해보고자 합니다.
    
    일단은 **`<ul>`**일때 자동으로 부여해주는 **`﹒`**이 좀 거슬리므로, 해당하는 것들을 삭제해보겠습니다.
    
    ```jsx
    const List = (props) => {
      const { tech } = props;
      return (
    	  // listStyle을 통해 제거할 수 있습니다.
        <li style={{listStyle: 'none'}}>
          {tech}
        </li>
      )
    }
    
    export default List
    
    ```
    
    이런식으로, 컴포넌트를 분리하여, 스타일링이 가능하다. 구조 분해 할당을 통해 조금 더 깔끔하게 코드를 작성할 수 있다를 알아주시면 됩니다!
    
    위의 순서대로 잘 개발을 진행하셨더라면, 거슬리는 에러가 발생했을텐데요?
    
    ![Screenshot 2025-02-16 at 5.48.19 PM.png](attachment:9b137465-7bf2-400f-8ee8-6c1aca8e93a8:Screenshot_2025-02-16_at_5.48.19_PM.png)
    
    이제 여기서 `JavaScript`와 `TypeScript`의 큰 차이가 발생합니다.
    
    지금 우리가 만든 프로젝트는 `TypeScript`로 진행 중입니다. 따라서 **props를 통해 전달되는 값의 타입을 명확하게 정의하는 것이 중요**합니다.
    
    ### `array`를 `map`으로 순회할 때 발생하는 문제
    
    우리가 `array`라는 변수를 선언하고, 이를 `.map()`을 사용하여 `List` 컴포넌트로 전달하고 있습니다.
    
    ```tsx
    const array = ['REACT', 'NEXT', 'VUE', 'SVELTE', 'ANGULAR', 'REACT-NATIVE'];
    ```
    
    위 배열은 `string[]` 타입을 가지며, 배열의 각 요소는 `string`입니다. 즉, `map()`을 사용하면 배열의 각 요소를 하나씩 순회하면서 `List` 컴포넌트에 전달하게 됩니다.
    
    ```tsx
    <ul>
      {array.map((yaho, idx) => (
        <List key={idx} tech={yaho} />
      ))}
    </ul>
    ```
    
    이때 `yaho`는 `array`의 각 요소를 가리키므로 `string` 타입을 가집니다.
    
    만약 우리가 `TypeScript`가 아닌 `JavaScript`를 사용했다면, `tech` prop의 타입이 자동으로 감지되지 않기 때문에 숫자, 불리언, 혹은 예상치 못한 타입이 넘어가더라도 문제가 발생할 수 있습니다.
    
    예를 들어, `List` 컴포넌트에 다음과 같이 잘못된 값을 전달한다고 가정해봅시다.
    
    ```tsx
    <List key={idx} tech={42} /> // TypeScript에서는 오류 발생!
    ```
    
    이 경우, `JavaScript`에서는 에러 없이 실행되지만, `TypeScript`에서는 `tech` prop의 타입이 `string`이어야 한다는 명시적 선언이 되어 있기 때문에 컴파일 오류가 발생합니다.
    
    보다 협업하는데에 있어 `TypeScript`가 얼마나 효율적이고 중요한지 알 수 있습니다.
    
    이제 우리는 `List` 컴포넌트에서 `tech` prop이 반드시 `string` 타입이어야 한다는 것을 명확하게 정의해야 합니다. TypeScript에서는 보통 **인터페이스(interface)** 를 활용하여 이러한 타입을 지정합니다.
    
    ![Screenshot 2025-02-16 at 5.36.13 PM.png](attachment:6657fe68-84a8-407b-b98a-99f440095c1b:Screenshot_2025-02-16_at_5.36.13_PM.png)
    
    인터페이스를 잘 규격할 경우, 이런식으로 `Type Hinting`또한 받을 수 있습니다.
    
    정말 많은 props를 넘겨줄 경우, 매우 유용하겠죠?
    
    물론 우리는 **`구조분해 할당`** (JS 핸드북 참고)을 통해 아래와 같이 전달해도 좋습니다.
    
    ```tsx
    interface ListProps {
      tech: string;
    }
    
    const List = ({ tech }: ListProps) => {
      return <li>{tech}</li>;
    };
    
    export default List;
    
    ```
    
    이렇게 진행하셨으면 더 이상 에러가 발생하지 않고, 여러분들의 첫 컴포넌트를 성공적으로 제작하게 되었습니다. 축하드립니다 🎉


---

### 나의 첫 번쨰 react-hook (useState) 🍠

<aside>
💡

리액트 함수 컴포넌트에서 가장 중요한 개념은 훅입니다.

함수형 컴포넌트 이전에 클래스 컴포넌트에서 가능했던, `state`, `ref`와 같은 리액트의 핵심 기능들을 함수에서도 간결하게 사용 가능하게 만들었습니다.

우선, 다양한 Hook 중 **`useState`**에 대해서 배워보고자 합니다.

먼저, 아래 토글을 열어 실습해보시고 **`useState`** 영상을 참고해서 한번 정리해주세요!

</aside>

- **`useState` 기초**

  ### useState 기초

  `useState`는 함수형 컴포넌트 안에서 상태를 정의하고, 이 상태를 관리할 수 있게 하는 훅입니다.

  기본적인 사용법은 아래와 같습니다.

    ```tsx
    import { useState } from 'react';
    
    // <> 안에는 초기값에 해당하는 타입을 넣어주시면 됩니다!
    // 초기값 자리에 1을 넣을 경우 <number>
    // useState<number>(1)
    
    // 초기값 자리에 ['오', '타', '니']인 경우 <string[]>
    // const [state, setState] = useState<string[]>(['오', '타', '니']);
    
    const [state, setState] = useState<초기값에 해당하는 타입>(초기값);
    ```

  `useState`의 반환 값은 배열입니다. 배열의 첫 번쨰 원소로 state를 사용할 수 있습니다. 그냥 `state`를 사용하게 된다면, 당연히 `useState`의 괄호안에 정의한 초기값이 나오게 됩니다.

  두번째 `setState`를 활용한다면, `state의 값을 변경`할 수 있습니다. **`상태가 변경되어야 리액트는 리렌더링 한다라는 것을 아시는게 상당히 중요합니다!`**
    
  ---

  ### useState 실습 진행

  글로만 보면 잘 이해가 되지 않을 것 입니다. 간단한 카운터를 만들어보며 실습을 진행해보겠습니다.

  **`App.tsx`**에 아래와 같이 내용을 수정해봅시다.

    ```jsx
    import { useState } from 'react';
    
    function App() {
      const [count, setCount] = useState<number>(0);
      return (
        <>
          <h1>{count}</h1>
        </>
      );
    }
    
    export default App;
    ```

  우리가 **`useState`**의 초기값을 0이라고 했기에, 당연히 현재 웹을 실행시켜보면, 0이 화면에 출력됩니다.

  그럼 해당 숫자를 어떠한 방식으로 증가 시킬까요?

  `react`에서는, `JS`의 `onclick`과 같은, 기능을 제공해줍니다.

    ```jsx
    import './App.css'
    import { useState } from 'react';
    
    function App() {
      const [count, setCount] = useState(0)
      return (
         <>
          <h1>{count}</h1>
          <button onClick={() => {}}>숫자 증가</button>
         </>
      )
    }
    
    export default App
    
    ```

  **`onClick`**을 활용하여, 클릭할 때 추가적인 행동을 정의 할 수 있다. 우리가 값(상태)을 변화하고 싶을 때는 `useState` 배열의 두 번쨰 인자를 사용한다고 했습니다.

    ```jsx
    import './App.css'
    import { useState } from 'react';
    
    function App() {
      const [count, setCount] = useState(0)
      return (
         <>
          <h1>{count}</h1>
          <button onClick={() => setCount(count + 1)}>숫자 증가</button>
         </>
      )
    }
    
    export default App
    
    ```

  ![스크린샷 2024-09-09 오후 6.24.59.png](attachment:5862b26a-8b90-4d41-86de-dc6801be00e9:%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-09-09_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_6.24.59.png)

  이러한 식으로, `setState`를 활용하여 리액트가 `증가된 카운트로 리렌더링`이 되기 떄문에 화면에 count가 증가된 값을 확인할 수 있습니다.

- **`useState`** 심화

  ### useState 심화

  먼저 심화 진행에 앞서서, **`useState`**의 제네릭을 활용해서 타입을 넘겨주지 않아도 되는 경우가 있습니다!

  `TypeScript`는 `useState`의 초기값을 보고 자동으로 타입을 추론합니다.

    ```tsx
    const [count, setCount] = useState(0);
    // TypeScript가 count의 타입을 number로 추론함
    setCount(5);  // ✅ 정상
    setCount("hello");  // ❌ 오류 (number 타입이므로 문자열 할당 불가)
    
    ```

  초기값이 명확한 경우에는 대부분 타입을 명시하지 않아도 `TypeScript`가 정확하게 추론합니다.

  **제네릭을 명시하는 경우**

  제네릭을 직접 명시하면 초기값 없이도 타입을 지정할 수 있고, 더 명확한 타입 제어가 가능합니다.

    ```tsx
    const [value, setValue] = useState<string | null>(null);
    // 초기값이 null이라 자동 추론 불가능 -> 명시적으로 타입 지정
    
    setValue("Hello");  // ✅ 정상
    setValue(123);  // ❌ 오류 (string | null 타입이므로 숫자 할당 불가)
    ```

  초기값이 `null`이거나 `undefined`인 경우 TypeScript가 타입을 정확히 추론하지 못할 수 있으므로, 이런 경우에는 제네릭을 명시하는 것이 좋습니다.

  일단, 이전에 기초에서 만든 코드를 살짝 수정해보겠습니다. **`handleIncreaseNumber`**라는 함수를 만들어, **`onClick`**에 인자로 전달해주고자 합니다.

    ```jsx
    import './App.css'
    import { useState } from 'react';
    
    function App() {
      const [count, setCount] = useState(0)
      const handleIncreaseNumber = () => {
        setCount(count + 1)
      }
      return (
         <>
          <h1>{count}</h1>
          <button onClick={handleIncreaseNumber}>숫자 증가</button>
         </>
      )
    }
    
    export default App
    ```

  동일하게 동작함을 확인 할 수 있을 것 입니다!! 간단한 작업인 경우, 이전과 같이 작성해도 크게 문제 없으나, 뭔가 복잡한 작업이 많은 경우에는 이러한 식으로, 따로 함수를 만들어 관리하면 다른 사람이 **`해당 코드를 읽기에 숫자를 증가하는 기능`**이구나 하고 이해하기 쉬울 것 입니다.

  아래 코드의 동작을 예측해봅시다. 버튼을 누를 때 마다, 몇 씩 증가하게 될 까요?

    ```jsx
    import './App.css'
    import { useState } from 'react';
    
    function App() {
      const [count, setCount] = useState(0)
      const handleIncreaseNumber = () => {
        setCount(count + 1);
        setCount(count + 1);
        setCount(count + 1);
        setCount(count + 1);
        setCount(count + 1);
        setCount(count + 1);
      }
      return (
         <>
          <h1>{count}</h1>
          <button onClick={handleIncreaseNumber}>숫자 증가</button>
         </>
      )
    }
    
    export default App
    
    ```

  **`setCount`**를 6번 호출 했기에, 6씩 증가할 것 같으나, 실제로는 1씩 증가합니다 .이는 자바스크립트의 **`클로저`**와 깊은 연관이 있습니다.

  https://developer.mozilla.org/ko/docs/Web/JavaScript/Closures

  ![스크린샷 2024-09-09 오후 6.35.30.png](attachment:2bb27390-3b77-4ae1-9781-7713b9189b88:%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-09-09_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_6.35.30.png)

  먼저 왜 그런지 설명하기에 앞서서 **`Lexical Environment`**에 대해서 설명하고자 합니다.

  **`Lexical Environment`**란 함수가 실행될 때, 그 함수 안에서 참조할 수 있는 **변수나 상태 값의 저장소**라고 생각하면 됩니다. 이 환경은 함수가 호출될 때마다 새로운 환경이 생성되는 것이 아니라, 함수가 선언될 당시의 변수를 기억하고 있습니다. (즉, count = 0)

  React는 상태를 즉시 업데이트하지 않고, 함수를 실행할 당시의 상태를 기억해 두는 **`렉시컬 환경(Lexical Environment)`**이라는 것을 사용합니다. 그래서, `handleIncreaseNumber` 함수가 실행될 때마다 함수가 실행된 시점의 상태(여기서는 `count = 0`)를 기준으로 값을 계산하게 됩니다.

  쉽게 말해, **`handleIncreaseNumber` 함수 안에서 `count`는 0으로 고정된 것처럼 작동**하는 거죠.

    ```jsx
    setCount(count + 1); -> 0 + 1
    setCount(count + 1); -> 0 + 1
    setCount(count + 1); -> 0 + 1
    setCount(count + 1); -> 0 + 1
    setCount(count + 1); -> 0 + 1
    setCount(count + 1); -> 0 + 1
    
    // 최종 결과: 1
    ```

  우리가 원하는 것은 버튼 클릭 하나에 6씩 증가하는 동작을 원합니다.

  `setState`의 업데이트를 하는 두번째 방식을 활용하면, 지금 문제점을 해결할 수 있습니다!

    ```jsx
    // setState는 두가지 방식으로 활용할 수 있다.
    
    // 1. 한번에 값을 업데이트 (batch 방식)
    setCount(count + 1);
    
    // 2. 이전 상태 값을 인자로 전달하여 업데이트 (prev라는 이름은 자유롭게 변경 가능);
    setCount(prev => prev + 1);
    ```

  아래와 같이 활용하면 됩니다.

    ```jsx
    import './App.css'
    import { useState } from 'react';
    
    function App() {
      const [count, setCount] = useState(0)
      const handleIncreaseNumber = () => {
        setCount(prev => prev + 1);
        setCount(prev => prev + 1);
        setCount(prev => prev + 1);
        setCount(prev => prev + 1);
        setCount(prev => prev + 1);
        setCount(prev => prev + 1);
      }
      return (
         <>
          <h1>{count}</h1>
          <button onClick={handleIncreaseNumber}>숫자 증가</button>
         </>
      )
    }
    
    export default App
    
    ```

  정상적으로 6씩 증가함을 확인하시면 됩니다.

- **`useState`** 객체 상태 업데이트

  ### useState로 객체 상태 변화하기

  **`useState`**는 위에서 실습해본 숫자가 아닌, 객체 또한 변화 시킬 수 있습니다.

  이 때 사용되는 개념이 얕은 복사, 깊은 복사 개념과 이전에 자바스크립트 워크북에서 배운 전개 연산자를 활용하면 매우 유용하게 값을 업데이트 할 수 있습니다.

  객체는 숫자와 다르게 **참조 타입**이기 때문에, 객체 상태를 업데이트할 때 **얕은 복사**와 **깊은 복사** 개념을 잘 이해하는 것이 중요합니다.

  ### 1. 얕은 복사

  얕은 복사는 **한 단계만 복사**하는 방식입니다.

  복사된 객체는 원래 객체와 같은 참조를 가지기 때문에, **내부에 중첩된 객체가 변경되면 원본 객체에도 영향을 미칠 수 있습니다.**

    ```jsx
    const [person, setPerson] = useState({
      name: "김용민",
      age: 26,
      nickname: "매튜"
    });
    
    const newPerson = {...person}; // 얕은 복사
    newPerson.nickname = "야호";
    
    console.log(person.nickname); // 여전히 "매튜" 임을 확인할 수 있다.
    ```

  ### 2. 깊은 복사

  깊은 복사는 객체 내부의 중첩된 모든 값까지 **완전히 새로운 복사본**을 만드는 방식입니다. 이 경우, 복사본을 수정해도 **원본 객체에는 전혀 영향이 없습니다.**

  깊은 복사는 **재귀적으로** 객체의 모든 속성을 복사해야 하므로, 직접 구현하거나 `lodash`와 같은 라이브러리의 `cloneDeep`을 활용하거나, **`JSON 방식을 이용`**해서 **`깊은 복사`**를 진행합니다.

    ```jsx
    const newPersonDeep = JSON.parse(JSON.stringify(person)); // 깊은 복사
    ```

  객체가 단순한 경우 이 방법을 사용할 수 있지만, 함수나 `undefined` 값이 있을 때는 적합하지 않습니다.

  ### 실습. useState를 활용하여 객체를 업데이트하기

    ```jsx
    import { useState } from 'react';
    
    function App() {
      // 초기 상태로 '김용민', 26, '매튜'를 가진 person 객체를 초기값으로 생성합니다.
      const [person, setPerson] = useState({
        name: '김용민',
        age: 26,
        nickname: '매튜',
        // city가 들어갈 자리를 미리 만들어놔야한다.
        // 그래야 person에서 city라는 값이 있다고 타입이 추론이 됩니다.
        city: '',
      });
    
      // city 값을 새로 추가하여 업데이트하는 함수
      const updateCity = () => {
        setPerson((prevPerson) => ({
          ...prevPerson, // 이전 person 객체의 복사본 생성
          city: '서울', // 새로 city 값을 추가하거나 업데이트
        }));
      };
    
      // age 값을 1씩 증가시키는 함수
      const increaseAge = () => {
        setPerson((prevPerson) => ({
          ...prevPerson, // 이전 person 객체의 복사본을 생성합니다.
          age: prevPerson.age + 1, // 다른 key의 value는 유지, age 값을 기존 값에서 1 증가
        }));
      };
    
      return (
        <>
          <h1>이름: {person.name}</h1>
          <h2>나이: {person.age}</h2>
          <h3>닉네임: {person.nickname}</h3>
          {person.city && <h4>도시: {person.city}</h4>}
          <button onClick={updateCity}>도시 추가</button>
          <button onClick={increaseAge}>나이 증가</button>
        </>
      );
    }
    
    export default App;
    
    ```

  ![스크린샷 2024-09-09 오후 7.03.11.png](attachment:510e5b89-e5c0-4da9-baa6-01ad4d4ca7ab:%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-09-09_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_7.03.11.png)

  버튼을 눌렀을 때, 객체의 상태를 안전하게 업데이트 할 수 있습니다. **`전개 연산자를 활용`**하여, **`기존 상태를 복사`**하면서, 일부 속성만 업데이트 할 수 있기에 **`불변성을 유지`**하며 상태를 관리할 수 있습니다.


https://www.youtube.com/watch?v=Rl6H2MyRBUk

- **위의 영상을 보고 Lazy Initialization (게으른 초기화)**에 대해 설명해주세요 🍠

  `useState()`에서 초기값을 매 렌더링마다 연산하는 것을 막기 위해서 함수 레퍼런스를 넘기는 것이다.

- **`App.tsx`** 파일에 직접 카운터가 1씩 증가, 1씩 감소하는 기능을 만들어주세요 🍠
    - 직접 작성한 코드 `App.tsx` 파일을 올려주세요!
    - 정답 (스스로 혼자 해보고 꼭 열어서 확인해주세요!)

        ```tsx
        import { useState } from 'react';
        
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

  보통 Lazy Initialization이라고 하면 “실제로 값이 사용되기 전까지 초기화 과정을 뒤로 미룬다”라는 게 주된 목적이었던 것 같은데 `useState()`에서는 다른 것과 달리 “한 번 초기화 한 후 더 이상 연산을 하지 않는다”는 의미로 사용되는 것이 인상적이었다.


---

### 나의 두 번째 react-hook (useContext) 🍠

<aside>
💡

React의 `useContext`는 전역 상태 관리를 도와주는 훅입니다.
컴포넌트간 `props drilling` 없이 데이터를 공유할 수 있습니다.

</aside>

- **`props drilling`** 문제점 이해하기🍠
    - `props drilling`은 무엇이고 왜 문제가 될까요? (꼭 실습해보세요!) 🍠

      ### props drilling

      ✔️ **props drilling** 없이 여러 컴포넌트에서 **공유된 데이터**를 사용할 수 있도록 합니다.

      # **1️⃣ `props drilling` 문제 이해하기**

      📌 기존 방식으로 **부모 → 자식 → 손자** 컴포넌트로 데이터를 전달하려면, **props를 계속 내려줘야 합니다.**

      📌 **예제**: `count` 상태를 `App → ButtonGroup → Button`으로 내려야 하는 경우

      🔴 **문제점**: 중간 `Counter` 컴포넌트는 `count`를 사용하지 않지만, 단순히 props만 전달해야 함.

      이런 현상을 **`props drilling(프롭 드릴링)`**이라고 합니다.
        
      ---

      ### **✅ `props drilling`을 사용한 예제**

      📌 `App.tsx`

        ```tsx
        import { useState } from 'react';
        import ButtonGroup from './components/ButtonGroup';
        
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
              <ButtonGroup
                handleIncrement={handleIncrement}
                handleDecrement={handleDecrement}
              />
            </>
          );
        }
        
        export default App;
        
        ```

      📌 `ButtonGroup.tsx`

        ```tsx
        interface ButtonGroupProps {
          handleIncrement: () => void;
          handleDecrement: () => void;
        }
        
        const ButtonGroup = ({
          handleIncrement,
          handleDecrement,
        }: ButtonGroupProps) => {
          return (
            <div>
              <button onClick={handleIncrement}>+1 증가</button>
              <button onClick={handleDecrement}>-1 감소</button>
            </div>
          );
        };
        
        export default ButtonGroup;
        
        ```

      이전에는 **props로 단순한 값**을 넘겨주었다면, 이번에는 **`함수를 props로 전달`**하고 있습니다.

      우리가 전달한 함수들은 단순히 `useState`의 두 번째 인자인 `set 함수`를 호출하여 상태를 변경하는 역할을 할 뿐, **아무런 반환값도 없습니다.**

      이처럼 반환값이 없는 함수 타입을 명시하기 위해 **`void`를 반환하는 타입**을 `interface`에서 정의해줍니다. 이를 통해 **더 명확하고 안전한 타입 지정**이 가능합니다.

      현재 코드에서는 두 개의 `button`이 동일한 스타일을 가지며, 차이점은 `onClick`으로 전달되는 함수와 버튼 내부의 텍스트뿐입니다.

      이처럼 버튼의 동작(클릭 이벤트)과 텍스트만 다르고 나머지는 동일한 경우, **`공용 Button 컴포넌트를 만들어`** 관리하는 것이 더 효율적입니다. 이를 통해 코드의 **재사용성을 높이고 유지보수를 용이하게** 할 수 있습니다.

      따라서, `Button` 컴포넌트를 따로 생성하여 사용하면 **코드의 일관성을 유지하고 가독성을 높일 수 있습니다. 아래에 한번 만들어보겠습니다!**
        
      ---

      ### 변경

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

      📌 `ButtonGroup.tsx`

        ```tsx
        import Button from './Button';
        
        interface ButtonGroupProps {
          handleIncrement: () => void;
          handleDecrement: () => void;
        }
        
        const ButtonGroup = ({
          handleIncrement,
          handleDecrement,
        }: ButtonGroupProps) => {
          return (
            <div>
              {/* <button onClick={handleIncrement}>+1 증가</button> */}
              {/* <button onClick={handleDecrement}>-1 감소</button> */}
              
              <Button onClick={handleIncrement} text='+1 증가' />
              <Button onClick={handleDecrement} text='-1 감소' />
            </div>
          );
        };
        
        export default ButtonGroup;
        
        ```

      이제는 어떠한 상황일 떄 `공용 컴포넌트`를 만드는게 효율적인지 알 수 있을 것 같죠?
        
      ---

      ## **⚠️ `props drilling` 문제점**

        1. **컴포넌트가 많아질수록 관리가 어려움**
        2. **중간 컴포넌트가 불필요한 props를 받음 (예: `ButtonGroup`)**
        3. **재사용성이 낮아짐** (컴포넌트가 특정 props에 의존적)

      ✅ **해결 방법**: `useContext`와 같은 전역 상태 관리를 사용하면 **props 없이 전역적으로 상태를 관리**할 수 있음! 🎯
        
      ---

- **`useContext`** 에 대해 알아봅시다.

  ## **🔹 `useContext`란?**

  React의 `useContext`는 **전역 상태를 쉽게 공유**할 수 있도록 도와주는 Hook입니다.

  ✔️ **props drilling** 없이 여러 컴포넌트에서 **공유된 데이터**를 사용할 수 있도록 합니다.
    
  ---

  ### useContext 실습

  `props drilling` 문제점 이해하기🍠 의 예제를 이어서 한번 진행해보겠습니다.

  제대로 따라오셨다면 현재 상태는 아래와 같습니다.

  📌 `App.tsx`

    ```tsx
    import { useState } from 'react';
    import ButtonGroup from './components/ButtonGroup';
    
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
          <ButtonGroup
            handleIncrement={handleIncrement}
            handleDecrement={handleDecrement}
          />
        </>
      );
    }
    
    export default App;
    ```

  📌 `components/ButtonGroup.tsx`

    ```tsx
    import Button from './Button';
    
    interface ButtonGroupProps {
      handleIncrement: () => void;
      handleDecrement: () => void;
    }
    
    const ButtonGroup = ({
      handleIncrement,
      handleDecrement,
    }: ButtonGroupProps) => {
      return (
        <div>
          {/* <button onClick={handleIncrement}>+1 증가</button> */}
          {/* <button onClick={handleDecrement}>-1 감소</button> */}
          <Button onClick={handleIncrement} text='+1 증가' />
          <Button onClick={handleDecrement} text='-1 감소' />
        </div>
      );
    };
    
    export default ButtonGroup;
    ```

  📌 `components/Button.tsx`

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

  현재를 기준으로 `useContext` 실습을 진행해보겠습니다.

  ### 1. Counter Provider 만들어보기!

  먼저, src 폴더 안에 `context 폴더`를 만들어주고, `CounterProvider.tsx` 파일을 만들어주겠습니다.

  지금까지 잘 따라오셨다면, 현재 파일 구조는 아래와 같습니다.

  ![Screenshot 2025-02-16 at 7.55.13 PM.png](attachment:3b226907-fd6d-41e2-9865-1c2b1214362e:Screenshot_2025-02-16_at_7.55.13_PM.png)

    ```tsx
    import { createContext, useContext, useState, ReactNode } from 'react';
    
    // Context의 타입 정의
    interface CounterContextType {
      count: number;
      handleIncrement: () => void;
      handleDecrement: () => void;
    }
    
    // Context 생성 (초기값은 undefined로 설정)
    export const CounterContext = createContext<CounterContextType | undefined>(
      undefined
    );
    
    // Context Provider 생성
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

  먼저, `Context`에 대한 타입을 정의해주면 됩니다.

  우리는, count에 대한 상태와 이를 증가시키고 감소시키는 함수에 대한 타입을 정의해주면 됩니다. 이전에 한 것과 동일합니다!

  그 이후, `Context`를 생성해주면 됩니다.

  이때 **Context의 초기값을 `undefined`로 설정**하는 이유는, `createContext`를 사용할 때 **초기값을 정확하게 지정하지 않으면 TypeScript에서 타입 오류가 발생할 수 있기 때문**입니다.

  따라서, **Context의 초기값을 `undefined`로 설정하고, 이후 Provider에서 값을 채워주는 방식**으로 구현합니다.

  이렇게 하면 Context를 사용할 때 `undefined` 체크를 강제할 수 있어 더 안전한 코드 작성이 가능합니다.

  ### 2. useContext를 통해 contextAPI 활용하기

  자 이제 이렇게 사용할 수 있습니다.

    ```tsx
    import { useContext } from 'react';
    import ButtonGroup from './components/ButtonGroup';
    import { CounterContext } from './context/CounterProvider';
    
    function App() {
      const context = useContext(CounterContext);
    
      return (
        <>
          <h1>{context?.count}</h1>
          <ButtonGroup
            handleIncrement={context?.handleIncrement}
            handleDecrement={context?.handleDecrement}
          />
        </>
      );
    }
    
    export default App;
    ```

  ![Screenshot 2025-02-16 at 8.18.34 PM.png](attachment:f4f18f80-e326-4aeb-8ea1-26185e0b84d9:Screenshot_2025-02-16_at_8.18.34_PM.png)

  근데 이제 이런 에러가 발생하게 됩니다.

  이 에러가 왜 발생한 것 일까요? 우리가, `ButtonGroup`에서 `interface`를 정의할 떄 함수가 전달된다고만 했습니다. 근데 이 경우, `context`를 생성할 때 없을 수도 있다고 우리가 `contextApi`에서 아래와 같이 명시해줬습니다.

    ```tsx
    // Context 생성 (초기값은 undefined로 설정)
    export const CounterContext = createContext<CounterContextType | undefined>(
      undefined
    );
    ```

  그니까, 우리는 `ButtonGroup`에서 무조건 함수가 들어온다고 했지만, 사실은 `undefined` 값도 들어갈 수 있다는 이야기입니다.

    ```tsx
    // ButtonGroup.tsx
    interface ButtonGroupProps {
      handleIncrement?: () => void;
      handleDecrement?: () => void;
    }
    
    // Button.tsx
    interface ButtonProps {
      onClick?: () => void;
      text: string;
    }
    ```

  즉 이렇게 `?:` 를 통해 `undefined` 값도 들어올 수 있다고 `interface`를 고쳐주면, 위의 에러는 해결될 것 입니다.

  사실, 지금 말하고 싶은 에러의 원인은 이게 아닙니다.

  한번 어플리케이션을 실행해보세요! 아무런 값이 나오지 않을 것 입니다.

  `Context API`를 활용하기 위해서는, 전역 상태를 공유하고 싶어하는 위치에  `CounterProvider.tsx` 에서 만든 `CounterProvider`를 씌워주어야합니다.

  즉 우리는 현재 App 컴포넌트 전반에서 활용하고 싶기 떄문에 가장 상위의 부모요소에 이 우산(provider)를 씌워주면 됩니다.

  즉, `main.tsx`에서 우리는 아래와 같이 씌워주면 됩니다.

    ```tsx
    import { StrictMode } from 'react';
    import { createRoot } from 'react-dom/client';
    import './index.css';
    import App from './App.tsx';
    import { CounterProvider } from './context/CounterProvider.tsx';
    
    createRoot(document.getElementById('root')!).render(
      <StrictMode>
        <CounterProvider>
          <App />
        </CounterProvider>
      </StrictMode>
    );
    ```

  ![Screenshot 2025-02-16 at 8.26.38 PM.png](attachment:f660fef6-589b-489b-b15d-f3cd0322ea3c:Screenshot_2025-02-16_at_8.26.38_PM.png)

  이렇게 하면 화면은 잘 보입니다.

  그리고, 실제 증가 감소 버튼을 누르면 잘 동작하는 것을 확인할 수 있습니다.

  ### Context API 잘 활용해보기

  자 일단은, 천천히 전역상태 관리를 왜 사용하는지 이해해보겠습니다.

    ```tsx
    import { useContext } from 'react';
    import ButtonGroup from './components/ButtonGroup';
    import { CounterContext } from './context/CounterProvider';
    
    function App() {
      const context = useContext(CounterContext);
    
    	// console.log 추가
      console.log(context);
    
      return (
        <>
          <h1>{context?.count}</h1>
          <ButtonGroup
            handleIncrement={context?.handleIncrement}
            handleDecrement={context?.handleDecrement}
          />
        </>
      );
    }
    
    export default App;
    ```

  여기서 한번 `console.log`를 통해, 우리가 만들어 준 `context`에는 대체 어떤 친구들이 들어있는지 확인해 보겠습니다.

  ![Screenshot 2025-02-16 at 8.29.18 PM.png](attachment:55c402bc-4b47-43a0-a649-fe1aad36512f:Screenshot_2025-02-16_at_8.29.18_PM.png)

  우리가, `CounterContext`에서 만들어주고 `value` 값으로 전달해준 친구들이 있는 것을 확인할 수 있습니다.

  우산을 씌워줬기에, 우산에 씌워준 친구들은 당연히 활용할 수 있습니다.

  ![Screenshot 2025-02-16 at 8.29.55 PM.png](attachment:c84bb0fc-697d-4b60-a9b7-42e6e8f8eb49:Screenshot_2025-02-16_at_8.29.55_PM.png)

  위의 에러가 왜 발생했는지 이해가 가실 것 입니다.

  `TypeScript`는 매우 친절하게 너가 우산을 씌워주지 않은 곳에서는 context를 사용할 수 없어라고 미리 말해주는 것 입니다.

  그리고 앞으로 우리는 `useContext`를 통해 `CounterContext`를 가져와서, 필요한 값들 `count`나, `handleIncrement`나, `handleDecrement`나 필요한 컴포넌트나 페이지에서 이를 자유롭게 가져와서 사용할 수 있게 됩니다.

    ```tsx
     const context = useContext(CounterContext);
    ```

  즉, 이거를 상당히 많이 사용하게 될 것입니다.

  그래서 우리는 반복되는 코드를 줄이기 위해 `useCount`라는 커스텀 훅을 만들어 줄 것이고, 또한 우산이 씌워지지 않은 곳 즉, `CounterProvider`가 없는 곳에서 이를 활용할 경우 에러를 발생해 줄 것 입니다.

  그러면, 앞으로 우리는 모든 위치에서 `?.` 이런식으로 접근 할 필요가 없어집니다.

  우리가 에러를 던져주기 떄문에, 더이상 그에 대한 케이스를 처리 할 필요가 없어지기 떄문입니다.

  기존에 우리가 만들었던 `CounterProvider.tsx`의 맨 아래에 아래의 코드를 추가해봅시다.

    ```tsx
    // Context를 쉽게 가져오는 커스텀 훅
    export const useCount = () => {
      const context = useContext(CounterContext);
      if (!context) {
        throw new Error(
          'useCount는 반드시 CountProvider 내부에서 사용되어야 합니다.'
        );
      }
      return context;
    };
    ```

  그럼 이제 아래의 코드를 수정할 수 있습니다.

    ```tsx
    import ButtonGroup from './components/ButtonGroup';
    import { useCount } from './context/CounterProvider';
    
    function App() {
      // const context = useContext(CounterContext);
      const context = useCount();
    
      console.log(context);
    
      return (
        <>
          <h1>{context?.count}</h1>
          <ButtonGroup
    	      // ? 를 지워도 더이상 타입스크립트에서 에러가 발생하지 않음.
    	      // 우리가 useCount 훅에서, context가 없는 경우의 에러처리를 했기 떄문.
            handleIncrement={context.handleIncrement}
            handleDecrement={context.handleDecrement}
          />
        </>
      );
    }
    
    export default App;
    
    ```

  ![Screenshot 2025-02-16 at 8.35.27 PM.png](attachment:c0ad956b-6158-47b8-ba95-e3854ee19c39:Screenshot_2025-02-16_at_8.35.27_PM.png)

  더이상 ?가 없어도 에러가 발생하지 않습니다. 우리가 `undefined`인 경우의 케이스를 `throw new Error를 통해 useCount 훅에서 처리해주었기 떄문입니다.`

  조금 더 깔끔하게 적어주기 위해서, 우리는 그냥, `context`를 구조분해 할당을 해주겠습니다.

    ```tsx
    import ButtonGroup from './components/ButtonGroup';
    import { useCount } from './context/CounterProvider';
    
    function App() {
      const { count, handleIncrement, handleDecrement } = useCount();
    
      return (
        <>
          <h1>{count}</h1>
          <ButtonGroup
            handleIncrement={handleIncrement}
            handleDecrement={handleDecrement}
          />
        </>
      );
    }
    
    export default App;
    
    ```

  위의 코드는 아직 전역 상태 관리를 쓴 이유를 살리고 있지 않습니다.

  물론 코드가 좀 더 compact 해졌다는 이점은 살렸지만 (핵심 로직이 `CounterProvider`에 응집되어 있기 때문)

  `props-drilling`에 대한 문제점은 해결하지 못했습니다.

  즉, `App.tsx`에서는 `count`만 가져와서 쓰면 될 것이고

  `ButtonGroup.tsx` 에서는 `handleIncrement`랑, `handleDecrement`를 가져와 `Button.tsx`의 Props로 전달해주면 됩니다!

  한번 마무리 된 코드를 아래에 작성해보겠습니다.

  **📌 App.tsx**

    ```tsx
    import ButtonGroup from './components/ButtonGroup';
    import { useCount } from './context/CounterProvider';
    
    function App() {
      const { count } = useCount();
    
      return (
        <>
          <h1>{count}</h1>
          <ButtonGroup />
        </>
      );
    }
    
    export default App;
    
    ```

  **📌 ButtonGroup.tsx**

    ```tsx
    import { useCount } from '../context/CounterProvider';
    import Button from './Button';
    
    const ButtonGroup = () => {
      const { handleIncrement, handleDecrement } = useCount();
      return (
        <div>
          <Button onClick={handleIncrement} text='+1 증가' />
          <Button onClick={handleDecrement} text='-1 감소' />
        </div>
      );
    };
    
    export default ButtonGroup;
    
    ```

  **📌 Button.tsx**

    ```tsx
    interface ButtonProps {
      onClick?: () => void;
      text: string;
    }
    
    const Button = ({ onClick, text }: ButtonProps) => {
      return <button onClick={onClick}>{text}</button>;
    };
    
    export default Button;
    
    ```

  그리고, 마지막으로 `context를 전달해주지 않은 경우` 어떻게 동작하는지 확인해보겠습니다.

    ```tsx
    export const useCount = () => {
      const context = useContext(CounterContext);
      if (!context) {
        throw new Error(
          'useCount는 반드시 CountProvider 내부에서 사용되어야 합니다.'
        );
      }
      return context;
    };
    ```

  `main.tsx`에서 잠시 CounterProvider를 주석처리 해보겠습니다.

    ```tsx
    import { StrictMode } from 'react';
    import { createRoot } from 'react-dom/client';
    import './index.css';
    import App from './App.tsx';
    import { CounterProvider } from './context/CounterProvider.tsx';
    
    createRoot(document.getElementById('root')!).render(
      <StrictMode>
        {/* <CounterProvider> */}
        <App />
        {/* </CounterProvider> */}
      </StrictMode>
    );
    
    ```

  ![Screenshot 2025-02-16 at 8.43.06 PM.png](attachment:047f6e1f-9dd0-431c-ad90-a074465f9e89:Screenshot_2025-02-16_at_8.43.06_PM.png)

  이제는, 이렇게 우리가 던진 에러메시지가 보입니다. 훨씬 에러 핸들링하기 수월하죠!

  주석 처리한 것을 풀면, 제대로 카운터가 동작하는 것을 확인할 수 있습니다!

  ![Screenshot 2025-02-16 at 8.43.51 PM.png](attachment:ca3f614a-080c-4332-b2a4-0a542e973bca:Screenshot_2025-02-16_at_8.43.51_PM.png)