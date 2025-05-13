import React from "react";

const MyPage: React.FC = () => {
  const name = localStorage.getItem("user_name");

  return (
    <div>
      <h2>마이페이지</h2>
      {name ? (
        <p>
          환영합니다, <strong>{name}</strong>님!
        </p>
      ) : (
        <p>사용자 정보를 불러오는 중...</p>
      )}
    </div>
  );
};

export default MyPage;
