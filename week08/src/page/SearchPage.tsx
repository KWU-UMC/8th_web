import '../index.css'
import {useEffect, useRef, useState} from "react";
import {useInfiniteQuery} from "@tanstack/react-query";
import type {LpRecordsResponse} from "../model/response/LpRecordsResponse.ts";
import client from "../util/client.ts";
import {LpsGrid} from "../ui/LpsGrid.tsx";
import {useDebounce} from "../hooks/useDebounce.ts";
import {useThrottle} from "../hooks/useThrottle.ts";

export const SearchPage = () => {
    const [keyword, setKeyword] = useState('')
    const [scroll, setScroll] = useState<number>(0)
    const scrollRef = useRef<HTMLDivElement>(null)
    const debouncedKeyword = useDebounce(keyword, 1000)

    const {data, hasNextPage, fetchNextPage} = useInfiniteQuery<LpRecordsResponse>({
        queryKey: ['search', debouncedKeyword],
        queryFn: async ({pageParam}) => {
            const {data} = await client.get<LpRecordsResponse>('/v1/lps', {
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

    useEffect(() => {
        const scrollElement = scrollRef.current
        if (!scrollElement) return

        const handleScroll = () => {
            const scrollTop = scrollElement.scrollTop
            setScroll(scrollTop)
        }

        scrollElement.addEventListener('scroll', handleScroll)
        return () => scrollElement.removeEventListener('scroll', handleScroll)
    })

    useThrottle(scroll, () => fetchNextPage(), 1000)

    return <div ref={scrollRef} className="flex flex-col">
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
