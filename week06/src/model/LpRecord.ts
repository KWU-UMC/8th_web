export type LpRecord = {
    id: string,
    title: string,
    content: string,
    thumbnail: string,
    published: boolean,
    authorId: number,
    createdAt: string,
    updatedAt: string,
    tags: LpRecordTag[]
}

export type LpRecordTag = {
    id: number,
    name: string
}
