import { useEffect, useRef } from "react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchInput = ({ value, onChange, placeholder }: SearchInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="relative w-full max-w-md">
      <input
        ref={inputRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") inputRef.current?.blur();
        }}
        placeholder={placeholder ?? "검색어를 입력하세요..."}
        className="w-full border-4 border-gray-300 rounded-xl p-3 text-lg focus:outline-none focus:border-blue-500"
      />
      {value && (
        <button
          className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
          onClick={() => onChange("")}
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default SearchInput;
// SearchInput 컴포넌트는 검색어를 입력받는 인풋 필드와 검색어를 지우는 버튼을 포함합니다.
// value: 검색어 상태
// onChange: 검색어 상태를 업데이트하는 함수
// placeholder: 인풋 필드의 플레이스홀더 텍스트
//
// useRef 훅을 사용하여 인풋 필드에 포커스를 설정하고, Enter 키를 누르면 인풋 필드에서 포커스를 해제합니다.
// 인풋 필드에 검색어가 있을 경우, 오른쪽 상단에 ✕ 버튼을 표시하여 검색어를 지울 수 있도록 합니다.
