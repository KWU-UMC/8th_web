# 🎯 핵심 키워드

---

<aside>
💡 주요 내용들에 대해 조사해보고, 자신만의 생각을 통해 정리해보세요!
레퍼런스를 참고하여 정의, 속성, 장단점 등을 적어주셔도 됩니다.
조사는 공식 홈페이지 **Best**, 블로그(최신 날짜) **Not Bad**

</aside>

### 키워드 정리 🍠

- **Tailwind CSS에 대한 학습 📖**

  ### **Tailwind CSS**

  `Tailwind CSS`는 최신 버전의 유틸리티 기반 CSS 프레임워크로, 빠른 UI 개발과 높은 커스터마이징성을 제공합니다. 아래에 `Tailwind CSS v4`의 주요 키워드와 사용 방법을 정리해보았습니다.

  ### **Tailwind CSS** 특징

    - **Utility-First**

      클래스 단위의 유틸리티를 사용해 스타일을 적용함으로써, 재사용성과 생산성을 높입니다.

    - **Just-In-Time (JIT) 컴파일러**

      사용한 클래스만을 빌드에 포함시켜 CSS 번들 크기를 최소화하며, 빠른 개발 사이클을 지원합니다.

    - **모바일 우선 (Mobile-First)**

      기본적으로 모바일에 최적화된 스타일을 적용하고, 반응형 디자인을 쉽게 구현할 수 있도록 도와줍니다.

    - **구성 파일 (Configuration File)**

      `tailwind.config.js` 파일을 통해 테마, 색상, 폰트, 브레이크포인트 등 다양한 설정을 커스터마이징할 수 있습니다.

    - **Purge (콘텐츠 스캔)**

      실제로 사용되는 CSS 클래스만 추출하여 최종 빌드 파일의 용량을 줄입니다. (v3부터 `content` 필드로 변경)

    - **플러그인 시스템**

      공식 및 커뮤니티 플러그인을 통해 Tailwind의 기능을 확장할 수 있습니다.

    - **반응형 디자인**

      미디어 쿼리와 상태별 스타일(hover, focus 등)을 손쉽게 적용할 수 있는 클래스들을 제공합니다.

        - **반응형 클래스**: `sm:`, `md:`, `lg:`, `xl:`, `2xl:` 접두어를 사용해 반응형 디자인을 쉽게 구현할 수 있습니다.
    - **다크 모드**

      손쉽게 다크 모드를 지원하는 설정과 클래스를 제공합니다.

        - **다크 모드**: `dark:` 접두어를 사용하여 다크 모드 스타일을 관리할 수 있으며, `tailwind.config.js`에서 `darkMode` 옵션을 설정합니다.


<aside>
🗣

Tailwind CSS 공식 문서는 유틸리티 클래스들을 주제별로 매우 친절하게 설명하고 있습니다.

예를 들어, **높이 (height)** 관련 스타일을 적용하고 싶다면, 공식 문서 내 검색창에 `height` 라고 입력하면 다양한 클래스들을 확인할 수 있습니다.

https://v2.tailwindcss.com/docs/height

</aside>

### React Router 🍠

아래, **`React Router`** 공식문서를 먼저 읽어보시고 공식문서에 익숙해져보세요!

https://reactrouter.com/6.29.0

- **`React Router`**란?
    - Routing에 대해 정리

      `Routing`(라우팅)은 사용자가 웹 브라우저의 주소창에 URL을 입력하면, 해당 URL에 맞는 데이터를 서버로부터 받아와 사용자에게 제공하는 과정이다.

      ### **Routing의 동작 원리**

        1. 사용자가 특정 URL을 입력하거나 클릭하여 새로운 페이지를 요청한다.
        2. 요청된 URL에 해당하는 데이터를 서버에서 찾아 응답한다.
        3. 서버는 해당 URL에 맞는 HTML, CSS, JavaScript 등의 리소스를 클라이언트(사용자)에게 전달한다.
        4. 브라우저는 서버로부터 받은 데이터를 렌더링하여 새로운 페이지를 표시한다.
        5. 이 과정에서 전체 페이지가 새로고침되며, 새로운 HTML이 로드된다.

      ### **Routing의 예시**

        - 사용자가 `https://matthew.com/home`을 입력하면 서버는 `home.html`을 반환하여 해당 페이지를 표시한다.
        - 사용자가 `https://matthew.com/about`을 입력하면 `about.html`을 받아와 새로운 페이지가 로드된다.
    - Client Side Rendering (CSR)
        - **클라이언트 사이드 라우팅(Client-Side Routing)**
            - SPA(Single Page Application)에서 주로 사용되며, 페이지 전체를 새로고침하지 않고 필요한 데이터만 갱신한다.
            - 새로운 링크를 클릭하면 URL은 업데이트되지만 전체 페이지가 새로고침되지 않는다. (ex. Navbar나 Sidebar는 유지되며, main body 부분의 데이터만 변경된다.)
            - React, Vue.js 같은 프레임워크에서 주로 사용된다.


        새로운 경로를 입력했을 떄 서버에서 **새로운 페이지를 요청하는 것이 아닌**, **앱 안에서 필요한 부분만, 업데이트 하는 것**이 Routing과의 차이다.
        
    
    ### React Router
    
    CSR은 페이지는 유지하되, 부분적으로 내가 원하는 부분만 경로에 해당하는 컴포넌트를 보여줬다, 숨겼다 할 수 있는 방법이다.
    
    SPA를 유지하면서, 멀티 페이지 형태의 장점을 그대로 사용할 수 있다.
    
    ### 장점
    
    1. **URL 경로 활용**
        - URL 경로가 달라지므로, 브라우저의 `Web History API`를 이용할 수 있다.
    2. **주소 복사 및 공유 가능**
        - 사용자가 특정 페이지에 머무르고 있을 때, 해당 URL을 복사하여 다른 사람이 방문해도 동일한 화면을 볼 수 있다.
        - SPA에서는 보통 초기 화면(Home)으로 리디렉트되는 문제가 있지만, `React Router를 활용하면 원하는 위치로 바로 이동`할 수 있다.
    3. **성능 최적화**
        - 전체 페이지를 새로고침하지 않고 필요한 부분만 변경하므로, 성능이 향상되고 사용자 경험이 개선된다.
    4. **네비게이션이 부드러움**
        - 서버 렌더링 방식과 달리, `새로운 페이지를 로드하지 않고 빠르게 화면 전환`이 가능하다.

