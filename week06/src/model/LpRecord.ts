export type LpRecord = {
    id: string,
    title: string,
    content: string,
    thumbnail: string,
    published: boolean,
    authorId: number,
    createdAt: string,
    updatedAt: string,
    tags: LpRecordTag[],
    likes: LpRecordLike[],
    author: LpRecordAuthor | null
}

export type LpRecordTag = {
    id: number,
    name: string
}

export type LpRecordLike = {
    id: number,
    userId: number,
    lpId: number
}

export type LpRecordAuthor = {
    id: number,
    name: string,
    email: string,
    bio: string | null,
    avatar: string | null,
    createdAt: string,
    updatedAt: string
}
