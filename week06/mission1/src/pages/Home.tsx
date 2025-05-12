import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

interface LP {
  id: number;
  title: string;
  thumbnail: string;
  createdAt: string;
  likes: unknown[]; // Replace with actual type if needed
}

const HomeContainer = styled.div`
  padding: 20px;
`;

const SortOptions = styled.div`
  margin-bottom: 20px;
  margin-top: 50px;
  select {
    padding: 8px;
    font-size: 14px;
  }
`;

const LPList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  width: 100%;
`;

const LPCard = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.03);
  }

  img {
    width: 100%;
    height: 220px;
    object-fit: cover;
    display: block;
    border-radius: 12px;
  }

  .overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: "black";
    color: white;
    padding: 12px;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover .overlay {
    opacity: 1;
  }
`;

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [sortOrder, setSortOrder] = useState<"latest" | "oldest">("latest");

  const {
    data = [],
    isLoading,
    isError,
    error,
  } = useQuery<LP[], Error>({
    queryKey: ["lps"],
    queryFn: async () => {
      const response = await axios.get(
        import.meta.env.VITE_SERVER_API_URL + "v1/lps"
      );
      return response.data.data.data;
    },
  });

  const sortedData = [...data].sort((a, b) => {
    return sortOrder === "latest"
      ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  });

  if (isLoading) {
    return (
      <HomeContainer>
        <p>Loading...</p>
      </HomeContainer>
    );
  }

  if (isError) {
    return (
      <HomeContainer>
        <p>Error: {error.message}</p>
      </HomeContainer>
    );
  }

  return (
    <HomeContainer>
      <SortOptions>
        <select
          onChange={(e) => setSortOrder(e.target.value as "latest" | "oldest")}
        >
          <option value="latest">최신순</option>
          <option value="oldest">오래된 순</option>
        </select>
      </SortOptions>
      <LPList>
        {sortedData.map((lp: LP) => (
          <LPCard key={lp.id} onClick={() => navigate(`/lp/${lp.id}`)}>
            <img src={lp.thumbnail} alt={lp.title} />
            <div className="overlay">
              <h3>{lp.title}</h3>
              <p>{new Date(lp.createdAt).toLocaleDateString()}</p>
              <p>좋아요 {lp.likes.length}</p>
            </div>
          </LPCard>
        ))}
      </LPList>
    </HomeContainer>
  );
};

export default Home;
