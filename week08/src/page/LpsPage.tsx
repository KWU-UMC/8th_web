import '../index.css'
import {useInfiniteQuery} from "@tanstack/react-query";
import type {LpRecordsResponse} from "../model/response/LpRecordsResponse.ts";
import client from "../util/client.ts";
import './LpsPage.css'
import {useState} from "react";
import CloseableDialog from "../ui/CloseableDialog.tsx";
import {LpsGrid} from "../ui/LpsGrid.tsx";

export const LpsPage = () => {
    const { data, error, isLoading, hasNextPage, fetchNextPage } = useInfiniteQuery<LpRecordsResponse>({
        queryKey: ['lps'],
        queryFn: async ({pageParam = 0}) => {
            const response = await client.get<LpRecordsResponse>(`${import.meta.env.VITE_API_BASE_URL}/v1/lps?cursor=${pageParam}`)
            return response.data
        },
        getNextPageParam: lastPage => lastPage.data.nextCursor ?? undefined,
        initialPageParam: 0
    })

    const [isCreateDialogVisible, setIsCreateDialogVisible] = useState(false)

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

        {
            isCreateDialogVisible ? <CloseableDialog onClickClose={() => setIsCreateDialogVisible(false)}>
                <div className="flex flex-col gap-y-8">
                    <input type="text" />
                    <input type="text" />
                    <input type="text" />
                </div>
            </CloseableDialog> : <></>
        }
    </div>
}
