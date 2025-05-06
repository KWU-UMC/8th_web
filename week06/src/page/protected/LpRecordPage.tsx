import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {LpRecordResponse} from "../../model/response/LpRecordResponse.ts";
import client from "../../util/client.ts";
import {formatTime} from "../../util/format.ts";
import {LpRecordTag} from "../../model/LpRecord.ts";

const LpRecordTagUi = ({tag}: {
    tag: LpRecordTag
}) => {
    return <span className="rounded-xl bg-neutral-500 text-white px-4 py-1">
        {tag.name}
    </span>
}

export const LpRecordPage = () => {
    const {id} = useParams();

    const { data } = useQuery<LpRecordResponse>({
        queryKey: ['lpRecord', id],
        queryFn: async () => {
            const res = await client.get<LpRecordResponse>(`/v1/lps/${id}`)
            return res.data;
        },
    })

    return <div className="flex flex-col w-full p-4">
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
                            <img src={data?.data?.thumbnail ?? ''} className="absolute top-0 left-0 right-0 bottom-0 w-full border-4 border-black aspect-square rounded-full" alt="thumbnail" />
                            <div className="absolute rounded-full top-1/3 bottom-1/3 left-1/3 right-1/3 bg-white size-1/3 border-4 border-black" />
                        </div>
                    </div>
                </div>

                <span className="text-lg mt-16">{data?.data?.content}</span>

                <div className="mt-16">
                    {data?.data?.tags?.map(tag => {
                        return <LpRecordTagUi key={tag.id} tag={tag}/>
                    })}
                </div>

                <div className="flex gap-2 mt-16 self-center">
                    <span>LIKES</span>
                    <span>{data?.data?.likes?.length ?? 0}</span>
                </div>
            </div>
        </div>
    </div>
}