- **`React Router`** 기본 사용법 (**`createBrowserRouter`**, **`RouterProvider`**)

  ### React Router 실습

  먼저, **`React Router`**를 사용하기 위해 아래의 라이브러리를 사용해보고자 합니다.

    ```jsx
    pnpm i react-router-dom
    ```

  `App.tsx`에  아래와 같이 코드를 입력해줍시다.

    ```jsx
    import './App.css'
    
    // 1. import를 해줍니다.
    import {createBrowserRouter, RouterProvider} from "react-router-dom";
    
    const router = createBrowserRouter([
        {
            path: '/',
            element: <h1>홈 페이지입니다.</h1>
        },
        {
            path: '/movies',
            element: <h1>영화 페이지 입니다.</h1>
        }
    ])
    
    function App() {
        return <RouterProvider router={router}/>
    }
    
    export default App
    
    ```

    1. 먼저, `createBrowerRouter`를 활용하여, 원하는 `path`(경로)를 통해, 해당 경로에 접근하면 어떤 `element`(요소)를 보여주게 될 지 정의해줍니다.
    2. 즉, `path: ‘/’` 라는 것은 현재 vite로 프로젝트를 세팅했을 경우 localhost:5173을 의미합니다. 즉 처음 실행했을 떄 페이지입니다.
    3. **`path: ‘/movies’`** 라는 것은 현재 vite로 프로젝트를 세팅했을 경우 [localhost:5173/movies](http://localhost:5173/movies) 경로를 의미합니다. 즉, 유저가 movies라는 경로로 이동 했을 때, 영화 페이지 입니다. 라는 텍스트가 나오게 됩니다.
    4. 그 후 **`createBrowserRouter`**를 통해, 만든 **`router`**를 **`RouterProvider`**의 **`router`**에 전달해주면 됩니다.

       ![스크린샷 2024-09-12 오전 3.51.07.png](attachment:72740d51-338f-4be4-9028-856d0bcfa4c3:%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-09-12_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_3.51.07.png)

       ![스크린샷 2024-09-12 오전 3.51.20.png](attachment:3c49a7f2-5258-4e8e-a3db-065921f4d6a1:%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-09-12_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_3.51.20.png)

       그러면 이제 위와 같이, 우리가 설정한 `path`로 접근 했을 경우, `element`가 페이지에 보이게 됩니다.


- **`React Router`** 지정하지 않은 경로 접근 처리 (**`errorElement`**)

  ### React Router 지정하지 않은 경로 접근 처리

  우리가, 위의 실습에서,  `‘/’`, `‘/movies’` 두개의 경로에 대한 처리를 진행했습니다.

    ```jsx
    import './App.css'
    
    // 1. import를 해줍니다.
    import {createBrowserRouter, RouterProvider} from "react-router-dom";
    
    const router = createBrowserRouter([
        {
            path: '/',
            element: <h1>홈 페이지입니다.</h1>
        },
        {
            path: '/movies',
            element: <h1>영화 페이지 입니다.</h1>
        }
    ])
    
    function App() {
        return <RouterProvider router={router}/>
    }
    
    export default App
    
    ```

  만약 사용자가, 지정한 path가 아닌, [localhost:5173/yaho](http://localhost:5173/yaho) 와 같은 경로에 접근하게 되었을 떄 어떻게 될 까요?

  ![스크린샷 2024-09-12 오전 3.55.20.png](attachment:a67bf72d-c177-43d1-87ad-e12869aaec86:%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-09-12_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_3.55.20.png)

  위와 같이 **`404 NOT FOUND`** 라는 에러가 발생합니다. 이러한 결과는 매우 당연합니다.

  개발자가 지정하지 않은 경로에 접근했기 떄문에, **`404 ERROR`**가 발생한 것 입니다.

  해당 페이지는 UX 상으로 매우 아름답지 않고, 실제로 아래 영어 문구를 해석해보시면, **`errorElement`**를 활용해서, 더 나은 UX를 만들 수 있다. 라고 설명되어있습니다.

  한번 활용해보겠습니다.

    ```jsx
    import './App.css'
    
    import {createBrowserRouter, RouterProvider} from "react-router-dom";
    
    const router = createBrowserRouter([
        {
            path: '/',
            element: <h1>홈 페이지입니다.</h1>,
            // 없는 경로에 들어온 처리를 해줍니다.
            errorElement: <h1>너는 없는 경로에 들어왔다 ^ㅁ^ 야호~!</h1>
        },
        {
            path: '/movies',
            element: <h1>영화 페이지 입니다.</h1>
        }
    ])
    
    function App() {
        return <RouterProvider router={router}/>
    }
    
    export default App
    
    ```

  ![스크린샷 2024-09-12 오전 3.58.07.png](attachment:f3ad9c92-3eed-4664-ba21-78cc28247b25:%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-09-12_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_3.58.07.png)

  프론트엔드 개발은, 단순히 화면 구현에만 끝나지 않습니다.

  로딩 처리, 에러 처리, 데이터 관련 처리 등 UX 뿐만 아니라, 성능에 관한 처리도 많이 하게 됩니다.

  나중에 조금 더 학습하시게 된다면 아래와 같은 처리를 해보시면 좋을 것 같습니다.

    1. 유저가 이상한 경로에 접근했을 떄, **`홈으로 이동시킬 수 있는 버튼을 제작.`** (UX)
    2. **`각 페이지 별 다른 에러 처리`**
    3. **`ErrorBoundary`** 처리

- **`React Router`**의 **`Outlet`** 사용법 **`Link`** 태그를 활용한 페이지 이동.

  ### 1. Outlet 적용 전 세팅

  우리가 기존에, 컴포넌트를 만들면서, `src/components` 폴더에서 해당 파일들을 관리했습니다.

  이번에는, **`src/pages`** 폴더에서 페이지 관련된 파일들을 관리해보겠습니다.

  ![Screenshot 2025-02-23 at 10.34.50 AM.png](attachment:2dacd743-40a2-48eb-8dec-2e56e6a52e5e:Screenshot_2025-02-23_at_10.34.50_AM.png)

  총 3개의 페이지를 만들어 보고자 합니다.

    1. 홈페이지

    ```jsx
    // home.tsx
    const HomePage = () => {
        return (
            <h1>Home Page 야호~!</h1>
        );
    };
    
    export default HomePage;
    ```

    1. 영화 페이지

    ```jsx
    // movies.tsx
    const MoviesPage = () => {
        return (
            <h1>Movies Page 야호~!</h1>
        );
    };
    
    export default MoviesPage;
    
    ```

    1. 에러 페이지

    ```jsx
    // not-found.tsx
    const NotFound = () => {
        return (
            <h1>너는 찾을 수 없는 페이지 야호~!</h1>
        );
    };
    
    export default NotFound;
    
    ```

  그리고, 위에서 실습하면서 제작했던 `Router`는 우리가, `elements 요소에 직접, 태그를 입력`했는데, 이제는 `만든 페이지들을 import 하여 연결`해주겠습니다.

    ```jsx
    import './App.css'
    
    import {createBrowserRouter, RouterProvider} from "react-router-dom";
    
    // 1. 만든 페이지들을 import
    import HomePage from "./pages/home.tsx";
    import NotFound from "./pages/not-found.tsx";
    import Movies from "./pages/movies.tsx";
    
    // 2. 연결
    const router = createBrowserRouter([
        {
            path: '/',
            element: <HomePage/>,
            errorElement: <NotFound/>
        },
        {
            path: '/movies',
            element: <Movies/>
        }
    ])
    
    function App() {
        return <RouterProvider router={router}/>
    }
    
    export default App
    
    ```

  아래와 같이 제대로 동작하면 성공입니다.

  ![스크린샷 2024-09-12 오전 4.07.20.png](attachment:1fd21330-d448-44af-9ffe-bd62af440c9c:%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-09-12_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_4.07.20.png)

  ![스크린샷 2024-09-12 오전 4.07.29.png](attachment:5677cd07-6828-43e4-aae2-414a9827b077:%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-09-12_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_4.07.29.png)

  ![스크린샷 2024-09-12 오전 4.07.52.png](attachment:8d4a747e-d7c0-4bb8-a10f-9b0a75c9907b:%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-09-12_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_4.07.52.png)

  ### 2. Outlet 적용 방법

  먼저, `‘/’ 경로에서만 공유하는 layout`을 만들어보고자 합니다.

  `‘/’ 경로`에서 공유한다는 것은 `‘/movie’`, `‘/yaho’`, 등 ‘/’ 로 시작하는 모든 루트 경로에서 해당 Outlet을 공유하는 것 입니다.

  `src/layout` 폴더를 만든 후, `root-layout.tsx` 파일을 만들어보겠습니다.

  폴더구조는 자유이며, 합당한 이유만 존재한다면 본인이 관리하기 쉬운 형태로 만드셔도 좋습니다!

  ![Screenshot 2025-02-23 at 10.36.03 AM.png](attachment:e212dff9-0182-46bd-bcf7-297132bbcb21:Screenshot_2025-02-23_at_10.36.03_AM.png)

    ```jsx
    import {Outlet} from "react-router-dom";
    
    const RootLayout = () => {
        return (
            <>
                <Outlet/>
            </>
        );
    };
    
    export default RootLayout;
    
    ```

  [화면 기록 2024-09-12 오전 4.13.20.mov](attachment:8b799fb8-4c8f-4f24-a2e0-beb851411daf:%E1%84%92%E1%85%AA%E1%84%86%E1%85%A7%E1%86%AB_%E1%84%80%E1%85%B5%E1%84%85%E1%85%A9%E1%86%A8_2024-09-12_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_4.13.20.mov)

  https://www.smumc.co.kr/

  우리가, 궁극적으로 만들고 싶은 형태는 **`Outlet`**을 활용해서 **`Single Page Application 장점`**을 살려 `navbar`라는 컴포넌트를 만든후, `navbar는 유지`되며, 아래에 있는 내용들만, `각 경로에 맞게 Content 내용이 변경`되도록 만들어보겠습니다.

  먼저, `component` 폴더에 `navbar.jsx` 라는 컴포넌트를 만들어 보겠습니다.

  그 후, **`react-router-dom`** 에서 제공해주는 **`Link 태그를 활용`**하면, 원하는 경로로 페이지 이동을 할 수 있습니다.

    ```jsx
    // navbar.tsx
    import {Link} from "react-router-dom";
    
    const Navbar = () => {
        return (
            <nav>
                <Link to={'/'}>홈 페이지로 이동</Link>
                <Link to='/movies'>영화 목록 페이지로 이동</Link>
            </nav>
        );
    };
    
    export default Navbar;
    
    ```

  만든 **`navbar`**를 **`root-layout.tsx`**에 import를 시켜주겠습니다.

    ```jsx
    import {Outlet} from "react-router-dom";
    import Navbar from "../components/navbar.tsx";
    
    const RootLayout = () => {
        return (
            <>
                <Navbar/>
                <Outlet/>
            </>
        );
    };
    
    export default RootLayout;
    
    ```

  아직은, 해당 **`root-layout.tsx`** 파일을 어떠한 곳에도 연결해주지 않았기에, navbar가 보이지 않고, 이전과 비교하였을 떄  다른 변화가 발생하지 않습니다. 이를 이제 router에 연결해주도록 하겠습니다.

    ```jsx
    import './App.css'
    
    import {createBrowserRouter, RouterProvider} from "react-router-dom";
    
    import HomePage from "./pages/home.tsx";
    import NotFound from "./pages/not-found.tsx";
    import Movies from "./pages/movies.tsx";
    import RootLayout from "./layout/root-layout.tsx";
    
    const router = createBrowserRouter([
        {
            path: '/',
            // element: <HomePage/>,
            element: <RootLayout/>,
            errorElement: <NotFound/>
        },
        {
            path: '/movies',
            element: <Movies/>
        }
    ])
    
    function App() {
        return <RouterProvider router={router}/>
    }
    
    export default App
    
    ```

  [화면 기록 2024-09-12 오전 4.21.30.mov](attachment:bc756279-982c-4143-8725-56b12cf27aa9:%E1%84%92%E1%85%AA%E1%84%86%E1%85%A7%E1%86%AB_%E1%84%80%E1%85%B5%E1%84%85%E1%85%A9%E1%86%A8_2024-09-12_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_4.21.30.mov)

  무엇인가 이상하지 않나요?

  위의 영상처럼 동작하면 여러분들은 놀랍게도 맞게 따라오신 것 입니다.

  하지만 실제로 우리가 원하는 동작은, **`navbar`**를 통해 경로 이동시 **`각 path에 맞는 element가 나오기를 기대`**하는데 그렇게 동작하지 않습니다.

  원하는 방식처럼 동작하기 위해서는 아래와 같은 처리를 진행해야합니다.

  이처럼 해당 `RootLayout` 안에있는 `Outlet`안에 보여주길 원한다면,

  경로에 해당하는 element들을 외부에 표기하는 것이 아닌 `children`이라는 속성안에 자식 경로를 만들어, 표기해주어야 합니다.

    ```jsx
    import './App.css'
    
    import {createBrowserRouter, RouterProvider} from "react-router-dom";
    
    import HomePage from "./pages/home.tsx";
    import NotFound from "./pages/not-found.tsx";
    import Movies from "./pages/movies.tsx";
    import RootLayout from "./layout/root-layout.tsx";
    
    const router = createBrowserRouter([
        {
            path: '/',
            element: <RootLayout/>,
            errorElement: <NotFound/>,
            // 1. Navbar 밑에 path에 해당하는 element를 보여주고 싶으면 아래와 같이 children을 활용
            children: [
                {
                    // 2. index: true는 위의 path: '/' 즉, 홈 경로를 의미한다.
                    index: true,
                    element: <HomePage/>
                },
                {
                    // 3. 부모의 path가 '/'이니, /를 붙이지 않아도 /movies랑 동일하게 동작한다.
                    path: 'movies',
                    element: <Movies/>
                }
            ]
        },
    
    ])
    
    function App() {
        return <RouterProvider router={router}/>
    }
    
    export default App
    
    ```

  [화면 기록 2024-09-12 오전 4.26.31.mov](attachment:3bbb7ea1-27fc-4bf7-940b-34239f341dc9:%E1%84%92%E1%85%AA%E1%84%86%E1%85%A7%E1%86%AB_%E1%84%80%E1%85%B5%E1%84%85%E1%85%A9%E1%86%A8_2024-09-12_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_4.26.31.mov)

  위와 동일하게 동작한다면 성공입니다~!

- **`React Router`**를 활용하여 **`Dynamic Routing`**을 구현해보자. (**`useParams`**)

  ### Dynamic Routing (동적 라우팅)

  **`Dynamic Routing`**에 대해 쉽게 설명드리겠습니다.

  쿠팡을 통해 상품 상세 정보 페이지를 접근한다고 해보겠습니다.

  보통, 상세 상품 페이지는, 진열된 상품 정보는 다르지만, 전체적인 UI는 비슷합니다. 이러한 페이지 같은 경우 **`Dynamic Routing`**을 활용해서 구현을 많이합니다.

  ![스크린샷 2024-09-12 오전 4.28.25.png](attachment:36bafd7f-9240-4a48-a2ac-58f6607a207d:%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-09-12_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_4.28.25.png)

  ![스크린샷 2024-09-12 오전 4.29.26.png](attachment:0f21e46f-6277-4a8a-8e3a-0fdf637dc304:%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-09-12_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_4.29.26.png)

  위의 페이지의 URL 앞부분만 보겠습니다.

    ```jsx
    coupang.com/vp/products/여기 부분 숫자만 다른...
    ```

  위의 `products/` 뒤의 숫자만 다른 것을 볼 수 있습니다.

  이렇게 `products/` 뒤의 숫자만 다른 것을 활용하여, 해당 숫자를 활용하여 페이지의 정보를 구분하는 것을 `Dynamic Routing`이라고 부릅니다.

  우리는 이를, React Router를 활용하여 매우 쉽게 구현할 수 있습니다.

    ```jsx
    import './App.css'
    
    import {createBrowserRouter, RouterProvider} from "react-router-dom";
    
    import HomePage from "./pages/home.tsx";
    import NotFound from "./pages/not-found.tsx";
    import Movies from "./pages/movies.tsx";
    import RootLayout from "./layout/root-layout.tsx";
    
    const router = createBrowserRouter([
        {
            path: '/',
            element: <RootLayout/>,
            errorElement: <NotFound/>,
            children: [
                {
                    index: true,
                    element: <HomePage/>
                },
                {
    		            // /:을 활용해서, 동적으로 바뀌는 부분의 이름을 정의해줍시다.
                    path: 'movies/:movieId',
                    element: <Movies/>
                }
            ]
        },
    
    ])
    
    function App() {
        return <RouterProvider router={router}/>
    }
    
    export default App
    
    ```

  여기서, 가장 중요한 점은 `/:` 뒤에 설정한 이름으로, 우리가 해당하는 `params`의 값을 받아올 수 있다는 것입니다.

  [화면 기록 2024-09-12 오전 4.34.50.mov](attachment:867971f0-ad72-48ae-a761-5748fa488667:%E1%84%92%E1%85%AA%E1%84%86%E1%85%A7%E1%86%AB_%E1%84%80%E1%85%B5%E1%84%85%E1%85%A9%E1%86%A8_2024-09-12_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_4.34.50.mov)

  위와 같이 `/movies/:movieId` 경로를 설정하면 `movieId` 값이 매번 다르게 변경되더라도 동일한 `MovieDetail` 컴포넌트를 렌더링할 수 있다.

  **예시)**

    - `/movies/1`
    - `/movies/123`
    - `/movies/matthew`

  위의 경로들은 동일한 `MovieDetail` 컴포넌트가 렌더링되지만, 내부에서 `movieId` 값을 가져와 서버에 데이터 요청을 하여 응답 받은 해당 영화의 각기 다른 상세 정보를 표시할 수 있습니다.

  **ex) 조금 이해가 어렵다면, 쿠팡 상품 상세페이지를 생각해보시면 됩니다!**

  ### `useParams`를 활용해보자.

    ```tsx
    import { useParams } from 'react-router-dom';
    
    // movies.tsx
    const MoviesPage = () => {
      const params = useParams();
      
      console.log(params);
      
      return <h1>{params.movieId}번의 Movies Page 야호~!</h1>;
    };
    
    export default MoviesPage;
    ```

  실제로 **`useParams`**를 활용하면 파라미터에 대해 받아볼 수 있습니다.

  `console.log`를 활용해서 출력값을 보면 `movieId`에 실제로 입력한 값 `123`이 출력되는 것을 확인할 수 있습니다.

  왜 movieId를 useParams에서 객체로 반환하는지 궁금해하는 사람이 있을 것 입니다.

  `movieId`는 우리가 `createBrowserRouter`에서 path로 `:movieId` 이렇게 작성해주었기에, movieId라고 나타납니다!

  만약 우리가 **`:matthew`** 이렇게 작성했다면, **`params.matthew`**로 접근할 수 있습니다!

    ```tsx
    const router = createBrowserRouter([
        {
            path: '/',
            element: <RootLayout/>,
            errorElement: <NotFound/>,
            children: [
                {
                    index: true,
                    element: <HomePage/>
                },
                {
    		            // /:을 활용해서, 동적으로 바뀌는 부분의 이름을 정의해줍시다.
                    path: 'movies/:movieId',
                    element: <Movies/>
                }
            ]
        },
    ])
    ```

  ![Screenshot 2025-02-23 at 10.48.37 AM.png](attachment:6673be97-80bc-40c3-b1f0-897476db518a:Screenshot_2025-02-23_at_10.48.37_AM.png)


