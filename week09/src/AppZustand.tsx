import {Navigation} from "./Navigation.tsx"
import {PlaylistItem} from "./PlaylistItem.tsx";
import {Modal} from "./ui/Modal.tsx";
import {ConfirmDeleteModalContent} from "./ui/ConfirmDeleteModalContent.tsx";
import {useStore} from "./app/storeZustand.ts";

function AppZustand() {
    const {
        cartItems,
        totalPrice,
        isModalOpen,
        modalContent,
        openModal,
        closeModal,
        removeCartItem,
        removeCartItemAmount,
        clearCartItems,
        addCartItemAmount,
        calculateCartTotalPrice
    } = useStore()

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
                                    addCartItemAmount(item.id)
                                    calculateCartTotalPrice()
                                }}
                                onRemove={() => {
                                    if (item.amount === 1) {
                                        removeCartItem(item.id)
                                    } else {
                                        removeCartItemAmount(item.id)
                                    }
                                    calculateCartTotalPrice()
                                }} />

                            <hr className="border-gray-300" />
                        </div>)
                }

                <button
                    className="border-2 rounded-lg px-4 py-2 w-fit self-center mt-8"
                    onClick={() =>
                        openModal(
                            <ConfirmDeleteModalContent
                                onDismiss={closeModal}
                                confirm={clearCartItems} />
                        )}>Delete All</button>

                {
                    isModalOpen && <Modal onDismiss={closeModal}>
                        {modalContent}
                    </Modal>
                }
            </div>
        </>
    )
}

export default AppZustand
