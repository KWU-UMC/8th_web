    ```tsx
    import { useEffect, useState } from "react";

    export default function UseEffectPage(){
        const[count,setCount]=useState(0);  // 순서1
        const handleIncrease=():void=>{
        setCount((prev):number=>prev+1)
        console.log(count)} // 순서2

        return(
            <div>
                <h3>useEffectPage</h3>
                <h1>{count}</h1>
                <button onClick={handleIncrease}>증가</button>
            </div>
        )//순서3

    }
    ```

    ![image.png](attachment:25d2e661-5fd9-423f-8bd7-5abda24cf27b:image.png)

    useState만 사용한 경우 프로그램 작동 순서에 의해 이전값이 찍히게 됨

    ```tsx
    import { useEffect, useState } from "react";

    export default function UseEffectPage(){
        const[count,setCount]=useState(0);  // 순서1
        const handleIncrease=():void=>{
        setCount((prev):number=>prev+1)}

        useEffect(()=>{
            //실행하고 싶은 코드
            console.log(count); // 순서 3
            //의존성 배열(dependency array)
        },[count]);

        return(
            <div>
                <h3>useEffectPage</h3>
                <h1>{count}</h1>
                <button onClick={handleIncrease}>증가</button>
            </div>
        ) // 순서 2

    }
    ```

![image.png](attachment:64f6363d-2e90-474e-9214-c84de57e990f:image.png)

useEffect 사용시 이전 값이 찍히는 것이 아닌 화면이 업데이트 된 이후에 즉 setState로 업데이트된 값을 출력하기 때문에 항상 최신값으로 찍힘

useEffect 사용시 주의점

useEffect안에서 업데이트하는 function과 변수를 함께 넣으면 무한 렌더링 발생

```tsx
import { useEffect, useState } from "react";

export default function UseEffectError() {
  const [counter, setCounter] = useState(0);

  const handleIncrement = (): void => {
    //1.초기 렌더링 시작
    setCounter((counter): number => counter + 1);
  };
  useEffect((): void => {
    setCounter((counter): number => counter + 1);
    //2.counter 값이 변경될 때마다 실행
  }, [counter]);
  // 1,2번 과정이 반복해서 일어나서 무한 렌더링 사태가 일어남남
  return <div onClick={handleIncrement}>{counter}</div>;
}
```

- 🍠 `fetch` vs `axios`의 차이점에 대해 자세히 조사하여 아래 토글에 정리해주세요!
  - `fetch` ?
    fetch 함수는 첫번째 인자로 URL, 두번째 인자로 옵션 객체를 받고 Promise 타입의 객체를 반환한다. 반환된 객체는 API 호출이 성공했을 경우 response객체를 resolve 실패했을 경우 error객체를 reject한다. fetch함수는 내장 함수로 주로 가벼운 프로젝트에 자주 사용.
  - `axios` ?
    브라우저 Node.js를 위한 Promise API를 활용하는 HTTP 비동기 통신 라이브러리이다. Axios는 JSON 자동 파싱, 에러 처리, 타임아웃 및 요청 취소 기능 등 다양한 편의 기능을 제공하므로 대규모 프로젝트나 복잡한 HTTP 요청 관리에 유리합니다.
  - `fetch`와 `axios`의 차이
    axios와 fetch는 모두 HTTP 요청을 보내는데 사용되는 도구이다. 하지만 axios는 fetch보다 편리한 API 와 기능을 제공하며 프로미스 기반으로 비동기 작업을 처리하는 데 있어서 더 직관적이고 편리한 방법을 제공한다.
    response 얻는 방법
    axios: response 객체의 data property에 접근하여 얻는다.
    fetch:response 객체에 .json()메소드를 호출하여서 json 객체를 얻는다.
    여러가지 문서를 확인해본 결과 axios가 fetch보다 오류를 찾기 쉽다는 글들을 많이 찾아 볼 수 있었음
