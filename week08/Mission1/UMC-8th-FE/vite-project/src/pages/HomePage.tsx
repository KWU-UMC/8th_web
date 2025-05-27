 import { useEffect, useState } from "react";
import { PAGINATION_ORDER } from "../enums/common";
import useGetInifiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import {useInView} from "react-intersection-observer";
import LpCard from "../components/LpCard/LpCard";
import LpCardSkeletonList from "../components/LpCard/LpCardSkeletonList";
import AddLpModal from "../components/AppLpModal";
import useDebounce from "../hooks/useDebounce";
import { SEARCH_DELAY } from "../constants/delay";
import { useLocation, useSearchParams } from "react-router-dom";

//import { Plus } from "lucide-react"; // 아이콘 라이브러리 사용 (원하면 다른거 써도 OK)
    // const{data, isPending, ... } = useQuery({
    //     queryKey: [QUERY_KEY.lps],
    //     queryFn: () => getLPList({}), 
    // });

const HomePage = () =>{
    // const location = useLocation();
    const [searchParams] = useSearchParams();
    const keywordFromQuery = searchParams.get("keyword") || "";

    const [search, setSearch] = useState(keywordFromQuery);
    const [order, setOrder] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.desc);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const debouncedValue = useDebounce(keywordFromQuery, SEARCH_DELAY);

    const{data: lps, isFetching, hasNextPage, fetchNextPage, isError} 
        = useGetInifiniteLpList(10, debouncedValue, order);
    //ref, inView
    //ref -> 특정한 HTM 요소를 감시할 수 있ㅇㅁ
    //inView: 그 요소가 화면에 보이면 true, 아니면 false
    const{ref, inView} = useInView({
        threshold: 0,
    });


    console.log(ref);

    useEffect(()=>{
        if(inView&& hasNextPage && !isFetching){
            fetchNextPage();
        }

    }, [inView, isFetching, hasNextPage, fetchNextPage]);

    useEffect(() => {
    window.scrollTo({ top: 0 });
    }, [order, search]);
    
    if(!lps && isFetching){
        return<LpCardSkeletonList count={10}/>
    }
    if(isError){
        return <div className="text-white">Error..</div>
    }


    //h-dvh flex flex-col
    return(
        <div className="container mx-auto px-4">
            <input value={search} onChange={(e) => setSearch(e.target.value)}/>
            
            <div className="flex justify-end gap-2 mb-4">
                <button
                    onClick={() => setOrder(PAGINATION_ORDER.asc)}
                    className={`px-4 py-1 rounded-md border ${
                        order === PAGINATION_ORDER.asc
                            ? "bg-white text-black"
                            : "bg-black text-white"
                        }`}
                    >
                    오래된순
                </button>
                <button
                    onClick={() => setOrder(PAGINATION_ORDER.desc)}
                    className={`px-4 py-1 rounded-md border ${
                    order === PAGINATION_ORDER.desc
                        ? "bg-white text-black"
                        : "bg-black text-white"
                        }`}
                    >
                    최신순
                </button>
            </div>
            <div className={"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"}>
                {lps?.pages?.map((page) => page.data.data)
                ?.flat()
                ?.map((lp)=> <LpCard key={lp.id} lp={lp}/>)}
                {isFetching && <LpCardSkeletonList count={5}/>}
            </div>
            <div ref={ref} className="h-2"></div>

            {isModalOpen && <AddLpModal onClose={() => setIsModalOpen(false)} />}
            
            <button
                className="fixed bottom-6 right-6 bg-pink-500 hover:bg-pink-600 text-white rounded-full w-14 h-14 flex items-center justify-center text-3xl shadow-lg z-50"
                onClick={() => setIsModalOpen(true)}
            >
                +
            </button>
        </div>
    )
    ;
};

export default HomePage;