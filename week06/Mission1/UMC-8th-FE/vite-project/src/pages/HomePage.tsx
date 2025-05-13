import { useEffect, useState } from "react";
import { PAGINATION_ORDER } from "../enums/common";
import useGetInifiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import {useInView} from "react-intersection-observer";
import LpCard from "../components/LpCard/LpCard";
import LpCardSkeletonList from "../components/LpCard/LpCardSkeletonList";

    // const{data, isPending, ... } = useQuery({
    //     queryKey: [QUERY_KEY.lps],
    //     queryFn: () => getLPList({}), 
    // });

const HomePage = () =>{
    const [search, setSearch] = useState("");
    const [order, setOrder] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.desc);
    const{data: lps, isFetching, hasNextPage, fetchNextPage, isError} 
        = useGetInifiniteLpList(10, search, order);
    


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
    
    if(isFetching){
        return<div className="flex justify-center items-center h-full w-full text-white"> Loading..</div>
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
        </div>
    )
    ;
};

export default HomePage;