import type {PlaylistItem} from "./type/PlaylistItem.ts";

export function PlaylistItem({playlistItem, onAdd, onRemove}: {
    playlistItem: PlaylistItem;
    onAdd: () => void;
    onRemove: () => void;
}) {
    return <div className="flex items-center gap-4">
        <img className="size-36 rounded-sm" src={playlistItem.img} alt={playlistItem.title}/>

        <div className="flex flex-col flex-1">
            <span className="font-bold text-xl">{playlistItem.title}</span>
            <span className="text-lg">{playlistItem.singer}</span>
            <span className="font-bold">${playlistItem.price}</span>
        </div>

        <div className="flex items-center">
            <button className="size-12 flex items-center justify-center bg-neutral-300 rounded-l-lg" onClick={onRemove}>-</button>
            <span className="size-14 flex items-center justify-center border-2">{playlistItem.amount}</span>
            <button className="size-12 flex items-center justify-center bg-neutral-300 rounded-r-lg" onClick={onAdd}>+</button>
        </div>
    </div>
}
