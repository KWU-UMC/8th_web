export default function UseLocalstorage() {
  return ({ key, value }: { key: string; value: string }) => {
    window.localStorage.setItem(key, value);
  };
}
