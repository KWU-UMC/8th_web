import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const HeaderContainer = styled.div`
  width: 100%;
  position: absolute;
  box-sizing: border-box;
  top: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;

  h2 {
    color: #ff00ff;
  }
`;

const ButtonBox = styled.div`
  display: flex;
  height: 50px;
  margin-left: 20px;
  gap: 5px;
`;

const LoginButton = styled.button`
  background-color: black;
  color: white;
`;

const SignUpButton = styled.button`
  background-color: #ff00ff;
  color: white;
`;

const LogoutButton = styled.button`
  background-color: black;
  color: white;
`;

const Header = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user_name");
    if (storedUser) {
      setUsername(storedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user_name");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setUsername(null);
    navigate("/");
  };

  return (
    <HeaderContainer>
      <h2>돌려돌려 LP판</h2>
      <ButtonBox>
        {username ? (
          <>
            <span style={{ color: "white", lineHeight: "50px" }}>
              {username}님 반갑습니다
            </span>
            <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
          </>
        ) : (
          <>
            <LoginButton onClick={() => navigate("/login")}>로그인</LoginButton>
            <SignUpButton onClick={() => navigate("/signup")}>
              회원가입
            </SignUpButton>
          </>
        )}
      </ButtonBox>
    </HeaderContainer>
  );
};

export default Header;
