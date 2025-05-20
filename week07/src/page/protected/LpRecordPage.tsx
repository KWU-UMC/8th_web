import {useNavigate, useParams} from "react-router-dom";
import {useInfiniteQuery, useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import type {LpRecordResponse} from "../../model/response/LpRecordResponse.ts";
import client from "../../util/client.ts";
import {formatTime} from "../../util/format.ts";
import type {CommentsResponse} from "../../model/response/CommentsResponse.ts";
import {SortSelector} from "../../ui/SortSelector.tsx";
import {useState} from "react";
import {LpRecordTagUi} from "../../ui/LpRecordTag.tsx";
import type {UserResponse} from "../../model/response/UserResponse.ts";
import type {Comment} from "../../model/Comment.ts";
import {useForm} from "react-hook-form";

const CommentItem = ({comment, isAuthor, onChange}: {
    comment: Comment,
    isAuthor: boolean,
    onChange: () => Promise<void>
}) => {
    const editMut = useMutation({
        mutationFn: async (formData: {content: string}) => {
            const response = await client.patch(`/v1/lps/${comment.lpId}/comments/${comment.id}`, {
                content: formData.content
            })
            return response.data
        }
    })

    const deleteMut = useMutation({
        mutationFn: async () => {
            const response = await client.delete(`/v1/lps/${comment.lpId}/comments/${comment.id}`)
            return response.data
        },
        onSuccess: async () => {
            await onChange()
        }
    })

    const [commentInput, setCommentInput] = useState(comment.content)
    const [isEditing, setIsEditing] = useState(false)

    return <div className="flex items-center justify-between w-full">
        <div className="flex gap-4 items-center w-full">
            <img src={comment.author.avatar ?? ''} className="size-8 rounded-full" alt="author profile image"/>
            <div className="flex flex-col gap-2 w-full">
                <span className="font-bold">{comment.author.name}</span>
                {
                    isEditing ?
                        <div className="flex gap-2 items-center w-full">
                            <input
                                className="grow px-4 py-2"
                                value={commentInput}
                                onChange={e => setCommentInput(e.target.value)}
                                type="text"
                                placeholder="Edit comment..." />

                            <button
                                disabled={commentInput === ''}
                                className="p-2 bg-pink-500 text-white rounded-lg"
                                onClick={async () => {
                                    editMut.mutate({
                                        content: commentInput
                                    })
                                    setIsEditing(false)
                                }}>Submit</button>
                        </div>
                        : <span>{commentInput}</span>
                }
            </div>
        </div>

        {
            isAuthor && !isEditing ? <div className="flex gap-2">
                <button onClick={() => setIsEditing(true)}>EDIT</button>
                <button onClick={() => {
                    deleteMut.mutate()
                    onChange()
                }}>DEL</button>
            </div>: <></>
        }
    </div>
}

const CommentList = ({id, authorId}: {
    id: number,
    authorId: number
}) => {
    const queryClient = useQueryClient()

    const [isSortAscending, setIsSortAscending] = useState(true)

    const mutation = useMutation({
        mutationFn: async (formData: {content: string}) => {
            const response = await client.post(`/v1/lps/${id}/comments`, {
                content: formData.content
            })
            return response.data
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['comments', id, isSortAscending]
            })
        }
    })

    const {data, hasNextPage, fetchNextPage} = useInfiniteQuery<CommentsResponse>({
        queryKey: ['comments', id, isSortAscending],
        queryFn: async ({pageParam = 0}) => {
            const response = await client.get<CommentsResponse>(`/v1/lps/${id}/comments?cursor=${pageParam}&order=${isSortAscending ? 'asc' : 'desc'}`)
            return response.data
        },
        getNextPageParam: lastPage => lastPage.data.hasNext ? lastPage.data.nextCursor : undefined,
        initialPageParam: 0
    })

    const [commentInput, setCommentInput] = useState('')

    return <div className="flex flex-col gap-y-4 rounded-xl bg-neutral-300 w-full p-4">
        <div className="flex justify-between items-center">
            <span className="font-bold text-lg">댓글</span>

            <SortSelector sortAscending={isSortAscending} onSortChange={setIsSortAscending} />
        </div>

        <div className="flex gap-2">
            <input
                className="grow px-4 py-2"
                value={commentInput}
                onChange={e => setCommentInput(e.target.value)}
                type="text"
                placeholder="댓글을 입력하세요" />

            <button
                disabled={commentInput === '' || mutation.isPending}
                className="p-2 bg-pink-500 text-white rounded-lg"
                onClick={() => {
                    mutation.mutate({
                        content: commentInput
                    })

                    setCommentInput('')
                }}
            >Submit</button>
        </div>

        {data?.pages.map(page => page.data.data).flat().map(comment =>
            <CommentItem
                onChange={async () => {
                    await queryClient.invalidateQueries({
                        queryKey: ['comments', id, isSortAscending]
                    })
                }}
                comment={comment}
                isAuthor={comment.authorId === authorId} />
        )}

        {hasNextPage ?
            <button className="p-4 border-2 self-center mt-4 rounded-lg" onClick={() => fetchNextPage()}>
                Load Next
            </button> : <></>}

    </div>
}

