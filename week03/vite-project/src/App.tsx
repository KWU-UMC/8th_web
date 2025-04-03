import './App.css'

// 1. import를 해줍니다.
//craeteBrowserRouter: 원하는 path를 통해 경로 접근하면 어떤 요소를 보여주게 할 지 정의
//RouterProvider : react-router-dom 라이브러리에서 제공하는 컴포넌트
import {createBrowserRouter, RouterProvider} from "react-router-dom";

//직접 요소를 태그 한 것을 import 해주기
//import HomePage from './pages/home';
import MoviePage from './pages/movies';
import NotFound from './pages/not-found';
import RootLayout from './layout/root-layout';
import HomePage from './pages/home';

//element 뒤에는 전달할 컴포넌트를 전달해주기 위함
const router = createBrowserRouter([
    {
        path: '/',
        //element: <HomePage/>
        element: <RootLayout/>,
        errorElement: <NotFound/>,
        children:[
            {
                index : true,
                element : <HomePage/>
            },
            {
                //동적으로 바뀌는 부분의 이름을 정의해줌
                path:'movies/:movieId',
                element: <MoviePage/>
            }
        ]
    },
])

//createBrowserRouter로 라우터를 정의하고
//routerProvider로 라우터 설정을 제공 및 매핑시키는 역할할
function App() {
    return <RouterProvider router={router}/>
}

export default App
