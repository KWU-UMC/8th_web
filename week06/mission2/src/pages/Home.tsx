import React, { useState, useRef, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

interface LP {
  id: number;
  title: string;
  thumbnail: string;
  createdAt: string;
  likes: unknown[];
}

const HomeContainer = styled.div`
  padding: 20px;
  min-height: 150vh;
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
    background: rgba(0, 0, 0, 0.5);
    color: white;
    padding: 12px;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover .overlay {
    opacity: 1;
  }
`;

const SkeletonCard = styled.div`
  width: 100%;
  height: 220px;
  background: #eee;
  border-radius: 12px;
  animation: pulse 1.5s infinite;

  @keyframes pulse {
    0% {
      background-color: #eee;
    }
    50% {
      background-color: #ddd;
    }
    100% {
      background-color: #eee;
    }
  }
`;

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [sortOrder, setSortOrder] = useState<"latest" | "oldest">("latest");
  const observerRef = useRef<HTMLDivElement | null>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ["lps", sortOrder],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_API_URL}v1/lps?page=${pageParam}`
      );
      return res.data.data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.nextPage ?? 1;
    },
  });

  const flatData: LP[] = data?.pages.flatMap((page: any) => page.data) ?? [];

  useEffect(() => {
    if (!observerRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(observerRef.current);

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [hasNextPage, fetchNextPage]);

  const sortedData = [...flatData].sort((a, b) =>
    sortOrder === "latest"
      ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  if (isLoading) {
    return (
      <HomeContainer>
        <SortOptions>
          <select disabled>
            <option>로딩 중...</option>
          </select>
        </SortOptions>
        <LPList>
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </LPList>
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
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as "latest" | "oldest")}
        >
          <option value="latest">최신순</option>
          <option value="oldest">오래된 순</option>
        </select>
      </SortOptions>
      <LPList>
        {sortedData.map((lp) => (
          <LPCard key={lp.id} onClick={() => navigate(`/lp/${lp.id}`)}>
            <img src={lp.thumbnail} alt={lp.title} />
            <div className="overlay">
              <h3>{lp.title}</h3>
              <p>{new Date(lp.createdAt).toLocaleDateString()}</p>
              <p>좋아요 {lp.likes.length}</p>
            </div>
          </LPCard>
        ))}
        {isFetchingNextPage &&
          Array.from({ length: 3 }).map((_, i) => (
            <SkeletonCard key={`skeleton-${i}`} />
          ))}
      </LPList>
      <div ref={observerRef} style={{ height: "1px" }} />
    </HomeContainer>
  );
};

export default Home;
