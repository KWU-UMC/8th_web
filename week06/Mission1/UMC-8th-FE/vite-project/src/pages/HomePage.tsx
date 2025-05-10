import useGetLpList from "../hooks/queries/useGetLpList";

    // const{data, isPending, ... } = useQuery({
    //     queryKey: [QUERY_KEY.lps],
    //     queryFn: () => getLPList({}), 
    // });

const HomePage = () =>{

    const{data, isPending, isError} = useGetLpList({});

    return<div className="text-white">
        {data?.data.data.map((lp) => <h1>{lp.title}</h1>)}
    </div>
    ;
};

export default HomePage;