### 나의 세 번째 react-hook 🍠

<aside>
💡

React의 `useEffect` 훅은 컴포넌트의 생명주기와 관련된 **부수 효과(side effect)** 를 처리할 때 사용됩니다.

예를 들어, **API 호출, 구독(subscription) 설정, 수동 DOM 조작, 타이머 설정** 등이 필요할 때 `useEffect`를 활용할 수 있습니다.

만약 **컴포넌트가 마운트될 때 특정 작업을 실행하고 싶다면**, `useEffect` 내부에서 원하는 코드를 작성하면 됩니다.

</aside>

- **`useEffect` 기초 설명**

  ### useEffect 기초

  React 컴포넌트는 **주로 JSX를 사용하여 사용자에게 HTML 형식으로 정보를 보여주는 역할**을 합니다. 하지만, 단순히 화면을 렌더링하는 것 외에도 다양한 작업을 수행할 수 있습니다.

  예를 들어, **백엔드의 REST API를 호출하여 데이터를 생성(Create), 조회(Read), 수정(Update), 삭제(Delete)하는 작업**을 처리할 수도 있습니다.

  특히, **백엔드에서 데이터를 불러와야 하는 경우**, 일반적으로 **컴포넌트가 처음 화면에 나타날 때(마운트될 때)만 데이터를 가져오는 것이 적절**합니다. 하지만, **컴포넌트가 리렌더링될 때마다 불필요하게 API를 계속 요청하는 것은 비효율적**일 수 있습니다.

  이때 말하는 **Effect(효과)** 란 특정 상황에서 컴포넌트 내부에서 발생하는 행동을 의미합니다.

  React 컴포넌트의 기본적인 역할은 화면을 렌더링하는 것이지만, 그 외에도 **데이터를 불러오거나, API를 호출하는 등의 작업을 추가로 수행하는 경우**, 이를 **부수 효과(Side Effect)** 라고 부릅니다.

  React에서는 이러한 **Side Effect를 특정 조건에서만 실행하기 위해 `useEffect` 훅(Hook)을 제공합니다.**

  이 훅을 통해 **컴포넌트가 마운트될 때, 특정 값이 변경될 때, 또는 언마운트될 때 원하는 작업을 수행**할 수 있습니다.

  또한, **의존성 배열(Dependency Array)** 을 사용하면, **Side Effect가 언제 실행될지를 제어**할 수 있습니다.

    ```jsx
    import { useEffect } from 'react';
    
    useEffect(() => {
      // 실행할 부수 효과 (예: API 호출, 구독 설정 등)
    }, []);
    
    // 의존성 배열 (Dependency Array)
    // [] 빈 배열이면 컴포넌트가 처음 마운트될 때만 실행됨.
    ```

  ### **`useEffect`의 두 가지 인자**

  1️⃣ **첫 번째 인자 (Callback Function)**

  → **부수 효과(Side Effect)** 를 실행하는 **함수**를 지정합니다.

  → 이 함수 안에서 API 호출, 이벤트 리스너 설정, 타이머 설정 등의 작업을 수행할 수 있습니다.

  2️⃣ **두 번째 인자 (Dependency Array, 의존성 배열)**

  → `useEffect`가 실행될 조건을 지정합니다.

    - `[]` (빈 배열): 컴포넌트가 **처음 마운트될 때만 실행**됩니다.
    - `[state]`: `state` 값이 변경될 때마다 실행됩니다.
    - 의존성 배열을 생략하면, **컴포넌트가 리렌더링될 때마다 실행됩니다.**

