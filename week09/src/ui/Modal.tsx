import type {ReactNode} from "react";

export function Modal({
    onDismiss,
    children
}: {
    onDismiss: () => void
    children: ReactNode
}) {
    return <div
        onClick={onDismiss}
        className="fixed inset-0 z-10 flex items-center justify-center bg-neutral-600/50">
        <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-lg shadow-lg p-8">
            {children}
        </div>
    </div>
}
