import type {UserData, UserResponse} from "../../model/response/UserResponse.ts";
import {useInfiniteQuery, useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import client from "../../util/client.ts";
import {LpsGrid} from "../../ui/LpsGrid.tsx";
import type {LpRecordsResponse} from "../../model/response/LpRecordsResponse.ts";
import {useState} from "react";
import {SortSelector} from "../../ui/SortSelector.tsx";
import {FloatingButton} from "../../ui/FloatingButton.tsx";
import CloseableDialog from "../../ui/CloseableDialog.tsx";
import {useForm} from "react-hook-form";
import {LpRecordTagUi} from "../../ui/LpRecordTag.tsx";

type FormData = {
    title: string
    content: string
    tags: string[]
}

type ProfileFormData = {
    name: string
    bio: string
}

const ProfileCard = ({profile}: {
    profile: UserData
}) => {
    const [isEditing, setIsEditing] = useState(false)
    const queryClient = useQueryClient()
    const {register, handleSubmit, reset, watch} = useForm<ProfileFormData>({
        defaultValues: {
            name: profile.name,
            bio: profile.bio ?? ''
        }
    })

    const profileUpdateMutation = useMutation({
        mutationFn: async (formData: ProfileFormData) => {
            const response = await client.patch('/v1/users', {
                name: formData.name,
                bio: formData.bio,
            })
            return response.data
        },
        onMutate: async (formData) => {
            const previousData = queryClient.getQueryData<UserResponse>(['user'])

            if (previousData) {
                queryClient.setQueryData<UserResponse>(['user'], {
                    ...previousData,
                    data: {
                        ...previousData.data,
                        name: formData.name,
                        bio: formData.bio
                    }
                })
            }

            return { previousData }
        },
        onError: (err, newData, context) => {
            if (context?.previousData) {
                queryClient.setQueryData(['user'], context.previousData)
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['user'] })
            setIsEditing(false)
        }
    })

    const onSubmit = (data: ProfileFormData) => {
        profileUpdateMutation.mutate(data)
    }

    if (isEditing) {
        return <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 rounded-xl bg-neutral-300 w-full p-4">
            <div className="flex gap-4 items-start">
                <div className="flex flex-col items-center gap-2">
                    <img src={profile.avatar || undefined} className="size-24 rounded-full bg-neutral-500 object-cover" alt="author profile image"/>
                </div>
                <div className="flex flex-col gap-2 grow">
                    <input {...register('name')} placeholder="Name" className="w-full p-2 rounded font-bold text-2xl bg-transparent border-2 border-neutral-400"/>
                    <textarea {...register('bio')} placeholder="Bio" className="w-full p-2 rounded bg-transparent border-2 border-neutral-400" rows={3}/>
                </div>
            </div>
            <div className="flex gap-2 self-end">
                <button type="submit" disabled={profileUpdateMutation.isPending} className="border-2 font-bold py-2 px-4 rounded">
                    Save
                </button>
                <button type="button" onClick={() => {
                    setIsEditing(false)
                    reset({name: profile.name, bio: profile.bio ?? ''})
                }} className="border-2 font-bold py-2 px-4 rounded">
                    Cancel
                </button>
            </div>
        </form>
    }

    return <div className="flex gap-4 rounded-xl bg-neutral-300 w-full p-4 items-center">
        <img src={profile.avatar ?? undefined} className="size-24 rounded-full bg-neutral-500 object-cover" alt="author profile image"/>

        <div className="flex flex-col gap-2 justify-evenly grow">
            <span className="font-bold text-2xl">{profile.name}</span>
            <span>{profile.bio}</span>
            <span>{profile.email}</span>
        </div>
        <button onClick={() => setIsEditing(true)} className="border-2 font-bold py-2 px-4 rounded self-start">
            Edit
        </button>
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

    const mutation = useMutation({
        mutationFn: async (formData: FormData) => {
            const response = await client.post('/v1/lps', {
                title: formData.title,
                content: formData.content,
                tags: formData.tags,
                published: true,
                thumbnail: null // TODO
            })
            return response.data
        }
    })

    const [isAscending, setIsAscending] = useState(true)
    const [showAddLpDDialog, setShowAddLpDialog] = useState(false)

    const {data: lps, hasNextPage, fetchNextPage} = useInfiniteQuery<LpRecordsResponse>({
        queryKey: ['lps', isAscending],
        queryFn: async ({pageParam = 0}) => {
            const response = await client.get<LpRecordsResponse>(`/v1/lps?cursor=${pageParam}&order=${isAscending ? 'asc' : 'desc'}`)
            return response.data
        },
        getNextPageParam: lastPage => lastPage.data.hasNext ? lastPage.data.nextCursor : undefined,
        initialPageParam: 0
    })

    const { register, watch, setValue, handleSubmit } = useForm<FormData>({
        defaultValues: {
            title: '',
            content: '',
            tags: []
        }
    })

    const tags = watch('tags')

    const [tagInput, setTagInput] = useState('')

    return <div className="flex flex-col m-8">
        {data ? <ProfileCard profile={data.data} /> : <></>}

        <div className="flex justify-end my-4">
            <SortSelector sortAscending={isAscending} onSortChange={setIsAscending} />
        </div>

        <LpsGrid lps={lps?.pages?.map(page => page.data.data).flat() ?? []} />

        {hasNextPage ? <button className="p-4 border-2 self-center mt-4 rounded-lg" onClick={() => fetchNextPage()}>Load Next</button> : <></>}

        <FloatingButton onClick={() => setShowAddLpDialog(true)}>
            <span className="font-bold text-white text-4xl">+</span>
        </FloatingButton>

        {
            showAddLpDDialog ? <CloseableDialog onClickClose={() => setShowAddLpDialog(false)}>
                <form
                    onSubmit={handleSubmit(data => mutation.mutate(data))}
                    className="flex flex-col w-80 gap-y-8 text-white"
                >
                    <input placeholder="LP Title" {...register('title')} />
                    <input placeholder="LP Content" {...register('content')} />
                    <div className="flex justify-between items-center gap-4">
                        <input className="grow" type="text" placeholder="Tag..." value={tagInput} onChange={v => setTagInput(v.target.value) }/>
                        <button className="bg-pink-600 px-4 py-2 rounded-lg" onClick={() => {
                            setTagInput('')
                            setValue('tags', [...tags, tagInput])
                        }}>Add</button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {
                            tags.map((tag, index) =>
                                <LpRecordTagUi
                                    key={index}
                                    onClickClose={() => setValue('tags', tags.filter((_, i) => i !== index))}
                                    tagName={tag} />
                            )
                        }
                    </div>

                    <button
                        type="submit"
                        disabled={mutation.isPending}
                        className="bg-pink-600 w-full px-4 py-2 rounded-lg"
                    >Add LP</button>
                </form>
            </CloseableDialog> : <></>
        }
    </div>
}
