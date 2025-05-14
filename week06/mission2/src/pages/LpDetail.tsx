import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import styled from "styled-components";

interface LP {
  id: number;
  title: string;
  thumbnail: string;
  content: string;
  createdAt: string;
  likes: unknown[];
  author: {
    name: string;
    avatar: string;
  };
}

const Container = styled.div`
  width: 80%;
  margin: 60px auto;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  color: white;
`;

const Thumbnail = styled.img`
  width: 100%;
  height: auto;
  border-radius: 12px;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 28px;
  margin-bottom: 16px;
  color: white;
`;

const Meta = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
`;

const AuthorAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const Content = styled.p`
  line-height: 1.6;
  color: white;
`;

const Info = styled.div`
  margin-top: 24px;
  font-size: 14px;
  color: white;
`;

const LpDetail: React.FC = () => {
  const { lpId } = useParams();

  const { data, isLoading, isError, error } = useQuery<LP, Error>({
    queryKey: ["lp", lpId],
    queryFn: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_API_URL}v1/lps/${lpId}`
      );
      return response.data.data;
    },
    enabled: !!lpId,
  });
  console.log(data);

  if (isLoading) return <Container>로딩 중...</Container>;
  if (isError) return <Container>에러: {error.message}</Container>;

  return (
    <Container>
      {data && (
        <>
          <Thumbnail src={data.thumbnail} alt={data.title} />
          <Title>{data.title}</Title>
          <Meta>
            <AuthorAvatar src={data.author.avatar} alt={data.author.name} />
            <AuthorInfo>
              <span>{data.author.name}</span>
              <span>{new Date(data.createdAt).toLocaleDateString()}</span>
            </AuthorInfo>
          </Meta>
          <Content>{data.content}</Content>
          <Info>좋아요 수: {data.likes.length}</Info>
        </>
      )}
    </Container>
  );
};

export default LpDetail;
