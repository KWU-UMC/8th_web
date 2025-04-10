- 🍠 `fetch` vs `axios`의 차이점에 대해 자세히 조사하여 아래 토글에 정리해주세요!
    
    참고한 블로그 : https://velog.io/@sunkim/React-axios-%EC%99%80-fetch-%EC%B0%A8%EC%9D%B4%EC%A0%90
    
    - `fetch` ?
        
        정의) javascript 내장 함수(브라우저 기본 포함) 이며, Promise 기반의 API 요청 도구
        
        특징)
        
        - import를 하지 않아도 사용 가능
        - 사용법이 비교적 간단→ 사용하기에 불편한 점이 다소 존재
        - .json() 같은 메서드로 한 번 더 파싱을 진행해야함
        - Promise 자체를 반환 → json으로 변환해주는 로직이 추가되어야
        - catch 에 걸렸을 때 .then 을 실행해야함(axios는 그러지 않아도 됨)
        - body로 json.stringify()를 통해서 서버가 이해할 수 있도록 문자열 파싱을 해야함
    - `axios` ?
        
        정의) 브라우저, Node.js를 위한 Promise API 를 활용하는 HTTP 비동기 통신 라이브러리
        
        특징)
        
        - 사용하기에 편리함
        - 기능이 fetch보다 많고 직관적임
        - .json() 이 따로 필요 없이 자동적으로 응답을 Json 으로 해줌
        - 400~500 대의 에러 발생 시, refject로 response를 전달해 catch로 잡아낼 수 있다.(fetch는 네트워크 장애나 요청이 완료되지 않은 경우에만 가능)
        - data를 바로 전달할 수 있다.
    - `fetch`와 `axios`의 차이
        
        
        | 항목 | fetch | axios |
        | --- | --- | --- |
        | 제공방식 | 내장 함수 | 설치 필요 |
        | 응답 파싱 | .json() 을 통한 수동으로 처리 | data를 통한 자동 파싱 |
        | 요청 바디 직렬화 | Json.stringfly()의 직접 직렬화  방식 | 내부적으로 자동 처리 |
        | 에러 처리  | HTTP (400~500) 의 에러는 then으로 넘어와서 확인이 필요 | HTTP 에러는 자동적으로 catch로 넘어감 |
        | 요청/ 응답 인터셉터 | 직접 구현 필요 | 내장 기능으로 지원 가능 |
        | 타임 아웃 설정 | 직접 구현 필요 | 지원 |
        | 브라우저 호환성 | 최신 브라우저에서만 지원 | 브라우저 및 Node.js 에서도 지원 가능 |