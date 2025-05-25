import type {ReactNode} from "react";
import {useDispatch} from "react-redux";
import {closeModal} from "../features/modalSlice.ts";

export function Modal({
    children
}: {
    children: ReactNode
}) {
    const dispatch = useDispatch()

    return <div
        onClick={() => dispatch(closeModal())}
        className="fixed inset-0 z-10 flex items-center justify-center bg-neutral-600/50">
        <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-lg shadow-lg p-8">
            {children}
        </div>
    </div>
}
