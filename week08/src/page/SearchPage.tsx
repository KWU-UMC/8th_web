import '../index.css'
import {useState} from "react";
import {useQuery} from "@tanstack/react-query";
import type {LpRecordsResponse} from "../model/response/LpRecordsResponse.ts";
import client from "../util/client.ts";
import {LpsGrid} from "../ui/LpsGrid.tsx";

export const SearchPage = () => {
    const [keyword, setKeyword] = useState('')

    const {data} = useQuery<LpRecordsResponse>({
        queryKey: ['search', keyword],
        queryFn: async () => {
            const {data} = await client.get('/v1/lps', {
                params: {
                    search: keyword
                }
            })

            return data
        }
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
            data ? <LpsGrid lps={data.data.data} /> : <></>
        }
    </div>
}
