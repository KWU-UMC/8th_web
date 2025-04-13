type Language = "ko-KR" | "en-US";

interface LanguageSelectorProps {
  language: Language;
  onChange: (lang: Language) => void;
}

export default function LanguageSelector({
  language,
  onChange,
}: LanguageSelectorProps) {
  return (
    <select
      value={language}
      onChange={(e) => onChange(e.target.value as Language)}
      className="border border-gray-300 rounded-md px-2 py-1"
    >
      <option value="ko-KR">한국어</option>
      <option value="en-US">English</option>
    </select>
  );
}
