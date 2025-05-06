import { useState, useEffect, ChangeEvent, FocusEvent } from "react";

type FormOptions<T> = {
  initialValue: T;
  validate: (values: T) => Partial<Record<keyof T, string>>;
};

type Touched<T> = Partial<Record<keyof T, boolean>>;

export function useForm<T extends Record<string, any>>({
  initialValue,
  validate,
}: FormOptions<T>) {
  const [values, setValues] = useState<T>(initialValue);
  const [touched, setTouched] = useState<Touched<T>>({});
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  const handleChangeInput = (name: keyof T, value: string) => {
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBlur = (name: keyof T) => {
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  const getTextInputProps = (name: keyof T) => {
    return {
      name: name as string,
      value: values[name] ?? "",
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        handleChangeInput(name, e.target.value),
      onBlur: (e: FocusEvent<HTMLInputElement>) => handleBlur(name),
    };
  };

  useEffect(() => {
    const validationErrors = validate(values);
    setErrors(validationErrors);
  }, [values, validate]);

  return {
    values,
    errors,
    touched,
    getTextInputProps,
    handleChangeInput, 
    handleBlur, 
  };
}