import { ChangeEvent } from "react";

interface Props {
  type: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

const InputField = ({ type, value, onChange, placeholder }: Props) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-4 py-2 mb-3 rounded-md bg-black border border-white-600 placeholder-white-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
    />
  );
};

export default InputField;