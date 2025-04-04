interface PageButtonPropI {
  currentPage: number;
  totalPage: number;
  setPageTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function Pagebutton({
  currentPage,
  totalPage,
  setPageTrigger,
  setPage,
}: PageButtonPropI) {
  const handlePrevPage = () => {
    if (currentPage === 1) return;
    setPage((prev) => prev - 1);
    setPageTrigger((prev) => !prev);
  };
  const handleNextPage = () => {
    if (currentPage === totalPage) return;
    setPage((prev) => prev + 1);
    setPageTrigger((prev) => !prev);
  };

  return (
    <div className="flex justify-center items-center gap-4 mb-4">
      <button
        onClick={handlePrevPage}
        className={`text-lg ${
          currentPage === 1 ? "opacity-10" : "cursor-pointer"
        }`}
      >
        ◀︎
      </button>
      <p className="text-lg font-bold">{`${currentPage} / ${totalPage}`}</p>
      <button
        onClick={handleNextPage}
        className={`text-lg ${
          currentPage === totalPage ? "opacity-10" : "cursor-pointer"
        }`}
      >
        ▶︎
      </button>
    </div>
  );
}
