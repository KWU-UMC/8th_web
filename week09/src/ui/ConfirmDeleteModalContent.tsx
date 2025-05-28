export function ConfirmDeleteModalContent({
    confirm,
    onDismiss,
}: {
    confirm: () => void,
    onDismiss: () => void
}) {
    return <div className="flex flex-col gap-4">
        <p>Delete all? You cannot undone this action.</p>

        <div className="flex gap-4 justify-end">
            <button
                className="bg-neutral-300 rounded-lg px-4 py-2"
                onClick={onDismiss}>Cancel</button>
            <button
                className="bg-red-400 text-white font-bold rounded-lg px-4 py-2"
                onClick={() => {
                    confirm()
                    onDismiss()
                }}>Confirm</button>
        </div>
    </div>
}
