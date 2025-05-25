import { ChangeEvent, useEffect, useState } from "react";

//함수의 규격을 정하기
interface UseFormProps<T>{
    initialValue: T,

    //값이 올바른지 검증하는 함수
    validate: (values: T) => Record<keyof T, string>;
}

function useForm<T>({initialValue, validate}: UseFormProps<T>){
    const [values, setValues] = useState(initialValue);
    //touch 관리자
    const [touched, setTouched] = useState<Record<string,boolean>>();
    const [errors, setErrors] = useState<Record<string,string>>();

    //사용자가 입력값을 바꿀 때 실행되는 함수이다.
    const handleChange = (name: keyof T, text: string) => {
        setValues({
            ...values, //불변성 유지 (기존 값 유지)
            [name]: text,
        });
    };

    const handleBlur = (name: keyof T) => {
        setTouched({
            ...touched, //불변성 유지 (기존 값 유지)
            [name]: true,
        });
    };

    //이메일 인풋, 패스워트 인풋, 속성들을 좀 가져오는 것
    const getInputProps = (name: keyof T) => {
        const value : T[keyof T] = values[name];

        const onChange = (
            e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        )=> handleChange(name, e.target.value);

        const onBlur = () => handleBlur(name);

        return {value, onChange, onBlur};
    };
    
    //values가 변경될 대 마다 에러 검증 로직 실행하기
    useEffect(() => {
        const newErrors = validate(values);
        setErrors(newErrors);
    }, [validate, values]);

    return {values, errors, touched, getInputProps};
}

export default useForm;