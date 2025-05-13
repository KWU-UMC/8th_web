import '../index.css'
import type {ReactNode} from "react";

export default function CloseableDialog({
    onClickClose,
    children
}: {
    onClickClose: () => void,
    children: ReactNode
}) {
    return (
        <div className="fixed inset-0 size-full bg-neutral-600/50">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-neutral-700 rounded-xl p-4">
                <div className="flex justify-end">
                    <button onClick={onClickClose}>X</button>
                </div>
                {children}
            </div>
        </div>
    )
}
