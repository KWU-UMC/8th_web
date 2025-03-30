import { createContext, PropsWithChildren, useContext, useState } from "react";

export enum THEME {
  LIGHT = "LIGHT",
  DARK = "DARK",
}
//미리 정해진 값들의 집합을 이름으로 관리
//테마 모드를 다루기 때문에 'LIGHT', 'DARK' 같은 문자열을 직접 쓰기보다는 THEME.LIGHT, THEME.DARK로 의미 있게 이름 붙여서 안전하게 관리

type TTheme = THEME.LIGHT | THEME.DARK;
//따로 TTheme type을 관리

interface IThemeContext {
  theme: TTheme;
  toggleTheme: () => void;
}
//Context에서 공유할 데이터의 "설계도(타입 정의서)" 역할
//createContext를 할 때 그 context에 들어갈 값의 타입을 명확하게 정의
//ThemeContext.Provider로 넘길 value는 반드시 이렇게 생겨야 함

export const ThemeContext = createContext<IThemeContext | undefined>(undefined);

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [theme, setTheme] = useState<TTheme>(THEME.LIGHT);
  //theme 상태(LIGHT or DARK)를 React state로 관리
  //이 상태는 전역으로 관리되어야 하기 때문에 Context를 통해 공유
  const toggleTheme = () => {
    setTheme(
      (prevTheme): THEME =>
        prevTheme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT
    );
  };
  //toggleTheme 함수는 theme 값을 반전시켜줌.
  //이 함수 역시 Context에 함께 넣어줌으로써, 어디서든 테마를 바꿀 수 있게 해줌.

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
  //ThemeContext에 위에서 만든 상태값과 함수를 담아서 전역적으로 공급해주는 우산 역할
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
