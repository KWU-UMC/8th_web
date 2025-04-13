import { Outlet } from "react-router-dom";
import { NavBar } from "../components/Navbar";
import { useState } from "react";
import LanguageSelector from "../components/LanguageSelector";

const HomePage = () => {
  const [language, setLanguage] = useState<"ko-KR" | "en-US">("ko-KR");
  return (
    <div>
      <NavBar />
      <div className="flex justify-end p-4">
        <LanguageSelector language={language} onChange={setLanguage} />
      </div>
      {/* 자식 컴포넌트로 language 상태 전달 */}
      <Outlet context={{ language }} />
    </div>
  );
};
// Outlet은 부모 컴포넌트에서 자식 컴포넌트를 렌더링할 수 있게 해주는 컴포넌트
export default HomePage;
