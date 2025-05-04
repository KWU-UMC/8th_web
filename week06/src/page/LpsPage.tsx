import '../index.css'
import {LpRecord} from "../model/LpRecord.ts";
import {useQuery} from "@tanstack/react-query";
import {LpRecordResponse} from "../model/response/LpRecordResponse.ts";

const LpsSideBar = () => {
    return <div className="flex flex-col bg-neutral-600 py-8 mx-8">
        <ul className="flex flex-1 flex-col gap-4">
            <li className="text-white text-lg">찾기</li>
            <li className="text-white text-lg">마이페이지</li>
        </ul>

        <div><span className="text-white text-lg">탈퇴하기</span></div>
    </div>
}

const LpsGrid = ({lps}: {
    lps: LpRecord[],
}) => {
    return <div className="grid grid-cols-5">
        {
            lps.map(lp => {
                return <div className="relative col-span-1 bg-neutral-300 m-4 rounded-xl size-60 hover:scale-150 hover:z-10 transition-transform duration-150 ease-in-out overflow-hidden group">
                    <img src={lp.thumbnail} alt="thumbnail" className="size-full bg-neutral-300 object-center object-cover" />

                    <div className="flex flex-col absolute bottom-0 bg-gradient-to-b from-transparent to-neutral-800 size-full p-4 justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                        <p className="text-white font-bold line-clamp-3">{lp.title}</p>
                    </div>
                </div>
            })
        }
    </div>
}

export const LpsPage = () => {
    const { data, error, isLoading } = useQuery<LpRecordResponse>({
        queryKey: ['lps'],
        queryFn: async () => {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/v1/lps`)
            return await response.json()
        }
    })

    return <div className="flex h-full mx-28">
        <LpsSideBar/>

        {
            isLoading ?
                <>Loading...</>
                : <></>
        }

        {
            error ?
                <>ERROR!</>
                : <></>
        }

        {
            data ?
                <LpsGrid lps={data.data.data} />
                : <></>
        }
    </div>
}
