import type {UserData, UserResponse} from "../../model/response/UserResponse.ts";
import {useInfiniteQuery, useQuery} from "@tanstack/react-query";
import client from "../../util/client.ts";
import {LpsGrid} from "../../ui/LpsGrid.tsx";
import type {LpRecordsResponse} from "../../model/response/LpRecordsResponse.ts";
import {useState} from "react";
import {SortSelector} from "../../ui/SortSelector.tsx";
import {FloatingButton} from "../../ui/FloatingButton.tsx";

const ProfileCard = ({profile}: {
    profile: UserData
}) => {
    return <div className="flex gap-4 rounded-xl bg-neutral-300 w-full p-4 items-center justify-center">
        <img src={profile.avatar ?? undefined} className="size-24 rounded-full bg-neutral-500" alt="author profile image"/>

        <div className="flex flex-col gap-2 justify-evenly">
            <span className="font-bold text-2xl">{profile.name}</span>
            <span>{profile.bio}</span>
            <span>{profile.email}</span>
        </div>
    </div>
}

export const MyPage = () => {
    const {data} = useQuery<UserResponse>({
        queryKey: ['user'],
        queryFn: async () => {
            const {data} = await client.get<UserResponse>('/v1/users/me')
            return data
        }
    })

    const [isAscending, setIsAscending] = useState(true)

    const {data: lps, hasNextPage, fetchNextPage} = useInfiniteQuery<LpRecordsResponse>({
        queryKey: ['lps', isAscending],
        queryFn: async ({pageParam = 0}) => {
            const response = await client.get<LpRecordsResponse>(`/v1/lps?cursor=${pageParam}&order=${isAscending ? 'asc' : 'desc'}`)
            return response.data
        },
        getNextPageParam: lastPage => lastPage.data.hasNext ? lastPage.data.nextCursor : undefined,
        initialPageParam: 0
    })

    return <div className="flex flex-col m-8">
        {data ? <ProfileCard profile={data.data} /> : <></>}

        <div className="flex justify-end my-4">
            <SortSelector sortAscending={isAscending} onSortChange={setIsAscending} />
        </div>

        <LpsGrid lps={lps?.pages?.map(page => page.data.data).flat() ?? []} />

        {hasNextPage ? <button className="p-4 border-2 self-center mt-4 rounded-lg" onClick={() => fetchNextPage()}>Load Next</button> : <></>}

        <FloatingButton>
            <span className="font-bold text-white text-4xl">+</span>
        </FloatingButton>
    </div>
}
