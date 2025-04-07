import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const usePagination = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const currentPage = Number(searchParams.get('page')) || 1;
    setPage(currentPage);
  }, [location.search]);

  const handlePageChange = (newPage: number) => {
    navigate(`?page=${newPage}`, { replace: false });
    setPage(newPage);
  };

  return { page, handlePageChange };
};