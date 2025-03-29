import styled from "styled-components";

export const Layout = styled.div`
  background-color: rgb(231, 231, 231);
  font-family: 'Roboto', sans-serif;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 350px;
  text-align: center;
`;

export const Header = styled.h1`
  font-size: 25px;
  margin-bottom: 15px;
`;

export const Form = styled.form`
  display: flex;
  gap: 15px;
  margin-bottom: 15px;
  justify-content: space-between;
`;

export const Input = styled.input`
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 15px;
`;

export const Btn = styled.button`
  background-color: #009229;
  color: white;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #018526;
  }
`;

export const ListContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 25px;
  justify-content: center;
  align-items: flex-start;
`;

export const ListSection = styled.div`
  width: 100%;
  text-align: left;
`;

export const Title = styled.h2`
  font-size: 15px;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
`;

export const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  padding: 12px;
  margin-bottom: 10px;
  border-radius: 6px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

export const CompleteButton = styled.button`
  padding: 6px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;
  background: #009229;
  color: white;

  &:hover {
    background: #018526;
  }
`;

export const DeleteButton = styled.button`
  padding: 6px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;
  background: #dc3545;
  color: white;

  &:hover {
    background: #c82333;
  }
`;