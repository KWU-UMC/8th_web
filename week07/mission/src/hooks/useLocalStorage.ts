export const useLocalStorage = (key: string) => {
    const setItem = (value: unknown) => {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.log(error);
      }
    };
  
    const getItem = () => {
      try {
        const value = localStorage.getItem(key);
        if (value) {
          return JSON.parse(value);
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    const removeItem = () => {
      try {
        localStorage.removeItem(key);
      } catch (error) {
        console.log(error);
      }
    };
  
    return { setItem, getItem, removeItem };
  };