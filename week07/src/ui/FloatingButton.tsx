import type {ReactNode} from "react";

export const FloatingButton = ({
    onClick,
    children
}: {
    onClick: () => void,
    children: ReactNode
}) => {
    return <div
        onClick={onClick}
        className="fixed z-50 bottom-12 right-12 flex items-center justify-center rounded-full bg-pink-400 size-18 hover:shadow-2xl">
        {children}
    </div>
}
