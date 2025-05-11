export const SortSelector = ({sortAscending, onSortChange}: {
    sortAscending: boolean,
    onSortChange: (sortAscending: boolean) => void
}) => {
    return <div className="flex">
        <button
            className={`px-4 py-2 rounded-l-xl border-4 border-r-2 border-black ${sortAscending ? 'bg-neutral-300' : 'bg-neutral-500'}`}
            onClick={() => onSortChange(false)}>
            최신순
        </button>
        <button
            className={`px-4 py-2 rounded-r-xl border-4 border-l-2 border-black ${sortAscending ? 'bg-neutral-500' : 'bg-neutral-300'}`}
            onClick={() => onSortChange(true)}>
            오래된순
        </button>
    </div>
}
