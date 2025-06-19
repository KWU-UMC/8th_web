### 키워드 정리 🍠

- **`Referential Equality` (참조 동일성)** 🍠
  - **Referential Equality 는 무엇인가요?** 🍠
    - Referential Equality: 두 객체가 같은 메모리 참조를 가리키는지 비교하는 것을 의미
    - 사용되는 연산자
      - === (strict equality)
      - !== (strict inequality)
    ```cpp
    const a = { name: "Alice" };
    const b = { name: "Alice" };
    const c = a;

    console.log(a === b); // false - 값은 같지만 서로 다른 객체 (다른 참조)
    console.log(a === c); // true  - 같은 객체를 가리킴 (같은 참조)

    ```
  - 렌더링 최적화와 어떤 관계가 있을까요? 🍠
    - React에서 렌더링 여부는 referential equality로 판단함
      - React 컴포넌트는 기본적으로 porps나 state의 참조가 바뀌었는가를 기준으로 렌더링할지 말지를 결정함
- **`useCallback`과 `memo`**
  https://www.youtube.com/watch?v=Z3uNjFqYSF8&t=904s
    <aside>
    🍠
    
    위의 영상을 보고 **`useCallback`과 `memo`에**대해 정리해주세요!
    
    또한 아래 공식문서 또한 읽어보시면서 부족한 내용을 보충해서 정리해주세요!
    
    https://react.dev/reference/react/useCallback
    
    https://react.dev/reference/react/memo
    
    </aside>
    
    - **`useCallabck`** 에 대하여 정리해주세요! 🍠
        - `useCallback` : 함수를 메모이제이션(memoization)함. dependencies가 바뀌지 않는 한, 같은 함수 참조를 유지함. 즉, 함수의 referential equality를 보장함
        - 사용하는 경우
            - 자식 컴포넌트에 props로 함수를 전달할 때
            - 렌더링 최적화를 위해 `React.memo` 와 함께 사용될 때
            - 이벤트 핸들러, 콜백 등 자주 재생성되면 안 되는 함수일 때
    - **`memo`**에 대하여 정리해주세요!🍠
        - `React.memo` 는 컴포넌트를 메모이제이션해서 props가 바뀌지 않으면 리렌더링을 막아주는 고차 컴포넌트(HCC)임.
        - props가 같다면 이전 렌더링 결과를 재사용함
        - React는 ===를 기준으로 비교함
- **`useMemo`**
  https://youtu.be/GdnfH_WH8pg?si=lILRTKG4hFOjqrYH
    <aside>
    🍠
    
    위의 영상을 보고 **`useMemo`**에 대해 정리해주세요!
    
    또한 아래 공식문서 또한 읽어보시면서 부족한 내용을 보충해서 정리해주세요!
    
    https://react.dev/reference/react/useMemo
    
    </aside>
    
    - **`useMemo`** 에 대하여 정리해주세요! 🍠
        - `useMemo` : 값을 메모이제이션해서, 의존성이 바뀌지 않으면 계산을 다시 하지 않고 이전 결과를 재사용하는 쪽임
        - 사용하는 경우
            - 계산 비용이 큰 함수 결과물 캐싱하고 싶을 때
            - 렌더링마다 다시 계산되면 안 되는 값이 있을 때
            - 객체, 배열, 함수 등의 참조를 고정하고 싶을 때 → `React.memo` 와 함께 사용
