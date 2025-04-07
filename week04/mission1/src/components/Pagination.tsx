import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
}) => {
    return (
      <div className="flex justify-center gap-4 mt-8 fixed bottom-20 w-full">
        <button
          className={`px-4 py-2 text-white bg-lime-200 rounded disabled:opacity-50 
            ${currentPage === 1 ? 'cursor-not-allowed' : 'hover:bg-red-400'}`}
          disabled={currentPage === 1}
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        >
          &lt;
        </button>
  
        <span className="text-white text-lg flex items-center">
          {currentPage} 페이지
        </span>
  
        <button
          className={`px-4 py-2 text-white bg-lime-200 rounded disabled:opacity-50 
            ${currentPage === totalPages ? 'cursor-not-allowed' : 'hover:bg-red-400'}`}
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        >
          &gt;
        </button>
      </div>
    );
};
  
export default Pagination;