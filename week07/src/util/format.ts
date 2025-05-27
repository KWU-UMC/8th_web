export const formatTime = (time: string): string => {
    const now = new Date()
    const date = new Date(time)
    const diffInMs = now.getTime() - date.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60))
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))

    if (diffInMinutes < 60) {
        return `${diffInMinutes} mins ago`
    } else {
        return `${diffInHours} hours ago`
    }
}
