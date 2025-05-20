import '../index.css'
import {useState} from "react";
import {useInfiniteQuery} from "@tanstack/react-query";
import type {LpRecordsResponse} from "../model/response/LpRecordsResponse.ts";
import client from "../util/client.ts";
import {LpsGrid} from "../ui/LpsGrid.tsx";

export const SearchPage = () => {
    const [keyword, setKeyword] = useState('')

    const {data, hasNextPage, fetchNextPage} = useInfiniteQuery<LpRecordsResponse>({
        queryKey: ['search', keyword],
        queryFn: async ({pageParam}) => {
            const {data} = await client.get('/v1/lps', {
                params: {
                    cursor: pageParam,
                    search: keyword
                }
            })

            return data
        },
        getNextPageParam: (response) => response.data.nextCursor ?? undefined,
        initialPageParam: 0
    })

    return <div className="flex flex-col">
        <div className="flex gap-x-4 p-2">
            <input
                className="border-2 flex-grow rounded-lg px-4"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="검색어..." />

            <button className="border-2 rounded-lg px-4 py-2">검색</button>
        </div>

        {
            data ? <LpsGrid lps={data.pages.map(page => page.data.data).flat()} /> : <></>
        }

        {
            hasNextPage ?
                <button
                    className="rounded-lg px-4 py-2 border-2 mt-4"
                    onClick={() => fetchNextPage()}
                >
                    Load More...
                </button> : <></>
        }
    </div>
}
