import {create} from "zustand/react";
import {createZustandModalSlice, type ZustandModalSlice} from "../features/zustand/zustandModalSlice.ts";
import {createZustandCartSlice, type ZustandCartSlice} from "../features/zustand/zustandCartSlice.ts";

export type ZustandStore = ZustandCartSlice & ZustandModalSlice

export const useStore = create<ZustandStore>((...a) => ({
    ...createZustandModalSlice(...a),
    ...createZustandCartSlice(...a)
}))
