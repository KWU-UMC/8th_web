import { ChangeEvent, useState } from "react";
import { useDebounce } from "../utils/fnc";

export default function Find() {
  const [value, setValue] = useState<string>("");
  const debounceFnc = useDebounce(() => {
    console.log("debounce");
  }, 1000);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    debounceFnc();
  };

  return (
    <div className="w-full mt-10 flex justify-center items-center">
      <input
        className="bg-white color-black p-4"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}
