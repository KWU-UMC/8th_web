import { NavLink } from "react-router-dom";
import styled from "styled-components";

const NavContainer = styled.nav`
  position: fixed;
  display: flex;
  gap: 20px;
  top: 10px;
  left: 10px;
  right: 10px;
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: gray;

  &.active {
    color: tomato;
    font-weight: bold;
  }
`;

const Navbar = () => {
  return (
    <NavContainer>
      <StyledNavLink to="/">홈</StyledNavLink>
      <StyledNavLink to="/popular">인기 영화</StyledNavLink>
      <StyledNavLink to="/upcoming">개봉 예정</StyledNavLink>
      <StyledNavLink to="/top-rated">평점높은</StyledNavLink>
      <StyledNavLink to="/now-playing">상영중</StyledNavLink>
    </NavContainer>
  );
};

export default Navbar;
