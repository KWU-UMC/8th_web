- **`Debounce`** 구글링 후 개념 정리 및 코드 작성해보기 🍠

  - **`Debounce`** 개념 정리 🍠
    Debouncing is a technique that delays the execution of a function until the user stops performing a certain action for a specified amount of time. For example, if you have a search bar that fetches suggestions from the backend as the user types, you can debounce the function that makes the API call, so that it only runs after the user stops typing for a few seconds. This way, you can avoid making too many API calls that might overload your server or return irrelevant results.
  - **`Debounce`** 코드 작성 🍠
    function searchHandler(query) {
    getSearchResults(query);
    }
    function debounce(func, delay) {
    let timer;
    return function(…args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
    func.apply(this, args);
    }, delay);
    };
    }
    const debouncedSearchHandler = debounce(searchHandler, 500);
    searchBar.addEventListener("input", (event) => {
    const query = event.target.value;
    debouncedSearchHandler(query);
    });

    ```

    ```

- **`Throttling`** 구글링 후 개념 정리 및 코드 작성해보기 🍠

  - **`Throttling`** 개념 정리 🍠
    Throttling is a technique that limits the execution of a function to once in every specified time interval. For example, if you have a resize event handler that adjusts the layout of your page, you can throttle the function that updates the layout, so that it only runs once every **100ms**. This way, you can avoid running your code too frequently, which might cause janky user interface or high CPU usage.
  - **`Throttling`** 코드 작성 🍠
    function updateLayout() {
    // Update layout logic
    }
    function throttle(func, interval) {
    let isRunning = false;
    return function(…args) {
    if (!isRunning) {
    isRunning = true;
    func.apply(this, args);
    setTimeout(() => {
    isRunning = false;
    }, interval);
    }
    };
    }
    const throttledUpdateLayout = throttle(updateLayout, 100);
    window.addEventListener("resize", () => {
    throttledUpdateLayout();
    });

    ```

    ```
