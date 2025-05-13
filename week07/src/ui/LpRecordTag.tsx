export const LpRecordTagUi = ({
    tagName,
    onClickClose
}: {
    tagName: string,
    onClickClose?: () => void
}) => {
    return <div className="flex items-center justify-between rounded-xl bg-neutral-500 gap-2 text-white px-4 py-1">
        <span>{tagName}</span>

        {
            onClickClose ? <button className="text-white text-sm" onClick={onClickClose}>X</button> : <></>
        }
    </div>
}
