type PageButtonProps = {
    page: number;
    setPage: (value: React.SetStateAction<number>) => void;
};

export const PageButton = ({page, setPage}: PageButtonProps) => {
    return(
        <div className="flex items-center justify-center gap-6 mt-5">
            <button
            className="bg-[#b2dab1] text-white px-3 py-2 roudned-lg shadow-md hover:bg=[#b2dab1]
            transition-all duration-200 disabled:bg-gray-300
            cursor-pointer"
            disabled={page === 1}
            onClick={() : void => setPage((prev: number) => prev -1)}>
            {`<`} </button>
            <span> {page} 페이지</span>
            <button
            className="bg-[#b2dab1] text-white px-3 py-2 roudned-lg shadow-md hover:bg=[#b2dab1]
            transition-all duration-200 cursor-pointer"
            onClick={() : void => setPage((prev: number) => prev + 1)}>
                {`>`}</button>
        </div>
    );
}