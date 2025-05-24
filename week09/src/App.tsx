import {Navigation} from "./Navigation.tsx"
import cartItems from "./assets/cartItems.ts";
import {PlaylistItem} from "./PlaylistItem.tsx";

function App() {
    return (
        <>
            <Navigation/>

            <div className="flex flex-col gap-4 mx-80 my-8">
                {
                    cartItems.map(item =>
                        <>
                            <PlaylistItem
                                playlistItem={item}
                                onAdd={() => {}}
                                onRemove={() => {}} />

                            <hr className="border-gray-300" />
                        </>)
                }
            </div>
        </>
    )
}

export default App
