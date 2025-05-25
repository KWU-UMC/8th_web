- **`Debounce`** 구글링 후 개념 정리 및 코드 작성해보기 🍠

  - **`Debounce`** 개념 정리 🍠

    이벤트가 발생한 후 일정 시간 동안 추가 이벤트가 없을 때만 이벤트 핸들러를 실행되는데 사용

    연이어 호출되는 함수들 중에서 이전 이벤트를 무시하고 마지막 함수만을 호출

    이벤트 발생 빈도를 최소화할 목적으로 사용

    검색 추천, 텍스트 필드 자동 저장 및 버튼 연속 클릭 제거 등의 기능을 구현할 때 사용하면 좋음

  - **`Debounce`** 코드 작성 🍠

    ```python
    function debounce(fn: () => void, delay: number) {
      let timer: ReturnType<typeof setTimeout>;
      return () => {
        clearTimeout(timer);
        timer = setTimeout(fn, delay);
      };
    }

    const handleInput = debounce(() => {
      console.log("검색 실행");
    }, 500);
    ```

- **`Throttling`** 구글링 후 개념 정리 및 코드 작성해보기 🍠

  - **`Throttling`** 개념 정리 🍠

    일정 시간 동안 이벤트 핸들러를 한 번만 실행하도록 제어

    연이어 호출되는 함수들 중에서 첫 번째 함수만을 호출하여 주어진 시간 동안 후속 이벤트를 무시

    수시로 발생하는 이벤트를 일정한 간격으로 처리하려는 목적으로 사용

    스크롤 이벤트나 마우스 움직임 이벤트와 같은 이벤트가 연속으로 실행되는 곳에 사용하면 좋음

  - **`Throttling`** 코드 작성 🍠

    ```python
    function throttle(fn: () => void, limit: number) {
      let lastCall = 0;
      return () => {
        const now = Date.now();
        if (now - lastCall >= limit) {
          fn();
          lastCall = now;
        }
      };
    }

    const handleScroll = throttle(() => {
      console.log("스크롤 처리");
    }, 1000);
    ```

---