- **`useEffect`** 로 데이터를 호출하는 방법 알아보기 🍠

  ### useEffect로 데이터를 호출하는 방법 알아보기

    <aside>
    💡

  **`useEffect`**를 활용해서, 데이터를 호출하는 방법을 배워봅니다!

    </aside>

    1. 먼저 TMDB 사이트에 들어가서, 회원가입 후 로그인을 해줍니다.

       https://developer.themoviedb.org/reference/intro/getting-started

    2. 그러면 아래 **`Authenticate`** 부분에, Token이 들어가 있을 겁니다. Token이 무엇인지 잘 모른다면, 간략하게 해당 정보를 호출하기 위해, 어떠한 사용자가 접근했는지 판단할 수 있는 것 이라고 간략하게 이해하고, 나중에 자세히 다루어 보겠습니다.

       ![스크린샷 2024-09-12 오후 8.47.54.png](attachment:352acb64-5eda-4ce8-a91e-8a3aaa083b40:%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-09-12_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_8.47.54.png)

    3. MOVIE LISTS의 Popular 부분을 활용해서, 영화 데이터를 받아와보겠습니다.

       ![스크린샷 2024-09-12 오후 8.50.38.png](attachment:b3befdfe-41bd-4c2d-9fb2-3be42c078190:%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-09-12_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_8.50.38.png)

        ```jsx
        curl --request GET \
             --url 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1' \
             --header 'Authorization: Bearer 토큰' \
             --header 'accept: application/json'
        ```

       curl문을 통해 데이터 요청을 어떻게 해야하는지 이해해 보겠습니다.
        
       ---

       ### **API 요청 과정**

       위 요청을 수행하면, 클라이언트(프론트엔드)에서 서버(TMDB API)로 데이터를 요청하게 됩니다.

       1️⃣ **URL을 통해 데이터를 요청** → `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`

       2️⃣ **Header에 필요한 정보를 포함하여 요청**

        - `Authorization: Bearer 토큰` → API 접근을 위한 인증 (필수)
        - `accept: application/json` → JSON 형식의 데이터를 요청함을 명시

        ---

       ### **Query Parameter란?**

       API 요청을 보면, URL에 **`?`와 `&`를 활용하여 추가적인 정보를 전달**하는 부분이 있습니다. 이를 **Query Parameter**라고 합니다.

       ![스크린샷 2024-09-12 오후 8.51.38.png](attachment:64763c33-9731-4e07-a91b-560c45120944:%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-09-12_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_8.51.38.png)

       📌 **Query Parameter 사용법**

        - **첫 번째 쿼리 파라미터**는 `?`로 시작
        - **그 이후 추가 파라미터**는 `&`로 연결

        ```jsx
        --url 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1' 
        ```

        - `language=en-US` → 영어로 된 데이터를 요청
        - `page=1` → **1페이지에 해당하는 데이터**를 요청

       ✅ **즉, 위 API 요청을 수행하면 "영어로 된 인기 영화 목록(1페이지)" 데이터를 받아올 수 있습니다.**
        
       ---

       ### useEffect를 활용해서 데이터 받아오기

       이제는 **`useEffect`**의 동작방식에 대해서 배웠으니 실제로 데이터를 호출하는 방법에 대해서 알아보고자 합니다.

       먼저, **`axios`** 라이브러리를 설치해줍니다. `fetch`를 사용하셔도 상관없습니다만, 저는 `axios`를 통해 실습을 진행해보고자 합니다.
       (아래 미션에서 제공해드리는 강의 영상에 `fetch`를 사용해서 데이터를 불러오는 방법 또한 `실습`을 진행했으니 참고바랍니다!)

        ```jsx
        pnpm install axios
        ```

        1. 먼저 영화에 대한 타입을 선언합니다. 그리고, 영화를 불러왔을 때 실제로 어떤 응답으로 올지 TMDB API 문서를 보며 타입을 정의합니다.

       https://developer.themoviedb.org/reference/movie-popular-list

       ![Screenshot 2025-02-23 at 2.49.33 PM.png](attachment:879347dd-8ab0-4bd4-91db-65e3c74e5ff0:Screenshot_2025-02-23_at_2.49.33_PM.png)

       어떤 구조로 들어올지 이제 우리는 알 수 있으니 타입을 정의해봅니다.

       **`src/types/movie.ts` 폴더를 만들어 타입을 정의해봅시다!**

        ```tsx
        export type Movie = {
          adult: boolean;
          backdrop_path: string;
          genre_ids: number[];
          id: number;
          original_language: string;
          original_title: string;
          overview: string;
          popularity: number;
          poster_path: string;
          release_date: string;
          title: string;
          video: boolean;
          vote_average: number;
          vote_count: number;
        };
        
        export type MovieResponse = {
          page: number;
          results: Movie[]; // 실제로 들어오는거는 여러개의 영화 데이터니 Movie의 배열로 표현
          total_pages: number;
          total_results: number;
        };
        
        ```

        1. **`useState`**를 통해, 영화 데이터를 받아 올 상태를 선언

        ```jsx
        import {useState} from "react";
        import { Movie } from '../types/movie';
        
        const MoviesPage = () => {
          const [movies, setMovies] = useState<Movie[]>([]);
        
            return (
                <>
                    <h1>영화 데이터 불러오자</h1>
                </>
            )
        };
        
        export default MoviesPage;
        
        ```

       당연히, 초기에는 아무런 데이터를 받아올 수 없으니 빈 배열이겠죠?

        1. `axios`를 import하자.

        ```jsx
        import { useState } from "react";
        import { Movie } from '../types/movie';
        
        import axios from 'axios';
        
        const MoviesPage = () => {
          const [movies, setMovies] = useState<Movie[]>([]);
        
            return (
                <>
                    <h1>영화 데이터 불러오자</h1>
                </>
            )
        };
        
        export default MoviesPage;
        
        ```

        1. **`useEffect`**를 통한 데이터 호출

        ```jsx
        import { useEffect, useState } from 'react';
        import { Movie, MovieResponse } from '../types/movie';
        
        import axios from 'axios';
        
        const MoviesPage = () => {
          const [movies, setMovies] = useState<Movie[]>([]);
        
          useEffect(() => {
            const fetchMovies = async () => {
              // 응답에 대한 타입을 정의해줍니다.
              const { data } = await axios.get<MovieResponse>(
                `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1`,
                {
                  headers: {
                    Authorization: `Bearer 토큰값`,
                  },
                }
              );
        
              setMovies(data.results);
            };
        
            fetchMovies();
          }, []);
        
          return (
            <>
              <h1>영화 데이터 불러오자</h1>
            </>
          );
        };
        
        export default MoviesPage;
        ```

       **`axios`**를 사용하면, **`application/json`**이 자동으로 요청 헤더에 들어가기 떄문에 따로 선언을 안해주어도 좋습니다.

       여기서 **`useEffect`**를 사용할 때 유의 할 점이 있습니다.

        <aside>
        💡

       `async` `await` 함수는 프로미스 객체를 반환 하므로 부수효과 함수가 될 수 없다.

       부수 효과 함수는 함수만 반환 할 수 있으며, 반환된 함수는 부수 효과 함수가 호출되기 직전과 컴포넌트가 사라지기 직전에 호출된다.

        </aside>

       그러므로, 우리는 `useEffect` 훅에서, `async await 함수`를 사용하기 위해서, `useEffect 함수 내부에서, 다른 async/await 함수를 만들어`, 해당하는 데이터를 호출하는 것 입니다.

       함수만, 만들면 의미 없기에, 만든 이후에 바로 **`getMovies()`**를 통해, 해당 함수를 호출합니다.

       그러면, 우리가 `setMovies`를 통해, 데이터 호출시 해당하는 데이터를 받아오기에, movies에는 이제 실제로 서버에서 받아온 영화 데이터들이 담깁니다.

       ![Screenshot 2025-02-23 at 2.55.44 PM.png](attachment:aea8d6e9-e21c-4185-8325-fee0373f7e10:Screenshot_2025-02-23_at_2.55.44_PM.png)

       실제로, `console.log(movies)`를 통해, 안의 데이터를 보면 성공적으로 통신이 되었다는 200 코드와 함께 정보들을 확인할 수 있다.

       ![스크린샷 2024-09-12 오후 9.20.24.png](attachment:a6679e95-8605-4bf2-a660-b5ed8ab23864:%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-09-12_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_9.20.24.png)

       혹시라도, 위와 같은 에러가 발생한다면, 당연한 것이다.

       여기서 알아야 할 사실은 `state`는 비동기라는 것 이다. 처음 화면이 켜지기 전에 동작하는데, 당연히 이 떄의 `state`는 값이 정의되지 않았기 때문에 `undefined` 이므로, 정의되지 않은 `state`에 접근하기에 에러가 발생하는 것 이다.

       이를 해결하기 위해 **`Optional Chaining`**을 활용할 수 있다.

       https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining

        ```jsx
        import { useEffect, useState } from 'react';
        import { Movie, MovieResponse } from '../types/movie';
        
        import axios from 'axios';
        
        const MoviesPage = () => {
          const [movies, setMovies] = useState<Movie[]>([]);
        
          console.log(movies);
        
          useEffect(() => {
            const fetchMovies = async () => {
              const { data } = await axios.get<MovieResponse>(
                `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1`,
                {
                  headers: {
                    Authorization: `Bearer 토큰`,
                  },
                }
              );
        
              setMovies(data.results);
            };
        
            fetchMovies();
          }, []);
        
          return (
            <ul>
              {/* 옵셔널 체인 활용 */}
              {movies?.map((movie) => (
                <li key={movie.id}>
                  <h1>{movie.title}</h1>
                </li>
              ))}
            </ul>
          );
        };
        
        export default MoviesPage;
        ```

