import {useParams} from "react-router-dom";
import {useInfiniteQuery, useQuery} from "@tanstack/react-query";
import type {LpRecordResponse} from "../../model/response/LpRecordResponse.ts";
import client from "../../util/client.ts";
import {formatTime} from "../../util/format.ts";
import type {CommentsResponse} from "../../model/response/CommentsResponse.ts";
import {SortSelector} from "../../ui/SortSelector.tsx";
import {useState} from "react";
import {LpRecordTagUi} from "../../ui/LpRecordTag.tsx";

const CommentList = ({id}: {
    id: number
}) => {
    const [isSortAscending, setIsSortAscending] = useState(true)

    const {data, hasNextPage, fetchNextPage} = useInfiniteQuery<CommentsResponse>({
        queryKey: ['comments', id, isSortAscending],
        queryFn: async ({pageParam = 0}) => {
            const response = await client.get<CommentsResponse>(`/v1/lps/${id}/comments?cursor=${pageParam}&order=${isSortAscending ? 'asc' : 'desc'}`)
            return response.data
        },
        getNextPageParam: lastPage => lastPage.data.hasNext ? lastPage.data.nextCursor : undefined,
        initialPageParam: 0
    })

    return <div className="flex flex-col gap-y-4 rounded-xl bg-neutral-300 w-full p-4">
        <div className="flex justify-between items-center">
            <span className="font-bold text-lg">댓글</span>

            <SortSelector sortAscending={isSortAscending} onSortChange={setIsSortAscending}/>
        </div>

        {data?.pages.map(page => page.data.data).flat().map(comment => {
            return <div key={comment.id} className="flex gap-4 items-center">
                <img src={comment.author.avatar ?? ''} className="size-8 rounded-full" alt="author profile image"/>
                <div className="flex flex-col gap-2">
                    <span className="font-bold">{comment.author.name}</span>
                    <span>{comment.content}</span>
                </div>
            </div>
        })}

        {hasNextPage ?
            <button className="p-4 border-2 self-center mt-4 rounded-lg" onClick={() => fetchNextPage()}>
                Load Next
            </button> : <></>}

    </div>
}

export const LpRecordPage = () => {
    const {id} = useParams()

    const { data } = useQuery<LpRecordResponse>({
        queryKey: ['lpRecord', id],
        queryFn: async () => {
            const res = await client.get<LpRecordResponse>(`/v1/lps/${id}`)
            return res.data;
        },
    })

    const idInt = parseInt(id ?? '-1')

    return <div className="flex flex-col w-full p-4 gap-y-8">
        <div className="bg-neutral-300 w-full p-4 rounded-xl">
            <div className="flex flex-col gap-4 px-48 justify-center">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <img src={data?.data?.author?.avatar ?? ''} className="size-8 rounded-full" alt="author profile image"/>
                        <span className="font-bold">{data?.data?.author?.name}</span>
                    </div>

                    <span className="text-gray-800">{formatTime(data?.data?.createdAt ?? '')}</span>
                </div>

                <div className="flex justify-between items-center">
                    <span className="font-bold text-lg">{data?.data?.title}</span>

                    <div className="flex gap-2">
                        <button>EDIT</button>
                        <button>DEL</button>
                    </div>
                </div>

                <div className="w-full rounded-xl px-[30%] mt-16">
                    <div className="bg-neutral-200 p-[20%]">
                        <div className="relative pb-[100%]">
                            <img src={data?.data?.thumbnail ?? ''} className="absolute top-0 left-0 right-0 bottom-0 w-full border-4 border-black aspect-square rounded-full object-cover object-center" alt="thumbnail" />
                            <div className="absolute rounded-full top-1/3 bottom-1/3 left-1/3 right-1/3 bg-white size-1/3 border-4 border-black" />
                        </div>
                    </div>
                </div>

                <span className="text-lg mt-16">{data?.data?.content}</span>

                <div className="mt-16">
                    {data?.data?.tags?.map(tag => {
                        return <LpRecordTagUi key={tag.id} tagName={tag.name}/>
                    })}
                </div>

                <div className="flex gap-2 mt-16 self-center">
                    <span>LIKES</span>
                    <span>{data?.data?.likes?.length ?? 0}</span>
                </div>
            </div>
        </div>

        <CommentList id={idInt} />
    </div>
}
