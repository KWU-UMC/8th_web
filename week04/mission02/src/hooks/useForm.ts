import { ChangeEvent, useEffect, useState } from "react";

interface UseFormProps<T> {
  initialValue: T; // {email: "", password: ""}와 같은 형태
  //유효성 검사 함수
  //T에 대한 key값을 받아와서 해당 value가 올바른지 검사하는 함수
  //값이 올바른지 검사하고 에러메세지를 반환하는 함수
  validate: (value: T) => Record<keyof T, string>; //  //Record<"email" | "password", string> 와 같은 형태
  //keyof T는 T의 key값을 의미한다. 즉, {email: "", password: ""}와 같은 형태에서 email과 password를 의미한다.
  //key는 email과 password이고 value는 string인 객체를 의미한다.
  //Record는 key와 value의 타입을 지정할 수 있는 제네릭 타입이다.
}

function useForm<T>({ initialValue, validate }: UseFormProps<T>) {
  const [values, setValues] = useState(initialValue);
  const [touched, setTouched] = useState<Record<keyof T, boolean>>(
    {} as Record<keyof T, boolean> //초기값은 빈 객체로 설정
    //"처음엔 비어 있지만, 나중에 확실히 맞는 형태로 채워질 거야!"라는 의미로 타입 단언을 사용
  );
  //각 input의 touched 상태를 관리하는 state
  //touched는 각 input의 name을 key로 하고, 해당 input이 touched 상태인지 여부를 value로 가지는 객체이다.
  //즉, {email: true, password: false}와 같은 형태가 된다.
  const [errors, setErrors] = useState<Record<keyof T, string>>();
  //각 input의 에러메세지를 관리하는 state
  //errors는 각 input의 name을 key로 하고, 해당 input의 에러메세지를 value로 가지는 객체이다.
  //즉, {email: "이메일 에러", password: "비밀번호 에러"}와 같은 형태가 된다.

  //사용자가 입력 값을 바꿀 때마다 호출되는 함수
  //handleChange는 input의 name과 value를 받아와서 해당 input의 value를 변경하는 함수이다.
  const handleChange = (name: keyof T, text: string) => {
    setValues({
      ...values, //불변성 유지(기존 값 유지)
      [name]: text, //name에 해당하는 input의 value를 변경
    });
  };

  //input이 blur 되었을 때 호출되는 함수
  //handleBlur는 input의 name을 받아와서 해당 input의 touched 상태를 변경하는 함수이다.
  //즉, input이 blur 되었을 때 해당 input의 touched 상태를 true로 변경한다.
  //사용자가 touch한 input에 관해
  const handleBlur = (name: keyof T) => {
    setTouched({
      ...touched, //불변성 유지(기존 값 유지)
      [name]: true, //name에 해당하는 input의 touched 상태를 true로 변경
    });

    //getInputProps는 input의 name을 받아와서 해당 input의 value, onChange, onBlur를 반환하는 함수이다.
    //즉, input의 name에 해당하는 value, onChange, onBlur를 반환한다.
  };

  const getInputProps = (name: keyof T) => {
    const value = values[name]; //name에 해당하는 input의 value를 가져온다.
    const onChange = (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      handleChange(name, e.target.value);
    };
    const onBlur = () => handleBlur(name); //input이 blur 되었을 때 handleBlur 함수를 호출한다.
    return { value, onChange, onBlur }; //value, onChange, onBlur를 반환한다.
  };

  //이제 value가 변경될 때마다 validate 함수를 호출하여 에러메세지를 반환한다.
  //validate는 input의 value를 받아와서 해당 input의 에러메세지를 반환하는 함수이다.
  //{email : "이메일 에러", password: "비밀번호 에러"}와 같은 형태로 반환된다.
  //valuer가 변경될 때마다 validate 함수를 호출해야하니 useEffect를 사용한다.
  useEffect(() => {
    const newErrors = validate(values); //validate 함수를 호출하여 에러메세지를 반환한다.
    setErrors(newErrors); //에러메세지를 state에 저장한다.
  }, [validate, values]); //values가 변경될 때마다 validate 함수를 호출한다.

  return { values, errors, touched, getInputProps }; //values, errors, getInputProps를 반환한다.
}

export default useForm;
//useForm 훅을 사용하여 form을 관리하는 방법
