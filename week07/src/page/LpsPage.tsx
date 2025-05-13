import '../index.css'
import {LpRecord} from "../model/LpRecord.ts";
import {useInfiniteQuery} from "@tanstack/react-query";
import {LpRecordsResponse} from "../model/response/LpRecordsResponse.ts";
import {formatTime} from '../util/format.ts';
import {useNavigate} from "react-router-dom";
import client from "../util/client.ts";
import './LpsPage.css'

const LpsGrid = ({lps}: {
    lps: LpRecord[],
}) => {
    const navigate = useNavigate();

    return <div className="grid grid-cols-1 2xl:grid-cols-5 md:grid-cols-3 gap-x-4 gap-y-4 items-start">
        {
            lps.map(lp => {
                return <div
                    className="relative bg-neutral-300 rounded-xl w-full aspect-square hover:scale-150 hover:z-10 transition-transform duration-150 ease-in-out overflow-hidden group"
                    onClick={() => navigate(`/lp/${lp.id}`)}>
                    <img src={lp.thumbnail} alt="thumbnail" className="size-full bg-neutral-300 object-center object-cover animate-[blink_1s_ease-in-out_infinite]" />

                    <div className="flex flex-col absolute bottom-0 bg-gradient-to-b from-transparent to-neutral-800 size-full p-4 justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                        <p className="text-white font-bold line-clamp-3">{lp.title}</p>
                        <div className="flex justify-between">
                            <span className="text-neutral-200 text-sm">{formatTime(lp.createdAt)}</span>
                            <span className="text-neutral-200 text-sm">{lp.likes.length} Likes</span>
                        </div>
                    </div>
                </div>
            })
        }
    </div>
}

export const LpsPage = () => {
    const { data, error, isLoading, hasNextPage, fetchNextPage } = useInfiniteQuery<LpRecordsResponse>({
        queryKey: ['lps'],
        queryFn: async ({pageParam = 0}) => {
            const response = await client.get<LpRecordsResponse>(`${import.meta.env.VITE_API_BASE_URL}/v1/lps?cursor=${pageParam}`)
            return response.data
        },
        getNextPageParam: lastPage => lastPage.data.nextCursor ?? false,
        initialPageParam: 0
    })

    return <div className="flex flex-col mx-28">
        {
            isLoading ?
                <>Loading...</>
                : <></>
        }

        {
            error ?
                <>ERROR!</>
                : <></>
        }

        {
            data ?
                <LpsGrid lps={data.pages?.map(page => page.data.data).flat() ?? []} />
                : <></>
        }

        {
            hasNextPage ? <button className="p-4 border-2 self-center mt-4 rounded-lg" onClick={() => fetchNextPage()}>Load Next</button> : <></>
        }
    </div>
}
