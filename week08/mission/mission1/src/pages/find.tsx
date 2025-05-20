import { ChangeEvent, useState } from "react";
import { useDebounce } from "../utils/fnc";
import { lpWithTag } from "../apis/lpapi";

export default function Find() {
  const debounceFnc = useDebounce(async (tag: string) => {
    const lps = await lpWithTag({ tag });
    console.log(lps?.data);
  }, 1000);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    debounceFnc(e.target.value);
  };

  return (
    <div className="w-full mt-10 flex justify-center items-center">
      <input className="bg-white color-black p-4" onChange={handleChange} />
    </div>
  );
}
