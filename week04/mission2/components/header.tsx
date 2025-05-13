import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const HeaderContainer = styled.div`
  position: fixed;
  width: 100%;
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

const Header = () => {
  const navigate = useNavigate();

  return (
    <HeaderContainer>
      <h2>돌려돌려 LP판</h2>
      <ButtonBox>
        <LoginButton onClick={() => navigate("/login")}>로그인</LoginButton>
        <SignUpButton onClick={() => navigate("/signup")}>
          회원가입
        </SignUpButton>
      </ButtonBox>
    </HeaderContainer>
  );
};

export default Header;
