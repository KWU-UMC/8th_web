import { useEffect, useState } from "react";

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  //value, delay가 변경될 때마다 실행
  //value: 디바운스할 값
  //delay: 디바운스 지연 시간 (밀리초 단위)
  //여기서 value의 타입을 제네릭 T로 설정하여, 이 훅이 다양한 타입의 값을 디바운스할 수 있도록 합니다.

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    //setTimeout (() => {}, delay) 함수는 delay 밀리초 후에 콜백 함수를 실행합니다.
    //여기서 콜백 함수는 setDebouncedValue(value)로, value를 debouncedValue로 설정합니다.
    //delay시간 후에 value가 변경되면, value가 debouncedValue로 업데이트됩니다.
    //이렇게 하면, value가 변경된 후 delay 시간 동안 추가적인 변경이 없을 때만 debouncedValue가 업데이트됩니다.

    return () => {
      clearTimeout(handler);
    };
    //unmount 시 타이머를 정리하기 위해 clearTimeout(handler)를 사용합니다.
    //이렇게 하면, 컴포넌트가 언마운트될 때 타이머가 정리되어 메모리 누수를 방지합니다.
    //이 함수는 컴포넌트가 언마운트되거나 value나 delay가 변경될 때 실행됩니다.
    //이렇게 하면, 이전 타이머가 취소되고 새로운 타이머가 설정됩니다.
  }, [value, delay]);
  //최종적으로 '잠시 기다린 후'의 값을 반환합니다.
  return debouncedValue;
}

export default useDebounce;
