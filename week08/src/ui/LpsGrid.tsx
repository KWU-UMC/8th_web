import type {LpRecord} from "../model/LpRecord.ts";
import {useNavigate} from "react-router-dom";
import {formatTime} from "../util/format.ts";

export const LpsGrid = ({lps}: {
    lps: LpRecord[],
}) => {
    const navigate = useNavigate()

    return <div className="grid grid-cols-1 2xl:grid-cols-5 md:grid-cols-3 gap-x-4 gap-y-4 items-start">
        {
            lps.map(lp => {
                return <div
                    key={lp.id}
                    className="relative bg-neutral-300 rounded-xl w-full aspect-square hover:scale-110 hover:z-10 transition-transform duration-150 ease-in-out overflow-hidden group"
                    onClick={() => navigate(`/lp/${lp.id}`)}>
                    <img src={lp.thumbnail} alt="thumbnail" className="size-full bg-neutral-300 object-center object-cover animate-[blink_1s_ease-in-out_infinite]" />

                    <div className="flex flex-col absolute bottom-0 bg-gradient-to-b from-transparent to-neutral-800 size-full p-4 justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                        <p className="text-white font-bold line-clamp-3">{lp.title}</p>
                        <div className="flex justify-between">
                            <span className="text-neutral-200 text-sm">{formatTime(lp.createdAt)}</span>
                            <span className="text-neutral-200 text-sm">{lp.likes.length} Likes</span>
                        </div>
                    </div>
                </div>
            })
        }
    </div>
}
