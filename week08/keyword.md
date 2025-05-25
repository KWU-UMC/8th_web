- **`Debounce`** 구글링 후 개념 정리 및 코드 작성해보기 🍠
  - **`Debounce`** 개념 정리 🍠
    짧은 시간 동안 여러 번 호출되는 함수들 중 마지막 호출만 실행되도록 제한하는 방법으로 보통은 입력 이벤트나 리사이즈, 스크롤 같은 빠르고 자주 발생하는 이벤트 처리에서 과부하를 막기위해서 사용된다. 즉 사용자가 일정시간 동안 아무 입력도 하지 않았을 때 한 번만 실행되는 된다고 볼 수 있다. 예를 들어서 debounce를 사용하지 않는다면 사용자가 검색창에 hello를 입력하고 있을때 h he hel hell hello 5번의 api 요청이 전달되기 때문에 비효율적이다. 그렇기 때문에 debounce를 사용해서 마지막 이벤트만 처리하면 불필요한 호출을 줄이고 서버 부하를 줄여줄 수 있다.
  - **`Debounce`** 코드 작성 🍠
    ```jsx
    import{useEffect,useState} from "react";

    function debounce<T>(value:T,delay:number):T{
    const[debounceValue,setDebounceValue]=useState(value);
    useEffect(()=>{
    	const handler = setTimeout(()=>{
    		setDebounceValue(value);
    	},delay);

    	return()=>{
    		clearTimeout(handler);};
    },[value,delay]);
    return debounceValue;
    ```
- **`Throttling`** 구글링 후 개념 정리 및 코드 작성해보기 🍠
  - **`Throttling`** 개념 정리 🍠
    Throttle은 짧은 시간 동안 이벤트가 여러번 발생하더라도 정해진 주기마다 한 번 만 콜백을 실행하도록 제한하는 방법으로 debounce와 다르게 계속 실행되기는 하는데 일정 간격으로만 실행된다. 예를 들어서 사용자가 scroll이벤트는 사용자가 스크롤할때마다 발생하는데 초당 수십 번 발생하게 되는데 이를 계속 호출하면 성능이 저하 될 수 있기때문에 3초에 한번 실행되게 이런식으로 시간을 조절할 수 있다.
  - **`Throttling`** 코드 작성 🍠
