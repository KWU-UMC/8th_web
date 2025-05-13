import React, { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f3f4f6;
`;

const FormCard = styled.form`
  background: #ffffff;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 16px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 1rem;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 4px;
  background-color: #3b82f6;
  color: #ffffff;
  font-size: 1rem;
  cursor: pointer;
`;

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    localStorage.setItem("token", "jwt-token");
    navigate("/protected");
  };

  return (
    <Container>
      <FormCard onSubmit={handleSubmit}>
        <Title>로그인</Title>
        <Input type="text" placeholder="Email" />
        <Input type="text" placeholder="Password" />
        <Button type="submit">로그인</Button>
      </FormCard>
    </Container>
  );
};

export default LoginPage;