- **`useEffect`** **심화**

  ### useEffect의 Clean Up Function을 사용하는 이유!

  `useEffect`를 활용해봤거나, 기타 다른 글을 찾아보았다면, 클린업 함수라는 것이 존재한다고 들어봤을 수 있다. 일반적으로, 이 클린업 함수는 이벤트를 등록하고, 지울 떄 사용한다고 알려져있다.

    ```jsx
    import {useEffect, useState} from "react";
    
    const SearchPage = () => {
        const [counter, setCounter] = useState(0);
    
        const handleClick = () => {
            setCounter(prev => prev + 1);
        }
    
    		// 최초 실행
        useEffect(() => {
            const mouseClickEffectEvent = () => {
                console.log(counter);
            }
    
            window.addEventListener('click', mouseClickEffectEvent)
    
    				// 클린업 함수
    				// 클린업 함수는 다음 렌더링이 끝난 뒤에 실행.
            return () => {
                console.log('클린업 함수 실행!', counter)
                window.removeEventListener('click', mouseClickEffectEvent)
            }
        }, [counter]);
        return (
            <>
                <h1 style={{color: 'white'}}>
                    {counter}
                </h1>
                <button onClick={handleClick}>+</button>
            </>
        );
    };
    
    export default SearchPage;
    ```

  `useEffect`가 포함된 위의 컴포넌트를 실행하면 아래와 같은 결과가 콘솔에 찍힙니다.

  ![스크린샷 2024-09-13 오후 5.04.44.png](attachment:8b7c00bc-aa45-492e-800f-6282e0b0e109:%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2024-09-13_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_5.04.44.png)

  실제로 `처음 mount` 되었을 때 `클린업 함수 실행! 0`  이 실행됩니다. 그 이후에 콘솔에 찍힌 로그를 확인해보면, 항상 이전 counter 값, 이전 state를 참조해서, 실행되는 것을 알 수 있습니다.

  즉, **`클린업 함수는, 새로운 값을 기반으로 렌더링 된 뒤에 실행`**되지만, 변경된 값을 읽는 것이 아닌, 함수가 정의됐을 **`당시에 선언됐던 이전 값을 보고 실행`**하는 것 이다.

  아직, 잘 이해가 안된다면, 아래 마지막 정리하는 글을 읽어보세요~!

  ### **`useEffect`의 기본 흐름**

    1. **처음 마운트**될 때, `useEffect` 내부의 콜백 함수가 실행됩니다.
    2. **리렌더링**이 발생하고 의존성 배열의 값이 변경되면, `useEffect`는 다음과 같이 동작합니다:
        - 먼저, **이전의 클린업 함수**가 실행됩니다. (이전 렌더링의 상태나 값을 기준으로 실행)
        - 그 후에, 새로운 사이드 이펙트 콜백이 실행됩니다.

  이런 방식은 특히 **이벤트 핸들러**나 **타이머** 등을 설정할 때 유용합니다. 클린업 함수가 없으면 이벤트 핸들러가 여러 번 중복 등록되거나 메모리 누수가 발생할 수 있기 때문입니다. 클린업 함수가 **이전 상태**를 기반으로 실행되면서, 이전에 등록된 이벤트를 정리하고 새로운 이벤트를 추가하는 방식으로 동작을 제어합니다.

  ### **클린업 함수와 언마운트와의 차이**

  클래스 컴포넌트에서 `componentWillUnmount`는 컴포넌트가 **DOM에서 사라질 때** 호출됩니다. 하지만 함수형 컴포넌트의 클린업 함수는 **리렌더링이 발생할 때마다** 호출되며, 이는 언마운트와 다른 개념입니다. 클린업 함수는 리렌더링 시마다 **이전 상태**를 정리해 주는 역할을 합니다.


조금 더 **`useEffect`**에 대해서 깊게 알고 싶다면 아래 영상을 참고해주세요!

https://youtu.be/v4l-m7CaC1A?si=wZLW0MSrJuholQVR

- 위의 영상을 보고 학습한 내용을 정리해주세요!

  `useEffect`는 사이드 이펙트를 실행하는 함수로서, 기본적으로 매 리렌더링마다 실행되지 않고 한 번만 실행된다. 이때 상태가 변했을 때는 의도적으로 다시 실행하게 만들기 위해서 두 번째 인자로 의존성 배열을 넘길 수 있다. 또한 이벤트 핸들러 등의 제거를 위해서 클린업 함수를 반환할 수도 있다.
