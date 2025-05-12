import { ChangeEvent, useEffect, useState } from "react";

interface UseFormProps<T> {
  initialValue: T; // {email: "", password: ""}와 같은 형태
  validate: (value: T) => Record<keyof T, string>;
}

function useForm<T>({ initialValue, validate }: UseFormProps<T>) {
  const [values, setValues] = useState(initialValue); //초기값을 state에 저장한다.
  const [touched, setTouched] = useState<Record<keyof T, boolean>>(
    {} as Record<keyof T, boolean> //초기값은 빈 객체로 설정
  );

  const [errors, setErrors] = useState<Record<keyof T, string>>();

  const handleChange = (name: keyof T, text: string) => {
    setValues({
      ...values, //불변성 유지(기존 값 유지)
      [name]: text, //name에 해당하는 input의 value를 변경
    });
  };
  //사용자가 입력값을 변경할 때마다 handleChange 함수를 호출한다.
  //handleChange는 제네릭 타입 T의 key 중 하나를 골라서, 해당 값만 바꿔주는 동적 상태 업데이트 함수다.
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
      console.log(e.target.value);
      handleChange(name, e.target.value);
    };
    const onBlur = () => handleBlur(name); //input이 blur 되었을 때 handleBlur 함수를 호출한다.
    return { value, onChange, onBlur }; //value, onChange, onBlur를 반환한다.
  };

  useEffect(() => {
    const newErrors = validate(values); //validate 함수를 호출하여 에러메세지를 반환한다.
    setErrors(newErrors); //에러메세지를 state에 저장한다.
  }, [validate, values]); //values가 변경될 때마다 validate 함수를 호출한다.

  return { values, errors, touched, getInputProps }; //values, errors, getInputProps를 반환한다.
}

export default useForm;
//useForm 훅을 사용하여 form을 관리하는 방법
