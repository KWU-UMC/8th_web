import {Navigation} from "./Navigation.tsx"
import {PlaylistItem} from "./PlaylistItem.tsx";
import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "./app/store.ts";
import {
    addCartItemAmount,
    calculateCartTotalPrice,
    clearCartItems,
    removeCartItem,
    removeCartItemAmount
} from "./features/cartSlice.ts";
import { Modal } from "./ui/Modal.tsx";
import {closeModal, openModal} from "./features/modalSlice.ts";
import {ConfirmDeleteModalContent} from "./ui/ConfirmDeleteModalContent.tsx";

function App() {
    const cartItems = useSelector((state: RootState) => state.cart.items)
    const totalPrice = useSelector((state: RootState) => state.cart.totalPrice)

    const isModalOpen = useSelector((state: RootState) => state.modal.isOpen)
    const modalContent = useSelector((state: RootState) => state.modal.content)

    const dispatch = useDispatch()

    return (
        <>
            <Navigation/>

            <div className="flex flex-col gap-4 mx-80 my-8">
                <span className="font-bold text-2xl">{cartItems.length} items. Total: ${totalPrice}</span>

                {
                    cartItems.map(item =>
                        <div key={item.id}>
                            <PlaylistItem
                                playlistItem={item}
                                onAdd={() => {
                                    dispatch(addCartItemAmount({id: item.id}))
                                    dispatch(calculateCartTotalPrice())
                                }}
                                onRemove={() => {
                                    if (item.amount === 1) {
                                        dispatch(removeCartItem({id: item.id}))
                                    } else {
                                        dispatch(removeCartItemAmount({id: item.id}))
                                    }
                                    dispatch(calculateCartTotalPrice())
                                }} />

                            <hr className="border-gray-300" />
                        </div>)
                }

                <button
                    className="border-2 rounded-lg px-4 py-2 w-fit self-center mt-8"
                    onClick={() =>
                        dispatch(openModal(
                            <ConfirmDeleteModalContent
                                onDismiss={() => dispatch(closeModal())}
                                confirm={() => dispatch(clearCartItems())} />
                        ))}>Delete All</button>

                {
                    isModalOpen && <Modal onDismiss={closeModal}>
                        {modalContent}
                    </Modal>
                }
            </div>
        </>
    )
}

export default App
