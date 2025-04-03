import './App.css'

// 1. import를 해줍니다.
//craeteBrowserRouter: 원하는 path를 통해 경로 접근하면 어떤 요소를 보여주게 할 지 정의
//RouterProvider : react-router-dom 라이브러리에서 제공하는 컴포넌트
import {createBrowserRouter, RouterProvider} from "react-router-dom";


const router = createBrowserRouter([
    {
        path: '/',
        element: <h1>홈 페이지입니다.</h1>,
        errorElement: (
          <div>
            <h1>너는 없는 경로에 들어왔음!</h1>
            </div>
        ),
    },
    {
        path: '/movies',
        element: <h1>영화 페이지 입니다.</h1>
    }
])

//createBrowserRouter로 라우터를 정의하고
//routerProvider로 라우터 설정을 제공 및 매핑시키는 역할할
function App() {
    return <RouterProvider router={router}/>
}

export default App
