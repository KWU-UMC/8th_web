import type {LpRecord} from "../LpRecord.ts";
import type {Response} from "./Response.ts";

export type LpRecordData = {
    data: LpRecord[],
    nextCursor: boolean,
    hasNext: boolean
}

export type LpRecordsResponse = Response<LpRecordData>
