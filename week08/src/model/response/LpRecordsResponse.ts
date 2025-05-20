import type {LpRecord} from "../LpRecord.ts";
import type {Response} from "./Response.ts";

export type LpRecordData = {
    data: LpRecord[],
    nextCursor: string | null,
    hasNext: boolean
}

export type LpRecordsResponse = Response<LpRecordData>