export const LpRecordPage = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const {data: authorData} = useQuery<UserResponse>({
        queryKey: ['user'],
        queryFn: async () => {
            const {data} = await client.get<UserResponse>('/v1/users/me')
            return data
        }
    })

    const { data } = useQuery<LpRecordResponse>({
        queryKey: ['lpRecord', id],
        queryFn: async () => {
            const res = await client.get<LpRecordResponse>(`/v1/lps/${id}`)
            return res.data;
        },
    })

    const deleteMutation = useMutation({
        mutationFn: async () => {
            await client.delete(`/v1/lps/${id}`)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['lps'] })
            navigate('/')
        },
        onError: () => {
            alert('삭제 중 오류가 발생했습니다.')
        }
    })

    const editMutation = useMutation({
        mutationFn: async (formData: {
            title: string,
            content: string,
            thumbnail: string,
            tags: string[],
            published: boolean
        }) => {
            await client.patch(`/v1/lps/${id}`, formData)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['lpRecord', id] })
        },
        onError: () => {
            alert('수정 중 오류가 발생했습니다.')
        }
    })

    const { register, handleSubmit } = useForm<{
        title: string,
        content: string,
    }>()

    const handleDelete = () => {
        if (window.confirm('정말로 삭제하시겠습니까?')) {
            deleteMutation.mutate()
        }
    }

    const [isEditing, setIsEditing] = useState(false)

    const handleEdit = ({title, content}: {
        title: string,
        content: string,
    }) => {
        editMutation.mutate({
            title: title === '' ? data?.data?.title ?? '' : title,
            content: content === '' ? data?.data?.content ?? '' : content,
            thumbnail: data?.data?.thumbnail ?? '',
            tags: data?.data?.tags?.map(tag => tag.name) ?? [],
            published: true
        })

        setIsEditing(false)
    }

    const likeMutation = useMutation({
        mutationFn: async () => {
            if (data?.data?.likes?.some(like => like.userId === authorData?.data?.id)) {
                await client.delete(`/v1/lps/${id}/likes`)
            } else {
                await client.post(`/v1/lps/${id}/likes`)
            }
        },
        onMutate: async () => {
            queryClient.setQueryData(['lpRecord', id], (oldData: LpRecordResponse) => {
                const newLikes = oldData.data.likes?.some(like => like.userId === authorData?.data?.id)
                    ? oldData.data.likes.filter(like => like.userId !== authorData?.data?.id)
                    : [...(oldData.data.likes ?? []), { userId: authorData?.data?.id, lpId: idInt }]

                return {
                    ...oldData,
                    data: {
                        ...oldData.data,
                        likes: newLikes
                    }
                }
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['lpRecord', id] })
        },
    })

    const idInt = parseInt(id ?? '-1')
    const isAuthor = authorData?.data?.id === data?.data?.author?.id

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

                <div className="flex justify-between items-center gap-x-2">
                    {
                        isEditing ? <input className="font-bold text-lg flex-1 border-2 rounded-lg" placeholder={data?.data?.title} {...register('title')} /> : <span className="font-bold text-lg">{data?.data?.title}</span>
                    }

                    {!isEditing && isAuthor && (
                        <div className="flex gap-2">
                            <button
                                onClick={() => { setIsEditing(true) }}
                                disabled={editMutation.isPending}
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-blue-300"
                            >
                                {editMutation.isPending ? 'EDIT...' : 'EDIT'}
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={deleteMutation.isPending}
                                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:bg-red-300"
                            >
                                {deleteMutation.isPending ? 'DEL...' : 'DEL'}
                            </button>
                        </div>
                    )}

                    {
                        isEditing && (
                            <button
                                onClick={handleSubmit(handleEdit)}
                                disabled={editMutation.isPending}
                                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                            >DONE</button>
                        )
                    }
                </div>

                <div className="w-full rounded-xl px-[30%] mt-16">
                    <div className="bg-neutral-200 p-[20%]">
                        <div className="relative pb-[100%]">
                            <img src={data?.data?.thumbnail ?? ''} className="absolute top-0 left-0 right-0 bottom-0 w-full border-4 border-black aspect-square rounded-full object-cover object-center" alt="thumbnail" />
                            <div className="absolute rounded-full top-1/3 bottom-1/3 left-1/3 right-1/3 bg-white size-1/3 border-4 border-black" />
                        </div>
                    </div>
                </div>

                {
                    isEditing ? <input className="text-lg mt-16 flex-1" placeholder={data?.data?.content} {...register('content')} />
                        : <span className="text-lg mt-16">{data?.data?.content}</span>
                }

                <div className="mt-16">
                    {data?.data?.tags?.map(tag => {
                        return <LpRecordTagUi key={tag.id} tagName={tag.name}/>
                    })}
                </div>

                <div className="flex gap-2 mt-16 self-center">
                    <span onClick={() => likeMutation.mutate()}>LIKES</span>
                    <span>{data?.data?.likes?.length ?? 0}</span>
                </div>
            </div>
        </div>

        <CommentList id={idInt} authorId={authorData?.data?.id ?? -1} />
    </div>
}
