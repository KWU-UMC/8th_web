type Props = {
    type: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void; 
    placeholder?: string;
};
  
const InputField = ({ type, name, value, onChange, onBlur, placeholder }: Props) => {
    return (
      <input
        type={type}
        name={name} 
        value={value}
        onChange={onChange}
        onBlur={onBlur} 
        placeholder={placeholder}
        className="w-full px-3 py-2 mb-3 rounded-md bg-neutral-900 text-white border border-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    );
};
  
export default InputField;